---
Title: Umbraco on Windows Azure – Part 1 of N
Published: 2012-01-31 11:50:00
Language: en
Image: /assets/images/Windows-Live-Writer_Umbraco-su-Windows-Azure--parte-1-di-n_AB46_umbraco_logo_3.png
Description: This post series divided in n parts will describe my development experiences with Umbraco CMS hosted on Windows Azure , acquired while creating this blog from scratch. Please, feel free to comment, criticize and suggest improvements! Introduction Umbraco is a free, open-source content management system (CMS), developed with ASP.NET technologies and strongly supported by both an active community of users around the world and by a commercial organization providing professional tools and support.
Tags:
- cloud
- windows azure
- umbraco
RedirectFrom: en/2012/1/31/umbraco-on-windows-azure-–-part-1-of-n.aspx
TranslatedRefs: it/post/2012/1/31/umbraco-su-windows-azure-–-parte-1-di-n.md
DisqusId: 4E1E2DCAD0BB6F557C6EEB1459D5D46DEDC4B18AC1265F40A52537EAFABC9F35
---
This post series divided in n parts will describe my development experiences with <a href="http://umbraco.com/" target="_blank">Umbraco CMS</a> hosted on <a href="http://www.windowsazure.com" target="_blank">Windows Azure</a>, acquired while creating this blog from scratch. Please, feel free to comment, criticize and suggest improvements!

## Introduction

<a href="http://umbraco.com/" target="_blank">Umbraco</a> is a free, open-source content management system (CMS), developed with ASP.NET technologies and strongly supported by both an active community of users around the world and by a commercial organization providing professional tools and support. The system has the flexibility to run anything, from small landing pages or brochure sites to some of the largest and most visited media sites in the web. It is easy to learn and use, making it perfect for developers, web designers and content editors. A site can be configured, skinned and made running in minutes, by using the simple included installer and the basic starter kits. But if you want and have time, you can customize everything, integrating your own styles and developing new features .

![Windows Azure logo](/assets/images/Windows-Live-Writer_Umbraco-su-Windows-Azure--parte-1-di-n_AB46_windows_azure_3.png)<a href="http://www.windowsazure.com" target="_blank">Windows Azure</a> is the open and flexible cloud platform by Microsoft. It enables you to quickly build, deploy and manage applications across a world-wide network of Microsoft-managed datacenters. Windows Azure enables you to build and run highly available applications without focusing on the infrastructure. It provides automatic OS and service patching, built-in network load balancing and hardware failure-proof. Windows Azure enables you to easily scale your applications to any size: it is a fully automated self-service platform that allows you to provision resources within minutes. Elastically grow or shrink your resource usage based on your needs. You only pay for the resources your application uses.

## Umbraco and Windows Azure

Umbraco is a web application. Windows Azure, among its other features, is a great hosting platform. Why not using it to host your Umbraco website? By running in Windows Azure, Umbraco applications would benefit from the automated service management, reduced administration, high availability, and scalability provided by the Windows Azure Platform. Where to start?

Usually, to host a web site on Windows Azure, you have to start with:

* Visual Studio 2010
* a Web application project
* a Windows Azure project, with a Web Role instance

To work with Umbraco, you would have to:

1. download its latest build from official Umbraco site
2. include all the stuff in the Web application project
3. edit its settings (debug/release, web.config, Connection Strings, etc.)
4. configure the Web Role (type, number of instance, storage, credentials, certificates, etc.)
5. build the service package
6. create two empty SQL Azure DBs for its backend
7. deploy with Visual Studio or through Windows Azure portal

Once deployed, you could then start configuring your site directly online, changing its layout, adding your features and content. Easy and linear procedure. Isn't it?

But then… you would face an interesting problem: what if your Azure instance goes down? Yes, the platform will restart the instance automatically... but once restored, it will be in the original state it was when you created the deployment package! That's not a good thing. Also, if you had more than one instance, they would have been all independent copies, with serious data persistence and synchronization problems.

Fortunately, you can avoid all that! Thanks to the *Microsoft DPE group*, a simpler solution exists: the <a href="http://waacceleratorumbraco.codeplex.com/">Windows Azure Accelerator for Umbraco</a>.

In the next post, we'll have a look at the project.