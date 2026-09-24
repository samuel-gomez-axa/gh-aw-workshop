<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Rédiger Un Brief Agent Clair

> _Facultatif : utilisez cet exercice rapide pour structurer votre brief avant de revenir à [Step 10](09-agentic-editing.md) ou de passer à [Step 11](07-your-first-workflow.md)._

## 🎯 Ce Que Vous Allez Faire

Construisez votre brief dans un fichier brouillon en cinq étapes. À la fin, vous aurez un brief de statut quotidien que vous pourrez coller dans votre workflow et réutiliser.

## 📋 Avant De Commencer

- Vous avez terminé [Interpreting Workflow Output](08b-interpret-your-run.md)
- Vous avez un dépôt d'entraînement créé pendant [Codespace Setup](02a-setup-codespace.md) ou la quête annexe facultative [Local Terminal](side-quest-02-01-local-terminal.md)

---

## En Un Coup D'oeil

Pour chaque étape : **écrivez d'abord, vérifiez votre brouillon, puis développez "Pourquoi cela fonctionne" pour comprendre le raisonnement**.

| Étape      | Écrivez d'abord                                                 | Vérifiez avant de continuer                               |
| ---------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| Objectif   | Une phrase qui commence par "Every day, I want the agent to..." | Décrit une action et son résultat                         |
| Entrées    | 3-5 puces avec les données dont vous avez besoin                | Chaque entrée alimente un champ du rapport                |
| Sortie     | Un squelette de rapport littéral                                | Utilise un format cohérent avec des espaces réservés      |
| Garde-fous | De courtes règles pour les limites et les solutions de repli    | Évite les doublons et les suppositions                    |
| Relecture  | Une passe rapide sur l'ensemble du brief                        | Le brief utilise partout un langage concret et observable |

---

## Formulez L'objectif En Une Phrase

Remplacez l'exemple entre crochets ci-dessous par votre propre objectif en une phrase.

```text
Every day, I want the agent to [summarize open pull requests and post a health report as an issue comment].
```

Avant de continuer, vérifiez que votre objectif tient en une phrase, décrit une action et précise où le résultat apparaîtra.

<details>
<summary>Pourquoi cela fonctionne</summary>

Un objectif en une phrase impose un périmètre clair. Si vous avez besoin de plusieurs résultats, il vous faut probablement plusieurs workflows ou un brief plus resserré.

</details>

---

## Listez Les Entrées

Listez les données que l'agent doit collecter avant de pouvoir rédiger le rapport. Marquez les éléments incertains avec un `?` afin de pouvoir les vérifier plus tard.

```md
- [input] — [why you need it]
- [input] — [why you need it]?
- [input] — [why you need it]?
```

Ajoutez un `?` uniquement sur les lignes dont vous n'êtes pas encore sûr.

Avant de continuer, vérifiez que vous avez au moins trois entrées, que chacune correspond à un champ de votre rapport et que vous avez marqué les éléments incertains avec `?`.

<details>
<summary>Pourquoi cela fonctionne</summary>

Les entrées transforment "summarize the repo" en une demande de données concrète. Elles facilitent aussi l'identification des [permissions](https://github.github.com/gh-aw/reference/permissions/) ou des [tools](https://github.github.com/gh-aw/reference/tools/) manquants quand vous construisez le workflow.

</details>

---

## Esquissez La Sortie

Montrez à l'agent le format voulu au lieu de le décrire vaguement. Commencez par un squelette simple, puis adaptez les champs que vous souhaitez suivre.

```text
📊 Daily Repo Status — {date}
PRs: {count}
Issues: {count}
CI: {status}
Health check: {one sentence}
```

Avant de continuer, vérifiez que votre squelette comporte un titre ou un en-tête, que chaque espace réservé correspond à l'une de vos entrées et que l'ensemble du rapport se parcourt en quelques secondes.

<details>
<summary>Pourquoi cela fonctionne</summary>

Un squelette littéral laisse moins de décisions de format à l'agent. Une sortie cohérente est plus facile à lire, comparer et déboguer après le premier run.

</details>

---

## Rédigez Les Garde-Fous

Ajoutez de courtes règles qui limitent les opérations d'écriture, comme la publication de commentaires, et indiquez à l'agent quoi faire lorsqu'il manque des données.

```md
- Do not [undesired action].
- Post at most [number of comments or writes].
- If [data is missing or a prerequisite is absent], then [fallback].
```

> [!TIP]
> Omettre les garde-fous peut entraîner des commentaires en double ou des données inventées.

Avant de continuer, vérifiez que vos garde-fous incluent une action que l'agent ne doit pas effectuer, un nombre maximum d'écritures et une solution de repli en cas de données manquantes.

<details>
<summary>Pourquoi cela fonctionne</summary>

Les garde-fous évitent les publications en double, les chiffres inventés et les comportements de repli flous. C'est le moyen le plus rapide de réduire les runs bruyants.

</details>

---

## Relisez Le Brief

Relisez le brouillon une fois. Remplacez des mots vagues comme "recent" par "within the last 7 days" ou "important" par "labeled priority-1".

Avant de continuer, vérifiez que votre objectif, vos entrées, votre format de sortie et vos garde-fous utilisent tous un langage concret et observable, et que vous avez remplacé au moins une expression vague.

<details>
<summary>Pourquoi cela fonctionne</summary>

La plupart des problèmes au premier run viennent de l'ambiguïté, pas d'un agent qui ignore les instructions. Une relecture finale révèle généralement ce qui a encore besoin d'une règle, d'un champ ou d'un exemple concret.

</details>

---

## Assemblez Le Tout

Si vous voulez une base de départ, collez ceci dans votre fichier brouillon et complétez les blancs avec vos propres choix.

```md
Goal:
Every day, I want the agent to [summarize X and post Y].

Inputs:

- [input]
- [input]
- [input]

Output:
📊 Daily Repo Status — {date}
[line 1]
[line 2]
[line 3]

Guardrails:

- Do not [undesired action].
- Post at most [number of comments or writes].
- If [data is missing or a prerequisite is absent], then [fallback].
```

> [!TIP]
> Une fois votre brief clair, vous pouvez demander à Copilot de le transformer en workflow avec la skill `agentic-workflows`, qui gère pour vous la syntaxe du [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) et les [permission scopes](https://github.github.com/gh-aw/reference/permissions/).

---

## ✅ Checkpoint

- [ ] J'ai rédigé un objectif en une phrase pour mon rapport de statut quotidien.
- [ ] J'ai listé au moins trois entrées dont l'agent aura besoin.
- [ ] J'ai esquissé le format du rapport avec des espaces réservés.
- [ ] J'ai rédigé des garde-fous pour les limites et les données manquantes.
- [ ] J'ai relu l'ensemble du brief et supprimé les formulations vagues.

---

<!-- journey: all -->

Revenez à [Design Your Daily Repo Status Report](09-agentic-editing.md) ou continuez vers [Build Your Daily Repo Status Workflow](07-your-first-workflow.md).

<!-- /journey -->
