<!-- page-journey: all -->
<!-- page-adventure: core -->

# GitHub Actions en 5 minutes

<details open>
<summary><b>Vous connaissez déjà GitHub Actions ?</b> Vérifiez ces trois affirmations puis passez à la suite :</summary>

- Vous savez que les workflows se trouvent dans `.github/workflows/` sous forme de fichiers YAML
- Vous savez lire les clés `on`, `jobs` et `steps` dans un fichier de workflow
- Vous savez que chaque étape s’exécute sur un runner hébergé par GitHub

**→ [Passer à Qu’est-ce qu’un Agentic Workflow ?](05-agentic-workflows-intro.md)**
(ou [aller à Installer gh-aw](06-install-gh-aw.md) si vous connaissez déjà les deux)

</details>

## 🎯 Ce que vous allez faire

Vous allez faire une révision rapide des primitives Actions utilisées dans cet atelier : [triggers](https://github.github.com/gh-aw/reference/triggers/), jobs, steps et fichiers de workflow. Après cette étape, vous saurez lire n’importe quel fichier de workflow GitHub Actions classique.

## 📋 Avant de commencer

- Le dépôt d’entraînement a été configuré lors d’une étape précédente.
- Aucun outil ni identifiant n’est nécessaire pour cette étape.

## Révision rapide

Un workflow GitHub Actions est un fichier YAML dans `.github/workflows/` qui indique à GitHub :

- _quand_ l’exécuter (`on`)
- _quoi_ exécuter (`jobs`)
- _comment_ chaque job s’exécute (`steps`)

```text
.github/
  workflows/
    hello.yml   ← each workflow file lives here
```

Exemple annoté : chaque commentaire nomme le terme clé. Il s’agit d’un workflow Actions standard, pas d’un agentic workflow :

```yaml .github/workflows/hello-workflow.yml
# Standard GitHub Actions workflow — not an agentic workflow
name: Hello Workflow

on: workflow_dispatch # trigger: the event that starts this workflow

jobs:
    hello: # job: a named group of steps on one machine
        runs-on: ubuntu-latest # runner: the machine GitHub provisions for this job
        steps:
            - run: echo "Hello from GitHub Actions" # step: a shell command on the runner
```

<details open>
<summary>Qu’est-ce qu’un runner ?</summary>

Un **runner** est la machine que GitHub fournit pour chaque job, neuve et isolée à chaque exécution.

```markdown .github/workflows/hello-workflow.md
---
runs-on: ubuntu-latest # also: windows-latest, macos-latest
---
```

Vous pouvez aussi utiliser un **[self-hosted runner](https://github.github.com/gh-aw/reference/self-hosted-runners/)** pour du matériel personnalisé ou des réseaux privés. Les agentic workflows utilisent les mêmes runners hébergés.

</details>

## Pourquoi c’est important pour les Agentic Workflows

Les workflows traditionnels exécutent un chemin de script fixe. Les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/) reposent toujours sur la **même base Actions** avec les mêmes triggers, le même runner et le même modèle de [permissions](https://github.github.com/gh-aw/reference/permissions/), mais ils ajoutent un agent IA qui lit votre dépôt, raisonne sur son contenu et réécrit via des sorties protégées par des garde-fous.

| Concept             | GitHub Actions classique                     | Agentic Workflow                                               |
| ------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| Trigger (`on:`)     | Identique : schedule, push, PR, dispatch     | Identique                                                      |
| Runner (`runs-on:`) | Hébergé par GitHub ou self-hosted            | Identique                                                      |
| Steps               | Commandes shell que vous définissez          | Un agent IA exécute un task brief en langage clair             |
| Output              | Fichiers, journaux, artefacts de déploiement | Commentaires GitHub, issues, PRs ou autres écritures via l’API |

Le fichier d’agentic workflow que vous allez rédiger dans cet atelier est un fichier `.md` avec les mêmes clés `on:` et `runs-on:` que ci-dessus, plus un task brief en Markdown qui indique à l’agent IA quoi faire.

## Étiquetez un exemple de workflow

Le schéma ci-dessous montre comment les cinq parties clés s’assemblent dans chaque fichier de workflow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/04-actions-anatomy-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/04-actions-anatomy-light.svg">
  <img alt="Anatomie d’un workflow GitHub Actions : trigger, job, runner, steps et actions présentés comme des couches imbriquées" src="images/04-actions-anatomy-light.svg">
</picture>

Avant de poursuivre, attribuez à chaque partie mise en évidence du workflow ci-dessous son type :
`trigger`, `job`, `runner`, `step` ou `action`.

```yaml .github/workflows/hello-workflow.yml
on: [push]
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - run: echo "All checks passed"
```

Écrivez une étiquette à côté de chaque ligne :

1. `on: [push]`
2. `test:` (le nom du job sous `jobs:`)
3. `runs-on: ubuntu-latest`
4. `uses: actions/checkout@v4`
5. `run: echo "All checks passed"`

<details>
<summary>Afficher les étiquettes</summary>

- `on: [push]` → **trigger** (quand ce workflow s’exécute)
- `jobs: test:` → **job** (un groupe d’étapes exécuté sur une seule machine)
- `runs-on: ubuntu-latest` → **runner** (le type de machine fourni par GitHub)
- `uses: actions/checkout@v4` → **action** (une étape réutilisable du marketplace Actions)
- `run: echo "All checks passed"` → **step** (une commande shell exécutée directement sur le runner)

</details>

## Essayez : explorez un vrai workflow

Ouvrez un vrai fichier de workflow et repérez les trois briques de base, sans terminal ni identifiants, uniquement avec votre navigateur.

1. Ouvrez n’importe quel dépôt public sur GitHub, par exemple le dépôt [gh-aw-workshop](https://github.com/githubnext/gh-aw-workshop).
2. Cliquez sur l’onglet **Actions**.
3. Cliquez sur n’importe quel workflow dans la barre latérale gauche.
4. Cliquez sur **View workflow file** en haut à droite de la liste des exécutions.
5. Dans le YAML, trouvez et notez :

- le trigger `on:` : quel événement démarre ce workflow ?
- une entrée `jobs:` : quel est le nom du job ?
- un élément `steps` : quelle commande exécute-t-il ?

## ✅ Checkpoint

- [ ] Vous savez identifier `on`, `jobs` et `steps` dans un fichier de workflow
- [ ] Vous avez étiqueté les cinq parties de l’exemple de workflow ci-dessus (trigger, job, runner, action, step)
- [ ] Vous savez que les workflows se trouvent dans `.github/workflows/`
- [ ] Vous avez exploré un vrai workflow et trouvé son trigger, un nom de job et une commande d’étape
- [ ] Vous pouvez décrire une manière dont les agentic workflows étendent les Actions classiques (même trigger et même runner ; l’agent IA remplace des étapes shell fixes)

<!-- journey: all -->

**Étape suivante :** [Qu’est-ce qu’un Agentic Workflow ?](05-agentic-workflows-intro.md)

<!-- /journey -->
