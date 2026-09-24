<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest 09-01b : Motif — données `[result]` vides

## :dart: Ce que vous allez faire

Vous allez diagnostiquer des réponses vides de [tool](https://github.github.com/gh-aw/reference/tools/) et décider si la cause racine est une portée de lecture manquante, un filtrage excessif ou des données réellement absentes dans le dépôt.

## :clipboard: Avant de commencer

- Terminez [Side Quest : Diagnostiquer les motifs courants de sortie d’agent](side-quest-09-01-debug-output.md)

Un résultat vide ne signifie pas toujours un échec. L’appel peut réussir mais renvoyer zéro enregistrement. Commencez par vérifier si votre tool a besoin d’une portée de lecture absente de `permissions:`. Vérifiez ensuite si votre requête est trop étroite. Par exemple, `labels: bug` ne renvoie rien si aucune issue n’a actuellement ce label. Votre objectif est d’isoler une variable à la fois pour voir si le problème vient de l’autorisation, de la logique de requête ou de l’état des données.

Utilisez cette séquence :

1. Vérifiez la portée de lecture requise dans le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) du workflow (par exemple `issues: read`).
2. Relancez avec des filtres plus larges, ou sans filtres optionnels.
3. Comparez avec la réalité du dépôt dans GitHub UI.

Si l’appel renvoie encore un résultat vide alors que les données existent, demandez au skill `agentic-workflows` de relire vos arguments de tool, ou laissez [`gh aw compile --watch`](https://github.github.com/gh-aw/setup/cli/#compile) tourner pendant que vous ajustez les entrées.

## Exercice pratique

Identifiez le motif avant d’ouvrir la réponse.

```text
🔧 [tool] github.list_issues → {state: open, labels: "bug"}
📥 [result] 0 issues returned
🤔 [plan] No matching records; nothing to post
✅ [done] Task complete
```

<details>
<summary>Afficher la réponse</summary>

Motif : **l’appel `[tool]` renvoie des résultats vides**. Vérifiez les [permissions](https://github.github.com/gh-aw/reference/permissions/) de lecture requises et élargissez les filtres pour confirmer la disponibilité des données.

</details>

<!-- journey: all -->

## :white_check_mark: Checkpoint

- [ ] Je peux distinguer un résultat vide d’un appel de tool en échec
- [ ] Je peux vérifier les portées de lecture requises dans `permissions:`
- [ ] Je peux tester une requête plus large pour isoler les problèmes de filtre
- [ ] Je peux vérifier si les données correspondantes existent réellement dans le dépôt

<!-- /journey -->
