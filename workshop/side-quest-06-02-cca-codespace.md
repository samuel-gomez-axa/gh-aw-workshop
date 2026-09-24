<!-- page-journey: copilot -->
<!-- page-adventure: side-quest -->

# Side Quest : Utiliser `gh-aw` avec GitHub Copilot Cloud Agent

Utilisez cette side quest si vous travaillez dans le **[GitHub Copilot Cloud Agent](https://github.github.com/gh-aw/reference/copilot-cloud-agent/) (CCA)** et avez besoin d’un terminal pour les commandes `gh-aw`.

## Ce que vous allez faire

Vous allez ouvrir un GitHub Codespace depuis votre navigateur, vérifier l’accès à `gh`, installer `gh-aw`, puis revenir au parcours principal de l’atelier.

## Ouvrir un Codespace

Depuis [l’étape 6](06-install-gh-aw.md), sélectionnez le bouton Codespaces dans la
section **Open a Codespace first (GitHub Copilot Cloud Agent users)**.

Quand le Codespace a terminé de se charger :

1. Ouvrez l’onglet terminal.
2. Exécutez `gh auth status`.
3. Si nécessaire, exécutez `gh auth login` puis terminez la connexion dans le navigateur.

## Installer `gh-aw` dans le terminal du Codespace

Exécutez :

```bash
gh extension install github/gh-aw
```

S’il est déjà installé, exécutez :

```bash
gh extension upgrade github/gh-aw
```

Vérifiez ensuite :

```bash
gh aw --version
```

Si vous tombez sur une erreur d’installation HTTP 403 dans un Codespace appartenant à une organisation, utilisez
[Side Quest: Install `gh-aw` Troubleshooting](side-quest-06-01-install-troubleshooting.md#organization-codespace-token-limitation-http-403).

## Revenir à l’atelier principal

<!-- journey: copilot -->

Revenez à [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md), puis continuez vers [l’étape 7](07-your-first-workflow.md).

<!-- /journey -->

## ✅ Checkpoint

- [ ] Vous avez ouvert un Codespace depuis le navigateur
- [ ] `gh auth status` confirme que vous êtes connecté
- [ ] `gh aw --version` renvoie un numéro de version
- [ ] Vous êtes prêt à continuer à l’étape 7
