<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe 13-03 : Pattern — Checklist De Revue De PR

## 🎯 Ce Que Vous Allez Faire

Construisez un workflow qui évalue chaque nouvelle pull request à l'aide d'une courte checklist de revue et publie un résumé pass/fail. Les relecteurs peuvent voir d'un coup d'oeil quels critères sont déjà remplis avant même d'ouvrir le diff.

## 📋 Avant De Commencer

- Terminez [Build Your First Event-Driven Workflow: PR Auto-Reviewer](14b-pr-reviewer-workflow.md).

## Pourquoi Un Workflow De Checklist ?

Les checklists de revue appliquent de manière cohérente les standards de l'équipe. Au lieu de compter sur chaque relecteur pour se souvenir de vérifier les mêmes points, vous automatisez l'inspection et exposez les résultats sous forme de [comment](https://github.github.com/gh-aw/reference/safe-outputs/#comment-creation-add-comment). Les relecteurs peuvent alors consacrer leur temps aux sujets qui nécessitent un jugement humain.

Le pattern consiste en une boucle d'évaluation structurée : pour chaque élément de la checklist, l'agent décide si la PR satisfait le critère, explique son raisonnement en une phrase et le marque avec ✅ ou :warning:.

> [!TIP]
> Consultez la référence [pull request trigger](https://github.github.com/gh-aw/reference/triggers/#pull-request-triggers-pullrequest) pour voir tous les types d'événements disponibles.

## Le Workflow De Checklist

Créez `.github/workflows/pr-checklist.md` :

```markdown
---
name: PR Review Checklist
on:
    pull_request:
        types: [opened, synchronize]
permissions:
    pull-requests: read
    contents: read
safe-outputs:
    add-comment:
        limit: 1
---

You are a code review assistant. When a pull request is opened or updated, evaluate it
against the checklist below. For each item, write one sentence of evidence and mark it
✅ (criterion clearly met) or ⚠️ (cannot confirm from available context).

Checklist:

- **Description**: The PR description explains _what_ changed and _why_.
- **Scope**: The PR is focused on a single concern (not a mix of features, fixes, and refactors).
- **Tests**: At least one test file is included or updated (based on file names).
- **Documentation**: If any public interface or user-facing file changed, a `.md` file is also present.
- **Size**: The PR touches fewer than 20 files.

Post the results as a comment on the pull request using this format:

## Review Checklist

| Criterion     | Result  | Evidence       |
| ------------- | ------- | -------------- |
| Description   | ✅ / ⚠️ | _one sentence_ |
| Scope         | ✅ / ⚠️ | _one sentence_ |
| Tests         | ✅ / ⚠️ | _one sentence_ |
| Documentation | ✅ / ⚠️ | _one sentence_ |
| Size          | ✅ / ⚠️ | _one sentence_ |

Do not add any text outside the table and heading.
```

Compilez puis poussez :

```bash
gh aw compile
git add .
git commit -m "feat: add PR review checklist workflow"
git push
```

## Testez-Le

Ouvrez une pull request de test sans description et sans fichiers de test. Le workflow doit publier une checklist avec **Description** et **Tests** marqués :warning:. Mettez ensuite à jour la description de la PR et poussez un nouveau commit : le workflow se déclenche à nouveau sur `synchronize` et la checklist doit être réévaluée.

## Exercice Pratique : Ajoutez Un Critère Propre À Votre Équipe

Les cinq critères ci-dessus sont génériques. Remplacez-en un par quelque chose de pertinent pour votre dépôt d'entraînement.

Idées :

- **Changelog** : une entrée `CHANGELOG.md` a été ajoutée ou mise à jour.
- **Screenshot** : si un fichier d'UI a changé, une capture d'écran est liée dans la description de la PR.
- **Ticket link** : le titre ou la description de la PR contient une référence à un numéro d'issue (`#NNN`).

Mettez à jour la checklist dans le [workflow brief](https://github.github.com/gh-aw/reference/markdown/), recompilez, puis ouvrez une nouvelle PR pour vérifier que le nouveau critère apparaît dans le tableau.

## ✅ Checkpoint

- [ ] J'ai créé `.github/workflows/pr-checklist.md` avec un trigger `pull_request`
- [ ] `gh aw compile` s'est terminé sans erreur et `.lock.yml` est validé puis poussé
- [ ] J'ai ouvert une PR de test sans description et confirmé que **Description** était marqué :warning:
- [ ] J'ai mis à jour la description de la PR et confirmé que la checklist s'est rafraîchie au push suivant
- [ ] J'ai ajouté au moins un critère spécifique à mon équipe à la checklist
- [ ] Je peux expliquer pourquoi l'usage de ✅ et :warning: au lieu de pass/fail rend la sortie plus constructive

<!-- journey: all -->

Revenez à [Créer votre premier workflow événementiel : PR Auto-Reviewer](14b-pr-reviewer-workflow.md).

<!-- /journey -->
