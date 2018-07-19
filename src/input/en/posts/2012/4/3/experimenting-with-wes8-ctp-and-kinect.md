---
Title: Experimenting with WES 8 CTP and Kinect
Published: 2012-04-03 19:30:00
Language: en
Image: /assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_AsusEeeTop_3.jpg
Description: For a demo project involving Kinect, my colleague Dorangela Daniele and I started to play around with the recently released Windows Embedded Standard 8 CTP . I already tested both Kinect SDK 1.0 Beta 2 and Kinect SDK 1.0 RTM in Windows 8 Consumer Preview , so we were confident that it would have worked fine in WES8, too.
Tags:
- embedded
- kinect
- standard 8
RedirectFrom: en/2012/4/3/experimenting-with-wes8-ctp-and-kinect.aspx
TranslatedRefs: it/post/2012/4/3/esperimenti-con-wes8-ctp-e-kinect.md
DisqusId: 806A0C595391400159CB3BB56DF92EAB6300647BD6FEBAE056325AF056571A1D
---
For a demo project involving Kinect, my colleague *Dorangela Daniele* and I started to play around with the recently released *Windows Embedded Standard 8 CTP*. I already tested both *Kinect SDK 1.0 Beta 2* and *Kinect SDK 1.0 RTM* in *Windows 8 Consumer Preview*, so we were confident that it would have worked fine in WES8, too.

Using IBW, Dora installed WES8 on two embedded devices: an **Asus Eee Top 1602** and an **Advantech AIMB-212**. At the moment, in the CTP version, there are no "*Application Compatibility*" or "*Kinect for Windows Embedded*" templates to start with. Also, there is no automatic dependency resolver. This way, she had to build the image from scratch: to be sure that all the required components were included during the setup process, she added almost every *module*, including the Kinect SDK requirements (**.NET Framework 4.0**, **DirectX runtime**), Internet Explorer e Metro UI.

![Advantech Device](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_AdvantechDevice_3.jpg)After the setup completed successfully and all device drivers had been installed manually (drivers for Windows 8 don't exist yet, so we used Windows 7 drivers, which can be downloaded from each manufacturer's website), she installed the **Visual C++ 10 Runtime** and tried to run *Kinect SDK 1.0 Beta 2* setup. Unfortunately, something was still missing and the setup wizard failed…

To figure out what was missing, she created a new WES7 answer file in ICE using the "*Kinect for Windows*" template. Then, package by package, she compared the included ones with the *modules* listed in the unattend.xml file, took from the WES8 installed image.

Here are some screenshots which show *ALL* the modules installed by IBW:

<a href="/media/2927/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect01_4.jpg"> ![ICE-WES8_Kinect01](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect01_thumb_1.jpg)</a> <a href="/media/2937/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect02_4.jpg"> ![ICE-WES8_Kinect02](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect02_thumb_1.jpg)</a> <a href="/media/2947/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect03_2.jpg"> ![ICE-WES8_Kinect03](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect03_thumb.jpg)</a> <a href="/media/2957/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect04_2.jpg"> ![ICE-WES8_Kinect04](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect04_thumb.jpg)</a> <a href="/media/2967/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect05_2.jpg"> ![ICE-WES8_Kinect05](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect05_thumb.jpg)</a> <a href="/media/2977/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect06_2.jpg"> ![ICE-WES8_Kinect06](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect06_thumb.jpg)</a> <a href="/media/2987/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect07_2.jpg"> ![ICE-WES8_Kinect07](/assets/images/Windows-Live-Writer_windows-embedded-standard-8-and-kinect_E6A4_ICE-WES8_Kinect07_thumb.jpg)</a>

and these were the missing components:

* Microsoft-Windows-Embedded-DeviceUX-Package~31bf3856ad364e35~x86~~6.2.8250.0.cab
* Microsoft-Windows-Embedded-INF-ksfilter~31bf3856ad364e35~x86~~6.2.8250.0.cab
* Microsoft-Windows-Embedded-INF-wdmaudio~31bf3856ad364e35~x86~~6.2.8250.0.cab
* Microsoft-Windows-Embedded-INF-wdma-usb~31bf3856ad364e35~x86~~6.2.8250.0.cab
* Microsoft-Windows-Embedded-INF-winusb~31bf3856ad364e35~x86~~6.2.8250.0.cab
* Microsoft-Windows-Embedded-MediaPlayer-Package~31bf3856ad364e35~x86~~6.2.8250.0.cab

They have been added to the existing WES8 image using DISM.

After the additions, she ran again the Kinect SDK setup and this time it completed successfully.

We had some issues on enabling Kinect on the Advantech device, probably caused by the integrated graphics card and its drivers. Instead, these are the Kinect samples running in WES8 on the *Asus Eee Top*:

<div id="scid:5737277B-5D6D-4f48-ABFC-DD9C333F4C5D:55d93e99-11b6-4f8b-825c-e53e1ddd5a3f" class="wlWriterEditableSmartContent" style="display: block; float: none; margin: 0px auto; padding: 0px; width: 448px;">
<object width="420" height="315" data="http://www.youtube.com/v/9IVbpARt9fQ?version=3&hl=it_IT" type="application/x-shockwave-flash"><param name="allowFullScreen" value="true">
<param name="allowscriptaccess" value="always">
<param name="src" value="http://www.youtube.com/v/9IVbpARt9fQ?version=3&hl=it_IT">
<param name="allowfullscreen" value="true">
</object></div>

Kinect performance are not so good, due to the hardware we used, but Windows Embedded Standard 8 and its Metro interface are very fast and fluid!

If you have any questions/suggestions or if you are experiencing with WES8, please share your thoughts! And stay tuned for updates and new projects with the next version of *Windows Embedded Standard* in the next weeks.