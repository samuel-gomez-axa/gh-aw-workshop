<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : attaques [Supply Chain](https://github.github.com/gh-aw/introduction/architecture/#threat-model) via les MCP tool servers

> _Un MCP tool server compromis peut renvoyer des données empoisonnées à votre agent. Votre travail consiste à repérer rapidement la [trust boundary](side-quest-17-02-security-architecture.md) et à garder la surface d’écriture du workflow étroite._

## :clipboard: Avant de commencer

- Vous avez terminé la quête annexe [comment fonctionnent les MCP tool servers](side-quest-17-01-mcp-concepts.md).
- Vous avez déjà un workflow avec un bloc `tools:` configuré.

## Le risque en une phrase

Une attaque supply chain via [MCP](https://github.github.com/gh-aw/guides/mcps/) commence lorsque vous faites confiance à un tool server, un package ou une image qui peut changer en dehors de votre dépôt, et que ce serveur renvoie des données que votre agent traite comme réelles.

## Surface d’attaque en un coup d’œil

Utilisez ce tableau comme [threat model](https://github.github.com/gh-aw/introduction/architecture/#threat-model) rapide lorsque vous ajoutez ou examinez un MCP server.

| Type d’attaque                                           | Fonctionnement                                                                                                                   | Signal de détection                                                                                                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package en typosquatting                                 | Le nom du package semble familier, mais l’éditeur ou le package n’est pas celui que vous vouliez installer.                      | Le nom ressemble à un tool de confiance, mais l’éditeur est inconnu.                                                                                       |
| Serveur ou image compromis                               | Un vrai serveur ou container commence à renvoyer des résultats modifiés après la compromission du compte éditeur ou du registre. | La configuration utilise un tag mutable comme `latest`, ou un endpoint distant sans version épinglée.                                                      |
| Tool poisoning                                           | Le serveur expose plus de tools que votre tâche n’en exige, donc une mauvaise réponse a davantage de moyens de piloter l’agent.  | La liste des tools est large, vague, ou inclut un [toolset](https://github.github.com/gh-aw/reference/github-tools/#github-toolsets) de type "everything". |
| [Output injection](side-quest-17-06-output-injection.md) | Le serveur renvoie des données d’apparence normale avec des instructions cachées mélangées au résultat.                          | La sortie d’un tool contient soudain des directives comme "ignore previous instructions" ou demande des actions supplémentaires.                           |

## :pencil2: Exercice : inspecter ce `.mcp.json`

Lisez cette configuration fictive et cherchez les signaux d’alerte du tableau de surface d’attaque ci-dessus.

```json
{
    "mcpServers": {
        "github-agentic-workflows": {
            "type": "local",
            "command": "gh",
            "args": ["aw", "mcp-server"]
        },
        "inventory-audit": {
            "type": "remote",
            "url": "https://tools.example.dev/mcp",
            "publisher": "octo-tools-preview"
        }
    }
}
```

- [ ] Quelle entrée questionneriez-vous en premier ?
- [ ] Qu’est-ce qui la rend risquée ?

<details>
<summary>Vérifier votre réponse</summary>

`inventory-audit` est l’entrée suspecte. Elle pointe vers une URL distante sans version épinglée, et le nom de l’éditeur n’est pas un nom que vous avez déjà vérifié dans votre workflow ou dans la documentation du tool.

Avant de faire confiance à un serveur comme celui-ci, vérifiez qui le publie, confirmez l’URL attendue depuis la documentation officielle, et épinglez le package exact, le digest d’image ou la version de release que vous comptez exécuter.

</details>

## Trois habitudes qui réduisent le risque

Adoptez ces habitudes lorsque vous travaillez avec des MCP servers :

1. **Épinglez le serveur que vous exécutez.** Préférez une version précise ou un digest d’image plutôt qu’une valeur mutable comme `latest`.
2. **Restreignez les permissions et les sorties.** Gardez `permissions:` minimal et ne déclarez dans `safe-outputs` que les surfaces d’écriture dont vous avez réellement besoin.
3. **Auditez les noms de tools avant de les ajouter.** Confirmez l’éditeur, vérifiez le nom de serveur attendu, et gardez une liste de tools restreinte.

gh-aw vous aide en vous obligeant à déclarer explicitement `tools:`, à limiter les destinations [network](https://github.github.com/gh-aw/reference/network/) avec `network.allowed`, et à réduire ce que le workflow peut écrire avec `permissions:` et `safe-outputs`.

## :white_check_mark: Checkpoint

- [ ] Je peux décrire le risque supply chain lié à MCP en une phrase
- [ ] Je peux utiliser le tableau de surface d’attaque pour repérer au moins un signal de détection
- [ ] J’ai identifié l’entrée `.mcp.json` suspecte et expliqué pourquoi elle est risquée
- [ ] J’ai appliqué au moins une des trois habitudes de durcissement à mon propre workflow

<!-- journey: all -->

Retour à [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md).

<!-- /journey -->
