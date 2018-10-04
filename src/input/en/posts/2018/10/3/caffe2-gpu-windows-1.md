---
Title: Build Caffe2 and Detectron with GPU support on Windows (Part 1 of 2)
Published: 2018-10-03 15:00:00
Language: en
Description: In the last couple of weeks, I had the need to test and use some custom models made with Caffe2 framework and Detectron. They are actively developed on Linux, but I needed to have them run on Windows 10 with CUDA GPU support. This post (part 1 of 2) is a step-by-step guide on how I did it, hoping it can help other people with the same need.
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
TranslatedRefs: it/post/2018/10/3/caffe2-gpu-windows-1.md
DisqusId: B3D3F0D27B2842E3B90F5EFD92EC308255D636374FAB455FA35E9D5522561362
---
In the last couple of weeks, I had the need to test and use some custom models made with <a href="https://caffe2.ai/" target="_blank">Caffe2</a> framework and <a href="https://github.com/facebookresearch/Detectron" target="_blank">Detectron</a>. They are actively developed on Linux, but I needed to have them run on **Windows 10 with CUDA GPU support**. It is possible to build Caffe2 for Windows, and a <a href="https://caffe2.ai/docs/getting-started.html?platform=windows&configuration=compile" target="_blank">guide</a> is provided, but if you need to use Detectron (*not supported on Windows, officially*), it is a bit more complicated and some changes in the source code and in the build scripts are required.

After 4 long frustrating days of trial and error, failed builds and scraping ideas and suggestions about fixing issues from GitHub discussions and blog posts (thanks to Mianzhi Wang for <a href="https://research.wmz.ninja/articles/2017/05/build-caffe2-on-windows-10-gpu.html" target="_blank">this guide</a>), *I came up with an updated, clean and reproducible way to build Caffe2 **and** Detectron on Windows, supporting CUDA 9 or CUDA 10*.

This post is a detailed step-by-step guide on how __I did it__, hoping it can help other people with the same need. *Plan at least 1 day of work, to prepare your build environment.* There are for sure better ways to handle some of the fixes and changes, but I hadn't enough time to dig deeper into them. *If you find out any improvements, please let me know*.

@*[Here , you can find Part 2](/en/posts/2018/10/03/caffe2-gpu-windows-2.html), with all the steps required to build and run **Detectron on Windows 10**. You need to follow all the steps of this post, prior to continue with the next.*@

**DISCLAIMER: this guide has been written and tested in the last week of __September 2018__. I've tried and tested it on 3 different Windows dev machines (2 with CUDA 9.2, 1 with CUDA 10), successfully. But I can't 100% ensure it works on yours, nor I can provide you direct support in case something does not work. Please check carefully the version of packages, dependencies, git commits, etc. It is quite possible that newer releases (of any dependency, package, core or 3rd party source code, tools) may brake the build.**

---

## Step 0: prerequisites

To successfully compile Caffe2 and Detectron on Windows 10 with CUDA GPU support, the following pre-requisites are mandatory:

- **Windows 10**: according to the official document, Windows 10 or greater is required to run Caffe2. I used **Windows 10 Pro/Enterprise April 2018 Update** (with all patches, fixes, updates up to September 30th, 2018).

- **Visual Studio 2017 (v15.8.4 or v15.8.5)**, with *Visual C++*, *appropriate Windows SDKs* and *Python 3.6* dev tools installed: compiling Caffe2 requires a compatible C++ compiler. CUDA 8.0 only supports up to Visual Studio 2015 with Update 3. *If you use Visual Studio 2017, you will be able to build with CUDA 9.x or CUDA 10.0 only*. I used VS2017 Pro/Enterprise, but Community version should work as well.

- **CUDA 9.x/10.x with cuDNN 7.x installed**: you can download and install them from <a href="https://developer.nvidia.com/cuda-downloads" target="_blank">nVidia's Developer website</a>. I've tested the build with **CUDA 9.2.148 x64 + Patch1 + cuDNN 7.2.1.38** and **CUDA 10.0.130 x64 + cuDNN 7.3.0.29**. Be extremely careful to not mix versions, and follow the official guides to install them. *Check CUDA environment variables and verify they point to the right version you want to use to build*. Also, update your nVidia drivers to the latest available and compatible version (check CUDA release notes). I used **nVidia GTX 1080 drivers v411.63**.

