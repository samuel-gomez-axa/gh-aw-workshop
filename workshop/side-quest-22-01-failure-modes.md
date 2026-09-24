<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Quête annexe : reconnaître les modes d’échec courants des agentic workflows

> _Avant de pouvoir corriger une exécution en panne, vous devez savoir nommer le problème. Cette introduction vous en donne quatre._

## 🎯 Ce que vous allez faire

Vous apprendrez les quatre façons les plus courantes dont les agentic workflows échouent en production, verrez un exemple détaillé de chacune, et vous exercerez à associer chaque type d’échec à son effet. À la fin, vous pourrez regarder un log d’exécution et nommer le mode d’échec en un mot avant de commencer le débogage.

## 📋 Avant de commencer

- Vous avez un workflow planifié fonctionnel, voir [Affinez, testez et améliorez votre workflow](09-agentic-editing.md).
- Vous commencez, ou avez déjà commencé, [Rendez vos workflows résilients face aux échecs](22-error-handling-and-resilience.md), qui utilise ce vocabulaire.

## Étapes

### Les quatre modes d’échec

Les agentic workflows peuvent échouer pour plusieurs raisons :

| Type d’échec     | Exemple                                                              | Effet                                                          |
| ---------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Empty data**   | Aucune issue ouverte à résumer                                       | L’agent produit un rapport vague ou vide                       |
| **Tool error**   | Une limite de taux de l’API GitHub est atteinte en cours d’exécution | L’agent s’arrête au milieu de la tâche sans produire de sortie |
| **Timeout**      | Un raisonnement complexe prend trop de temps                         | Le job de workflow est annulé par Actions                      |
| **Prompt drift** | Les instructions sont ambiguës                                       | L’agent emprunte un chemin de code inattendu                   |

Reconnaître ces modèles vous aide à écrire des instructions qui restent sur la bonne voie. La plupart des bugs de workflow relèvent de l’un de ces quatre cas, pas de quelque chose d’exotique.

Le schéma ci-dessous montre comment ces modes d’échec se rattachent à trois mitigations : un brief défensif, un réglage `timeout-minutes` et un [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) de secours.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/22-resilience-techniques-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/22-resilience-techniques-light.svg">
  <img alt="Quatre modes d’échec, prompt drift, timeout, tool error et empty data, chacun rattaché à l’une de trois mitigations, defensive brief, timeout-minutes et fallback safe-output, qui ensemble produisent un workflow exécuté de manière fiable" src="images/22-resilience-techniques-light.svg">
</picture>

### Entraînement : associer l’échec à la mitigation

Avant de vérifier votre réponse, décidez quelle mitigation, defensive brief, `timeout-minutes` ou fallback safe-output, répond le mieux à chaque scénario :

1. Une exécution prend régulièrement 18 minutes pour terminer le raisonnement sur un gros diff, et Actions l’annule.
2. Une exécution se termine proprement mais n’appelle jamais un tool de safe-output, parce que le dépôt n’avait eu aucune activité ce jour-là.
3. Le résumé d’une exécution est techniquement correct mais ignore l’instruction de signaler les blockers, parce que le brief ne définit jamais ce qu’est un "blocker".

<details>
<summary>Afficher les réponses</summary>

1. **Timeout.** Définissez `timeout-minutes` sur une valeur qui donne plus de marge à l’agent, ou réduisez la taille des entrées sur lesquelles il raisonne.
2. **Empty data.** Ajoutez au brief une instruction défensive demandant à l’agent de rédiger un rapport "no activity" et d’appeler quand même la safe output, même lorsqu’il n’y a rien de nouveau.
3. **Prompt drift.** Le brief était ambigu sur ce qui compte comme blocker. Resserrez l’instruction avec une définition concrète ou un exemple.

</details>

### Repérez ce schéma dans vos propres exécutions

Ouvrez une exécution récente de votre propre workflow dans l’onglet **Actions** et parcourez rapidement le log. Demandez-vous si quelque chose correspond à l’un des quatre types d’échec ci-dessus, même si l’exécution a techniquement réussi. Une exécution peut "réussir", avec une coche verte, et présenter quand même du prompt drift ou produire une sortie empty-data.

## ✅ Checkpoint

- [ ] Vous pouvez citer les quatre modes d’échec courants des agentic workflows sans regarder le tableau
- [ ] Vous avez associé chacun des trois scénarios d’exercice à la mitigation correcte
- [ ] Vous avez examiné une exécution de votre propre workflow et identifié si l’un de ces modes d’échec s’y appliquait

**Retour à l’aventure principale :** [Rendez vos workflows résilients face aux échecs](22-error-handling-and-resilience.md)
