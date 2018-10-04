---
Title: Compilare Caffe2 e Detectron con supporto GPU su Windows (Parte 1 di 2)
Published: 2018-10-04 17:40:00
Language: it
Description: Nelle ultime settimane, ho avuto bisogno di provare ed usare alcuni modelli personalizzati implementati con il framework Caffe2 e Detectron. Sono progetti attivamente sviluppati su Linux, ma ho avuto bisogno di farli girare su Windows 10 con supporto GPU CUDA. Questo post (parte 1 di 2) è una guida passo-passo su come l'ho fatto, sperando che possa essere utile ad altre persone con le stesse necessità.
Image: /assets/images/build_caffe2_win.jpg
Tags:
- AI
- Machine Learning
- Deep Learning
- CUDA
- Python
- Caffe2
- Detectron
- Object Detection
TranslatedRefs: en/posts/2018/10/4/caffe2-gpu-windows-1.md
DisqusId: 801FFD6F372A48B7A5993848F7C83CA4BC6CB9BBCB9A45F584118983A87FDABA
---
Nelle ultime settimane, ho avuto bisogno di provare ed usare alcuni modelli personalizzati implementati con il framework <a href="https://caffe2.ai/" target="_blank">Caffe2</a> e <a href="https://github.com/facebookresearch/Detectron" target="_blank">Detectron</a>. Sono progetti attivamente sviluppati su Linux, ma ho avuto bisogno di farli girare su **Windows 10 con supporto GPU CUDA**. E' possibile compilare Caffe2 per Windows, e una <a href="https://caffe2.ai/docs/getting-started.html?platform=windows&configuration=compile" target="_blank">guida</a> &egrave; disponibile, ma se c'&egrave; bisogno di usare Detectron (*non supportato ufficialmente su Windows*), &egrave; un po' pi&ugrave; complicato, e sono necessarie alcune modifiche ai sorgenti e agli script di compilazione.

Dopo molti giorni di frustrante *trial and error*, compilazioni fallite, ricerca di idee e suggerimenti per risolvere vari problemi nelle discussioni GitHub e in vari articoli (grazie a Mianzhi Wang per <a href="https://research.wmz.ninja/articles/2017/05/build-caffe2-on-windows-10-gpu.html" target="_blank">questa guida</a>), *sono arrivato ad un modo aggiornato, pulito e riproducibile per compilare Caffe2 **e** Detectron su Windows, con supporto per CUDA 9 o CUDA 10*.

Questo post, diviso in 2 parti, &egrave; una guida passo-passo per come  __l'ho fatto io__, sperando che possa servire ad altri con le stesse necessit&agrave;. *Mettete in programma almeno 1 giorno di lavoro, per preparare il vostro sistema.* Ci sono sicuramente modi migliori per gestire alcuni fix e modifiche, ma non ho avuto abbastanza tempo per approfondire. *Se trovate miglioramenti, per favore fatemi sapere*.

<!---([Here , you can find Part 2](/en/posts/2018/10/03/caffe2-gpu-windows-2.html), with all the steps required to build and run **Detectron on Windows 10**. You need to follow all the steps of this post, prior to continue with the next.)-->

**ATTENZIONE: questa guida &egrave; stata scritta e provata nell'ultima settimana di __settembre 2018__. L'ho provata su 3 differenti macchine Windows di sviluppo (2 con CUDA 9.2, 1 con CUDA 10), con successo. Ma non posso assicurare al 100% che funzioni sulle vostre, e non posso neanche fornirvi supporto diretto in caso qualcosa non funzioni. Per favore, controllate attentamente le versioni dei pacchetti, le dipendenze, le commit git, ecc. E' molto probabile che versioni pi&ugrave; recenti (di qualcunque pacchetto, dipendenza, codici sorgenti, strumenti) possano rompere la compilazione.**

---

## Passo 0: prerequisiti

