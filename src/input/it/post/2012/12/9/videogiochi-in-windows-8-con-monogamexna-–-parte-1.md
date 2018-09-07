---
Title: Videogiochi In Windows 8 Con Monogame/Xna – Parte 1
Published: 2012-12-09 13:45:00
Language: it
Image: /assets/images/monogamewin8.png
Description: XNA è un framework .NET per lo sviluppo di videogiochi che appassionati e sviluppatori indipendenti possono usare (e usano) fin dal 2004 per creare giochi per Windows, XBOX e, più di recente, per Windows Phone. Il framework fornisce una gestione integrata dei contenuti ( content pipeline ) funzioni per caricare e importare immagini, texture, font, animazioni e modelli 3D gestione dei suoni gestione dell'input utente (tastiera, mouse, gamepad, touch) una buona architettura per gestire logica e ciclo di gioco ( game loop )
Tags:
- windows 8
- xna
- monogame
- videogames
RedirectFrom: it/2012/12/9/videogiochi-in-windows-8-con-monogamexna-–-parte-1.aspx
TranslatedRefs: en/posts/2012/12/9/videogames-in-windows-8-with-monogamexna-–-part-1.md
DisqusId: 3FC99C8C588C82D03D886773ED155184EEEA39E9E29844E4B6584AD07CBA97C6
---
# Introduzione

**XNA** è un framework .NET per lo sviluppo di videogiochi che appassionati e sviluppatori indipendenti possono usare (e usano) fin dal 2004 per creare giochi per Windows, XBOX e, più di recente, per Windows Phone. Il framework fornisce:

*   una gestione integrata dei contenuti (*content
pipeline*)
*   funzioni per caricare e importare immagini, texture, font,
animazioni e modelli 3D
*   gestione dei suoni
*   gestione dell'input utente (tastiera, mouse, gamepad,
touch)
*   una buona architettura per gestire logica e ciclo di gioco
(*game loop*)

Lo sviluppo di giochi non è per nulla banale e XNA è un fantastico framework per iniziare, adatto sia per sviluppatori principianti di videogiochi e sia per studenti e/o sviluppatori che vogliono imparare da zero a fare giochi di buona qualità. XNA, insieme a Visual Studio, permette di iniziare in maniera molto semplice: **File** -> **Nuovo** -> **Progetto ->** **XNA Game Studio** e si è pronti a partire.

**MonoGame** è una implementazione open-source e multi-piattaforma di XNA 4.0 e del suo modello di classi. L'obiettivo di MonoGame è quello di fornire agli sviluppatori un framework per creare applicazioni che girano su Xbox 360, Windows, Windows 8, Windows Phone e ne permette anche il porting nativo (usando la *<span style="text-decoration: underline;">stesso</span>* codice C# e con *minimo* sforzo) su iOS, Android, Mac OS X e Linux. Dati questi obiettivi, è facile intuire il motto di MonoGame: "*Scrivi una volta, giochi ovunque*". Le tecnologie che rendono possibile l'esistenza di MonoGame su più piattaforme sono:

*   **OpenTK** - una libreria C# di basso livello per
gestire OpenGL, OpenCL e OpenAL per la grafica 3D.
*   **SharpDX** - un'implementazione open-source di
tutte le API DirectX per .NET, che permette lo sviluppo di giochi
ad elevate prestazioni, grafica 2D e 3D e suoni in real-time.
*   **Lidgren.Network** - una libreria .NET per
gestire in maniera ottimale la connettività di rete, usando socket
UDP e API client-server di alto livello per collegarsi, leggere e
inviare messaggi.

In questa serie di post, andremo a sviluppare da zero un gioco per Windows 8, sfruttando MonoGame e XNA. Queste tecnologie non sono le uniche che si possono utilizzare per fare giochi in Windows 8: Microsoft ha puntato molto anche sullo sviluppo nativo in C++ e DirectX, soprattutto per facilitare il porting di giochi *esistenti* da altre piattaforme, da parte di software house e sviluppatori di giochi. In questa serie non ci occuperemo di C++ e DirectX, magari si farà in una serie futura.

# Ambiente di sviluppo

Prima di poter scrivere giochi per Windows 8 con MonoGame, bisogna preparare e configurare l'ambiente di sviluppo. Qui di seguito potete trovare i passi da seguire <span style="text-decoration: underline;">in ordine</span> per preparare il tutto sulla vostra macchina:

