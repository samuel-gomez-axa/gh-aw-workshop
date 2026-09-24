<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Méthode 1 — Permission de requêtes Copilot

> _Facultatif : utilisez cette méthode lorsque l’organisation propriétaire de votre dépôt d’exercice a activé la facturation Copilot centralisée pour GitHub Actions. Sinon, utilisez [la méthode PAT](side-quest-06-03b-copilot-github-token.md)._

## 📋 Avant de commencer

- Une organisation possède votre dépôt d’exercice.
- Un administrateur de l’organisation a confirmé que la facturation Copilot centralisée est activée pour GitHub Actions.
- Vous avez terminé [Side Quest : Configurer l’authentification GitHub Copilot](side-quest-06-03-copilot-token.md) et confirmé que la méthode 1 s’applique à votre dépôt.
- Votre dépôt d’exercice a été créé pendant [la configuration du Codespace](02a-setup-codespace.md) ou dans la [side quest facultative du terminal local](side-quest-02-01-local-terminal.md).

C’est la manière la plus simple de donner à votre [agentic workflow](https://github.github.com/gh-aw/introduction/overview/) l’accès à l’API Copilot lorsque l’organisation peut facturer les requêtes Copilot via le token d’exécution du workflow. GitHub Actions émet déjà un token de courte durée à chaque exécution ; vous devez simplement lui accorder la permission [`copilot-requests: write`](https://github.github.com/gh-aw/reference/permissions/#special-permission-copilot-requests-write).

Cela ne couvre **pas** les dépôts personnels ni les organisations sans facturation centralisée. Dans ces cas, utilisez `COPILOT_GITHUB_TOKEN` avec [la méthode 2](side-quest-06-03b-copilot-github-token.md).

## Vérifiez que cette méthode correspond à votre dépôt

Si vous n’avez pas encore confirmé le réglage de facturation, demandez à l’administrateur de votre organisation avant de choisir cette méthode.

- Continuez avec la méthode 1 si une organisation possède le dépôt et que son administrateur a confirmé l’activation de la facturation Copilot centralisée.
- Arrêtez-vous ici et basculez vers [la méthode PAT](side-quest-06-03b-copilot-github-token.md) pour un dépôt personnel ou une organisation sans facturation centralisée.

## Ajoutez la permission à votre workflow

Ouvrez votre fichier de workflow `.md` et ajoutez `copilot-requests: write` sous le bloc `permissions` dans le [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) :

```markdown
---
name: my-workflow
on:
    workflow_dispatch:
permissions:
    contents: read
    copilot-requests: write # grants Copilot API access — no secret needed
---
```

Cette seule ligne est la seule modification d’[authentication](https://github.github.com/gh-aw/reference/auth/) du workflow requise pour les dépôts pouvant utiliser Method 1. Recompilez et validez le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) après avoir modifié le workflow source.

## Dépannage

<details open>
<summary>Pannes courantes et corrections</summary>

| Panne                                                                                                     | Ce que vous voyez                                                                                 | Correction                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| L’organisation n’a pas de facturation Copilot centralisée                                                 | `401 Unauthorized` ou échecs d’auth Copilot répétés même si `copilot-requests: write` est présent | Basculez vers [la méthode 2](side-quest-06-03b-copilot-github-token.md)                                          |
| `copilot-requests: write` absent du [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) | `401 Unauthorized` dans le journal d’exécution                                                    | Ajoutez `copilot-requests: write` sous `permissions` dans votre fichier de workflow `.md`                        |
| Aucun abonnement Copilot actif                                                                            | `403 Forbidden` ou "Copilot not available"                                                        | Ouvrez [github.com/settings/copilot](https://github.com/settings/copilot) et vérifiez qu’un plan est listé       |
| Une politique d’organisation bloque l’accès à Copilot                                                     | `403 Forbidden`                                                                                   | Demandez à l’administrateur GitHub de votre organisation d’activer l’accès aux modèles Copilot pour votre compte |

Suivez ces vérifications dans l’ordre si l’exécution échoue encore :

1. Vérifiez que l’organisation propriétaire a une facturation Copilot centralisée. Sinon, basculez vers [la méthode 2](side-quest-06-03b-copilot-github-token.md).
2. Ouvrez votre fichier de workflow `.md` et vérifiez que `copilot-requests: write` est présent sous `permissions`.
3. Vérifiez que l’accès Copilot associé à ce dépôt est actif.
4. Si vous êtes dans une organisation gérée en environnement enterprise, vérifiez que la politique Copilot de l’organisation autorise les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/) ; voir [Side Quest: Enterprise Setup Considerations](side-quest-enterprise-setup.md).

</details>

## ✅ Checkpoint

- [ ] J’ai confirmé que l’organisation propriétaire a activé la facturation Copilot centralisée
- [ ] `copilot-requests: write` est présent sous `permissions` dans le frontmatter de mon workflow
- [ ] J’ai recompilé et validé le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) correspondant
- [ ] Je n’ai pas eu besoin de créer de secret de dépôt

<!-- journey: all -->

**Retour :** [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md) | [Écrire votre premier agentic workflow](07-your-first-workflow.md) | [Retour à la vue d’ensemble de l’authentification](side-quest-06-03-copilot-token.md)

<!-- /journey -->
