---
Title: Kinect Sdk E Applicazioni Windows 8 Metro-Style
Published: 2012-02-16 21:30:00
Language: it
Description: Nell'ambito di un progetto di tesi riguardante lo studio di NUI ( Natural User Interfaces , interfacce utente naturali), condotto da Marina Sabetta, studentessa del Politecnico di Torino, è in fase di sviluppo un prototipo di un dispositivo embedded per la casa rivolto ad anziani e persone non-tecnologiche, che ha l'obiettivo di permettere loro di navigare sul web, inviare/ricevere e-mail, interagire con Instant Messengers e utilizzare il telefono cellulare, in maniera semplice e intuitiva. Il prototipo è basato su Windows 8 Developer Preview e consiste principalmente in un'applicazione Metro-style sviluppata in .NET con la funzione di shell di sistema.
Tags:
- windows 8
- kinect
RedirectFrom: it/2012/2/16/kinect-sdk-e-applicazioni-windows-8-metro-style.aspx
TranslatedRefs: en/posts/2012/2/16/kinect-sdk-and-windows-8-metro-style-apps.md
DisqusId: 34C32433DB4DF814161477851C837C46349855C18A603084530FCED5088B95E0
---
Nell'ambito di un progetto di tesi riguardante lo studio di NUI (*Natural User Interfaces*, interfacce utente naturali), condotto da Marina Sabetta, studentessa del Politecnico di Torino, è in fase di sviluppo un prototipo di un dispositivo embedded per la casa rivolto ad anziani e persone non-tecnologiche, che ha l'obiettivo di permettere loro di navigare sul web, inviare/ricevere e-mail, interagire con Instant Messengers e utilizzare il telefono cellulare, in maniera semplice e intuitiva. Il prototipo è basato su **Windows 8 Developer Preview** e consiste principalmente in un'applicazione Metro-style sviluppata in .NET con la funzione di shell di sistema.

Tra una moltitudine di problemi di integrazione e sviluppo brillantemente risolti tramite soluzioni ad-hoc e work-around dalla tesista Marina - dovuti al fatto che si è scelto di utilizzare il nuovissimo sistema operativo, le nuove (e incomplete) API di sistema WinRT, la scarsità di esempi e documentazione - uno in particolare ha fatto scervellare non poco sulla sua risoluzione: *l'uso di Kinect in un'applicazione Metro-style*.

*Il progetto utilizza ancora la versione di Kinect SDK Beta 2* con un sensore Kinect per Xbox: secondo la documentazione, Windows 8 Developer Preview è supportato, ma per le sole applicazioni desktop. Sono state fatte un po' di prove in ambiente Windows 8 desktop ed effettivamente non ci sono stati particolari problemi nel suo utilizzo (abbiamo fatto una prova anche con il nuovissimo SDK Kinect for Windows 1.0, rilasciato un paio di settimane fa in combinazione con il sensore Kinect for Xbox). Tuttavia l'obiettivo era quello di controllare con Kinect la shell del sistema embedded che, come già detto, è un'applicazione Metro-style.

Andando contro alla documentazione ufficiale, sono stati fatti vari tentativi per referenziare direttamente le librerie dell'SDK nell'applicazione Metro. Procedendo per passi successivi su una piccola applicazione Metro di test, aggiungendo via via tutte le reference necessarie e implementando alcune classi/interfacce mancanti in WinRT, alla fine si è riusciti ad ottenere una compilazione priva di errori. Tuttavia alla prima, fondamentale chiamata di inizializzazione del runtime di Kinect, l'applicazione termina brutalmente, senza eccezioni o errori significativi.

Non avendo indicazioni su quale direzione prendere per indagare ulteriormente sul problema, sono state pensate alcune architetture alternative: dal momento che un'applicazione Metro-style vive in una sand-box come avviene per le applicazioni Silverlight (web e Windows Phone), un modo per metterla in comunicazione con il mondo esterno è tramite Web Services oppure socket.

Da qui l'idea: dal momento che Kinect SDK funziona benissimo in applicazioni Windows 8 desktop, si è pensata una soluzione client-server in cui un'applicazione .NET (Windows Forms, console o WPF) interagisce direttamente con il sensore Kinect e ne espone le funzionalità e i dati al client (in questo caso una Metro-style app) che vi si collega. Sostanzialmente è stata pensata una remotizzazione ed astrazione del sensore Kinect, resa disponibile tramite un servizio WCF. In seguito ad alcune prove, ci si è resi conto che l'overhead introdotto da WCF è notevole, così il server è stato rivisto in modo che le connessioni sono gestite tramite socket e i dati sono scambiati attraverso un protocollo testuale in formato JSON.

In un prossimo post, vedremo un po' più in dettaglio la soluzione. Nel frattempo potete vederlo in funzione in questo breve video, realizzato in laboratorio.

In a next post, we'll see some details of the implemented solution. At the moment, you can see it in this short video, shoot in our laboratory.

<object style="display: block; margin-left: auto; margin-right: auto;" width="480" height="360" data="https://www.youtube.com/v/dZIF5qYcdoI?version=3&hl=it_IT" type="application/x-shockwave-flash"><param name="allowFullScreen" value="true"> <param name="allowscriptaccess" value="always"> <param name="src" value="https://www.youtube.com/v/dZIF5qYcdoI?version=3&hl=it_IT"> <param name="allowfullscreen" value="true"> </object>

Potenzialmente, se il server fosse pubblicamente esposto su Internet, il client potrebbe risiedere ovunque nel mondo, funzionare su qualunque piattaforma (Windows, Mac, smartphone o tablet) e fare uso dei dati di un sensore Kinect remoto.