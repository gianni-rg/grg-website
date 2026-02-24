---
Title: ROCm su WSL2 con Ryzen AI Max+ 395
Published: 2026-02-24 2:30:00
Language: it
Description: Una guida pratica per configurare ROCm su WSL2 con AMD Ryzen AI Max+ 395 e Radeon 8060S, inclusi prerequisiti, passaggi di installazione, build di librocdxg, comandi di verifica e limiti noti.
Tags:
- ai
- rocm
- amd
- wsl2
- linux
- gpu
- machine learning
- troubleshooting
TranslatedRefs: en/posts/2026/2/24/rocm-wsl2-ryzen-ai-max-395.md
DisqusId: 96253F567FF1428AB406E5C55223299876B00E2AA5EC46069466602C5C842FE4
---

Negli ultimi giorni, Pietro, un mio collega, ha iniziato a sperimentare con il suo nuovo hardware: una mini workstation basata su **AMD Ryzen AI Max+ 395** (<a href="https://www.bosgame.com/m5-ai-mini-desktop-ryzen-ai-max-395" target="_blank">Bosgame M5 AI Mini Desktop Ryzen AI Max+ 395, con 128GB di memoria condivisa + 2TB storage</a>). Ha dedicato tempo a far funzionare ROCm in Windows 11/WSL2 (e nei container), uno scenario non ancora pienamente supportato, sebbene siano disponibili build in anteprima. Durante la procedura di installazione ha riscontrato problemi simili a quelli segnalati da altri sviluppatori nella <a href="https://github.com/ROCm/ROCm/issues/4952" target="_blank">GitHub Issue #4952</a>. Grazie alla sua perseveranza, &egrave; riuscito a individuare una soluzione funzionante. Questo post riassume in modo pratico i passaggi che hanno consentito di abilitare il supporto ROCm sulla GPU Radeon 8060S in WSL2.

> **Disclaimer:** tutti i passaggi e i risultati riportati di seguito sono stati provati **solo sulla sua macchina** e probabilmente presto saranno superati non appena saranno disponibili aggiornamenti ufficiali. La configurazione dell'utente (versione driver, build di Windows, distribuzione WSL, percorso SDK, stack Python) potrebbe richiedere modifiche. Questa non &egrave; una guida ufficiale AMD, ma una condivisione per la community basata sulla sua esperienza. Fate sempre riferimento alla documentazione ufficiale AMD per informazioni aggiornate e accurate.

## Prerequisiti

Prima di procedere con ROCm, verificate che l'ambiente host e guest rispetti le seguenti condizioni:

