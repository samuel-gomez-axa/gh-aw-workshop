<!-- page-journey: all -->
<!-- page-adventure: advanced -->
<!--
<research-metadata>
  <focus>Inline sub-agents — the `## agent: \`name\`` syntax in gh-aw that lets a workflow define specialised worker agents directly inside a single Markdown file, with per-agent `model:` overrides</focus>
  <sources>
    <source>https://github.github.com/gh-aw/llms.txt</source>
    <source>https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/subagents.md</source>
    <source>https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/token-optimization.md</source>
  </sources>
  <rationale>
    The existing curriculum covers MCP tools, shared workflow reuse, persistent memory, and conditional logic — but nothing on how to decompose a workflow into multiple agents within a single file. Learners who follow the full path end up with one monolithic prompt running on an expensive frontier model even for trivial per-item tasks. This step closes that gap by introducing the planner-worker pattern.
  </rationale>
</research-metadata>
-->

# Decoupez les workflows complexes avec des [Inline Sub-Agents](https://github.github.com/gh-aw/reference/inline-sub-agents/)

> _Un seul fichier de workflow, plusieurs agents spécialisés, chacun faisant exactement une chose, au bon coût._

## :dart: Ce que vous allez faire

Vous allez ajouter un sous-agent à votre workflow daily-status afin que l'agent parent reste concentré sur la planification et la rédaction finale, tandis qu'un sous-agent ciblé prend en charge une tâche répétitive. À la fin de cette étape, votre workflow sera plus facile à faire évoluer sans transformer l'ensemble du prompt en un brief long et répétitif.

## :clipboard: Avant de commencer

- Vous disposez d'un workflow agentique fonctionnel issu des étapes de création ([Step 7](07-your-first-workflow.md) ou équivalent).
- Vous comprenez le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) YAML depuis [Write Your First Agentic Workflow](07-your-first-workflow.md).
- Vous savez compiler un workflow grâce à [Side Quest: Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md).

## Comprendre la séparation entre agent parent et sous-agent

Lorsque votre workflow répète la même petite tâche sur de nombreux éléments, gardez l'agent parent concentré sur le plan global et la sortie finale. Déplacez le travail répétitif élément par élément vers un sous-agent.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/21-inline-sub-agents-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/21-inline-sub-agents-light.svg">
  <img alt="Modèle d'Inline Sub-Agent : l'agent parent planifie et délègue les tâches répétitives à des sous-agents, puis assemble la sortie finale" src="images/21-inline-sub-agents-light.svg">
</picture>

Un sous-agent est simplement un assistant que vous définissez dans le même fichier de workflow. Dans cette étape, vous n'avez besoin que d'une seule règle de syntaxe : commencez l'assistant par un titre de niveau 2 qui débute par `## agent:` et un nom entouré de backticks. Placez le brief de l'assistant sous ce titre. Si vous le souhaitez, ajoutez un court bloc de frontmatter avec des champs comme `description` ou `model`. Appelez ensuite cet assistant par son nom depuis le brief du workflow parent.

> :thinking: **Predict:** Regardez votre workflow actuel. Quelle instruction se répète une fois par issue, pull request ou fichier ? Gardez cette réponse en tête pour la section suivante.
>
> [!TIP]
> Vous voulez les règles complètes pour les noms, le frontmatter, les [model aliases](https://github.github.com/gh-aw/reference/engines/#available-coding-agents) et le positionnement des blocs ? Consultez [Side Quest: Sub-Agent Syntax Reference](side-quest-21-01-sub-agent-syntax.md). Restez sur cette page si vous ne voulez suivre que le parcours principal.

## Appliquer ce modèle à votre workflow

### Choisir une tâche répétitive

Ouvrez votre fichier de workflow et choisissez une tâche bien délimitée qui se répète pour chaque élément, comme résumer une issue ou classifier une pull request.

**Action :** Avant de modifier le fichier, choisissez ces deux éléments :

- le nom du sous-agent que vous voulez utiliser
- la mission en une phrase que ce sous-agent doit accomplir

### Ajouter un bloc de sous-agent

Dans votre agent IA, lancez ce prompt :

```prompt
/agentic-workflows update .github/workflows/daily-status.md to add an inline
sub-agent named `issue-summarizer` that reads one GitHub issue and returns a
one-sentence summary. Use model: small. Also update the parent brief to call
this sub-agent once per open issue and compile the summaries into a numbered list.
```

La skill ajoute le bloc de sous-agent en bas du fichier et met à jour le brief parent. Examinez le diff avant de commit.

Voici la syntaxe de sous-agent que la skill ajoutera :

```markdown .github/workflows/daily-status.md
## agent: `issue-summarizer`

---

description: Summarizes a single open issue in one sentence
model: small

---

Read the title and body of one GitHub issue. Return exactly one sentence
that explains what the issue is asking for and its current status.
```

Gardez le brief du sous-agent resserré. S'il traite un élément à la fois et renvoie un seul résultat, alors il a sa place ici.

<details open>
<summary>:desktop_computer: Terminal path</summary>

Après le brief de votre workflow parent, ajoutez en bas du fichier le bloc de sous-agent montré ci-dessus. Puis mettez à jour le brief parent pour l'appeler par son nom. Par exemple :

```markdown .github/workflows/daily-status.md
For each issue, use the `issue-summarizer` agent to produce a one-sentence summary.
```

Après avoir édité les deux, lancez `gh aw compile` pour régénérer le [lock file](https://github.github.com/gh-aw/reference/compilation-process/).

</details>

### Vérifier le diff et committer

La skill modifie en une seule étape le bloc du sous-agent et le brief parent. Examinez le diff, puis committez :

```bash
git add .
git commit -m "feat: add issue-summarizer sub-agent to daily-status"
git push
```

### Exécuter et vérifier

Déclenchez une exécution manuelle. Dans le journal Actions, vérifiez que l'agent parent appelle votre sous-agent puis utilise son résultat dans le résumé final.

## :white_check_mark: Checkpoint

- [ ] Vous avez identifié une tâche répétitive dans votre workflow qui se prête bien à un sous-agent
- [ ] Vous avez défini un nom de sous-agent et une mission en une phrase avant d'éditer le fichier
- [ ] Votre fichier de workflow inclut maintenant au moins un bloc `## agent: \`name\``
- [ ] Vous avez mis à jour le brief principal pour appeler le sous-agent par son nom
- [ ] Le lock file compilé a été mis à jour et committé avec la source du workflow
- [ ] Une exécution manuelle s'est terminée et le journal Actions a montré l'appel du sous-agent
- [ ] La sortie finale du workflow a utilisé le résultat du sous-agent

<!-- journey: all -->

**Suite :** [Rendez vos workflows resilients face aux erreurs](22-error-handling-and-resilience.md)

<!-- /journey -->
