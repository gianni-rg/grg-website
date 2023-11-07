---
Title: Giocando con GitHub Copilot
Published: 2021-07-27 09:45:00
Language: it
Image: /assets/images/github-copilot.png
Description: Negli ultimi giorni ho potuto giocare un po' con GitHub Copilot. E' un nuovo servizio di GitHub e OpenAI, che può essere usato come plugin in Visual Studio Code. Può auto-generare il codice per noi, basandosi sul contenuto del file corrente e della posizione del cursore. Queste sono le mie prime impressioni dopo aver usato il servizio.
Tags:
- intelligenza artificiale
- machine learning
- text generation
- deep learning
- strumenti
- github
TranslatedRefs: en/posts/2021/7/27/playing-with-github-copilot.md
DisqusId: E667A2A1297C4D1F9D92CF173117048B9B1EEEF81D144444915E97503171CDC5
---
Negli ultimi giorni ho avuto modo di giocare un po' con la <a href="https://copilot.github.com/" target="_blank">Technical Preview di GitHub Copilot</a>. Per chi non lo conoscesse ancora, dal sito ufficiale "*GitHub Copilot &egrave; un AI pair programmer, che ti aiuta a scrivere il codice più rapidamente e con meno lavoro*". E' un nuovo servizio di GitHub e OpenAI, che pu&ograve; essere usato come plugin in Visual Studio Code. Pu&ograve; auto-generare il codice per voi, basandosi sui contenuti del *file corrente*, e della *posizione del cursore corrente*. GitHub Copilot deriva il contesto dal codice e dai commenti, e suggerisce singole linee di codice o intere funzioni istantaneamente.

GitHub Copilot non &egrave; il primo strumento AI-powered che suggerisce il completamento del codice. Strumenti simili (ma molto meno avanzati) sono Visual Studio <a href="https://code.visualstudio.com/docs/editor/intellisense" target="_blank">IntelliSense</a> e <a href="https://visualstudio.microsoft.com/services/intellicode/" target="_blank">IntelliCode</a>, o <a href="https://github.blog/2018-09-18-towards-natural-language-semantic-code-search/" target="_blank">Natural Language Semantic Code Search di GitHub</a>, che pu&ograve; trovare esempi di codice usando descrizioni in Inglese. Copilot &egrave; un po' differente, perch&egrave; pu&ograve; *generare* funzioni multi-linea, documentazione, test e anche testo generico, basato sul contesto del file sorgente. Essendo stato coinvolto per lavoro in un progetto esplorativo R&D, dove ho potuto sperimentare un po' con la generazione automatica di testo, ero particolarmente interessato a provare Copilot, "generazione di testo per codice sorgente".

Attualmente non è disponibile pubblicamente, per cui se voleste provarlo, dovete farne richiesta tramite lista di attesa, visitando il sito <a href="https://copilot.github.com/" target="_blank">GitHub Copilot</a>.

![GitHub Copilot Screenshot - Pagina di registrazione](/assets/images/github-copilot-signup.png)

Per quelli che hanno gi&agrave; avuto accesso, dopo un rapido setup iniziale e l'installazione dell'extension per Visual Studio Code, sembra di avere una sorta di mago che "ascolta in sottofondo" i nostri intenti e scrive il codice per noi. Dopo l'installazione e l'autenticazione con il proprio account GitHub, vedrete l'icona di Copilot a destra in basso, in Visual Studio Code:

![GitHub Copilot Screenshot - Icona VSCode](/assets/images/github-copilot-icon.png)

E' possibile in ogni momento abilitare e disabilitare Copilot cliccando sull'icona.

Per esempio, in questo screenshot, ho scritto del codice C# e un commento che descrive una funzione che vorrei implementare.

