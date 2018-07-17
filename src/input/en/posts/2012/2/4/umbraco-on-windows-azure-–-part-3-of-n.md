---
Title: Umbraco on Windows Azure – Part 3 of N
Published: 2012-02-04 16:48:00
Language: en
Description: This is the third post of the Umbraco on Windows Azure series. In the first post , I introduced Umbraco CMS , Windows Azure and the reason why you would like to host your Umbraco site on Windows Azure, with a brief manual installation walkthrough. In the second post I presented the open-source helper Windows Azure Accelerator for Umbraco , which let you to deploy the site on Windows Azure in less than an hour. In this post, we'll see how to solve its thousands daily storage transactions issue.
Tags:
- cloud
- windows azure
- umbraco
RedirectFrom: en/2012/2/4/umbraco-on-windows-azure-–-part-3-of-n.aspx
TranslatedRefs: it/post/2012/2/4/umbraco-su-windows-azure-–-parte-3-di-n.md
DisqusId: 74A8BB79F08B0C1881D8C5482EFAAB4B63F22480330A599CA885C97169FD85D5
---
This is the third post of the *Umbraco on Windows Azure* series. In the <a href="/en/posts/2012/01/31/umbraco-on-windows-azure-%E2%80%93-part-1-of-n.html"> first post</a>, I introduced <a href="http://umbraco.org" target="_blank">Umbraco CMS</a>, <a href="http://www.windowsazure.com" target="_blank">Windows Azure</a> and the reason why you would like to host your Umbraco site on Windows Azure, with a brief manual installation walkthrough. In the <a href="/en/posts/2012/02/02/umbraco-on-windows-azure-–-part-2-of-n.html" title="Umbraco on Windows Azure - part 2 of n">second post</a> I presented the open-source helper *Windows Azure Accelerator for Umbraco*, which let you to deploy the site on Windows Azure in less than an hour. In this post, we'll see how to solve its thousands daily storage transactions issue.

## Umbraco Accelerator Lite

When I first encountered the drawbacks described in the previous post, it seemed to me that using Umbraco on Windows Azure would cost more than using a dedicated hosting solution. I couldn't believe that no other ways to handle the synchronization existed. Something had to be done, so I started to work on the problem.

After some days of investigation, monitoring and rework, I figured out an alternative solution that involved *a file-based notification approach*:

* each time a change occurs on the local file system, a sentinel file is created automatically, using a simple Umbraco extension attached to its internal events;

* when a file is changed on the blob storage, another sentinel file has to be created (either automatically, when the change is made by the monitor process, or manually, if a file is uploaded via the Accelerator deployer or a storage explorer tool);

* the background monitor periodically checks for the existence of one of those files. If any exists, the synchronization take place.

Unfortunately, this solution leaded to *an even higher transaction usage*: checking for file existence on the blob storage involved a transaction and, *in addition* to check for the sentinel, the blob listing had to be retrieved too (another transaction)! It also introduced multi-instance race conditions when dealing with the sentinel file on the storage. No way from here...

Looking for other paths, I noticed that frequently querying the database didn't cost so much, compared to transaction usage. So here's the new idea, combining the previous file-based approach and SQL Azure:

* each time a change occurs on the local file system, a sentinel file is created automatically, using a simple Umbraco extension attached to its internal events;

* instead of checking for blob sentinel file existence, the last update timestamp is retrieved from a custom table in the Umbraco DB on SQL Azure; this value is updated either automatically, when the change is made by the monitor process, or manually, if a file is uploaded via the Accelerator deployer or a storage explorer tool.

* the background monitor periodically checks for the existence of the local sentinel file and compare the last blob update timestamp. If the file exists or the blob storage changed since the last check, the synchronization take place.

Bingo! *No more void storage transactions just to check whether to perform a sync or not*. Of course, transactions to retrieve blob listing and to upload/download files have still to be done, *but just when required*.

The solution is optimal and required for blob-to-local synchronization. In order to minimize SQL Azure usage, the file-based approach has been maintained for local-to-blob synchronization. This behavior could have been abandoned and the synchronization could have been performed as in the original Accelerator for Umbraco: that's because accessing the local file system doesn't cost anything. But while optimizing, why not reducing also file system access and avoid too much disk I/O, which could slow down instance performance? This way, in the Accelerator Lite, the monitor just checks for local modifications only when the sentinel file exists. Otherwise, *it just do nothing!*

