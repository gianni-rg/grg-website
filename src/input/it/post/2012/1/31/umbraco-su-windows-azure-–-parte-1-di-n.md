---
Title: Umbraco Su Windows Azure – Parte 1 Di N
Published: 2012-01-31 11:50:00
Language: it
Image: /assets/images/Windows-Live-Writer_Umbraco-su-Windows-Azure--parte-1-di-n_AB46_umbraco_logo_3.png
Description: Questa serie di post in n parti descriverà la mia esperienza di sviluppo con Umbraco CMS su Windows Azure , acquisita durante la creazione di questo blog. Sentitevi liberi di commentare, criticare e suggerire miglioramenti! Introduzione Umbraco è un sistema di gestione contenuti (CMS) gratuito e open-source, sviluppato con tecnologia ASP.NET e fortemente supportato sia da un'attiva comunità mondiale di utenti e da un'organizzazione commerciale che fornisce supporto e strumenti professionali.
Tags:
- cloud
- windows azure
- umbraco
RedirectFrom: it/2012/1/31/umbraco-su-windows-azure-–-parte-1-di-n.aspx
TranslatedRefs: en/posts/2012/1/31/umbraco-on-windows-azure-–-part-1-of-n.md
DisqusId: 695B132A55BB7ABCCF26344A34FF54E47DB8DE6C4FE3C7B8097FEB9870C7AA1F
---
Questa serie di post in n parti descriverà la mia esperienza di sviluppo con <a href="http://umbraco.com/" target="_blank">Umbraco CMS</a> su <a href="http://www.windowsazure.com" target="_blank">Windows Azure</a>, acquisita durante la creazione di questo blog. Sentitevi liberi di commentare, criticare e suggerire miglioramenti!

## Introduzione

<a href="http://umbraco.com/" target="_blank">Umbraco</a> è un sistema di gestione contenuti (CMS) gratuito e open-source, sviluppato con tecnologia ASP.NET e fortemente supportato sia da un'attiva comunità mondiale di utenti e da un'organizzazione commerciale che fornisce supporto e strumenti professionali. Il sistema ha la flessibilità di poter eseguire qualunque cosa, da piccole *landing page* e siti di presentazione ad alcuni dei più grandi e visitati siti mediatici del web. È facile da imparare e da usare, rendendolo perfetto per sviluppatori, web designer e autori di contenuti. Un sito può essere configurato, stilizzato e messo online in pochi minuti, usando il semplice installer e gli *starter* *kit* di base. Ma se volete e avete tempo, è possibile personalizzarlo in tutte le sue parti: dalla grafica a sezioni personalizzate, inclusi nuovi moduli o plug-in.

![Windows Azure logo](/assets/images/Windows-Live-Writer_Umbraco-su-Windows-Azure--parte-1-di-n_AB46_windows_azure_3.png)<a href="http://www.windowsazure.com" target="_blank">Windows Azure</a> è la piattaforma cloud aperta e flessibile di Microsoft. Vi permette di generare, pubblicare e gestire rapidamente applicazioni attraverso una rete mondiale di datacenter gestiti da Microsoft. Windows Azure permette di creare applicazioni ad elevata disponibilità senza bisogno di focalizzarsi sull'infrastruttura: fornisce aggiornamenti automatici del sistema operativo, *load-balancing* nativo e resistenza a problemi hardware*.* Inoltre permette di scalare facilmente le proprie applicazioni a qualunque dimensione: è una piattaforma self-service a cui chiedere e ottenere risorse in pochi minuti, aumentando o riducendo la potenza e la disponibilità a seconda delle necessità. Si paga solo quello che si utilizza effettivamente.

## Umbraco e Windows Azure

Umbraco è un'applicazione web. Windows Azure, tra le sue tante caratteristiche, è una valida piattaforma di hosting. Perché non usarla per il vostro sito Umbraco? Girando in Windows Azure, le applicazioni Umbraco beneficerebbero di un sistema automatico di gestione del servizio, amministrazione ridotta, alta disponibilità e scalabilità. Da dove si inizia?

Per pubblicare un sito web su Windows Azure, di solito bisogna partire con:

*   <div style="text-align: justify;">Visual Studio 2010</div>

*   <div style="text-align: justify;">un progetto "Web
application"</div>

*   <div style="text-align: justify;">un progetto "Windows Azure", con
un Web Role</div>

Per lavorare con Umbraco poi, si potrebbe procedere come segue:

1.  <div style="text-align: justify;">scaricare l'ultima versione dal
sito ufficiale di Umbraco</div>

2.  <div style="text-align: justify;">dopo averla estratta nella
cartella di lavoro, importare i file necessari nel progetto Web
Application</div>

3.  <div style="text-align: justify;">modificare e configurare i
parametri della Web Application (debug/release, web.config,
Connection String, etc.)</div>

4.  <div style="text-align: justify;">configurare il Web Role di
Windows Azure (tipo e numero di istanze, storage, credenziali,
certificati, etc.)</div>

5.  <div style="text-align: justify;">generare il package di
deploy</div>

6.  <div style="text-align: justify;">creare su SQL Azure due database
vuoti per il backend di Umbraco</div>

7.  <div style="text-align: justify;">fare il deploy tramite Visual
Studio o tramite il portale di Windows Azure</div>

Una volta effettuato il deploy e avviato il Web Role su Windows Azure, si potrà finalmente procedere con l'installazione e la configurazione del sito Umbraco direttamente online, dal layout ai contenuti. Procedura abbastanza semplice e lineare. No?

Ma poi… vi imbattereste in un interessante problema: cosa succede se la vostra istanza su Windows Azure si blocca per qualche motivo? Certo, la piattaforma la farà ripartire in automatico ma… al ripristino, questa sarà ritornata al suo stato originale, com'era all'istante del deploy! Non è una bella cosa. Inoltre, se avevate configurato più di un'istanza, queste sarebbero state tutte copie indipendenti, con seri problemi di sincronizzazione e persistenza dei dati.

Fortunatamente, è possibile evitare tutto questo! Grazie al gruppo *Microsoft DPE*, esiste una soluzione più semplice: il <a href="http://waacceleratorumbraco.codeplex.com/">Windows Azure Accelerator for Umbraco</a>.

Nel prossimo post, analizzeremo il progetto.