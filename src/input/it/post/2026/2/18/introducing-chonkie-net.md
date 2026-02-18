---
Title: Introduzione a Chonkie.Net - RAG Ingestion per .NET
Published: 2026-02-18 10:00:00
Language: it
Image: /assets/images/python-dotnet-chonkie.jpg
Description: Annuncio di Chonkie.Net, un port sperimentale .NET/C# della popolare libreria Python Chonkie. Scopri come questa leggera libreria ad alte prestazioni porta le funzionalità avanzate di chunking del testo e pipeline RAG nell'ecosistema .NET, implementata con il supporto dello sviluppo assistito da IA e pronta per i tuoi prossimi progetti.
Tags:
- open-source
- chonkie
- rag
- dotnet
- csharp
- ia
- machine learning
- nlp
- chunking
TranslatedRefs: en/posts/2026/2/18/introducing-chonkie-net.md
DisqusId: F258E45485814E33BF9375C6C98B9444BD4F3A5CA65842ACA0573741B0D40918
---

Nel contesto di un viaggio senza fine nell'esplorazione dello sviluppo assistito da IA con <a href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a>, sono felice di annunciare il rilascio in anteprima di **<a href="https://github.com/gianni-rg/Chonkie.Net" target="_blank">Chonkie.Net</a>**, un porting fedele e ad alte prestazioni della popolare libreria Python **<a href="https://github.com/chonkie-inc/chonkie" target="_blank">Chonkie</a>** per l'ecosistema .NET.

## Cos'&egrave; Chonkie.Net?

**Chonkie.Net** &egrave; una libreria di ingestion progettata per alimentare pipeline Retrieval-Augmented Generation (RAG) veloci, efficienti e robuste in applicazioni .NET. Se stai costruendo sistemi intelligenti di elaborazione documenti, motori di ricerca semantica o applicazioni potenziate da IA, Chonkie.Net fornisce gli strumenti fondamentali di cui hai bisogno.

Chonkie.Net trasforma il testo grezzo in piccole parti (*chunk*), di dimensioni perfette e significative, ottimizzate sia per i modelli linguistici che per i database vettoriali. Ma &egrave; molto pi&ugrave; di una semplice divisione del testo: &egrave; un ecosistema completo per l'ingestion di documenti.

## Da Python a .NET

Questo progetto rappresenta un interessante esperimento nell'**ingegneria software assistita da IA**. Quello che &egrave; iniziato come una curiosit&agrave; personale, *"Quanto possono aiutare gli agenti IA nel portare una libreria Python complessa in C#?"* — si &egrave; evoluto in una libreria completamente funzionale e pronta per la produzione di cui avevo bisogno per diversi progetti.

Il viaggio &egrave; stato alimentato da <a href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a> e dagli agenti di codifica in Visual Studio e Visual Studio Code. Costruito durante serate e fine settimana nei mesi precedenti, il progetto rappresenta circa 15 giorni di lavoro a tempo pieno. I risultati sono stati promettenti: elevata parit&agrave; di funzionalit&agrave; con la libreria Python originale, API C# idiomatiche e un'architettura modulare con poche dipendenze.

Il mio flusso di lavoro &egrave; stato ibrido: ho usato chat collaborative iterative (dove l'assistente suggeriva snippet di codice e spiegava l'implementazione Python), modalit&agrave; agente per la generazione autonoma di codice (con aggiustamenti manuali per la qualit&agrave;), e quello che &egrave; diventato noto come "*vibe coding*" (fornire direzioni ad alto livello e lasciare che l'agente generi basandosi sull'implementazione Python di riferimento). Questo ha sempre seguito un ciclo pianifica-implementa-rivedi con passaggi incrementali, documentazione e test. Rivedevo, suggerivo miglioramenti e iteravo. Committare frequentemente e fare merge delle PR ai punti milestone ha mantenuto il lavoro organizzato mentre progredivo attraverso ogni funzionalit&agrave;.

Alcune parti sono state pi&ugrave; impegnative di altre, specialmente tradurre la tipizzazione dinamica di Python e le strutture dati flessibili nel mondo staticamente tipizzato di C#. Ma nel complesso, l'esperienza &egrave; stata gratificante, educativa e divertente. Il risultato &egrave; una libreria che porta la potenza di Chonkie agli sviluppatori .NET, fungendo al contempo da caso di studio su come gli strumenti IA possono aumentare e accelerare lo sviluppo software.

## Funzionalit&agrave; Principali

Cosa rende Chonkie.Net distintivo nel panorama .NET per le applicazioni RAG? Ecco i punti salienti:

