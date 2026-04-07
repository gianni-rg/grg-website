---
Title: Introduzione a ShellShelter - Esecuzione più sicura dei comandi shell per workflow AI
Published: 2026-04-06 5:30:00PM
Language: it
Description: Introduzione a ShellShelter, uno strumento sperimentale e libreria .NET/C# che aiuta a ridurre il rischio durante l'esecuzione di comandi shell non affidabili, validando comandi e destinazioni di scrittura tramite allowlist esplicite prima dell'esecuzione.
Tags:
- shellshelter
- dotnet
- csharp
- cli
- security
- ia
- open-source
TranslatedRefs: en/posts/2026/4/6/introducing-shellshelter.md
DisqusId: 6D5E9A9307E94E95A1F4F8338B3E08E2DF2CC8C38D9F47E7A44F0BB642D6A21E
---

<!-- markdownlint-disable MD013 -->
Sono felice di annunciare **ShellShelter**, un progetto sperimentale che sto sviluppando per rendere pi&ugrave; sicura l'esecuzione dei comandi shell nei workflow
assistiti dall'AI. ShellShelter &egrave; un motore .NET basato su *allowlist*, disponibile sia come CLI sia come libreria C#. L'obiettivo principale &egrave; semplice: ridurre il rischio di esecuzione quando i comandi arrivano da fonti non affidabili o parzialmente affidabili, come output
di LLM, input utente o script generati. Il codice sorgente e i binari per Windows sono disponibili nel <a href="https://github.com/gianni-rg/shell-shelter" target="_blank">repository GitHub di ShellShelter</a>.

L'approccio &egrave; ispirato a <a href="https://www.answer.ai/safecmd" target="_blank">SafeCmd di Answer.AI</a>, che affronta il problema dell'esecuzione di comandi shell da fonti non affidabili validando i comandi bash tramite allowlist prima dell'esecuzione. Invece di provare a bloccare pattern pericolosi con blacklist (approccio fragile e facile da aggirare), usa una allowlist ampia di comandi in sola lettura e facilmente reversibili. L'innovazione sta nel fatto che i comandi vengono validati tramite parser sintattico e AST (Abstract Syntax Tree), cos&igrave; da gestire meglio pipeline complesse, sostituzioni di comando, sotto-comandi e sub-shell, validando ogni comando, anche annidato, prima che venga eseguito qualcosa.

## Perch&eacute; &egrave; utile

Se state sperimentando con *coding agent* o workflow automatizzati basati su comandi, uno dei problemi pi&ugrave; ricorrenti &egrave; il confine di fiducia. Un comando
pu&ograve; sembrare innocuo a prima vista, ma includere comunque sotto-comandi non sicuri o destinazioni di scrittura rischiose.

ShellShelter affronta questo problema validando due elementi prima dell'esecuzione: **comandi estratti** e **destinazioni di scrittura**.

Invece di affidarsi a pattern di *denylist* fragili, usa *allowlist* esplicite. Questo non elimina completamente il rischio, ma offre un confine di sicurezza pi&ugrave; chiaro e verificabile per automazioni pratiche.

## Come funziona

ShellShelter supporta attualmente *Bash* e *PowerShell*, con estrazione shell-specific e un modello di policy condiviso.

Per Bash, ShellShelter usa `shfmt --to-json` per estrarre la struttura del comando dall'AST JSON (Abstract Syntax Tree) e validarla rispetto alla policy. Per PowerShell, ShellShelter usa il parser integrato: costruisce l'AST, applica la normalizzazione degli alias e poi esegue la validazione della policy.

Entrambi i percorsi usano gli stessi concetti di policy:

- Entry `CmdSpec` per i comandi consentiti
- Allowlist di destinazioni per i percorsi scrivibili

L'esecuzione continua solo quando comandi estratti e destinazioni rispettano la policy.

## Funzionalit&agrave; principali

- Motore .NET basato su allowlist, utilizzabile sia via CLI sia come libreria C#
- Validazione dei comandi estratti e delle destinazioni di scrittura prima dell'esecuzione
- Estrazione Bash tramite AST JSON con `shfmt --to-json`
- Estrazione PowerShell tramite parser integrato e normalizzazione degli alias
- Modello di policy condiviso tra shell con `CmdSpec` e allowlist delle destinazioni
- Supporto configurazione in formato INI compatibile con safecmd e JSON nativo
- Superficie CLI con `bash`, `pwsh` e `config path`

## Quick start con la CLI

Prerequisiti:

- <a href="https://github.com/mvdan/sh" target="_blank">shfmt</a> per il parsing Bash
- <a href="https://learn.microsoft.com/powershell/scripting/install/install-powershell?view=powershell-7.6" target="_blank">pwsh</a>
  7+ per l'esecuzione PowerShell

Dopo aver clonato il repository, potete eseguire comandi come questi:

```shell
dotnet run --project src/ShellShelter.Cli -- bash "echo hello"
dotnet run --project src/ShellShelter.Cli -- pwsh "Get-ChildItem"
dotnet run --project src/ShellShelter.Cli -- config path
```

Un binario CLI precompilato per Windows &egrave; disponibile nella <a href="https://github.com/gianni-rg/shell-shelter/releases" target="_blank">pagina delle release</a>.

Potete eseguirlo cos&igrave;:

```shell
./shellshelter.exe pwsh "rm *.*"  # Verr&agrave; bloccato dalla policy se non consentito
```

## Snippet API CSharp

Come libreria C#, potete creare una `ShellPolicy` e usare `BashShell.SafeRunAsync` o `PsShell.SafeRunAsync` per eseguire comandi con validazione:

```csharp
using ShellShelter.Core;
using ShellShelter.Core.Bash;

var policy = new ShellPolicy(
    okCmds: [new CmdSpec("echo"), new CmdSpec("cat")],
    okDests: ["./", "/tmp"]);

string output = await BashShell.SafeRunAsync("echo hello", policy);
Console.WriteLine(output);
```

## Stato del progetto

ShellShelter &egrave; in fase iniziale e sperimentale, e non &egrave; ancora pronto per la produzione.

Il progetto &egrave; in sviluppo e test continui. &Egrave; normale aspettarsi cambiamenti di comportamento, imperfezioni e possibili errori mentre l'implementazione matura. Per ora, &egrave; consigliato usarlo in ambienti controllati e a scopo sperimentale.

Se pu&ograve; essere utile nel vostro workflow, provatelo e condividete feedback. Bug report, issue e pull request sono molto benvenuti nel <a href="https://github.com/gianni-rg/shell-shelter" target="_blank">repository GitHub di ShellShelter</a>.
