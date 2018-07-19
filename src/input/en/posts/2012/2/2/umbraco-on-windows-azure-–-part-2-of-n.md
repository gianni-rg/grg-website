---
Title: Umbraco on Windows Azure – Part 2 of N
Published: 2012-02-02 22:10:00
Language: en
Image: /assets/images/Windows-Live-Writer_Umbraco-on-Windows-Azure_D0EE_UmbracoAcceleratorArchitecture_3.png
Description: This is the second post of the Umbraco on Windows Azure series. In the first post , I introduced Umbraco CMS , Windows Azure , the reason why you would like to host your Umbraco site on Windows Azure and a brief walkthrough to deploy a site manually. In this part, we'll have a look at the open-source helper which will let you to deploy the site on Windows Azure in less than an hour. Windows Azure Accelerator for Umbraco You can get it directly from the official site on GitHub .
Tags:
- cloud
- windows azure
- umbraco
RedirectFrom: en/2012/2/2/umbraco-on-windows-azure-–-part-2-of-n.aspx
TranslatedRefs: it/post/2012/2/2/umbraco-su-windows-azure-–-parte-2-di-n.md
DisqusId: CA11E6AB9446FCE1538BE4A06B6A7F111E959DD376E0059E521E198C6E2423BF
---
This is the second post of the *Umbraco on Windows Azure* series. In the <a href="/en/posts/2012/1/31/umbraco-on-windows-azure-%E2%80%93-part-1-of-n.aspx"> first post</a>, I introduced <a href="http://umbraco.org" target="_blank">Umbraco CMS</a>, <a href="http://www.windowsazure.com" target="_blank">Windows Azure</a>, the reason why you would like to host your Umbraco site on Windows Azure and a brief walkthrough to deploy a site manually. In this part, we'll have a look at the open-source helper which will let you to deploy the site on Windows Azure in less than an hour.

## Windows Azure Accelerator for Umbraco

You can get it directly from the <a href="https://github.com/Jeavon/wa-accelerator-umbraco" target="_blank">official site on GitHub</a>.

The Accelerator has been designed to enable you to rapidly deploy Umbraco applications and updates without redeploying a full Windows Azure Service Package. Through a simple wizard console script, it will take care of Azure instance setup and configuration, SQL Azure DBs creation and initial Umbraco app deployment. In addition to the manual installation procedure seen in the previous post, the Accelerator solves the fundamental problem of data persistence and multiple-instance synchronization in an elegant way.

Instead of hosting the Umbraco application directly in the Azure Web Role, the Accelerator installs a little web application which acts as Umbraco sites background monitor, run-time configurator and synchronizer. All Umbraco stuff is stored in a predefined container in the Windows Azure Blob storage and the Accelerator, periodically, checks its content. When an Umbraco installation is found, it takes care of copying all the files from blobs to a local instance folder, which will be automatically configured in the running IIS server.

All you'll have to do is to connect to the Umbraco backoffice and work directly online, configuring site features, pages, styling and content. The background monitor will synchronize the local instance with the Azure blob storage, granting data persistence in case of role restart. Also replication between multiple instances is supported, because each time the monitor synchronizes from local files to Azure storage, it also checks back for changes in the blobs and brings them locally.

For further details, you can refer directly to the official <a href="https://github.com/Jeavon/wa-accelerator-umbraco/wiki/Getting-Started" target="_blank">Getting Started</a> page and <a href="https://github.com/Jeavon/wa-accelerator-umbraco/wiki/Deployment" target="_blank">Deployment</a> guide.

## Pre-requisites

For running the setup scripts and generating the deployment package you will need the following pre-requisites:

* <a href="http://msdn.microsoft.com/vstudio/products/">Visual Studio 2010 SP1 and .NET 4</a>
* <a href="http://www.windowsazure.com">Windows Azure SDK and Tools for Visual Studio (November 2011) version 1.6</a>
* <a href="http://www.microsoft.com/express/sql/download/">SQL Express 2008 R2</a>

You will need the following Windows Azure resources to deploy and run your Umbraco site:

* Hosted service running at least 1 extra-small instance (2 recommended minimum)
* 1 SQL Azure Web edition database, 1GB (or larger if needed)
* Azure storage account

Resources needed for ASP.NET session state:

* 1 SQL Azure database (or Azure Caching , 128MB cache is minimum choice)

## Umbraco Accelerator drawbacks

Thanks to the Accelerator, you can have a basic Umbraco application up and running in less than 1 hour. It is a brilliant solution, but mainly it suffers of an hidden, cost-critical issue: *thousands of Azure storage transactions per day*. If you have either an MSDN subscription or you're testing the platform with the free trial plans, the free transactions upper-bound limit will be reached in short time, causing you to start paying or, with the latest budget-limit policies, to have the subscription automatically disabled. For details on Azure billing, have a look at <a href="http://blogs.msdn.com/b/windowsazurestorage/archive/2010/07/09/understanding-windows-azure-storage-billing-bandwidth-transactions-and-capacity.aspx" target="_blank">this article</a> on the Windows Azure blog.

This behavior is caused by the periodic blob storage check performed by the background monitor: <span style="text-decoration: underline;">every second</span> it checks for instance local changes (no transaction costs) and for blob files modifications (using the transaction-optimized ListBlobs method, which costs only 1 transaction), *even when no modifications occurred*! This way the total daily transaction count, when no files are changed, is easy to calculate:

1 transaction/second x 3,600 seconds/hour x 24 hours/day x *#instances* = **86,400 x *#instances transactions/day***

Quite a lot. And without doing nothing…

If you then start working on the Umbraco backoffice (changing settings, styling, configuring features, editing content, etc.), file modifications will occur and the monitor will synchronize changed files, generating additional transactions (1 for each file copy from/to the storage - and in presence of multiple instances, each modification on the storage will cause 1 file copy in all the others!). That's not good.

A solution to the problem exists. In the next post, we'll see **Umbraco Accelerator Lite**, my enhanced Umbraco Accelerator version.