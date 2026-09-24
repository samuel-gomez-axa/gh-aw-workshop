<!-- page-journey: all -->
<!-- page-adventure: core -->

# Rédiger votre premier Agentic Workflow

_Rédiger votre premier workflow, c’est le moment où la théorie devient pratique. Construisons quelque chose de réel._

## 🎯 Ce que vous allez faire

Vous allez utiliser Copilot pour créer `.github/workflows/daily-report-status.md`, un workflow planifié qui prend aussi en charge le déclenchement manuel. Vous le configurerez avec [`permissions`](https://github.github.com/gh-aw/reference/permissions/), [`safe-outputs`](https://github.github.com/gh-aw/reference/safe-outputs/) et un task brief, puis vous le compilerez pour produire `daily-report-status.lock.yml`, le fichier exécuté par [GitHub Actions](https://github.github.com/gh-aw/guides/github-actions-primer/).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/07-compile-flow-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/07-compile-flow-light.svg">
  <img alt="Schéma montrant comment vous demandez à un agent, avec le skill agentic-workflows, de créer daily-report-status.md, lequel est compilé par gh aw compile en daily-report-status.lock.yml, puis exécuté par GitHub Actions" src="images/07-compile-flow-light.svg">
</picture>

## 📋 Avant de commencer

- Vous avez terminé [Installer l’extension CLI gh-aw](06-install-gh-aw.md)
- La commande `gh aw` fonctionne dans votre terminal
- Vous avez déjà exécuté `gh aw init` et poussé `.github/skills/agentic-workflows/`

**Vérifiez l’accès à Copilot avant de commencer.**

1. Dans le terminal déjà ouvert dans votre dépôt local, exécutez :

```bash
gh copilot
```

1. Dans Copilot CLI, envoyez ce prompt :

```prompt
/agentic-workflows what trigger does a scheduled workflow use?
```

Vérifiez que vous recevez une réponse. N’importe quelle réponse signifie que Copilot CLI et le skill `agentic-workflows` sont accessibles.

> [!IMPORTANT]
> Si vous voyez une erreur au lieu d’une réponse, ne continuez pas. Corrigez d’abord le problème d’accès : les erreurs d’accès au modèle feront échouer l’étape 8. Vérifiez [github.com/settings/copilot](https://github.com/settings/copilot), puis consultez [Confirm Model Access](07d-confirm-model-access.md) pour un dépannage détaillé.

- [ ] J’ai ouvert Copilot CLI dans le terminal et reçu une réponse au prompt de test

## Créez votre premier workflow

> [!NOTE]
> Utilisez pour toutes les tâches de cet atelier l’**AI agent that runs your agentic workflows**, qu’il s’agisse de Copilot, Claude, Codex ou de celui que vous avez configuré. Utiliser localement le même agent vous donne un comportement proche de la production ; Copilot Chat en Agent Mode s’exécute dans un autre environnement et peut produire des résultats différents.

Dans votre agent IA, exécutez ce prompt :

```prompt
/agentic-workflows Create a daily-report-status workflow with:
- name: Daily Report Status
- triggers: daily schedule and workflow_dispatch
- permissions: contents read, issues read, copilot-requests write
- safe-outputs: create-issue
- task brief: "Generate an activity report in a new issue."
Compile it after creating it.
```

Examinez la modification proposée par l’agent, puis continuez. Préférez cette approche plutôt que d’éditer chaque ligne à la main.

> [!TIP]
> Vous ne savez pas comment formuler un prompt pour votre propre workflow ? Le [gh-aw wizard](https://githubnext.github.io/gh-aw-wizard/) vous pose quelques questions et génère un prompt prêt à coller que vous pourrez envoyer à votre agent.

**Ce que l’agent a créé** : le fichier généré devrait ressembler approximativement à ceci :

```markdown .github/workflows/daily-report-status.md
---
name: Daily Report Status
on:
    schedule: daily # compiled to a daily GitHub Actions cron schedule
    workflow_dispatch: {} # also allows manual runs
permissions:
    contents: read
    issues: read
    copilot-requests: write # required to call the AI model
safe-outputs:
    create-issue: # the only write action the agent may perform
---

Generate an activity report for this repository and post it as a new issue.
```

Le **[frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)** indique à GitHub Actions quand exécuter le workflow, quelles permissions l’agent possède et quelle action d’écriture il peut utiliser (`create-issue`). Le **task brief** sous le second `---` est ce que l’agent IA lit et exécute.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/07a-workflow-dispatch-trigger-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/07a-workflow-dispatch-trigger-light.svg">
  <img alt="Fonctionnement de workflow_dispatch : rédiger le fichier .md, le compiler en lock.yml, le pousser vers GitHub, puis cliquer sur Run workflow dans l’onglet Actions pour déclencher l’agent" src="images/07a-workflow-dispatch-trigger-light.svg">
</picture>

Si vous rencontrez une erreur de compilation, utilisez [Side Quest: Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md).

## Validez, puis committez et poussez

Exécutez :

```bash
gh aw compile
```

Pendant l’édition, vous pouvez aussi utiliser `gh aw compile --watch`.

Puis committez et poussez :

```bash
git add .
git commit -m "Add daily-report-status agentic workflow"
git push
```

Pour les modifications suivantes, continuez à utiliser un agent avec le skill `agentic-workflows` et évitez l’édition manuelle du workflow, sauf si vous déboguez un problème précis à l’échelle d’une ligne.

## ✅ Checkpoint

- [ ] L’accès à Copilot a été confirmé dans Copilot CLI avant de commencer, avec une réponse au prompt de test
- [ ] `.github/workflows/daily-report-status.md` existe et contient un trigger `on: schedule:` dans le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)
- [ ] Le fichier inclut `permissions` avec `copilot-requests: write`
- [ ] `gh aw compile` se termine sans erreur et produit `daily-report-status.lock.yml`
- [ ] `daily-report-status.md` et `daily-report-status.lock.yml` sont tous les deux commités et poussés vers `main`
- [ ] Le workflow apparaît dans l’onglet **Actions** de votre dépôt sous le nom "Daily Report Status"
- [ ] Vous êtes prêt à choisir la méthode de facturation et d’authentification du workflow

<!-- journey: all -->

**Étape suivante :** [Confirmer l’accès au modèle](07d-confirm-model-access.md)

<!-- /journey -->
