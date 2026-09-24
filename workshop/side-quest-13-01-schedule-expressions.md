<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Expressions De Schedule Floues

> _Facultatif : utilisez cette référence rapide si vous voulez de l'aide pour choisir une expression de schedule pour [Affiner, tester et améliorer votre workflow](09-agentic-editing.md), puis revenez à l'aventure principale._

## 📋 Avant De Commencer

- Vous avez terminé [Refine, Test, and Improve Your Workflow](09-agentic-editing.md) ou êtes en train de la suivre.
- Vous comprenez que les schedules de [GitHub Actions](https://github.github.com/gh-aw/reference/triggers/) utilisent des **cron expressions**, par exemple `0 9 * * 1` s'exécute à 09:00 UTC chaque lundi.
- Vous savez exécuter `gh aw compile` pour régénérer le lock file d'un workflow.

## 🎯 Ce Que Vous Allez Faire

Vous allez apprendre comment la syntaxe de schedule en anglais courant de `gh-aw` se traduit en schedules cron GitHub Actions. À la fin, vous saurez quelle [fuzzy expression](https://github.github.com/gh-aw/reference/schedule-syntax/#fuzzy-schedules) convient à votre workflow, comment vérifier la valeur cron compilée et en quoi les agentic workflows diffèrent du YAML classique d'Actions pour la planification.

## Cron En Une Minute

GitHub Actions stocke les schedules sous forme de **[cron expressions](https://github.github.com/gh-aw/reference/triggers/)** : cinq champs, `minute hour day-of-month month day-of-week`.

Vous n'avez **pas** besoin d'écrire du cron à la main pour les cas courants. Dans `gh-aw`, vous pouvez écrire une [fuzzy expression](https://github.github.com/gh-aw/reference/triggers/) comme `daily on weekdays`, puis laisser `gh aw compile` la convertir pour vous.

## Référence Des Fuzzy Schedules

| Expression floue              | Exemple de cron compilé | À utiliser de préférence quand…                                                                |
| ----------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `schedule: hourly`            | `30 */1 * * *`          | Vous voulez un retour rapide pendant une phase d'expérimentation ou de surveillance fréquente. |
| `schedule: every 6 hours`     | `14 */6 * * *`          | Vous voulez plusieurs mises à jour par jour sans bruit horaire.                                |
| `schedule: daily`             | `49 23 * * *`           | Vous avez besoin d'un résumé standard une fois par jour.                                       |
| `schedule: daily on weekdays` | `50 11 * * 1-5`         | Le workflow est utile pendant la semaine de travail mais peut rester silencieux le week-end.   |
| `schedule: weekly`            | `20 4 * * 5`            | Vous voulez un récapitulatif peu bruyant ou un rapport de type audit.                          |

> [!TIP]
> `gh-aw` répartit les schedules sur différentes minutes ou heures afin que tous les workflows ne s'exécutent pas en même temps. Votre valeur cron compilée peut différer des exemples ci-dessus ; traitez votre propre [lock file](https://github.github.com/gh-aw/reference/workflow-structure/#lock-file-header) comme la source de vérité.

## Vérifiez Le Cron Compilé Après `gh aw compile`

Exécutez :

```bash
gh aw compile
```

Ouvrez ensuite le lock file généré et recherchez la ligne `cron:` sous `on.schedule` :

```markdown
on:
schedule: - cron: "50 11 \* \* 1-5" # Friendly format: daily on weekdays (scattered)
```

C'est le schedule exact que GitHub Actions enregistrera pour **votre** workflow.

## Quand Faut-Il Utiliser Du Cron Brut ?

Les raw cron expressions ont leur place dans les workflows **classic GitHub Actions YAML**, pas dans les fichiers `.md` d'[agentic workflow](https://github.github.com/gh-aw/introduction/overview/). Dans un agentic workflow, utilisez toujours une fuzzy expression ; `gh aw compile` génère automatiquement la valeur cron dans le `.lock.yml`.

Si aucune option fuzzy ne correspond exactement à votre besoin de planification, choisissez l'expression fuzzy la plus proche. Ces expressions couvrent les cadences les plus courantes, et le compilateur répartit la minute et l'heure exactes pour éviter les pics de charge.

> In a classic Actions workflow you would write cron directly:
>
> ```markdown
> # classic-actions.yml (NOT an agentic workflow)
>
> on:
> schedule: - cron: "15 9 \* \* 1-5"
> ```
>
> In an agentic workflow `.md`, always use fuzzy syntax instead:
>
> ```markdown
> ---
> on:
>     schedule: daily on weekdays
>     workflow_dispatch: {}
> ---
> ```

<!-- journey: all -->

## ✅ Checkpoint

- [ ] Je peux expliquer à haut niveau ce qu'est une cron expression
- [ ] Je sais quelle fuzzy schedule expression correspond le mieux à la cadence de mon workflow
- [ ] Je sais que `gh aw compile` transforme la syntaxe fuzzy en une valeur cron concrète dans le `.lock.yml`
- [ ] Je sais où chercher la ligne `cron:` compilée après la compilation
- [ ] Je sais que le cron brut a sa place dans le YAML classique d'Actions, pas dans les fichiers `.md` d'agentic workflow

---

Retour à l'aventure principale : [Affiner, tester et améliorer votre workflow](09-agentic-editing.md).

<!-- /journey -->