![GitHub Copilot Screenshot - Generazione codice C# in VSCode](/assets/images/github-copilot-2.png)

Il testo in grigio &egrave; stato completamente suggerito da Copilot. Per confermare e accettare il suggerimento, basta premere TAB. Ma Copilot fornisce altre opzioni, come navigare avanti e indietro tra vari suggerimenti, accettare il suggerimento corrente, oppure aprire la finestra di Copilot (CTRL+ENTER), dove vengono mostrate altre 10 alternative possibili. Davvero impressionante!!

Ho giocato un po' con il servizio e s&igrave;, effettivamente, le prime volte che lo usate, sembra magia, &egrave; impressionante, dato quello che riesce a suggerire e auto-completare. Ma non sono (per ora) del tutto convinto che possa diventare il mio *AI pair programmer* quotidiano. Vediamo rapidamente perch&egrave;.

Copilot &egrave; sviluppato sulla base di un modello linguistico a rete neurale profonda chiamato <a href="https://arxiv.org/abs/2107.03374" target="_blank">Codex</a> (derivato dalle stesse idee di GPT), che &egrave; stato addestrato sui repository pubblici in GitHub. Senza entrare nei dettagli, il modello linguistico Codex impara ad indovinare token e simboli mancanti nel codice sorgente, cos&igrave; da imparare la struttura e il significato dei linguaggi di programmazione. Questo approccio, cos&igrave; come succede anche con i modelli linguistici generici, ha alcune grandi limitazioni, derivate da come sono definiti e addestrati.

Secondo il paper di OpenAI, Codex fornirebbe la risposta corretta meno del **30% delle volte**. E, da quello che ho visto io usandolo per un po' in scenari da mondo reale, pi&ugrave; complessi, nello specifico in progetti Python/Deep Learning, il codice che scrive &egrave; generalmente di bassa qualit&agrave; e spesso fallisce nel suggerire soluzioni ottimali conosciute. Dato che Copilot ha ingerito moltissimo codice dall'archivio pubblico di GitHub, costituito da *milioni di repository*, include codice di altissima qualit&agrave; scritto da programmatori in gamba, ma allo stesso tempo anche codice di media-bassa qualit&agrave;. E cos&igrave; Copilot &egrave; in grado di imparare a scrivere quello che questi programmatori *potrebbero scrivere*, se stessero scrivendo il pezzo di codice al posto nostro. La ragione &egrave; dovuta a come funzionano i modelli linguistici. Sono in grado di generare, in media, quello che la maggior parte della gente scrive. Non hanno senso di cosa &egrave; giusto o sbagliato, cosa &egrave; corretto o no. Quello che dobbiamo fare noi &egrave; prendere quello che ci suggerisce Copilot, e applicarci la nostra *intelligenza umana*.

*Per come la vedo io*, questo non significa che Copilot non sia un servizio favoloso: dal punto di vista AI/ML R&D, il fatto che Copilot possa scrivere codice ragionevole e simil-umano &egrave; un risultato eccezionale, davvero un passo in avanti nella generazione di testo automatica. Ma ci deve essere bene chiaro che inserendo del codice *ragionevole* nel nostro lavoro, senza considerare se compila e/o se si comporta come dovrebbe, che potrebbe non funzionare o non aderire alle best-practice, o addirittura usare approcci "vecchi", si pu&ograve; introdurre del debito tecnico, che potrebbe diventare un problema enorme, in certi contesti.

GitHub ha definito Copilot come "pair programmer", ma per ora *io* non credo che questo servizio sia in grado di fare quello che dovrebbe fare. Dalla mia esperienza personale, un buon pair programmer &egrave; qualcuno che mette in dubbio costantemente le nostre idee e assunzioni, ci aiuta a trovare problemi nascosti e ci aiuta nella visione d'insieme. Per ora Copilot non fa nessuna di queste cose: anzi, pensa che le *nostre* assunzioni siano quelle pi&ugrave; appropriate e valide, e si focalizza a scrivere del codice sulla base del file che stiamo modificando e dove si trova il cursore.

In aggiunta, il fatto che GitHub Copilot &egrave; stato addestrato su *codice pubblicamente disponibile*, sotto una *variet&agrave; di licenze*, apre molte discussioni sulle implicazioni etiche e legali. Chi detiene la propriet&agrave; intellettuale del codice generato dall'AI? Cosa succede se il codice generato dall'AI &egrave; un copia-incolla di codice rilasciato sotto GPL (e noi non sappiamo qual &egrave; la sorgente originale e la sua licenza... cos&igrave; potrebbe anche essere che andiamo ad inserire codice GPL nel nostro codice proprietario...)? Per giunta, in alcune prove, il codice generato conteneva alcune informazioni sul codice originale e sui suoi autori, cos&igrave; come informazioni sensibili tipo password, chiavi API, ecc. Queste sono le cose da tenere in considerazione e fare attenzione.

La cosa pi&ugrave; importante da ricordare &egrave; che, al momento, Copilot &egrave; una *anteprima tecnica preliminare* di una nuova tecnologia, che probabilmente migliorer&agrave; via via col tempo. Quello che posso suggerirvi &egrave;, se potete, di provarlo e usarlo voi stessi, per vedere se il servizio &egrave; in qualche modo utile nei *vostri scenari*. Quindi, condividete e discutete dei problemi, dei comportamenti strani, delle implicazioni, o di quello che funziona e non funziona. Aiuterete GitHub a migliorare il servizio e, nei prossimi mesi e anni, a fornire davvero un potente ed utile "AI pair programmer". Nel frattempo, io far&ograve; lo stesso, e vi terr&ograve; aggiornati sugli ultimi sviluppi.
