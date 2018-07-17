---
Title: Kinect SDK And Windows 8 Metro-Style Apps
Published: 2012-02-16 21:30:00
Language: en
Description: For a master degree thesis project about NUI ( Natural User Interfaces ) by Marina Sabetta, student at the Polythecnic of Turin, a home-entertainment embedded system is in development stage its purpose is to let elder and non-technologic people browse the web, send/receive e-mails, interact through Instant Messengers and use a mobile phone, in a simple and intuitive manner. The prototype is based on Windows 8 Developer Preview and consists mainly of a .NET Metro-style app which acts as Windows system shell.
Tags:
- windows 8
- kinect
RedirectFrom: en/2012/2/16/kinect-sdk-and-windows-8-metro-style-apps.aspx
TranslatedRefs: it/post/2012/2/16/kinect-sdk-e-applicazioni-windows-8-metro-style.md
DisqusId: 2FB0C78E82F685D02DE4EBC7D45C2D296A4A3E5B7D584013BE93D9832ADF4067
---
For a master degree thesis project about NUI (*Natural User Interfaces*) by Marina Sabetta, student at the Polythecnic of Turin, a home-entertainment embedded system is in development stage: its purpose is to let elder and non-technologic people browse the web, send/receive e-mails, interact through Instant Messengers and use a mobile phone, in a simple and intuitive manner. The prototype is based on **Windows 8 Developer Preview** and consists mainly of a .NET Metro-style app which acts as Windows system shell.

Lots of development and integration problems have been faced and brightly solved by Marina through ad-hoc solutions and workarounds - they existed because of the new operating system, the new (and yet incomplete) WinRT system APIs, missing samples and lack of documentation - but one problem among the others has been really though to solve: *using Kinect in a Metro-style app*.

*The project still uses the Kinect SDK Beta 2 version* with a Kinect for Xbox sensor: according to the documentation, Windows 8 Developer Preview is supported, but just for desktop application. Some tests have been performed in Windows 8 desktop environment and no issues have been found (we also tried the brand new SDK Kinect for Windows 1.0, released just two weeks ago, with the Kinect for Xbox sensor). Nevertheless, the target was to use Kinect sensor to control the embedded system shell which, as already stated, it's a Metro-style application.

Ignoring the official documentation, a number of attempts have been conducted in order to directly reference the SDK libraries into a Metro-style app. At the end, following a trial-and-error approach on a little Metro test app, adding all the required references and implementing some missing classes/interfaces in WinRT, a successful build has been obtained. But at the first Kinect Runtime initialization call, the app silently crashed, raising no exceptions or meaningful errors.

Having no clues on how to proceed to solve the problem, some alternative architectures have been designed: since a Metro-style app runs in a sand-box as Silverlight apps (web and Windows Phone) do, a way to make it communicating with the external world is via Web Services or sockets.

Here's the idea: since the Kinect SDK works well in Windows 8 desktop app, a client-server solution has been designed, where a .NET application (Windows Forms, console or WPF) interacts with the Kinect sensor and exposes its features and data to a connected client (i.g. a Metro-style app). This way, we made a remote abstraction of the Kinect sensor, exposed through a WCF service. After a number of tests, we found that the WCF overhead is huge, so the server has been redesigned in order to handle socket connections and transfer data via a JSON-formatted textual protocol.

In a next post, we'll see some details of the implemented solution. At the moment, you can see it in this short video, shoot in our laboratory.

<object style="display: block; margin-left: auto; margin-right: auto;" width="480" height="360" data="https://www.youtube.com/v/dZIF5qYcdoI?version=3&hl=it_IT" type="application/x-shockwave-flash"><param name="allowFullScreen" value="true"> <param name="allowscriptaccess" value="always"> <param name="src" value="https://www.youtube.com/v/dZIF5qYcdoI?version=3&hl=it_IT"> <param name="allowfullscreen" value="true"> </object>

Potentially, if the server is exposed publicly on the Internet, the client could be everywhere in the world, implemented in any platform (Windows, Mac, smartphone or tablet) and use data from a remote Kinect sensor.