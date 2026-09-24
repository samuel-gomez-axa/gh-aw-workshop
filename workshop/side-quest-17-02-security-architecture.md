<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : architecture de sécurité des agentic workflows (comme si vous aviez 5 ans)

> _Facultatif : suivez cette introduction visuelle si vous voulez un modèle mental intuitif pour comprendre pourquoi gh-aw utilise un [sandbox](https://github.github.com/gh-aw/reference/sandbox/), où l’agent s’exécute et quelles sorties sont considérées comme sûres._

## 📋 Avant de commencer

- Vous comprenez les bases des agentic workflows grâce à [Que sont les agentic workflows ?](05-agentic-workflows-intro.md).
- Vous avez un workflow avec le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) `permissions` et `tools` issu de [Écrivez votre premier agentic workflow](07-your-first-workflow.md).
- Vous avez commencé, ou allez commencer, [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md).

Imaginez votre workflow comme un assistant intelligent dans une salle de jeux.

- Le **repository** est votre boîte à jouets.
- L’**agent** est l’assistant qui peut regarder les jouets et les organiser.
- Le **[sandbox](https://github.github.com/gh-aw/reference/sandbox/)** est la limite de la zone de jeu qui empêche l’assistant de courir dans la rue.

---

## Pourquoi vous avez besoin d’un sandbox

Un assistant puissant sans limites peut faire des choses dangereuses par accident.

Le sandbox donne à votre assistant des règles claires :

- Il ne peut utiliser que les tools que vous avez autorisés.
- Il ne peut faire que des actions couvertes par les permissions que vous avez déclarées.
- Il ne peut pas atteindre des endroits arbitraires en dehors de l’environnement du workflow.
- Il ne peut utiliser que les tools que vous avez autorisés.
- Il ne peut faire que des actions couvertes par les [permissions](https://github.github.com/gh-aw/reference/permissions/) que vous avez déclarées.
- Il ne peut pas atteindre des endroits arbitraires en dehors de l’environnement du workflow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-17-02-sandbox-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-17-02-sandbox-light.svg">
  <img alt="Modèle de limite sandbox pour les agentic workflows" src="images/side-quest-17-02-sandbox-light.svg">
</picture>

Sans sandbox, une seule erreur pourrait affecter trop de choses. Avec un sandbox, les erreurs restent contenues.

---

## Où l’agent s’exécute réellement

Par défaut, l’agent ne s’exécute **pas** sur votre ordinateur. Dans le parcours de cet atelier, il s’exécute dans un job GitHub Actions sur un runner temporaire.

Cela signifie que :

- l’environnement est créé pour cette exécution ;
- l’agent y lit votre brief de workflow et le contexte du dépôt ;
- lorsque l’exécution se termine, cet environnement d’exécution est supprimé.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-17-02-runtime-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-17-02-runtime-light.svg">
  <img alt="Emplacement d’exécution de l’agent dans GitHub Actions" src="images/side-quest-17-02-runtime-light.svg">
</picture>

Cette conception réduit les risques de longue durée parce que l’environnement est temporaire et isolé.

---

## Ce que signifie « [safe output](https://github.github.com/gh-aw/reference/safe-outputs/) »

Une safe output est une information utile qui évite les fuites nocives ou les actions dangereuses.

Une bonne sortie :

- résume l’activité du dépôt, comme les issues, les PR, les commits ou l’état de la CI ;
- utilise des résultats d’outils approuvés et évite d’inventer des données cachées ;
- évite les secrets, tokens, identifiants et données personnelles privées ;
- reste dans les permissions et l’intention que vous avez définies.

> [!NOTE]
> Traitez les logs et les commentaires comme des surfaces visibles par les collaborateurs. Ne concevez jamais de prompts qui demandent à l’agent d’afficher des secrets.

---

## L’architecture de sécurité en une phrase

Vous déclarez **[permissions](https://github.github.com/gh-aw/reference/permissions/) + tools + task intent**, le runner applique les limites, et l’agent produit une sortie contrainte à partir de données autorisées.

Voici à quoi ressemble en pratique un frontmatter de workflow correctement délimité :

```markdown
---
permissions:
    contents: read
    issues: read
tools:
    github:
        mode: gh-proxy
safe-outputs:
    add-comment: # presence flag — declares this output surface is allowed
network:
    allowed:
        - api.github.com
        - copilot-proxy.githubusercontent.com
---
```

> 🤔 **Prédiction :** Que se passerait-il si vous supprimiez `network.allowed` du frontmatter ci-dessus et qu’un prompt injecté demandait à l’agent d’envoyer des données vers une URL externe ?
> 🤔 **Prédiction :** Que se passerait-il si vous supprimiez [`network.allowed`](https://github.github.com/gh-aw/reference/network/#caller-extensible-allowlist-networkallowed-input) du frontmatter ci-dessus et qu’un prompt injecté demandait à l’agent d’envoyer des données vers une URL externe ?

---

## ✅ Checkpoint

- [ ] Vous pouvez expliquer pourquoi les limites du sandbox réduisent le risque dans les agentic workflows
- [ ] Vous pouvez décrire où l’agent s’exécute pendant l’exécution d’un workflow de l’atelier
- [ ] Vous pouvez citer ce qui rend une sortie sûre ou non sûre
- [ ] Vous pouvez expliquer comment `permissions`, `tools` et le [task brief](https://github.github.com/gh-aw/reference/markdown/) fonctionnent ensemble comme architecture de sécurité

---

<!-- journey: all -->

Retour à [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md).

<!-- /journey -->