- **11 Chunker Specializzati** – scegli la strategia giusta per i tuoi dati, dalla semplice divisione a livello di caratteri al chunking ricorsivo intelligente e all'estrazione semantica
- **Tokenizer Multipli** – supporto per tokenizzazione basata su parole, frasi e transformer
- **7 Provider di Embedding** – integrazione perfetta con OpenAI, Azure OpenAI, Google Gemini, Cohere, VoyageAI, Jina e modelli locali ONNX
- **9 Integrazioni con Database Vettoriali** – scrivi direttamente su Pinecone, Qdrant, Chroma, Weaviate, MongoDB, Pgvector, Elasticsearch, Milvus e Turbopuffer
- **5 Provider LLM** – integra perfettamente con OpenAI, Azure, Groq, Cerebras e Gemini
- **Design Local-First** – esegui embedding localmente con ONNX Runtime, nessuna dipendenza cloud richiesta
- **C# Moderno e Type-Safe** – sviluppato con le funzionalit&agrave; di C# 14 nullable reference types, supporto dependency injection e pattern .NET idiomatici
- **Alte Prestazioni** – ottimizzazioni .NET 10 che eguagliano o superano le prestazioni Python in molti scenari
- **Test Completo** – oltre 930 test unitari e di integrazione garantiscono affidabilit&agrave;

Grazie al lavoro straordinario del team originale di Chonkie, gli algoritmi e le strategie principali sono stati implementati fedelmente, sfruttando al contempo i punti di forza di .NET per fornire un'esperienza di sviluppo fluida.

## Iniziare in 30 Secondi

Ecco quanto &egrave; semplice iniziare il chunking:

```csharp
using Chonkie.Chunkers;
using Chonkie.Tokenizers;

var text = "Woah! Chonkie, the chunking library is so cool!";

var tokenizer = new WordTokenizer();
var chunker = new TokenChunker(tokenizer, chunkSize: 64, chunkOverlap: 8);

var chunks = chunker.Chunk(text);
foreach (var chunk in chunks)
{
    Console.WriteLine($"Chunk: {chunk.Text}");
    Console.WriteLine($"Tokens: {chunk.TokenCount}");
}
```

## Costruire una Pipeline RAG Completa

Per scenari pi&ugrave; avanzati, usa l'API fluent della pipeline per orchestrare l'intero flusso di ingestion:

```csharp
var sampleDir = "pipeline_docs";

var result = await FluentPipeline.Create()
    .FetchFrom(new FileFetcher(), sampleDir, "*.txt")
    .ProcessWith(new TextChef())
    .ChunkWith(new RecursiveChunker(
        tokenizer: new WordTokenizer(),
        chunkSize: 20))
    .RefineWith(new OverlapRefinery(minOverlap: 5))
    .ExportTo(new JsonPorter(), "pipeline_output.json")
    .RunAsync();
```

Vedi la cartella `samples/` nel <a href="https://github.com/gianni-rg/Chonkie.Net" target="_blank">repository GitHub</a> per altri esempi completi, inclusa l'integrazione con database vettoriali e interazioni con LLM.

## Stato del Progetto e Comunit&agrave;

Questo &egrave; un **progetto sperimentale in fase iniziale**, *un lavoro in corso* sviluppato nel tempo libero per imparare ed esplorare. Anche se l'implementazione di base &egrave; completa e la suite di test abbastanza esaustiva, il progetto ha ancora bisogno di test nel mondo reale, correzione di bug e ottimizzazione prima di essere considerato completamente stabile per l'uso in produzione.

La buona notizia? Le fondamenta sono solide, l'architettura &egrave; pulita e la comunit&agrave; &egrave; benvenuta. Se sei interessato a sistemi RAG, a strumenti IA per .NET o curioso del percorso di sviluppo assistito da IA, c'&egrave; molto da esplorare.

## Come Partecipare

Puoi iniziare con Chonkie.Net in diversi modi:

- **Installa da NuGet**: `dotnet add package Chonkie.Net` (assicurati di abilitare le versioni prerelease)
- **Clona e Compila**: <a href="https://github.com/gianni-rg/Chonkie.Net" target="_blank">Visita il repository GitHub</a> per esplorare il codice sorgente, contribuire o inviare feedback
- **Leggi la Documentazione**: Consulta la <a href="https://github.com/gianni-rg/Chonkie.Net/tree/main/docs" target="_blank">documentazione completa</a> e i tutorial
- **Prova i Samples**: Sfoglia gli esempi pratici nella cartella `samples/` per vedere Chonkie.Net in azione

## Cosa Succeder&agrave; Dopo?

I piani futuri includono test pi&ugrave; approfonditi con carichi di lavoro in produzione, ottimizzazioni delle prestazioni, documentazione espansa con scenari del mondo reale e feedback dalla comunit&agrave;. Se lo provi, condividi la tua esperienza. Segnalazioni di bug, richieste di funzionalit&agrave; e contributi sono sempre benvenuti.

Se stai costruendo la tua prossima applicazione RAG in .NET, Chonkie.Net &egrave; qui e pronto ad aiutarti.

**Buon chunking! 🦛**