Per compilare con successo Caffe2 e Detectron su Windows 10 con supporto GPU CUDA, i seguenti pre-requisiti sono obbligatori:

- **Windows 10**: secondo la documentazione ufficiale, Windows 10 o successivo &egrave; richiesto per far girare Caffe2. Io ho usato **Windows 10 Pro/Enterprise April 2018 Update** (con tutti gli aggiornamenti, patch, fino al 30 settembre 2018).

- **Visual Studio 2017 (v15.8.4 o v15.8.5)**, con installati *Visual C++*, *gli opportuni Windows SDK* e gli strumenti di sviluppo per *Python 3.6*: compilare Caffe2 richiede un compilatore C++ compatibile. CUDA 8.0 supporta solo fino a Visual Studio 2015 con Update 3. *Se usate Visual Studio 2017, dovete per forza fare una build con CUDA 9.x o CUDA 10.0*. Io ho usato VS2017 Pro/Enterprise, ma la versione Community dovrebbe funzionare lo stesso.

- **CUDA 9.x/10.x con cuDNN 7.x installato**: lo potete scaricare e installare dal <a href="https://developer.nvidia.com/cuda-downloads" target="_blank">sito nVidia Developers</a>. Io ho provato la compilazione con **CUDA 9.2.148 x64 + Patch1 + cuDNN 7.2.1.38** e **CUDA 10.0.130 x64 + cuDNN 7.3.0.29**. Siate estremamente attenti a non mischiare le versioni, e seguite le guide ufficiali per installarli. *Controllate le variabili d'ambiente CUDA e verificate che puntino alla versione corretta che volete utilizzare per compilare*. Inoltre, aggiornate i driver nVidia all'ultima versione disponibile e compatibile (come descritto nelle note di rilascio di CUDA). Io ho usato i **driver nVidia GTX 1080 v411.63**.

- **Python 2.7.x e VC++ Compiler Package**: attualmente solo Python 2.7 &egrave; supportato (secondo alcuni commenti in GitHub Python 3 sar&agrave; supportato presto). Io ho installato <a href="https://www.python.org/downloads/release/python-2715/" target="_blank">**Python 2.7.15**</a>
 e <a href="https://www.microsoft.com/en-us/download/details.aspx?id=44266" target="_blank">**Visual C++ Compiler Package for Python 2.7**</a>. Ho messo Python 2.7 in ```c:\Python27```, *senza* aggiungerlo alla variabile d'ambiente ```PATH```. Per alcuni comandi, per lanciare Python al di fuori di un virtual environment, se non viene trovato alla riga di comando, usate il path completo (es. ```c:\python27\python.exe```).

- **Intel Math Kernel Library**: per ottimizzare le operazioni su CPU, quando la GPU non &egrave; supportata. Io ho usato <a href="https://software.intel.com/en-us/mkl/choose-download/windows" target="_blank">**i binari v2018.3 x64**</a> e il relativo <a href="https://software.intel.com/en-us/articles/installing-the-intel-distribution-for-python-and-intel-performance-libraries-with-pip-and" target="_blank">**package Python**</a>.

- **OpenCV 3.x**: ho scaricato i binari pre-compilati per Windows x64 <a href="https://sourceforge.net/projects/opencvlibrary/files/opencv-win/3.4.3/opencv-3.4.3-vc14_vc15.exe" target="_blank">**OpenCV 3.4.3**</a>. Li ho installati in ```c:\opencv```.

- **CMake 3.12.x**: richiesto per configurare e generare le soluzioni Visual Studio. Io ho usato <a href="https://cmake.org/files/v3.12/cmake-3.12.2-win64-x64.msi" target="_blank">**CMake 3.12.2 x64**</a>.

- **Visual Studio Code**, con le estensioni Python, per modificare i file di testo, script e codice Python. Ho usato <a href="https://code.visualstudio.com/" target="_blank">**VSCode v1.27.2**</a>.

