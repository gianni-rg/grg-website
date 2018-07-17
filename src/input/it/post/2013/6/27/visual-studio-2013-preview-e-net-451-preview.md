---
Title: Visual Studio 2013 Preview E .Net 4.5.1 Preview
Published: 2013-06-27 08:45:00
Language: it
Description: Alcune settimane fa al TechEd North America 2013 , Microsoft ha annunciato la prossima versione di Visual Studio e ha condiviso i progressi fatti con Visual Studio 2013 e Team Foundation Server/Service nel supportare moderni cicli di produzione delle applicazioni. La nuova versione include molte funzionalità, come il supporto Agile, test di carico cloud-based , integrazione dei commenti al codice in TFS e supporto integrato per Git . Ieri è stata resa disponibile una versione Preview con licenza go-live , che include anche .NET Framework 4.5.1 .
Tags:
- windows 8
- visual studio 2013
RedirectFrom: it/2013/6/27/visual-studio-2013-preview-e-net-451-preview.aspx
TranslatedRefs: en/posts/2013/6/27/visual-studio-2013-preview-and-net-451-preview.md
DisqusId: 474A552E772AE50BC2E882CC85DCC9540612A80D6067313E78E93A174120D900
---
Alcune settimane fa al *TechEd North America 2013*, Microsoft <a href="http://blogs.msdn.com/b/somasegar/archive/2013/06/03/teched-2013.aspx" target="_blank">ha annunciato la prossima versione di Visual Studio</a> e ha condiviso i progressi fatti con Visual Studio 2013 e Team Foundation Server/Service nel supportare moderni cicli di produzione delle applicazioni. La nuova versione include molte funzionalità, come il supporto Agile, <a href="http://blogs.msdn.com/b/visualstudioalm/archive/2013/06/03/introducing-cloud-based-load-testing-with-team-foundation-service.aspx" target="_blank">test di carico cloud-based</a>, integrazione dei commenti al codice in TFS e <a href="http://blogs.msdn.com/b/bharry/archive/2013/06/19/enterprise-grade-git.aspx" target="_blank">supporto integrato per Git</a>.

Ieri è stata resa <a href="http://go.microsoft.com/fwlink/?LinkId=306566" target="_blank">disponibile</a> una versione *Preview* con licenza "go-live", che include anche **.NET Framework 4.5.1**.

Alcuni dei miglioramenti che Visual Studio 2013 contiene estendono le funzionalità introdotte negli Update di Visual Studio 2012 dallo scorso settembre, mentre molti altri sono nuove esperienze progettate per applicazioni moderne, connesse, robuste e ad alte prestazioni.

Vediamo qualche nuova funzionalità interessante.

**.NET Framework 4.5.1**

.NET 4.5.1 è un aggiornamento altamente compatibile di .NET 4.5, incluso in Windows 8.1. .NET 4.5.1 Preview può essere installato con Visual Studio 2013 Preview, è incluso in <a href="http://blogs.windows.com/windows/b/bloggingwindows/archive/2013/06/26/the-windows-8-1-preview-is-here.aspx" target="_blank">Windows 8.1 Preview</a> ed è anche disponibile come installazione singola per Windows 8, Windows 7, Windows Vista e le corrispondenti versioni Windows Server.

Molto del lavoro fatto per questa versione di .NET è stato focalizzato per migliorare il debug e la diagnostica delle applicazioni per gli sviluppatori. Alcuni esempi:

*   vedere nel debugger il valore ritornato da un metodo, anche se
questo valore non viene memorizzato in una variabile
*   "Edit and Continue" per 64-bit
*   supporto per debug Async/Await (*solo* in Visual Studio
2013 su Windows 8.1)

Questo rilascio include anche miglioramenti di performance, come il supporto per la compattazione on-demand del large object heap del GC e avvio più rapido delle app su macchine multicore.

**XAML**

Sia che si usi .NET o C++, lo sviluppo con XAML per le Windows Store app è stato migliorato. In aggiunta ad un miglioramento delle prestazioni dei Designer XAML di Visual Studio e Blend, ci sono molti miglioramenti allo XAML Editor in Visual Studio, inclusi IntelliSense per DataBinding e risorse, supporto "Go To Definition" per stili e code snippets. Il Designer in Blend ora fornisce delle guide che permettono di avere dei layout perfetti a livello di pixel e gli stili possono ora essere modificati nel loro contesto di utilizzo. Una delle novità legate a XAML è lo *XAML UI Responsiveness tool*.  In <a href="http://blogs.msdn.com/b/somasegar/archive/2013/04/04/visual-studio-2012-update-2-now-available.aspx" target="_blank">VS2012.2</a>, era stato introdotto l'*HTML UI Responsiveness tool*, focalizzato al profiling delle prestazioni delle app Windows Store implementate in HTML e JavaScript; ora in Visual Studio 2013, il nuovo XAML UI Responsiveness tool fornisce un supporto analogo per le app Windows Store sviluppate in XAML, in modo da poter tracciare e risolvere glitch, rallentamenti e altre anomalie nelle Modern UI. E per migliorare la qualità delle app Windows Store, Visual Studio 2013 supporta anche i Coded UI testing con XAML.

**Diagnostica**

Visual Studio 2013 include un nuovo *Performance and Diagnostics hub*, che permette di trovare tutti gli strumenti per diagnostica e prestazioni in un posto comodo. Un nuovo strumento disponibile nell'hub è l'*Energy Consumption too*l. La vita delle batterie è di primaria importanza per gli utenti e, così come l'uso delle risorse di un'app nel cloud impatta sui costi di servizio, allo stesso modo il consumo di risorse di un'app su un dispositivo impatta sulla vita della sua batteria. Per aiutare in questa direzione, Visual Studio 2013 include un nuovo *Energy Consumption* profiler, che permette agli sviluppatori di stimare quanta energia sarà consumata dall'app in funzione su un dispositivo e le ragioni che causano tali consumi.

Ci sono moltissime altre funzionalità e miglioramenti che vengono toccati da questa nuova versione. Per dettagli, leggete il post di <a href="http://blogs.msdn.com/b/somasegar/archive/2013/06/26/visual-studio-2013-preview.aspx" target="_blank">Somasegar</a> e provate voi stessi <a href="http://go.microsoft.com/fwlink/?LinkId=306566" target="_blank">Visual Studio 2013 Preview</a>.