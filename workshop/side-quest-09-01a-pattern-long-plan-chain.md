<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest 09-01a : Motif — longues chaînes `[plan]`

## 🎯 Ce que vous allez faire

Vous allez apprendre à repérer une boucle de planification et à réécrire le brief de votre workflow pour que l’agent commence par un premier appel explicite de [tool](https://github.github.com/gh-aw/reference/tools/).

## 📋 Avant de commencer

- Terminez [Side Quest : Diagnostiquer les motifs courants de sortie d’agent](side-quest-09-01-debug-output.md)

Lorsque vous voyez de nombreuses lignes `[plan]` consécutives et aucune ligne `[tool]`, l’agent réfléchit mais n’agit pas. Cela signifie généralement que votre brief laisse trop de place à l’interprétation. Un objectif comme "find the most important issue" peut vous sembler clair, mais il n’indique pas à l’agent quelles données récupérer d’abord ni comment classer les résultats.

Utilisez cette structure dans votre brief :

- Action de départ : "Call `github.list_issues` to list open issues."
- Règle de classement : "Sort by reactions and pick the top item."
- Règle de sortie : "Post one comment that includes the selected issue URL and reason."

Si vous avez besoin d’aide pour resserrer la formulation, demandez au skill `agentic-workflows` de réécrire votre brief ou exécutez [`gh aw compile --watch`](https://github.github.com/gh-aw/setup/cli/#compile).

## Exercice pratique

Lisez cet extrait et identifiez le motif avant d’ouvrir la réponse.

```text
🤔 [plan] Need the highest-impact issue
🤔 [plan] I should define impact first
🤔 [plan] Reactions might help
🤔 [plan] I need to compare issue engagement
🤔 [plan] I should list open issues eventually
```

<details>
<summary>Afficher la réponse</summary>

Motif : **Long `[plan]` chain without `[tool]` call**. Corrigez-le en ajoutant un premier appel explicite et une règle de classement.

</details>

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Je peux reconnaître une boucle de planification à partir des seules lignes du journal
- [ ] Je peux expliquer pourquoi des objectifs ambigus retardent l’utilisation des tools
- [ ] Je peux ajouter un premier appel de tool concret au brief de mon workflow
- [ ] Je peux définir une règle de classement claire que l’agent peut exécuter

<!-- /journey -->