- **git**: per clonare i repository e le dipendenze. Ho usato <a href="https://github.com/git-for-windows/git/releases/download/v2.19.0.windows.1/Git-2.19.0-64-bit.exe" target="_blank">**git for Windows 2.19.0**</a>
 e <a href="https://download.tortoisegit.org/tgit/2.7.0.0/TortoiseGit-2.7.0.0-64bit.msi" target="_blank">**TortoiseGit 2.7.0**</a>.

Le macchine di sviluppo che ho usato per provare questa guida sono tutte equipaggiate con **CPU Intel Core i7 7a gen**, **256GB SSD**, **16/32GB RAM**, **nVidia GTX 1070/1080**.

---

## Passo 1: Python Virtual Environment per Caffe2

1. Aprite una **x64 Native Tools Developer Command Prompt**
2. Clonate Caffe2 dal repository ufficiale su GitHub

    Al momento, Caffe2 e PyTorch sono in fase di unificazione, e il repo ufficiale ora &egrave; PyTorch.

    ```cmd
    > mkdir c:\projects\pytorch
    > cd c:\projects\pytorch
    > git clone --recursive https://github.com/pytorch/pytorch.git
    ```

    Se preferite, potete anche clonare il repo usando TortoiseGit. Ricordatevi di attivare l'opzione ```recursive```.

    Ho compilato con successo le seguenti versioni dal *master* branch:
    - **21ed7e51b606f9912b658ab63e016d7546f3b75c** (2018-09-26 10:44:03)
    - **91b6458e2d0dba935da2cc7c2cdc6d7907bc3f48** (2018-09-18 10:11:55)

3. Aggiorante pip all'ultima versione (io ho usato v18.0)

    ```cmd
    > python -m pip install -U pip
    ```
4. Installate <a href="https://docs.python-guide.org/dev/virtualenvs/" target="_blank">virtualenv</a>

    ```cmd
    > python -m pip install virtualenv
    ```
5. Create un nuovo virtual environment Python 2.7

    ```cmd
    > python -m virtualenv caffe2env
    ```
6. Attivate il virtual environment

    ```cmd
    > caffe2env\Scripts\activate
    ```

    Per uscire dal virtual environment, potete usare:
    ```cmd
    (caffe2env)> deactivate
    ```
7. Installate i pacchetti richiesti (dalla <a href="https://caffe2.ai/docs/getting-started.html?platform=windows&configuration=compile" target="_blank">guida</a> ufficiale).

    Se volete usare numpy con ottimizzazioni Intel-MKL, potete prenderlo da <a href="https://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy" target="_blank">qui</a> e installarlo *prima di qualunque altro pacchetto*. Io ho usato la **versione 1.15.2**.

    ```cmd
    (caffe2env)> pip install PATH_PER\numpy‑1.15.2+mkl‑cp27‑cp27m‑win_amd64.whl
    ```
    **Altrimenti** poteter usare il pacchetto standard:
    ```cmd
    (caffe2env)> pip install numpy
    ```
    Quindi installate le altre dipendenze:
    ```cmd
    (caffe2env)> pip install future
    (caffe2env)> pip install hypothesis
    (caffe2env)> pip install protobuf
    (caffe2env)> pip install six
    ```
    Un pacchetto richiesto non era specificato nella guida:
    ```cmd
    (caffe2env)> pip install typing
    ```
    Ho usato Ninja per velocizzare le operazioni di compilazione, abilitando le build parallele per i componenti CUDA (non ancora supportato se si usa solo MSBuild), come descritto <a href="https://pytorch.org/docs/stable/notes/windows.html#speeding-cuda-build-for-windows" target="_blank">qui</a>. Senza usare Ninja, la compilazione richiede quasi 4 ore. Con Ninja, meno di 1h.
    ```cmd
    (caffe2env)> pip install ninja
    ```
    Il nostro ambiente &egrave; pronto per compilare.

---

## Passo 2: configurare ```build_windows.bat```