- **Python 2.7.x and VC++ Compiler Package**: currently only Python 2.7 is supported (according to some comments/issues in GitHub Python 3 will be supported soon). I installed <a href="https://www.python.org/downloads/release/python-2715/" target="_blank">**Python 2.7.15**</a>
 and <a href="https://www.microsoft.com/en-us/download/details.aspx?id=44266" target="_blank">**Visual C++ Compiler Package for Python 2.7**</a>. I put Python 2.7 in ```c:\Python27```, *without* adding it to the ```PATH``` environment variable. For some commands, to launch  Python from outside a virtual environment, if not available from the command line, use the full path (i.e. ```c:\python27\python.exe```).

- **Intel Math Kernel Library**: to optimize CPU operations, when GPU is not supported. I used <a href="https://software.intel.com/en-us/mkl/choose-download/windows" target="_blank">**binaries v2018.3 x64**</a> and the its corresponding <a href="https://software.intel.com/en-us/articles/installing-the-intel-distribution-for-python-and-intel-performance-libraries-with-pip-and" target="_blank">**Python package**</a>.

- **OpenCV 3.x**: I downloaded pre-built Windows x64 binaries for <a href="https://sourceforge.net/projects/opencvlibrary/files/opencv-win/3.4.3/opencv-3.4.3-vc14_vc15.exe" target="_blank">**OpenCV 3.4.3**</a>. I installed them in ```c:\opencv```.

- **CMake 3.12.x**: required to configure and generate Visual Studio solutions. I used <a href="https://cmake.org/files/v3.12/cmake-3.12.2-win64-x64.msi" target="_blank">**CMake 3.12.2 x64**</a>.

- **Visual Studio Code**, with Python extension to edit text files, scripts and Python code. I used <a href="https://code.visualstudio.com/" target="_blank">**VSCode v1.27.2**</a>.

- **git**: use git to clone source code repositories and dependencies. I used <a href="https://github.com/git-for-windows/git/releases/download/v2.19.0.windows.1/Git-2.19.0-64-bit.exe" target="_blank">**git for Windows 2.19.0**</a>
 and <a href="https://download.tortoisegit.org/tgit/2.7.0.0/TortoiseGit-2.7.0.0-64bit.msi" target="_blank">**TortoiseGit 2.7.0**</a>.

The dev machines used to test this guide are all equipped with **Intel Core i7 7th gen CPU**, **256GB SSD**, **16/32GB RAM**, **nVidia GTX 1070/1080**.

---

## Step 1: Python Virtual Environment for Caffe2

1. Open a **x64 Native Tools Developer Command Prompt**
2. Clone Caffe2 from the official GitHub repository

    At the moment, Caffe2 and PyTorch are being merged, and the official repo is now PyTorch.

    ```cmd
    > mkdir c:\projects\pytorch
    > cd c:\projects\pytorch
    > git clone --recursive https://github.com/pytorch/pytorch.git
    ```

    If you prefer, you can also clone the repo using TortoiseGit. Remember to check the ```recursive``` option.

    I built successfully using the following commits from *master* branch:
    - **21ed7e51b606f9912b658ab63e016d7546f3b75c** (2018-09-26 10:44:03)
    - **91b6458e2d0dba935da2cc7c2cdc6d7907bc3f48** (2018-09-18 10:11:55)

3. Update pip to the latest version (I used v18.0)

    ```cmd
    > python -m pip install -U pip
    ```
4. Install <a href="https://docs.python-guide.org/dev/virtualenvs/" target="_blank">virtualenv</a>

    ```cmd
    > python -m pip install virtualenv
    ```
5. Create a new Python 2.7 virtual environment

    ```cmd
    > python -m virtualenv caffe2env
    ```
