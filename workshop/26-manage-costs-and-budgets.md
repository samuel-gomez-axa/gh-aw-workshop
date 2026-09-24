<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Gerez les couts et budgets d'AI Credits

> _Les workflows agentiques consomment des [AI Credits (AIC)](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic) a chaque execution ; apprendre a mesurer, predire et controler cette depense transforme un outil puissant en outil durable._

## 🎯 Ce que vous allez faire

Vous allez consulter la consommation d'AI Credits de votre workflow dans le tableau de bord de facturation GitHub, estimer les couts mensuels d'un workflow planifie et appliquer au moins une technique pour garder les depenses dans le budget.

## 📋 Avant de commencer

- Vous avez termine [Audit and Monitor Your Agentic Workflows](25-audit-and-observability.md).
- Vous avez execute votre workflow au moins une fois et vu les donnees d'usage des tokens dans la sortie de `gh aw logs`.
- _(Utilisateurs enterprise)_ Votre administrateur GitHub a confirme que la facturation Copilot Enterprise est activee pour votre organisation.

## Etapes

### Comprendre les AI Credits

Chaque execution de workflow agentique utilise un modele IA pour traiter votre brief de tache et produire une sortie. GitHub facture cette inference en **AI Credits (AIC)**.

- Un AIC correspond approximativement a 1 000 tokens d'entree traites par le modele.
- Une execution typique d'un workflow daily-status coute entre 0,5 et 3 AIC selon la longueur du brief et les appels d'outils.
- Vous payez a la fois les tokens d'entree et de sortie, mais pour la plupart des briefs, le cout est surtout porte par l'entree.

> [!NOTE]
> Les tarifs exacts et les taux de conversion AIC sont indiques dans la [documentation GitHub sur la facturation](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot). Les tarifs varient selon le plan Copilot.

### Verifier l'usage actuel dans le tableau de bord de facturation

1. Open **github.com** and click your profile picture → **Settings**.
2. In the left sidebar, click **Billing and plans**.
3. Scroll to the **Copilot** section and click **Usage**.
4. Look for the **Agentic Workflows** row. It shows AIC consumed this billing cycle.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/26-billing-dashboard-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/26-billing-dashboard-light.svg">
  <img alt="Copilot billing usage dashboard showing AI Credit consumption by feature" src="images/26-billing-dashboard-light.svg">
</picture>

### Estimer le cout mensuel d'un workflow planifie

Utilisez le cout par execution obtenu via `gh aw logs` pour projeter la depense mensuelle.

```bash
gh aw logs daily-status --count 5
```

Regardez la colonne **AIC**. Faites la moyenne des cinq dernieres executions, puis multipliez :

```text
monthly cost = average AIC per run × runs per day × 30
```

Si votre workflow consomme en moyenne 1.5 AIC et s'execute une fois par jour : `1.5 × 1 × 30 = 45 AIC per month`. Partagez cette estimation avec votre administrateur GitHub avant d'activer une [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule) tres frequente.

### Projeter les couts avec [gh aw forecast](https://github.github.com/gh-aw/setup/cli/#forecast-experimental)

`gh aw forecast` utilise votre historique reel d'execution et une simulation Monte Carlo pour projeter la consommation future d'AIC. Lancez-le pour un seul workflow afin d'obtenir une distribution de probabilite P10/P50/P90 :

```bash
gh aw forecast daily-status
```

Utilisez la valeur **P90** comme borne haute prudente lorsque vous demandez une limite de depense a votre administrateur ou que vous configurez `max-daily-ai-credits`.

> [!TIP]
> Essayez [Side Quest: Project Future AI Credit Costs with `gh aw forecast`](side-quest-26-01-forecast-costs.md) pour les projections hebdomadaires, les previsions sur historique limite avec `--days`, les previsions multi-workflow et la derivation d'une valeur `max-daily-ai-credits` a partir de P90.

### Reduire la consommation de tokens et definir des garde-fous

Quelques techniques permettent de garder la depense sous controle :

- **Raccourcir le brief de tache** - moins de tokens en entree a chaque execution.
- **Filtrer les donnees avant de les transmettre a l'agent** - un contexte plus petit reduit le cout.
- **Mettre les resultats en cache avec une persistent memory** - evitez de retraiter des donnees inchangees. Voir [Make Your Workflow Remember Across Runs](20-persistent-memory.md).
- **Reduire la frequence d'execution** - moins d'executions signifie moins d'AIC.

> [!TIP]
> Vous voulez un exercice plus approfondi pour observer ou partent les tokens et tester les reductions de cout une modification a la fois ? Essayez [Side Quest: Observe and Reduce Token Costs](side-quest-13-04-token-optimization.md).

Trois champs de [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) imposent des limites strictes directement dans le fichier de workflow :

- **[`timeout-minutes`](https://github.github.com/gh-aw/reference/rate-limiting-controls/#timeouts)** annule l'ensemble du job Actions s'il depasse la limite. L'execution echoue et vous n'etes facture que pour les tokens consommes avant l'annulation.
- **[`max-ai-credits`](https://github.github.com/gh-aw/reference/cost-management/#cap-ai-credits-per-run)** plafonne l'AIC qu'une execution unique peut consommer, avec application par le firewall AWF. La valeur par defaut lorsqu'il est omis est 1000 AIC. Utilisez une valeur negative, par exemple `-1`, pour desactiver l'application de la limite et le token steering.
- **[`max-daily-ai-credits`](https://github.github.com/gh-aw/reference/cost-management/#cap-daily-ai-credits-per-workflow)** plafonne l'AIC total consomme par ce workflow sur les dernieres 24 heures pour l'utilisateur declencheur. Les executions qui depasseraient cette limite sont bloquees avant de commencer. Un seuil par defaut du systeme s'applique si ce champ est omis ; utilisez `-1` pour desactiver cette garde-fou, ou fournissez une valeur entiere explicite pour remplacer la valeur par defaut.

```markdown .github/workflows/daily-status.md
---
name: Daily Status Report
on:
    schedule: daily on weekdays
timeout-minutes: 10
max-ai-credits: 1000
max-daily-ai-credits: 2500
---
```

Dans cet exemple, chaque execution est plafonnee a 1000 AIC et le total sur 24 heures a 2500 AIC, soit environ deux executions completes avant que la garde-fou quotidienne ne s'active. Compilez apres la modification :

```bash
gh aw compile
```

## ✅ Checkpoint

- [ ] Vous avez localise votre usage d'AIC pour ce cycle de facturation dans le tableau de bord GitHub
- [ ] Vous avez calcule un cout mensuel estime en AIC pour votre workflow planifie
- [ ] Vous avez lance `gh aw forecast` et identifie les projections P50 et P90 pour votre workflow
- [ ] Vous avez ajoute `max-ai-credits` et `max-daily-ai-credits` au frontmatter de votre workflow
- [ ] Vous avez ajoute ou verifie une valeur `timeout-minutes` dans le frontmatter de votre workflow
- [ ] Vous avez identifie au moins une technique pour reduire la consommation de tokens

<!-- journey: all -->

Vous voulez choisir une autre branche depuis le hub de l'atelier ? Revenez a [Et maintenant ? Continuez a explorer](14-next-steps.md).

<!-- /journey -->
