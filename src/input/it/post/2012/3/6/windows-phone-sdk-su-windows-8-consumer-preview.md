---
Title: Windows Phone Sdk Su Windows 8 Consumer Preview
Published: 2012-03-06 01:20:00
Language: it
Description: Come molti sviluppatori, in questi giorni sto fremendo per poter iniziare ad usare la Consumer Preview regolarmente, sia a lavoro che a casa. Tuttavia Windows 8 è ancora in versione preliminare, il che implica che potrebbero esserci delle incompatibilità con dispositivi e software. Prima di migrare la workstation completamente alla prossima versione di Windows, ieri ho iniziato a giocare con Windows 8 Consumer Preview 32bit su un portatile secondario (un DELL XPS M1330) con un unico obiettivo verificare quali strumenti di sviluppo funzionano e quali no.
Tags:
- windows 8
- phone 7
- phone
RedirectFrom: it/2012/3/6/windows-phone-sdk-su-windows-8-consumer-preview.aspx
TranslatedRefs: en/posts/2012/3/6/windows-phone-sdk-on-windows-8-consumer-preview.md
DisqusId: 4638683687F4777328AA117C6619F81F38AD1CDB34F463DF1E8162159EEF9969
---
Come molti sviluppatori, in questi giorni sto fremendo per poter iniziare ad usare la Consumer Preview regolarmente, sia a lavoro che a casa. Tuttavia Windows 8 è ancora in versione preliminare, il che implica che potrebbero esserci delle incompatibilità con dispositivi e software. Prima di migrare la workstation completamente alla prossima versione di Windows, ieri ho iniziato a giocare con **Windows 8 Consumer Preview 32bit** su un portatile secondario (un DELL XPS M1330) con un unico obiettivo: verificare quali strumenti di sviluppo funzionano e quali no.

Il minimo richiesto è questo:

*   Visual Studio 2010 SP1
*   Expression Blend 4
*   Silverlight 4 SDK + strumenti
*   Windows Phone 7.1 SDK + strumenti
*   Windows Azure SDK
*   SQL Server 2008 R2
*   Visual Studio 11 Beta

Dopo un giorno di prove e una serie di workaround, sono riuscito ad installarli tutti con successo.

La chiave di tutto è installare *tutti* gli applicativi **rispettando l'ordine temporale di rilascio**: prima si installano tutti i "vecchi" strumenti di sviluppo e i loro aggiornamenti/service pack, quindi il nuovo VS11 Beta.

Ho incontrato alcuni problemi con **Windows Azure SDK** (ma seguendo <a href="http://www.windowsazure.com/en-us/develop/net/other-resources/windows-azure-on-windows-8/" target="_blank">questa guida</a> l'installazione procede con successo; *bisogna solo ricordarsi di avviare VS2010 con diritti di amministratore per poter fare debug con l'emulatore di Azure*) e **Windows Phone 7.1 SDK**, che <a href="http://windowsteamblog.com/windows_phone/b/wpdev/archive/2012/03/05/windows-8-and-the-windows-phone-sdk.aspx" target="_blank">attualmente presenta alcune problematiche note</a>.

Dal blog ufficiale di Windows Phone, queste sono le problematiche che si hanno eseguendo Windows Phone SDK su Windows 8 Consumer Preview:

*   **Non è supportato in VS11**: serve VS2010.
*   **.NET 3.5**. Capability.exe e slsvcutil.exe non
funzionano in Windows 8.

Fix: basta installare .NET 3.5 da **Control Panel - Turn Windows features on/off**.

*   **XNA Game Studio**. Durante l'installazione del
Windows Phone SDK, l'utente riceverà dei messaggi di errore
riguardanti alcuni componenti XNA. Questi componenti non si
installeranno in Windows 8; una soluzione si trova sul <a href="http://blogs.msdn.com/b/astebner/archive/2012/02/29/10274694.aspx" target="_blank">blog di Aaron Stebner</a>.

Questi sono i passi per installare correttamente l'SDK:

<div style="margin-left: 2em;">

1.  Scaricare e installare l'ultima versione di **Games for
Windows - LIVE Redistributable ** da <a href="http://www.xbox.com/en-US/LIVE/PC/DownloadClient" target="_blank">http://www.xbox.com/en-US/LIVE/PC/DownloadClient</a>
2.  Installare Windows Phone SDK 7.1
</div>

*   **Windows Phone Emulator**. Windows 8 non può far
girare il Windows Phone Emulator, il che rende più difficile fare
il debug delle proprie applicazioni. Ci sono due opzioni:
sviluppare con un dispositivo fisico (funziona senza problemi) o
provare con questo semplice workaround: **impostare Microsoft
XDE in modo che venga lanciato in modalità compatibile "Windows
7"**.  

 Questi sono i passi per configurare l'emulatore, *dopo*
l'installazione dell'SDK:

1.  Aprire Explorer e andare nella cartella "C:\Program
Files\Microsoft XDE\1.0"
2.  Fare clic con il tasto destro sul file XDE.exe, quindi
scegliere Properties
3.  Nella finestra Properties, andare nel tab Compatibility
4.  Selezionare il flag "Run this program in compatibility mode
for" e scegliere "Windows 7" dalla lista.
5.  Click su OK

Ora è possibile fare il deploy e il debug di applicazioni Windows Phone da VS2010 come si fa in Windows 7. L'emulatore girerà un po' più lentamente, ma funziona.

Riassumendo, questo è l'ordine di installazione che ho seguito e che funziona (attenzione: *non posso tuttavia assicurare che questo funzionerà anche sulle vostre macchine!*):

1.  Windows 8 Consumer Preview 32bit
2.  Drivers / aggiornamenti
3.  Visual Studio 2010
4.  Visual Studio 2010 SP1
5.  Expression Blend 4
6.  Expression Blend 4 SP1
7.  Silverlight 4 SDK + strumenti
8.  pre-requisiti Windows Azure SDK (da <a href="http://www.windowsazure.com/en-us/develop/net/other-resources/windows-azure-on-windows-8/">
questa guida</a>)
9.  SQL Server 2008 R2
10.  SQL Server 2008 R2 SP1
11.  Windows Azure SDK 1.6
12.  Games for Windows - LIVE Redistributable
13.  Windows Phone 7.1 SDK + strumenti
14.  Zune
15.  Visual Studio 11 Beta

Mi è rimasta una sola problematica aperta con questa sequenza di installazione: **Blend 5 Beta** non funziona. Si avvia, ma quando si prova a creare un nuovo progetto partendo dai modelli disponibili (sia HTML e sia XAML) o aprendo un progetto esistente creato in VS11, semplicemente visualizza soltanto una Solution vuota. Quando si prova ad aggiungere un progetto esistente alla Solution, dà un errore "Unsupported project" e non lo carica.

Sto cercando un modo per risolvere il problema. Non ho ancora provato, ma forse una possibile soluzione è quella di disintallare Expression Blend 4, re-installare VS11 e quindi installare di nuovo Expression Blend 4.

Qualcuno ha qualche altra idea o ha avuto un'esperienza simile?