Per compilare Caffe2 in Windows, con tutte le opzioni richieste, bisogna modificare lo script fornito. Si trova in ```c:\projects\pytorch\scripts\build_windows.bat```

Primo, bisogna impostare una serie di variabili d'ambiente (opzionalmente, possono essere impostate di volta in volta dalla riga di comando. Ho preferito metterle nello script per evitare di digitare i comandi ogni volta, all'apertura di una nuova console).

Prima di riga 29, aggiungete:

```cmd
set CMAKE_GENERATOR=Ninja
set OpenCV_DIR=C:\opencv\build
set USE_CUDA=ON
set GEN_TO_SOURCE=1
```

Le variabili precedenti configurano Ninja come generatore (invece che Visual Studio 2017 x64), indicano dove trovare le librerie OpenCV e attivano il supporto per CUDA. L'ultima variabile serve per evitare un errore durante la compilazione, quando gli script di ATEN generano i corrispondenti file sorgenti.

Quindi cambiate alcuni parametri per ```cmake```.

- Alla riga 71, impostate la versione corretta dell'architettura CUDA da supportare. **Nel mio caso**, volevo far girare CUDA 9/CUDA 10 su GTX 1070/1080 cos&igrave;, secondo <a href="http://arnon.dk/matching-sm-architectures-arch-and-gencode-for-various-nvidia-cards/" target="_blank">questo post</a>, ho dovuto usare l'architettura **6.1** (lasicando 5.0 non funzionava). *Per favore, cambiate questo parametro a seconda della vostra combinazione GPU/CUDA*.

    ```cmake
    -DTORCH_CUDA_ARCH_LIST=6.1
    ```

- Alla riga 80, abilitate OpenCV:

    ```cmake
    -DUSE_OPENCV=ON
    ```
- Alla riga 82, abilitate i binding Python:

    ```cmake
    -DBUILD_PYTHON=ON
    ```
- Alla riga 86, siccome stiamo usando Ninja, rimuoviamo l'opzione non supportata:

    ```cmake
    -- /maxcpucount:%NUMBER_OF_PROCESSORS%
    ```
---

## Passo 3: qualche modifica qua e l&agrave;

Per compilare con successo, bisogna apportare anche alcuni cambiamenti ai sorgenti (*&egrave; possibile che release future avranno gi&agrave; tali modifiche, oppure che si renderanno necessarie modifiche differenti*), e alcuni file sono da copiare in varie posizioni, per renderli disponibili durante le operazioni di compilazione e link.

1. Create la cartella ```build\caffe2``` in ```c:\projects\pytorch```
2. Create la cartella ```libs``` in ```c:\projects\pytorch\caffe2env```
3. Copiate ```c:\python27\libs\python27.lib``` nelle due cartelle appena create:
    - ```c:\projects\pytorch\build\caffe2```
    - ```c:\projects\pytorch\caffe2env\libs```
4. Rimuovete tutti gli ```AT_CPP14_CONSTEXPR``` da ```c:\projects\pytorch\aten\src\ATen\core\ArrayRef.h```, per sistemare un problema con il compilatore VC++ 17.
5. Sostituite un paio di "or" con "||" in  ```c:\projects\pytorch\caffe2\image\image_input_op.h```, per risolvere un problema di compilazione.

