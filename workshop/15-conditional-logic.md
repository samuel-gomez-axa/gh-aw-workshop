<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Rendez votre workflow plus malin avec une logique conditionnelle

> _Un workflow qui s'exécute en permanence est utile ; un workflow qui ne s'exécute que quand c'est pertinent est plus élégant._

## 🎯 Ce que vous allez faire

Ajoutez une vérification conditionnelle à votre workflow daily-status afin qu'il ne publie un résumé que lorsqu'il y a eu des commits récents. Vous allez apprendre à utiliser des commandes shell pour recueillir du contexte, exposer ce contexte comme sorties d'étape, puis le relier à une condition `if:` qui court-circuite complètement le job de l'agent les jours calmes.

## 📋 Avant de commencer

- Vous disposez d'un workflow daily-status fonctionnel issu de [Build: Daily Repo Status Workflow](07-your-first-workflow.md).
- Vous savez modifier et relancer un workflow grâce à [Refine, Test, and Improve Your Workflow](09-agentic-editing.md).

## Étapes

### Comprendre le problème

Votre workflow daily-status s'exécute actuellement chaque jour ouvrable, quelle que soit l'activité du dépôt, ce qui signifie qu'il peut produire des résumés vides ou presque vides comme "No activity to report" les jours calmes. Avec le temps, ces rapports creux diminuent la confiance dans l'outil, car les lecteurs apprennent à les ignorer. La logique conditionnelle règle ce problème en inspectant l'état du dépôt dans une étape shell [deterministic](https://github.github.com/gh-aw/patterns/deterministic-ops/) avant que tout traitement IA ne commence, puis en sautant entièrement le job de l'agent lorsque la précondition n'est pas satisfaite.

L'approche se décompose en trois parties :

1. Exécuter une commande shell pour compter les commits des 24 dernières heures et écrire le résultat dans `$GITHUB_OUTPUT`.
2. Référencer cette sortie avec l'expression de contexte `steps` `${{ steps.recent.outputs.commit_count }}`.
3. Ajouter une clé `if:` de premier niveau dans le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) du workflow afin d'ignorer le job de l'agent lorsque le compteur vaut zéro.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/15-conditional-flow-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/15-conditional-flow-light.svg">
  <img alt="Flux de logique conditionnelle : une étape shell écrit le nombre de commits dans GITHUB_OUTPUT, la condition if l'évalue, puis ignore ou exécute le job de l'agent" src="images/15-conditional-flow-light.svg">
</picture>

### Ajouter une étape de comptage des commits

Dans votre session Copilot CLI dans le terminal, collez :

```prompt
/agentic-workflows update .github/workflows/daily-status.md to add a shell step
that counts commits from the last 24 hours and writes the result to $GITHUB_OUTPUT
as `commit_count`, with step id `recent`.
```

La skill ajoute cette étape au bloc `steps:` du frontmatter puis recompile le lock file.

<details open>
<summary>✏️ Manual edit path</summary>

Ouvrez votre fichier de workflow daily-status, par exemple `.github/workflows/daily-status.md`, et ajoutez le bloc suivant dans le frontmatter YAML sous `steps:` :

```markdown .github/workflows/daily-status.md
---
steps:
    - name: Count recent commits
      id: recent
      run: |
          COUNT=$(git log --oneline --since="24 hours ago" | wc -l | tr -d ' ')
          echo "commit_count=$COUNT" >> $GITHUB_OUTPUT
---
```

Après l'avoir ajouté, lancez `gh aw compile` pour régénérer le lock file.

</details>

Voici la structure d'étape que la skill ajoutera :

```markdown .github/workflows/daily-status.md
---
steps:
    - name: Count recent commits
      id: recent
      run: |
          COUNT=$(git log --oneline --since="24 hours ago" | wc -l | tr -d ' ')
          echo "commit_count=$COUNT" >> $GITHUB_OUTPUT
---
```

Cette commande shell utilise `git log` avec un filtre temporel `--since` pour ne lister que les commits des 24 dernières heures, passe la sortie à `wc -l` pour compter les lignes, supprime les espaces superflus avec `tr -d ' '`, puis écrit l'entier final dans `$GITHUB_OUTPUT`, un fichier spécial de GitHub Actions qui partage des valeurs entre étapes au format `key=value`. Le champ `id: recent` est essentiel : il crée un emplacement nommé dans le contexte `steps`, ce qui permet de référencer la valeur comme `steps.recent.outputs.commit_count` dans des étapes ultérieures ou dans la condition `if:` de premier niveau.

> [!NOTE]
>
> <details>
> <summary>`$GITHUB_OUTPUT` rend les sorties d'étape disponibles pour les étapes suivantes sous la forme `steps.<id>.outputs.key`.</summary>
>
> Pour une explication plus détaillée de la façon dont le contexte `steps` fonctionne avec d'autres objets de contexte (`github`, `env`, `runner`), de l'utilisation des fonctions d'expression intégrées comme `contains()` et `toJSON()`, et de la façon d'enchaîner des conditions avec `&&` et `||`, consultez [Side Quest: GitHub Actions Expressions and Contexts](side-quest-15-01-expressions-and-contexts.md).
>
> </details>

### Ajouter une condition de premier niveau dans le frontmatter

Dans ce même bloc de frontmatter, ajoutez une clé `if:` au niveau supérieur, avec la même indentation que `on:` et `steps:` :

```markdown .github/workflows/daily-status.md
---
if: steps.recent.outputs.commit_count != '0'
---
```

Cette condition est intégrée dans le lock file généré pendant la [compilation](https://github.github.com/gh-aw/reference/compilation-process/) ; à l'exécution, GitHub Actions l'évalue et saute entièrement le job de l'agent dès que `commit_count` vaut `'0'`. Vous pouvez aussi référencer ce compte dans le texte de votre prompt pour donner au modèle un contexte concret ; par exemple, `"Summarise the last ${{ steps.recent.outputs.commit_count }} commits"` ancre l'analyse sur le nombre réel de changements, au lieu de laisser le modèle deviner le périmètre.

### Aller plus loin : enchaîner des conditions pour ignorer le week-end

Maintenant que la condition basée sur le nombre de commits est en place, vous pouvez étendre le workflow pour qu'il saute aussi les week-ends. Cet exercice renforce la manière de combiner plusieurs conditions dans une même expression `if:`.

> [!TIP]
> Consultez [Side Quest: Chaining Conditions — Run an Agent Only When Security Findings Exist](side-quest-15-02-chaining-conditions.md) pour un exercice guidé : ajoutez une étape qui compte les alertes Dependabot et combinez-la avec une vérification de branche afin que l'agent ne s'exécute que lorsqu'il y a de vrais constats à traiter.

### Committer et pousser votre logique conditionnelle

```bash
git add .
git commit -m "feat: skip summary on days with no commits"
git push
```

## ✅ Checkpoint

- [ ] Votre workflow contient une étape `count recent commits` avec `id: recent`
- [ ] Le frontmatter de votre workflow inclut `if: steps.recent.outputs.commit_count != '0'`
- [ ] Les deux fichiers `.github/workflows/daily-status.md` et `.github/workflows/daily-status.lock.yml` sont compilés, committés et poussés
- [ ] Vous avez déclenché le workflow manuellement et confirmé le comportement conditionnel dans le journal d'exécution
- [ ] Le workflow publie toujours un résumé les jours où il y a des commits

<!-- journey: all -->

**Suite :** [Connectez une source de donnees en direct a votre workflow](16-connect-data-source.md)

<!-- /journey -->
