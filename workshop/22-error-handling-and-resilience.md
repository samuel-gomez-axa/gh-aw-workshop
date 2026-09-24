<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Rendez vos workflows resilients face aux erreurs

> _Un workflow qui gère proprement les erreurs est un workflow auquel vous pouvez faire confiance pour tourner sans surveillance, semaine après semaine._

## 🎯 Ce que vous allez faire

Apprenez les modes d'échec les plus courants des workflows agentiques en production et appliquez trois techniques pratiques, briefs de tâche défensifs, réglages de timeout et fallbacks de [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/), afin que votre workflow reste utile même quand les choses se passent mal.

## 📋 Avant de commencer

- Vous disposez d'un workflow planifié fonctionnel (voir [Refine, Test, and Improve Your Workflow](09-agentic-editing.md)).
- Vous êtes à l'aise pour modifier le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) et les briefs de tâche d'un workflow.

## Étapes

### Comprendre les modes d'échec courants

Les workflows agentiques échouent le plus souvent de quatre façons : données vides, erreurs d'outils, timeouts et dérive du prompt. Cette étape applique trois mitigations, un brief défensif, `timeout-minutes` et une safe-output de secours, qui couvrent ces quatre cas.

> [!TIP]
>
> <details>
> <summary><b>Side quest facultative :</b> Vous voulez un exemple détaillé de chaque mode d'échec et vous exercer à associer chaque échec à sa correction avant de commencer ?</summary>
>
> Parcourez [Side Quest: Recognizing Common Agentic Workflow Failure Modes](side-quest-22-01-failure-modes.md), puis revenez ici.
>
> </details>

### Appliquer les trois changements avec la skill

Dans votre session Copilot CLI dans le terminal, collez :

```prompt
/agentic-workflows make daily-status.md resilient: add a fallback brief for empty data, set timeout-minutes to 10, and include a fallback message on the safe-output call.
```

La skill applique ces trois modifications et recompile le [lock file](https://github.github.com/gh-aw/reference/compilation-process/). Examinez le diff avant de commit.

<details open>
<summary>✏️ Manual edit path</summary>

Effectuez les trois modifications manuellement, en vous appuyant sur le contenu de référence ci-dessous, puis lancez :

```bash
gh aw compile
git add .
git commit -m "feat: add timeout and defensive fallback to daily-status"
git push
```

</details>

### Rédiger un brief de tâche défensif

Un brief de tâche défensif indique à l'agent quoi faire lorsque les données sont manquantes ou peu fournies. Ajoutez une instruction de secours explicite dans votre description de tâche :

```markdown .github/workflows/daily-status.md
If there are no open pull requests or issues to summarise,
write a brief "No activity" report instead of skipping the output step.
Always call the safe output tool — even for empty results.
```

Cela évite l'échec le plus courant : l'agent termine en silence sans rien écrire.

### Définir un timeout

Les tâches longues peuvent bloquer une exécution de workflow indéfiniment. Ajoutez `timeout-minutes` au frontmatter de votre workflow pour limiter la durée d'exécution, comme expliqué dans [Timeouts](https://github.github.com/gh-aw/reference/rate-limiting-controls/#timeouts) :

```markdown .github/workflows/daily-status.md
---
name: Daily Status Report
on:
    schedule: daily
    workflow_dispatch: {}
permissions:
    contents: read
    issues: write
timeout-minutes: 10
---
```

> [!TIP]
>
> <details>
> <summary>`timeout-minutes` doit se trouver au niveau racine du frontmatter gh-aw. Ne l'imbriquez pas sous `jobs:` ni sous `run:`.</summary>
>
> Commencez par une limite confortable, entre 10 et 15 minutes, puis resserrez-la une fois que vous connaîtrez la durée habituelle des exécutions.
>
> </details>

Sur GitHub Enterprise Server (GHES) et GitHub Enterprise Cloud (GHEC), les administrateurs peuvent définir un timeout maximal pour les jobs au niveau de l'organisation ou de l'entreprise. Lorsque cette politique est plus restrictive que votre valeur `timeout-minutes`, la limite enterprise l'emporte et le job de workflow sera annulé au seuil défini par l'administration. Vérifiez ce point avec votre administrateur GitHub avant de vous appuyer sur une valeur `timeout-minutes` précise dans un environnement enterprise.

### Ajouter un message de secours aux [safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/)

Lorsque votre workflow utilise une safe output `noop` ou de commentaire, incluez toujours un message de secours utile. Si l'agent atteint l'étape de sortie mais n'a rien à signaler, cela garantit que l'exécution laisse tout de même un résultat visible :

```markdown .github/workflows/daily-status.md
If no meaningful changes were found, call noop with the message:
"No changes found in the past 24 hours — workflow ran successfully."
```

Cela permet de distinguer facilement une exécution calme mais saine d'un échec silencieux dans le journal Actions.

### Committer et pousser vos changements

La skill `/agentic-workflows` recompile automatiquement le lock file. Committez les deux fichiers puis poussez :

```bash
git add .
git commit -m "feat: add timeout and defensive fallback to daily-status"
git push
```

> [!IMPORTANT]
> Les modifications du frontmatter, y compris `timeout-minutes`, ne prennent effet qu'après recompilation du lock file. La skill `/agentic-workflows` s'en charge automatiquement. Si vous avez édité manuellement dans un terminal, lancez `gh aw compile` avant de pousser.

### Vérifier vos changements

Après le push :

1. Déclenchez une exécution manuelle depuis l'onglet **Actions**.
2. Ouvrez le journal d'exécution et confirmez que l'étape de safe output s'exécute même lorsque le jeu de données est petit ou vide.
3. Vérifiez la durée d'exécution : elle doit rester largement sous votre limite `timeout-minutes`.

## ✅ Checkpoint

- [ ] Votre brief de tâche inclut une instruction de secours explicite pour les données vides ou manquantes
- [ ] Le frontmatter de votre workflow définit `timeout-minutes`
- [ ] Votre appel de safe-output inclut un message de secours pour les exécutions calmes
- [ ] Le lock file compilé a été mis à jour et committé avec la source du workflow
- [ ] Une exécution manuelle se termine avec succès et l'étape de safe output est visible dans le journal
- [ ] Vous pouvez citer au moins deux modes d'échec courants d'un workflow agentique et expliquer comment les atténuer

<!-- journey: all -->

**Suite :** [Testez vos idees de prompt avec des experiences A/B](23-ab-experiments.md)

<!-- /journey -->
