<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Donnez plus d'outils à votre agent avec MCP

> _Les serveurs MCP transforment votre agent, qui passe de simple générateur de texte à participant actif capable de lire, récupérer et agir._

## 🎯 Ce que vous allez faire

Vous allez ajouter un serveur [MCP (Model Context Protocol)](https://github.github.com/gh-aw/guides/mcps/) au [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) de votre workflow, afin de donner à l'agent IA accès à un nouvel ensemble de [tools](https://github.github.com/gh-aw/reference/tools/) qu'il peut appeler à l'exécution. À la fin, votre workflow daily-status fera plus que générer du texte ; il pourra interagir avec des sources de données en direct via des appels d'outil structurés.

## 📋 Avant de commencer

- Vous avez installé l'extension `gh-aw` dans [Install the `gh-aw` CLI Extension](06-install-gh-aw.md).
- Vous disposez d'un workflow daily-status fonctionnel issu de [Build: Daily Repo Status Workflow](07-your-first-workflow.md).
- Vous êtes à l'aise pour modifier la section YAML du frontmatter en haut de votre fichier de workflow.

## Étapes

### Comprendre ce que MCP apporte

MCP (Model Context Protocol) connecte des serveurs d'outils externes à l'agent afin qu'il puisse appeler des opérations structurées, comme lister des issues ou récupérer des commits, puis intégrer ces résultats en direct dans sa sortie. Sans MCP, l'agent ne connaît que ce que vous avez écrit dans le brief ; avec MCP, il peut aller vérifier les informations lui-même.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/17-mcp-agent-loop-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/17-mcp-agent-loop-light.svg">
    <img alt="Boucle agentique MCP : le brief de tâche entre dans l'agent, qui raisonne et appelle des outils GitHub via MCP, reçoit des résultats et produit la sortie finale" src="images/17-mcp-agent-loop-light.svg">
</picture>

> [!TIP]
>
> <details>
> <summary><b>Side quests facultatives :</b></summary>
>
> - Vous voulez approfondir la manière dont la boucle agentique change, le rôle du bloc `tools:` et la lecture des appels d'outils dans le journal Actions ? Parcourez [Side Quest: How MCP Tool Servers Work](side-quest-17-01-mcp-concepts.md).
> - Vous voulez un modèle mental de sécurité simple pour comprendre pourquoi le sandboxing compte, où l'agent s'exécute et à quoi ressemble une safe output ? Parcourez [Side Quest: Agentic Workflow Security Architecture (Explain Like You're 5)](side-quest-17-02-security-architecture.md).
> - Vous voulez comprendre comment un contenu malveillant dans des issues ou des PR peut tenter de rediriger votre agent, et comment la conception de gh-aw limite les dégâts ? Parcourez [Side Quest: Prompt Injection Attacks in Agentic Workflows](side-quest-17-03-prompt-injection.md).
> - Vous voulez voir comment un workflow surdimensionné peut donner à un agent mal orienté plus d'autorité que la tâche ne l'exige réellement ? Parcourez [Side Quest: Permission Escalation in Agentic Workflows](side-quest-17-04-permission-escalation.md).
> - Vous voulez comprendre comment un serveur MCP compromis pourrait injecter des données empoisonnées à votre agent, et comment `network.allowed` et des [permissions](https://github.github.com/gh-aw/reference/permissions/) minimales s'en défendent ? Parcourez [Side Quest: Supply Chain Attacks via MCP Tool Servers](side-quest-17-05-supply-chain-mcp.md).
> - Vous voulez voir comment un contenu d'issue ou de PR spécialement fabriqué peut intégrer un texte trompeur dans la sortie de l'agent, et comment le cadrage des labels `safe-outputs` évite de tromper les relecteurs ? Parcourez [Side Quest: Output Injection via Safe Outputs](side-quest-17-06-output-injection.md).
> - Vous voulez comprendre comment un agent mal dirigé avec des droits d'écriture pourrait committer des backdoors ou écraser des fichiers sensibles, et comment `contents: read`, `protected-files` et `safe-outputs: create-pull-request` l'empêchent ? Parcourez [Side Quest: Repository Poisoning via Agentic Write Access](side-quest-17-07-repo-poisoning.md).  
>   Revenez ensuite ici.
>
> </details>

### Ajouter un serveur MCP à votre workflow

Dans le terminal déjà ouvert dans votre Codespace, lancez :

```bash
gh copilot
```

Dans Copilot CLI, envoyez ce prompt :

```prompt
/agentic-workflows update .github/workflows/daily-status.md to add a `tools:` block
with `github: mode: gh-proxy, toolsets: [default]` to the frontmatter, and update
the task brief to tell the agent to use GitHub tools to fetch the last 5 commits and
all open issues labelled `bug`, then write a daily summary and post it as a new issue.
```

La skill ajoute le bloc `tools:` et met à jour le brief. Examinez le diff avant de commit.

Voici le bloc `tools:` que la skill ajoutera :

```markdown .github/workflows/daily-status.md
---
name: Daily Status Report
on:
    workflow_dispatch: {}
    schedule: daily on weekdays
permissions:
    contents: read
tools:
    github:
        mode: gh-proxy
        toolsets: [default]
---
```

<details open>
<summary>🖥️ Terminal path</summary>

Ouvrez votre fichier de workflow daily-status, `.github/workflows/daily-status.md`, puis trouvez le frontmatter YAML en haut. Ajoutez un bloc `tools` avec le contenu montré ci-dessus, puis lancez `gh aw compile`.

</details>

> [!NOTE]
> L'entrée d'outil `github` indique à gh-aw de démarrer le [serveur GitHub MCP](https://github.github.com/gh-aw/guides/mcps/) en mode proxy. L'agent peut alors appeler des outils GitHub, lister des issues, récupérer des commits, lire le contenu de fichiers, dans le cadre des permissions que vous avez déclarées ci-dessus.

<!-- -->

> [!NOTE]
>
> <details>
> <summary><b>Utilisateurs enterprise (GHEC, GHES, EMU) : confirmez la disponibilité du proxy MCP avant de continuer.</b></summary>
>
> `mode: gh-proxy` fait passer tous les appels aux outils GitHub par le `GITHUB_TOKEN` fourni automatiquement par Actions ; aucun identifiant supplémentaire ni configuration n'est nécessaire sur github.com ou GHEC.
>
> Sur GHES, le serveur GitHub MCP est pris en charge à partir de GHES 3.16+. Si votre instance est plus ancienne, le bloc `tools:` [compilera](https://github.github.com/gh-aw/reference/compilation-process/) sans erreur, mais les appels d'outils de l'agent échoueront à l'exécution. Vérifiez votre version GHES et confirmez avec votre administrateur que la fonctionnalité de proxy MCP de Copilot est activée pour votre organisation.
>
> Si MCP n'est pas disponible dans votre environnement, l'étape [Connect a Live Data Source](16-connect-data-source.md) présente une approche alternative utilisant des étapes shell deterministic qui ne nécessitent que `GITHUB_TOKEN` et le CLI `gh`, sans serveur MCP.
>
> </details>

### Faire référence aux outils dans votre brief de tâche

Sous le frontmatter, mettez à jour le brief de tâche pour indiquer à l'agent qu'il peut utiliser les outils MCP :

```markdown .github/workflows/daily-status.md
You have access to GitHub tools via MCP. Use them to:

1. Fetch the last 5 commits on the default branch.
2. List all open issues labelled `bug`.
3. Write a concise daily summary combining both.
   Post the summary as a new issue titled "Daily Status — {today's date}".
```

L'agent lira ce brief, choisira quels appels d'outils MCP effectuer, puis intégrera les résultats dans sa sortie finale, sans que vous ayez à scripter manuellement chaque appel d'API.

### Pousser et déclencher une exécution

La skill `/agentic-workflows` recompile automatiquement le lock file. Committez les deux fichiers puis poussez :

```bash
git add .
git commit -m "feat: add MCP tools to daily status workflow"
git push
```

### Observer l'agent raisonner

Ouvrez le journal d'exécution dans **Actions**. Vous verrez l'agent alterner appels d'outils et raisonnement : il récupère des données, les traite, puis produit le résumé. C'est la boucle agentique en action.

## ✅ Checkpoint

- [ ] Votre frontmatter contient un bloc `tools:` avec `github: mode: gh-proxy`
- [ ] Votre brief de tâche précise ce que l'agent doit faire avec les outils
- [ ] Les fichiers source et compilé du workflow sont committés et poussés
- [ ] Une exécution manuelle se termine et le journal montre au moins un appel d'outil MCP
- [ ] La sortie du workflow reflète des données en direct récupérées via MCP, et pas seulement du texte statique

<!-- journey: all -->

**Suite :** [Partagez et réutilisez vos workflows agentiques](18-share-and-reuse.md)

<!-- /journey -->
