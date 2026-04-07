---
Title: Introducing ShellShelter - Safer Shell Command Execution for AI Workflows
Published: 2026-04-06 5:30:00PM
Language: en
Description: >-
  Introducing ShellShelter, an experimental .NET CLI and C# library that helps reduce risk when executing untrusted shell commands by validating commands and write destinations against explicit allowlists before execution.
Tags:
- shellshelter
- dotnet
- csharp
- cli
- security
- ai
- open-source
TranslatedRefs: it/post/2026/4/6/introducing-shellshelter.md
DisqusId: A171BA26ED6A4D8E85A2A8951DCDCD075F1BCFE4628D4D1FAE02E2D25AD8C00D
---

<!-- markdownlint-disable-next-line MD033 -->
I am happy to announce **ShellShelter**, an experimental project I have been building to make shell command execution safer in AI-assisted workflows. ShellShelter is a .NET allowlist engine available as both a CLI and a C# library. The core goal is simple: reduce execution risk when commands come from untrusted or partially trusted sources, such as LLM output, user input, or generated scripts. The source code and binaries are available in the <a href="https://github.com/gianni-rg/shell-shelter" target="_blank">ShellShelter GitHub repository</a>.

The approach is inspired by <a href="https://www.answer.ai/safecmd" target="_blank">SafeCmd by Answer.AI</a>, which solves the problem of running shell commands from untrusted sources by validating bash commands against an allowlist before execution. Instead of trying to blacklist dangerous patterns (which is error-prone and easy to bypass), it uses a generous allowlist of read-only and easily-reverted commands that are safe to run. The inherited innovation is that commands are validated using a syntax parser to build an Abstract Syntax Tree (AST) of each command, better handling complex syntax pipelines, command substitutions, sub-commands, sub-shells, and validating every command, even nested ones, before anything executes.

## Why this is useful

If you are experimenting with coding agents or automated command workflows, one recurring problem is trust boundaries. A command can look harmless at first glance but still include unsafe subcommands or risky write targets.

ShellShelter addresses that by validating two things before execution: **extracted commands** and **write destinations**.

Instead of relying on fragile denylist patterns, it uses explicit allowlists. This does not eliminate risk, but it provides a clearer and more auditable safety boundary for practical automation.

## How it works

ShellShelter currently supports *Bash* and *PowerShell* with shell-specific extraction plus a shared policy model.

For Bash, ShellShelter leverages `shfmt --to-json` to extract command structure from AST JSON (Abstract Syntax Tree) and validate against the policy. Similarly for PowerShell: ShellShelter uses the PowerShell built-in parser, builds the AST, applies alias normalization, and then performs policy validation.

Both paths then use the same policy concepts:

- `CmdSpec` entries for allowed commands
- Destination allowlists for writable paths

Only when extracted commands and destinations match policy does execution continue.

## Key features

- .NET allowlist engine with both CLI and C# library usage
- Validation of extracted commands and write destinations before execution
- Bash extraction through `shfmt --to-json` AST JSON
- PowerShell extraction through built-in parser and alias normalization
- Shared policy model across shells with `CmdSpec` and destination allowlists
- Config support for safecmd-compatible INI and native JSON
- CLI surface with `bash`, `pwsh`, and `config path`

## Quick start with the CLI

Prerequisites:

<!-- markdownlint-disable-next-line MD033 -->
- <a href="https://github.com/mvdan/sh" target="_blank">shfmt</a> for Bash parsing
<!-- markdownlint-disable-next-line MD033 -->
- <a href="https://learn.microsoft.com/powershell/scripting/install/install-powershell?view=powershell-7.6" target="_blank">pwsh</a> 7+ for PowerShell execution

After cloning the repository, you can run commands like this:

Example commands:

```shell
dotnet run --project src/ShellShelter.Cli -- bash "echo hello"
dotnet run --project src/ShellShelter.Cli -- pwsh "Get-ChildItem"
dotnet run --project src/ShellShelter.Cli -- config path
```

A pre-built CLI binary for Windows is available from the <a href="https://github.com/gianni-rg/shell-shelter/releases" target="_blank">releases page</a>.

You can run with:

```shell
./shellshelter.exe pwsh "rm *.*"  # This will be blocked by policy if not allowed
```

## C# API snippet

As a C# library, you can create a `ShellPolicy` and use `BashShell.SafeRunAsync` or `PsShell.SafeRunAsync` to execute commands with validation:

```csharp
using ShellShelter.Core;
using ShellShelter.Core.Bash;

var policy = new ShellPolicy(
    okCmds: [new CmdSpec("echo"), new CmdSpec("cat")],
    okDests: ["./", "/tmp"]);

string output = await BashShell.SafeRunAsync("echo hello", policy);
Console.WriteLine(output);
```

## Project status

ShellShelter is early-stage and experimental, and it is not production-ready yet.

The project is under active development and testing. You should expect behavior changes, rough edges, and potential failures while the implementation matures. Treat it as a tool for experimentation and controlled environments at this stage.

<!-- markdownlint-disable-next-line MD033 -->
If this can be useful in your workflow, please try it and share feedback. Bug reports, issues, and pull requests are very welcome in the <a href="https://github.com/gianni-rg/shell-shelter" target="_blank">ShellShelter GitHub repository</a>.
