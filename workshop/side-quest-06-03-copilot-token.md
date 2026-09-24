<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Configurer l’authentification GitHub Copilot

> _Facultatif : suivez ce guide lorsque vous devez configurer l’[authentication](https://github.github.com/gh-aw/reference/auth/) de Copilot pour un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/#what-is-an-agentic-workflow), puis revenez à votre parcours principal._

## 📋 Avant de commencer

- Vous avez terminé [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md).
- Vous avez accès aux paramètres de votre dépôt (nécessaire si vous choisissez Method 2).

## Pourquoi l’[authentication](https://github.github.com/gh-aw/reference/auth/) est importante

[Agentic workflows](https://github.github.com/gh-aw/introduction/overview/) appellent l’API GitHub Copilot à l’exécution pour lancer des étapes de raisonnement IA. Sans identifiant valide, chaque appel renvoie `401 Unauthorized` et le workflow échoue immédiatement. Configurer l’authentication une seule fois, avant d’exécuter un workflow, garantit que votre agent peut joindre Copilot de manière fiable à chaque exécution future.

Si vous utilisez un terminal, privilégiez si possible les parcours guidés de configuration `gh-aw` :

- [`gh aw secrets bootstrap --engine copilot`](https://github.github.com/gh-aw/setup/cli/#secrets) après avoir choisi la facturation personnelle
- `gh aw add-wizard ...` when you are installing a curated workflow and want setup prompts inline

Utilisez les guides manuels ci-dessous lorsque vous avez besoin, ou préférez, la procédure détaillée dans le navigateur.

## Choisissez votre méthode

Choisissez la méthode adaptée à votre situation :

| Méthode                                                                                                           | Idéal pour                                                                            | Guide                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Permission de requêtes Copilot** (recommandé)                                                                   | Les organisations avec facturation Copilot centralisée activée pour Actions           | [Méthode 1 →](side-quest-06-03a-copilot-requests-permission.md)            |
| **Secret `COPILOT_GITHUB_TOKEN`**                                                                                 | La facturation personnelle, ou les organisations sans facturation Copilot centralisée | [Méthode 2 →](side-quest-06-03b-copilot-github-token.md)                   |
| **Secret [`COPILOT_GITHUB_TOKEN`](https://github.github.com/gh-aw/reference/auth/#copilotgithubtoken) (UI-only)** | Identique à la méthode 2, mais en utilisant uniquement l’interface web GitHub         | [Méthode 2 (UI-only) →](side-quest-06-03c-copilot-github-token-ui-only.md) |

Si vous avez un doute, vérifiez d’abord à qui appartient votre dépôt d’exercice :

- Organisation avec facturation Copilot centralisée → utilisez **Méthode 1**
- Dépôt personnel ou organisation sans facturation centralisée → utilisez **Méthode 2**

> [!IMPORTANT]
> Choisissez une seule méthode. Lorsque [`copilot-requests: write`](https://github.github.com/gh-aw/reference/permissions/#special-permission-copilot-requests-write) est présent, `COPILOT_GITHUB_TOKEN` est ignoré pour l’inférence. Supprimez cette permission et recompilez lors du passage à la facturation personnelle.

## ✅ Checkpoint

- [ ] J’ai identifié la méthode d’authentication adaptée à ma situation.
- [ ] J’ai terminé soit Method 1 soit Method 2 (en suivant le guide lié jusqu’au bout).
- [ ] Mon workflow source et son [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) compilé utilisent uniquement la méthode choisie.
- [ ] Je suis revenu à mon parcours principal de l’atelier.

<!-- journey: all -->

**Retour :** [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md) | [Écrire votre premier agentic workflow](07-your-first-workflow.md)

<!-- /journey -->
