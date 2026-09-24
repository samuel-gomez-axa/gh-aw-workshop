<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Comprendre Les Phases D'une Session D'agent

> _Facultatif : faites ce détour pour obtenir une vue détaillée de ce qui se passe dans la session d'agent, puis revenez à [Affiner, tester et améliorer votre workflow](09-agentic-editing.md)._

## 📋 Avant De Commencer

- Vous avez une session d'agent GitHub Copilot active ou récemment terminée.
- Vous avez [`gh aw` installé et authentifié](06-install-gh-aw.md), terminé à Step 6.
- Vous comprenez l'objectif des [agentic workflows](https://github.github.com/gh-aw/introduction/overview/) à partir de [Que sont les Agentic Workflows ?](05-agentic-workflows-intro.md).

## 🎯 Ce Que Vous Allez Apprendre

Vous allez apprendre ce que fait chaque phase de la session d'agent, ce qu'il faut regarder dans le flux d'activité et comment réorienter la session si elle part dans la mauvaise direction.

## Les Cinq Phases

Après l'envoi du prompt de scénario, la session affiche un flux d'activité en direct. L'agent traverse cinq phases :

| Phase               | Ce que vous voyez                                                                                                                                                                                                                                                      | Ce qu'il faut vérifier                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lecture**         | L'agent récupère la référence `create.md` et lit les fichiers existants dans votre dépôt                                                                                                                                                                               | Confirmez que l'agent a bien récupéré le guide de référence et trouvé les fichiers de votre dépôt                                                       |
| **Planification**   | L'agent décide quelles clés de [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/), quelles [permissions](https://github.github.com/gh-aw/reference/permissions/) et quel [task brief](https://github.github.com/gh-aw/reference/markdown/) utiliser | La sortie de planification doit refléter le scénario voulu                                                                                              |
| **Rédaction**       | L'agent crée le fichier de workflow `.md` dans `.github/workflows/`                                                                                                                                                                                                    | Le fichier doit contenir un bloc [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) entre des fences `---` et un brief Markdown |
| **Compilation**     | L'agent exécute `gh aw compile --validate` et corrige les erreurs trouvées                                                                                                                                                                                             | Un message de réussite en vert indique que le `.lock.yml` a été généré sans erreur                                                                      |
| **Ouverture de PR** | L'agent valide les deux fichiers et ouvre une pull request                                                                                                                                                                                                             | La pull request doit lister deux fichiers modifiés : la source `.md` et le `.lock.yml`                                                                  |

> 🤔 **Prédisez :** Avant d'ouvrir le flux d'activité lors de votre prochain run, devinez quelle phase prendra le plus de temps. Développez ensuite les étapes individuelles pour vérifier : était-ce la phase Planification, la phase Rédaction ou la phase Compilation ?

## Réorienter La Session

La session se termine généralement en deux à cinq minutes. Si l'agent prend une mauvaise direction, vous pouvez le réorienter avec des prompts de suivi. Par exemple :

- Si l'agent construit le mauvais scénario : _"Stop — I want Scenario A (daily status report), not Scenario B."_
- Si l'agent saute la compilation : _"Please compile the workflow with `gh aw compile --validate` before opening the pull request."_
- Si l'agent ouvre une PR avant la présence du [lock file](https://github.github.com/gh-aw/reference/workflow-structure/#lock-file-header) : _"The lock file is missing. Please run `gh aw compile --validate` and add the generated `.lock.yml` to the pull request."_

## Développer Les Étapes Du Flux D'activité

Développez les étapes individuelles dans le flux d'activité pour voir exactement ce que l'agent a écrit, lu ou exécuté. C'est un bon moyen d'apprendre le format agentic workflow sans l'écrire vous-même. Recherchez :

- Le contenu complet du fichier `.md` que l'agent a écrit
- La commande `gh aw compile` qu'il a exécutée et les erreurs qu'il a corrigées
- Le message de commit et le nom de branche qu'il a utilisés

## Avancé : Agent Merge

L'application GitHub Copilot prend en charge [**agent merge**](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests#merging-a-pull-request) : activez-le depuis la vue pull request et l'agent corrigera les blocages éventuels puis fusionnera après validation des revues et checks requis. C'est un raccourci facultatif ; vous pouvez toujours fusionner manuellement dans le navigateur.

## Avancé : Compilation Continue Avec `--watch`

Si vous voulez une boucle de retour de compilation en direct pendant l'édition manuelle d'un workflow, installez la CLI `gh-aw`, voir [Step 6](06-install-gh-aw.md), et exécutez :

```bash
gh aw compile --watch
```

Chaque enregistrement déclenche une nouvelle compilation, ce qui vous donne un retour immédiat au lieu de découvrir les erreurs YAML plus tard. Consultez [Side Quest: Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md) pour un guide complet.

## ✅ Checkpoint

- [ ] Je peux nommer dans l'ordre les cinq phases d'une session d'agent
- [ ] Je sais à quoi ressemble une phase Compilation réussie, message de réussite en vert, `.lock.yml` généré
- [ ] Je sais comment réorienter la session si elle prend une mauvaise direction
- [ ] Je peux développer les étapes individuelles dans l'activity feed pour inspecter ce que l'agent a fait

---

<!-- journey: all -->

Revenez à [Affiner, tester et améliorer votre workflow](09-agentic-editing.md).

<!-- /journey -->