6. Activate the virtual environment

    ```cmd
    > caffe2env\Scripts\activate
    ```

    To exit from the virtual environment, you can use:
    ```cmd
    (caffe2env)> deactivate
    ```
7. Install the required packages (from the official <a href="https://caffe2.ai/docs/getting-started.html?platform=windows&configuration=compile" target="_blank">guide</a>).

    If you want to use Intel-MKL optimized numpy, get it from <a href="https://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy" target="_blank">here</a> and install it, *before any other package*. I installed **1.15.2 version**.

    ```cmd
    (caffe2env)> pip install PATH_TO\numpy‑1.15.2+mkl‑cp27‑cp27m‑win_amd64.whl
    ```
    **Otherwise** you can use the standard package:
    ```cmd
    (caffe2env)> pip install numpy
    ```
    Then install the other dependencies:
    ```cmd
    (caffe2env)> pip install future
    (caffe2env)> pip install hypothesis
    (caffe2env)> pip install protobuf
    (caffe2env)> pip install six
    ```
    A required package was not specified:
    ```cmd
    (caffe2env)> pip install typing
    ```
    I used Ninja to speed up the build operations, enabling parallel build of CUDA components (not yet supported when using MSBuild alone), as explained <a href="https://pytorch.org/docs/stable/notes/windows.html#speeding-cuda-build-for-windows" target="_blank">here</a>. Without using Ninja, the build takes almost 4 hours. With Ninja, it takes less than 1h.
    ```cmd
    (caffe2env)> pip install ninja
    ```
    Our environment is now ready to build.

---

## Step 2: configure ```build_windows.bat```

In order to build Caffe2 in Windows, with all the required options, you have to edit the provided build script. It can be found in ```c:\projects\pytorch\scripts\build_windows.bat```

First, you have to set some environment variables (optionally, they can be set directly from the command line. I preferred to put them in the build script, to avoid remembering to type the commands each time a new command prompt is opened).

Before line 29, add:

```cmd
set CMAKE_GENERATOR=Ninja
set OpenCV_DIR=C:\opencv\build
set USE_CUDA=ON
set GEN_TO_SOURCE=1
```

The previous variables configure Ninja as generator (instead of Visual Studio 2017 x64), specify where OpenCV libs can be found and enable the support for CUDA. The last variable is needed to avoid an error during the build, when ATEN build script generates the corresponding source files.

Then change some settings for ```cmake```.

