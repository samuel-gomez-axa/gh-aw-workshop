<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Observer Et Réduire Les Coûts En Tokens

> _Utilisez cette activité lorsque vous voulez passer de « mon workflow coûte quelque chose » à « je sais pourquoi il coûte autant, et je peux le réduire intentionnellement »._

## 📋 Avant De Commencer

- Vous avez terminé [Build Your First Event-Driven Workflow: PR Auto-Reviewer](14b-pr-reviewer-workflow.md).
- Vous avez un workflow de revue de PR fonctionnel, ou un autre workflow avec au moins 5 runs terminés pour pouvoir comparer l'usage avant/après.
- Si vous voulez davantage de contexte sur l'[AIC](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic), les audit artifacts ou les garde-fous de budget, poursuivez plus tard avec [Audit and Monitor Your Agentic Workflows](25-audit-and-observability.md) et [Manage Costs and AI Credit Budgets](26-manage-costs-and-budgets.md).

## Établissez Une Référence De Coût

Commencez par mesurer votre pattern actuel avant de modifier quoi que ce soit :

```bash
gh aw logs <your-workflow-id> --count 5
```

Relevez trois éléments sur les cinq derniers runs :

| Signal     | Ce qu'il faut relever        | Pourquoi c'est utile                          |
| ---------- | ---------------------------- | --------------------------------------------- |
| AIC        | Moyenne et run le plus élevé | Montre votre référence et le pire cas         |
| Conclusion | Succès ou échec              | Même les runs en échec consomment des crédits |
| Model      | Le modèle exécuté            | Aide à expliquer les différences entre runs   |

Si un run est nettement plus élevé que les autres, auditez-le :

```bash
gh aw audit <run-id> --parse
```

