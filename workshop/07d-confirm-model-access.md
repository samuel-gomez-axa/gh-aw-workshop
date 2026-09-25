<!-- page-journey: all -->
<!-- page-adventure: core -->

# Confirmer l’accès au modèle

## 📋 Avant de commencer

Cette étape a deux points d’entrée :

- **Arrivée depuis l’étape 07, en récupération d’erreur :** les fichiers de workflow n’ont pas encore besoin d’exister. Corrigez d’abord l’accès au modèle, puis revenez à [Write Your First Agentic Workflow](07-your-first-workflow.md).
- **Arrivée comme étape suivante après l’étape 07, dans le flux normal :** `daily-report-status.md` et `daily-report-status.lock.yml` sont commités dans votre dépôt d’entraînement.

## 🎯 Ce que vous allez faire

Vous allez exécuter un prompt de test d’une phrase, confirmer que Copilot est joignable, choisir votre mode de [billing](https://github.github.com/gh-aw/reference/billing/) et configurer le workflow avant de continuer vers [l’étape 8](08-run-your-workflow.md).

## Vérifiez l’accès au modèle

1. Dans le terminal déjà ouvert dans votre dépôt local, exécutez :

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

> [!IMPORTANT]
> Un token **COPILOT_GITHUB_TOKEN** est déjà présent sur le repo, celui-ci a été généré avec un compte gratuit.
> Pour cette raison, il faudra spécifier un **model** dans les workflows à créer explicitement.

> [!IMPORTANT]
> Voici la liste des modèles disponibles que vous pouvez spécifier dans vos workflows :
> gpt-4.1 claude-fable-5.1 claude-fable-5 claude-opus-4.7 claude-opus-4.8-fast claude-opus-4.8 claude-opus-5 claude-sonnet-5 copilot-search-a copilot-search-b copilot-search-c exec-agent-a exec-agent-b exec-agent-c gpt-5.4-mini gpt-5.4 gpt-5.5 gpt-5.6-luna gpt-5.6-sol gpt-5.6-terra gpt-5.6-luna-utility gpt-6-astra grok-4.5 grok-4.6 kimi-k2.7-code kimi-k3 mai-code-1.1-flash trajectory-compaction gpt-5-mini gpt-3.5-turbo gpt-3.5-turbo-0613 gpt-4o-mini gpt-4o-mini-2024-07-18 copilot-preview-4o-mini-a1cfd608 gpt-4 gpt-4-0613 copilot-preview-gpt4-centralus gpt-4o gpt-4o-2024-11-20 gpt-4o-2024-05-13 gpt-4-o-preview gpt-4o-japanwest copilot-preview-gpt4o-centralus gpt-4o-2024-08-06 claude-haiku-4.5 gpt-4.1-2025-04-14 goldeneye-secondary gpt-5.2 gpt-5.6-luna-free-auto
> (cette liste peut évoluer avec le temps, vérifiez régulièrement les mises à jour sur GitHub [ici](https://github.com/settings/copilot).)

Exemple :

```markdown .github/workflows/daily-report-status.md
---
name: Daily Report Status
engine:
    id: copilot
    model: gpt-4.1
...
---
```

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

## ✅ Checkpoint

- [ ] J’ai envoyé le prompt de test dans Copilot CLI et reçu une réponse
- [ ] J’ai confirmé qu’aucune erreur d’accès n’est apparue
- [ ] J’ai choisi un mode de facturation et terminé toutes les étapes de configuration
- [ ] Mon fichier source et mon lock file compilé reflètent la méthode choisie
- [ ] Les deux fichiers sont commités vers `main`
- [ ] Je suis prêt pour [Lancer et observer votre workflow](08-run-your-workflow.md)

<!-- journey: all -->

**Étape suivante :** [Lancer et observer votre workflow](08-run-your-workflow.md)

<!-- /journey -->

```

```
