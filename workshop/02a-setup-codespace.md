<!-- page-journey: local -->
<!-- page-adventure: setup -->

# Configurer votre terminal local

## 📋 Avant de commencer

- [ ] Vous avez un compte GitHub
- [ ] Votre compte peut créer des dépôts publics (le niveau gratuit convient)
- [ ] Vous voulez travailler depuis le terminal de votre machine locale

## 🎯 Ce que vous allez faire

Vous allez créer votre dépôt d’exercice, le cloner sur votre machine, puis vérifier que `git` et `gh` fonctionnent dans votre terminal local avant de passer à l’étape suivante.

Le parcours principal de cet atelier suppose désormais que vous travaillez en local.

## Étapes

Ces étapes prennent environ 5 minutes. Si vous bloquez sur une commande, [Side Quest: Terminal Basics](side-quest-01-01-terminal-basics.md) se lit en 2 minutes.

### Nouveau dépôt

1. Créez votre propre dépôt public sur [github.com/new](https://github.com/new) :

- Choisissez-vous comme propriétaire.
- Choisissez la visibilité **Private** ; il est préférable d’apprendre dans votre coin. Vous pourrez le rendre public plus tard si vous voulez partager votre travail.
- Nommez-le `my-agentic-workflows`.
- Cochez **Add a README file**.
- Cliquez sur **Create repository**.

### Créez et clonez votre dépôt

1. Ouvrez votre nouveau dépôt dans le navigateur.
2. Ouvrez ensuite un terminal sur votre machine.
3. Clonez le dépôt, puis placez-vous dedans :

```bash
gh repo clone my-agentic-workflows
cd my-agentic-workflows
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02a-open-codespace-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02a-open-codespace-light.svg">
  <img alt="Créer puis cloner le dépôt d’exercice" src="images/02a-open-codespace-light.svg">
</picture>

À partir de maintenant, gardez ce terminal ouvert pendant l’atelier. Toutes les commandes du parcours principal y seront exécutées.

<details open>
<summary>Le clonage ou l’authentification échoue ?</summary>

- **`gh repo clone` échoue avec un accès refusé** : exécutez d’abord `gh auth login`, puis recommencez.
- **Le dépôt existe déjà localement** : entrez simplement dans le dossier existant avec `cd my-agentic-workflows`.
- **Vous préférez utiliser HTTPS ou SSH manuellement** : clonez avec la méthode Git que vous utilisez déjà, puis revenez ici.

</details>

### Ouvrez votre terminal de travail

1. Gardez le terminal ouvert dans le dossier `my-agentic-workflows`.
2. Si vous utilisez VS Code en local, vous pouvez aussi ouvrir le dossier dans l’éditeur avec `code .`.
3. Vérifiez que l’invite de commande se trouve bien dans votre dépôt d’entraînement avant de continuer.

> [!TIP]
> Si `gh auth status` renvoie une erreur, exécutez `gh auth login` avant de continuer.

<details open>
<summary>Première fois dans un terminal ?</summary>

Tapez votre commande après l’invite `$`, puis appuyez sur Entrée. La sortie s’affiche en dessous ; une nouvelle invite `$` signifie que la commande est terminée. Consultez [Side Quest: Terminal Basics](side-quest-01-01-terminal-basics.md) pour plus de détails.

</details>

### Vérifiez que votre terminal local est prêt

Le schéma ci-dessous montre la connexion entre votre machine locale et GitHub.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/02a-codespace-architecture-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/02a-codespace-architecture-light.svg">
  <img alt="Architecture de l’environnement local : votre terminal et votre éditeur se connectent à GitHub depuis votre machine" src="images/02a-codespace-architecture-light.svg">
</picture>

1. Exécutez ces commandes dans votre terminal local :

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

- [ ] Vous avez cloné le dépôt `my-agentic-workflows` sur votre machine
- [ ] Votre terminal local est ouvert dans le dossier `my-agentic-workflows`
- [ ] `gh --version` renvoie la version 2.40.0 ou une version plus récente
- [ ] `gh auth status` confirme que vous êtes connecté à `github.com`
- [ ] Votre dépôt local `my-agentic-workflows` est prêt pour les étapes suivantes

<!-- journey: local -->

**Étape suivante :** [Introduction à GitHub Actions](04-github-actions-intro.md)

<!-- /journey -->
