<!-- page-journey: all -->
<!-- page-adventure: advanced -->
<!--
<research-metadata>
  <focus>Skills in agentic workflows — the `skills:` frontmatter key, local `SKILL.md` knowledge files under `.github/skills/`, and the three authoring strategies (hint, fusion, inline) for injecting domain knowledge into a workflow prompt</focus>
  <sources>
    <source>https://github.github.com/gh-aw/llms.txt</source>
    <source>https://github.github.com/gh-aw/reference/frontmatter/#frontmatter-skills-skills</source>
    <source>https://github.github.com/gh-aw/reference/glossary/#frontmatter-skills-skills</source>
  </sources>
  <rationale>The existing curriculum (steps 1-28) teaches MCP tools, persistent memory, inline sub-agents, evals, cost controls, and orchestration — but no step introduces skills. Learners end up pasting the same domain conventions into every workflow brief instead of encoding them once in a reusable SKILL.md. Step 29 closes that gap with a concrete authoring exercise covering the frontmatter `skills:` key for installing external skills and the hint/fusion strategies for shaping how skill content reaches the prompt.</rationale>
</research-metadata>
-->

# Apprenez à votre agent des connaissances métier avec les skills

> _Écrivez vos conventions de domaine une seule fois dans un `SKILL.md`, et chaque workflow qui en a besoin pourra les réutiliser._

## 🎯 Ce que vous allez faire

Vous allez rédiger un `SKILL.md` local qui encode une convention de domaine reproductible, règle de nommage, checklist de revue ou format de données, puis le référencer depuis un workflow afin que l'agent applique cette connaissance sans que vous ayez à la répéter dans chaque brief. À la fin de cette étape, vous saurez quand laisser l'agent découvrir lui-même les skills, stratégie hint, et quand ne lui fournir que le fragment exact dont il a besoin, stratégie fusion.

## 📋 Avant de commencer

- Vous avez terminé [Orchestrate Multiple Agentic Workflows](28-orchestrate-workflows.md).
- Vous disposez d'au moins un workflow agentique fonctionnel que vous pouvez modifier puis recompiler.
- Vous savez compiler des workflows avec `gh aw compile` grâce à [Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md).

## Comprendre les skills

Une **skill** est un fichier de connaissance spécifique à un domaine, `SKILL.md`, stocké sous `skills/` ou `.github/skills/<name>/SKILL.md`. Contrairement à un ajustement ponctuel de prompt, une skill est écrite une fois puis réutilisée par tous les workflows qui ont besoin de la même convention : règle de labellisation d'issues, checklist de revue de code, schéma de données ou guide de style interne.

Votre dépôt contient déjà des skills dans `.github/skills/` qui alimentent son propre outillage. Regardez-en une :

```bash
cat .github/skills/agentic-workflows/SKILL.md
```

Remarquez la structure : un frontmatter YAML avec `name` et `description`, suivi de consignes en langage naturel que l'agent lit puis applique.

> 🤔 **Predict:** Pensez à une convention que vous réexpliquez sans cesse à votre agent d'un workflow à l'autre, format de message de commit, règle de labellisation, checklist. C'est une bonne candidate pour une skill.

## Étapes

### Installer des skills externes avec la clé `skills:` du frontmatter

Pour utiliser une skill maintenue ailleurs, ajoutez le tableau `skills:` au niveau racine du frontmatter de votre workflow. Le compilateur l'installe dans le job d'activation avant l'exécution de l'agent, sans étape manuelle `gh skill install` :

```yaml
skills:
    # Local development path, installed with --from-local
    - .github/skills/my-skill

    # External skill pinned to a commit SHA
    - owner/repo/skills/some-skill@801dca688564c529fa84f247f64472520d9ebe28
```

