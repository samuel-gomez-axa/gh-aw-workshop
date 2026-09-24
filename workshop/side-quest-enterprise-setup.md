<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : considérations de configuration enterprise

> _Obligatoire pour les utilisateurs GHES avant de tenter de créer ou d’exécuter des [agentic workflows](https://github.github.com/gh-aw/introduction/overview/). Également utile si vous exécutez une étape de setup dans un environnement enterprise géré. Terminez ce guide, puis revenez à votre étape actuelle._

## 📋 Avant de commencer

- Vous avez un compte GitHub et vous savez si votre environnement est `github.com`, GitHub Enterprise Cloud, GHEC, ou GitHub Enterprise Server, GHES.
- Vous pouvez joindre votre administrateur GitHub Enterprise afin de confirmer la version de GHES et les réglages de politique.
- Vous avez commencé [Prerequisites](01-prerequisites.md) ou une étape de setup initiale qui vous a dirigé ici.

Utilisez cette quête annexe si votre environnement diffère des valeurs par défaut standard de `github.com`.

## Confirmer la version de GHES et la prise en charge des agentic workflows

Les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/#what-are-agentic-workflows) exigent **GHES 3.12 ou plus récent**. Sur des versions antérieures, la fonctionnalité [Copilot cloud agent](https://github.github.com/gh-aw/reference/copilot-cloud-agent/) est indisponible, quels que soient la licence ou les réglages de politique.

| Déploiement GitHub                         | Agentic workflows pris en charge ?                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **github.com**                             | ✅ Pleinement pris en charge                                                                        |
| **GitHub Enterprise Cloud (GHEC)**         | ✅ Pleinement pris en charge                                                                        |
| **GitHub Enterprise Server (GHES) 3.12+**  | ✅ Pris en charge lorsque Copilot Enterprise et l’accès réseau sont configurés par l’administrateur |
| **GitHub Enterprise Server (GHES) < 3.12** | :x: Non pris en charge, mise à niveau requise                                                       |

Avant de continuer :

1. Demandez à votre administrateur GitHub Enterprise de confirmer la version de GHES exécutée dans votre environnement.
2. Si votre instance est inférieure à 3.12, vous ne pouvez pas exécuter les agentic workflows en pratique. Vous pouvez suivre en mode lecture seule ou demander un compte `github.com` pour effectuer les étapes d’exécution.
3. Si votre instance est en 3.12 ou plus, poursuivez avec les sections ci-dessous pour confirmer les prérequis de terminal local, runner et accès au modèle.

## Confirmer la disponibilité de votre environnement local sur GHES ou via les politiques enterprise

Même avec un parcours local, certaines politiques enterprise influencent encore la façon dont vous authentifiez `gh`, installez `gh-aw` et exécutez vos workflows :

- **GHES:** votre administrateur peut imposer un nom d’hôte spécifique, un proxy sortant, ou des restrictions d’installation pour le CLI.
- **GHEC:** les politiques d’organisation peuvent restreindre l’usage de certaines extensions, secrets ou permissions GitHub Actions.

Avant de continuer :

1. Demandez à votre administrateur enterprise quel nom d’hôte, quel proxy et quelles politiques de poste de travail s’appliquent à votre dépôt.
2. Poursuivez ensuite avec [Configurer votre terminal local](02a-setup-codespace.md) ou, si vous voulez plus de détail, [Quête annexe : configurer votre terminal local](side-quest-02-01-local-terminal.md).
3. Utilisez le nom d’hôte de votre environnement enterprise dans toutes les commandes d’authentification et d’extensions `gh` lorsqu’il est requis, par exemple `gh auth login --hostname ghes.example.com`.
   Consultez [Quête annexe : dépannage de l’installation de `gh-aw`](side-quest-06-01-install-troubleshooting.md) pour la séquence complète de commandes avec nom d’hôte enterprise.

> 🤔 **Prédiction :** Recherchez le nom d’hôte de votre environnement enterprise avant de continuer. Après l’avoir confirmé, exécutez la commande suivante et vérifiez que la sortie affiche bien votre instance GHES :
>
> ```bash
> gh auth login --hostname <your-ghes-hostname>
> gh auth status
> ```

## Prérequis des [self-hosted runners](https://github.github.com/gh-aw/reference/self-hosted-runners/)

Si votre environnement enterprise exige des [self-hosted runners](https://github.github.com/gh-aw/reference/self-hosted-runners/) pour [GitHub Actions](https://docs.github.com/en/actions), confirmez les points suivants avant de continuer :

- un runner est enregistré et en ligne pour votre dépôt ou votre organisation ;
- le runner autorise les jobs de workflow provenant de votre dépôt ;
- si votre réseau utilise un proxy sortant, les réglages de proxy sont configurés pour les jobs du runner ;
- la sortie réseau autorise l’accès aux endpoints requis comme `github.com`, `api.github.com`, `raw.githubusercontent.com` et tous les endpoints de modèle ou MCP utilisés par votre workflow ;
- les secrets et permissions requis sont configurés pour l’exécution sur runner.

Si vous ne disposez pas encore de cet accès, demandez à votre administrateur de fournir une cible de runner prête à l’emploi avant de construire et d’exécuter des workflows.

## Exigences d’accès au modèle et de licence Copilot

Les agentic workflows exigent à la fois une exécution Actions et un accès au modèle :

- vous avez besoin d’un plan Copilot actif pris en charge par votre politique enterprise, Business ou Enterprise selon le cas ;
- confirmez que votre organisation et votre dépôt autorisent l’accès au modèle Copilot pendant les exécutions de workflow ;
- si l’accès au modèle est bloqué par une politique, les exécutions de workflow peuvent démarrer mais échoueront lorsque l’étape agent s’exécutera.

Avant d’installer `gh-aw`, vérifiez avec votre administrateur que votre compte et votre dépôt sont autorisés à exécuter des jobs de workflow propulsés par Copilot.

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Votre instance GHES est en version 3.12 ou plus récente, ou vous êtes sur `github.com` ou GHEC
- [ ] Vous connaissez les contraintes de terminal local et d’authentification dans votre environnement enterprise
- [ ] Vous savez si vous avez besoin d'un [self-hosted runner](https://github.github.com/gh-aw/reference/self-hosted-runners/) et qu'il est pret
- [ ] Vous avez confirmé avec votre administrateur que Copilot Enterprise et l’accès au modèle sont activés
- [ ] Vous êtes prêt à reprendre votre étape actuelle du workshop

Revenez à l’étape du workshop depuis laquelle vous avez ouvert cette quête annexe.
Les points de retour les plus courants sont [Prerequisites](01-prerequisites.md), [Configurer votre terminal local](02a-setup-codespace.md), [Quête annexe : configurer votre terminal local](side-quest-02-01-local-terminal.md) et [Que sont les agentic workflows ?](05-agentic-workflows-intro.md).

<!-- /journey -->
