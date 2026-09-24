<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : choisir entre [Cache Memory](https://github.github.com/gh-aw/reference/cache-memory/) et [Repo Memory](https://github.github.com/gh-aw/reference/repo-memory/)

> _Facultatif : suivez cette référence si vous voulez comprendre en profondeur `cache-memory` et `repo-memory` avant ou après avoir terminé [l’étape 20](20-persistent-memory.md), puis revenez au parcours principal._

## :clipboard: Avant de commencer

- Vous avez un agentic workflow fonctionnel provenant des étapes de construction, [l’étape 7](07-your-first-workflow.md) ou équivalent.
- Vous avez terminé, ou allez commencer, [Faire en sorte que votre workflow se souvienne d’une exécution à l’autre](20-persistent-memory.md).
- Vous comprenez le [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) de [Écrivez votre premier agentic workflow](07-your-first-workflow.md).

`gh-aw` vous donne deux primitives pour persister l’état entre les exécutions de workflow. Elles se comportent différemment, stockent les données à des endroits différents et conviennent à des cas d’usage différents. Cette quête annexe détaille les deux pour vous aider à choisir la bonne pour votre workflow, et à savoir changer si vos besoins évoluent.

---

## Pourquoi la mémoire compte

Chaque exécution de workflow démarre avec une page blanche. C’est très bien pour un résumé quotidien, mais cela pose problème dès que vous voulez :

- **Dédoubler des alertes** : alerter seulement sur les _nouvelles_ issues ouvertes, pas sur les mêmes chaque matin.
- **Comparer à une baseline** : le nombre de tests en échec a-t-il augmenté depuis hier ?
- **Scanner de manière incrémentale** : ignorer les pull requests déjà examinées.

Les deux primitives résolvent cela sans que vous ayez à gérer une base de données :

| Tool                                                                      | Où l’état est stocké                                                                                                  | Durée de vie                                                | Idéal pour                                                              |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`cache-memory`](https://github.github.com/gh-aw/reference/cache-memory/) | [GitHub Actions cache](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows) | Jusqu’à éviction du cache, typiquement 7 jours d’inactivité | Dédoublonnage de courte durée ; données qu’il est acceptable de perdre  |
| [`repo-memory`](https://github.github.com/gh-aw/reference/repo-memory/)   | Un fichier committé dans votre dépôt                                                                                  | Tant que le fichier existe                                  | Baselines durables ; données qui doivent survivre à l’éviction du cache |

---

## Choisir entre les deux

Posez-vous la question : _que se passe-t-il si cette mémoire est perdue ?_

> :thinking: **Prédiction :** Pour chaque scénario ci-dessous, décidez quelle primitive vous utiliseriez avant de lire la colonne « Recommended ». Cachez la colonne de droite, faites vos choix, puis révélez-la pour vérifier.

| Scénario                                                                                 | Primitive recommandée |
| ---------------------------------------------------------------------------------------- | --------------------- |
| Quelques alertes en double lors de l’expiration du cache sont tolérables                 | `cache-memory`        |
| Perdre l’état inonderait votre équipe de faux positifs                                   | `repo-memory`         |
| Vous avez besoin d’une baseline qui survive à un clonage ou à un transfert du dépôt      | `repo-memory`         |
| Vous voulez la configuration la plus simple, sans permissions supplémentaires            | `cache-memory`        |
| Vous devez inspecter ou modifier manuellement l’état stocké                              | `repo-memory`         |
| Vous vous attendez à ce que le workflow s’exécute rarement, moins d’une fois par semaine | `repo-memory`         |

Pour la plupart des cas de dédoublonnage, `cache-memory` est le bon point de départ. Passez à `repo-memory` seulement lorsque le coût d’une perte d’état est trop élevé, par exemple si cette perte inondera votre équipe de faux positifs ou exigera un nettoyage manuel avant que le workflow ne refonctionne correctement.

---

## `cache-memory` en profondeur

`cache-memory` adosse un emplacement mémoire au [GitHub Actions cache](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows). L’agent lit et écrit un petit objet JSON indexé par le nom que vous fournissez.

### Frontmatter `cache-memory`

```markdown
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

### Référence des champs `cache-memory`

| Champ           | Rôle                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tools:`        | Clé parente qui active les intégrations d’outils pour ce workflow.                                                                                                                |
| `cache-memory:` | Indique à `gh-aw` d’adosser cet emplacement mémoire au cache GitHub Actions.                                                                                                      |
| `key:`          | Nom unique de cet emplacement mémoire. Préfixez-le avec le nom de votre workflow pour éviter les collisions si vous avez plusieurs workflows dans le même dépôt.                  |
| `ttl: 7d`       | Durée de conservation des données en cache sans rafraîchissement. Après 7 jours sans exécution, le cache expire et l’agent repart de zéro. Valeurs courantes : `1d`, `7d`, `30d`. |

### Exemple de task brief `cache-memory`

Consultez l’exemple de task brief dans [Faire en sorte que votre workflow se souvienne d’une exécution à l’autre](20-persistent-memory.md) pour une illustration complète de ce modèle.

---

## `repo-memory` en profondeur

`repo-memory` adosse un emplacement mémoire à un fichier JSON committé directement dans votre dépôt. L’agent lit le fichier au début de chaque exécution et en commit une version mise à jour à la fin.

### Frontmatter `repo-memory`

```markdown
---
name: Daily Status Report
on:
    schedule: daily
    workflow_dispatch: {}
permissions:
    contents: write
    issues: write
tools:
    repo-memory: true
---
```

### Référence des champs `repo-memory`

| Champ          | Rôle                                                                             |
| -------------- | -------------------------------------------------------------------------------- |
| `tools:`       | Clé parente qui active les intégrations d’outils pour ce workflow.               |
| `repo-memory:` | Active la mémoire adossée au dépôt pour ce workflow, avec `true` pour l’activer. |

> [!IMPORTANT]
> `repo-memory` exige `contents: write` dans votre bloc `permissions:` afin que l’agent puisse committer le fichier mis à jour. Ajoutez-le en plus de vos permissions existantes. Cette permission est plus large que ce qu’exige `cache-memory` ; gardez les données stockées petites et examinez régulièrement les commits.

Gardez les données stockées petites, par exemple une liste d’ID ou un objet résumé compact, afin d’éviter d’encombrer l’historique avec de gros changements de fichiers.

### Exemple de task brief `repo-memory`

```markdown
You compare today's open issue count against a stored baseline.

Use your `daily-status-baseline.json` memory to store the issue count from the
previous run. On each run:

1. Fetch all currently open issues and count them.
2. Read the baseline from your memory. If no baseline exists, treat it as zero.
3. Calculate the delta: today's count minus the baseline.
4. Post a comment summarising the delta ("3 new issues since yesterday" or
   "no change").
5. Write today's count back to your memory as the new baseline.
```

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez expliquer la différence entre `cache-memory` et `repo-memory`
- [ ] Vous savez quand choisir chaque primitive selon votre cas d'usage
- [ ] Vous comprenez a quoi sert `contents: write` et dans quels cas il est requis
- [ ] Vous pouvez ecrire un task brief qui lit et ecrit explicitement un emplacement memoire nomme

---

<!-- journey: all -->

Retour à [Faire en sorte que votre workflow se souvienne d’une exécution à l’autre](20-persistent-memory.md).

<!-- /journey -->
