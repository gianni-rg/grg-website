---
Title: New Syncfusion E-Book "Asp.Net Web Api Succinctly"
Published: 2013-12-08 22:30:00
Language: en
Image: /assets/images/Windows-Live-Writer_9498f9e3e5f9_14A08_ASP_NET_Web_API_Succinctly_download_5.png
Description: Probably, the most of you know Syncfusion for their great and FREE MetroStudio , an icon repository tool with over 2500 icons for Windows Phone/Windows Store apps. But Syncfusion FREE offer doesn't stop here they provide a number of interesting white papers and one of the biggest and growing collection of technical e-books, the Succinctly series, covering mainly Microsoft technologies, but not only them. Just a few days ago a new e-book has been published ASP.NET Web API Succinctly , written by the compatriot Web Architect Emanuele DelBono . This book is an overview of Microsoft ASP.NET Web API technology, a new web framework based on ASP.NET MVC, introduced by Microsoft to easily build powerful HTTP-based services, which are becoming more and more a requirement for companies . A few weeks ago, the framework has been refreshed with the release of Microsoft ASP.NET Web API 2 , but the core concepts are still the same, so if you would like to start from the basis and learn how to build your powerful Web APIs, the book is a great starting point. In the perfect Succinctly aim, the book is a concise technical book that introduces most of the required topics in less than 100 pages. Let's see its contents.
Tags:
- cloud
- web api
- syncfusion
RedirectFrom: en/2013/12/8/new-syncfusion-e-book-aspnet-web-api-succinctly.aspx
TranslatedRefs: it/post/2013/12/8/nuovo-e-book-syncfusion-“aspnet-web-api-succinctly”.md
DisqusId: C688DE9AA3CB8253E3CA866B6D2620847BCA945B3289E80115E2E982E04A9865
---
Probably, the most of you know <a href="http://www.syncfusion.com/?UTM_medium=gianniblogreview">Syncfusion</a> for their great and FREE <a href="http://www.syncfusion.com/downloads/metrostudio?UTM_medium=gianniblogreview"> MetroStudio</a>, an icon repository tool with over 2500 icons for Windows Phone/Windows Store apps. But Syncfusion FREE offer doesn't stop here: they provide a number of interesting white papers and one of the biggest and growing collection of technical e-books, the " <a href="http://www.syncfusion.com/resources/techportal/ebooks?UTM_medium=gianniblogreview"> Succinctly</a>" series, covering mainly Microsoft technologies, but not only them. Just a few days ago a new e-book has been published: " <a href="http://www.syncfusion.com/resources/techportal/ebooks/webapi?UTM_medium=gianniblogreview"> ASP.NET Web API Succinctly</a>", written by the compatriot Web Architect *Emanuele DelBono*.

This book is an overview of **Microsoft ASP.NET Web API** technology, a new web framework based on ASP.NET MVC, introduced by Microsoft to easily build powerful HTTP-based services, <a href="http://readwrite.com/2013/11/29/company-without-api-computer-without-internet"> which are becoming more and more a requirement for companies</a>. A few weeks ago, the framework has been refreshed with the release of **Microsoft ASP.NET Web API 2**, but the core concepts are still the same, so if you would like to start from the basis and learn how to build your powerful Web APIs, the book is a great starting point. In the perfect "Succinctly" aim, the book is a concise technical book that introduces most of the required topics in less than 100 pages.

Let's see its contents.

