---
Title: Compilare Caffe2 e Detectron con supporto GPU su Windows (Parte 2 di 2)
Published: 2018-10-09 09:15:00
Language: it
Description: Nelle ultime settimane, ho avuto bisogno di provare ed usare alcuni modelli personalizzati implementati con il framework Caffe2 e Detectron. Sono progetti attivamente sviluppati su Linux, ma ho avuto bisogno di farli girare su Windows 10 con supporto GPU CUDA. Questo post (parte 2 di 2) è una guida passo-passo su come l'ho fatto, sperando che possa essere utile ad altre persone con le stesse necessità.
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
TranslatedRefs: en/posts/2018/10/9/caffe2-gpu-windows-2.md
DisqusId: 36CB81AFDED3490D8BCCE63BD28519A63671108DCD5B46FB925F27C2A072AD65
---
Qualche settimana fa, ho avuto bisogno di provare ed usare alcuni modelli personalizzati implementati con il framework <a href="https://caffe2.ai/" target="_blank">Caffe2</a> e <a href="https://github.com/facebookresearch/Detectron" target="_blank">Detectron</a>. Sono progetti attivamente sviluppati su Linux, ma ho avuto bisogno di farli girare su **Windows 10 con supporto GPU CUDA**. E' possibile compilare Caffe2 per Windows, e una <a href="https://caffe2.ai/docs/getting-started.html?platform=windows&configuration=compile" target="_blank">guida</a> &egrave; disponibile, ma se c'&egrave; bisogno di usare Detectron (*non supportato ufficialmente su Windows*), &egrave; un po' pi&ugrave; complicato, e sono necessarie alcune modifiche ai sorgenti e agli script di compilazione.

Nel [post](/it/post/2018/10/04/caffe2-gpu-windows-1.html) precedente, ho spiegato in dettaglio tutti i passi necessari per compilare **Caffe2 su Windows 10 con supporto CUDA 9/10**. Dovete seguire tutti quei passi, se non l'avete gi&agrave; fatto, prima di continuare con questa guida, dove vi mostro come compilare ed eseguire **Detectron su Windows**.

**ATTENZIONE: questa guida &egrave; stata scritta e provata nell'ultima settimana di __settembre 2018__. L'ho provata su 3 differenti macchine Windows di sviluppo (2 con CUDA 9.2, 1 con CUDA 10), con successo. Ma non posso assicurare al 100% che funzioni sulle vostre, e non posso neanche fornirvi supporto diretto in caso qualcosa non funzioni. Per favore, controllate attentamente le versioni dei pacchetti, le dipendenze, le commit git, ecc. E' molto probabile che versioni pi&ugrave; recenti (di qualcunque pacchetto, dipendenza, codici sorgenti, strumenti) possano rompere la compilazione.**

---

## Passo 0: prerequisiti

Per compilare ed eseguire con successo Detectron su Windows 10, si applicano gli stessi pre-requisiti di Caffe2 su Windows 10. Anche se &egrave; possibile compilare ed eseguire Caffe2 con solo supporto CPU, **per Detectron E' NECESSARIO avere il supporto GPU CUDA**.

---

## Passo 1: Python Virtual Environment per Detectron

Prepareremo un virtual environment per eseguire i nostri esperimenti Detectron. Potete usare lo stesso environment creato per compilare Caffe2, basato su Python 2.7. Io ho preferito creare un virtual environment dedicato a Detectron.

1. Aprite una **x64 Native Tools Developer Command Prompt**
2. Clonate Detectron dal repository GitHub ufficiale

    ```cmd
    > mkdir c:\projects\detectron
    > cd c:\projects\detectron
    > git clone --recursive https://github.com/facebookresearch/Detectron.git
    ```

    Se preferite, potete usare TortoiseGit per clonare. Ricordatevi di abilitare l'opzione ```recursive```.

    Ho compilato con successo usando le seguenti versioni dal *master* branch:
    - **d38ade04c7aed364814f27bab588d74502c85c40** (2018-09-25 23:22:59)
    - **3a38b7bcfc728dbe0ea7923af8ca77d7afbdb7ba** (2018-09-06 00:57:42)

3. Aggiornate pip all'ultima versione (io ho usato v18.0)

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

