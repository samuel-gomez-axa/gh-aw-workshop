<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest 09-01f : Checklist de débogage

## 🎯 Ce que vous allez faire

Vous allez appliquer un flux de triage reproductible en sept étapes chaque fois qu’une exécution produit une sortie inattendue.

## 📋 Avant de commencer

- Terminez [Side Quest : Diagnostiquer les motifs courants de sortie d’agent](side-quest-09-01-debug-output.md)

## Checklist

1. Ouvrez le journal en direct dans **Actions** et commencez par repérer les lignes `[error]`.
2. Vérifiez la densité de `[plan]`. Plus de quatre lignes de plan consécutives sans appel de [tool](https://github.github.com/gh-aw/reference/tools/) signifie généralement que votre brief est sous-spécifié.
3. Inspectez les lignes `[tool]` et `[result]` pour confirmer que les données attendues sont bien renvoyées.
4. Recherchez des erreurs [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) de type `limit reached`, comme `E002: add-comment limit reached — 1 of 1 already used this run`, puis décidez s’il faut augmenter `max` ou resserrer la consigne "post once".
5. Lisez le résumé d’exécution et comparez-le au comportement d’écriture attendu.
6. Ouvrez l’[enregistrement safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) dans les détails du job et considérez-le comme la source de vérité pour les écritures.
7. Si le comportement reste flou, demandez au skill `agentic-workflows` de diagnostiquer votre workflow avec un extrait collé.

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Je peux suivre cette checklist dans l’ordre sans sauter d’étapes
- [ ] Je sais où trouver à la fois les journaux en direct et les enregistrements [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/)
- [ ] Je peux décider si la cause racine vient du prompt, des données, des [permissions](https://github.github.com/gh-aw/reference/permissions/) ou des limites de sortie
- [ ] Je peux rassembler un extrait minimal de journal à partager pour un diagnostic plus approfondi

<!-- /journey -->
