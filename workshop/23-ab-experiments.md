<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Testez vos idees de prompt avec des [A/B Experiments](https://github.github.com/gh-aw/experimental/experiments/)

> _Arrêtez de deviner quel prompt fonctionne le mieux ; laissez les exécutions alternées vous le montrer._

## 🎯 Ce que vous allez faire

Vous allez ajouter une expérience A/B avec `experiments:` et comparer les résultats d'une exécution à l'autre.

## 📋 Avant de commencer

- Vous disposez d'un workflow agentique fonctionnel issu des étapes de création ([Step 7](07-your-first-workflow.md) ou équivalent).
- Vous êtes à l'aise pour modifier le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) YAML et les briefs de tâche.
- Vous savez compiler un workflow grâce à [Side Quest: Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md).

## Ajouter une experience a votre workflow

> [!TIP]
>
> <details>
> <summary>Préférez demander à un agent utilisant la skill `/agentic-workflows` d'ajouter l'expérience. Utilisez des agents pour modifier des workflows d'agents.</summary>
>
> Les utilisateurs du terminal peuvent lancer `gh aw compile --watch` pour une recompilation continue.
>
> </details>

### Choisir une dimension à tester

Commencez par une seule modification afin d'isoler son effet : la longueur de sortie, `concise` contre `detailed`. Ajoutez une troisième variante plus tard.

### Utiliser un agent pour ajouter l'expérience (recommandé)

Dans votre agent IA, lancez ce prompt :

```prompt
Add an A/B experiment to `.github/workflows/daily-status.md`.
Use the `/agentic-workflows` skill.
Set `experiments: { output_style: [concise, detailed] }`.
Add conditional prompt blocks for `concise` and `detailed`.
Run `gh aw compile daily-status` and fix any errors.
Commit both workflow files.
```

### Ajouter l'expérience manuellement (alternative)

Si vous préférez éditer directement, ajoutez ceci au frontmatter de `.github/workflows/daily-status.md` :

```markdown .github/workflows/daily-status.md
---
experiments:
    output_style: [concise, detailed]
---
```

Sous le frontmatter, ajoutez des blocs conditionnels qui remplacent les instructions du prompt selon la variante active :

```markdown .github/workflows/daily-status.md
Summarise the activity in ${{ github.repository }} since yesterday.

{{#if experiments.output_style }}
Write according to the output_style: ${{ experiments.output_style }}.

- concise: maximum 5 bullet points, one sentence each.
- detailed: structured report with sections: open issues, merged pull requests,
  CI status, and a one-paragraph summary at the top.
  {{#endif}}

Always call the [safe output](https://github.github.com/gh-aw/reference/safe-outputs/) tool — even if there is no activity.
```

Compilez puis committez :

```bash
gh aw compile daily-status
git add .
git commit -m "feat: add output_style A/B experiment to daily-status"
```

## Exécuter et inspecter l'expérience

### Déclencher deux exécutions manuelles

1. Ouvrez **Actions → Daily Status Report → Run workflow** et cliquez sur **Run workflow**.
2. Une fois l'exécution terminée, ouvrez son journal. Dans le job d'activation, repérez la variante attribuée, par exemple `experiment output_style: concise`.
3. Vérifiez votre surface de safe output et confirmez que la sortie correspond à la variante concise.
4. Déclenchez une deuxième exécution manuelle. Cette fois, la variante `detailed` devrait être attribuée.
5. Comparez les deux sorties côte à côte.

### Comparer les comptes d'affectation via les [artifacts](https://github.github.com/gh-aw/reference/artifacts/)

1. Ouvrez votre première exécution, faites défiler jusqu'à **[Artifacts](https://github.github.com/gh-aw/reference/artifacts/)** et téléchargez `experiment`.
2. Ouvrez le fichier JSON et relevez les comptes pour `concise` et `detailed`.
3. Répétez l'opération pour votre deuxième exécution et comparez les deux fichiers.
4. Confirmez que les deux variantes ont maintenant chacune une affectation.

## Ajouter une troisième variante et prédire l'ordre

1. Update the frontmatter variants to include a third option:

```markdown .github/workflows/daily-status.md
---
experiments:
    output_style: [concise, detailed, executive]
---
```

1. Update the task brief so each variant has explicit instructions:

```markdown .github/workflows/daily-status.md
{{#if experiments.output_style }}
Write a report according to the output_style: ${{ experiments.output_style }}.

- concise: Write a maximum of 5 bullet points. Each bullet is one sentence.
- detailed: Write a structured report with sections: open issues, merged pull requests,
  and CI status. Include a one-paragraph summary at the top.
- executive: Write an executive summary with exactly 3 bullets and one "Watch next" line.
  {{#endif}}
```

1. En vous appuyant sur vos comptes confirmés de 1:1 pour `concise` et `detailed`, prédisez les trois prochaines affectations.
2. Lancez le workflow trois fois et comparez votre prédiction avec les journaux d'activation et les comptes `experiment`.

À chaque exécution, gh-aw choisit la variante ayant le plus faible nombre d'invocations jusque-là, avec départage par l'ordre d'apparition dans le tableau en cas d'égalité, puis enregistre les nouveaux comptes et les téléverse comme [artifact](https://github.github.com/gh-aw/reference/artifacts/) `experiment`.

> [!TIP]
> Vous voulez le mécanisme complet en cinq étapes et des tableaux de prédiction détaillés ? Consultez [Side Quest: How A/B Experiment Round-Robin Assignment Works](side-quest-23-01-ab-roundrobin.md).

## Analyser les résultats

Après un nombre d'exécutions suffisant, dix ou plus par variante pour réduire la variabilité, comparez l'utilité et le coût en tokens. Lorsqu'une variante l'emporte, conservez-la comme base. Supprimez alors le champ `experiments:` du frontmatter puis recompilez.

> [!TIP]
> Laissez l'expérience tourner jusqu'à atteindre votre taille d'échantillon cible. Supprimer `experiments:` trop tôt remet les comptes à zéro.

## ✅ Checkpoint

- [ ] Le frontmatter de votre workflow contient un bloc `experiments:` avec au moins deux variantes
- [ ] Votre brief de tâche utilise des blocs `{{#if experiments.<name> }}` pour permuter les instructions, la variante active étant disponible via `${{ experiments.<name> }}`
- [ ] `gh aw compile daily-status` passe sans erreur
- [ ] Le journal de la première exécution manuelle montre que la variante `concise` a été attribuée
- [ ] Le journal de la deuxième exécution manuelle montre que la variante `detailed` a été attribuée
- [ ] Vous savez comparer les comptes de l'artifact `experiment` d'une exécution à l'autre
- [ ] Vous savez prédire et vérifier l'ordre d'attribution d'une troisième variante à partir de la sélection du plus petit compte avec départage par l'ordre du tableau
- [ ] Vous pouvez expliquer ce que vous ferez une fois une variante gagnante identifiée

<!-- journey: all -->

**Suite :** [Executez votre workflow agentique sur un self-hosted runner](24-self-hosted-runners.md)

<!-- /journey -->
