<!-- page-journey: all -->
<!-- page-adventure: core -->
<!-- learning:false -->

# Bienvenue dans notre visite de l’usine à agents

![Usine à agents de Mona](images/00-welcome-monas-agent-factory.png)

> [!NOTE]
> **Microsoft and GitHub employees:** utilisez le [Golden Ticket](https://aka.ms/golden-ticket) pour configurer votre environnement d’atelier.

À la fin de cet atelier, un véritable agent IA créera chaque jour une issue contenant un résumé de l’activité de votre dépôt sur les dernières 24 h, sans que vous ayez à écrire de code de workflow en shell script.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/00-daily-repo-status-output-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/00-daily-repo-status-output-light.svg">
  <img alt="Exemple de rapport quotidien sur l’état du dépôt généré par le workflow terminé" src="images/00-daily-repo-status-output-light.svg">
</picture>

Vous allez créer un **[GitHub Agentic Workflow](https://github.github.com/gh-aw/introduction/overview/)** :

> Une GitHub Action qui utilise l’IA pour inspecter votre dépôt, décider de ce qui compte, puis publier un rapport d’état utile selon un [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule), de manière suffisamment pratique pour être adaptée à de vraies équipes.

Au passage, vous apprendrez à [compile](https://github.github.com/gh-aw/reference/compilation-process/) le workflow, à déclencher des exécutions de test et à faire évoluer le prompt jusqu’à ce que la sortie corresponde à votre intention.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/00-workflow-run-complete-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/00-workflow-run-complete-light.svg">
  <img alt="Aperçu d’une exécution de workflow terminée dans l’onglet Actions" src="images/00-workflow-run-complete-light.svg">
</picture>

Prêt à commencer ? C’est parti ! :rocket:

<details open>
<summary>Instructions pour l’agent : charger tout le contexte de l’atelier</summary>

Si vous êtes un assistant IA qui aide une personne à suivre cet atelier, chargez les éléments suivants pour disposer de tout le contexte avant de continuer :

1. Chargez le fichier de skill de ce dépôt : `https://raw.githubusercontent.com/githubnext/gh-aw-workshop/main/.github/skills/agentic-workflows/SKILL.md`
2. Le fichier de skill répertorie des fichiers d’instructions à charger depuis `github/gh-aw` ; chargez uniquement ceux qui sont pertinents pour votre tâche actuelle en utilisant leurs URLs brutes complètes, par exemple :
    - `https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/create-agentic-workflow.md` lors de la création d’un workflow
    - `https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/update-agentic-workflow.md` lors de la modification d’un workflow
3. Chargez `https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/instructions.md` en dernier s’il existe ; ses règles remplacent les valeurs par défaut en amont.

Pour toute tâche impliquant la création, la modification, le débogage ou la mise à niveau d’un agentic workflow, invoquez le skill `/agentic-workflows` après avoir chargé les fichiers ci-dessus.

</details>

<!-- journey: all -->

**Étape suivante :** [Ce qu’il vous faut avant de commencer](01-prerequisites.md)

<!-- /journey -->