Les références externes doivent être épinglées à un commit SHA complet sur 40 caractères, ou à une référence non épinglée `owner/repo@`, auquel cas le compilateur émet un avertissement. Les chemins locaux comme `.github/skills/my-skill` sont destinés aux skills que vous rédigez et maintenez dans ce dépôt.

### Rédiger un [SKILL.md](https://github.github.com/gh-aw/reference/custom-agent-for-aw/) local

Choisissez une convention étroite issue de votre propre dépôt, par exemple "comment classifier une issue" ou "quels champs un rapport d'état doit contenir". Dans votre agent IA, lancez :

```prompt
/agentic-workflows create a skill at .github/skills/issue-triage/SKILL.md that
classifies incoming issues as bug, feature, or question, and lists the three
pieces of information a good bug report must include.
```

<details open>
<summary>🖥️ Terminal path — write the SKILL.md directly</summary>

Créez `.github/skills/issue-triage/SKILL.md` :

```markdown .github/skills/issue-triage/SKILL.md
---
name: issue-triage
description: Classify incoming issues and flag missing bug-report details.
---

# Issue Triage

Classify each issue as `bug`, `feature`, or `question` based on its title and body.

For issues classified as `bug`, confirm the body includes:

- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, version, or browser)

If any of these are missing, note which ones in your response.
```

</details>

### Choisir une strategie : hint ou fusion

Une fois la skill créée, décidez comment le prompt de votre workflow doit y faire référence. Il existe trois stratégies :

- **Hint** - laissez l'agent découvrir et sélectionner lui-même les fichiers `SKILL.md` pertinents à l'exécution. C'est le meilleur choix pour des ensembles de skills larges ou en croissance lorsque vous disposez d'un budget de contexte généreux.
- **Fusion** - ne référencez que le fragment exact de skill dont l'agent a besoin via un commentaire `<!-- gh-skill-fusion: path#anchor -->`. C'est idéal lorsque la tâche est étroite et bien définie et que vous voulez garder un prompt compact.
- **Inline** - intégrez directement le fragment de skill dans le fichier de workflow sous un titre `## skill: \`name\``. C'est le meilleur choix lorsque la skill est petite et spécifique à un seul workflow.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/29-skill-injection-strategies-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/29-skill-injection-strategies-light.svg">
  <img alt="Schéma montrant un fichier SKILL.md alimentant trois stratégies d'injection, hint, fusion et inline, qui convergent chacune vers le prompt de workflow lu par l'agent." src="images/29-skill-injection-strategies-light.svg">
</picture>

> 💡 **Side quest facultative :** Pour le tableau de décision complet, des exemples de code pour chaque stratégie et un exercice pratique, consultez [Skill Injection Strategies — Hint, Fusion, and Inline](side-quest-29-01-skill-injection-strategies.md).

### Brancher la skill dans un workflow et valider

Ajoutez la stratégie choisie à un vrai brief de workflow, puis compilez pour confirmer que la skill s'installe correctement et que le frontmatter est valide :

```bash
gh aw compile
```

Vérifiez dans le `.lock.yml` compilé l'étape d'activation qui installe votre skill, puis confirmez qu'aucun avertissement de compilation ne mentionne une référence de skill manquante ou non épinglée.

## ✅ Checkpoint

- [ ] Vous avez trouvé un `SKILL.md` existant dans ce dépôt et identifié son `name` et sa `description`
- [ ] Vous avez rédigé un `SKILL.md` local qui encode une convention métier concrète
- [ ] Vous pouvez expliquer la différence entre les stratégies hint et fusion, ainsi que le bon moment pour utiliser chacune
- [ ] Vous avez référencé votre skill depuis un workflow, via `skills:`, une instruction hint ou un commentaire de fusion
- [ ] `gh aw compile` a réussi sans avertissement de skill non épinglée

<!-- journey: all -->

Vous voulez choisir une autre branche depuis le hub de l'atelier ? Revenez à [Et maintenant ? Continuez à explorer](14-next-steps.md).

<!-- /journey -->
