---
Title: Blog refresh!
Published: 2018-07-19 09:15:00
Language: en
Description: I am very happy to announce that I have been awarded for the 7th time in a row Microsoft MVP in the Windows Development category. Thank you to everyone in Microsoft (and non-Microsoft people) who made this possible again!
Image: /assets/images/blog-refresh-header.jpg
Tags:
- web
- umbraco
- .net
- static website
- wyam
TranslatedRefs: it/post/2018/7/19/rinfrescata-al-blog.md
DisqusId: 8671AFF20B714DD5A6E6B649CEF1AE6FAD78D99F168D47BF8C13A4149AA1FD84
---
After many years of the old good Metro UI style, inspired by Windows Phone, I decided to give this blog a refresh and also change the underlaying blog engine.

After reading about **static websites** in <a href="https://www.hanselman.com/blog/ExploringWyamANETStaticSiteContentGenerator.aspx" target="_blank">this old post by Scott Hanselman</a>, I decided to experimenting a little bit with <a href="https://wyam.io/" target="_blank">**Wyam**</a>, a highly modular and configurable .NET static site content generator, and results are quite satisfying!

Predefined blog templates in Wyam do not support multi-language features built-in, so I had to develop and customize some components to obtain the desired results. Also, I developed a tool to export (and convert to Markdown) all the existing content from the previous blog version (based on <a href="https://umbraco.com/" target="_blank">Umbraco CMS</a>).

I'll share all the details in an upcoming post series and all the source code will be available soon, in case you may need something similar for a project of yours.