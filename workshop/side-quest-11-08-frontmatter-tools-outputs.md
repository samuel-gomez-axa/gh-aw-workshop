<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Exploration Approfondie Du Frontmatter — Partie B

> _Suite facultative de [Part A](side-quest-11-01-frontmatter-deep-dive.md) : couvre `tools`, `safe-outputs`, la fence de fermeture et le corps de l'agent. Revenez au parcours principal lorsque vous avez terminé._

## :clipboard: Avant De Commencer

Vous avez terminé [Part A](side-quest-11-01-frontmatter-deep-dive.md) et votre brouillon contient déjà `emoji`, `on:` et `permissions:`.

---

## `tools:`

**:mag: Prédisez :** Pour permettre à l'agent d'appeler les API GitHub en toute sécurité et de rester dans les permissions que vous avez déclarées, quelle configuration ajouteriez-vous ? Écrivez votre réponse avant de poursuivre.

```markdown
---
tools:
    github:
        mode: gh-proxy
        toolsets: [default]
---
```

**Ce que fait cette section :** Elle déclare quels serveurs d'outils externes l'agent peut appeler pendant son run.

| Champ                 | Rôle                                                                                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tools:`              | Déclare chaque serveur d'outils que l'agent est autorisé à appeler. Au moins une entrée est requise pour un agent qui lit des données GitHub.                                           |
| `github:`             | Connecte l'agent au [GitHub MCP server](https://github.github.com/gh-aw/reference/tools/) afin qu'il puisse interroger les issues, les pull requests, les commits et les workflow runs. |
| `mode: gh-proxy`      | Fait passer chaque appel à l'API GitHub par un proxy qui applique les `permissions:` déclarées, en bloquant tout appel non préapprouvé.                                                 |
| `toolsets: [default]` | Active le toolset GitHub standard couvrant les issues, les pull requests, les commits et les runs Actions.                                                                              |

**:pencil2: Essayez :** Ajoutez le bloc `tools:` à votre brouillon. Vérifiez bien que `mode` et `toolsets` sont indentés sous `github:`.

---

## `safe-outputs:`

**:mag: Prédisez :** Vous voulez que l'agent publie exactement un commentaire par run et rien d'autre. Qu'écririez-vous sous `safe-outputs` ?

```markdown
---
safe-outputs:
    add-comment:
        max: 1
---
```

**Ce que fait cette section :** Elle liste chaque action d'écriture que l'agent est autorisé à effectuer. Toute opération d'écriture non listée ici est bloquée à l'exécution, quel que soit ce que demande le body de l'agent.

| Champ           | Rôle                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `safe-outputs:` | Déclare chaque opération d'écriture que l'agent peut effectuer. Toute écriture non listée ici est bloquée silencieusement. |
| `add-comment:`  | Autorise l'agent à publier un commentaire sur une issue ou une pull request.                                               |
| `max: 1`        | Limite l'opération à un commentaire par run. Une seconde tentative est ignorée silencieusement.                            |

> [!IMPORTANT]
> Sans `safe-outputs`, l'agent ne peut rien écrire, même si vous le lui demandez dans le body. Le YAML frontmatter est la source de vérité pour l'accès en écriture, pas les instructions en prose.

**:pencil2: Essayez :** Ajoutez `safe-outputs` à votre brouillon. Vérifiez que `max: 1` est bien indenté sous `add-comment:`.

---

## Fence De Fermeture

**:mag: Prédisez :** Comment l'analyseur de fichier sait-il où la configuration YAML se termine et où commencent les instructions de l'agent ?

```markdown
---
```

**Ce que fait cette section :** Elle ferme le bloc [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/). Tout ce qui se trouve sous cette ligne constitue le corps Markdown, c'est-à-dire le [brief de tâche](https://github.github.com/gh-aw/reference/markdown/) de l'agent en anglais courant.

**:pencil2: Essayez :** Ajoutez le `---` de fermeture à votre brouillon. Confirmez que le fichier comporte maintenant exactement deux fences `---`.

---

## Le Markdown Body

**:mag: Prédisez :** L'agent doit collecter quatre points de données du dépôt. Quelles quatre choses listeriez-vous ?

```markdown
# Daily Repo Status Report

You are an AI assistant that monitors this repository and posts a concise daily health report.

## Your Task

Collect and summarize:

1. **Open pull requests** — count, and flag any open longer than 7 days
2. **Open issues** — total count, how many are labeled "bug"
3. **CI status** — result of the most recent workflow run on the default branch
4. **Last commit** — message and time since it was pushed

## Guidelines

- Post only one comment per run. If you have already posted today, skip.
- Keep the report factual. Do not invent numbers.
- If no open issue exists, create one titled "Daily Status Reports" and post the first comment there.
```

**Ce que fait cette section :** Il s'agit du brief en anglais courant que l'agent IA lit à l'exécution, une sorte de fiche de poste qui lui dit quoi collecter et comment répondre.

Trois conventions rendent un brief de tâche fiable :

- **Un titre et une phrase de rôle** ancrent l'objectif de l'agent tout en haut du body.
- **Une liste de tâches numérotée** aide l'agent à traiter chaque point de données dans un ordre prévisible.
- **Un bloc de guidelines** gère les cas particuliers, comme "already posted today", afin que l'agent n'ait pas à deviner.

**:pencil2: Essayez :** Ajoutez le body sous le `---` de fermeture dans votre brouillon, puis lancez `gh aw compile` pour vérifier l'absence d'erreurs.

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez expliquer ce que fait `mode: gh-proxy` et pourquoi c'est important pour la sécurité
- [ ] Vous comprenez que `safe-outputs` est l'unique source d'accès en écriture, pas le texte du body
- [ ] Votre brouillon contient deux fences `---`, avec le body de l'agent sous la seconde
- [ ] Le body de l'agent contient un titre, une liste de tâches numérotée et un bloc de guidelines
- [ ] Le fichier compile sans erreur

---

<!-- journey: all -->

Revenez à [Créer — Daily Repo Status Workflow](07-your-first-workflow.md).

<!-- /journey -->
