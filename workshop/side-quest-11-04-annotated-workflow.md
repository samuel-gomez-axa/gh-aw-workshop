<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Explorer Et Adapter Un Workflow Annoté

> _Facultatif : parcourez ce guide pour comprendre les choix de conception dans `daily-status.md` et les adapter dans votre propre copie, puis revenez à [Créer : Daily Repo Status Workflow](07-your-first-workflow.md)._

## :clipboard: Avant De Commencer

- Vous avez terminé [Step 11](07-your-first-workflow.md) et `.github/workflows/daily-status.md` existe dans votre dépôt.
- Ouvrez `daily-status.md` dans votre éditeur : vous ferez de petites modifications au fil de ce guide.

## :dart: Ce Que Vous Allez Faire

Comprenez les quatre décisions de conception qui rendent `daily-status.md` sûr et prévisible, puis modifiez votre propre copie pour vérifier ce que chacune contrôle.

---

## Quatre Décisions De Conception

| Décision                     | Ce qu'elle contrôle                                                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permissions minimales        | Uniquement les scopes réellement nécessaires au workflow : limite le rayon d'impact                                                                        |
| `gh-proxy` dans `tools`      | Applique les [permissions](https://github.github.com/gh-aw/reference/permissions/) au niveau [network](https://github.github.com/gh-aw/reference/network/) |
| `max: 1` dans `safe-outputs` | Limite les écritures à exactement un commentaire par run                                                                                                   |
| Modèle de sortie fixe        | Même format à chaque run : facile à lire et à [audit](https://github.github.com/gh-aw/reference/audit/)                                                    |

---

## Le Workflow Annoté

Lisez chaque commentaire `#` : il explique _pourquoi_ cette ligne existe, pas seulement _ce_ qu'elle fait :

```markdown
---
emoji: :bar_chart:
description: Post a daily repository status summary as a GitHub issue comment.

on:
  schedule: daily      # compiler converts this to a deterministic cron expression
  workflow_dispatch: {} # adds a manual Run button for testing without waiting for the schedule

# Only the five scopes this workflow actually needs.
# `issues: write` is absent — safe-outputs handles writes more precisely.
permissions:
  contents: read
  copilot-requests: write
  issues: read
  pull-requests: read
  actions: read

# gh-proxy enforces the permissions block at the network level.
# The agent physically cannot call APIs you haven't listed, even if the task brief asks it to.
tools:
  github:
    mode: gh-proxy
    toolsets: [default]

# The only write capability the agent has.
# `max: 1` turns "can write" into "can write exactly once per run".
safe-outputs:
  add-comment:
    max: 1
---
```

---

## :pencil2: À Vous De Jouer — Metadata

1. Dans votre `daily-status.md`, notez la valeur actuelle de `emoji:`, puis modifiez-la, par exemple de `:bar_chart:` à `:mag:`.
2. Exécutez `gh aw list`. Le nouvel emoji apparaît-il à côté du nom du workflow ?
3. Mettez à jour le texte de `description:` puis exécutez `gh aw list` à nouveau pour confirmer que le changement est pris en compte.
4. Restaurez les valeurs d'origine de `emoji:` et `description:` lorsque vous avez terminé.

## :pencil2: À Vous De Jouer — [Safe-Outputs](https://github.github.com/gh-aw/reference/safe-outputs/)

1. Dans votre `daily-status.md`, commentez l'intégralité du bloc [safe-outputs](https://github.github.com/gh-aw/reference/safe-outputs/).
2. Exécutez `gh aw compile --validate`.
3. Lisez le message d'erreur : quelle capacité d'écriture l'agent perd-il ?
4. Décommentez le bloc et recompilez pour confirmer que l'erreur a disparu.

---

## Résumé Du Pattern

| Pattern                      | Le problème qu'il résout                              |
| ---------------------------- | ----------------------------------------------------- |
| Permissions minimales        | Limite le rayon d'impact si le modèle se comporte mal |
| `gh-proxy` dans `tools`      | Empêche l'agent de dépasser les scopes déclarés       |
| `max: 1` dans `safe-outputs` | Une action d'écriture auditable par run, pas plus     |
| Modèle de sortie fixe        | Rapports quotidiens prévisibles et faciles à comparer |

---

## :white_check_mark: Checkpoint

- [ ] J'ai modifié `emoji:`, exécuté `gh aw list` et vu la mise à jour prise en compte
- [ ] J'ai supprimé `safe-outputs:`, observé l'[erreur de compilation](https://github.github.com/gh-aw/reference/compilation-process/), puis je l'ai restauré et confirmé que l'erreur avait disparu
- [ ] Je peux expliquer pourquoi `issues: write` est absent de `permissions` et ce qui fournit l'accès en écriture à la place
- [ ] Je peux expliquer ce que `max: 1` empêche l'agent de faire

---

<!-- journey: all -->

Revenez à [Créer : Daily Repo Status Workflow](07-your-first-workflow.md).

<!-- /journey -->