- At line 71, set the right version of CUDA architecture to support. **In my case**, I wanted to run CUDA 9/CUDA 10 on GTX 1070/1080 so, according to  <a href="http://arnon.dk/matching-sm-architectures-arch-and-gencode-for-various-nvidia-cards/" target="_blank">this post</a>, I had to use architecture **6.1** (leaving 5.0 didn't work). *Please change this setting accordingly to your GPU/CUDA version*.

    ```cmake
    -DTORCH_CUDA_ARCH_LIST=6.1
    ```

- At line 80, enable OpenCV:

    ```cmake
    -DUSE_OPENCV=ON
    ```
- At line 82, enable Python bindings:

    ```cmake
    -DBUILD_PYTHON=ON
    ```
- At line 86, by using Ninja, remove the unsupported option:

    ```cmake
    -- /maxcpucount:%NUMBER_OF_PROCESSORS%
    ```
---

## Step 3: tweak some stuff here and there

In order to successfully build, also some changes to the source code are needed (*it is possible that future releases will include those changes, or different changes may be required*), and some files have to be copied around, to make them available during the build operations to compiler and linker.

1. Create ```build\caffe2``` folder in ```c:\projects\pytorch```
2. Create ```libs``` folder in ```c:\projects\pytorch\caffe2env```
3. Copy ```c:\python27\libs\python27.lib``` to the 2 previously created folders:
    - ```c:\projects\pytorch\build\caffe2```
    - ```c:\projects\pytorch\caffe2env\libs```
4. Remove all ```AT_CPP14_CONSTEXPR``` from ```c:\projects\pytorch\aten\src\ATen\core\ArrayRef.h```, to fix a VC++ 17 compiler issue.
5. Replace a couple of "or" with "||" in  ```c:\projects\pytorch\caffe2\image\image_input_op.h```, to fix a compiler issue.

In Windows build, additional and custom operators can't be loaded dynamically (**a bug?** See GitHub issues <a href="https://github.com/pytorch/pytorch/issues/7912" target="_blank">here</a>, and <a href="https://github.com/facebookresearch/Detectron/issues/454" target="_blank">here</a>). A possible workaround is to move *Detectron* in built-in Caffe2 operators.

1. Copy or move ```modules\detectron``` in ```caffe2\operators\detectron```
2. Remove "detectron" subfolder from ```modules\CMakeLists.txt``` (comment out the whole conditional check related to MSVC and BUILD_SHARED_LIBS).
3. Change ```caffe2\operators\detectron\CMakeLists.txt``` similarly to ```caffe2\operators\RNN\CMakeLists.txt```:
    ```cmake
    file(GLOB Detectron_CPU_SRCS ${CMAKE_CURRENT_SOURCE_DIR}/*.cc)
    file(GLOB Detectron_GPU_SRCS ${CMAKE_CURRENT_SOURCE_DIR}/*.cu)

    set(Caffe2_CPU_SRCS ${Caffe2_CPU_SRCS} ${Detectron_CPU_SRCS} PARENT_SCOPE)
    set(Caffe2_GPU_SRCS ${Caffe2_GPU_SRCS} ${Detectron_GPU_SRCS} PARENT_SCOPE)
    ```
4. In ```caffe2\CMakeLists.txt``` add "detectron" subfolder (line 91):
    ```cmake
    add_subdirectory(operators/detectron)  
    ```
5. Fix an issue in Eigen CUDA source code, ```c:\projects\pytorch\third_party\eigen\Eigen\src\Core\arch\CUDA\Half.h```. See what to change <a href="https://gist.github.com/bstriner/a7fb0a8da1f830900fa932652439ed44" target="_blank">here</a>.

## Step 4: build

Now, everything should be ready to build Caffe2 successfully.

1. Open a **x64 Native Tools Developer Command Prompt**
2. Activate the virtual environment
    ```cmd
    > cd c:\projects\pytorch
    > caffe2env\Scripts\activate
    ```
3. Run the build script
    ```cmd
    > scripts\build_windows.bat
    ```
The build will start and it will take some time (about 40/45 minutes on my machines, using Ninja; from 4 to 5 hours without). There will be a lot of warnings... you can ignore them, but there should be no errors. When the build process is finished, you will have a Caffe2 with CUDA GPU support for Windows 10 ready in ```c:\projects\pytorch\build\caffe2``` folder.

Prior to be able to use it, I had to manually copy some missing DLLs for Intel MKL and OpenCV.

- From ```C:\Program Files (x86)\IntelSWTools\compilers_and_libraries_2018.3.210\windows\redist\intel64_win\compiler``` copy

  - libiomp5md.dll
  - libiomp5md.pdb
  - libiompstubs5md.dll

  to ```c:\projects\pytorch\build\caffe2\python```

- From ```C:\opencv\build\x64\vc15\bin``` copy
  - opencv_world343.dll

  to ```c:\projects\pytorch\build\caffe2\python```

## Step 5: test

To verify that your build with CUDA support is working, you can test with the following command:

```cmd
> python -c "from caffe2.python import workspace; print(workspace.NumCudaDevices())"
```

It should print a **number > 0**. If not, or any other error occurs, your Caffe2 build has some issue (i.e. wrong build configuration, missing dependencies, missing DLLs, no supported CUDA device available, etc.). Check on the Internet, on StackOverflow, GitHub repo issues for ideas and clues on how to solve them.

---
That's all for now. A quite long guide, but there should be everything to obtain a Caffe2 build with all the required components needed to build and run Detectron. In the next post @*[post](/en/posts/2018/10/03/caffe2-gpu-windows-2.html)*@, I'll show you how to do it on Windows. Stay tuned!