<!-- page-journey: all -->
<!-- page-adventure: advanced -->
<!--
<research-metadata>
  <focus>BinEval evaluations (`evals:` frontmatter) for automated workflow quality verification</focus>
  <sources>
    <source>https://github.github.com/gh-aw/llms.txt</source>
    <source>https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/evals.md</source>
    <source>https://github.github.com/gh-aw/reference/artifacts/</source>
    <source>https://github.github.com/gh-aw/reference/safe-outputs/</source>
  </sources>
  <rationale>This node closes a curriculum gap between prompt experimentation and cost controls by adding a repeatable quality gate. Learners already know how to run workflows and compare variants, but they still need an automated way to verify whether a run achieved its intended outcome without manual review. Introducing `evals:` gives each run durable YES/NO quality signals through the `evals` artifact (`evals.jsonl`) and persisted eval state, which supports regression detection and evidence-based iteration over time.</rationale>
</research-metadata>
-->

# Verifiez la qualite de votre workflow avec les evals

> _Ajoutez des vérifications automatisées OUI/NON pour que chaque exécution vous dise si votre workflow a réellement atteint son objectif._

## 🎯 Ce que vous allez faire

Vous allez ajouter un bloc `evals:` à votre workflow, définir des questions binaires de qualité, exécuter le workflow et vérifier que les résultats sont enregistrés dans l'[artifact `evals`](https://github.github.com/gh-aw/reference/artifacts/#evals) puis conservés pour comparaison historique.

## 📋 Avant de commencer

- Vous avez terminé [Test Your Prompt Ideas with A/B Experiments](23-ab-experiments.md).
- Vous avez terminé [Manage Costs and AI Credit Budgets](26-manage-costs-and-budgets.md).
- Vous savez exécuter et inspecter un workflow grâce à [Run and Watch Your Workflow](08-run-your-workflow.md).

## Etapes

### Ajouter un bloc `evals:` avec la skill

Dans votre session Copilot CLI dans le terminal, collez :

```prompt
/agentic-workflows add three binary eval questions to daily-status.md: one checking that a status issue was created, one checking the output includes a summary of repository activity, and one checking that no writes happened outside declared safe outputs.
```

La skill ajoute le bloc `evals:` à votre frontmatter, compile le [lock file](https://github.github.com/gh-aw/reference/compilation-process/) et vous montre le diff.

<details open>
<summary>🖥️ Terminal path — add the evals block directly</summary>

Ouvrez `.github/workflows/daily-status.md` et ajoutez des questions binaires au frontmatter :

```markdown .github/workflows/daily-status.md
---
safe-outputs:
    create-issue:
        title-prefix: 'Daily Repository Status'

evals:
    - id: issue_created
      question: Does the agent output confirm that a status issue was created?
    - id: includes_summary
      question: Does the agent output include a summary of repository activity from the last 24 hours?
    - id: no_unapproved_writes
      question: Does the agent output show no writes outside declared safe outputs?
---
```

Chaque question doit vérifier une affirmation observable et pouvoir recevoir une réponse à partir de la seule sortie de l'agent. Compilez après la modification :

```bash
gh aw compile daily-status
```

</details>

### Committer et declencher une execution

Committez à la fois la source du workflow et le lock file recompilé, puis déclenchez une exécution depuis l'interface Actions :

```bash
git add .
git commit -m "feat: add evals to daily-status workflow"
git push
```

Ouvrez **Actions → Daily Status Report → Run workflow** puis cliquez sur **Run workflow**.

### Inspecter les resultats d'evaluation

Une fois l'exécution terminée :

1. Ouvrez la section **Artifacts** de l'execution.
2. Téléchargez l'artifact `evals`.
3. Ouvrez `evals.jsonl` et confirmez que chaque question a une réponse YES ou NO.

Exemple d'enregistrement :

```json
{
    "id": "issue_created",
    "question": "Does the agent output confirm that a status issue was created?",
    "answer": "YES",
    "model": "small"
}
```

### Utiliser les evals pour detecter les regressions

Lorsque vous mettez à jour votre prompt ou vos outils, relancez le workflow et comparez les réponses d'une exécution à l'autre. Une question qui passe de `YES` à `NO` est un signal rapide qu'une régression de qualité s'est produite et doit être investiguée.

Pour affiner vos questions, revenez dans Copilot CLI et décrivez ce que vous avez observé :

```prompt
/agentic-workflows the eval question "includes_summary" is too broad — update it to check that the output includes at least one open issue or pull request from the last 24 hours.
```

> [!TIP]
> Utilisez `gh aw compile --watch` pendant que vous itérez sur les questions d'évaluation pour obtenir un retour instantané sur les erreurs de compilation.

## ✅ Checkpoint

- [ ] Le frontmatter de votre workflow inclut un bloc `evals:` avec au moins trois questions binaires
- [ ] `gh aw compile daily-status` réussit après vos changements d'eval
- [ ] Vous avez exécuté le workflow et téléchargé l'artifact `evals`
- [ ] Vous avez vérifié que `evals.jsonl` contient des réponses YES ou NO pour chaque question
- [ ] Vous pouvez expliquer comment les changements de réponse des evals aident à détecter les régressions

<!-- journey: all -->

**Suite :** [Orchestrez plusieurs workflows agentiques](28-orchestrate-workflows.md)

<!-- /journey -->
