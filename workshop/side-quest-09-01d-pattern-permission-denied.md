<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest 09-01d : Motif — `permission denied`

## 🎯 Ce que vous allez faire

Vous allez faire correspondre les échecs de [permission](https://github.github.com/gh-aw/reference/permissions/) au bon mécanisme de contrôle : accès en lecture dans `permissions:` et autorisation d’écriture dans `safe-outputs:`.

## 📋 Avant de commencer

- Terminez [Side Quest : Diagnostiquer les motifs courants de sortie d’agent](side-quest-09-01-debug-output.md)

Quand un journal affiche `permission denied`, l’agent a tenté une opération en dehors des limites autorisées du workflow. Corrigez cela en identifiant si l’action refusée est une lecture ou une écriture :

- **Les actions de lecture** comme lister des issues ou récupérer des données de PR exigent la portée [`permissions:`](https://github.github.com/gh-aw/reference/permissions/) correspondante en `read`.
- **Les actions d’écriture** comme créer une issue ou ajouter un commentaire exigent une entrée autorisée dans [`safe-outputs:`](https://github.github.com/gh-aw/reference/safe-outputs/) avec un `max` adapté.

Ne traitez pas `permissions:` comme un interrupteur d’écriture. Dans ce cadre, l’intention d’écriture est pilotée par `safe-outputs:`. Gardez les deux contrôles minimaux : uniquement les portées et sorties dont votre workflow a réellement besoin.

Vérification rapide :

- Si l’appel en échec modifie l’état GitHub, inspectez d’abord `safe-outputs:`.
- Si l’appel ne fait que récupérer des données, inspectez d’abord `permissions:`.
- Si vous voulez un second avis, demandez au skill `agentic-workflows` de valider votre [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/).

## Exercice pratique

Identifiez le motif avant d’ouvrir la réponse.

```text
🔧 [tool] github.create_issue → {title: "Daily Status", body: "..."}
❌ [error] permission denied: safe-output create-issue not allowed
```

<details>
<summary>Afficher la réponse</summary>

Motif : **l’exécution échoue avec `permission denied`**. Il s’agit d’une action d’écriture ; vous avez donc besoin d’une entrée `safe-outputs` correspondante, ainsi que de `permissions` si des lectures supplémentaires sont nécessaires.

</details>

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Je peux classer les appels refusés en opérations de lecture ou d’écriture
- [ ] Je peux corriger un accès en lecture manquant dans `permissions:`
- [ ] Je peux corriger une autorisation d’écriture manquante dans `safe-outputs:`
- [ ] Je peux garder les portées et sorties autorisées au strict minimum nécessaire

<!-- /journey -->
