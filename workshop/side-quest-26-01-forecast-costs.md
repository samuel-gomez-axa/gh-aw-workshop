<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : projeter les futurs coûts d’AI Credits avec `gh aw forecast`

> _Complément plus approfondi de [Gérez les coûts et les budgets d’AI Credits](26-manage-costs-and-budgets.md). Utilisez cette quête annexe si vous voulez un guide complet de `gh aw forecast`, ce que sa sortie signifie, comment ajuster les projections et comment traduire la valeur P90 en un `max-daily-ai-credits` concret._

## Ce que fait [`gh aw forecast`](https://github.github.com/gh-aw/setup/cli/#forecast)

> [!NOTE]
> `gh aw forecast` est actuellement experimental. Ses flags et son format de sortie peuvent changer dans de futures releases.

`gh aw forecast` examine votre historique réel d’exécutions et lance une simulation Monte Carlo pour projeter la consommation future d’[AIC](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic). Il tient compte de :

- la fréquence d’exécution, c’est-à-dire la fréquence des [triggers](https://github.github.com/gh-aw/reference/triggers/#trigger-types) du workflow ;
- l’usage par exécution, soit combien d’AIC chaque exécution a consommé ;
- le taux de succès, car même les exécutions échouées consomment une partie des tokens.

Le résultat est une distribution de probabilité, pas un nombre unique. Vous obtenez des valeurs **P10**, **P50** et **P90** pour la période de projection.

## Lancer une prévision de base

```bash
gh aw forecast daily-status
```

Exemple de sortie :

```
Workflow: daily-status
Period:   month (30 days)
Runs:     ~30 projected

  P10     P50     P90
  32 AIC  47 AIC  68 AIC
```

- **P10** : seulement 10 % de chances que la dépense réelle tombe en dessous. C’est le scénario optimiste.
- **P50** : la projection médiane. La moitié des résultats simulés est au-dessus, l’autre moitié en dessous.
- **P90** : seulement 10 % de chances que la dépense réelle dépasse cette valeur. C’est une borne haute prudente.

Utilisez la valeur **P90** lorsque vous demandez une limite de dépense à votre administrateur ou lorsque vous réglez `max-daily-ai-credits`.

## Utiliser `--period week` pour des projections plus courtes

Si votre workflow s’exécute moins d’une fois par jour, une projection mensuelle peut sembler trop abstraite. Passez à un horizon hebdomadaire :

```bash
gh aw forecast daily-status --period week
```

La sortie couvre 7 jours de dépense projetée. C’est utile pour des workflows qui s’exécutent quelques fois par semaine et pour lesquels vous voulez une estimation à court terme.

## Utiliser `--days 7` pour limiter l’historique après un changement de task brief

Par défaut, `gh aw forecast` échantillonne tout l’historique d’exécution disponible. Si vous avez récemment modifié votre task brief ou ajouté des [MCP tools](https://github.github.com/gh-aw/guides/mcps/), les anciennes exécutions peuvent avoir des coûts très différents et fausser la projection.

Limitez la fenêtre d’historique aux 7 derniers jours :

```bash
gh aw forecast daily-status --days 7
```

> [!TIP]
> Attendez d’avoir au moins 5 à 7 exécutions après un changement avant de lancer une prévision. Moins d’échantillons signifient des intervalles de confiance plus larges.

## Prévoir tous les workflows en une seule fois

Exécutez `gh aw forecast` sans nom de workflow pour projeter les coûts de tous les workflows du dépôt :

```bash
gh aw forecast
```

La sortie affiche une ligne par workflow, ce qui vous permet de repérer lesquels entraînent la plus forte dépense.

## Traduire la valeur P90 en `max-daily-ai-credits`

Le champ `max-daily-ai-credits` plafonne le nombre d’[AIC](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic) qu’un workflow peut consommer sur les 24 dernières heures pour l’utilisateur déclencheur. Pour choisir une valeur qui autorise un fonctionnement normal tout en bloquant une dépense runaway :

1. Relevez la valeur **P90 mensuelle** issue de `gh aw forecast`.
2. Divisez-la par 30 pour obtenir la valeur P90 quotidienne.
3. Multipliez-la par 1.5 comme marge de sécurité.

**Exemple calculé :**

| Métrique                       | Valeur    |
| ------------------------------ | --------- |
| P90 mensuelle                  | 10000 AIC |
| P90 quotidienne (÷ 30)         | 333 AIC   |
| Marge de sécurité (× 1.5)      | 500 AIC   |
| `max-daily-ai-credits` arrondi | **500**   |

Ajoutez ensuite cette valeur au frontmatter de votre workflow :

```markdown
---
name: Daily Status Report
on:
    schedule: daily on weekdays
max-daily-ai-credits: 500
---
```

Recompilez après modification :

```bash
gh aw compile
```

## :white_check_mark: Checkpoint

- [ ] Vous avez exécuté `gh aw forecast` et lu la sortie P10/P50/P90
- [ ] Vous avez utilise `--period week` pour obtenir une projection plus courte
- [ ] Vous avez utilisé `--days 7` pour limiter l’historique après une modification récente du workflow
- [ ] Vous avez dérivé une valeur `max-daily-ai-credits` à partir de la valeur P90 et l’avez ajoutée à votre workflow

<!-- journey: all -->

Retour à [Gérez les coûts et les budgets d’AI Credits](26-manage-costs-and-budgets.md).

<!-- /journey -->
