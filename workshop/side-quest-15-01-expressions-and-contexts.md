<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Expressions Et Contextes GitHub Actions

> _La syntaxe `${{ }}` déverrouille tout un langage dans votre workflow : apprenez à la lire et vous pourrez créer des workflows qui s'adaptent à tout._

## 🎯 Ce Que Vous Allez Faire

Explorez le système d'expressions et de contextes qui alimente les conditions GitHub Actions, les références de sortie et les valeurs dynamiques. À la fin, la syntaxe de type `${{ steps.recent.outputs.commit_count }}` dans votre workflow conditionnel vous semblera naturelle.

## 📋 Avant De Commencer

- Vous avez terminé [Make Your Workflow Smarter with Conditional Logic](15-conditional-logic.md).

## Étapes

### Comprendre La Syntaxe Des Expressions

N'importe où dans un fichier YAML [GitHub Actions](https://github.github.com/gh-aw/introduction/how-they-work/), vous pouvez intégrer une valeur dynamique à l'aide de doubles accolades :

```markdown
${{ <expression> }}
```

Une **expression** est un mini-langage. Elle peut référencer des objets de contexte, comparer des valeurs, appeler des fonctions intégrées et les combiner avec des opérateurs. GitHub évalue l'expression à l'exécution et remplace le résultat avant d'exécuter l'étape.

### Connaître Vos Contextes

Un **contexte** est un objet nommé que GitHub Actions remplit automatiquement. Voici ceux que vous utiliserez le plus souvent :

