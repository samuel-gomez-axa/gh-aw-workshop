<!-- page-journey: local -->
<!-- page-adventure: side-quest -->

# Side Quest : Installer `gh-aw` dans un terminal local

> _Facultatif : installez `gh-aw` sur votre propre machine plutôt que dans le Codespace recommandé._

Vous utilisez plutôt un Codespace ? Revenez à [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md).

## :dart: Ce que vous allez faire

Vous allez vérifier que le CLI `gh` est authentifié, installer l’extension `gh-aw`, puis lancer un diagnostic rapide pour confirmer que votre terminal local est prêt pour la configuration d’un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/).

## :clipboard: Avant de commencer

- Vous avez terminé [Que sont les agentic workflows ?](05-agentic-workflows-intro.md)
- Vous avez terminé [Side Quest : Configurer votre terminal local](side-quest-02-01-local-terminal.md)
- Le CLI `gh` est installé et authentifié (voir [Authentifier le CLI `gh`](side-quest-02-01-local-terminal.md#authentifier-le-cli-gh))

Exécutez ceci pour confirmer que `gh` est authentifié avant de continuer :

```bash
gh auth status
```

Sortie attendue : `Logged in to github.com as <your-username>`. Si vous voyez une erreur indiquant que `gh` n’est pas installé, revenez à [Prérequis](01-prerequisites.md). Pour les erreurs d’[authentication](https://github.github.com/gh-aw/reference/auth/), revenez à [Authentifier le CLI `gh`](side-quest-02-01-local-terminal.md#authentifier-le-cli-gh).

## Installer depuis le terminal

Vérifiez si `gh-aw` est déjà installé, puis installez-le ou mettez-le à jour selon le cas :

```bash
gh aw --version
```

- **Version shown?** Mettez l’extension à jour : `gh extension upgrade github/gh-aw`
- **Command not found?** Installez l’extension (ouvrez votre terminal ; dans [VS Code](side-quest-01-02-environment-reference.md#visual-studio-code-vs-code), utilisez `` Ctrl+` `` / `` Cmd+` ``) :

```bash
gh extension install github/gh-aw
```

<details open>
<summary>Dépannage : 403 Forbidden à l’installation</summary>

Le token de votre organisation n’autorise peut-être pas l’installation d’extensions publiques. Utilisez l’installateur de secours :

```bash
curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash
```

Besoin d’aide supplémentaire ? Consultez [Side Quest : Dépannage de l’installation de `gh-aw`](side-quest-06-01-install-troubleshooting.md).

</details>

Vérifiez que l’extension est prête :

```bash
gh aw --version
```

Vous devriez voir une sortie comme `gh-aw version 0.88.2`.

## Lancer un diagnostic rapide

Exécutez maintenant :

```bash
gh aw doctor
```

Cette commande vérifie l’[authentication](https://github.github.com/gh-aw/reference/auth/) de votre GitHub CLI à l’aide des mêmes contrôles de configuration que `gh-aw` attend avant les étapes ultérieures de rédaction et de compilation.

Résultat attendu : un message de succès confirmant l’authentication du GitHub CLI. En cas d’échec, utilisez [Side Quest: Install gh-aw Troubleshooting](side-quest-06-01-install-troubleshooting.md), puis relancez `gh aw doctor`.

## Initialiser les skills d’[agentic workflow](https://github.github.com/gh-aw/introduction/overview/)

Avant de rédiger votre premier workflow, initialisez puis poussez les fichiers de skill générés :

```bash
gh aw init
git add .
git commit -m "Initialize agentic workflow skills"
git push
```

Cette commande configure `.gitattributes` et `.vscode/settings.json`, crée `.github/skills/agentic-workflows/SKILL.md` et supprime les anciens fichiers de prompt dans `.github/prompts/` s’ils existent.

Lorsque vous exécutez `gh aw init --engine copilot`, la commande crée aussi `.github/agents/agentic-workflows.md`. À moins de passer `--no-mcp`, elle crée également `.github/workflows/copilot-setup-steps.yml` et `.github/mcp.json`.

Si un workflow utilise `expires`, `gh aw init` génère aussi `.github/workflows/agentics-maintenance.yml`.

## :running_man: Essayez

Exécutez `gh aw --help` et parcourez la liste des sous-commandes.

Quelle sous-commande pensez-vous utiliser à Step 7 lorsque vous créerez puis exécuterez votre premier workflow ?

## :white_check_mark: Checkpoint

- [ ] `gh auth status` indique que vous êtes connecté à github.com
- [ ] `gh aw --version` renvoie un numéro de version
- [ ] `gh aw doctor` se termine avec succès
- [ ] `gh aw init` a été exécuté dans votre dépôt d’exercice
- [ ] Tous les fichiers générés par `gh aw init` sont validés et poussés
- [ ] Vous pouvez citer une sous-commande `gh aw` issue de `gh aw --help`

Vous voulez comprendre comment Copilot s’authentifie auprès de votre workflow ?
:arrow_right: **[Side Quest : Configurer GitHub Copilot pour les agentic workflows](side-quest-06-03-copilot-token.md)**

<!-- journey: local -->

**Suite :** [Écrire votre premier agentic workflow](07-your-first-workflow.md)

<!-- /journey -->
