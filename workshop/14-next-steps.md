<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Et maintenant ? Continuez à explorer

> _Vous avez créé un vrai workflow IA planifié : voici comment continuer à progresser à partir d'ici._

## :dart: Ce que vous allez faire

Faites le point sur tout ce que vous avez appris, puis choisissez une direction pour ce que vous voulez construire ou explorer ensuite. Ce nœud sert de hub : il renvoie vers des approfondissements, des ressources communautaires et des idées pour vos propres projets.

## :clipboard: Avant de commencer

- Vous disposez d'un workflow daily-status planifié qui s'exécute dans GitHub Actions, créé dans [Refine, Test, and Improve Your Workflow](09-agentic-editing.md).

## Étapes

### Célébrez ce que vous avez livré

Vous êtes passé de zéro à un workflow entièrement automatisé, alimenté par l'IA, qui :

- S'exécute selon une [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule) dans GitHub Actions
- Utilise gh-aw pour appeler un modèle IA à partir d'un simple fichier YAML
- Publie un résumé quotidien sans aucune intervention manuelle

C'est un vrai workflow capable de fonctionner en production.

### Prenez du recul et planifiez

Répondez à chaque question, dans vos notes ou dans une nouvelle issue GitHub de votre dépôt d'exercice, puis cochez la case :

- [ ] Quelle a été la partie la plus difficile de cet atelier, et pourquoi ?
- [ ] Comment modifieriez-vous le prompt de votre workflow daily-status pour obtenir un meilleur résultat ?
- [ ] Quel est le prochain workflow que vous voulez créer, et de quelle source de données aurait-il besoin ?

### Revisitez ce que vous avez appris

Voici un rappel rapide des concepts que vous avez abordés. Le schéma ci-dessous montre comment toutes les pièces se connectent dans le workflow que vous venez de créer.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/14-workflow-architecture-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/14-workflow-architecture-light.svg">
   <img alt="Architecture d'un workflow agentique : un déclencheur schedule passe par GitHub Actions et gh-aw vers un modèle IA, qui produit une safe output" src="images/14-workflow-architecture-light.svg">
</picture>

| Concept                                                                         | Où vous l'avez utilisé                                                  |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [GitHub Actions triggers](https://github.github.com/gh-aw/reference/triggers/)  | `on: schedule` et `workflow_dispatch`                                   |
| [gh-aw workflow syntax](https://github.github.com/gh-aw/introduction/overview/) | Chaque fichier de workflow `.md` que vous avez écrit                    |
| Appels de modèle IA                                                             | Le corps Markdown (instructions d'agent) de votre workflow daily-status |
| Schedules en langage naturel                                                    | `schedule: daily on weekdays`                                           |
| Débogage itératif                                                               | Exécuter, lire la sortie, ajuster, recommencer                          |

---

### Allez plus loin

> [!TIP]
> Quand vous commencerez votre prochain workflow, utilisez le [gh-aw wizard](https://githubnext.github.io/gh-aw-wizard/) pour générer le prompt : répondez à quelques questions sur le déclencheur, les données et la sortie, puis collez le prompt généré dans votre agent IA.

- :arrow_right: [Rendez votre workflow plus malin avec une logique conditionnelle](15-conditional-logic.md) - ajoutez des conditions pour que votre workflow ne s'exécute que lorsqu'il y a une activité utile à signaler.
- :arrow_right: [Connectez une source de données en direct à votre workflow](16-connect-data-source.md) - récupérez des données de dépôt en direct et transmettez-les à votre prompt IA comme contexte du workflow.
- :arrow_right: [Donnez plus d'outils à votre agent avec MCP](17-add-mcp-tools.md) - connectez le serveur GitHub MCP pour que votre agent puisse lire des données de dépôt en direct pendant l'exécution.
- :arrow_right: [Partagez et réutilisez vos workflows agentiques](18-share-and-reuse.md) - publiez votre workflow dans un catalogue afin que d'autres puissent l'installer en une seule commande.
- :arrow_right: [Faites en sorte que votre workflow se souvienne d'une exécution à l'autre](20-persistent-memory.md) - ajoutez une [cache-backed memory](https://github.github.com/gh-aw/reference/cache-memory/) afin que votre workflow ignore les éléments qu'il a déjà signalés.
- :arrow_right: [Découpez les workflows complexes avec des Inline Sub-Agents](21-inline-sub-agents.md) - utilisez le modèle planner-worker pour garder votre prompt principal concis et réduire le coût en tokens.
- :arrow_right: [Rendez vos workflows résilients face aux erreurs](22-error-handling-and-resilience.md) - ajoutez des briefs défensifs, des timeouts et des sorties de secours afin que les exécutions sans supervision restent fiables.
- :arrow_right: [Testez vos idées de prompt avec des expériences A/B](23-ab-experiments.md) - comparez des variantes de prompt d'une exécution à l'autre et laissez les données décider laquelle conserver.
- :arrow_right: [Exécutez votre workflow agentique sur un self-hosted runner](24-self-hosted-runners.md) - ciblez la flotte de runners de votre organisation plutôt que des machines GitHub-hosted (équipes enterprise).
- :arrow_right: [Auditez et surveillez vos workflows agentiques](25-audit-and-observability.md) - consultez les [artifacts](https://github.github.com/gh-aw/reference/artifacts/) d'exécution, comprenez l'usage des tokens et construisez une piste d'audit pour la conformité enterprise.
- :arrow_right: [Gérez les coûts et budgets d'AI Credits](26-manage-costs-and-budgets.md) - mesurez la consommation d'AIC, fixez des limites de dépense et gardez vos workflows dans le budget (équipes enterprise).

<!-- journey: all -->

## :white_check_mark: Checkpoint

- [ ] Votre workflow planifié a terminé au moins une exécution automatisée avec succès
- [ ] Vous pouvez décrire, avec des mots simples, ce que sont les workflows agentiques et pourquoi ils sont utiles
- [ ] Vous avez au moins une idée pour le prochain workflow que vous voulez créer
- [ ] Vous avez rédigé un brief de deux phrases pour votre prochain workflow agentique
- [ ] Vous savez où trouver la documentation gh-aw quand vous en avez besoin

Vous êtes arrivé au bout du parcours des workflows planifiés, mais il reste encore une étape sur le parcours principal avant d'entrer dans les sujets avancés. Revenez explorer ces approfondissements quand vous serez prêt.

<!-- /journey -->

<!-- journey: all -->

**Suite :** [Créez votre premier workflow déclenché par événement : relecteur automatique de PR](14b-pr-reviewer-workflow.md)

<!-- /journey -->
