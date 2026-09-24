<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Pièges Du [Frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) YAML

> _Facultatif : parcourez ces erreurs YAML courantes si vous rencontrez une [erreur de compilation](https://github.github.com/gh-aw/reference/compilation-process/) à Step 11, puis revenez au parcours principal._

YAML est peu tolérant. Voici les cinq erreurs que les participants rencontrent le plus souvent lorsqu'ils construisent le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) d'un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/), chacune avec un exemple incorrect :x: et un exemple correct :white_check_mark:.

---

## Des Tabulations Au Lieu D'espaces

YAML n'autorise pas les tabulations pour l'indentation. Chaque niveau d'imbrication doit utiliser **deux espaces**.

```markdown
---
# ❌ Wrong — the line below "on:" is indented with a tab character,
#    not spaces. The tab is invisible in most editors, which makes
#    this bug hard to spot. YAML will reject it with a parse error.
on:
  schedule: daily  # <-- replace leading whitespace with 2 spaces, not a tab

# ✅ Correct — uses exactly two spaces
on:
  schedule: daily
---
```

La plupart des éditeurs insèrent des tabulations par défaut dans les fichiers `.md`. Vérifiez les réglages de votre éditeur et passez l'indentation sur **Spaces** avec une taille de **2**.

---

## Guillemets Manquants Autour Des Chaînes Avec Des Caractères Spéciaux

YAML traite certains caractères (`:`, `#`, `{`, `}`, `[`, `]`, `,`, `&`, `*`, `?`, `|`, `>`, `!`, `'`, `"`) comme de la syntaxe lorsqu'ils apparaissent sans guillemets dans des valeurs.

```markdown
---
# ❌ Wrong — the colon in the description breaks YAML parsing
description: Post a report: daily

# ✅ Correct — wrap the value in double quotes
description: "Post a report: daily"
---
```

---

## Mauvais Niveau D'indentation Pour Les Clés Imbriquées

L'imbrication YAML est strictement positionnelle. Une clé placée un niveau plus bas doit être indentée avec exactement deux espaces de plus que sa clé parente.

```markdown
---
# ❌ Wrong — "mode" is at the same level as "github"
tools:
  github:
  mode: gh-proxy
  toolsets: [default]

# ✅ Correct — "mode" is indented under "github"
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
---
```

---

## Oublier Le `---` De Fermeture

Le frontmatter doit avoir à la fois une fence d'ouverture et une fence de fermeture `---`. Si vous omettez la fence de fermeture, l'ensemble du fichier est traité comme du YAML et le body de l'agent est perdu.

```
# ❌ Wrong — no closing fence
---
emoji: :bar_chart:
description: ...
on:
  schedule: daily

# Daily Repo Status Report
You are an AI assistant...
```

```
# ✅ Correct — closing fence separates frontmatter from body
---
emoji: :bar_chart:
description: ...
on:
  schedule: daily
---

# Daily Repo Status Report
You are an AI assistant...
```

---

## `copilot-requests: write` absent de `permissions`

C'est la raison la plus fréquente pour laquelle un workflow compile mais ne produit aucune sortie. Sans cette permission, l'agent ne peut pas effectuer d'appels d'IA.

```markdown
---
# ❌ Wrong — missing copilot-requests
permissions:
  contents: read
  issues: read

# ✅ Correct
permissions:
  contents: read
  copilot-requests: write
  issues: read
---
```

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez identifier les cinq pièges YAML présentés ici
- [ ] Votre `daily-status.md` compile sans erreur après vérification de chaque section
- [ ] Vous comprenez pourquoi `copilot-requests: write` est requis

> [!TIP]
> Gardez cette page en favori comme fiche de référence rapide chaque fois que vous rédigez un nouveau frontmatter d'[agentic workflow](https://github.github.com/gh-aw/introduction/overview/).

---

<!-- journey: all -->

Revenez à [Créer : Daily Repo Status Workflow](07-your-first-workflow.md).

<!-- /journey -->
