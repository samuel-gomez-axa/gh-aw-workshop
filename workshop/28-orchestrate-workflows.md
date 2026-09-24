<!-- page-journey: all -->
<!-- page-adventure: advanced -->
<!--
<research-metadata>
  <focus>Multi-workflow orchestration using the dispatch-workflow safe-output operation in gh-aw to compose individual specialist workflows into a coordinated pipeline</focus>
  <sources>
    <source>https://github.github.com/gh-aw/llms.txt</source>
    <source>https://github.github.com/gh-aw/reference/safe-outputs/</source>
    <source>https://github.github.com/gh-aw/guides/reusing-workflows/</source>
  </sources>
  <rationale>The workshop curriculum covers building individual workflows with sub-agents, memory, MCP tools, evals, and cost controls. No step teaches learners to compose those workflows into a pipeline — one orchestrator that reads repository state and activates the right specialist. The dispatch-workflow safe-output makes this possible, but it does not appear anywhere in the existing content. Learners who complete all prior steps can build capable individual workflows yet have no model for how to chain them. This step closes that gap with a concrete, practitioner-ready pattern.</rationale>
</research-metadata>
-->

# Orchestrez plusieurs workflows agentiques

> _Enchaînez vos workflows spécialisés : un orchestrateur lit la situation, puis le bon spécialiste agit._

## :dart: Ce que vous allez faire

Vous allez construire un workflow orchestrateur qui lit l'état du dépôt, décide quel workflow spécialiste activer et le déclenche via la safe-output [`dispatch-workflow`](https://github.github.com/gh-aw/reference/safe-outputs/). À la fin de cette étape, vous aurez un coordinateur qui route le travail vers des spécialistes existants au lieu de tout traiter lui-même.

## :clipboard: Avant de commencer

- Vous avez terminé [Verify Your Workflow Quality with Evals](27-evaluate-workflow-quality.md).
- Vous disposez d'au moins deux workflows agentiques fonctionnels, par exemple votre workflow `daily-status` et un relecteur de PR de [Build Your First Event-Driven Workflow](14b-pr-reviewer-workflow.md).
- Vous savez compiler des workflows avec `gh aw compile` grâce à [Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md).

## Comprendre l'orchestration de workflows

Lorsqu'un dépôt a besoin de plusieurs types de travail IA, rapports d'état, revues de PR, audits de coût, vous pouvez garder chaque besoin dans son propre workflow cible. Un orchestrateur les relie : il lit les signaux du dépôt et déclenche le bon spécialiste.