> Consultez la [gh aw audit reference](https://github.github.com/gh-aw/reference/audit/#gh-aw-audit) pour toutes les options.

Examinez ensuite :

- `log.md` pour repérer les longs tours d'agent ou les raisonnements répétés
- `agent_usage.json` pour les totaux de tokens
- `mcp-logs/` pour les appels d'outils répétés
- `firewall.md` pour les domaines bloqués qui ont pu provoquer des retries ou des comportements de repli

## Associez Les Symptômes De Coût À Leurs Causes Probables

Utilisez votre référence pour décider quoi changer en premier :

| Si vous observez ceci                                    | Vérifiez cette cause                                              | Première correction à essayer                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| L'AIC augmente après l'ajout de plus de données du dépôt | Trop de contexte brut dans le brief                               | Préfiltrez les données dans une étape déterministe avant de les passer à l'agent                    |
| Un run est bien plus élevé que les autres                | L'agent a exploré trop largement ou a relancé des appels d'outils | Resserrez le brief et retirez les outils dont la tâche n'a pas besoin                               |
| Chaque run coûte à peu près pareil et paraît élevé       | Le brief est plus long que nécessaire                             | Raccourcissez les instructions, exemples et boilerplate répété                                      |
| Les coûts montent après l'ajout d'un nouveau schedule    | Le workflow s'exécute plus souvent que sa valeur produite         | Réduisez la fréquence du schedule ou ajoutez des conditions pour que les no-op runs évitent l'agent |
| Le workflow reparle sans cesse des mêmes éléments        | L'agent retraite des données inchangées à chaque run              | Ajoutez de la [persistent memory](20-persistent-memory.md) ou une étape de diff déterministe        |

## Utilisez Les Techniques De Réduction Les Plus Rentables

Appliquez un changement à la fois afin de voir quelle technique a aidé.

### Passez moins de contexte au modèle

Le token le moins cher est celui que vous n'envoyez jamais.

- Remplacez les dumps bruts d'issues ou de PR par une étape de résumé déterministe.
- Ne passez que les champs dont l'agent a besoin.
- Limitez les fenêtres d'historique lorsqu'un backlog complet n'est pas nécessaire.

### Rendez Le Brief Plus Spécifique

Les prompts vagues coûtent souvent plus cher parce que l'agent explore davantage, recommence ou écrit trop.

- Indiquez la forme exacte de sortie voulue.
- Dites à l'agent ce qu'il ne doit pas faire.
- Retirez les instructions en double et les longs exemples une fois le pattern compris.

### Réduisez Les Runs Inutiles

Si le workflow n'a pas besoin de s'exécuter, le run le moins cher est celui à zéro AIC.

- Réduisez la fréquence du schedule.
- Ajoutez des conditions `if:` autour des étapes de préparation afin de n'appeler l'agent que lorsque de nouvelles données existent.
- Utilisez [`workflow_dispatch`](https://github.github.com/gh-aw/reference/triggers/#dispatch-triggers-workflowdispatch) pour une analyse manuelle occasionnelle plutôt qu'un [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule) fréquent.

### Évitez De Retraiter Un Travail Inchangé

Un travail répété est un coût répété.

- Utilisez [cache-memory or repo-memory](20-persistent-memory.md) pour mémoriser ce qui a déjà été traité.
- Stockez des identifiants, timestamps ou hashes afin que l'agent puisse ignorer les éléments déjà vus.
- Combinez la mémoire avec un préfiltrage déterministe pour obtenir les gains les plus importants.

### Gardez Un Usage Des Outils Très Ciblé

Des appels d'outils supplémentaires peuvent accroître indirectement le coût en allongeant le tour et en ajoutant du raisonnement.

- N'exposez que les outils dont le workflow a besoin.
- Préférez une requête [MCP](https://github.github.com/gh-aw/reference/mcp-gateway/) ciblée à plusieurs requêtes larges.
- Quand c'est possible, récupérez des données structurées dans une étape déterministe et laissez l'agent les interpréter.

### Comparez La Qualité Avant De Choisir Une Configuration Plus Chère

Un coût plus élevé n'est justifié que s'il améliore suffisamment le résultat pour que cela compte.

- Comparez des variantes de prompt avec des [A/B experiments](23-ab-experiments.md).
- Si votre organisation prend en charge plusieurs modèles, comparez une option moins coûteuse à votre workflow actuel avant de standardiser l'option plus chère.

## Ajoutez Des Garde-Fous Stricts

Après avoir réduit le coût, gardez-le bas :

- Utilisez [`max-ai-credits`](https://github.github.com/gh-aw/reference/triggers/#ai-credits-guardrail-max-ai-credits) pour plafonner un run unique.
- Utilisez [`max-daily-ai-credits`](https://github.github.com/gh-aw/reference/triggers/#daily-per-workflow-ai-credits-guardrail-max-daily-ai-credits) pour plafonner l'usage sur 24 heures.
- Utilisez [`timeout-minutes`](https://github.github.com/gh-aw/reference/frontmatter/) pour arrêter les runs anormalement longs.
- Utilisez [gh aw forecast](side-quest-26-01-forecast-costs.md) pour dimensionner les garde-fous à partir d'un historique réel plutôt qu'au doigt mouillé.

> Consultez [Cost Management](https://github.github.com/gh-aw/reference/cost-management/) pour la liste complète des commandes de supervision et des options de garde-fous.

## Essayez Vous-Même

### Exécutez Un Cycle D'optimisation

1. Choisissez votre workflow de revue de PR, ou un autre workflow, et relevez l'AIC moyen des cinq derniers runs.
2. Choisissez une technique sur cette page.
3. Faites exactement une modification à votre workflow.
4. Compilez votre workflow :

```bash
gh aw compile
```

1. Exécutez le workflow au moins deux fois de plus.
2. Comparez la nouvelle moyenne d'AIC à votre référence.
3. Ne gardez la modification que si la qualité reste au niveau attendu.

Utilisez ce tableau de notes rapide :

| Moyenne AIC de référence | Changement effectué | Nouvelle moyenne AIC | La qualité reste acceptable ? |
| ------------------------ | ------------------- | -------------------- | ----------------------------- |
|                          |                     |                      |                               |

### Demandez À Un Agent De Proposer La Prochaine Optimisation

Ouvrez votre agent IA dans votre dépôt d'entraînement et envoyez :

```prompt
/agentic-workflows Review my workflow brief and this audit summary.
Identify the single change most likely to reduce AIC without hurting output quality.
Explain why that change is the best next step, then apply it and run gh aw compile.
```

Collez sous le prompt l'extrait pertinent de votre sortie `gh aw audit --parse`.

## ✅ Checkpoint

- [ ] Vous avez collecté une référence AIC sur cinq runs pour un workflow
- [ ] Vous avez audité au moins un run inhabituellement coûteux
- [ ] Vous avez identifié si votre principal facteur de coût était la taille du contexte, la fréquence d'exécution, le travail répété ou l'usage des outils
- [ ] Vous avez appliqué exactement une technique d'optimisation puis relancé le workflow
- [ ] Vous avez comparé la nouvelle moyenne d'AIC à votre référence
- [ ] Vous avez ajouté ou confirmé `max-ai-credits`, `max-daily-ai-credits` ou `timeout-minutes`
- [ ] Vous pouvez nommer la prochaine optimisation que vous testeriez si le coût reste trop élevé

<!-- journey: all -->

Revenez à [Créer votre premier workflow événementiel : PR Auto-Reviewer](14b-pr-reviewer-workflow.md).

<!-- /journey -->
