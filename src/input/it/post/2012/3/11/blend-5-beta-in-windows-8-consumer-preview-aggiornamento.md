---
Title: Blend 5 Beta In Windows 8 Consumer Preview Aggiornamento
Published: 2012-03-11 14:20:00
Language: it
Description: Un piccolo aggiornamento sul problema che ho riscontrato con Blend 5 in Windows 8 Consumer Preview. Il problema consiste nel fatto che installando VS11, Blend 5 Beta, VS2010 ed Expression Blend 4 fianco a fianco, Blend 5 non è in grado di creare/aprire alcun progetto Metro style.
Tags:
- windows 8
RedirectFrom: it/2012/3/11/blend-5-beta-in-windows-8-consumer-preview-aggiornamento.aspx
TranslatedRefs: en/posts/2012/3/11/blend-5-beta-on-windows-8-consumer-preview-update.md
DisqusId: 41E3ED545E0DD3646AF4629AB88B9B5EBFB691B9F9C0497704E1E8D59E47A18F
---
Un piccolo aggiornamento sul problema che ho riscontrato con Blend 5 in Windows 8 Consumer Preview. Per tutti i dettagli, leggete <a href="/{localLink:1226}" title="Windows Phone SDK su Windows 8 Consumer Preview">questo post</a>.

Il problema consiste nel fatto che installando VS11, Blend 5 Beta, VS2010 ed Expression Blend 4 fianco a fianco, Blend 5 non è in grado di creare/aprire alcun progetto Metro style.

Investigando, ho trovato che creando/aprendo progetti in Blend 5, la variabile di ambiente "*VisualStudioVersion*" è impostata a 10.0, invece che 11.0. In questo modo le import di MSBuild definite in un progetto VS11 falliscono (perchè il path a cui fanno riferimento per cercare i build target non esiste).

**<PropertyGroup Condition=" '$(VisualStudioVersion)' == '' ">  
     <VisualStudioVersion>11.0</VisualStudioVersion>  
 </PropertyGroup>**  
 <Import Project="$(MSBuildExtensionsPath)\Microsoft\WindowsXaml\v**$(VisualStudioVersion)**\ Microsoft.Windows.UI.Xaml.CSharp.targets" />

La soluzione è semplice:

*   creare/modificare le solution Metro style usando VS11 Beta
*   modificare manualmente ogni progetto di una solution
    *eliminando* la clausola condizionale nel PropertyGroup
VisualStudioVersion.

> **<PropertyGroup <span style="text-decoration: line-through; color: red;">Condition=" '$(VisualStudioVersion)' == '' "</span>>
>      <VisualStudioVersion>11.0</VisualStudioVersion>
>  </PropertyGroup>**
> 
> Adesso è possibile aprire qualunque progetto in Blend 5 senza errori.

Non so se la soluzione proposta sia il modo migliore per risolvere il problema, ma al momento funziona. Se qualcuno ha una soluzione migliore, fatemi sapere!