*   Chapter 1, **About REST**, contains a short
introduction to HTTP REST architecture, describing which are the
basic principles and the general picture of a REST application and
how to achieve such functionalities leveraging HTTP protocol and
its built-in methods.
*   Chapter 2, **Hello Web API**, guides the developer
through a very basic but complete Web API project, using Visual
Studio 2012 and the built-in ASP.NET MVC 4 project template. At the
end, the developer will know how to begin a project and test it
using the browser.
*   Chapter 3, **The Life of a Request**, goes in the
internals of a typical Web API client request, with the purpose to
give a high-level picture of the core ASP.NET components behind the
Web API framework: hosting system, message handlers and
controllers. All these components will then be analyzed deeper in
the following chapters.
*   Chapter 4, **The Routing System**, describes the
starting point of each Web API request, pointing out the
differences between ASP.NET MVC and ASP.NET Web API. Then a number
of examples show how to define custom routes and their
properties.
*   Chapter 5, **The Controller**, describes the main
element of every Web API project: the controller (and its actions).
It starts from analyzing the default CRUD operations (GET, POST,
PUT, DELETE) and then shows how to define custom actions. It also
include an interesting section about Model Binding, which is an
automatic mechanism to convert a raw HTTP request into a full .NET
object.
*   Chapter 6, **Model Validation**, goes through the
built-in validation mechanism, based on attributes and Model State,
which enables developers to validate their models without modifying
the existing code.
*   Chapter 7, **Content Negotiation**, is about an
important concept of a real REST API: it makes it possible to
expose a resource in a number of different formats and let the
client decide which is best. ASP.NET Web API has out-of-the-box
support for a number of predefined formats (XML , JSON, Form URL
Encoded), and this chapter shows how to implement custom
formatters, with a practical example to transform a resource in PNG
format, so that the image representation of the resource could be
provided to the client.
*   Chapter 8, **Message Handlers**, returns to the
concepts presented in chapter 3, analyzing in a more detailed way
how HTTP messages are handled in the ASP.NET pipeline. In addition,
it shows how to create custom message handlers, to eventually fit
specific application requirements not handled by built-in
components (i.g. custom headers/logging/authentication/etc.).
*   Chapter 9, **Security**, continues from the
previous chapter and shows how to create custom handlers to manage
API security aspects such as authentication and authorization. A
full example shows how to implement Basic Authentication, while
Token Authentication (OpenID, OAuth) are just mentioned and
referenced to other sources and projects. Security is a complex
subject, and as you can imagine, a single chapter is too short to
be exhaustive. Anyway, everything needed to start is clearly
described.
*   Chapter 10, **OData**, presents the ASP.NET Web
API built-in support to the Open Data Protocol, a web protocol
designed by Microsoft with the aim to create a new way for querying
and updating data over HTTP. It starts from the basis, how to
configure it in a Web API project and goes through the main methods
which can be used to query data (order by, top, filter, skip).
*   Chapter 11, **Hosting**, focuses on the options
developers have to host a Web API project: one is the standard IIS,
which is not described at all. The second one, instead, is already
known to WCF developers and is called "self-hosting", and now it is
also available for ASP.NET Web API: practically, this means
implementing a console application (or a Windows service, or any
other runnable application) that is the host for your API. The
third option is "in-memory hosting", a useful way for testing API,
explored in the last chapter.
*   Chapter 12, **Testing**, presents the testable
design available in ASP.NET Web API, mostly inherited from ASP.NET
MVC: this enables developers to adopt unit-testing and test-driven
development. The chapter describes the best architectural practice
to adopt in order to develop a testable solution, starting from the
difference between a unit test and an integration test and how to
create decoupled architectures leveraging dependency injection.
Then shows how to unit-testing a controller and how to perform
integration test using the "in-memory hosting" feature presented in
chapter 11.
*   Chapter 13, **Appendix A: HTTP Status Codes**,
contains a useful listing and detailed description for the major
HTTP Status Codes that should be used in a well-designed RESTful
Web API.

In conclusion, the book is really a great introduction to Web API development and its internals. It's not a reference book with hundreds of pages (as it was not meant to be that). It's the best free e-book for Web API development beginners and a great read for people who are already developing REST API with other technologies. It's full of great, commented code examples that can really help you take the right design and architecture for you next API project from the beginning. What are you waiting for? Go to the <a href="http://www.syncfusion.com/resources/techportal/ebooks/webapi?UTM_medium=gianniblogreview"> Syncfusion website</a> and download it!