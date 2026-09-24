<!-- page-journey: local -->
<!-- page-adventure: side-quest -->

# Side Quest : Configurer votre terminal local

> _Facultatif : utilisez votre propre machine au lieu du Codespace recommandé, puis revenez au parcours principal de l’atelier._

## :test_tube: Auto-évaluation terminal en 5 questions

Vérifiez chaque affirmation :

- [ ] J’ai déjà ouvert un terminal.
- [ ] Je sais dans quel dossier je me trouve et je sais changer de dossier dans un terminal.
- [ ] Je sais copier, coller et exécuter des commandes sur plusieurs lignes.
- [ ] Je sais lire la sortie d’une commande et repérer les erreurs.
- [ ] Je suis à l’aise pour dépanner des problèmes d’installation locale ou de proxy.

Si l’une des réponses est non, basculez vers [Configurer un Codespace](02a-setup-codespace.md) pour une installation plus rapide sans dépendances locales.

_Travailler en local signifie que vous utiliserez les outils et le shell que vous connaissez déjà ; préparons-les en quelques étapes rapides._

## 🎯 Ce que vous allez faire

Vous allez installer Git et le CLI `gh` sur votre propre machine, puis vous authentifier auprès de GitHub. À la fin, vous serez prêt à créer votre dépôt d’exercice et à poursuivre les étapes principales de l’atelier.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/02-local-setup-flow-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/02-local-setup-flow-light.svg">
   <img alt="Flux d’installation locale : quatre étapes successives — Verify Git, Install gh CLI, Authenticate, Clone Repo" src="images/02-local-setup-flow-light.svg">
</picture>

## 📋 Avant de commencer

- Vous avez terminé [Ce qu’il vous faut avant de commencer](01-prerequisites.md)
- Vous avez un compte GitHub gratuit et vous êtes connecté
- Vous avez une application de terminal ouverte (Terminal sur macOS, Windows Terminal ou Git Bash sur Windows, n’importe quel terminal sur Linux)

## Étapes

### Vérifier Git

```bash
git --version
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02b-terminal-success-01-git-version-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02b-terminal-success-01-git-version-light.svg">
  <img alt="Exemple de sortie réussie après avoir exécuté `git --version`" src="images/02b-terminal-success-01-git-version-light.svg">
</picture>

_Ce à quoi ressemble la réussite :_ une ligne comme `git version 2.x.x`.

Vous devriez voir `git version 2.x.x` ou une version supérieure. Si vous voyez une erreur, téléchargez Git depuis [git-scm.com](https://git-scm.com) puis relancez la vérification.

### Installer GitHub CLI

GitHub CLI est l’outil en ligne de commande officiel de GitHub, et vous l’exécutez avec la commande `gh`. Vérifiez s’il est déjà installé :

```bash
gh --version
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02b-terminal-success-07-gh-version-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02b-terminal-success-07-gh-version-light.svg">
  <img alt="Exemple de sortie réussie après avoir exécuté `gh --version`" src="images/02b-terminal-success-07-gh-version-light.svg">
</picture>

_Ce à quoi ressemble la réussite :_ les informations de version de `gh` s’affichent.

Si la commande fonctionne, passez à la section sur l’[authentication](https://github.github.com/gh-aw/reference/auth/). Sinon, exécutez la commande d’installation rapide pour [macOS](#macos-quick-install), [Windows](#windows-quick-install) ou [Linux](#linux-quick-install).

#### macOS quick install

```bash
brew install gh
```

<details open>
<summary>Vous n’avez pas Homebrew ?</summary>

Si Homebrew est absent ou bloqué, utilisez l’installateur macOS depuis [cli.github.com](https://cli.github.com). Si Git n’a pas été trouvé pendant [Vérifier Git](#vérifier-git), installez-le depuis [git-scm.com](https://git-scm.com) avant de continuer.

</details>

#### Windows quick install

```powershell
winget install --id GitHub.cli
```

<details open>
<summary>Vous n’avez pas winget ?</summary>

- Si `winget` n’est pas disponible, utilisez l’installateur Windows depuis [cli.github.com](https://cli.github.com).
- Si Git n’a pas été trouvé pendant [Vérifier Git](#vérifier-git), installez Git for Windows depuis [git-scm.com](https://git-scm.com).

</details>

#### Linux quick install

```bash
sudo apt update && sudo apt install gh -y
```

<details open>
<summary>Vous utilisez un autre gestionnaire de paquets ?</summary>

- L’installation rapide ci-dessus est prévue pour Debian et Ubuntu.
- Pour Fedora, Arch ou d’autres gestionnaires de paquets, utilisez les instructions Linux sur [cli.github.com](https://cli.github.com).
- Si Git n’a pas été trouvé pendant [Vérifier Git](#vérifier-git), installez-le avec le gestionnaire de paquets de votre distribution avant de continuer.

</details>

Exécutez `gh --version` de nouveau après l’installation pour confirmer que tout fonctionne.

Si vous êtes sur GHES, GHEC, derrière SSO ou derrière un proxy, terminez [Side Quest: Enterprise Setup Considerations](side-quest-enterprise-setup.md). Si une étape d’installation est bloquée par un proxy, des permissions ou des problèmes propres à l’hôte, utilisez [Side Quest: Install gh-aw Troubleshooting](side-quest-06-01-install-troubleshooting.md).

### Authentifier le CLI `gh`

```bash
gh auth login
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02b-terminal-success-11-gh-auth-login-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02b-terminal-success-11-gh-auth-login-light.svg">
  <img alt="Exemple de séquence d’invites après avoir exécuté `gh auth login`" src="images/02b-terminal-success-11-gh-auth-login-light.svg">
</picture>

_Ce à quoi ressemble la réussite :_ les invites interactives se terminent et la connexion réussit.

Choisissez GitHub.com puis Login with a web browser. Un code à usage unique apparaîtra dans votre terminal ; copiez-le, ouvrez l’URL affichée, puis collez le code lorsqu’il vous sera demandé.

> [!IMPORTANT]
> Ne partagez jamais le code à usage unique ni votre token d’authentification avec qui que ce soit. Si vous validez accidentellement un token, révoquez-le immédiatement dans **Settings → Developer settings → Personal access tokens**.

### Nouveau dépôt

1. Créez votre propre dépôt public sur [github.com/new](https://github.com/new) :
    - Nommez-le `my-agentic-workflows`.
    - Cochez **Add a README file**.
    - Cliquez sur **Create repository**.
2. Clonez le dépôt sur votre machine locale :

### Cloner le dépôt

```bash
gh repo clone my-agentic-workflows
cd my-agentic-workflows
```

## ✅ Checkpoint

- [ ] J’ai cloné le dépôt `my-agentic-workflows` sur ma machine locale
- [ ] Je suis entré dans le répertoire `my-agentic-workflows` dans mon terminal
- [ ] `gh --version` renvoie la version 2.40.0 ou plus récente

<!-- journey: local -->

**Suite :** [Introduction à GitHub Actions](04-github-actions-intro.md)

<!-- /journey -->
