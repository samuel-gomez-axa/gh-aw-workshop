<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe 13-01 : Pattern — Étiqueter Automatiquement Les PRs Selon Leur Contenu

## :dart: Ce Que Vous Allez Faire

Étendez votre workflow de revue de PR pour appliquer automatiquement des [GitHub labels](https://github.github.com/gh-aw/reference/safe-outputs/#add-labels-add-labels) à partir des fichiers modifiés dans une pull request.

## :clipboard: Avant De Commencer

- Terminez [Build Your First Event-Driven Workflow: PR Auto-Reviewer](14b-pr-reviewer-workflow.md).
- Votre dépôt d'entraînement contient déjà au moins un label. Sinon, allez dans **Issues → Labels** de votre dépôt et créez des labels comme `documentation`, `tests` et `bug-fix`.

## Pourquoi L'étiquetage Automatique ?

Les labels aident les équipes à filtrer et prioriser les pull requests d'un coup d'oeil. Les appliquer manuellement s'oublie facilement, surtout sur des dépôts actifs. Un labeller agentique lit la liste des fichiers modifiés et applique les bons labels avant même qu'un relecteur humain n'ouvre la PR.

Le [LabelOps pattern](https://github.github.com/gh-aw/patterns/label-ops/) garde l'approche simple : associez des motifs de chemins de fichiers à des noms de labels dans votre brief de workflow, puis demandez à l'agent de choisir et d'appliquer les labels correspondants.

## Le Workflow D'étiquetage

Créez `.github/workflows/pr-labeler.md` :

```markdown
---
name: PR Labeler
on:
    pull_request:
        types: [opened, synchronize]
permissions:
    pull-requests: write
    contents: read
safe-outputs:
    add-labels:
        limit: 5
---

You are a pull request labeller. When a pull request is opened or updated:

1. Read the list of changed files from the pull request context.
2. Apply labels to the pull request using these rules:
    - If any changed file is under `docs/` or has a `.md` extension → apply `documentation`
    - If any changed file is under `tests/` or has a `.test.` or `.spec.` pattern → apply `tests`
    - If the PR title or description contains the word "fix" or "bug" (case-insensitive) → apply `bug-fix`
3. Apply only the labels that match. Do not remove labels already present.
4. If no rule matches, do not apply any label and do not post a comment.
```

Compilez puis poussez :

```bash
gh aw compile
git add .
git commit -m "feat: add PR labeller workflow"
git push
```

## Testez-Le

Ouvrez une pull request de test qui modifie un fichier Markdown. Une fois le workflow exécuté, vérifiez la barre latérale de la pull request : le label `documentation` doit apparaître automatiquement.

Ouvrez ensuite une autre PR qui modifie un fichier de test et vérifiez que le label `tests` est appliqué.

## Exercice Pratique

Les règles actuelles utilisent des motifs de chemins simples. Étendez le labeller pour appliquer aussi un label `config-change` lorsqu'un fichier sous `.github/` ou nommé `*.yaml` / `*.yml` est modifié.

<details>
<summary>Afficher une manière d'ajouter cette règle</summary>

Ajoutez cette règle au workflow brief :

```text
- If any changed file is under `.github/` or has a `.yaml` or `.yml` extension → apply `config-change`
```

Compilez, poussez, puis testez avec une PR qui modifie un fichier de workflow.

</details>

## :white_check_mark: Checkpoint

- [ ] J'ai créé `.github/workflows/pr-labeler.md` avec un trigger `pull_request`
- [ ] `gh aw compile` s'est terminé sans erreur et `.lock.yml` est validé puis poussé
- [ ] J'ai ouvert une PR de test et le workflow a appliqué automatiquement le bon label
- [ ] Je peux expliquer pourquoi `safe-outputs: add-labels` est la bonne surface pour ce pattern
- [ ] J'ai étendu le labeller pour gérer au moins une règle supplémentaire basée sur le chemin de fichier

<!-- journey: all -->

Revenez à [Créer votre premier workflow événementiel : PR Auto-Reviewer](14b-pr-reviewer-workflow.md).

<!-- /journey -->
