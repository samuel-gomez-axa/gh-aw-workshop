<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe 13-02 : Pattern — Générer Un Commentaire De Résumé De PR

## :dart: Ce Que Vous Allez Faire

Construisez un workflow de résumé de PR qui publie un [summary comment](https://github.github.com/gh-aw/reference/safe-outputs/#comment-creation-add-comment) structuré et lisible lorsqu'une pull request est ouverte. Le résumé est rédigé dans un format qui peut être copié directement dans un changelog ou une note de version.

## :clipboard: Avant De Commencer

- Terminez [Build Your First Event-Driven Workflow: PR Auto-Reviewer](14b-pr-reviewer-workflow.md).

## Pourquoi Un Résumé Structuré ?

Un commentaire de revue libre est utile, mais un résumé structuré est réutilisable. Lorsque chaque PR reçoit un résumé dans le même format, les équipes peuvent exploiter ces commentaires pour générer automatiquement des changelogs, les transmettre aux responsables de version comme brouillons de notes, ou les inclure dans des rétrospectives de sprint.

Le choix de conception clé ici est le modèle de sortie : vous définissez la structure dans le [workflow brief](https://github.github.com/gh-aw/reference/markdown/), et l'agent remplit les blancs.

## Le Workflow De Résumé

Créez `.github/workflows/pr-summary.md` :

```markdown
---
name: PR Summary Generator
on:
    pull_request:
        types: [opened]
permissions:
    pull-requests: write
    contents: read
safe-outputs:
    add-comment:
        limit: 1
---

You are a changelog assistant. When a pull request is opened:

1. Read the PR title, description, and list of changed files.
2. Write a summary using exactly this template:

    ## Summary

    <!-- One sentence describing what this PR does. -->

    ## Changes

    <!-- Bullet list of the main areas touched, based on file paths. One bullet per distinct area. Maximum five bullets. -->

    ## Notes for reviewers

    <!-- One or two sentences flagging anything that needs special attention. If nothing stands out, write "No special concerns." -->

3. Post the summary as a comment on the pull request.
4. Do not add any text outside the template structure.
```

Compilez puis poussez :

```bash
gh aw compile
git add .
git commit -m "feat: add PR summary generator workflow"
git push
```

## Testez-Le

Ouvrez une pull request de test. Le workflow se déclenche uniquement sur `opened`, pas à chaque push, vous verrez donc exactement un commentaire par nouvelle PR. Vérifiez que la sortie correspond au template en trois sections.

## Exercice Pratique : Personnalisez Le Template

Le template ci-dessus est générique. Adaptez-le au workflow réel de votre équipe en modifiant une section.

Idées :

- Remplacez **Notes for reviewers** par **Testing instructions** : demandez à l'agent de suggérer un test manuel à partir des noms de fichiers modifiés.
- Ajoutez une section **Breaking changes** : demandez à l'agent de signaler toute suppression ou tout renommage de fichier pouvant indiquer une rupture de compatibilité.
- Remplacez **Summary** par **Ticket reference** : demandez à l'agent d'extraire un numéro de ticket du titre de la PR, par exemple `[PROJ-123]`, ou d'écrire "No ticket found" s'il n'y en a pas.

Après votre modification, recompilez puis ouvrez une nouvelle PR pour voir la sortie mise à jour.

## :white_check_mark: Checkpoint

- [ ] J'ai créé `.github/workflows/pr-summary.md` avec un trigger `pull_request` limité à `opened`
- [ ] `gh aw compile` s'est terminé sans erreur et `.lock.yml` est validé puis poussé
- [ ] J'ai ouvert une PR de test et le workflow a publié un commentaire correspondant au template en trois sections
- [ ] J'ai personnalisé au moins une section du template pour un cas d'usage réel
- [ ] Je peux expliquer pourquoi se déclencher uniquement sur `opened`, et non `synchronize`, est le bon choix pour un workflow de résumé

<!-- journey: all -->

Revenez à [Créer votre premier workflow événementiel : PR Auto-Reviewer](14b-pr-reviewer-workflow.md).

<!-- /journey -->
