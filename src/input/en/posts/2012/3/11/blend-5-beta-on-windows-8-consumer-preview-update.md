---
Title: Blend 5 Beta On Windows 8 Consumer Preview Update
Published: 2012-03-11 14:20:00
Language: en
Description: Here's a little update about the Blend 5 issue I had on Windows 8 Consumer Preview. The problem was that installing VS11, Blend 5 Beta, VS2010 and Expression Blend 4 side by side, Blend 5 could not create/open any Metro style project templates.
Tags:
- windows 8
RedirectFrom: en/2012/3/11/blend-5-beta-on-windows-8-consumer-preview-update.aspx
TranslatedRefs: it/post/2012/3/11/blend-5-beta-in-windows-8-consumer-preview-aggiornamento.md
DisqusId: 71B9A0B21838A67E322F866749E3FB4A7A0F409EF5EE67403E430D42E89684B5
---
Here's a little update about the Blend 5 issue I had on Windows 8 Consumer Preview. See <a href="/{localLink:1225}" title="Windows Phone SDK on Windows 8 Consumer Preview">this post</a> for all the details.

The problem is that installing VS11, Blend 5 Beta, VS2010 and Expression Blend 4 side by side, Blend 5 can't create/open any Metro style project templates.

Investigating on the problem, I found that when opening/creating projects in Blend 5, the environment variable "VisualStudioVersion" is set to 10.0, instead of 11.0. This way the MSBuild import defined in a VS11 project fails (because the path where it looks for build targets doesn't exist).

**<PropertyGroup Condition=" '$(VisualStudioVersion)' == '' ">  
     <VisualStudioVersion>11.0</VisualStudioVersion>  
 </PropertyGroup>**  
 <Import Project="$(MSBuildExtensionsPath)\Microsoft\WindowsXaml\v**$(VisualStudioVersion)**\ Microsoft.Windows.UI.Xaml.CSharp.targets" />  

The workaround is simple:

*   create/edit Metro style solutions using VS11 Beta
*   manually edit each project in the solution and *remove*
the condition clause in the VisualStudioVersion PropertyGroup.

> **<PropertyGroup <span style="text-decoration: line-through; color: red;">Condition=" '$(VisualStudioVersion)' == '' "</span>>
>      <VisualStudioVersion>11.0</VisualStudioVersion>
>  </PropertyGroup>**
> 
> Now you can open any projects in Blend 5 without errors.

I don't know if the workaround I found is the best way to solve the issue, but at the moment it works. If anybody has a better solution, let me know!