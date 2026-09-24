<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Agentic Workflows pour utilisateurs avancés de GitHub Actions

> _Facultatif : lisez ce guide de référence rapide si vous connaissez déjà GitHub Actions et voulez une comparaison rapide avant de continuer avec [Step 5](05-agentic-workflows-intro.md)._

## :clipboard: Avant de commencer

Pour tirer le meilleur parti de ce guide accéléré, vous devriez déjà avoir :

- Terminé [GitHub Actions en 5 minutes](04-github-actions-intro.md), ou avoir une expérience pratique de rédaction de fichiers `.github/workflows/*.yml`.
- Compris les concepts centraux d’Actions : triggers (`on:`), jobs, steps et runners.
- Éventuellement parcouru [Que sont les agentic workflows ?](05-agentic-workflows-intro.md) pour une introduction adaptée aux débutants avant d’utiliser cette fiche mémo.

## :dart: Ce que vous allez faire

Vous allez examiner le changement clé entre des Actions classiques et des agentic workflows, comparer des exemples de code concrets et retenir une courte liste de ce qui ne change pas. À la fin, vous aurez un angle d’adoption pratique pour des cas d’usage platform et DevOps.

## Le changement central de modèle mental

Vous conservez les mêmes fondations GitHub Actions, triggers, [permissions](https://github.github.com/gh-aw/reference/permissions/), runners, contexte du dépôt et flux de review de pull request, puis vous ajoutez par-dessus une couche agentique. En pratique, la transition est fluide : le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) reste compatible avec Actions, tandis que le corps Markdown porte l’objectif et les consignes de raisonnement de l’agent.

## Avant et après : Actions classiques vs agentic workflows

Le changement le plus important consiste à remplacer des étapes shell impératives par un objectif en langage naturel. Voici la même tâche de triage d’issue écrite de deux façons.

**GitHub Actions classiques** — chaque décision est codée en dur dans le shell (version simplifiée pour l’illustration) :

```yaml
on: [issues]
jobs:
    triage:
        runs-on: ubuntu-latest
        steps:
            - name: Apply bug label
              run: |
                  # Must hard-code every label check
                  if echo "${{ github.event.issue.body }}" | grep -qi "error\|exception"; then
                    gh issue edit ${{ github.event.issue.number }} --add-label "bug"
                  fi
                  # Real workflows need more checks, error handling, and edge-case branches
```

**Agentic workflow** — un objectif en langage naturel remplace la logique shell :

```markdown
---
on: [issues]
---

Read the opened issue body and apply the single most relevant label
from the repository label list. Do not close or comment on the issue.
```

Différences clés en un coup d’œil :

|                 | Actions classiques                                      | Agentic workflows                                             |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| **Logique**     | Shell codé en dur ; chaque branche est écrite à la main | Déléguée à l’agent ; gère automatiquement de nouveaux cas     |
| **Entrées**     | Fixes ; échoue sur les valeurs inattendues              | Flexibles ; raisonne sur l’ambiguïté à l’exécution            |
| **Sortie**      | stdout de commande                                      | Résumés en prose, décisions, recommandations d’action         |
| **Maintenance** | Mettre à jour le workflow pour chaque nouveau cas       | Définir les garde-fous une fois ; l’agent gère les variations |
| **Idéal pour**  | Tâches déterministes et reproductibles                  | Triage, synthèse, planification, interprétation               |

## Un sur-ensemble, pas un remplacement

Considérez les agentic workflows comme un sur-ensemble d’Actions :

- Le frontmatter reste compatible avec le modèle Actions que vous connaissez déjà.
- Le corps Markdown devient le prompt d’exécution et peut inclure du [templating](https://github.github.com/gh-aw/reference/templating/) et des fonctionnalités d’agent inline.
- Vous pouvez toujours conserver une logique déterministe quand c’est le bon outil pour le besoin.

## Modèle hybride pour les équipes réelles

Le diagramme ci-dessous montre le flux de données en trois étapes : des étapes déterministes récupèrent et transforment les données, des sorties structurées font le lien entre les deux mondes et l’agent gère l’interprétation et la communication.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/sq0501-hybrid-pattern-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/sq0501-hybrid-pattern-light.svg">
  <img alt="Diagramme de modèle hybride montrant trois étapes : des jobs déterministes récupèrent et transforment les données, des sorties structurées sont transmises au corps du workflow et l’agent gère l’interprétation et la communication" src="images/sq0501-hybrid-pattern-light.svg">
</picture>

Un chemin de migration pratique est hybride :

1. Gardez des jobs ou steps déterministes pour les opérations de données stables (fetch, transform, validate).
2. Passez des sorties structurées au corps du workflow.
3. Laissez l’agent gérer l’interprétation, la priorisation et la communication.

Ce modèle fonctionne bien pour les équipes platform et DevOps parce qu’il préserve des garde-fous déterministes tout en réduisant la logique de branchement écrite à la main pour les décisions riches en contexte.

## :hammer_and_wrench: Essayez

Ouvrez le fichier de workflow que vous avez créé à l’étape 4, ou trouvez un step `run:` dans n’importe quel fichier `.github/workflows/*.yml`. Choisissez un step qui prend une décision : vérifier un label, analyser un titre de PR ou filtrer par chemin de fichier.

Ajoutez un commentaire au-dessus de ce step avec un objectif en langage naturel en une phrase. Le corps du step ci-dessous n’est qu’un exemple : votre vrai step conserve sa logique existante sans changement.

```markdown
# Goal: suggest up to three relevant labels from the repo label list

- name: Check labels
  run: |
    # ... your existing logic stays here unchanged
```

Gardez cet énoncé d’objectif à portée de main : vous l’utiliserez lorsque vous rédigerez votre premier agentic workflow dans [l’étape 7](07-your-first-workflow.md).

## Ce qui reste identique

- Les workflows s’exécutent toujours sur des [runners](https://github.github.com/gh-aw/reference/self-hosted-runners/) GitHub Actions
- Les [triggers](https://github.github.com/gh-aw/reference/triggers/), les permissions et le contexte du dépôt restent importants
- Vous continuez à versionner les workflows dans git et à les relire comme du code

Le même flux de rédaction et de review s’applique partout ; seule la configuration du runner change.

## Pourquoi les équipes platform et DevOps adoptent ce modèle

Pour les ingénieurs platform et les équipes DevOps qui évaluent l’adoption, les agentic workflows réduisent le coût de maintenance d’automatisations scriptées sur mesure :

- Moins de temps passé à mettre à jour des scripts shell fragiles ; plus de temps consacré à des travaux à plus forte valeur
- Chaque définition est un fichier Markdown versionné relu dans une pull request
- L’auditabilité complète, l’historique des changements et les gates d’approbation restent intacts
- Compatible avec les investissements existants dans des flottes de runners et avec les exigences de conformité

<!-- journey: all -->

## :white_check_mark: Checkpoint

- [ ] Je peux expliquer le changement de modèle mental entre des steps scriptés et une exécution orientée objectif
- [ ] Je peux identifier ce qui change dans les agentic workflows et ce qui reste identique par rapport aux Actions classiques
- [ ] Je peux expliquer pourquoi les agentic workflows sont mieux décrits comme un sur-ensemble compatible avec Actions
- [ ] J’ai identifié un step `run:` précis dans un workflow existant qui pourrait être remplacé par un énoncé d’objectif
- [ ] Je peux décrire un scénario où Classic Actions reste le bon choix
- [ ] Je peux expliquer pourquoi ce modèle peut réduire la charge de maintenance d’automatisation pour les équipes platform

---

Revenez à l’aventure principale : [Que sont les agentic workflows ?](05-agentic-workflows-intro.md).

<!-- /journey -->
