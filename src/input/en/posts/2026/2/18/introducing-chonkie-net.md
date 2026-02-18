---
Title: Introducing Chonkie.Net - Bringing RAG Ingestion to .NET
Published: 2026-02-18 10:00:00
Language: en
Image: /assets/images/python-dotnet-chonkie.jpg
Description: Announcing Chonkie.Net, an experimental .NET/C# port of the popular Python Chonkie library. Discover how this lightweight, high-performance library brings advanced text chunking and RAG pipeline capabilities to the .NET ecosystem, built with AI-assisted coding and ready for your next project.
Tags:
- open-source
- chonkie
- rag
- dotnet
- csharp
- ai
- machine learning
- nlp
- chunking
TranslatedRefs: it/post/2026/2/18/introducing-chonkie-net.md
DisqusId: A0155664B62643D384CC09A31200B18A658851B69C6F4FB99A0730766894B533
---

As part of a neverending journey in tinkering and exploring AI-assisted coding with <a href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a>, I'm excited to announce the preview release of **<a href="https://github.com/gianni-rg/Chonkie.Net" target="_blank">Chonkie.Net</a>**, a faithful, high-performance port of the popular Python **<a href="https://github.com/chonkie-inc/chonkie" target="_blank">Chonkie</a>** library to the .NET ecosystem.

## What is Chonkie.Net?

**Chonkie.Net** is a lightweight ingestion library designed to power fast, efficient, and robust Retrieval-Augmented Generation (RAG) pipelines in .NET applications. Whether you're building intelligent document processing systems, semantic search engines, or AI-powered applications, Chonkie.Net provides the foundational tools you need.

At its core, Chonkie.Net transforms raw text into perfectly-sized, meaningful chunks optimized for both language models and vector databases. But it's much more than simple text splitting: it's a complete ecosystem for document ingestion.

## From Python to .NET

This project represents an interesting experiment in **AI-assisted software engineering**. What started as a personal curiosity, *"How much can AI agents help when porting a complex Python library to C#?"* — evolved into a fully-functional, production-ready library that I needed for several projects.

The journey was powered by <a href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a> and coding agents in Visual Studio and Visual Studio Code. Built during evenings and weekends over the previous months, the project represents approximately 15 days of full-time work. The results have been promising: high feature parity with the original Python library, idiomatic C# APIs, and a modular, dependency-light architecture.

My workflow was hybrid: I used iterative collaborative chats (where the assistant suggested code snippets and explained the Python implementation), agent mode for autonomous code generation (with manual adjustments for quality), and what's become known as "*vibe coding*" (providing high-level direction and letting the agent generate based on the Python reference implementation). This always followed a plan-implement-review loop with incremental steps, documentation, and tests. I'd review, suggest improvements, and iterate. Committing frequently and merging PRs at milestone endpoints kept the work organized as I progressed through each feature.

Some parts were more challenging than others, especially translating Python's dynamic typing and flexible data structures into C#'s statically-typed world. But overall, the experience was rewarding, educational, and fun. The result is a library that brings Chonkie's power to .NET developers while serving as a case study in how AI tools can augment and accelerate software development.

## Key Features

What makes Chonkie.Net stand out in the .NET landscape for RAG applications? Here are the key highlights:

- **11 Specialized Chunkers** – choose the right strategy for your data, from simple character-level splitting to intelligent recursive chunking and semantic extraction
- **Multiple Tokenizers** – support for word-based, sentence-based, and transformer-based tokenization
- **7 Embedding Providers** – seamless integration with OpenAI, Azure OpenAI, Google Gemini, Cohere, VoyageAI, Jina, and ONNX local models
- **9 Vector Database Integrations** – write directly to Pinecone, Qdrant, Chroma, Weaviate, MongoDB, Pgvector, Elasticsearch, Milvus, and Turbopuffer
- **5 LLM Providers** – integrate with OpenAI, Azure, Groq, Cerebras, and Gemini seamlessly
- **Local-First Design** – run embeddings locally with ONNX Runtime, no cloud dependencies required
- **Type-Safe, Modern C#** – built with C# 14 nullable reference types, dependency injection support, and idiomatic .NET patterns
- **High Performance** – .NET 10 optimizations that match or exceed Python performance in many scenarios
- **Comprehensive Testing** – 930+ unit and integration tests ensure reliability

Thanks to the amazing work of the original Chonkie team, the core algorithms and strategies have been faithfully implemented, while also taking advantage of .NET's strengths to provide a smooth developer experience.

## Getting Started in 30 Seconds

Here's how simple it is to start chunking:

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

## Building a Complete RAG Pipeline

For more advanced scenarios, use the fluent pipeline API to orchestrate the entire ingestion flow:

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

See the `samples/` folder in the <a href="https://github.com/gianni-rg/Chonkie.Net" target="_blank">GitHub repository</a> for many complete examples, including vector database integration and LLM interactions.

## Project Status & Community

This is an **early-stage, experimental project**, *a work in progress* built in spare time for learning and exploration. While the core implementation is complete and the test suite is comprehensive, the project still needs real-world testing, bug fixing, and optimization before being considered fully stable for production use.

The good news? The foundation is solid, the architecture is clean, and the community is welcome. Whether you're interested in RAG systems, .NET AI tooling, or curious about the AI-assisted coding journey, there's plenty to explore.

## Getting Involved

You can get started with Chonkie.Net in several ways:

- **Install from NuGet**: `dotnet add package Chonkie.Net` (make sure to enable prerelease versions)
- **Clone and Build**: <a href="https://github.com/gianni-rg/Chonkie.Net" target="_blank">Visit the GitHub repository</a> to explore the source, contribute, or submit feedback
- **Read the Docs**: Check out the <a href="https://github.com/gianni-rg/Chonkie.Net/tree/main/docs" target="_blank">comprehensive documentation</a> and tutorials
- **Try the Samples**: Browse practical examples in the `samples/` folder to see Chonkie.Net in action

## What's Next?

Future plans include deeper testing with production workloads, performance optimizations, expanded documentation with real-world scenarios, and community feedback. If you give it a try, please share your experience. Bug reports, feature requests, and contributions are always welcome.

If you're building your next RAG application in .NET, Chonkie.Net is here and ready to help.

**Happy chunking! 🦛**
