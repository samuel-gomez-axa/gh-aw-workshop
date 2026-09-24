<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Chaîner Les Conditions — Exécuter Un Agent Seulement Lorsqu'il Existe Des Alertes De Sécurité

> _L'invocation d'agent la moins chère est celle que vous évitez. Utilisez une étape déterministe pour décider si l'état de votre dépôt mérite l'attention d'un agent._

## :dart: Ce Que Vous Allez Faire

Ajoutez à votre workflow une étape de security scanning qui compte les alertes de vulnérabilité Dependabot ouvertes, puis branchez le résultat sur une condition `if:` afin que l'agent ne s'exécute que lorsqu'il y a de vrais résultats. Vous chaînerez cette vérification avec une condition de branche via `&&` et mettrez à jour le brief de l'agent pour référencer directement le nombre d'alertes.

## :clipboard: Avant De Commencer

- Vous avez terminé [Make Your Workflow Smarter with Conditional Logic](15-conditional-logic.md).
- Votre workflow possède déjà une condition `if:` de niveau supérieur qui contrôle l'exécution du job d'agent.

## Étapes

### Comprendre Pourquoi Ce Pattern Compte

Exécuter un agent chaque fois qu'un schedule se déclenche coûte cher, même lorsqu'il n'y a rien à signaler. Cette quête annexe résout ce problème en plaçant en amont une vérification [deterministic](https://github.github.com/gh-aw/patterns/deterministic-ops/) rapide : une étape shell appelle l'API GitHub pour compter les alertes Dependabot ouvertes, puis l'expression `if:` évalue ce nombre avant le démarrage du job d'agent. Si aucune alerte n'est ouverte, le job est entièrement ignoré, donc zéro AI Credits dépensé.

Le même squelette s'applique à tout outil capable d'écrire un nombre ou un booléen dans `$GITHUB_OUTPUT` : alertes de code scanning, résultats de secret scanning, total d'erreurs de lint ou nombre de tests en échec.

### Ajouter Une Étape De Comptage Des Alertes De Sécurité

Dans l'onglet **Chat** ou **Agents** de GitHub Copilot, collez :

```prompt
/agentic-workflows update .github/workflows/daily-status.md to add a shell step
that counts open Dependabot alerts using the GitHub API and writes the result to
$GITHUB_OUTPUT as `alert_count` with step id `alerts`. Add `security-events: read`
to the workflow permissions and update the if condition to run the agent only when
alert_count is not zero and the ref is the default branch.
> _L'invocation d'agent la moins chère est celle que vous évitez. Utilisez une étape déterministe pour décider si l'état de votre dépôt mérite l'attention d'un agent._
```

La skill ajoute l'étape, met à jour le bloc de permissions et la condition `if:`, puis recompile le lock file.

<details open>
<summary>:desktop_computer: Parcours terminal</summary>

1. Ajoutez `security-events: read` au bloc `permissions:` dans votre [workflow frontmatter](https://github.github.com/gh-aw/reference/frontmatter/).

2. Ajoutez l'étape suivante à l'intérieur du bloc `steps:` :

```markdown
- name: Count open security alerts
  id: alerts
  env:
  GH_TOKEN: ${{ github.token }}
  run: |
    COUNT=$(gh api repos/${{ github.repository }}/dependabot/alerts \
      --jq '[.[] | select(.state == "open")] | length' 2>/dev/null || echo 0)
    echo "alert_count=$COUNT" >> $GITHUB_OUTPUT
```

L'étape publie le nombre sous la forme `steps.alerts.outputs.alert_count`. 3. Mettez à jour le `if:` de niveau supérieur pour combiner les deux conditions :

```markdown
---
if: steps.alerts.outputs.alert_count != '0' && github.ref == 'refs/heads/main'
---
```

Les deux conditions doivent être vraies pour que l'agent s'exécute. 4. Exécutez `gh aw compile` pour régénérer le lock file.

</details>

### Pourquoi Le Chaîner Avec Une Vérification De Branche

Les nombres d'alertes Dependabot s'appliquent à l'ensemble du dépôt. Exécuter l'agent sur chaque branche créerait des résumés en double à partir des mêmes données. L'ajout de `github.ref == 'refs/heads/main'` limite l'exécution à un emplacement canonique unique tout en permettant à un [`workflow_dispatch`](https://github.github.com/gh-aw/reference/triggers/#dispatch-triggers-workflowdispatch) manuel de passer outre depuis l'onglet Actions, quelle que soit la branche courante.

> [!NOTE]
> Les valeurs issues de `$GITHUB_OUTPUT` sont toujours des chaînes. Comparez-les à des littéraux entre guillemets, `steps.alerts.outputs.alert_count != '0'`, et non à des valeurs non citées.

### Mettre À Jour Le Brief De L'agent

Référencez directement dans votre brief la sortie du nombre d'alertes afin que le modèle connaisse le périmètre de travail avant d'appeler le moindre outil :

```text
There are ${{ steps.alerts.outputs.alert_count }} open Dependabot security alerts in this
repository. Fetch the full list, group them by severity (critical, high, medium, low),
and post a concise triage summary as a comment on the latest open issue labelled
`security-triage`. If no such issue exists, create one.
```

Intégrer ce nombre ancre l'agent sur une valeur concrète au lieu de lui demander de redécouvrir une donnée déjà récupérée par l'étape déterministe, ce qui réduit les appels d'outils inutiles et diminue l'usage d'AIC.

### Vérifier Le Comportement Conditionnel

Après compilation et push, déclenchez un run manuel `workflow_dispatch` depuis l'onglet Actions :

- **Avec des alertes ouvertes sur la branche par défaut** : le job d'agent se termine et publie le résumé de sécurité.
- **Sans alertes ouvertes, ou sur une branche autre que la branche par défaut** : le job apparaît comme **skipped** avec une icône grise.

> [!NOTE]
> La condition `if:` ne prend effet qu'après compilation et push à la fois de la source `.md` et du fichier `.lock.yml` mis à jour. La skill `/agentic-workflows` gère automatiquement la compilation.

### Valider Et Pousser Vos Modifications

```bash
git add .
git commit -m "feat: gate agent on open security alerts"
git push
```

## :white_check_mark: Checkpoint

- [ ] Votre workflow contient une étape `count open security alerts` avec `id: alerts`
- [ ] Le bloc `permissions:` inclut `security-events: read`
- [ ] Votre `if:` de niveau supérieur chaîne la vérification du nombre d'alertes et la vérification de branche avec `&&`
- [ ] `.github/workflows/daily-status.md` et `.github/workflows/daily-status.lock.yml` sont tous deux compilés, validés et poussés
- [ ] Vous avez déclenché le workflow manuellement et confirmé qu'il est ignoré lorsqu'il n'y a pas d'alertes ouvertes
- [ ] Vous pouvez expliquer pourquoi intégrer le nombre d'alertes dans le brief réduit les appels d'outils inutiles de l'agent

<!-- journey: all -->

Revenez à [Make Your Workflow Smarter with Conditional Logic](15-conditional-logic.md).

<!-- /journey -->
