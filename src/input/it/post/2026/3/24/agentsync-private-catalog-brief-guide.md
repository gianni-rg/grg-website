---
Title: Introduzione ad AgentSync, un global .NET tool per gestire gli assets di GitHub Copilot
Published: 2026-03-24 12:00:00
Language: it
Description: Introduzione ad AgentSync, un global .NET tool sperimentale, progettato per gestire agent, skill, prompt e istruzioni GitHub Copilot tramite un workflow basato su cataloghi.
Tags:
- ai
- github copilot
- dotnet
- cli
- open-source
- devops
- tools
- catalog
TranslatedRefs: en/posts/2026/3/24/agentsync-private-catalog-brief-guide.md
DisqusId: 9FE66CBF1ED9432CBCF71BD6F80EA8578E1A672B4ABF4108876666B2EC395C70
---

Sulla scia del mio percorso con gli agenti di coding AI, sono felice di annunciare **AgentSync**, un global .NET tool sperimentale, progettato per gestire gli asset di GitHub Copilot in modo più strutturato. Se lavorate con agent personalizzati, skill, prompt e istruzioni, probabilmente conoscete già i problemi principali: file duplicati, dipendenze mancanti e configurazioni diverse tra repository e macchine utente multiple. AgentSync è disponibile nel <a href="https://github.com/gianni-rg/agents-sync-tool" target="_blank">repository GitHub agents-sync-tool</a>. Nel repository trovate codice sorgente, documentazione dei comandi, un esempio di catalogo e note di implementazione.

## Perché questo progetto è utile

Ispirato da [The Library Meta-Skill](https://github.com/disler/the-library) e dall'idea di avere un modo *strutturato* per condividere agent, skill e prompt tra progetti e team, AgentSync è stato creato per rendere questo processo ripetibile e più semplice da mantenere. AgentSync è utile quando voi o il vostro team avete bisogno di un modo condiviso e controllato per distribuire le personalizzazioni di Copilot. Alcuni vantaggi principali:

- Workflow catalog-first con `catalog.json` come fonte di verità
- Operazioni di installazione e sincronizzazione sia in *scope repo* sia in *scope user*
- Installazioni con dipendenze tramite riferimenti `requires` tipizzati
- Workflow di importazione per migrare asset non gestiti nel catalogo
- Workflow di push per inviare aggiornamenti locali verso la fonte originaria

In breve, spostate la condivisione degli asset da copia-incolla manuale a operazioni esplicite e verificabili. Se volete, potete vederlo come un package manager per agent, skill, prompt e istruzioni Copilot: così come NuGet organizza i pacchetti per .NET, qui il catalogo definisce i pacchetti e AgentSync gestisce installazione, aggiornamenti e tracciamento.

## Come funziona

Ad alto livello, AgentSync segue questo ciclo:

1. Carica e valida `catalog.json`.
2. Risolve i target di piattaforma e scope.
3. Esegue i workflow dei comandi (`use`, `install`, `sync`, `import`, `add`, `remove`, `push`).
4. Salva lo stato di installazione per tracciare nel tempo gli asset gestiti.

Questo modello separa lo stato desiderato (catalogo) dallo stato installato gestito, aspetto importante per workflow di refresh e manutenzione sicuri.

Superficie comandi tipica:

- `AgentSync list`: elenca asset del catalogo e relativo stato
- `AgentSync search`: cerca nel catalogo con filtri
- `AgentSync use`: installa un asset e le sue dipendenze nello scope target
- `AgentSync install`: installa tutti gli asset del catalogo nello scope target
- `AgentSync sync`: aggiorna gli asset gestiti tracciati
- `AgentSync import`: importa asset non gestiti nello stato tracciato
- `AgentSync add`: aggiunge nuovi asset al catalogo
- `AgentSync remove`: rimuove asset dal catalogo
- `AgentSync push`: invia aggiornamenti locali alla sorgente

## Come organizzare un catalogo privato

Potete organizzare il catalogo nel modo più adatto a voi e al vostro team. I cataloghi possono essere pubblici o *privati* e possono referenziare come sorgenti sia percorsi locali sia repository GitHub remoti. **Un catalogo è un repository Git**. Potete trovare un catalogo di esempio su GitHub nel repository <a href="https://github.com/gianni-rg/agents-catalog" target="_blank">repository agents-catalog</a>. L'ideale è partire semplice e crescere nel tempo, aggiungendo asset e organizzandoli secondo i vostri casi d'uso. Una struttura minima di catalogo può essere questa, ma potete organizzarla in modo diverso purché le entry in `catalog.json` referenziano correttamente i file asset:

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

Potete trovare un esempio di `catalog.json` nel repository di esempio. Il file `catalog.json` è la fonte di verità del catalogo e definisce asset, tipi, sorgenti e dipendenze. Ogni file asset (ad esempio `agent-1.agent.md`) contiene il contenuto effettivo di quell'asset, seguendo un formato markdown specifico in base al tipo (agent, skill, prompt, instruction).

## Esempio quick start

```powershell
# Elenca gli asset del catalogo
AgentSync list --catalog C:\Projects\agents-catalog --local .

# Installa un asset e le dipendenze tipizzate
AgentSync use agent-architect --type agent --catalog C:\Projects\agents-catalog --local .

# Aggiorna gli asset gestiti tracciati
AgentSync sync --catalog C:\Projects\agents-catalog --local .
```

Se avete già contenuti non gestiti, partite da `import`, poi potete usare `--add-unmapped` per registrare in `catalog.json` gli asset trovati.

## Prossimi passi e come contribuire

AgentSync è ancora nelle fasi iniziali, sperimentale e in evoluzione. Provatelo: feedback e contributi sono molto benvenuti nel repository GitHub [agents-sync-tool](https://github.com/gianni-rg/agents-sync-tool). Condividete anche i vostri casi d'uso, i punti critici e le funzionalità che vorreste trovare!
