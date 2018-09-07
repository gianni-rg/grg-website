---
Title: Visual Studio 2013 Preview And .Net 4.5.1 Preview
Published: 2013-06-27 08:45:00
Language: en
Description: A few weeks ago at TechEd North America 2013 , Microsoft announced the next version of Visual Studio and shared some of the progress made with Visual Studio 2013 and Team Foundation Server/Service in enabling the modern application lifecycle and DevOps. The new version includes many new capabilities, such as support for agile portfolio management, cloud-based load testing , a team room integrated with TFS, code comments integration with TFS and Git support . Yesterday a Preview version with go-live license has been made available for download , which includes also the updated .NET Framework 4.5.1 .
Tags:
- windows 8
- visual studio 2013
RedirectFrom: en/2013/6/27/visual-studio-2013-preview-and-net-451-preview.aspx
TranslatedRefs: it/post/2013/6/27/visual-studio-2013-preview-e-net-451-preview.md
DisqusId: BDA03E549B5F55DBA416D80D7F05A3F6B653CC9CD28724FCEEC5638FB2DE2D7A
---
A few weeks ago at *TechEd North America 2013*, Microsoft <a href="http://blogs.msdn.com/b/somasegar/archive/2013/06/03/teched-2013.aspx" target="_blank">announced the next version of Visual Studio</a> and shared some of the progress made with Visual Studio 2013 and Team Foundation Server/Service in enabling the modern application lifecycle and DevOps. The new version includes many new capabilities, such as support for agile portfolio management, <a href="http://blogs.msdn.com/b/visualstudioalm/archive/2013/06/03/introducing-cloud-based-load-testing-with-team-foundation-service.aspx" target="_blank">cloud-based load testing</a>, a team room integrated with TFS, code comments integration with TFS and <a href="http://blogs.msdn.com/b/bharry/archive/2013/06/19/enterprise-grade-git.aspx" target="_blank">Git support</a>.

Yesterday a *Preview version* with "go-live" license has been made available <a href="http://go.microsoft.com/fwlink/?LinkId=306566" target="_blank">for download</a>, which includes also the updated **.NET Framework 4.5.1**.

Some of the improvements Visual Studio 2013 contains expand on capabilities introduced in the Visual Studio 2012 Updates released since last September, while many of them are brand new experiences designed with modern, connected, robust and high-performance applications as a focal point.

Let's see some interesting features.

**.NET Framework 4.5.1**

.NET 4.5.1 is a highly-compatible, in-place update for .NET 4.5 that ships as part of Windows 8.1. The .NET 4.5.1 Preview can be installed as part of Visual Studio 2013 Preview, is included in <a href="http://blogs.windows.com/windows/b/bloggingwindows/archive/2013/06/26/the-windows-8-1-preview-is-here.aspx" target="_blank">Windows 8.1 Preview</a> and is also available for separate installation for Windows 8, Windows 7, Windows Vista and the corresponding Windows Server releases.

Most of the work done for this release of .NET focused on improving debugging and general diagnostics experience for developers. Some examples:

*   <div style="text-align: justify;">viewing method return values in
the debugger, even if those values are never stored into any
declared variable</div>

*   <div style="text-align: justify;">"Edit and Continue" for
64-bit</div>

*   <div style="text-align: justify;">Async debugging support (Visual
Studio 2013 on Windows 8.1 *only*)</div>

This release also includes performance improvements, such as support for on-demand compaction of the GC's large object heap, and faster startup of apps when running on multicore machines.

**XAML**

Whether using .NET or C++, the development experience for using XAML in Windows Store apps has been improved. In addition to some significant performance improvements for the XAML designers in Visual Studio and Blend, there are a lot of improvements to the XAML Editor in Visual Studio, including IntelliSense for DataBinding and resources, "Go To Definition" support for navigating styles and code snippets. The design experience in Blend now sports guides that allow you to achieve pixel-perfect layouts, and Blend's improved style editing experience allows you to edit styles and templates in the context of their usages. One of the new capabilities related to XAML is the *XAML UI Responsiveness tool*. In <a href="http://blogs.msdn.com/b/somasegar/archive/2013/04/04/visual-studio-2012-update-2-now-available.aspx" target="_blank">VS2012.2</a>, the HTML UI Responsiveness tool was introduced, focused on profiling the responsiveness of Windows Store apps implemented with HTML and JavaScript; now with Visual Studio 2013, the new XAML UI Responsiveness tool provides similar support for Windows Store apps implemented with XAML, so you can easily track down and fix glitches, freezes, and other performance anomalies in your modern UIs. And for improved quality of your Windows Store apps, Visual Studio 2013 now also supports coded UI testing with XAML.

**Diagnostics**

Visual Studio 2013 also now sports a brand new *Performance and Diagnostics hub*, which makes it easy to find performance and diagnostics tools in one convenient location. A new tool available from the hub is the *Energy Consumption too*l. Battery life is of primary importance to device users, and just as resource consumption of an app in the cloud has an impact of the cost of running that application, so too does the resource consumption of an app on a device have an impact on the battery life of that device. To assist with this, Visual Studio 2013 includes a new Energy Consumption profiler, which enables developers to estimate how much power their app will cause the device to consume, and why, e.g. a particular region of code utilizing more CPU time than was expected, or a particular pattern of network calls resulting in the device's radio needing to turn on more frequently than was expected.

Many other features and development areas are touched by this new release. For details, please refer to <a href="http://blogs.msdn.com/b/somasegar/archive/2013/06/26/visual-studio-2013-preview.aspx" target="_blank">Somasegar</a>'s post and <a href="http://go.microsoft.com/fwlink/?LinkId=306566" target="_blank">try Visual Studio 2013 Preview yourself</a>.