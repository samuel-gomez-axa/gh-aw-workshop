<!-- page-journey: all -->
<!-- page-adventure: core -->

# Exercice : reconnaître les Agentic Workflows

## :clipboard: Avant de commencer

- Vous avez lu [Qu’est-ce qu’un Agentic Workflow ?](05-agentic-workflows-intro.md)

Ces exercices vous aident à appliquer ce que vous venez d’apprendre : décider quand utiliser un agentic workflow et rédiger votre premier task brief.

## Essayez : agentic ou standard ?

Pour chaque tâche ci-dessous, décidez s’il faut un **agentic workflow** ou un **standard Actions workflow**, puis affichez la réponse.

**Tâche A :** Run lint and unit tests on every pull request, fail if any check exits non-zero.

- [ ] J’ai pris ma décision pour la tâche A

<details>
<summary>Afficher la réponse de la tâche A</summary>

**Standard Actions workflow.** Chaque exécution suit les mêmes étapes fixes : exécuter le lint, lancer les tests, puis rapporter le code de sortie. Aucun jugement n’est nécessaire.

</details>

**Tâche B :** Each morning, read all open issues, decide which ones look most urgent, and post a short triage summary.

- [ ] J’ai pris ma décision pour la tâche B

<details>
<summary>Afficher la réponse de la tâche B</summary>

**Agentic workflow.** L’agent lit les données d’issues en direct, exerce un jugement pour évaluer l’urgence et compose un résumé différent à chaque exécution selon ce qu’il trouve.

</details>

> [!TIP]
> Vous voulez aller plus loin ? [Side Quest: Agentic Workflows Deep Dive](side-quest-05-02-aw-deep-dive.md) couvre davantage d’exercices, des exemples de sortie, la structure à deux fichiers et des vérifications de concepts.

## Essayez : rédigez un task brief d’une phrase

Choisissez une tâche routinière que vous faites aujourd’hui et qui consiste à lire des données puis à rédiger un résumé, par exemple une note de standup quotidienne, un digest hebdomadaire de boîte de réception ou un tri de tickets de support. Rédigez un task brief d’une phrase pour qu’un agent l’exécute automatiquement.

Votre brief doit répondre à ces trois points : _quelles données l’agent doit-il lire, c’est-à-dire la source de données ; que doit-il publier une fois terminé, c’est-à-dire le format de sortie ; et quand ou à quelle fréquence doit-il s’exécuter, c’est-à-dire la cadence ?_

Exemple :

```
Each Monday morning, read all pull requests opened in the past week,
identify the three with the most review comments, and post a summary
as an issue with the title "Weekly PR Digest".
```

- [ ] J’ai rédigé un task brief pour une vraie tâche routinière
- [ ] Mon brief précise quelles données l’agent doit lire (source de données)
- [ ] Mon brief précise ce que l’agent doit publier une fois terminé (format de sortie)
- [ ] Mon brief précise quand ou à quelle fréquence l’agent doit s’exécuter (cadence)

> [!TIP]
> Vous avez du mal à trouver une tâche ? Parcourez le [gh-aw issue-ops pattern](https://github.github.com/gh-aw/patterns/issue-ops/) pour vous inspirer. Vous rédigerez une vraie version de votre brief à l’étape 7. **Toujours hésitant ?** Faites une pause ici et suivez [Side Quest: Agentic Workflows Deep Dive](side-quest-05-02-aw-deep-dive.md). Vous y trouverez davantage de pratique de classification, une vérification du vocabulaire et un exemple de paire `.md` / `.lock.yml` avant de continuer vers l’étape 6. **Vous avez une idée mais pas encore les mots ?** Le [gh-aw wizard](https://githubnext.github.io/gh-aw-wizard/) transforme quelques réponses sur votre idée en un prompt de génération que vous pourrez ensuite coller dans votre agent IA.

## :white_check_mark: Checkpoint

- [ ] Je peux décider si une tâche nécessite un agentic workflow ou un standard Actions workflow
- [ ] J’ai rédigé un task brief qui couvre les trois critères : source de données, format de sortie et cadence
- [ ] Je peux décrire les trois parties d’un agentic workflow : [trigger](https://github.github.com/gh-aw/reference/triggers/) → agent → safe output

<!-- journey: all -->

**Étape suivante :** [Installer l’extension CLI gh-aw](06-install-gh-aw.md)

<!-- /journey -->
