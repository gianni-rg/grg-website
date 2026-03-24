---
Title: Introducing AgentSync, a .NET global tool for GitHub Copilot assets
Published: 2026-03-24 12:00:00
Language: en
Description: Introducing AgentSync, an experimental .NET global tool to manage GitHub Copilot agents, skills, prompts, and instructions through a private catalog workflow.
Tags:
- ai
- github copilot
- dotnet
- cli
- open-source
- devops
- tools
- catalog
TranslatedRefs: it/post/2026/3/24/agentsync-private-catalog-brief-guide.md
DisqusId: 9139C4F0C061418AA4B71FBE6CB117EFB1353C328CD543108108C117E9EC924A
---

On the wave of my journey with AI coding agents, I am happy to announce **AgentSync**, an experimental .NET global tool designed to manage GitHub Copilot assets in a more *structured* way. If you work with custom agents, skills, prompts, and instructions, you probably know the pain points: duplicated files, missing dependencies, and different setups between repositories and user machines. AgentSync is available in <a href="https://github.com/gianni-rg/agents-sync-tool" target="_blank">agents-sync-tool GitHub repository</a>. The repository includes source code, command documentation, catalog examples, and implementation notes.

## Why this project is useful

Inspired by <a href="https://github.com/disler/the-library" target="_blank">The Library Meta-Skill</a> and by the idea of having a *structured way to share agents, skills, and prompts across projects and teams*, AgentSync was created to make that process repeatable and easier to maintain. AgentSync helps when you or your team needs a shared and controlled way to distribute Copilot customizations. Some key benefits:

- Catalog-first workflow with `catalog.json` as source of truth
- Install and sync operations for both *repo scope* and *user scope*
- Dependency-aware installs through typed `requires` references
- Import workflow to migrate unmanaged assets into tracked state
- Push workflow to send managed local updates back to source

In short, it shifts asset sharing from manual copy-paste to explicit, auditable operations. If you like, you can think of it as a package manager for your Copilot agents, skills, prompts, and instructions: like NuGet organizes packages for .NET, here the catalog defines the packages, and AgentSync handles installation, updates, and tracking.

## How it works

At high level, AgentSync follows this lifecycle:

1. Load and validate `catalog.json`.
2. Resolve platform and scope targets.
3. Execute command workflows (`use`, `install`, `sync`, `import`, `add`, `remove`, `push`).
4. Persist install-state to track managed assets over time.

This model separates desired state (catalog) from managed installed state, which is important for safe refresh and maintenance workflows.

Typical command surface:

- `AgentSync list`: list catalog assets and their status
- `AgentSync search`: search catalog with filters
- `AgentSync use`: install an asset and its dependencies to target scope
- `AgentSync install`: install all catalog assets to target scope
- `AgentSync sync`: refresh tracked managed assets
- `AgentSync import`: import unmanaged assets into tracked state
- `AgentSync add`: add new assets to the catalog
- `AgentSync remove`: remove assets from the catalog
- `AgentSync push`: push local updates back to the source

## How to organize a private catalog

You can organize your catalog however it makes sense for you and/or your team(s). Catalogs can be public or *private*, and can reference local paths or remote GitHub repositories as sources. **A catalog is a Git repository**. You can find a sample catalog on GitHub here: <a href="https://github.com/gianni-rg/agents-catalog" target="_blank">agents-catalog repository</a>. Ideally, it starts simple and grows with time, by adding assets and organizing them in a way that makes sense for your use cases. A minimal catalog structure looks like this, but you can organize it differently as long as the `catalog.json` entries correctly reference the asset files:

```text
agents-catalog/
  catalog.json
  agents/
    agent-1.agent.md
    agent-2.agent.md
  skills/
    skill-1.skill.md
    skill-2.skill.md
  prompts/
    prompt-1.prompt.md
    prompt-2.prompt.md
  instructions/
    instruction-1.instruction.md
    instruction-2.instruction.md
```

You can find an example `catalog.json` in the sample catalog repository. The `catalog.json` file is the source of truth for the catalog and defines the assets, their types, sources, and dependencies. Each asset file (e.g., `agent-1.agent.md`) contains the actual content for that asset, following a specific markdown format depending on the type (agent, skill, prompt, instruction).

## Quick start example

```powershell
# List assets from your catalog
AgentSync list --catalog C:\Projects\agents-catalog --local .

# Install one asset and typed dependencies
AgentSync use agent-architect --type agent --catalog C:\Projects\agents-catalog --local .

# Refresh tracked managed assets
AgentSync sync --catalog C:\Projects\agents-catalog --local .
```

If you already have unmanaged content, start with `import`, then optionally use `--add-unmapped` to register discovered assets in `catalog.json`.

## Next steps and contribution

AgentSync is currently in early stages, experimental and still evolving. Give it a try, feedback and contributions are very welcome on the <a href="https://github.com/gianni-rg/agents-sync-tool" target="_blank">agents-sync-tool GitHub repository</a>. Please share your use cases, pain points, and any features you would find useful!
