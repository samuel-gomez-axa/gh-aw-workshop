<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Structure D'un Fichier De Workflow En Un Coup D'oeil

> _Facultatif : lisez ceci avant de construire Step 11 pour comprendre ce que vous êtes en train d'écrire, puis revenez à [Build the Daily Repo Status Workflow](07-your-first-workflow.md)._

## :clipboard: Avant De Commencer

- Gardez [Build the Daily Repo Status Workflow](07-your-first-workflow.md) ouvert afin de pouvoir faire correspondre chaque section ici au workflow que vous construirez ensuite.

---

Un fichier [agentic workflow](https://github.github.com/gh-aw/introduction/overview/) comporte deux parties :

- **[Frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)** — du YAML entre des fences `---` en haut du fichier. Cela configure comment et quand le workflow s'exécute.
- **Corps Markdown** — le brief de tâche de l'agent, écrit sous le `---` de fermeture. L'IA le lit à l'exécution.

Le fichier se termine par `.md` plutôt que `.yml` parce que le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) n'est que le bloc de configuration d'ouverture ; le reste du fichier est un brief Markdown lu par l'agent à l'exécution. Consultez la [Classic vs. Agentic comparison in Step 5](05-agentic-workflows-intro.md).

---

## Les Sections Du Frontmatter En Un Coup D'oeil

Les cinq sections de frontmatter que vous construirez dans Step 7 :

| Section                                                               | Clé(s)                 | Ce qu'elle fait                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Métadonnées                                                           | `emoji`, `description` | Libellés lisibles par un humain, affichés dans le dashboard `gh aw` et l'UI Actions.                                                                                                                              |
| [Triggers](https://github.github.com/gh-aw/reference/triggers/)       | `on:`                  | Indique à GitHub Actions quand exécuter le workflow : `schedule: daily` plus un bouton manuel `workflow_dispatch`.                                                                                                |
| [Permissions](https://github.github.com/gh-aw/reference/permissions/) | `permissions:`         | Déclare les scopes d'API GitHub minimaux que le workflow peut utiliser.                                                                                                                                           |
| [Tools](https://github.github.com/gh-aw/reference/tools/)             | `tools:`               | Active l'outil [GitHub MCP](https://github.github.com/gh-aw/reference/tools/#github-tools-github) via `gh-proxy`, limité par les [permissions](https://github.github.com/gh-aw/reference/permissions/) ci-dessus. |
| Garde-fou d'écriture                                                  | `safe-outputs:`        | Les seules actions d'écriture que l'agent peut effectuer : ici, un commentaire d'issue par run.                                                                                                                   |

## :pencil2: Essayez : Étiquetez La Structure

Avant de regarder la réponse, copiez cet extrait dans votre éditeur et ajoutez vos propres libellés au-dessus de chaque partie.

```md
---
emoji: :bar_chart:
description: Daily repository status report
on:
  schedule: daily
  workflow_dispatch: {}
permissions:
  contents: read
  issues: read
tools:
  github:
    mode: gh-proxy
safe-outputs:
  add-comment:
    max: 1
---

Summarize the open issues, recent pull requests, and latest workflow runs.
```

<details>
<summary>Afficher les libellés des sections</summary>

- `emoji` and `description` = **Métadonnées**
- `on:` = **Triggers**
- `permissions:` = **Permissions**
- `tools:` = **Tools**
- `safe-outputs:` = **Garde-fou d'écriture**
- La phrase sous le `---` de fermeture = **Corps Markdown**

</details>

---

## :white_check_mark: Checkpoint

- [ ] Vous avez étiqueté l'exemple et identifié les cinq sections du frontmatter.
- [ ] Vous pouvez montrer le bloc `on:` et expliquer qu'il contrôle quand le workflow s'exécute.
- [ ] Vous pouvez montrer `safe-outputs:` et expliquer qu'il limite ce que l'agent peut écrire.
- [ ] Vous pouvez montrer le texte sous le `---` de fermeture et l'identifier comme le corps Markdown.
- [ ] Vous pouvez expliquer en une phrase pourquoi le fichier se termine par `.md` au lieu de `.yml`.

---

<!-- journey: all -->

Revenez à [Build the Daily Repo Status Workflow](07-your-first-workflow.md).

<!-- /journey -->