Another little optimization may be done, noticing that (probably), after the initial setup phase and configuration, local files changes won't be so frequent. So, instead of running the synchronization process each second, it could be slowed down (and made externally configurable in the Web Role configuration file).

## Download and try it

I'm currently running this blog and another one with Umbraco on Windows Azure and the Umbraco Accelerator Lite, for 20 days now.

If you want to experiment it, give feedbacks, suggestions, contributes… here you can download all the stuff:

* <a href="/assets/files/umbracoacceleratorlite_1_0_beta_20120204.zip">**Umbraco Accelerator Lite v1.0beta**</a> 

    * Umbraco Accelerator Notifier Extension (binaries and sources)
    * Umbraco Accelerator Lite webrole (sources)
    * SiteDeployer tool (binaries and sources)

Please, remember this is a *beta version*. <span style="text-decoration: underline;">It should work fine but, prior to use it for production, test it carefully in a development environment.</span>

Currently, I tested it in a <span style="text-decoration: underline;">single website/single instance</span> configuration, with Umbraco v4.7.1.1. It has been designed to support multi-site/multi-instance scenario, but I haven't tried it yet. Also, at present, it cannot be run with the original *Windows Azure Accelerator for Umbraco* wizard scripts. I'm working on the integration of the my work with the official accelerator but, at present, you have to do some manual work in order to setup it.

In future posts, we'll see detailed step-by-step instructions on how to install and configure it.

## Installation steps overview

For those who want to try it now, here there are the main tasks to do (for details on *some* of the operations, you can refer directly to the *Azure Accelerator for Umbraco* <a href="https://github.com/Jeavon/wa-accelerator-umbraco/wiki/Getting-Started" target="_blank">Getting Started</a> page and <a href="https://github.com/Jeavon/wa-accelerator-umbraco/wiki/Deployment" target="_blank">Deployment</a> guide).

1.  On Windows Azure, activate a Storage service and an SQL Azure Server
2.  In your *local* SQL Server, create a DB user and 2 empty databases, one for Umbraco backend and one for ASP.NET session.
Give the newly created user a dbOwner role on both databases. Run the SQL scripts contained in <span style="font-family: 'Courier New';">UmbracoAcceleratorLite\SiteDeployer\db\InstallSqlState.sql</span> to create the ASP.NET session DB. 
3.  Install a *local* Umbraco website pointing to the empty Umbraco DB created at step 2. Complete the basic Umbraco setup.
4.  Copy UmbracoAcceleratorNotifier.dll extension to the Umbraco <span style="font-family: 'Courier New';">\bin</span> folder
5.  Create the *Umbraco Accelerator Lite* custom table in the local Umbraco DB and prepare it for SQL Azure (you can run the
SQL scripts contained in <span style="font-family: 'Courier New';">UmbracoAcceleratorLite\SiteDeployer\db\SqlAzure.AcceleratorLiteScripts.sql)</span>
6.  In SQL Azure Server, create *the same* DB owner user you created for the local databases (you can edit the SQL scripts
contained in <span style="font-family: 'Courier New';">UmbracoAcceleratorLite\SiteDeployer\db\SqlAzure.UserSetup.sql)</span>
7.  Using a third party tool migrate the two DBs in SQL Azure (you can use the <a href="http://sqlazuremw.codeplex.com/" target="_blank">SQL Azure Migration Wizard</a> or <a href="http://www.red-gate.com/products/dba/sql-azure-backup/" target="_blank">RedGate SQL Azure Backup</a>)
8.  Edit Umbraco <span style="font-family: 'Courier New';">web.config</span> file in order to make it pointing to the SQL Azure DBs
9.  Use the SiteDeployer tool to copy your local Umbraco installation to the Azure blob storage. Use a domain name of type
"<name>.cloudapp.net".
10.  In Visual Studio 2010, open the web role solution, configure its data storage string in order to point to your Azure Storage
service and build the Service Deploy package.
11.  In Windows Azure Management Portal, create a new Hosted service with the built package, giving it the same DNS name of the uploaded Umbraco site, <name>(.cloudapp.net).
12.  In about 20 minutes your Umbraco site will be reachable at the domain you specified ("http://<name>.cloudapp.net").

In case of issues or problems, let me know (or wait for the step-by-step detailed instructions).