<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Diagnostiquer les motifs courants de sortie d’agent

> _Facultatif : utilisez cette side quest lorsqu’une exécution se comporte de façon inattendue, puis revenez à [Reading Workflow Output](08b-interpret-your-run.md)._

## :dart: Ce que vous allez faire

Vous allez diagnostiquer cinq motifs de sortie courants, un par un. Chaque micro-étape comprend une courte explication, un extrait de journal réaliste et un exercice d’identification avant révélation.

## :clipboard: Avant de commencer

- Terminez [Lire la sortie du workflow](08b-interpret-your-run.md)

## Index du labo de motifs

| Motif                                                                                  | Ce que vous apprenez                                                                                                                                                                           | Micro-étape                                                |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Longue chaîne `[plan]`                                                                 | Comment transformer des boucles de planification en appels concrets de [tool](https://github.github.com/gh-aw/reference/tools/)                                                                | [09-01a](side-quest-09-01a-pattern-long-plan-chain.md)     |
| Résultats de tool vides                                                                | Comment distinguer les problèmes de [permission](https://github.github.com/gh-aw/reference/permissions/) des problèmes de filtre                                                               | [09-01b](side-quest-09-01b-pattern-empty-results.md)       |
| [Safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) `limit reached` | Comment choisir entre augmenter `max` et resserrer les consignes                                                                                                                               | [09-01c](side-quest-09-01c-pattern-safe-output-blocked.md) |
| `permission denied`                                                                    | Comment faire correspondre les échecs à [`permissions`](https://github.github.com/gh-aw/reference/permissions/) ou à [`safe-outputs`](https://github.github.com/gh-aw/reference/safe-outputs/) | [09-01d](side-quest-09-01d-pattern-permission-denied.md)   |
| « Done » sans écriture                                                                 | Comment clarifier les conditions d’écriture et le comportement de repli                                                                                                                        | [09-01e](side-quest-09-01e-pattern-done-no-write.md)       |

Besoin d’un flux de triage réutilisable après ces exercices sur les motifs ? Ouvrez la [checklist de débogage](side-quest-09-01f-debugging-checklist.md).

<!-- journey: all -->

## :white_check_mark: Checkpoint

- [ ] Je peux choisir la bonne micro-étape à partir du tableau des motifs
- [ ] Je peux utiliser le format d’exercice pour identifier chaque motif avant de vérifier la réponse
- [ ] Je peux ouvrir la page checklist lorsque j’ai besoin d’un triage complet d’exécution
- [ ] Je sais qu’il faut revenir à [l’étape 9](08b-interpret-your-run.md) après cette side quest

<!-- /journey -->
