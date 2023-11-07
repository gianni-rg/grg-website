---
Title: Playing with GitHub Copilot
Published: 2021-07-27 09:45:00
Language: en
Image: /assets/images/github-copilot.png
Description: I've been playing around with GitHub Copilot for the last few days. It is a new service by GitHub and OpenAI which can be used as a plugin in Visual Studio Code. It can auto-generate code for you, based on the contents of the current file and the current cursor location. These are my first impressions by using the new service.
Tags:
- artificial intelligence
- machine learning
- text generation
- deep learning
- tools
- github
TranslatedRefs: it/post/2021/7/27/giocando-con-github-copilot.md
DisqusId: 6B972D25B35947E484CD0783311F8DDDF340EA82BD864EC8849C3FB71E0DD86B
---
I've been playing around with <a href="https://copilot.github.com/" target="_blank">GitHub Copilot (Technical Preview)</a> for the last few days. For those who doesn't know what it is yet, from its website "*GitHub Copilot is an AI pair programmer that helps you write code faster and with less work*". It is a new service by GitHub and OpenAI, which can be used as a plugin in Visual Studio Code. It can auto-generate code for you, based on the contents of the *current file*, and the *current cursor location*. GitHub Copilot draws context from comments and code, and suggests individual lines or whole functions instantly.

GitHub Copilot is not the first AI-powered tool that suggest code-completion. Similar (but way less advanced) tools are Visual Studio <a href="https://code.visualstudio.com/docs/editor/intellisense" target="_blank">IntelliSense</a> and <a href="https://visualstudio.microsoft.com/services/intellicode/" target="_blank">IntelliCode</a>, or <a href="https://github.blog/2018-09-18-towards-natural-language-semantic-code-search/" target="_blank">GitHub's Natural Language Semantic Code Search</a>, which could find code examples using English descriptions. Copilot is somehow different because it can *generate* multi-line functions, documentation, tests, and even general-purpose text, based on the full context of a source code file. Being involved in AI R&D for work, where I experimented with text generation in the last months, I was particularly interested to test Copilot, "text generation for source code".

It's currently not available publicly, so if you want to use it, you've to join the waiting list by visiting <a href="https://copilot.github.com/" target="_blank">GitHub Copilot</a> and head over to Sign up page.

![GitHub Copilot Screenshot - Sign-up page](/assets/images/github-copilot-signup.png)

For those who already granted access already, after an initial quick setup and installation of the Visual Studio Code extension, it seems a sort of magic wizard that "listens in the background" to your intents and write the code for you. After installation and authenticating it with your GitHub, you'll see Copilot icon in Visual Studio Code at bottom right:

![GitHub Copilot Screenshot - VSCode Icon](/assets/images/github-copilot-icon.png)

It is possible to enable and disable Copilot by tapping its icon, at any time.

For example, in the following screenshot I have written some C# code and a comment describing a function I'd like to implement.

![GitHub Copilot Screenshot - VSCode C# generation](/assets/images/github-copilot-2.png)

The grey text has been entirely suggested by Copilot. To confirm and accept the suggestion, you just have to press TAB. But Copilot gives you also other options, such as navigate between Next and Previous, Accept the current suggestion, or Open the Copilot window (CTRL+ENTER), which shows a list of other 10 available alternatives. Very impressive!!

I played around some times with the service, and yes, the first times you use it, it seems like magic, and it's quite impressive, given what it is able to suggest and auto-complete. But I'm not convinced it can be my daily *AI pair programmer* (yet). Let's see why, quickly.

Copilot is powered by a deep neural network language model called <a href="https://arxiv.org/abs/2107.03374" target="_blank">Codex</a> (derived from the same ideas as GPT), which was trained on public code repositories on GitHub. Without diving in the details behind it, the Codex language model learns to guess missing tokens and symbols in programming source code, so it learnt a lot about the structure and meaning of programming languages. This approach, as also happen with more general-purpose language models, has some big limitations that are fundamentally derived from how they're built and trained.

According to OpenAI's paper, Codex only gives the correct answer less than **30% of the time**. And, as I've seen by using it for some time in more real-world and complex scenarios, mainly in Python Deep Learning-related projects, the code it writes is generally poorly written and fails to take full advantage of optimal known solutions. Given that Copilot has ingested most of GitHub's public code archive, consisting of *millions of repositories*, it includes code from top-level programmers, as well as average and bad programmers. Thus, Copilot is able to learn what those programmers *might write* if they were writing the same file that you are. The reason is because of how language models work. They are able to generate, on average, what most people write. They don’t have any sense of what is good or bad, what is correct or not. So, we need to pick what Copilot suggests, and apply our *human-intelligence* to it.

*In my opinion*, this does not mean that Copilot is not a great service: from AI/ML R&D perspective, the fact that Copilot can write reasonable and human-looking code is an amazing achievement, a really big step forward in text generation. But it must be clear that ingesting *reasonable-looking* code in our work, without considering if it compiles and/or behaves as expected, that may not work or may not adhere to best-practices, or even use "old" approaches, can create a technical debt, which can be a very big problem in some contexts.

GitHub named Copilot as a "pair programmer", but right now *I* don’t think this is really what the service is trying to do. From my personal experience, a good pair programmer is someone who challenges your ideas and assumptions, helps in finding hidden problems, and helps in seeing the whole picture. At the moment Copilot doesn't do any of these tasks: it "thinks" that *your* assumptions are the most appropriate and valid ones, and focuses entirely on writing code based on the context of where your text cursor is.

In addition, the fact that GitHub Copilot has been trained on *publicly available code*, under *a variety of licenses*, opens many discussions about the ethical and legal implications. Who owns the IP of the AI-generated code? What if the AI-generated code is a copy-paste from an existing code released under GPL (we don't know the original source and the license... so maybe we may use GPL code in proprietary code...)? Also, in some tests, the generated code leaked some information about the original code and authors, as well as sensitive information like passwords, API keys, etc. That's something that we need to be careful about.

The most important thing to remember is that, at the moment, Copilot is an *early technical preview* of a very new technology, that probably will get better and better over time. What I can suggest you is that, if you can, try it and use it by yourself, to see if the service is something that *in your own scenario* may help. Then, let's share and discuss pain points, strange behaviors, implications, or what does and does not work. It will help GitHub in improving the service and, in the upcoming months and years, providing a true, useful and powerful "AI pair programmer". Meanwhile, I'll do the same, and keep you updated on the latest progress.