1.  **Installare "Microsoft Windows 8"**
2.  **Installare "Games for Windows"** 

<a href="http://www.xbox.com/en-US/LIVE/PC/DownloadClient" target="_blank">**http://www.xbox.com/en-US/LIVE/PC/DownloadClient**</a>

3.  **OPZIONALE - SOLO SE <span style="text-decoration: underline;">NON</span> INSTALLATE VISUAL
STUDIO 2010 o SE <span style="text-decoration: underline;">NON</span> INSTALLATE WINDOWS
PHONE 8 SDK** 

> **Visual Studio 2010 Express for Windows Phone
>  ** <a href="http://go.microsoft.com/fwlink/?LinkId=258412" target="_blank">**http://go.microsoft.com/fwlink/?LinkId=258412**</a>

> *Perché serve Visual Studio 2010*? In XNA c'è una funzionalità, la *Content Pipeline*, che è un passo di pre-compilazione che serve a preparare in formato binario ottimizzato (.XNB) contenuti grafici, font, modelli e suoni per l'uso nel runtime XNA. Questa funzionalità non è disponibile, per ora, in MonoGame. Per poter preparare i contenuti, bisogna quindi appoggiarsi alla *Content Pipeline* ufficiale di Microsoft, disponibile *solo* in **Visual Studio 2010 + Windows Phone SDK 7.x** *oppure* **Visual** **Studio 2012 + Windows Phone 8 SDK**. Se non volete installare il Windows Phone 8 SDK *oppure* se avete già Visual Studio 2010 + Windows Phone 7.x SDK installato, potete evitare questo passo.

4.  **Installare "Visual Studio 2012"** 

> <a href="http://www.microsoft.com/visualstudio/ita/downloads" target="_blank">Visual Studio 2012 Express</a>
> 
> **oppure**
> 
> Visual Studio 2012 Pro/Premium/Ultimate: licenza DreamSpark, MSDN o altra copia licenziata

5.  **Installare "Windows Phone 8 SDK"** 

> <a href="http://go.microsoft.com/fwlink/?LinkId=265772" target="_blank">**http://go.microsoft.com/fwlink/?LinkId=265772**</a>
> 
> SOLO SE <span style="text-decoration: underline;">NON</span> AVETE INSTALLATO **VS2010 Express per Windows Phone** o **VS2010 + Windows Phone 7.x SDK**.
> 
> *Ovviamente*, se avete intenzione di sviluppare applicazioni e/o giochi per Windows Phone 8, potete comunque installare anche questo pacchetto.

6.  **Installare "MonoGame 3.0" Windows Installer:** 

> <a href="http://monogame.codeplex.com/" target="_blank">**http://monogame.codeplex.com/**</a>

> Con MonoGame 3.0 è stato introdotto un Windows Installer che installa MonoGame e le librerie SharpDX necessarie a creare progetti XNA 4.0 in Windows 8. Verranno anche installati due modelli MonoGame all'interno di Visual Studio, da cui partire per creare un nuovo progetto XNA/MonoGame.

# Creare un progetto MonoGame

Lo sviluppo di qualunque gioco Windows 8 basato su MonoGame, inizia dai seguenti passi:

## Passo 1 - Creare un progetto MonoGame e impostare i
riferimenti

Aprire **Visual Studio 2012** e scegliere **Nuovo progetto**. Sotto **Modelli**, scegliere **Visual C#**: nella lista dovrebbero essere visibili anche i modelli di progetto MonoGame. Tra quei modelli, scegliere **MonoGame Game (XAML)**. Dare il nome "**Win8Game**" al progetto e assicurarsi che sia selezionata l'opzione "**Crea directory per soluzione**".

![Figura 1 - Visual Studio 2012 con i modelli MonoGame](/assets/images/Windows-Live-Writer_Videogiochi-in-Windows-8-con-MonoGame_1341F_Figura1_3.png) **Figura 1** - *Visual Studio 2012 con i modelli MonoGame*

## Passo 2 - Provare l'ambiente MonoGame

Vediamo ora se l'ambiente MonoGame è stato configurato correttamente. Compilate e lanciate l'applicazione sul Computer Locale o nel Simulatore di Windows. Se è tutto a posto, dovreste vedere una schermata di colore azzurro, tipica schermata di avvio di tutti i progetti XNA.