- Windows 11 25H2
- Driver [AMD Adrenalin](https://www.amd.com/en/support/download/drivers.html) pi&ugrave; recenti (26.1.1+)
- [Windows SDK](https://learn.microsoft.com/en-us/windows/apps/windows-sdk/) (10.0.26100.0)
- Versione WSL2 pi&ugrave; recente (controllate con `wsl --update`; dovrebbe essere la v2.6.3.0)
- Distro Ubuntu 24.04 (in WSL2, con tutti gli aggiornamenti applicati)

## Installazione di ROCm e correzione della configurazione

Si procede dai pacchetti base ROCm e poi **si compila da zero** la libreria <a href="https://github.com/ROCm/librocdxg" target="_blank">librocdxg</a>. Questa libreria abilita le funzionalit&agrave; ROCm su Windows Subsystem for Linux e consente di eseguire carichi di lavoro Linux accelerati da GPU in WSL, supportando scenari AI, HPC e altri casi d'uso sperimentali.

Per i dettagli, fate riferimento alla <a href="https://rocmdocs.amd.com/en/latest/Installation_Guide/Installation-Guide.html" target="_blank">guida ufficiale AMD per l'installazione di ROCm su Linux</a>.

```bash
sudo apt update
sudo apt install -y cmake python3-venv
wget https://repo.radeon.com/amdgpu-install/7.2/ubuntu/jammy/amdgpu-install_7.2.70200-1_all.deb
sudo dpkg -i amdgpu-install_7.2.70200-1_all.deb
sudo usermod -a -G render,video $LOGNAME # Aggiunge l'utente corrente ai gruppi render e video
sudo apt update && sudo apt -f install -y
sudo amdgpu-install --usecase=wsl,rocm --no-dkms -y
```

A questo punto, altri utenti hanno riportato il problema "No WDDM adapters". Si pu&ograve; risolvere ricompilando `librocdxg` con il percorso corretto del Windows SDK. Questo &egrave; stato il **passaggio chiave** per far rilevare la GPU in WSL2.

```bash
# Imposta il percorso del Windows SDK (modificare il numero di versione se diverso)
export win_sdk='/mnt/c/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/'

# Clona e compila
git clone https://github.com/ROCm/librocdxg.git
cd librocdxg
mkdir build && cd build
cmake .. -DWIN_SDK="${win_sdk}/shared"
make
sudo make install
```

## Variabile d'ambiente richiesta

Per consentire il rilevamento della GPU con ROCm, &egrave; necessario abilitare la DXG detection:

```bash
export HSA_ENABLE_DXG_DETECTION=1
```

&Egrave; possibile aggiungere questa riga al file `~/.bashrc` per renderla permanente:

```bash
echo 'export HSA_ENABLE_DXG_DETECTION=1' >> ~/.bashrc
source ~/.bashrc
```

## Comandi di validazione

Dopo un `wsl --shutdown` da Windows e una nuova sessione WSL, verificate il rilevamento GPU con:

```bash
export HSA_ENABLE_DXG_DETECTION=1
lspci | grep VGA
rocminfo | grep -E "(Name|Marketing|gfx)"
```

L'output atteso &egrave; simile al seguente:

```text
03:00.0 VGA compatible controller: Advanced Micro Devices [AMD/ATI] Radeon 8060S
Name:                    gfx1151
Marketing Name:          Radeon 8060S
```

## Test Python

Pietro ha testato anche lo stack *ROCm PyTorch* in un ambiente Python 3.12 (creando prima un ambiente virtuale). &Egrave; importante installare le wheel PyTorch specifiche per ROCm, compilate per ROCm 7.2. Le wheel ROCm pi&ugrave; recenti sono disponibili nel repository AMD ROCm. Di seguito i comandi di installazione:

```bash
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/torch-2.9.1%2Brocm7.2.0.lw.git7e1940d4-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/torchvision-0.24.0%2Brocm7.2.0.gitb919bd0c-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/triton-3.5.1%2Brocm7.2.0.gita272dfa8-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/torchaudio-2.9.0%2Brocm7.2.0.gite3c6ee2b-cp312-cp312-linux_x86_64.whl
pip3 uninstall -y torch torchvision triton torchaudio
pip3 install torch-2.9.1+rocm7.2.0.lw.git7e1940d4-cp312-cp312-linux_x86_64.whl torchvision-0.24.0+rocm7.2.0.gitb919bd0c-cp312-cp312-linux_x86_64.whl torchaudio-2.9.0+rocm7.2.0.gite3c6ee2b-cp312-cp312-linux_x86_64.whl triton-3.5.1+rocm7.2.0.gita272dfa8-cp312-cp312-linux_x86_64.whl
```

Se si installa in un ambiente non virtuale, potrebbe essere necessario aggiungere `--break-system-packages`.

Una volta completata l'installazione, eseguite un test rapido per verificare che PyTorch rilevi la GPU ROCm:

```bash
python3 -c "import torch; print(torch.cuda.is_available()); print(torch.cuda.get_device_name(0))"
```

## Problemi e limiti

Al momento questi sono i principali limiti della sua configurazione:

- `rocm-smi` non &egrave; ancora supportato in WSL
- Le prestazioni sono buone, ma inferiori a Linux nativo (70-80% del nativo in alcuni test)
- Gli aggiornamenti di driver e Windows possono richiedere la ricompilazione di `librocdxg`

Per workload di produzione, vi consiglio comunque di validare la configurazione anche su Linux nativo.

---

Se provate questa configurazione su hardware diverso o con uno stack Windows/WSL differente, condividete risultati e differenze!
