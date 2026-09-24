<!-- page-journey: all -->
<!-- page-adventure: core -->

# Qu’est-ce qu’un Agentic Workflow ?

**Vous connaissez déjà GitHub Actions et les environnements d’exécution d’agents IA ?**

Avant de passer cette étape, vérifiez que vous savez déjà ceci :

- Vous pouvez décrire le rôle d’un [trigger](https://github.github.com/gh-aw/reference/triggers/) dans un workflow Actions
- Vous avez déjà travaillé avec des environnements d’exécution d’agents IA dans un contexte de production ou de CI/CD

Si les deux s’appliquent, [passez à Installer gh-aw](06-install-gh-aw.md).

## 📋 Avant de commencer

- Vous avez lu [Qu’est-ce que GitHub Actions ?](04-github-actions-intro.md)

Un [**Agentic Workflow**](https://github.github.com/gh-aw/introduction/overview/) est un task brief en langage clair qu’un agent IA exécute dans GitHub Actions. Vous écrivez ce que vous voulez, par exemple « résumer les issues ouvertes et publier un digest quotidien », puis l’agent lit votre dépôt, appelle des outils et publie automatiquement la sortie.

Imaginez un digest planifié : chaque matin, il lit votre boîte de réception et vous envoie un résumé, sans clavier. L’agent s’exécute toujours dans une [sandbox](https://github.github.com/gh-aw/reference/sandbox/) et publie les résultats via des safe outputs protégées par des garde-fous. Vous verrez l’aspect sécurité dans [Comment les Agentic Workflows restent sûrs](05b-agentic-workflows-security.md).

## Trois termes clés

| Terme                                                                   | Ce que cela signifie                                                          |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Trigger](https://github.github.com/gh-aw/reference/triggers/)          | L’événement ou le planning qui démarre le workflow                            |
| [Task brief](https://github.github.com/gh-aw/reference/markdown/)       | Les instructions en langage clair que vous écrivez pour l’agent               |
| [Safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/) | Les garde-fous qui contrôlent la manière dont le workflow réécrit vers GitHub |

Le schéma ci-dessous montre le rôle de chacun de ces termes lors de l’exécution du workflow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/05-three-terms-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/05-three-terms-light.svg">
  <img alt="Agentic workflow : trois termes clés en séquence. Un Trigger, de type schedule ou événement, démarre le workflow. Le Task Brief, rédigé en langage clair, guide l’agent IA lorsqu’il lit les données du dépôt et appelle des outils. Les Safe Outputs, c’est-à-dire des chemins d’écriture protégés par des garde-fous, contrôlent la manière dont les résultats sont renvoyés vers GitHub." src="images/05-three-terms-light.svg">
</picture>

Pour un glossaire complet, consultez [Side Quest: Agentic Workflows Deep Dive](side-quest-05-02-aw-deep-dive.md).

## La structure à deux fichiers

Avant d’étudier le schéma, notez votre prédiction : quels sont les deux fichiers concernés, et lequel est réellement exécuté par GitHub Actions ?

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/05-workflow-lifecycle-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/05-workflow-lifecycle-light.svg">
  <img alt="Cycle de vie d’un agentic workflow : un fichier Markdown avec YAML frontmatter et un task brief est compilé par gh aw compile en fichier lock.yml ; GitHub Actions le déclenche, exécute l’agent IA qui lit les données du dépôt et appelle des outils, puis produit une sortie structurée renvoyée vers GitHub" src="images/05-workflow-lifecycle-light.svg">
</picture>

- **`.md` source file** : contient le [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) avec le trigger, les permissions et le runner, ainsi que votre task brief en langage clair. C’est ce fichier que vous rédigez et modifiez.
- **`.lock.yml` compiled file** : [`gh aw compile`](https://github.github.com/gh-aw/reference/compilation-process/) le génère à partir du `.md`. C’est ce fichier que GitHub Actions exécute, pas le `.md`. Ne le modifiez jamais à la main.

**Activité 1 : identifiez les parties :** ouvrez n’importe quel fichier `.lock.yml` dans votre dépôt et trouvez la clé `on:`. C’est le trigger compilé issu de votre [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/).

```
# Example: open .github/workflows/my-workflow.lock.yml
# Find the "on:" key — that is your compiled trigger.
```

Vérifiez maintenant votre prédiction : avez-vous nommé les deux fichiers et identifié celui qu’Actions exécute (`.lock.yml`) ?

## Activité 2 : agentic ou standard ?

Le schéma ci-dessous montre comment un même trigger de type schedule peut mener à deux résultats très différents : l’un piloté par un YAML statique, l’autre par un agent IA avec des garde-fous de sécurité intégrés.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/00-actions-vs-agentic-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/00-actions-vs-agentic-light.svg">
  <img alt="Comparaison côte à côte entre un YAML GitHub Actions classique et un Agentic Workflow avec mise en avant des éléments de sécurité. Côté classique : un trigger schedule passe par des étapes YAML statiques et des scripts shell pour produire une sortie. Côté agentic : le même trigger passe par un task brief en langage clair avec une configuration de sécurité, incluant permissions, tools et safe-outputs, vers un agent IA isolé dans une sandbox qui applique un filtrage d’intégrité et des contraintes sans secrets, ne produisant une sortie que via des surfaces safe-output déclarées." src="images/00-actions-vs-agentic-light.svg">
</picture>

Lisez chaque tâche et décidez avant d’afficher la réponse.

**Tâche A :** Run lint and unit tests on every pull request, fail if any check exits non-zero.

<details>
<summary>Afficher la réponse de la tâche A</summary>

**Standard Actions workflow.** Chaque exécution suit les mêmes étapes fixes. Aucun jugement n’est nécessaire.

</details>

**Tâche B :** Each morning, read all open issues, decide which look most urgent, and post a short triage summary.

<details>
<summary>Afficher la réponse de la tâche B</summary>

**Agentic workflow.** L’agent lit des données en direct, exerce un jugement et compose un résumé différent à chaque exécution selon ce qu’il trouve.

</details>

## Activité 3 : rédigez un task brief

Rédigez un task brief d’une ou deux phrases pour cet objectif avant d’afficher l’exemple :

> Post a daily issue digest that summarizes newly opened issues and flags anything urgent.

```
Rédigez votre brief ici avant d’afficher l’exemple.
```

<details>
<summary>Afficher un exemple possible de brief</summary>

You are a repository triage assistant. Each day, review issues opened in the last 24 hours, summarize each in one sentence, flag potential blockers, and post one concise digest comment for maintainers.

</details>

Vérifiez votre brief à l’aide de ces trois critères :

- Inclut-il une **fenêtre temporelle** comme « dernières 24 heures » ?
- Spécifie-t-il le **format de sortie** comme un unique commentaire de digest ?
- Définit-il au moins un **signal de priorité** comme des blocages ?

Si l’une des réponses est non, révisez votre brief avant de continuer.

> [!TIP]
> Vous voulez des exemples annotés et davantage d’exercices ? Consultez [Side Quest: Agentic Workflows Deep Dive](side-quest-05-02-aw-deep-dive.md).

## ✅ Checkpoint

- [ ] Vous pouvez décrire en une phrase ce qu’est un agentic workflow
- [ ] Vous pouvez expliquer une différence entre un agentic workflow et un workflow Actions standard
- [ ] Vous connaissez les trois termes clés : trigger, task brief, safe outputs
- [ ] Vous savez que `gh aw compile` génère `.lock.yml` à partir du fichier source `.md`
- [ ] Vous avez identifié la clé `on:` dans un fichier compilé `.lock.yml`
- [ ] Votre task brief inclut une fenêtre temporelle, un format de sortie et un signal de priorité

<details open>
<summary>Vous hésitez encore ? Essayez ceci avant de continuer</summary>

Est-ce que `gh aw compile` change ce que fait l’agent au moment de l’exécution ? Décidez d’abord.

<details>
<summary>Afficher la réponse</summary>

Non. Compile convertit `.md` en `.lock.yml`. La sortie à l’exécution provient de votre task brief et de l’état en direct du dépôt.

</details>

</details>

<!-- journey: all -->

**Étape suivante :** [Comment les Agentic Workflows restent sûrs](05b-agentic-workflows-security.md)

<!-- /journey -->
