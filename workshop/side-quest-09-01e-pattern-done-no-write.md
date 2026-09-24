<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest 09-01e : Motif — « Done » mais rien n’est écrit

## 🎯 Ce que vous allez faire

Vous allez diagnostiquer des exécutions réussies qui ne produisent aucune écriture et resserrer les instructions pour que les écritures attendues se produisent de manière fiable.

## 📋 Avant de commencer

- Terminez [Side Quest : Diagnostiquer les motifs courants de sortie d’agent](side-quest-09-01-debug-output.md)

Une exécution peut se terminer avec `✅ [done]` sans créer de commentaire ni d’issue. Ce résultat est souvent correct : votre condition n’a peut-être pas été remplie. Le défi consiste à déterminer si ce saut était intentionnel ou causé par une logique ambiguë.

Commencez par trois vérifications :

1. Vérifiez si votre condition était réellement vraie à l’exécution.
2. Vérifiez qu’une action d’écriture correspondante existe dans [`safe-outputs:`](https://github.github.com/gh-aw/reference/safe-outputs/).
3. Vérifiez que vos instructions définissent quoi faire lorsqu’aucune condition ne correspond.

Pour éviter des absences d’écriture silencieuses, incluez un comportement de repli explicite tel que : "If no incidents are found, post one status comment saying no action is required." Cela fournit tout de même aux utilisateurs un indicateur d’état visible et prouve que le workflow a bien tourné.

Si vous ne savez pas comment formuler les conditions, demandez au skill `agentic-workflows` de réécrire le langage conditionnel, ou itérez avec `gh aw compile --watch`.

## Exercice pratique

Identifiez le motif avant d’ouvrir la réponse.

```text
🤔 [plan] Repository checks passed; no escalation criteria met
✅ [done] Task complete

### Summary
Reviewed signals and took no action.
```

<details>
<summary>Afficher la réponse</summary>

Motif : **le résumé indique "done" mais rien n’a été écrit**. Clarifiez les conditions d’écriture et ajoutez une règle d’écriture de repli lorsque vous avez besoin d’une sortie visible à chaque exécution.

</details>

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Je peux expliquer pourquoi une exécution réussie peut ne pas écrire
- [ ] Je peux vérifier si les conditions d’écriture ont réellement été remplies
- [ ] Je peux vérifier que `safe-outputs:` inclut bien l’action d’écriture nécessaire
- [ ] Je peux ajouter une règle de sortie de repli pour les scénarios sans action

<!-- /journey -->
