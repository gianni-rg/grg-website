---
Title: Build Caffe2 and Detectron with GPU support on Windows (Part 2 of 2)
Published: 2018-10-09 09:15:00
Language: en
Description: Few weeks ago, I had the need to test and use some custom models made with Caffe2 framework and Detectron. They are actively developed on Linux, but I needed to have them run on Windows 10 with CUDA GPU support. This post (part 2 of 2) is a step-by-step guide on how I did it, hoping it can help other people with the same need.
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
TranslatedRefs: it/post/2018/10/9/caffe2-gpu-windows-2.md
DisqusId: 2AF694CB125346C8B00DEE22BA3F006AE00271FB93AD44B3AF8B9E6081742795
---
Few weeks ago, I had the need to test and use some custom models made with <a href="https://caffe2.ai/" target="_blank">Caffe2</a> framework and <a href="https://github.com/facebookresearch/Detectron" target="_blank">Detectron</a>. They are actively developed on Linux, but I needed to have them run on **Windows 10 with CUDA GPU support**. It is possible to build Caffe2 for Windows, and a <a href="https://caffe2.ai/docs/getting-started.html?platform=windows&configuration=compile" target="_blank">guide</a> is provided, but if you need to use Detectron (*not supported on Windows, officially*), it is a bit more complicated and some changes in the source code and in the build scripts are required.

In the previous [post](/en/posts/2018/10/04/caffe2-gpu-windows-1.html), I detailed all the steps required to build **Caffe2 on Windows 10 with CUDA 9/10 support**. You need to follow all those steps, if not already done, prior to continue with this guide, where I'll show you how to build and run **Detectron on Windows**.

**DISCLAIMER: this guide has been written and tested in the last week of __September 2018__. I've tried and tested it on 3 different Windows dev machines (2 with CUDA 9.2, 1 with CUDA 10), successfully. But I can't 100% ensure it works on yours, nor I can provide you direct support in case something does not work. Please check carefully the version of packages, dependencies, git commits, etc. It is quite possible that newer releases (of any dependency, package, core or 3rd party source code, tools) may brake the build.**

---

## Step 0: prerequisites

To successfully build and run Detectron on Windows 10, the same pre-requisites for Caffe2 on Windows 10 apply. Even if you can build and run Caffe2 on CPU only, **CUDA GPU support IS REQUIRED for Detectron**.

---

## Step 1: Python Virtual Environment for Detectron

We're going to prepare a virtual environment to run our Detectron experiments. You may use the same environment created to build for Caffe2, based on Python 2.7. I preferred to have a dedicated virtual environment for Detectron.

1. Open a **x64 Native Tools Developer Command Prompt**
2. Clone Detectron from the official GitHub repository

    ```cmd
    > mkdir c:\projects\detectron
    > cd c:\projects\detectron
    > git clone --recursive https://github.com/facebookresearch/Detectron.git
    ```

    If you prefer, you can also clone the repo using TortoiseGit. Remember to check the ```recursive``` option.

    I built successfully using the following commits from *master* branch:
    - **d38ade04c7aed364814f27bab588d74502c85c40** (2018-09-25 23:22:59)
    - **3a38b7bcfc728dbe0ea7923af8ca77d7afbdb7ba** (2018-09-06 00:57:42)

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

7. Install the required packages (refer to README in Detectron repository).

    I used Intel-MKL optimized numpy. You can get it from <a href="https://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy" target="_blank">here</a> and install it, *before any other package*. I installed **1.15.2 version**.

    ```cmd
    (caffe2env)> pip install PATH_TO\numpy‑1.15.2+mkl‑cp27‑cp27m‑win_amd64.whl
    ```
    Then install the other dependencies:
    ```cmd
    (caffe2env)> pip install -r requirements.txt
    ```

8. Add missing packages from *requirements.txt.*:

    ```cmd
    (caffe2env)> pip install protobuf
    (caffe2env)> pip install future
    (caffe2env)> pip install pydot
    ```

9. Build Cython optimized ```bbox``` and ```nms``` packages.

    You have to apply some minor changes in order to build and use them.

    - In ```setup.py```, comment out ALL ```extra_compile_args ['-Wno-cpp'],``` option (not supported by VC++)
    - In ```detectron\utils\cython_nms.pyx```, fix a runtime problem as described <a href="https://github.com/CharlesShang/FastMaskRCNN/issues/163" target="_blank">here</a>. At line 45, replace ```np.int_t``` with ```np.intp_t```.

    - In ```detectron\utils\net.py```, fix a runtime problem when loading a saved Pickle file model.
        At line 62, replace ```['r']``` with ```['rb']```.

    ```cmd
    (caffe2env)> python setup.py build_ext install
    ```
    This will build and create a package for Detectron module, with the optimized ```cython_bbox``` and ```cython_nms``` files. Extract the Egg (zip) file you can find in the ```dist``` folder to a temp folder, and copy the content to  ```\detectron\utils``` (overwriting existing ones, if any).

10. Get and install PyCocoTools for Python 2.7, for Windows:

    You have to use a custom build working on Windows, because the version available using pip does not work with Python 2.7. If you prefer, you can clone the repo using TortoiseGit. Then, using the ```caffe2env``` virtual environment we created so far, setup and install the package.

    ```cmd
    > mkdir c:\projects\cocoapi-python27
    > cd c:\projects\cocoapi-python27
    > git clone --recursive https://github.com/neoglez/cocoapi
    (caffe2env)> PythonAPI\python setup.py build_ext install
    ```

11. The custom Caffe2 we have built uses a workaround to make Detectron operators working in Windows. A fix is needed to avoid loading them as an external dynamic library. Please note that *custom* operators are NOT supported (if you need them, a similar workaround may work, too).

    Change ```\detectron\utils\env.py``` in order to bypass the DLL loading (and print a warning to remember this workaround):

    ```python
    def get_detectron_ops_lib():
    print("In Windows, Detectron ops are built-in. No need to load dynamically. Ignore the following warning.")
    return ""

    def get_custom_ops_lib():
    print("In Windows, Detectron custom ops are currently not supported. Ignore the following warning.")
    return ""
    ```

Detectron for Windows is now ready.

---

## Step 2: test

To verify that it works, you can test with the following commands:

```cmd
> (caffe2env)> set pythonpath=C:\python27;C:\python27\DLLs;c:\Projects\pytorch\build;c:\Projects\detectron;C:\opencv\build
> (caffe2env)> python detectron/tests/test_spatial_narrow_as_op.py
```

It should run some test using Caffe2 Detectron operators... if they all pass, your Detectron is working. If not, or any other error occurs, your Caffe2/Detectron build has some issue (i.e. wrong build configuration, missing dependencies, missing DLLs, no supported CUDA device available, etc.). Check on the Internet, on StackOverflow, GitHub repo issues for ideas and clues on how to solve them.

---

That's all. Another long step-by-step guide, but there should be everything to obtain Detectron working on Windows.