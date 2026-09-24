<!-- page-journey: codespace -->
<!-- page-adventure: setup -->

# Configurer un Codespace

## 📋 Avant de commencer

- [ ] Vous avez un compte GitHub avec accès à GitHub Codespaces
- [ ] Votre compte peut créer des dépôts publics (le niveau gratuit convient)
- [ ] Vous voulez un terminal dans le navigateur et n’avez pas besoin d’installer d’outils localement

> [!TIP]
> Vous ne savez pas si votre offre inclut Codespaces ? Les comptes GitHub gratuits incluent 60 heures par mois. Vérifiez vos [paramètres de facturation](https://github.com/settings/billing/summary) ou demandez à l’administrateur de votre organisation.

## 🎯 Ce que vous allez faire

Vous allez lancer un GitHub Codespace pour cet atelier, ouvrir le terminal intégré et arriver dans un environnement prêt à l’emploi pour l’étape suivante.

Codespaces est l’environnement recommandé pour cet atelier et le chemin utilisé tout au long des étapes principales.

## Étapes

Ces étapes prennent environ 5 minutes. Si vous bloquez sur une commande, [Side Quest: Terminal Basics](side-quest-01-01-terminal-basics.md) se lit en 2 minutes.

### Nouveau dépôt

1. Créez votre propre dépôt public sur [github.com/new](https://github.com/new) :

- Choisissez-vous comme propriétaire.
- Choisissez la visibilité **Private** ; il est préférable d’apprendre dans votre coin. Vous pourrez le rendre public plus tard si vous voulez partager votre travail.
- Nommez-le `my-agentic-workflows`.
- Cochez **Add a README file**.
- Cliquez sur **Create repository**.

### Ouvrez le Codespace

1. Dans votre nouveau dépôt, cliquez sur le bouton vert **Code**.
2. Cliquez sur l’onglet **Codespaces**.
    - Laissez **main** sélectionné comme branche.
    - Cliquez sur **Create codespace on main**.
    - Attendez 30 à 60 secondes pendant que GitHub prépare le conteneur.
3. Le Codespace s’ouvre dans un nouvel onglet du navigateur avec un éditeur de style VS Code. Laissez cet onglet ouvert pour le reste de l’atelier.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02a-open-codespace-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02a-open-codespace-light.svg">
  <img alt="Ouvrir le Codespace" src="images/02a-open-codespace-light.svg">
</picture>

Codespaces enregistre automatiquement votre travail. Si vous fermez l’onglet, ouvrez [github.com/codespaces](https://github.com/codespaces) pour reprendre là où vous vous êtes arrêté.

<details open>
<summary>Le Codespace n’apparaît pas ou prend trop de temps ?</summary>

- **"Create codespace on main" est grisé** : votre compte n’a peut-être pas Codespaces activé. Vérifiez les détails de votre offre GitHub ou demandez à l’administrateur de votre organisation.
- **L’indicateur de chargement tourne plus de 3 minutes** : actualisez l’onglet du navigateur. Si cela reste bloqué, allez sur [github.com/codespaces](https://github.com/codespaces), trouvez le Codespace en attente, cliquez sur **⋯ → Delete** et réessayez.
- **"Codespace storage limit reached"** : vous avez peut-être déjà des Codespaces qui utilisent votre quota. Rendez-vous sur [github.com/codespaces](https://github.com/codespaces), supprimez ceux dont vous n’avez plus besoin, puis réessayez.
- **VS Code desktop s’ouvre au lieu du navigateur** : consultez [Side Quest: Install Local](side-quest-06-04-install-local.md) si vous préférez cette option, ou cliquez sur **Open in Browser** pour continuer ici.

</details>

### Ouvrez le terminal du Codespace

1. Une fois l’éditeur du Codespace chargé, ouvrez le terminal intégré avec **Ctrl+\`** (ou **Cmd+Option+\`** sur Mac).
2. Attendez que l’invite du terminal apparaisse.
3. Gardez ce terminal ouvert. Il se trouve déjà dans votre dépôt d’entraînement.

> [!TIP]
> Si le terminal de votre Codespace affiche une invite `$`, le conteneur est prêt. Si vous voyez une erreur de permission en exécutant `gh auth status`, essayez `gh auth login` pour vous authentifier.

<details open>
<summary>Première fois dans un terminal ?</summary>

Tapez votre commande après l’invite `$`, puis appuyez sur Entrée. La sortie s’affiche en dessous ; une nouvelle invite `$` signifie que la commande est terminée. Consultez [Side Quest: Terminal Basics](side-quest-01-01-terminal-basics.md) pour plus de détails.

</details>

### Vérifiez que votre Codespace est prêt

Le schéma ci-dessous montre la connexion entre votre Codespace et GitHub.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02a-codespace-architecture-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02a-codespace-architecture-light.svg">
  <img alt="Architecture de l’environnement Codespace : votre navigateur se connecte à un conteneur cloud avec des outils préinstallés, qui communique avec GitHub" src="images/02a-codespace-architecture-light.svg">
</picture>

1. Exécutez ces commandes dans le terminal du Codespace :

```bash
gh --version
gh auth status
```

1. Vérifiez que `gh --version` affiche `gh version 2.40.0` ou une version plus récente.
2. Vérifiez que `gh auth status` indique que vous êtes connecté à `github.com`.

_Voici à quoi ressemble une réussite :_

```text
gh version 2.40.0 (2024-01-01)
...
github.com
  ✓ Logged in to github.com as <your-username>
```

## ✅ Checkpoint

- [ ] Vous avez confirmé que votre offre GitHub inclut l’accès à Codespaces (le niveau gratuit inclut 60 heures par mois)
- [ ] L’éditeur du Codespace est ouvert dans votre navigateur
- [ ] Le terminal intégré est ouvert dans votre Codespace
- [ ] `gh --version` renvoie la version 2.40.0 ou une version plus récente
- [ ] `gh auth status` confirme que vous êtes connecté à `github.com`
- [ ] Le Codespace est rattaché à votre dépôt d’entraînement `my-agentic-workflows`

<!-- journey: codespace -->

**Étape suivante :** [Introduction à GitHub Actions](04-github-actions-intro.md)

<!-- /journey -->