Nella compilazione per Windows, operatori aggiuntivi e personalizzati non possono essere caricati dinamicamente  (**un bug?** Date un'occhiata alle discussioni in GitHub <a href="https://github.com/pytorch/pytorch/issues/7912" target="_blank">qui</a>, e <a href="https://github.com/facebookresearch/Detectron/issues/454" target="_blank">qui</a>). Una possibile soluzione &egrave; quella di muovere *Detectron* tra gli operatori built-in di Caffe2.

1. Copiate o spostate ```modules\detectron``` in ```caffe2\operators\detectron```
2. Rimuovete la sotto-cartella "detectron" da ```modules\CMakeLists.txt``` (commentate completamente il check condizionale su MSVC e BUILD_SHARED_LIBS).
3. Cambiate ```caffe2\operators\detectron\CMakeLists.txt``` in maniera simile a ```caffe2\operators\RNN\CMakeLists.txt```:
    ```cmake
    file(GLOB Detectron_CPU_SRCS ${CMAKE_CURRENT_SOURCE_DIR}/*.cc)
    file(GLOB Detectron_GPU_SRCS ${CMAKE_CURRENT_SOURCE_DIR}/*.cu)

    set(Caffe2_CPU_SRCS ${Caffe2_CPU_SRCS} ${Detectron_CPU_SRCS} PARENT_SCOPE)
    set(Caffe2_GPU_SRCS ${Caffe2_GPU_SRCS} ${Detectron_GPU_SRCS} PARENT_SCOPE)
    ```
4. In ```caffe2\CMakeLists.txt``` aggiungete la sotto-cartella "detectron" (riga 91):
    ```cmake
    add_subdirectory(operators/detectron)  
    ```
5. Sistemate un problema con i sorgenti Eigen CUDA, ```c:\projects\pytorch\third_party\eigen\Eigen\src\Core\arch\CUDA\Half.h```. Guardate <a href="https://gist.github.com/bstriner/a7fb0a8da1f830900fa932652439ed44" target="_blank">qui</a> che cosa cambiare.

## Passo 4: compilazione

Ora, tutto dovrebbe essere pronto per compilare con successo Caffe2.

1. Aprite una **x64 Native Tools Developer Command Prompt**
2. Attivate il virtual environment
    ```cmd
    > cd c:\projects\pytorch
    > caffe2env\Scripts\activate
    ```
3. Eseguite lo script di compilazione
    ```cmd
    > scripts\build_windows.bat
    ```
La compilazione avr&agrave; inizio e richieder&agrave; un po' di tempo (circa 40/45 minuti sulle mie macchine, usando Ninja; dalle 4 alle 5 ore senza). Ci saranno moltissimi messaggi di *warning*... potete ignorarli, e non ci dovrebbe essere nessun messaggio di errore. Quando il processo di build &egrave; terminato, avrete la vostra build di Caffe2 con supporto per GPU CUDA per Windows 10 pronto nella cartella ```c:\projects\pytorch\build\caffe2```.

Prima di poterla usare, io ho dovuto copiare a mano alcune DLL mancanti per Intel MKL e OpenCV.

- Da ```C:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2018.3.210\windows\redist\intel64_win\compiler``` copiate

  - libiomp5md.dll
  - libiomp5md.pdb
  - libiompstubs5md.dll

  in ```c:\projects\pytorch\build\caffe2\python```

- Da ```C:\opencv\build\x64\vc15\bin``` copiate
  - opencv_world343.dll

  in ```c:\projects\pytorch\build\caffe2\python```

## Passo 5: test

Per verificare che la build con supporto CUDA &egrave; funzionante, potete provare con questo comando:

```cmd
> python -c "from caffe2.python import workspace; print(workspace.NumCudaDevices())"
```

Dovrebbe stampare un **numero > 0**. Se no, o se c'&egrave; qualche altro errore, la vostra build di Caffe2 ha qualche problema (es. configurazione sbagliata, dipendenze mancanti, DLL mancanti, dispositivo CUDA non supportato, ecc.). Controllate su Internet, su StackOverflow, nelle issues dei repo GitHub per idee e suggerimenti su come risolverli.

---
Questo &egrave; tutto per adesso. Una guida piuttosto lunga, ma ci dovrebbe essere tutto per riuscire a compilare Caffe2 con tutti i componenti richiesti per far funzionare Detectron. Nel prossimo post<!--[post](/en/posts/2018/10/03/caffe2-gpu-windows-2.html)-->, vi spiegher&ograve; come farlo su Windows. A presto!