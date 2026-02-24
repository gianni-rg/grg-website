---
Title: ROCm on WSL2 with Ryzen AI Max+ 395
Published: 2026-02-24 2:30:00
Language: en
Description: A practical write-up for setting up ROCm on WSL2 with AMD Ryzen AI Max+ 395 and Radeon 8060S, including prerequisites, install steps, librocdxg build, validation commands, and known limits.
Tags:
- ai
- rocm
- amd
- wsl2
- linux
- gpu
- machine learning
- troubleshooting
TranslatedRefs: it/post/2026/2/24/rocm-wsl2-ryzen-ai-max-395.md
DisqusId: 71C9F818B70540D2B4DFF829560896BD6DA424BA81F94771AB19D9B3693C1E77
---

In the last few days, Pietro, a colleague of mine, started experimenting with his new hardware: a mini workstation based on the **AMD Ryzen AI Max+ 395** (<a href="https://www.bosgame.com/m5-ai-mini-desktop-ryzen-ai-max-395" target="_blank">Bosgame M5 AI Mini Desktop Ryzen AI Max+ 395, with 128GB of shared memory + 2TB storage</a>). He spent time trying to make ROCm work inside Windows 11/WSL2 (and containers), a scenario that is still not fully supported yet, even if early preview builds are available. While following the installation guide, he hit issues similar to those reported by other developers in <a href="https://github.com/ROCm/ROCm/issues/4952" target="_blank">GitHub Issue #4952</a>. Thanks to his persistence, he found a working solution. This post is a practical log of what worked for him and enabled ROCm support for his Radeon 8060S GPU in WSL2.

> **Disclaimer:** all steps and results below have been tested **only on his machine**, and probably they will be soon outdated as official updates become available. Your setup (driver version, Windows build, WSL distro, SDK path, Python stack) may require changes. This is not an official AMD guide, but a community share-back based on his experience. Always refer to official AMD documentation for the latest and most accurate information.

## Pre-requisites

Before touching ROCm, make sure the host and guest environment match these conditions:

- Windows 11 25H2
- The most recent [AMD Adrenalin drivers](https://www.amd.com/en/support/download/drivers.html) (26.1.1+)
- [Windows SDK](https://learn.microsoft.com/en-us/windows/apps/windows-sdk/) (10.0.26100.0)
- The most recent WSL2 version (check with `wsl --update`; it should be v2.6.3.0)
- Ubuntu 24.04 distro (in WSL2, with all updates applied)

## ROCm installation and setup fix

Start with ROCm base packages and then **build from scratch** the <a href="https://github.com/ROCm/librocdxg" target="_blank">librocdxg</a> library. This library enables ROCm functionality on Windows Subsystem for Linux and allows users to run GPU-accelerated Linux workloads under WSL, supporting AI, HPC, and other experimental use cases.

For details, refer to the official <a href="https://rocmdocs.amd.com/en/latest/Installation_Guide/Installation-Guide.html" target="_blank">AMD guide for installing ROCm on Linux</a>.

```bash
sudo apt update
sudo apt install -y cmake python3-venv
wget https://repo.radeon.com/amdgpu-install/7.2/ubuntu/jammy/amdgpu-install_7.2.70200-1_all.deb
sudo dpkg -i amdgpu-install_7.2.70200-1_all.deb
sudo usermod -a -G render,video $LOGNAME # Add the current user to the render and video groups
sudo apt update && sudo apt -f install -y
sudo amdgpu-install --usecase=wsl,rocm --no-dkms -y
```

At this point, other users reported the "No WDDM adapters" issue. This can be solved by recompiling `librocdxg` with the correct Windows SDK path. This was the **key step** to get the GPU detected in WSL2.

```bash
# Set the Windows SDK path (adjust version number if different)
export win_sdk='/mnt/c/Program Files (x86)/Windows Kits/10/Include/10.0.26100.0/'

# Clone and build
git clone https://github.com/ROCm/librocdxg.git
cd librocdxg
mkdir build && cd build
cmake .. -DWIN_SDK="${win_sdk}/shared"
make
sudo make install
```

## Required environment variable

To let ROCm GPU detection work, you need to enable DXG detection:

```bash
export HSA_ENABLE_DXG_DETECTION=1
```

You can add this line to your `~/.bashrc` to make it permanent:

```bash
echo 'export HSA_ENABLE_DXG_DETECTION=1' >> ~/.bashrc
source ~/.bashrc
```

## Validation commands

After a `wsl --shutdown` from Windows and a fresh WSL session, check GPU detection with:

```bash
export HSA_ENABLE_DXG_DETECTION=1
lspci | grep VGA
rocminfo | grep -E "(Name|Marketing|gfx)"
```

Expected output looks like:

```text
03:00.0 VGA compatible controller: Advanced Micro Devices [AMD/ATI] Radeon 8060S
Name:                    gfx1151
Marketing Name:          Radeon 8060S
```

## Python test

He also tested the *ROCm PyTorch* stack in a Python 3.12 environment (create a virtual environment first). Make sure to install the ROCm-specific PyTorch wheels built for ROCm 7.2. You can find the latest ROCm wheels on the AMD ROCm repository. Here is how to install them:

```bash
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/torch-2.9.1%2Brocm7.2.0.lw.git7e1940d4-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/torchvision-0.24.0%2Brocm7.2.0.gitb919bd0c-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/triton-3.5.1%2Brocm7.2.0.gita272dfa8-cp312-cp312-linux_x86_64.whl
wget https://repo.radeon.com/rocm/manylinux/rocm-rel-7.2/torchaudio-2.9.0%2Brocm7.2.0.gite3c6ee2b-cp312-cp312-linux_x86_64.whl
pip3 uninstall -y torch torchvision triton torchaudio
pip3 install torch-2.9.1+rocm7.2.0.lw.git7e1940d4-cp312-cp312-linux_x86_64.whl torchvision-0.24.0+rocm7.2.0.gitb919bd0c-cp312-cp312-linux_x86_64.whl torchaudio-2.9.0+rocm7.2.0.gite3c6ee2b-cp312-cp312-linux_x86_64.whl triton-3.5.1+rocm7.2.0.gita272dfa8-cp312-cp312-linux_x86_64.whl
```

If you install into a non-virtual environment, you may need to add `--break-system-packages`.

Once installed, run a simple test to check whether PyTorch detects the ROCm GPU:

```bash
python3 -c "import torch; print(torch.cuda.is_available()); print(torch.cuda.get_device_name(0))"
```

## Issues and limits

At the moment these are the main caveats in his setup:

- `rocm-smi` is still not supported in WSL
- Performance is good, but below native Linux (70-80% of native performance in some tests)
- Driver and Windows updates may require rebuilding `librocdxg`

For production workloads, I still recommend validating on native Linux as well.

---

If you try this setup on different hardware or a different Windows/WSL stack, feel free to share your results and differences.
