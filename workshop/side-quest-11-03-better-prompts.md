<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Rédiger De Meilleurs Briefs De Tâche IA

> _Facultatif : parcourez ce guide si vous voulez obtenir une sortie plus utile et plus régulière de vos [agentic workflows](https://github.github.com/gh-aw/introduction/overview/), puis revenez à [Step 11](07-your-first-workflow.md) ou [Step 9](09-agentic-editing.md)._

## :dart: Ce Que Vous Allez Faire

Découvrez cinq techniques pratiques pour rédiger des briefs de tâche IA qui produisent une sortie de workflow plus claire et plus exploitable. À la fin, vous aurez un brief de tâche amélioré pour votre workflow de statut quotidien, avec un meilleur contexte, des contraintes plus précises et un format de sortie prévisible.

## :clipboard: Avant De Commencer

- Vous avez rédigé votre premier brief de tâche de workflow dans [Step 11](07-your-first-workflow.md).
- Vous avez exécuté le workflow au moins une fois dans [Step 9](09-agentic-editing.md) et vu sa sortie.

---

## Qu'est-Ce Qu'un Brief De Tâche ?

Le **brief de tâche** est le corps Markdown de votre fichier de workflow : tout ce qui se trouve sous le `---` de fermeture du [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/). C'est l'instruction en langage naturel que l'agent IA lit avant d'agir.

Contrairement à un message de chat, le brief de tâche s'exécute sans supervision. L'IA ne peut pas poser de questions de clarification, donc tout ce dont elle a besoin doit se trouver dans le brief lui-même.

> [!TIP]
> Commencer à partir d'une page blanche est la partie la plus difficile. Le [gh-aw wizard](https://githubnext.github.io/gh-aw-wizard/) génère un prompt de premier brouillon pour un nouveau workflow, que vous pouvez ensuite affiner avec les techniques ci-dessous.

---

## Énoncez L'objectif, Pas Seulement L'action

:x: Vague:

```
Summarise the repository activity.
```

:white_check_mark: Orienté objectif :

```
Produce a concise daily summary that helps a developer answer: "What changed
yesterday, and is there anything I need to act on today?"
```

Formuler le _but_ aide l'IA à décider quoi inclure et quoi laisser de côté.

---

## Donnez Une Forme À La Sortie

Indiquez précisément à l'IA le format que vous voulez. Incluez des titres de section, des styles de liste ou même un exemple de squelette.

```
Format your summary as follows:

## Daily Status — {date}

### 🔀 Recent Commits
- One bullet per commit with author and short message.

### 🐛 Open Issues
- List open issues by title. If there are none, say "No open issues."

### 📌 Action Items
- Highlight anything that looks urgent or blocked.
```

Quand le format est explicite, la sortie est prévisible et plus facile à parcourir.

---

## Définissez Le Périmètre Et Les Contraintes

Si vous ne cadrez pas l'IA, elle peut partir trop large. Soyez précis :

- **Fenêtre temporelle** : "Focus on activity from the last 24 hours only."
- **Niveau de détail** : "Keep each section to three bullet points maximum."
- **Ton** : "Write in plain English, not jargon. Assume the reader is a developer, not a manager."
- **À omettre** : "Skip merge commits and bot commits."

De courtes contraintes rapportent gros sur des centaines de runs automatisés.

---

## Référencez Les Sorties D'étape Explicitement

Lorsque votre workflow récupère des données dans des étapes précédentes, voir [Step 16](16-connect-data-source.md), pointez l'IA vers ces données par leur nom :

```
Use `${{ steps.recent.outputs.commit_log }}` as the source of commit activity.
Use `${{ steps.issues.outputs.open_issues }}` as the source of open issues.
Do not invent data — if a variable is empty, say so.
```

La dernière ligne, "do not invent data", est particulièrement importante. Sans elle, les modèles d'IA hallucinent parfois des commits ou des issues qui semblent plausibles.

---

## Ajoutez Une Phrase De Fin Attendue

Terminez chaque brief de tâche par une phrase qui définit la réussite :

```
You are done when you have posted one Markdown comment to the Actions run
summary that covers all three sections above and is under 300 words.
```

Cela sert de condition d'arrêt. Cela réduit les appels d'outils inutiles et garde le run rapide.

---

## Assembler Le Tout

Voici une comparaison avant/après d'un brief de tâche de statut quotidien :

**Before:**

```
Summarise what happened in this repository today and post it.
```

**After:**

```
Produce a concise daily summary that helps a developer answer:
"What changed yesterday, and is there anything I need to act on today?"

Use `${{ steps.recent.outputs.commit_log }}` for commits and
`${{ steps.issues.outputs.open_issues }}` for open issues.
Do not invent data — if a variable is empty, say "None."

Format:

## Daily Status — {date}

### 🔀 Recent Commits
- Up to five bullets: author, short message.

### 🐛 Open Issues
- Up to five bullets: issue number and title.

### 📌 Action Items
- Flag anything urgent or blocked. If nothing stands out, write "Nothing urgent."

Keep the whole summary under 300 words. You are done when the summary is
posted to the Actions run summary.
```

> [!TIP]
> De petits changements dans le brief de tâche peuvent avoir de grands effets sur la qualité de sortie. Traitez-le comme du code : versionnez-le, testez-le, itérez.

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez citer trois techniques pour améliorer un brief de tâche
- [ ] Vous avez mis à jour votre workflow de statut quotidien avec au moins une amélioration issue de ce guide
- [ ] Vous comprenez pourquoi "do not invent data" est important lorsqu'on référence des sorties d'étape
- [ ] Votre workflow mis à jour compile toujours et s'exécute sans erreur

---

<!-- journey: all -->

Revenez à [Créer votre workflow Daily Repo Status](07-your-first-workflow.md) ou continuez vers [Affiner, tester et améliorer votre workflow](09-agentic-editing.md).

<!-- /journey -->
