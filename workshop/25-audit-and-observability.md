<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Auditez et surveillez vos workflows agentiques

> _Savoir ce que votre agent a fait, et pouvoir le prouver, c'est ce qui transforme une automatisation utile en automatisation digne de confiance._

## :dart: Ce que vous allez faire

Utilisez `gh aw logs` et `gh aw audit` pour examiner les [artifacts](https://github.github.com/gh-aw/reference/artifacts/) integres que produit chaque execution de workflow agentique, comprendre l'[usage des tokens](https://github.github.com/gh-aw/reference/cost-management/#monitoring-costs-with-gh-aw-logs) et deboguer les comportements inattendus. A la fin, vous saurez ou regarder lorsqu'une execution se comporte de facon anormale ou lorsqu'une revue de conformite demande ce que l'agent a fait.

## :clipboard: Avant de commencer

- Votre workflow s'execute correctement (voir [Refine, Test, and Improve Your Workflow](09-agentic-editing.md)).
- `gh aw` est installe et authentifie (voir [Install the gh-aw CLI Extension](06-install-gh-aw.md)).

## Etapes

Le schema ci-dessous montre comment les artifacts circulent depuis une execution de workflow, a travers les deux commandes d'audit, jusqu'a leurs sorties.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/25-audit-lifecycle-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/25-audit-lifecycle-light.svg">
   <img alt="Cycle de vie des artifacts d'audit : une execution de workflow produit des artifacts que gh aw logs et gh aw audit exploitent pour generer des resumes et des rapports de conformite" src="images/25-audit-lifecycle-light.svg">
</picture>

### Examiner les executions recentes avec [gh aw logs](https://github.github.com/gh-aw/reference/audit/#gh-aw-logs---format)

`gh aw logs` telecharge les artifacts des executions recentes de votre workflow et affiche un tableau de synthese montrant la duree, l'usage des tokens et le cout en [AI Credits (AIC)](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic).

Lancez-la depuis votre depot :

```bash
gh aw logs <your-workflow-id>
```

Remplacez `<your-workflow-id>` par le nom de base de votre fichier de workflow, par exemple `daily-status` pour `daily-status.md`.

Le tableau de synthese montre une ligne par execution. Colonnes importantes :

| Colonne    | Ce qu'elle vous indique                    |
| ---------- | ------------------------------------------ |
| AIC        | Total des AI Credits consommes par l'agent |
| Model      | Le modele IA qui a execute l'agent         |
| Conclusion | Si l'execution a reussi                    |

Pour telecharger tous les artifacts en vue d'une inspection plus poussee, ajoutez `--artifacts all` :

```bash
gh aw logs <your-workflow-id> --artifacts all
```

Les fichiers telecharges arrivent par defaut dans `.github/aw/logs/<run-id>/`.

### Auditer une execution precise avec [gh aw audit](https://github.github.com/gh-aw/reference/audit/#gh-aw-audit)

Lorsque vous avez besoin d'examiner plus en profondeur une execution, pour du debogage ou comme preuve de conformite, utilisez `gh aw audit` avec l'identifiant d'execution ou l'URL recuperee depuis l'onglet Actions, les identifiants numeriques comme les URL completes GitHub Actions etant acceptes :

```bash
gh aw audit <run-id>
```

La commande telecharge tous les artifacts de cette execution et genere un rapport Markdown concis couvrant les metadonnees de l'execution, l'AIC et les problemes eventuellement signales.

Pour analyser egalement les journaux bruts de l'agent et du firewall en Markdown lisible, ajoutez `--parse` :

```bash
gh aw audit <run-id> --parse
```

Pour une vue complete du contenu du rapport et des fichiers d'artifacts, consultez [Side Quest: Audit Reference](side-quest-25-01-audit-reference.md).

### Deboguer avec un agent

Une fois le rapport d'audit en main, apportez-le a votre agent IA avec la skill **`/agentic-workflows`** et decrivez ce qui vous surprend :

```prompt
/agentic-workflows Here is my audit report. The agent called github.list_issues
three times and AIC was higher than expected. Help me understand why and
suggest how to reduce it.

<paste report here>
```

La skill comprend les regles de [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) et de [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) des workflows agentiques. Elle peut suggérer un prompt plus efficace, valider vos modifications ou vous guider vers une correction, sans quitter le chat. Demandez a l'agent d'editer directement afin qu'il puisse lancer `gh aw compile` pour valider avant le commit.

### Parcourir les artifacts dans l'interface GitHub

Chaque artifact est aussi disponible dans le navigateur sans passer par le CLI :

1. Ouvrez l'onglet **Actions** de votre depot.
2. Cliquez sur une execution de workflow terminee.
3. Faites defiler jusqu'a la section **Artifacts** et telechargez l'archive voulue.

### Politique de retention

Par defaut, GitHub conserve les artifacts pendant **90 jours**. Demandez a votre administrateur GitHub si une politique remplace cette duree et si vous devez copier les artifacts vers un stockage externe pour repondre a des exigences d'audit de plus longue duree.

> [!NOTE]
> Les durees de retention par defaut peuvent differer sur GitHub Enterprise Server. Verifiez cela avec votre administrateur avant de compter sur la fenetre standard de 90 jours.

## :white_check_mark: Checkpoint

- [ ] Vous avez lance `gh aw logs <your-workflow-id>` et lu le resume AIC de votre workflow
- [ ] Vous avez lance `gh aw audit <run-id>` et examine le rapport genere
- [ ] Vous avez apporte un rapport d'audit a votre agent IA avec la skill `/agentic-workflows` et obtenu des retours actionnables
- [ ] Vous savez parcourir les artifacts dans l'interface GitHub Actions
- [ ] Vous connaissez la politique de retention des artifacts de votre organisation, ou vous savez a qui la demander

<!-- journey: all -->

**Suite :** [Gerez les couts et budgets d'AI Credits](26-manage-costs-and-budgets.md)

<!-- /journey -->
