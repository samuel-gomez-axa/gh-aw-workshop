<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : escalade de permissions dans les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/#what-are-agentic-workflows)

> _Facultatif : suivez cette introduction a la securite pour voir comment un workflow avec un scope trop large peut donner a un agent mal oriente plus d'autorite que votre tache n'en exige._

## 📋 Avant de commencer

Vous avez terminé [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md) et vous avez un fichier de workflow fonctionnel qui utilise `safe-outputs`.

---

## Qu’est-ce que l’escalade de permissions ?

La permission escalation signifie que l’agent se retrouve avec **plus d’autorité que la tâche n’en a besoin**. Vous voulez peut-être un simple résumé en lecture seule. Mais si votre workflow laisse des chemins d’écriture larges ouverts, un mauvais prompt ou un raisonnement approximatif peut transformer cette tâche de résumé en modification inattendue du dépôt.

---

## À quoi cela ressemble en pratique

Imaginez un workflow avec un seul job : lire les issues ouvertes, lire les commits récents et rédiger un résumé quotidien.

Imaginez maintenant que ce même workflow autorise l’agent à ouvrir une pull request qui touche n’importe quel fichier. Une description d’issue malveillante ou une [prompt injection](https://github.github.com/gh-aw/introduction/architecture/#threat-model) pourrait pousser l’agent à modifier `README.md` ou des fichiers de workflow. Vous n’avez jamais demandé cela.

Voilà le problème. L’auteur du workflow a demandé un certain niveau d’autorité. La configuration en a exposé un plus large.

---

## Pourquoi les agentic workflows ont besoin d’un cadrage plus strict que la CI/CD classique

Un pipeline CI/CD classique exécute un script fixe. Si le script dit de lancer des tests, il lance des tests. Il n’invente pas d’étapes supplémentaires.

Un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/) est différent. Vous fixez des limites en amont. Mais l’agent décide à l’exécution quels tools appeler et s’il doit utiliser une surface d’écriture. Chaque permission supplémentaire augmente le risque. Si la tâche n’a besoin que d’un accès en lecture, tout chemin d’écriture ouvert augmente le blast radius d’un agent mal orienté.
Un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/) est différent. Vous fixez des limites en amont. Mais l’agent décide à l’exécution quels tools appeler et s’il doit utiliser une surface d’écriture. Chaque permission supplémentaire augmente le risque. Si la tâche n’a besoin que d’un accès en lecture, tout chemin d’écriture ouvert augmente le [blast radius](https://github.github.com/gh-aw/introduction/architecture/#threat-model) d’un agent mal orienté.

---

## Comment gh-aw limite le blast radius

gh-aw vous donne trois couches de contrôle selon le principe du moindre privilège :

| Couche                                                  | Ce qu’elle limite                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `permissions:` minimales                                | Les API GitHub que le workflow peut appeler                                            |
| `safe-outputs` restreints                               | Les opérations d’écriture que l’agent peut effectuer                                   |
| `protected-files` dans une sortie autorisant l’écriture | Les fichiers qui exigent une revue supplémentaire avant qu’un changement soit appliqué |

Pour le modèle mental complet derrière ces couches, lisez [Quête annexe : architecture de sécurité des agentic workflows (comme si vous aviez 5 ans)](side-quest-17-02-security-architecture.md).

---

## Modèle en lecture seule

Si votre workflow n'a besoin que d'observer l'etat du depot, gardez-le en lecture seule :

```markdown
---
permissions:
    contents: read
    issues: read
    pull-requests: read
    copilot-requests: write
tools:
    github:
        mode: gh-proxy
        toolsets: [default]
---
```

Avec cette configuration, l’agent peut lire des données et générer une sortie. Il n’a aucun chemin pour créer une PR, publier un commentaire ou modifier un fichier.

### 🛠️ Essayez : auditez votre propre workflow

Ouvrez votre fichier de workflow. Vérifiez le bloc `permissions:` et répondez à ces trois questions :

- [ ] Chaque permission listée a-t-elle une raison claire liée à votre tâche ?
- [ ] Existe-t-il des permissions `write` que votre tâche n’utilise pas réellement ?
- [ ] Pourriez-vous remplacer une permission `write` par `read` tout en gardant un workflow fonctionnel ?

Si vous avez répondu oui à la deuxième ou à la troisième question, supprimez ou réduisez cette permission maintenant.

---

## Modèle avec écriture autorisée et fichiers protégés

Lorsque l'agent doit proposer des changements, gardez la surface d'ecriture etroite et protegez les fichiers sensibles :

```markdown
---
permissions:
    contents: read
    pull-requests: read
    copilot-requests: write
tools:
    github:
        mode: gh-proxy
        toolsets: [default]
safe-outputs:
    create-pull-request:
        protected-files:
            policy: request_review
            exclude:
                - 'README.md'
                - '.github/workflows/**'
        allowed-files:
            - 'workshop/*.md'
            - 'workshop/**/*.md'
---
```

Cela ne donne **pas** à l’agent un accès en écriture ouvert. Cela lui donne un seul chemin contraint : proposer une pull request, limitée à des fichiers précis, avec une revue supplémentaire si le changement atteint des chemins protégés.

C’est la défense clé. Un agent mal orienté ne peut pas transformer silencieusement une tâche documentaire en mutation arbitraire du dépôt.

### 🛠️ Essayez : ajoutez [protected-files](https://github.github.com/gh-aw/reference/safe-outputs-pull-requests/) à votre workflow

1. Ouvrez votre fichier de workflow et trouvez le bloc `safe-outputs`.
2. Ajoutez une entrée `protected-files` qui exclut `.github/workflows/daily-status.md`.
3. Avant d’enregistrer, prédisez ce qui se passerait si l’agent essayait de modifier `.github/workflows/daily-status.md`.

Écrivez votre prédiction ici, puis enregistrez et lancez le workflow pour la vérifier :

> _Ma prédiction : ..._

---

## Bonnes pratiques pour les auteurs de workflow

| Pratique                                                                                                                                      | Pourquoi c’est utile                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Commencer avec le plus petit bloc `permissions:` possible                                                                                     | Supprime des capacités avant même que l’agent ne s’exécute                      |
| Ajouter `safe-outputs` seulement quand la tâche exige une action d’écriture                                                                   | Évite des chemins d’écriture accidentels dans des workflows en lecture seule    |
| Utiliser `allowed-files` pour limiter les écritures à une partie du dépôt                                                                     | Empêche qu’une tâche étroite déborde sur des fichiers sans rapport              |
| Ajouter `protected-files` pour les chemins à haut risque                                                                                      | Force une revue humaine avant toute modification de fichiers sensibles          |
| Traiter le [task brief](https://github.github.com/gh-aw/reference/markdown/) et le cadrage des capacités comme un seul problème de conception | Un brief clair aide, mais les limites doivent tenir même si le brief est ignoré |

---

## ✅ Checkpoint

- [ ] Vous pouvez expliquer la permission escalation en langage simple
- [ ] Vous avez audité votre propre bloc `permissions:` au regard du principe du moindre privilège
- [ ] Vous pouvez décrire comment `permissions:`, `safe-outputs` et `protected-files` fonctionnent ensemble
- [ ] Vous avez ajouté `protected-files` à votre workflow et prédit ce que cela bloquerait

---

<!-- journey: all -->

Retour à [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md).

<!-- /journey -->
