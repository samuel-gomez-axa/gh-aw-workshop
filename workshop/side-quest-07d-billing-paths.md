# Side Quest : Parcours de facturation Copilot

Choisissez exactement un parcours de [billing](https://github.github.com/gh-aw/reference/billing/) pour votre premier workflow, configurez-le et validez le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) mis à jour.

## Référence rapide

| Situation                                                               | Parcours                                      | Réglage clé                                                                    |
| ----------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| L’organisation fournit une facturation Copilot centralisée pour Actions | **Facturation centralisée de l’organisation** | Conservez `copilot-requests: write` ; aucun secret nécessaire                  |
| Dépôt personnel, ou organisation sans facturation centralisée           | **Facturation personnelle**                   | Supprimez `copilot-requests: write` ; ajoutez le secret `COPILOT_GITHUB_TOKEN` |

Si vous ne savez pas lequel s’applique, demandez : « Is centralized Copilot billing for GitHub Actions enabled for this repository? » Si la réponse est « no » ou « I don't know », suivez **la facturation personnelle**.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/07d-billing-path-decision-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/07d-billing-path-decision-light.svg">
  <img alt="Flux de décision pour choisir un parcours de facturation Copilot : organization centralized billing ou personal billing" src="images/07d-billing-path-decision-light.svg">
</picture>

## Parcours A : facturation centralisée de l’organisation

Utilisez ce parcours lorsque l’organisation propriétaire du dépôt a activé la facturation Copilot centralisée pour GitHub Actions.

1. Demandez à l’administrateur de votre organisation de confirmer que la facturation centralisée est activée.
2. Ouvrez `daily-report-status.md` et vérifiez que le bloc `permissions:` inclut `copilot-requests: write` :

```markdown
---
permissions:
    contents: read
    copilot-requests: write
---
```

Cette ligne est déjà présente dans le template de Step 7. Ne la supprimez pas.

1. Aucun secret de dépôt n’est nécessaire.
1. Recompilez et validez :

```bash
gh aw compile
git add .
git commit -m "chore: confirm lock file is current" && git push
```

Si vous voyez `401 Unauthorized` dans le journal d’exécution, consultez [Méthode 1 : Permission de requêtes Copilot](side-quest-06-03a-copilot-requests-permission.md).

## Parcours B : facturation personnelle

Utilisez ce parcours pour un dépôt personnel, ou lorsque l’organisation propriétaire ne fournit pas de facturation Copilot centralisée.

> [!IMPORTANT]
> Lorsque `copilot-requests: write` est présent, le workflow ignore `COPILOT_GITHUB_TOKEN`. Supprimez cette ligne de [permission](https://github.github.com/gh-aw/reference/permissions/#special-permission-copilot-requests-write) avant d’ajouter le secret.

1. Ouvrez `daily-report-status.md` et supprimez `copilot-requests: write`.
2. Générez un fine-grained PAT avec **Copilot requests: Read-only** sur [github.com/settings/tokens](https://github.com/settings/tokens).
3. Dans votre dépôt, ouvrez **Settings** → **Secrets and variables** → **Actions**.
4. Ajoutez un secret de dépôt nommé `COPILOT_GITHUB_TOKEN` puis collez le PAT.
5. Recompilez et validez :

```bash
gh aw compile
git add .
git commit -m "chore: configure personal billing path" && git push
```

Pour un pas-à-pas navigateur uniquement, consultez [Méthode 2 (UI-only) : COPILOT_GITHUB_TOKEN](side-quest-06-03c-copilot-github-token-ui-only.md). Pour la configuration en terminal, consultez [Méthode 2 : secret COPILOT_GITHUB_TOKEN](side-quest-06-03b-copilot-github-token.md).

## Confirmer l’[engine](https://github.github.com/gh-aw/reference/engines/)

Ouvrez `daily-report-status.md` et vérifiez qu’il n’y a pas de ligne `engine:`. Le workflow utilise GitHub Copilot par défaut ; aucune clé Anthropic ou OpenAI n’est nécessaire pour cette première exécution.

Pour changer d’engine plus tard, consultez :

- [Side Quest: Configure an Anthropic API Key](side-quest-11-06-anthropic-key.md)
- [Side Quest: Configure an OpenAI API Key](side-quest-11-07-openai-key.md)

## ✅ Checkpoint

- [ ] J’ai choisi un parcours de facturation et terminé toutes les étapes de configuration
- [ ] `daily-report-status.md` reflète la méthode choisie
- [ ] `daily-report-status.lock.yml` est recompilé et validé sur `main`
- [ ] Je suis prêt à revenir à [Confirm Model Access](07d-confirm-model-access.md)

**Retour :** [Confirmer l’accès au modèle](07d-confirm-model-access.md)
