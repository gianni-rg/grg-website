---
Title: Windows Phone SDK on Windows 8 Consumer Preview
Published: 2012-03-06 01:20:00
Language: en
Description: Like many software developers, these days I'm very excited and eager to get started using the Consumer Preview on a daily basis, both at work and at home. But Windows 8 is still a preview release, which means that there could be some sort of software incompatibilities. Prior to completely switch my workstation to the next version of Windows, yesterday I started to play with Windows 8 Consumer Preview 32bit on a secondary laptop (a DELL XPS M1330) with just a unique goal verify which development tools work and which don't.
Tags:
- windows 8
- phone 7
- phone
RedirectFrom: en/2012/3/6/windows-phone-sdk-on-windows-8-consumer-preview.aspx
TranslatedRefs: it/post/2012/3/6/windows-phone-sdk-su-windows-8-consumer-preview.md
DisqusId: E856B6BBFDE55ECC3E270AE473DA2513E7EBF6C8FCAD8E68BC72F8972EE62FA6
---
Like many software developers, these days I'm very excited and eager to get started using the Consumer Preview on a daily basis, both at work and at home. But Windows 8 is still a preview release, which means that there could be some sort of software incompatibilities. Prior to completely switch my workstation to the next version of Windows, yesterday I started to play with **Windows 8 Consumer Preview 32bit** on a secondary laptop (a DELL XPS M1330) with just a unique goal: verify which development tools work and which don't.

Minimum required development tools are:

*   **Visual Studio 2010 SP1**
*   **Expression Blend 4**
*   **Silverlight 4 SDK and tools**
*   **Windows Phone 7.1 SDK and tools**
*   **Windows Azure SDK**
*   **SQL Server 2008 R2**
*   **Visual Studio 11 Beta**

After one day of testing and workarounds, I've been able to successfully install all of them.

The key to success is to install *all* the software **in order of release time**: first install all the "old" dev tools and their updates/service packs, then the brand new VS11 Beta.

I encountered some problems with **Windows Azure SDK** (but following <a href="http://www.windowsazure.com/en-us/develop/net/other-resources/windows-azure-on-windows-8/" target="_blank">this guide</a> the installation process goes well; *just remember to launch VS2010 with Administrator rights in order to debug with the Azure emulator*) and **Windows Phone 7.1 SDK**, which <a href="http://windowsteamblog.com/windows_phone/b/wpdev/archive/2012/03/05/windows-8-and-the-windows-phone-sdk.aspx" target="_blank">currently has some known compatibility issues</a>.

From the official Windows Phone blog, these are the issues with running the Windows Phone SDK on the Windows 8 Consumer Preview:

*   **It is not supported in VS11**: you need
VS2010.
*   **.NET 3.5**. Capability.exe and slsvcutil.exe
will not run on Windows 8.

Fix: just install .NET 3.5 from **Control Panel - Turn Windows features on/off**.

*   **XNA Game Studio**. On an attempt at installing
the Windows Phone SDK, the user will receive error messages with
regard to components of the XNA tool chain. These components will
fail to install on Windows 8; the workaround for this has been <a href="http://blogs.msdn.com/b/astebner/archive/2012/02/29/10274694.aspx" target="_blank">blogged about by Aaron Stebner</a>.

Here are steps that you can use to fix it:

<div style="margin-left: 2em;">

1.  Download and install the latest version of the **Games
for Windows - LIVE Redistributable** from <a href="http://www.xbox.com/en-US/LIVE/PC/DownloadClient" target="_blank">http://www.xbox.com/en-US/LIVE/PC/DownloadClient</a>
2.  Install the Windows Phone SDK 7.1
</div>

*   **Windows Phone Emulator**. Windows 8 cannot
currently run the Windows Phone emulator, which will make it very
difficult to debug your code. You have two options: debug on a
physical device (it works without problems) or try with this easy
workaround: **set Microsoft XDE tool to be launched with
"Windows 7" compatibility**.  

 Here are steps that you can use to work around it, *after*
the SDK installation:

<div style="margin-left: 2em;">

1.  Open Explorer and go to "C:\Program Files\Microsoft XDE\1.0"
folder
2.  Right-click on the XDE.exe file, then select Properties
3.  In the Properties dialog, go to Compatibility tab
4.  Check the flag "Run this program in compatibility mode for" and
select "Windows 7" from the dropdown list.
5.  Click OK
</div>

Now you can deploy and debug a Windows Phone application from VS2010 as in Windows 7. The emulator will run a little bit slower, but it works.

Summarizing, here's the installation order I followed (Disclaimer:*I can't assure that it will work on your machine!*):

1.  Windows 8 Consumer Preview 32bit
2.  System drivers / updates
3.  Visual Studio 2010
4.  Visual Studio 2010 SP1
5.  Expression Blend 4
6.  Expression Blend 4 SP1
7.  Silverlight 4 SDK and tools
8.  Windows Azure SDK pre-requisites (from <a href="http://www.windowsazure.com/en-us/develop/net/other-resources/windows-azure-on-windows-8/" target="_blank">this guide</a>)
9.  SQL Server 2008 R2
10.  SQL Server 2008 R2 SP1
11.  Windows Azure SDK 1.6
12.  Games for Windows - LIVE Redistributable
13.  Windows Phone 7.1 SDK and tools
14.  Zune
15.  Visual Studio 11 Beta

I just have an open issue with this installation order:**Blend 5 Beta doesn't work**. It starts, but when creating a new project from the available templates (either HTML or XAML) or opening an existing project created in VS11, it simply shows an empty solution. When trying to add an existing project to the solution, it gives a "Unsupported project" error and doesn't load it.

I'm currently exploring ways to fix that issue. I haven't tried yet, but maybe a solution could be to uninstall Expression Blend 4, re-install VS11 and then install again Expression Blend 4.

Does anybody have any ideas or a similar experience?