La primitive clé est `dispatch-workflow` dans [`safe-outputs`](https://github.github.com/gh-aw/reference/safe-outputs/). Elle permet à votre orchestrateur de déclencher un autre workflow dans le même dépôt et, si besoin, de lui transmettre des entrées.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/28-orchestrator-routing-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/28-orchestrator-routing-light.svg">
  <img alt="Schéma : un workflow orchestrateur lit les signaux du dépôt et déclenche exactement un workflow spécialiste, ou consigne un résumé puis s'arrête si aucune condition ne correspond." src="images/28-orchestrator-routing-light.svg">
</picture>

> :thinking: **Predict:** Regardez vos workflows existants. Lequel traite la tâche la plus large ? Lequel traite la plus étroite ? Le plus large est un candidat naturel à l'orchestration ; le plus étroit est un spécialiste naturel.

## Etapes

### Concevoir votre orchestrateur

Avant d'écrire du code, décidez :

- Quels signaux l'orchestrateur va-t-il lire ? Compte des issues ouvertes, âge des PR, activité récente des commits, ou une combinaison.
- Quels workflows spécialistes va-t-il activer ? En limiter l'exécution à un seul par run rend le comportement plus prévisible.
- Quelle condition enverra vers chaque spécialiste ?

Un tableau de décision simple aide beaucoup :

| Signal                                           | Action                                |
| ------------------------------------------------ | ------------------------------------- |
| Des PR ouvertes obsolètes existent               | Déclencher le relecteur de PR         |
| Aucune issue de statut n'a été créée aujourd'hui | Déclencher le rapporteur daily-status |
| Aucune des deux conditions                       | Consigner un résumé puis s'arrêter    |

### Creer le workflow orchestrateur

Dans votre agent IA, lancez :

```prompt
/agentic-workflows create a new workflow named `repo-orchestrator` that reads
open PR count and checks whether a daily-status issue exists today.
If stale open PRs are found, use dispatch-workflow to trigger `pr-reviewer`.
If no status issue exists, use dispatch-workflow to trigger `daily-status`.
Add permissions: contents: read, issues: read, pull-requests: read.
Set safe-outputs: dispatch-workflow with the list of allowed workflows.
```

<details open>
<summary>:desktop_computer: Terminal path — write the orchestrator directly</summary>

Créez `.github/workflows/repo-orchestrator.md` à partir de ce modèle initial :

```markdown .github/workflows/repo-orchestrator.md
---
name: Repository Orchestrator
on:
    schedule: daily on weekdays
permissions:
    contents: read
    issues: read
    pull-requests: read
safe-outputs:
    dispatch-workflow:
        workflows:
            - daily-status
            - pr-reviewer
        max: 1
---

Read the current repository state:

1. Count open pull requests older than 3 days.
2. Check whether a GitHub issue with the title prefix "Daily Repository Status" was created today.

Based on what you find:

- If stale open PRs exist, dispatch the `pr-reviewer` workflow.
- If no status issue exists today, dispatch the `daily-status` workflow.
- If neither condition is true, output a one-line summary and stop.

Dispatch at most one workflow per run.
```

Puis compilez :

```bash
gh aw compile repo-orchestrator
```

</details>

### Examiner le safe-output `dispatch-workflow`

Après création du fichier par la skill ou par votre édition manuelle, vérifiez que le frontmatter contient :

```markdown .github/workflows/repo-orchestrator.md
safe-outputs:
dispatch-workflow:
workflows: - daily-status - pr-reviewer
max: 1
```

La liste `workflows` est une allowlist : votre orchestrateur ne peut déclencher que les workflows nommés ici. La limite `max: 1` empêche une exécution d'activer de nombreux spécialistes à la fois.

> [!NOTE]
> `dispatch-workflow` déclenche le workflow nommé avec un événement `workflow_dispatch`. Le spécialiste s'exécute de façon asynchrone dans son propre job Actions. Votre orchestrateur n'attend pas qu'il se termine.

### Compiler et pousser

```bash
gh aw compile repo-orchestrator
git add .
git commit -m "feat: add repo-orchestrator workflow"
git push
```

### Executer et verifier le routage

Déclenchez une exécution manuelle depuis l'interface Actions :

1. Ouvrez **Actions** → **Repository Orchestrator** → **Run workflow**.
2. Une fois l'exécution terminée, ouvrez le journal d'exécution.
3. Confirmez que l'orchestrateur a identifié une condition et déclenché le bon spécialiste.
4. Ouvrez **Actions** et vérifiez que le workflow spécialiste a été déclenché comme exécution distincte.

Si aucune condition ne correspond, l'orchestrateur doit écrire un résumé d'une ligne puis s'arrêter ; vérifiez qu'aucun spécialiste n'a été déclenché.

### Iterer sur la logique de routage

Revenez vers votre agent et affinez les conditions :

```prompt
/agentic-workflows update repo-orchestrator to also dispatch `daily-status` when
the latest commit is more than 48 hours old and no status issue was created today.
```

Chaque itération suit la même boucle : éditer le brief, compiler, pousser, exécuter, puis inspecter le journal de dispatch.

## :white_check_mark: Checkpoint

- [ ] Vous avez identifié au moins deux workflows spécialistes et une condition d'orchestration pour chacun
- [ ] Votre `repo-orchestrator.md` inclut un safe-output `dispatch-workflow` avec une allowlist `workflows` explicite
- [ ] `gh aw compile repo-orchestrator` réussit
- [ ] Une exécution manuelle de l'orchestrateur a produit un journal montrant quelle condition a été évaluée
- [ ] Vous avez vérifié que le workflow spécialiste a été déclenché, ou confirmé qu'il a bien été ignoré lorsqu'aucune condition ne correspondait
- [ ] Vous pouvez expliquer pourquoi `max: 1` dans le bloc `dispatch-workflow` rend le comportement de l'orchestrateur prévisible

<!-- journey: all -->

**Suite :** [Apprenez a votre agent des connaissances metier avec les skills](29-skills-and-domain-knowledge.md)

<!-- /journey -->
