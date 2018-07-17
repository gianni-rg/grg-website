---
Title: Esperimenti Con Wes8 Ctp E Kinect
Published: 2012-04-03 19:30:00
Language: it
Image: /assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_AsusEeeTop_3.jpg
Description: Per un progetto demo con Kinect, la mia collega Dorangela Daniele ed io abbiamo iniziato a giocare un po' con il recente Windows Embedded Standard 8 CTP . Ho già avuto modo di provare che sia Kinect SDK 1.0 Beta 2 e Kinect SDK 1.0 RTM funzionano senza problemi in Windows 8 Consumer Preview , così eravamo abbastanza sicuri che funzionassero bene anche in WES8.
Tags:
- embedded
- kinect
- standard 8
RedirectFrom: it/2012/4/3/esperimenti-con-wes8-ctp-e-kinect.aspx
TranslatedRefs: en/posts/2012/4/3/experimenting-with-wes8-ctp-and-kinect.md
DisqusId: B8B5757924076B2FC934B5FD1A926504865951421C514A40A0514BD888CA0E6D
---
Per un progetto demo con Kinect, la mia collega *Dorangela Daniele* ed io abbiamo iniziato a giocare un po' con il recente *Windows Embedded Standard 8 CTP*. Ho già avuto modo di provare che sia *Kinect SDK 1.0 Beta 2* e *Kinect SDK 1.0 RTM* funzionano senza problemi in *Windows 8 Consumer Preview*, così eravamo abbastanza sicuri che funzionassero bene anche in WES8.

Usando IBW, Dora ha installato WES8 su due dispositivi embedded: un **Asus Eee Top 1602** e un **Advantech AIMB-212**. Al momento, nella versione CTP, non ci sono i modelli "*Application Compatibility*" o "*Kinect for Windows Embedded*" con cui partire per creare una nuova immagine. In aggiunta, non è ancora in funzione il meccanismo di risoluzione delle dipendenze automatico. Per questo, ha dovuto creare l'immagine  partendo da zero: per essere sicuri di includere tutti i componenti richiesti durante la fase di installazione, ha selezionato praticamente tutti i *moduli*, inclusi i pre-requisiti di Kinect SDK (**.NET Framework 4.0**, **DirectX runtime**), Internet Explorer e Metro UI.

![Advantech Device](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_AdvantechDevice_3.jpg)Dopo che il setup è stato completato con successo e tutti i driver sono stati installati manualmente (i driver per Windows 8 non esistono ancora, così abbiamo usato quelli per Windows 7, che possono essere scaricati dai rispettivi siti dei produttori), ha installato i runtime **Visual C++ 10** e ha provato a lanciare il setup di *Kinect SDK 1.0 Beta 2*. Purtroppo, mancava ancora qualcosa al sistema e il setup falliva…

Per capire che cosa mancava, Dora ha creato un nuovo answer file per WES7 in ICE,  usando il modello "*Kinect for Windows*". Quindi, package per package, ha confrontato quelli inclusi con i *moduli* elencati nel file unattend.xml, preso dall'immagine WES8 installata.

Questi sono alcuni screenshot che mostrano *TUTTI* i moduli installati da IBW:

<a href="/media/2927/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect01_4.jpg"> ![ICE-WES8_Kinect01](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect01_thumb_1.jpg)</a> <a href="/media/2937/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect02_4.jpg"> ![ICE-WES8_Kinect02](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect02_thumb_1.jpg)</a> <a href="/media/2947/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect03_2.jpg"> ![ICE-WES8_Kinect03](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect03_thumb.jpg)</a> <a href="/media/2957/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect04_2.jpg"> ![ICE-WES8_Kinect04](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect04_thumb.jpg)</a> <a href="/media/2967/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect05_2.jpg"> ![ICE-WES8_Kinect05](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect05_thumb.jpg)</a> <a href="/media/2977/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect06_2.jpg"> ![ICE-WES8_Kinect06](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect06_thumb.jpg)</a> <a href="/media/2987/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect07_2.jpg"> ![ICE-WES8_Kinect07](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect07_thumb.jpg)</a>

e queste erano le componenti mancanti:

*   <div style="text-align: justify;">
Microsoft-Windows-Embedded-DeviceUX-Package~31bf3856ad364e35~x86~~6.2.8250.0.cab</div>

*   <div style="text-align: justify;">
Microsoft-Windows-Embedded-INF-ksfilter~31bf3856ad364e35~x86~~6.2.8250.0.cab</div>

*   <div style="text-align: justify;">
Microsoft-Windows-Embedded-INF-wdmaudio~31bf3856ad364e35~x86~~6.2.8250.0.cab</div>

*   <div style="text-align: justify;">
Microsoft-Windows-Embedded-INF-wdma-usb~31bf3856ad364e35~x86~~6.2.8250.0.cab</div>

*   <div style="text-align: justify;">
Microsoft-Windows-Embedded-INF-winusb~31bf3856ad364e35~x86~~6.2.8250.0.cab</div>

*   <div style="text-align: justify;">
Microsoft-Windows-Embedded-MediaPlayer-Package~31bf3856ad364e35~x86~~6.2.8250.0.cab</div>

che sono state aggiunte all'immagine WES8 usando DISM.

Dopo averle aggiunte, lanciando nuovamente il setup del Kinect SDK, l'installazione è avvenuta con successo.

Abbiamo avuto alcuni problemi  nell'abilitare Kinect sul dispositivo Advantech, probabilmente  a causa dei driver della scheda grafica integrata. Questi, invece, sono gli applicativi di esempio di Kinect in funzione in WES8 sull'*Asus Eee Top*:

<div id="scid:5737277B-5D6D-4f48-ABFC-DD9C333F4C5D:55d93e99-11b6-4f8b-825c-e53e1ddd5a3f" class="wlWriterEditableSmartContent" style="display: block; float: none; margin: 0px auto; padding: 0px; width: 448px;">
<object width="420" height="315" data="http://www.youtube.com/v/9IVbpARt9fQ?version=3&hl=it_IT" type="application/x-shockwave-flash"><param name="allowFullScreen" value="true">
<param name="allowscriptaccess" value="always">
<param name="src" value="http://www.youtube.com/v/9IVbpARt9fQ?version=3&hl=it_IT">
<param name="allowfullscreen" value="true">
</object></div>

Le prestazioni di Kinect non sono proprio ottimali, a causa dell'hardware utilizzato, tuttavia Windows Embedded Standard 8 e la sua interfaccia Metro sono veramente veloci e fluidi!

Se avete domande/suggerimenti o se avete fatto esperimenti con WES8, condividete! E tornate nelle prossime settimane per aggiornamenti e altri progetti con la prossima versione di *Windows Embedded Standard*.