| Contexte             | Ce qu'il contient                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `github`             | Métadonnées d'événement : nom du dépôt, branche, SHA de commit, acteur                                                                            |
| `steps.<id>.outputs` | Sorties écrites par une étape précédente à l'aide de [`$GITHUB_OUTPUT`](https://github.github.com/gh-aw/reference/steps-jobs/#custom-steps-steps) |
| `env`                | [Variables d'environnement](https://github.github.com/gh-aw/reference/environment-variables/) définies dans le workflow ou l'étape                |
| `secrets`            | [Secrets](https://github.github.com/gh-aw/reference/environment-variables/#mcp-server-with-secrets) du dépôt ou de l'organisation                 |
| `runner`             | Informations sur l'OS du runner et son répertoire temporaire                                                                                      |
| `job`                | Statut du job courant                                                                                                                             |

Vous pouvez lire une valeur de contexte partout où une expression est autorisée :

```markdown
run: echo "Running on ${{ runner.os }}"
```

```markdown
---
if: github.event_name == 'workflow_dispatch'
---
```

> [!TIP]
>
> <details>
> <summary>Vous pouvez voir le contenu complet de chaque contexte en ajoutant une étape de debug :</summary>
>
> ```markdown
> - name: Dump contexts
>   run: echo '${{ toJSON(github) }}'
> ```
>
> </details>

### Utiliser Les Sorties Entre Les Étapes

Lorsqu'une étape écrit une valeur dans `$GITHUB_OUTPUT`, les étapes suivantes peuvent la lire via le contexte `steps` :

```markdown
---
steps:
    - name: Produce a value
      id: my-step
      run: echo "result=hello" >> $GITHUB_OUTPUT

    - name: Use that value
      run: echo "Got ${{ steps.my-step.outputs.result }}"
---
```

Le champ `id:` sert de clé. Sans lui, le contexte `steps` n'a aucun nom à rechercher.

### Écrire Des Conditions Lisibles

La clé `if:` accepte n'importe quelle expression. Elle est évaluée en booléen : si le résultat est faux, l'étape, ou le job, est ignoré.

Patterns courants :

```markdown
---
# Run only on push to main
if: github.ref == 'refs/heads/main'

# Run only when a previous step succeeded
if: steps.build.outputs.exit_code == '0'

# Skip on pull requests from forks
if: github.event.pull_request.head.repo.full_name == github.repository

# Combine with AND / OR
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
---
```

> [!NOTE]
> Les valeurs provenant de `$GITHUB_OUTPUT` sont toujours des chaînes. Comparez-les avec des guillemets : `== '0'`, pas `== 0`.

### Utiliser Les Fonctions Intégrées

GitHub Actions fournit un petit ensemble de fonctions utilitaires dans les expressions :

| Fonction                     | Ce qu'elle fait                                    |
| ---------------------------- | -------------------------------------------------- |
| `toJSON(value)`              | Sérialise n'importe quel contexte en chaîne JSON   |
| `fromJSON(string)`           | Analyse une chaîne JSON en objet                   |
| `contains(haystack, needle)` | Vrai si la chaîne ou le tableau contient la valeur |
| `startsWith(string, prefix)` | Vrai si la chaîne commence par le préfixe          |
| `endsWith(string, suffix)`   | Vrai si la chaîne se termine par le suffixe        |
| `format(template, …)`        | Interpolation de chaîne                            |

Exemple : vérifier si un message de commit contient un mot-clé :

```markdown
---
if: contains(github.event.head_commit.message, '[skip ci]')
---
```

> [!NOTE]
> Les expressions sont évaluées sur le runner GitHub Actions, pas à l'intérieur de l'agent IA. Utilisez-les pour le contrôle de flux du workflow, pas pour façonner le prompt IA à l'exécution. Passez plutôt les valeurs au prompt via des variables d'environnement dans votre brief.

### Combiner Plusieurs Conditions

Les opérateurs `&&` et `||` vous permettent de construire des conditions composites qui expriment des règles plus nuancées qu'une simple comparaison. Quand vous combinez plusieurs sorties issues du shell, gardez à l'esprit que toutes les valeurs écrites dans `$GITHUB_OUTPUT` arrivent sous forme de chaînes ; comparez-les donc toujours à des littéraux entre guillemets.

```markdown
---
# Run only when there are commits AND the branch is main
if: steps.recent.outputs.commit_count != '0' && github.ref == 'refs/heads/main'

# Run when triggered manually OR there are recent commits
if: github.event_name == 'workflow_dispatch' || steps.recent.outputs.commit_count != '0'

# Skip weekends by combining day-of-week outputs from a shell step
if: steps.day.outputs.day != 'Saturday' && steps.day.outputs.day != 'Sunday'
---
```

### Collecter Un Contexte Temporel Avec Des Étapes Shell

Certaines conditions nécessitent des informations indisponibles dans les objets de contexte, par exemple le jour actuel de la semaine ou le nombre de commits depuis un certain timestamp. Vous pouvez capturer ces données dans une étape shell dédiée puis les référencer comme n'importe quelle autre sortie.

Une étape qui expose le nom du jour courant :

```markdown
- name: Check day of week
  id: day
  run: echo "day=$(date +%A)" >> $GITHUB_OUTPUT
```

Une fois cette étape exécutée, `steps.day.outputs.day` contient une valeur comme `Monday` ou `Saturday`. Combinez-la avec une vérification du nombre de commits pour construire une condition qui ignore le job d'agent à la fois les jours calmes et le week-end :

```markdown
---
if: steps.recent.outputs.commit_count != '0' && steps.day.outputs.day != 'Saturday' && steps.day.outputs.day != 'Sunday'
---
```

Ce pattern, une étape shell déterministe produit une sortie chaîne et l'expression `if:` lit cette sortie, s'applique largement partout où vous avez besoin d'un contrôle de flux de workflow basé sur des données qui ne sont pas déjà présentes dans un objet de contexte GitHub Actions.

## ✅ Checkpoint

- [ ] Vous pouvez expliquer ce que fait `${{ }}` et à quel moment GitHub l'évalue
- [ ] Vous pouvez nommer au moins trois objets de contexte et ce qu'ils contiennent
- [ ] Vous comprenez comment `id:` relie la sortie d'une étape au contexte `steps`
- [ ] Vous pouvez écrire une condition `if:` qui ignore une étape en fonction d'une sortie précédente
- [ ] Vous pouvez combiner deux conditions ou plus avec `&&` et `||`
- [ ] Vous pouvez écrire une étape shell qui capture des données temporelles, jour de la semaine, date, comme sortie d'étape

<!-- journey: all -->

**Suite :** [Connecter une source de données réelle à votre workflow](16-connect-data-source.md)

<!-- /journey -->
