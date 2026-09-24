<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest 09-01c : Motif — [Safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) `limit reached`

## 🎯 Ce que vous allez faire

Vous allez apprendre à interpréter des écritures bloquées et à choisir entre augmenter les sorties autorisées ou contraindre le comportement de l’agent.

## 📋 Avant de commencer

- Terminez [Side Quest : Diagnostiquer les motifs courants de sortie d’agent](side-quest-09-01-debug-output.md)

Une erreur safe-output comme `E002: add-comment limit reached — 1 of 1 already used this run` signifie que l’agent a tenté une écriture après avoir atteint la limite `max` configurée pour ce type de sortie. L’exécution peut tout de même se terminer avec succès, mais les écritures bloquées ne sont pas exécutées. La suite dépend de votre intention :

- Si plusieurs écritures sont attendues, par exemple un commentaire par service en échec, augmentez `max`.
- Si une seule écriture doit avoir lieu, gardez `max` bas et resserrez vos consignes pour éviter les publications en double.

Traitez `max` comme une limite de sécurité, pas comme un réglage de confort. Une limite basse réduit le spam accidentel si les consignes sont interprétées trop largement.

Lorsque vous changez le comportement, préférez des consignes précises de workflow telles que "Post one comment per run. If a comment already exists today, update context in [memory](https://github.github.com/gh-aw/patterns/memory-ops/) and skip writing."

Si vous avez besoin d’aide sur la formulation, demandez au skill `agentic-workflows` ou itérez rapidement avec [`gh aw compile --watch`](https://github.github.com/gh-aw/setup/cli/#compile).

## Exercice pratique

Identifiez le motif avant d’ouvrir la réponse.

```text
🔧 [tool] github.add_comment → {issue_number: 4, body: "..."}
❌ [error] E002: add-comment limit reached — 1 of 1 already used this run
🤔 [plan] Additional comments were prepared but blocked
✅ [done] Task complete (1 output blocked)
```

<details>
<summary>Afficher la réponse</summary>

Motif : **safe-output `limit reached`**. Déterminez si la deuxième écriture est légitime (`max` trop bas) ou non voulue (consignes trop vagues).

</details>

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Je peux expliquer ce que signifie `BLOCKED` dans les journaux safe-output
- [ ] Je peux décider quand augmenter `max` est approprié
- [ ] Je peux ajouter une consigne qui évite les écritures dupliquées
- [ ] Je peux garder volontairement des limites safe-output petites pour des raisons de sécurité

<!-- /journey -->
