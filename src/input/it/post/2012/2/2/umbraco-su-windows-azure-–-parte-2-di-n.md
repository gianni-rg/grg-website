---
Title: Umbraco Su Windows Azure – Parte 2 Di N
Published: 2012-02-02 22:10:00
Language: it
Image: /assets/images/Windows-Live-Writer_e79516e3ad99_FC54_UmbracoAcceleratorArchitecture%5B7%5D_thumb.png
Description: Questo è il secondo post della serie Umbraco su Windows Azure . Nel primo post ho introdotto Umbraco CMS , Windows Azure , il motivo per cui potreste voler ospitare il vostro sito Umbraco su Windows Azure e una brevissima guida su come installare un sito manualmente. In questa parte, vedremo l'helper open-source che vi permetterà di installare il sito su Windows Azure in meno di un'ora. Windows Azure Accelerator for Umbraco Potete scaricarlo direttamente dal sito ufficiale su GitHub .
Tags:
- cloud
- windows azure
- umbraco
RedirectFrom: it/2012/2/2/umbraco-su-windows-azure-–-parte-2-di-n.aspx
TranslatedRefs: en/posts/2012/2/2/umbraco-on-windows-azure-–-part-2-of-n.md
DisqusId: 159813B9E9C784878A6B6DA199EBDB962AEEB86DB7FEBB7487AB2D5A7D4FDAD1
---
Questo è il secondo post della serie *Umbraco su Windows Azure*. Nel <a href="/it/2012/1/31/umbraco-su-windows-azure-%E2%80%93-parte-1-di-n.aspx"> primo post</a> ho introdotto <a href="http://umbraco.org" target="_blank">Umbraco CMS</a>, <a href="http://www.windowsazure.com" target="_blank">Windows Azure</a>, il motivo per cui potreste voler ospitare il vostro sito Umbraco su Windows Azure e una brevissima guida su come installare un sito manualmente. In questa parte, vedremo l'helper open-source che vi permetterà di installare il sito su Windows Azure in meno di un'ora.

## Windows Azure Accelerator for Umbraco

Potete scaricarlo direttamente dal <a href="https://github.com/WindowsAzure-Accelerators/wa-accelerator-umbraco"> sito ufficiale su GitHub</a>.

L'Accelerator è stato progettato per permettervi di installare rapidamente le applicazioni Umbraco e i loro aggiornamenti senza la necessità di ri-effettuare un deploy completo di un package Windows Azure. Attraverso un semplice script guidato, il setup si prenderà cura della configurazione dell'istanza Azure, della creazione dei DB e del deploy iniziale dell'applicazione Umbraco. Rispetto all'installazione manuale vista nel precedente post, l'Accelerator risolve il fondamentale problema della persistenza dei dati e della sincronizzazione multi-istanza in maniera elegante.

Invece di ospitare l'applicazione Umbraco direttamente nel Web Role di Windows Azure, l'Accelerator installa una piccola applicazione web che funziona da monitor in background, configuratore run-time e sincronizzatore di siti Umbraco. Tutte le cose di Umbraco sono memorizzate in un container predefinito nel Blob Storage di Windows Azure e l'Accelerator, periodicamente, ne controlla il contenuto. Quando un'installazione Umbraco viene trovata, si occupa di copiarne tutti i file dai blob ad una cartella locale, che sarà automaticamente configurata nell'istanza di IIS Server in esecuzione.

Tutto ciò che resterà da fare è connettersi al backoffice di Umbraco e lavorare direttamente online, configurando le caratteristiche del sito, le pagine, gli stili e i contenuti. Il monitor di background sincronizzerà l'istanza locale con il Blob Storage di Azure, garantendo la persistenza dei dati in caso di riavvio del Web Role. Anche la replica tra istanze multiple è supportata, perchè ogni voltra che il monitor sincronizza i file locali con lo storage, controlla anche per eventuali cambiamenti nei blob e li riporta in locale.

Per maggiori dettagli, potete far riferimento alla pagina ufficiale <a href="https://github.com/WindowsAzure-Accelerators/wa-accelerator-umbraco/wiki/Getting-Started"> Per iniziare</a> e alla guida di <a href="https://github.com/WindowsAzure-Accelerators/wa-accelerator-umbraco/wiki/Deployment"> Installazione</a>.

## Pre-requisiti

Per eseguire gli script di installazione e generare il package di deploy, avrete bisogno dei seguenti pre-requisiti:

*   

<a href="http://msdn.microsoft.com/vstudio/products/">Visual Studio 2010 SP1 e .NET 4</a>

*   

<a href="http://www.windowsazure.com">Windows Azure SDK e Tools for Visual Studio (November 2011) versione 1.6</a>

*   

<a href="http://www.microsoft.com/express/sql/download/">SQL Express 2008 R2</a>

Avrete bisogno anche delle seguenti risorse Windows Azure per far girare il vostro sito Umbraco:

*   

Hosted service con almeno 1 istanza extra-small (se ne raccomandano 2 minimo)

*   

1 database SQL Azure Web edition, 1GB (o di più, se serve)

*   

Account Azure storage

Risorse richieste per gestire le sessioni ASP.NET:

*   

1 database SQL Azure (o Azure Caching , cache da 128MB è la minima disponibile)

## Difetti di Umbraco Accelerator

Grazie all'Accelerator, si può avere un'applicazione Umbraco di base configurata e funzionante in meno di 1 ora. E' una soluzione brillante ma, principalmente, soffre di un costo economico nascosto: *migliaia di transazioni sullo Storage di Azure al giorno*. Se avete una sottoscrizione MSDN o se state valutando la piattaforma con un piano di prova gratuito, il limite superiore gratuito delle transazioni sarà raggiunto in breve tempo, provocando l'addebito sul vostro conto o, con le nuove politiche di limite sul budget, la disattivazione automatica della sottoscrizione. Per dettagli sui costi di Azure, date un'occhiata a <a href="http://blogs.msdn.com/b/windowsazurestorage/archive/2010/07/09/understanding-windows-azure-storage-billing-bandwidth-transactions-and-capacity.aspx" target="_blank">questo articolo</a>, sul blog di Windows Azure.

Questo comportamento è dovuto al controllo periodico del blob storage fatto dal monitor in background: <span style="text-decoration: underline;">ogni secondo</span> verifica se ci sono state modifiche al file system locale (nessun costo di transazione) e nei blob (usando la funzione ottimizzata ListBlobs, che costa solo 1 transazione), *anche quando queste non ci sono state*! In questo modo il conto totale delle transazioni giornaliere, quando non si sono verificate modifiche ai file, è facile da fare:

1 transazione/secondo x 3.600 secondi/ora x 24 ore/giorno x *#istanze* = **86.400 x *#istanze transazioni/giorno***

Sono decisamente tante… e senza fare nulla.

Se poi si inizia a lavorare nel backoffice di Umbraco (modificare le impostazioni, cambiare design e stili, configurare le opzioni, pubblicare i contenuti, etc.), le modifiche ai file ci saranno e il monitor di background sincronizzerà i file, generando transazioni aggiuntive (1 per ogni copia da/allo storage - e in presenza di istanze multiple, ogni modifica sullo storage causerà la copia di 1 file in tutte le altre!). Così non va bene.

Una soluzione al problema esiste. Nel prossimo post vedremo **Umbraco Accelerator Lite**, una mia versione modificata dell'Umbraco Accelerator.