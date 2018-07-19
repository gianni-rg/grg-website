---
Title: Umbraco Su Windows Azure – Parte 3 Di N
Published: 2012-02-04 16:48:00
Language: it
Description: Questa è il terzo post della serie Umbraco su Windows Azure . Nel primo post ho introdotto Umbraco CMS , Windows Azure , il motivo per cui potreste voler ospitare il vostro sito Umbraco su Windows Azure e una brevissima guida su come installare un sito manualmente. Nel secondo post ho presentato il progetto open-source Windows Azure Accelerator for Umbraco , che vi permette di installare il sito su Windows Azure in meno di un'ora. In questo post vediamo come risolvere il problema delle migliaia di transazioni al giorno, di cui soffre l'attuale implementazione.
Tags:
- cloud
- windows azure
- umbraco
RedirectFrom: it/2012/2/4/umbraco-su-windows-azure-–-parte-3-di-n.aspx
TranslatedRefs: en/posts/2012/2/4/umbraco-on-windows-azure-–-part-3-of-n.md
DisqusId: 19AA37AB0D3F468728D734CBCABE195592193C63DFA10C556BC554F6C5D48343
---
Questa è il terzo post della serie *Umbraco su Windows Azure*. Nel <a href="/it/2012/1/31/umbraco-su-windows-azure-%E2%80%93-parte-1-di-n.aspx"> primo post</a> ho introdotto <a href="http://umbraco.org" target="_blank">Umbraco CMS</a>, <a href="http://www.windowsazure.com" target="_blank">Windows Azure</a>, il motivo per cui potreste voler ospitare il vostro sito Umbraco su Windows Azure e una brevissima guida su come installare un sito manualmente. Nel <a href="/{localLink:1188}" title="Umbraco su Windows Azure - parte 2 di n">secondo post</a> ho presentato il progetto open-source *Windows Azure Accelerator for Umbraco*, che vi permette di installare il sito su Windows Azure in meno di un'ora. In questo post vediamo come risolvere il problema delle migliaia di transazioni al giorno, di cui soffre l'attuale implementazione.

## Umbraco Accelerator Lite

Quando mi sono imbattuto nei difetti descritti nel post precedente, ho pensato che usare Umbraco su Windows Azure potesse costare di più che con un servizio di hosting dedicato.  Non potevo però credere che non ci fossero altri modi per gestire la sincronizzazione. Qualcosa doveva essere fatto, e così ho iniziato a lavorarci.

Dopo alcuni giorni di analisi, monitoraggio e rielaborazioni, ho trovato una soluzione alternativa basata su *file di notifica*:

*   <div style="text-align: justify;">ogni volta che una modifica si
verifica sul file system locale, un file sentinella viene creato in
automatico, tramite una semplice estensione di Umbraco collegata ai
suoi eventi interni;</div>

*   <div style="text-align: justify;">quando un file cambia nel blob
storage, un altro file sentinella deve essere creato (in
automatico, quando la modifica è fatta dal processo di
sincronizzazione oppure a mano, se un file viene aggiornato tramite
lo strumento di deploy dell'Accelerator o con uno Storage
Explorer);</div>

*   <div style="text-align: justify;">il monitor di background
periodicamente verifica l'esistenza di uno di questi file. Se
almeno uno esiste, la sincronizzazione viene iniziata.</div>

Sfortunatamente, però, la soluzione comporta *un uso ancora maggiore di transazioni*: il controllo dell'esistenza di un file nel blob storage implica una transazione e, *in aggiunta*, la lista dei blob deve comunque essere recuperata (un'altra transazione)! Questa soluzione, inoltre, introduce un problema di concorrenza nell'accesso al file sentinella sullo storage, in caso di istanze multiple. Quindi, nulla di fatto…

Cercando altre vie, ho notato che fare query frequenti al database non costa molto, a confronto con l'uso delle transazioni. Ecco quindi la nuova idea, che combina il precedente approccio basato su file con SQL Azure:

*   <div style="text-align: justify;">ogni volta che una modifica si
verifica sul file system locale, un file sentinella viene creato in
automatico, tramite una semplice estensione di Umbraco collegata ai
suoi eventi interni;</div>

*   <div style="text-align: justify;">invece di verificare l'esistenza
del file sentinella nello storage, il timestamp dell'ultimo
aggiornamento viene recuperato da una tabella personalizzata nel
database di Umbraco su SQL Azure; questo valore viene aggiornato in
automatico, quando la modifica è fatta dal processo di
sincronizzazione, oppure a mano, se un file viene aggiornato
tramite lo strumento di deploy dell'Accelerator o con uno Storage
Explorer;</div>

*   <div style="text-align: justify;">il monitor di background
controlla periodicamente se esiste il file sentinella locale e
confronta il timestamp dell'ultimo aggiornamento dei blob. Se il
file esiste o i blob sono cambiati dall'ultima volta, la
sincronizzazione viene iniziata.</div>

Bingo! *Basta transazioni inutili solo per capire se una sincronizzazione deve essere fatta oppure no*. Naturalmente le transazioni per recuperare la lista dei blob e per aggiornare i file devono comunque essere fatte, *ma solo quando effettivamente serve*.

La soluzione è ottimale e necessaria per la sincronizzazione blob-file locali. Per minimizzare l'uso di SQL Azure, l'approccio a file è stato mantenuto  per la sincronizzazione file locali-blob. Questo comportamento si potrebbe evitare e tornare alla sincronizzazione dell'Accelerator originario: questo perché l'accesso al file system non costa nulla. Ma essendo in fase di ottimizzazione, perché non ridurre anche l'accesso al file system ed evitare troppi I/O su disco, che potrebbero rallentare le prestazioni dell'istanza? Così, nell'Lite Accelerator, il monitor controlla le modifiche locali solo quando il file sentinella esiste. Altrimenti, *non fa nulla*!

