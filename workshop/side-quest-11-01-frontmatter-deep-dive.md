<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Exploration Approfondie Du [Frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) — Partie A

> _Facultatif : configurez chacune des trois premières sections du frontmatter d'un fichier [agentic workflow](https://github.github.com/gh-aw/introduction/overview/) : métadonnées, triggers et [permissions](https://github.github.com/gh-aw/reference/permissions/). Parcourez ceci avant de construire Step 11, puis continuez vers [Part B: Tools, Outputs, and the Agent Body](side-quest-11-08-frontmatter-tools-outputs.md) ou revenez au parcours principal._

## 📋 Avant De Commencer

Ouvrez le brouillon de workflow que vous avez commencé dans [Step 11](07-your-first-workflow.md).

---

Un fichier [agentic workflow](https://github.github.com/gh-aw/introduction/overview/) commence par un bloc YAML **[frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)** entre des séparateurs `---`. Ce bloc configure quand le workflow s'exécute et ce qu'il est autorisé à faire.

---

## Fence D'ouverture Et `description`

**🔍 Prédisez :** Quelles sont les deux choses que vous écririez en haut d'un fichier de workflow pour l'identifier d'un coup d'oeil, avant de lire l'explication ci-dessous ?

```markdown
---

emoji: :bar_chart:
description: Post a daily repository status summary as a GitHub issue comment.
```

**Ce que fait cette section :** Elle déclare les métadonnées du workflow.

| Champ         | Rôle                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| `emoji`       | Libellé décoratif dans le dashboard `gh aw`. Choisissez l'emoji approprié. |
| `description` | Résumé affiché dans l'UI Actions et dans `gh aw list`.                     |

**✏️ Essayez :** Mettez à jour les deux champs dans votre brouillon, puis lancez `gh aw compile` et vérifiez qu'aucune erreur n'apparaît.

```markdown
# Your turn

---

emoji: ???
description: ???

---
```

---

## Triggers (`on:`)

**🔍 Prédisez :** Comment indiqueriez-vous à GitHub Actions d'exécuter le workflow chaque jour _et_ d'autoriser un déclenchement manuel ? Écrivez les deux clés avant de poursuivre.

```markdown
---
on:
    schedule: daily
    workflow_dispatch: {}
---
```

**Ce que fait cette section :** Elle déclare quand le workflow s'exécute.

| Champ                   | Rôle                                                                                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on:`                   | Déclare tous les triggers.                                                                                                                                                        |
| `schedule: daily`       | Exécution quotidienne à une heure attribuée par le compilateur. Consultez la [triggers reference](https://github.github.com/gh-aw/reference/triggers/) pour d'autres intervalles. |
| `workflow_dispatch: {}` | Ajoute un bouton de déclenchement manuel dans l'UI Actions.                                                                                                                       |

> [!TIP]
> Conservez `workflow_dispatch: {}` même après le passage en production : cela vous permet de relancer le rapport à la demande.

**✏️ Essayez :** Ajoutez les deux clés de trigger à votre brouillon et lancez `gh aw compile`. Étendez ensuite le bloc pour qu'il se déclenche aussi sur les pushes vers la branche principale :

```markdown
---
on:
    schedule: daily
    push:
        branches: [main]
    workflow_dispatch: {}
---
```

```markdown
---
# Your turn: configure schedule, push to main, and manual triggers
on:
  ???: ???          # daily run
  push:
    branches: [???] # target branch
  ???: {}           # manual trigger
---
```

**✅ Vérifiez :** Lancez `gh aw compile` ; la sortie compilée doit lister les trois triggers.

---

## Permissions

**🔍 Prédisez :** L'agent doit lire des issues et publier un commentaire. Quelles permissions listeriez-vous ? Notez-les avant de lire l'explication.

```markdown
---
permissions:
    contents: read
    copilot-requests: write
    issues: read
    pull-requests: read
    actions: read
---
```

**Ce que fait cette section :** Elle déclare les scopes d'API GitHub que ce workflow peut utiliser ; moins il y en a, mieux c'est pour la sécurité.

| Champ                     | Rôle                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `permissions:`            | Liste chaque scope que le workflow peut utiliser ; les scopes omis sont refusés.    |
| `contents: read`          | Accès en lecture aux fichiers du dépôt et aux commits.                              |
| `copilot-requests: write` | Requis par le [Copilot engine](https://github.github.com/gh-aw/reference/engines/). |
| `issues: read`            | Accès en lecture aux données d'issues.                                              |
| `pull-requests: read`     | Accès en lecture aux données de pull request.                                       |
| `actions: read`           | Accès en lecture aux résultats d'exécution des workflows.                           |

**✏️ Essayez :** Ajoutez le bloc `permissions:` à votre brouillon. Remplissez ensuite la bonne valeur de permission pour chaque scope :

```markdown
---
# Your turn: fill in the correct value for each scope (read or write)
permissions:
    contents: ???
    copilot-requests: ???
    issues: ???
    pull-requests: ???
    actions: ???
---
```

**✅ Vérifiez :** Lancez `gh aw compile` ; la compilation doit se terminer sans erreur de permission.

---

## Mini-Défi

Écrivez de mémoire le bloc `on:` pour schedule + push sur main + déclenchement manuel, puis validez avec `gh aw compile`.

```markdown
---
# Write the on: block below from memory
on:
---
```

<details><summary>Solution</summary>

```markdown
---
on:
    schedule: daily
    push:
        branches: [main]
    workflow_dispatch: {}
---
```

Lancez `gh aw compile` et vérifiez que les trois triggers apparaissent.

</details>

Assemblez maintenant ces trois sections dans un bloc frontmatter complet et compilez-le :

```markdown
# Your turn: combine all three sections

---

emoji: ???
description: ???
on:
???: ??? # daily run
push:
branches: [???] # target branch
???: {} # manual trigger
permissions:
contents: ???
copilot-requests: ???
issues: ???
pull-requests: ???
actions: ???

---
```

<details><summary>Solution</summary>

```markdown
---
emoji: :bar_chart:
description: Post a daily repository status summary as a GitHub issue comment.
on:
  schedule: daily
  push:
    branches: [main]
  workflow_dispatch: {}
permissions:
  contents: read
  copilot-requests: write
  issues: read
  pull-requests: read
  actions: read
---
```

</details>

---

## ✅ Checkpoint

- [ ] Vous avez mis à jour `emoji` et `description` dans votre brouillon et `gh aw compile` n'a produit aucune erreur.
- [ ] Vous avez ajouté les triggers `schedule: daily` et `workflow_dispatch: {}` ; ils apparaissent tous les deux dans la sortie compilée.
- [ ] Vous avez ajouté un trigger de push pour la branche principale et confirmé qu'il compile correctement.
- [ ] Vous pouvez expliquer pourquoi il est utile de conserver `workflow_dispatch: {}` à côté d'un trigger de schedule.
- [ ] Vous avez ajouté le bloc `permissions:` avec ses cinq entrées.
- [ ] `copilot-requests: write` est présent dans votre bloc de permissions.
- [ ] Vous avez terminé le mini-défi : les triggers schedule, push sur main et [workflow_dispatch](https://github.github.com/gh-aw/reference/triggers/#dispatch-triggers-workflowdispatch) apparaissent tous dans la sortie compilée.
- [ ] Vous pouvez expliquer ce qu'autorise chaque scope de permission du bloc.
- [ ] Vous avez rédigé un bloc frontmatter complet combiné et il a compilé sans erreurs.
- [ ] Le trigger `workflow_dispatch: {}` apparaît comme bouton de déclenchement manuel dans votre UI GitHub Actions après le push.

---

<!-- journey: all -->

**Suite :** [Part B: Tools, Outputs, and the Agent Body](side-quest-11-08-frontmatter-tools-outputs.md)

**Retour à :** [Build — Daily Repo Status Workflow](07-your-first-workflow.md)

<!-- /journey -->
