<!-- page-journey: all -->
<!-- page-adventure: core -->

# Confirmer l’accès au modèle

## :clipboard: Avant de commencer

Cette étape a deux points d’entrée :

- **Arrivée depuis l’étape 07, en récupération d’erreur :** les fichiers de workflow n’ont pas encore besoin d’exister. Corrigez d’abord l’accès au modèle, puis revenez à [Write Your First Agentic Workflow](07-your-first-workflow.md).
- **Arrivée comme étape suivante après l’étape 07, dans le flux normal :** `daily-report-status.md` et `daily-report-status.lock.yml` sont commités dans votre dépôt d’entraînement.

## :dart: Ce que vous allez faire

Vous allez exécuter un prompt de test d’une phrase, confirmer que Copilot est joignable, choisir votre mode de [billing](https://github.github.com/gh-aw/reference/billing/) et configurer le workflow avant de continuer vers [l’étape 8](08-run-your-workflow.md).

## Vérifiez l’accès au modèle

1. Dans le terminal déjà ouvert dans votre Codespace, exécutez :

```bash
gh copilot
```

1. Envoyez ce prompt :

```prompt
/agentic-workflows what trigger does a scheduled workflow use?
```

1. Toute réponse confirme que le modèle et le skill sont accessibles. Continuez vers **Choisissez un mode de facturation**.

> [!IMPORTANT]
> Si vous voyez une erreur au lieu d’une réponse, vérifiez sur [github.com/settings/copilot](https://github.com/settings/copilot) que Copilot est activé. Si le problème persiste, consultez [Side Quest: Configure GitHub Copilot for Agentic Workflows](side-quest-06-03-copilot-token.md), puis revenez ici.

Si vous arrivez du contrôle d’accès de l’étape 07 et que le prompt de test a réussi, retournez maintenant à [Write Your First Agentic Workflow](07-your-first-workflow.md).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/07d-preflight-troubleshoot-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/07d-preflight-troubleshoot-light.svg">
  <img alt="Arbre de décision de dépannage avant départ : envoyez un prompt de test, puis suivez les branches YES ou NO pour soit continuer l’atelier, soit corriger l’accès au modèle" src="images/07d-preflight-troubleshoot-light.svg">
</picture>

## Choisissez un mode de facturation

> [!NOTE]
> Pour les ateliers golden-ticket, la facturation est préconfigurée par votre organisation. Utilisez le chemin **Organization centralized billing**, sauf indication contraire de votre formateur.

Suivez toutes les étapes de configuration dans [Side Quest: Copilot Billing Paths](side-quest-07d-billing-paths.md), puis revenez ici une fois votre fichier de workflow et votre [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) commités.

## :white_check_mark: Checkpoint

- [ ] J’ai envoyé le prompt de test dans Copilot CLI et reçu une réponse
- [ ] J’ai confirmé qu’aucune erreur d’accès n’est apparue
- [ ] J’ai choisi un mode de facturation et terminé toutes les étapes de configuration
- [ ] Mon fichier source et mon lock file compilé reflètent la méthode choisie
- [ ] Les deux fichiers sont commités vers `main`
- [ ] Je suis prêt pour [Lancer et observer votre workflow](08-run-your-workflow.md)

<!-- journey: all -->

**Étape suivante :** [Lancer et observer votre workflow](08-run-your-workflow.md)

<!-- /journey -->
