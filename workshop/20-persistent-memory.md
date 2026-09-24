<!-- page-journey: all -->
<!-- page-adventure: advanced -->
<!--
<research-metadata>
  <focus>Persistent memory in agentic workflows — cache-memory and repo-memory frontmatter tools</focus>
  <sources>
    <source>https://github.github.com/gh-aw/llms.txt</source>
    <source>https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/memory.md</source>
    <source>https://raw.githubusercontent.com/github/gh-aw/main/.github/aw/memory-stateful-patterns.md</source>
  </sources>
  <rationale>
    Every existing step produces stateless workflows that start fresh on each run. Real automation needs
    cross-run state: deduplication, baseline comparison, and incremental scanning. The gh-aw docs describe
    two production-ready primitives for this — cache-memory and repo-memory — but nothing in the workshop
    covered them. This step closes that gap.
  </rationale>
</research-metadata>
-->

# Faites en sorte que votre workflow se souvienne d'une execution a l'autre

> _Un workflow qui oublie tout après chaque exécution finira par se répéter. Donnez-lui une mémoire et il pourra n'agir que sur ce qui est nouveau._

## :dart: Ce que vous allez faire

Vous allez ajouter une [persistent memory](https://github.github.com/gh-aw/patterns/memory-ops/) à votre workflow agentique afin qu'il conserve un état d'une exécution à l'autre. À la fin de cette étape, votre workflow se souviendra de ce qu'il a déjà signalé et ignorera les doublons, afin que votre équipe ne reçoive jamais deux fois la même alerte.

## :clipboard: Avant de commencer

- Vous disposez d'un workflow agentique fonctionnel issu des étapes de création ([Step 7](07-your-first-workflow.md) ou équivalent).
- Vous êtes à l'aise pour modifier le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) YAML depuis [Give Your Agent More Tools with MCP](17-add-mcp-tools.md).
- Vous comprenez comment `safe-outputs` contrôle les droits d'écriture (voir [Side Quest: Frontmatter Deep Dive — Part B](side-quest-11-08-frontmatter-tools-outputs.md) si vous avez besoin d'un rappel).

## Pourquoi la memoire compte

Jusqu'ici, chaque exécution de workflow que vous avez construite commence sur une page blanche. C'est acceptable pour un résumé quotidien, mais cela devient un problème dès que vous voulez :

Le schéma ci-dessous montre comment `cache-memory` rend la déduplication possible d'une exécution à l'autre.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/20-cache-memory-loop-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/20-cache-memory-loop-light.svg">
  <img alt="Boucle de deduplication cache-memory : à chaque exécution, l'agent lit l'emplacement mémoire, filtre les issues déjà vues, ne signale que les nouvelles, puis réécrit les identifiants d'issue mis à jour dans le cache." src="images/20-cache-memory-loop-light.svg">
</picture>

- **Dedupliquer les alertes** - alerter uniquement sur les nouvelles issues ouvertes, pas sur les mêmes tous les matins.
- **Comparer à une référence** - "did the number of failing tests increase since yesterday?"
- **Scanner de façon incrémentale** - ignorer les pull requests que vous avez déjà examinées.

Cette étape utilise `cache-memory` ; consultez [Side Quest: Choosing Between Cache Memory and Repo Memory](side-quest-20-01-memory-patterns.md) pour une comparaison complète.

## Etapes

### Choisir le bon outil de memoire

Pour ce cas d'usage de déduplication, `cache-memory` est le bon choix.

### Ajouter `cache-memory` a votre frontmatter

Dans votre terminal Codespace, lancez `gh copilot` puis envoyez ce prompt :

```prompt
/agentic-workflows update .github/workflows/daily-status.md to add `cache-memory`
under the `tools:` key in the frontmatter, with key `daily-status-seen-issues` and
ttl `7d`, and update the task brief to read and write that memory slot for deduplication.
```

La skill ajoute le bloc de frontmatter et met à jour le brief. Examinez le diff avant de commit.

<details open>
<summary>:pencil2: Parcours d'édition manuelle</summary>

Ouvrez votre fichier de workflow dans `.github/workflows/daily-status.md`. Ajoutez `cache-memory` dans le bloc `tools:` du frontmatter avec le contenu ci-dessous, puis lancez `gh aw compile`.

</details>

Voici la structure de frontmatter que la skill utilisera :