![Simulatore Windows con il gioco MonoGame](/assets/images/Windows-Live-Writer_Videogiochi-in-Windows-8-con-MonoGame_1341F_image_3.png)

Se non funziona o ci sono errori di compilazione, controllate di avere correttamente impostato i riferimenti a MonoGame (seguendo le istruzioni del passo 3).

## Passo 3 - Aggiungere i riferimenti a MonoGame (opzionale)

***Seguire queste istruzioni SOLO se MonoGame è stato scaricato e/o ricompilato dai sorgenti o se non funzionano i modelli di progetto MonoGame. Se MonoGame è stato installato usando l'Installer, queste operazioni non dovrebbero servire.***

Bisogna assicurarsi che la Soluzione abbia i riferimenti corretti al Framework MonoGame e alle sue dipendenze. Fare click con il tasto destro sulla Soluzione in *Esplora Soluzioni* e scegliere **Aggiungi** **->** **Progetto** **esistente**.

![Figura 2 - Aggiungere un progetto esistente alla Soluzione ](/assets/images/Windows-Live-Writer_Videogiochi-in-Windows-8-con-MonoGame_1341F_Figura2_3.png)  
 **Figura 2** - *Aggiungere un progetto esistente alla Soluzione*

Andate nella cartella in cui avete scaricato i sorgenti di MonoGame (es. **C:\Users*\[user]*\Documents\Projects\MonoGame**). Navigate nella cartella chiamata **MonoGame.Framework**. In questa cartella troverete il file di progetto **MonoGame.Framework.Windows8.csproj**. Scegliete questo file e fate click su **Apri**.

**![Figura 3 - Aggiungete il progetto MonoGame.Framework.Windows8 alla Soluzione](/assets/images/Windows-Live-Writer_Videogiochi-in-Windows-8-con-MonoGame_1341F_Figura3_3.png)**

**Figura 3** - *Aggiungete il progetto MonoGame.Framework.Windows8 alla Soluzione*

Una volta che il progetto è stato aggiunto alla Soluzione, fate click con il tasto destro sul progetto **MonoGame.Framework.Windows8** e selezionate **Pulisci**. Quindi rifate nuovamente click con il tasto destro e scegliete **Compila**. Dopo aver compilato, vedrete alcuni avvisi: non preoccupatevi, è normale.

Ora andate nel progetto **Win8Game**, fate click con il tasto destro su **Riferimenti** e selezionate **Aggiungi** **riferimento**. In **Gestione riferimenti**, dobbiamo aggiungere il riferimento al progetto **MonoGame.Framework**, selezionando **Soluzione** e poi **Progetti**. Spuntate il progetto **MonoGame.Framework**. Fate poi click su OK (Figura 4). Tornate nuovamente in **Gestione riferimenti** e fate click sul pulsante **Sfoglia**: dobbiamo ora aggiungere tutte le dipendenze del Framework MonoGame. Andate nella cartella: **C:\Users\*[user]\*Documents\Projects\MonoGame\ThirdParty\Libs\SharpDX\Windows 8 Metro** e selezionate tutti i file .DLL presenti. Fate click su OK per confermare.

![Figura 4 - Aggiungere il Framework MonoGame e le sue dipendenze](/assets/images/Windows-Live-Writer_Videogiochi-in-Windows-8-con-MonoGame_1341F_Figura4_3.png)

**Figura 4** - *Aggiungere il Framework MonoGame e le sue dipendenze*

Infine, fate click con il tasto destro sul progetto **Win8Game**. Selezionate **Dipendenze progetto** e spuntate **MonoGame.Framework.Windows8**. Fate click su OK e quindi ricompilate l'intera Soluzione. E' probabile che otterrete degli avvisi, ma se avete seguito i passi precedenti correttamente, non dovrebbero esserci errori.

![Figura 5 - Aggiungere al progetto la dipendenza MonoGame.Framework](/assets/images/Windows-Live-Writer_Videogiochi-in-Windows-8-con-MonoGame_1341F_Figura5_3.png)

**Figura 5** - *Aggiungere al progetto la dipendenza MonoGame.Framework*

Ora siete pronti per iniziare a sviluppare giochi in Windows 8. Nel prossimo post della serie, vedremo come aggiungere i primi elementi di un gioco.