7. Installate tutti i pacchetti richiesti (facendo riferimento al README nel repository Detectron).

    Io ho usato numpy ottimizzato con Intel-MKL. Lo potete prendere da <a href="https://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy" target="_blank">qui</a> e installarlo *prima di tutti gli altri package*. Io ho usato la **versione 1.15.2**.

    ```cmd
    (caffe2env)> pip install PATH_PER\numpy‑1.15.2+mkl‑cp27‑cp27m‑win_amd64.whl
    ```
    Quindi installate tutte le altre dipendenze:
    ```cmd
    (caffe2env)> pip install -r requirements.txt
    ```

8. Aggiungete i pacchetti mancanti in *requirements.txt*:

    ```cmd
    (caffe2env)> pip install protobuf
    (caffe2env)> pip install future
    (caffe2env)> pip install pydot
    ```

9. Compilate i pacchetti ```bbox``` e ```nms```  ottimizzati con Cython.

    Dovete modificare alcune cose prima di poterli compilare e usare.

    - In ```setup.py```, commentate TUTTE le opzioni ```extra_compile_args ['-Wno-cpp'],``` (non supportate da VC++)
    - In ```detectron\utils\cython_nms.pyx```, sistemate un problema a runtime descritto <a href="https://github.com/CharlesShang/FastMaskRCNN/issues/163" target="_blank">qui</a>. Alla riga 45, sostituite ```np.int_t``` con  ```np.intp_t```.

    - In ```detectron\utils\net.py```, sistemate un problema a runtime quando si carica un file di modello Pickle salvato.
        Alla riga 62, sostituite ```['r']``` con ```['rb']```.

    ```cmd
    (caffe2env)> python setup.py build_ext install
    ```
    Questo compila e prepara un pacchetto per il modulo Detectron, con i file ```cython_bbox``` e ```cython_nms``` ottimizzati. Estraete il file Egg (zip) che trovate nella cartella ```dist``` in una cartella temporanea, e copiate il contenuto in  ```\detectron\utils``` (sovrascrivendo eventuali file esistenti).

10. Scaricate e installate PyCocoTools per Python 2.7, per Windows:

    Dovete usare una versione personalizzata che funziona su Windows, perch&egrave; la versione disponibile tramite pip non funziona con Python 2.7. Se preferite, potete anche clonare il repository usando TortoiseGit. Quindi, usando il virtual environment ```caffe2env``` che abbiamo creato fin'ora, configurate e installate il pacchetto.

    ```cmd
    > mkdir c:\projects\cocoapi-python27
    > cd c:\projects\cocoapi-python27
    > git clone --recursive https://github.com/neoglez/cocoapi
    (caffe2env)> PythonAPI\python setup.py build_ext install
    ```

11. La build di Caffe2 che abbiamo preparato usa una modifica per far funzionare gli operatori Detectron in Windows. Pertanto, dobbiamo modificare la loro modalit&agrave; di caricamento come libreria esterna dinamica. Da notare che gli operatori *personalizzati* al momento NON sono supportati (se ne avete bisogno, magari si pu&ograve; applicare una strategia simile).

    Cambiate ```\detectron\utils\env.py``` in modo da saltare il caricamento della DLL (e stampare un messaggio di avviso per ricordarsi di questa modifica):

    ```python
    def get_detectron_ops_lib():
    print("In Windows, Detectron ops are built-in. No need to load dynamically. Ignore the following warning.")
    return ""

    def get_custom_ops_lib():
    print("In Windows, Detectron custom ops are currently not supported. Ignore the following warning.")
    return ""
    ```

Detectron per Windows &egrave; pronto.

---

## Passo 2: test

Per verificare che il tutto funzioni, potete usare questi comandi:

```cmd
> (caffe2env)> set pythonpath=C:\python27;C:\python27\DLLs;c:\Projects\pytorch\build;c:\Projects\detectron;C:\opencv\build
> (caffe2env)> python detectron/tests/test_spatial_narrow_as_op.py
```

Dovrebbero partire alcuni test che usano gli operatori Detectron di Caffe2... se passano, il vostro Detectron funziona. Se no, o se ci sono altri errori, la build di Caffe2/Detectron ha qualche problema (es. configurazione sbagliata, dipendenze mancanti, DLL mancanti, nessun dispositivo CUDA disponibile, ecc.). Cercate su Internet, su StackOverflow, nelle issue del repo GitHub per idee e suggerimenti su come risolverli.

---

Questo &egrave; tutto. Un'altra guida passo-passo un po' lunga, ma che dovrebbe darvi tutto per far funzionare Detectron su Windows.