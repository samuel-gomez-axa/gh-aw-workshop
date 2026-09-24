<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : comment fonctionnent les MCP tool servers

> _Facultatif : suivez cette introduction après [l’étape 17](17-add-mcp-tools.md) si vous voulez comprendre comment MCP a changé la boucle agentique de votre workflow, puis poursuivez vers l’étape suivante._

## 📋 Avant de commencer

- Vous avez terminé [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md).
- Vous avez un fichier YAML de workflow ouvert dans votre éditeur.

Par défaut, un agent gh-aw lit votre [task brief](https://github.github.com/gh-aw/reference/markdown/) et produit du texte. **MCP ([Model Context Protocol](https://github.github.com/gh-aw/reference/mcp-gateway/))** dépasse cette limite : il permet à l’agent d’appeler des outils structurés à l’exécution et d’intégrer des données réelles dans sa sortie.

---

## Qu’est-ce que MCP ?

[**Model Context Protocol**](https://github.github.com/gh-aw/reference/mcp-gateway/) est un standard ouvert, initialement développé par Anthropic, qui définit une manière uniforme pour les modèles d’IA d’appeler des outils externes. Au lieu de construire une intégration spécifique pour chaque API que vous voulez faire utiliser par l’agent, MCP vous donne un protocole unique. Un serveur parle MCP ; l’agent l’appelle. C’est tout le contrat.

Un tool server est un processus qui :

1. annonce une liste d’opérations nommées, les tools, avec des entrées et sorties typées ;
2. exécute ces opérations à la demande lorsque l’agent les appelle ;
3. renvoie des résultats structurés sur lesquels l’agent peut raisonner.

Le GitHub MCP server, par exemple, expose des tools comme `list_issues`, `get_pull_request`, `list_commits` et des dizaines d’autres. Quand l’agent appelle `list_issues`, le serveur effectue la requête à l’API GitHub et renvoie le résultat.

---

## Comment la boucle agentique change

Sans MCP, la boucle agentique ressemble à ceci :

```
Read brief → Generate response → Done
```

Avec MCP activé, la boucle devient itérative :

```
Read brief
  → Decide which tools to call
  → Call tool(s) → Receive results
  → Reason about results
  → Call more tools if needed
  → Generate final response
```

L’agent peut entrelacer appels d’outils et raisonnement autant de fois que nécessaire. Il décide _quels_ tools appeler et _quand_ ; vous n’écrivez pas cela dans le brief. Vous dites simplement à l’agent quel résultat vous voulez.

---

## Exercice pratique

Ouvrez le frontmatter YAML de votre workflow. Contient-il un bloc [`tools:`](https://github.github.com/gh-aw/reference/tools/) ? Si oui, identifiez quel MCP server est configuré et écrivez-le dans l’espace ci-dessous ou dans un commentaire temporaire du fichier.
Ouvrez le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) YAML de votre workflow. Contient-il un bloc [`tools:`](https://github.github.com/gh-aw/reference/tools/) ? Si oui, identifiez quel MCP server est configuré et écrivez-le dans l’espace ci-dessous ou dans un commentaire temporaire du fichier.

```text
MCP server configuré :
```

---

## À quoi sert le bloc de frontmatter `tools:`

Le bloc `tools:` dans le frontmatter YAML de votre workflow indique à gh-aw quels MCP servers démarrer avant l’exécution de l’agent :

```markdown
---
tools:
    github:
        mode: gh-proxy
        toolsets: [default]
---
```

| Champ                 | Ce qu’il contrôle                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tools:`              | Clé parente. Liste chaque tool server que l’agent peut utiliser.                                                                                       |
| `github:`             | Démarre le GitHub MCP server. L’agent peut maintenant appeler les tools de l’API GitHub.                                                               |
| `mode: gh-proxy`      | Fait passer tous les appels GitHub tool via un proxy de sécurité qui applique le bloc `permissions`. L’agent ne peut pas dépasser les scopes déclarés. |
| `toolsets: [default]` | Précise quels groupes de tools exposer. `default` inclut les issues, les PR, les commits et Actions.                                                   |

> [!NOTE]
> Vous pouvez avoir plusieurs entrées sous `tools:` si vous voulez connecter plus d’un MCP server. Chaque entrée démarre un processus serveur distinct.

Si vous travaillez en local, lancez cette commande pour confirmer que votre bloc `tools:` ne contient aucune erreur de schéma :

```bash
gh aw validate
```

---

## Comment fonctionnent les toolsets

Un [toolset](https://github.github.com/gh-aw/reference/github-tools/#github-toolsets) est un sous-ensemble nommé des tools fournis par un serveur. Les toolsets vous permettent d’accorder à l’agent l’accès aux seuls tools dont il a besoin, ce qui réduit la surface propice aux comportements non intentionnels.

Le GitHub MCP server fournit ces toolsets :

| Toolset         | Ce qu’il inclut                                                         |
| --------------- | ----------------------------------------------------------------------- |
| `default`       | Issues, pull requests, commits, exécutions Actions, contenu de fichiers |
| `discussions`   | Discussions du depot et commentaires                                    |
| `code_security` | Alertes Dependabot, alertes de code scanning                            |

Pour activer plusieurs toolsets, fournissez une liste :

```markdown
---
tools:
    github:
        mode: gh-proxy
        toolsets: [default, discussions]
---
```

---

## Lire les appels MCP tool dans le log Actions

Quand vous exécutez un workflow avec MCP activé, le log Actions affiche chaque appel d’outil effectué par l’agent. Cherchez des lignes comme :

```
[tool_use] list_issues  {"owner":"…","repo":"…","state":"open"}
[tool_result] list_issues  → 7 issues returned
```

Cette trace rend visible la boucle agentique. Vous pouvez voir :

- **Quels tools l’agent a choisis** : utile pour vérifier qu’il fait bien ce que vous vouliez.
- **Quels paramètres il a passés** : utile pour déboguer des appels d’API incorrects ou inattendus.
- **Quels résultats il a reçus** : confirme les données vivantes utilisées par l’agent pour construire sa sortie.

Si l’agent effectue un appel d’outil auquel vous ne vous attendiez pas, revenez à votre task brief. Ajouter des instructions plus précises sur les tools à utiliser, ou à éviter, influence ses décisions sans nécessiter de modification de code.

---

## Concepts de confiance et de sécurité

Comme les MCP tool servers reçoivent et renvoient des données à l’exécution, quelques concepts de sécurité s’appliquent spécifiquement à cet environnement. Vous les retrouverez dans la quête annexe [attaques supply chain via MCP](side-quest-17-05-supply-chain-mcp.md).

**[Supply chain](https://github.github.com/gh-aw/introduction/architecture/#threat-model) attack through MCP** : se produit lorsqu’un tool server auquel votre agent fait confiance renvoie des données manipulées au lieu des vraies. Plutôt que de compromettre directement votre fichier de workflow, l’attaquant cible le tool server, ce qui fait qu’un même fichier de workflow peut produire des résultats nocifs.

**Poisoned payload** : les données manipulées renvoyées par un tool server compromis. Il peut s’agir de données fabriquées, comme de fausses listes d’issues, ou d’instructions intégrées qui redirigent l’agent vers des actions non intentionnelles.

**[Blast radius](https://github.github.com/gh-aw/introduction/architecture/#threat-model)** : l’étendue des dommages qu’une attaque réussie peut provoquer. Pour des agents basés sur MCP, le blast radius est plus grand que pour une vulnérabilité de dépendance traditionnelle, car le payload est interprété par un modèle d’IA qui peut agir sur des instructions intégrées.

---

## ✅ Checkpoint

- [ ] Vous pouvez expliquer ce qu’est un MCP tool server et ce qu’il fournit à l’agent
- [ ] Vous comprenez comment l’activation de MCP change la boucle de raisonnement agentique
- [ ] Vous avez localisé le bloc `tools:` dans votre workflow et identifié le nom du MCP server
- [ ] Vous savez à quoi sert chaque champ du bloc `tools:` dans le frontmatter
- [ ] Vous savez utiliser les toolsets pour limiter l'acces de l'agent aux tools
- [ ] Vous savez ou trouver les appels MCP tool dans le log Actions

---

<!-- journey: all -->

Retour à [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md).

<!-- /journey -->