```markdown .github/workflows/daily-status.md
---
name: Daily Status Report
on:
    schedule: daily
    workflow_dispatch: {}
permissions:
    contents: read
    issues: write
tools:
    cache-memory:
        key: daily-status-seen-issues
        ttl: 7d
---
```

Role de chaque champ :

| Champ           | Role                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tools:`        | Clé parente qui active les intégrations d'outils pour ce workflow. Les primitives de mémoire sont imbriquées sous cette clé.                       |
| `cache-memory:` | Indique à `gh-aw` d'adosser cet emplacement mémoire au cache GitHub Actions. Imbriqué sous `tools:`.                                               |
| `key:`          | Nom unique pour cet emplacement mémoire. Préfixez-le avec le nom du workflow pour éviter les collisions si plusieurs workflows partagent le dépôt. |
| `ttl: 7d`       | Durée de conservation des données en cache sans rafraîchissement. Après 7 jours sans exécution, le cache expire et l'agent repart de zéro.         |

### Mettre a jour votre brief de tache pour utiliser la memoire

Sous le frontmatter, indiquez à l'agent comment utiliser sa mémoire. L'agent lit et écrit l'emplacement mémoire par son nom :

```markdown .github/workflows/daily-status.md
You monitor this repository for newly opened issues and post a daily digest.

Use your `daily-status-seen-issues` memory to track which issue numbers you
have already reported on. On each run:

1. Fetch all currently open issues.
2. Filter out any issue numbers that appear in your memory.
3. If there are new issues, post a comment on the tracking issue listing only
   the new ones.
4. Add the new issue numbers to your memory so you skip them next time.
5. If there are no new issues, post nothing.
```

> [!TIP]
> Soyez explicite dans le brief sur la lecture et l'écriture de la mémoire. L'agent ne persistera rien automatiquement tant que vous ne le lui demandez pas dans le brief de tâche.

### [Compiler](https://github.github.com/gh-aw/reference/compilation-process/), valider et pousser

La skill `/agentic-workflows` recompile automatiquement le lock file. Si vous avez édité manuellement, lancez d'abord `gh aw compile` pour confirmer que le bloc mémoire est valide.

Parmi les erreurs fréquentes : placer `cache-memory:` au niveau racine au lieu de l'imbriquer sous `tools:`, ou omettre le champ `key:` pour `cache-memory`.

Poussez la mise a jour de votre workflow :

```bash
git add .
git commit -m "feat: add cache-memory deduplication to daily-status"
git push
```

1. Déclenchez une exécution manuelle dans **Actions → Daily Status Report → Run workflow**.
2. Ouvrez le journal d'exécution et vérifiez qu'il contient `cache-memory: loaded 0 items`. Cela confirme que le cache démarre vide et s'initialise correctement.

### Declencher une deuxieme execution et confirmer la reutilisation de la memoire

1. Déclenchez le workflow une deuxième fois sans nouvelle issue.
2. Ouvrez le journal de cette deuxième exécution et trouvez `cache-memory: loaded N items`.
3. Vérifiez que `N` correspond au nombre d'issues traitées lors de la première exécution.

### Tester la deduplication avec une nouvelle issue

1. Ouvrez une nouvelle issue dans votre dépôt d'exercice.
2. Déclenchez à nouveau le workflow.
3. Vérifiez que l'exécution ne signale que cette nouvelle issue.

> [!TIP]
> Ouvrez le journal de la deuxième exécution et cherchez la ligne où l'agent lit sa mémoire. Les numéros d'issues enregistrés sur lesquels il filtre y apparaissent ; c'est ainsi que votre workflow se souvient d'une exécution à l'autre.

## :white_check_mark: Checkpoint

- [ ] Le frontmatter de votre workflow contient `cache-memory:` imbriqué sous `tools:`
- [ ] Votre brief de tâche indique explicitement à l'agent de lire et d'écrire dans l'emplacement mémoire nommé
- [ ] Le lock file compilé a été mis à jour et committé en même temps que la source du workflow
- [ ] Le journal de la première exécution manuelle inclut `cache-memory: loaded 0 items`
- [ ] Le journal de la deuxième exécution inclut `cache-memory: loaded N items`, et `N` correspond au nombre d'éléments de la première exécution
- [ ] Après avoir ouvert une nouvelle issue et relancé le workflow, seule la nouvelle issue est signalée

<!-- journey: all -->

**Suite :** [Decoupez les workflows complexes avec des Inline Sub-Agents](21-inline-sub-agents.md)

<!-- /journey -->
