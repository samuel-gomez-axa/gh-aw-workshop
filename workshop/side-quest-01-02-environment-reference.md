<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Référence des environnements

> _Facultatif : utilisez ce glossaire rapide et ce repère visuel pour comprendre les environnements et outils d’IA utilisés pendant l’atelier._

**Ce que vous allez apprendre :** à la fin de cette page, vous saurez nommer chaque outil et environnement utilisé dans l’atelier, l’associer à son rôle et savoir quand vous l’utiliserez.

## 📋 Avant de commencer

Il s’agit d’une page de référence : vous pouvez la lire à tout moment. Revenez-y chaque fois que l’atelier utilise un terme que vous voulez clarifier. Aucun terminal n’est nécessaire pour lire cette page.

Quand vous serez prêt à vérifier que vos outils fonctionnent, consultez la section [Checkpoint](#-v%C3%A9rifiez-que-vos-outils-sont-pr%C3%AAts) en bas de page.

## Glossaire des environnements et des outils

Savoir quel nom correspond à quel rôle vous aide à suivre les instructions de l’atelier sans devoir vous arrêter pour vous demander ce que signifient "the terminal" ou "VS Code" dans ce contexte.

| Terme                            | Ce qu’il signifie dans cet atelier                                                                                                                                                      | Quand vous l’utilisez                                            | Documentation officielle                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Visual Studio Code (VS Code)** | L’éditeur recommandé pour ouvrir votre dépôt local, modifier les fichiers de workflow et garder un terminal intégré à portée de main.                                                   | Étapes 2 à 14 : rédaction, compilation et exécution de workflows | [Visual Studio Code docs](https://code.visualstudio.com/docs)                                               |
| **Terminal (command line)**      | Le shell dans lequel vous exécutez les commandes de l’atelier (`gh`, `gh aw`, `git`, etc.).                                                                                             | Toute étape qui affiche un bloc de code `bash`                   | [GitHub CLI manual](https://cli.github.com/manual/)                                                         |
| **GitHub CLI (`gh`)**            | Le CLI officiel de GitHub, requis pour cet atelier. Vous l’installez ou vérifiez sur votre machine locale avant de poursuivre.                                                          | À partir de l’étape 2                                            | [GitHub CLI docs](https://cli.github.com/manual/)                                                           |
| **`gh-aw` CLI extension**        | L’extension GitHub Agentic Workflows que vous installez et utilisez dans le terminal pour compiler des fichiers de workflow.                                                            | À partir de l’étape 6                                            | [Install `gh-aw`](https://github.com/github/gh-aw#readme)                                                   |
| **GitHub Copilot CLI**           | Copilot dans le terminal pour l’aide aux commandes et au développement assistée par IA. C’est la principale surface d’IA dans cet atelier.                                              | Toute étape qui affiche un bloc de code `prompt`                 | [GitHub Copilot CLI docs](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) |
| **GitHub Copilot app**           | L’application desktop et web GitHub Copilot dans laquelle vous pouvez ouvrir des dépôts, démarrer des sessions d’agent, piloter des tâches de développement et gérer des pull requests. | Facultatif ; des side quests couvrent cette surface              | [GitHub Copilot app](https://github.com/features/ai/github-app)                                             |
| **Claude**                       | La famille de modèles d’IA d’Anthropic disponible dans certains contextes GitHub Copilot et agentic workflow.                                                                           | Les étapes qui utilisent un modèle non par défaut                | [Claude documentation](https://docs.anthropic.com/)                                                         |
| **OpenAI Codex**                 | La famille de modèles de code d’OpenAI utilisable dans des workflows de développement et d’agent.                                                                                       | Les étapes qui utilisent un modèle non par défaut                | [OpenAI Codex CLI repository](https://github.com/openai/codex#readme)                                       |

> [!NOTE]
> **Utilisateurs GitHub Enterprise (GHES/GHEC)** : les mêmes outils et commandes s’appliquent dans les environnements d’entreprise. Vos URLs GitHub peuvent utiliser le nom d’hôte de votre entreprise au lieu de `github.com`. Si votre entreprise utilise un self-hosted runner, la commande `gh aw compile` continue de s’exécuter localement sur votre machine. Consultez [l’étape 6](06-install-gh-aw.md) pour les notes d’installation propres à l’environnement.

### ✅ Vérifiez que vos outils sont prêts

Ouvrez un terminal sur votre machine et exécutez :

```bash
gh --version
git --version
```

Les deux commandes doivent afficher un numéro de version. Si l’une d’elles échoue, consultez [Configurer votre terminal local](02a-setup-codespace.md).

> [!NOTE]
> `gh aw --version` ne fonctionne qu’après avoir terminé [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md). Ignorez cette vérification jusqu’à l’étape 6.

Après avoir terminé l’étape 6, exécutez aussi :

```bash
gh aw --version
```

## Captures conceptuelles

Reconnaître l’apparence de chaque environnement à l’écran vous aide à vous orienter rapidement quand les instructions de l’atelier disent « ouvrir un terminal » ou « utiliser GitHub Copilot app ».

Ces visuels sont des modèles mentaux simplifiés, pas des captures produit littérales. Utilisez-les pour reconnaître à quoi renvoie chaque nom lorsqu’il apparaît dans les étapes suivantes.

### Environnements de développement

#### Visual Studio Code (VS Code)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-vscode-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-vscode-light.svg">
  <img alt="Capture conceptuelle de Visual Studio Code montrant l’Explorer, des onglets d’éditeur ouverts et un terminal intégré" src="images/side-quest-01-02-vscode-light.svg">
</picture>

Vous utilisez VS Code pour parcourir les fichiers, modifier des workflows et garder un terminal ouvert à côté de votre travail.

#### Terminal (command line)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-terminal-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-terminal-light.svg">
  <img alt="Capture conceptuelle d’un terminal montrant une invite, des commandes et leur sortie" src="images/side-quest-01-02-terminal-light.svg">
</picture>

Vous utilisez le terminal chaque fois que l’atelier vous demande d’exécuter des commandes `gh`, `gh aw` ou `git`.

### Outils de l’atelier et options de modèle

#### GitHub CLI (`gh`)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-gh-cli-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-gh-cli-light.svg">
  <img alt="Capture conceptuelle de GitHub CLI montrant des commandes d’authentification, de dépôt et de workflow dans un terminal" src="images/side-quest-01-02-gh-cli-light.svg">
</picture>

Vous utilisez `gh` pour les tâches terminal spécifiques à GitHub, comme les vérifications d’authentification, les raccourcis de dépôt et les commandes de workflow.

#### `gh-aw` CLI extension

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-gh-aw-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-gh-aw-light.svg">
  <img alt="Capture conceptuelle de l’extension gh-aw CLI montrant des commandes de compilation pour un agentic workflow" src="images/side-quest-01-02-gh-aw-light.svg">
</picture>

Vous utilisez `gh aw` pour compiler les fichiers d’agentic workflow.

#### GitHub Copilot CLI

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-copilot-cli-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-copilot-cli-light.svg">
  <img alt="Capture conceptuelle de GitHub Copilot CLI montrant une invite de terminal avec une aide aux commandes assistée par IA" src="images/side-quest-01-02-copilot-cli-light.svg">
</picture>

Vous utilisez GitHub Copilot CLI quand vous voulez de l’aide IA dans le terminal.

#### GitHub Copilot app

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-copilot-app-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-copilot-app-light.svg">
  <img alt="Capture conceptuelle de GitHub Copilot app montrant une session de dépôt, un chat d’agent et une vue de pull request" src="images/side-quest-01-02-copilot-app-light.svg">
</picture>

Vous utilisez GitHub Copilot app quand vous voulez démarrer et piloter des sessions de dépôt, gérer des tâches de développement et relire des pull requests depuis un espace de travail Copilot.

#### Claude

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-claude-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-claude-light.svg">
  <img alt="Capture conceptuelle d’un espace de travail de style Claude montrant un prompt, un chemin de raisonnement et une réponse structurée" src="images/side-quest-01-02-claude-light.svg">
</picture>

Vous pouvez voir Claude comme l’une des options de modèle d’IA capables de lire un brief, raisonner sur une tâche et produire une sortie.

#### OpenAI Codex

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-02-openai-codex-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-02-openai-codex-light.svg">
  <img alt="Capture conceptuelle d’un espace de travail de code de style OpenAI Codex montrant des fichiers de dépôt et un patch suggéré" src="images/side-quest-01-02-openai-codex-light.svg">
</picture>

Vous pouvez voir OpenAI Codex comme une option de modèle orientée code qui lit des fichiers et suggère des modifications.

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Vous savez nommer chaque environnement et outil utilisé dans cet atelier et décrire son rôle
- [ ] Vous avez exécuté `gh --version` dans votre terminal et obtenu un numéro de version
- [ ] Vous avez exécuté `git --version` dans votre terminal et obtenu un numéro de version
- [ ] Si vous avez terminé [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md) : vous avez exécuté `gh aw --version` et obtenu un numéro de version
- [ ] Vous savez associer chaque élément à sa capture conceptuelle
- [ ] Vous savez où trouver la documentation officielle de chaque outil
- [ ] (Utilisateurs Enterprise) Vous savez quelles URLs des instructions de l’atelier correspondent au nom d’hôte de votre entreprise

Quand vous avez terminé ici, revenez à [Ce qu’il vous faut avant de commencer](01-prerequisites.md).

<!-- /journey -->