Un'altra piccola ottimizzazione si potrebbe ancora fare, notando che (probabilmente), dopo la fase di setup e configurazione iniziale, le modifiche ai file locali non saranno così frequenti. E allora, invece di far eseguire ogni secondo il processo di sincronizzazione, si potrebbe rallentarlo (e renderlo configurabile esternamente tramite il file di configurazione del Web Role).

## Scaricatelo e provatelo

Da circa 20 giorni, questo blog ed un altro stanno funzionando con Umbraco su Windows Azure e Umbraco Accelerator Lite.

Se volete provarlo anche voi, fornire suggerimenti, riportare problemi, dare qualche contributo… si può scaricare tutto da qui:

*   <a href="/media/1924/umbracoacceleratorlite_1_0_beta_20120204.zip">**
Umbraco Accelerator Lite v1.0beta**</a> 

    *   Umbraco Accelerator Notifier Extension (binari e sorgenti)
    *   Umbraco Accelerator Lite webrole (sorgenti)
    *   SiteDeployer tool (binari e sorgenti)

Per favore, ricordatevi che è una *versione beta*. <span style="text-decoration: underline;">Dovrebbe funzionare correttamente ma, prima di adottarla in produzione, provatela esaustivamente in un ambiente di sviluppo.</span>

Al momento, l'ho provata in una configurazione <span style="text-decoration: underline;">singolo sito web / singola istanza</span>, con Umbraco v4.7.1.1. E' stato progettato per supportare scenari multi-sito/multi-istanza, ma non li ho ancora provati. Inoltre, attualmente, non può essere installato con gli script automatici del *Windows Azure Accelerator for Umbraco* originale. Sto lavorando sull'integrazione del mio lavoro con l'Accelerator ufficiale ma, per ora, bisogna fare un po' di lavoro a mano per installarlo e configurarlo.

In prossimi post, vedremo le istruzioni dettagliate e passo-passo su come installarlo e configurarlo.

## Panoramica sui passi di installazione

Per quelli che vogliono provarlo subito, queste sono le cose principali da fare (per dettagli su *alcune* operazioni, potete far riferimento alle pagine <a href="https://github.com/WindowsAzure-Accelerators/wa-accelerator-umbraco/wiki/Getting-Started" target="_blank">Getting Started</a> e <a href="https://github.com/WindowsAzure-Accelerators/wa-accelerator-umbraco/wiki/Deployment" target="_blank">Deployment</a> del progetto *Azure Accelerator for Umbraco*):

1.  Su Windows Azure, attivate il servizio di Storage e un server
SQL Azure
2.  Nel vostro SQL Server *locale*, create un utente DB e 2
database vuoti, uno per il backend di Umbraco e uno per le sessioni
ASP.NET.  Date al nuovo utente il ruolo di dbOwner role su
entrambi i database. Eseguite gli script contenuti in <span style="font-family: 'Courier New';">UmbracoAcceleratorLite\
SiteDeployer\db\InstallSqlState.sql</span> per creare il DB delle
sessioni ASP.NET.
3.  Installate un sito Umbraco in locale, facendolo puntare al DB
Umbraco vuoto creato al punto 2. Completate il setup di base di
Umbraco.
4.  Copiate l'estensione UmbracoAcceleratorNotifier.dll nella
cartella <span style="font-family: 'Courier New';">\bin</span> di
Umbraco.
5.  Create la tabella per *Umbraco Accelerator Lite* nel DB
Umbraco locale e preparatelo per SQL Azure (si possono usare gli
script SQL contenuti in <span style="font-family: 'Courier New';">UmbracoAcceleratorLite\
SiteDeployer\db\SqlAzure.AcceleratorLiteScripts.sql)</span>
6.  In SQL Azure Server, create *lo stesso* utente DB owner
che avete creato per i database locali (potete modificare gli
script SQL contenuti in <span style="font-family: 'Courier New';">UmbracoAcceleratorLite\
SiteDeployer\db\SqlAzure.UserSetup.sql)</span>
7.  Usate uno strumento di terze parti per migrare i due DB in SQL
Azure (potete usare <a href="http://sqlazuremw.codeplex.com/" target="_blank">SQL Azure Migration Wizard</a> o <a href="http://www.red-gate.com/products/dba/sql-azure-backup/" target="_blank">RedGate SQL Azure Backup</a>)
8.  Modificate il <span style="font-family: 'Courier New';">web.config</span> di Umbraco
affinchè punti ai DB su SQL Azure
9.  Usate lo strumento SiteDeployer per copiare l'installazione
Umbraco locale sull'Azure blob storage. Utilizzate un dominio del
tipo "<nome>.cloudapp.net".
10.  In Visual Studio 2010, aprite la solution del web role,
configurate la stringa di connessione affinché punti al vostro
Azure Storage e create il package di deploy.
11.  Dal portale Windows Azure Management, create un nuovo servizio
con il package appena creato, dandogli lo stesso nome DNS del sito
Umbraco, <nome>(.cloudapp.net).
12.  In circa 20 minuti il vostro sito Umbraco sarà raggiungibile al
dominio che avete specificato
("http://<nome>.cloudapp.net").

In caso di difficoltà o problemi, fatemi sapere (o aspettate le istruzioni passo-passo dettagliate).