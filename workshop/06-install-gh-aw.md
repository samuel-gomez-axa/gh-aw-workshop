<!-- page-journey: all -->
<!-- page-adventure: core -->
<!-- learning:false -->

# Installer l’extension CLI gh-aw

`gh-aw` est l’extension CLI qui compile vos fichiers Markdown d’[agentic workflow](https://github.github.com/gh-aw/introduction/overview/) et déclenche des exécutions depuis votre terminal.

> [!NOTE]
> Vous utilisez plutôt votre propre machine ? Suivez la quête annexe facultative [Install `gh-aw` in a Local Terminal](side-quest-06-04-install-local.md).

## 🎯 Ce que vous allez faire

Vous allez vérifier que le CLI `gh` est authentifié, installer l’extension `gh-aw`, puis lancer un diagnostic rapide pour confirmer que votre terminal Codespace est prêt pour la configuration d’un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/).

## 📋 Avant de commencer

- Vous avez terminé [Qu’est-ce qu’un Agentic Workflow ?](05-agentic-workflows-intro.md)
- Vous avez un terminal Codespace ouvert, issu de [Set Up a Codespace](02a-setup-codespace.md)

Exécutez cette commande pour confirmer que `gh` est authentifié avant de continuer :

```bash
gh auth status
```

Sortie attendue : `Logged in to github.com as <your-username>`. Si vous voyez une erreur, revenez à [Verify your Codespace is ready](02a-setup-codespace.md#verify-your-codespace-is-ready).

## Installez depuis le terminal

Vérifiez si `gh-aw` est déjà installé, puis installez-le ou mettez-le à jour selon le résultat :

```bash
gh aw --version
```

- **Une version s’affiche ?** Mettez l’extension à jour avec `gh extension upgrade github/gh-aw`
- **Commande introuvable ?** Installez-la à l’aide du script d’installation :

```bash
curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash
gh aw --version
```

Vous devriez voir une sortie du type `gh-aw version 0.81.6`.

> [!NOTE]
> En dehors de Codespaces, vous pouvez aussi installer avec `gh extension install github/gh-aw`. Dans les Codespaces appartenant à une organisation, le jeton GitHub est limité à l’organisation et ne peut pas accéder au marketplace des extensions ; le script curl est donc la voie la plus fiable.

Besoin d’aide supplémentaire ? Consultez [Side Quest: Install gh-aw Troubleshooting](side-quest-06-01-install-troubleshooting.md).

## Lancez un diagnostic rapide

```bash
gh aw doctor
```

Cela vérifie l’authentification de votre GitHub CLI à l’aide des mêmes contrôles de configuration que `gh-aw` attend avant les étapes ultérieures de rédaction et de compilation.

Résultat attendu : un message de réussite confirmant l’authentification de GitHub CLI. En cas d’échec, utilisez [Side Quest: Install gh-aw Troubleshooting](side-quest-06-01-install-troubleshooting.md), puis relancez `gh aw doctor`.

## Initialisez les skills d’[agentic workflow](https://github.github.com/gh-aw/introduction/overview/)

Avant de rédiger votre premier workflow, initialisez puis poussez les [skill files](https://github.github.com/gh-aw/reference/glossary/#skill-files) générés :

```bash
gh aw init
git add .
git commit -m "Initialize agentic workflow skills"
git push
```

Cela crée plusieurs fichiers nécessaires à la rédaction d’agentic workflows :
`.github/skills/agentic-workflows/SKILL.md`,
`.github/skills/agentic-workflow-designer/SKILL.md`,
`.github/agents/agentic-workflows.md`, `.github/mcp.json`,
`.github/workflows/copilot-setup-steps.yml` et `.vscode/settings.json`.

## :running_man: Essayez

Exécutez `gh aw --help` et parcourez la liste des sous-commandes.

Quelle sous-commande pensez-vous utiliser à l’étape 7 lorsque vous créerez et exécuterez votre premier workflow ?

Vous voulez comprendre comment Copilot s’authentifie avec votre workflow ?
➡️ **[Side Quest: Configure GitHub Copilot for Agentic Workflows](side-quest-06-03-copilot-token.md)**

<!-- journey: all -->

**Étape suivante :** [Rédiger votre premier Agentic Workflow](07-your-first-workflow.md)

<!-- /journey -->
