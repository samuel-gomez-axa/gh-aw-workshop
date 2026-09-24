<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Comprendre Le Dispatcher De La Skill `agentic-workflows`

> _Une skill, trois usages : savoir quelle trigger phrase utiliser vous évite de réécrire des prompts depuis zéro à chaque fois._

## 🎯 Ce Que Vous Allez Faire

Découvrez comment la skill Copilot `agentic-workflows` achemine votre demande en anglais courant vers le bon prompt d'édition, de débogage ou d'optimisation, et entraînez-vous à choisir la bonne trigger phrase selon la situation.

## 📋 Avant De Commencer

- Vous avez `.github/skills/agentic-workflows/` dans votre dépôt d'entraînement, créé pendant [Step 7](07-your-first-workflow.md).
- Vous pouvez ouvrir Copilot CLI avec `gh copilot` dans votre terminal local.

## Étapes

### Comprendre Le Modèle De Dispatcher

La skill `agentic-workflows` agit comme un dispatcher : lorsque vous décrivez une tâche de workflow en anglais courant et mentionnez la skill par son nom, elle dirige votre demande vers le bon prompt d'édition, de débogage ou d'optimisation et effectue les changements directement dans votre dépôt.

Vous l'appelez dans Copilot CLI depuis votre terminal local :

```bash
gh copilot
```

Envoyez ensuite :

```prompt
/agentic-workflows [your request here]
```

### Découvrir Les Trois Types De Tâches

La skill reconnaît trois types de tâches principaux pour la maintenance quotidienne des workflows :

| Type de tâche | Quand l'utiliser                                                                                                 | Exemple de trigger phrase                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Edit**      | Améliorer le brief de l'agent ou le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)        | "update the workflow to …"                                                                                     |
| **Debug**     | Examiner une sortie inattendue ou un run en échec                                                                | "debug the workflow — it ran but …"                                                                            |
| **Optimize**  | Réduire l'usage de tokens ou resserrer les [permissions](https://github.github.com/gh-aw/reference/permissions/) | "optimize the workflow to reduce [AI Credit](https://github.github.com/gh-aw/reference/cost-management/) cost" |

Si vous n'avez pas de session Copilot disponible, vous pouvez quand même effectuer chacun de ces changements manuellement : ouvrez le fichier de workflow, faites l'édition ciblée, puis lancez `gh aw compile` avant de valider.

### S'entraîner À Associer Une Demande À Un Type De Tâche

Pour chaque scénario ci-dessous, décidez quel type de tâche, Edit, Debug ou Optimize, convient le mieux avant d'afficher la réponse.

**Scénario A :** Le commentaire quotidien de votre workflow est trop générique et vous voulez qu'il explique _pourquoi_ quelque chose compte, pas seulement _ce_ qui s'est passé.

<details>
<summary>Afficher la réponse</summary>

**Edit.** Vous améliorez le contenu du brief de tâche, vous ne corrigez pas un échec et vous ne réduisez pas un coût.

</details>

**Scénario B :** Votre dernier run s'est terminé en vert, mais aucun commentaire ni aucune issue n'est apparu dans le dépôt.

<details>
<summary>Afficher la réponse</summary>

**Debug.** Quelque chose s'est mal passé entre "the agent decided to write" et "the write actually happened" : c'est une investigation, pas une édition de contenu.

</details>

**Scénario C :** Votre workflow fonctionne correctement, mais vous avez remarqué qu'il consomme plus d'AI Credits que vous ne le souhaiteriez pour un workflow quotidien.

<details>
<summary>Afficher la réponse</summary>

**Optimize.** Le comportement est correct ; vous l'ajustez pour réduire le coût en tokens.

</details>

### Essayez D'écrire Votre Propre Trigger Phrase

Choisissez une observation réelle à propos de votre propre workflow, à partir d'un run récent, et rédigez une trigger phrase en une phrase à l'aide du tableau ci-dessus. Envoyez-la à la skill dans Copilot CLI et examinez le diff proposé avant de l'accepter.

## ✅ Checkpoint

- [ ] Vous pouvez expliquer en une phrase ce que fait le dispatcher de la skill `agentic-workflows`
- [ ] Vous pouvez nommer les trois types de tâches et une trigger phrase pour chacun
- [ ] Vous avez correctement associé les trois scénarios d'entraînement à un type de tâche
- [ ] Vous avez envoyé une demande réelle à la skill et examiné le diff qu'elle propose

**Retour à l'aventure principale :** [Refine, Test, and Improve Your Workflow](09-agentic-editing.md)
