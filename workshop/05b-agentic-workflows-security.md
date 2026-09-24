<!-- page-journey: all -->
<!-- page-adventure: core -->

# Comment les Agentic Workflows restent sûrs

## :clipboard: Avant de commencer

- Vous avez lu [Qu’est-ce qu’un Agentic Workflow ?](05-agentic-workflows-intro.md)

Autoriser un agent IA à agir sur votre dépôt selon un [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule) ne fonctionne que s’il ne peut pas causer de dégâts. Les agentic workflows imposent deux frontières de confiance afin que vous puissiez exécuter des agents en automatisation avec confiance.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/05-agent-run-log-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/05-agent-run-log-light.svg">
  <img alt="Exécution GitHub Actions animée montrant quatre jobs de sécurité : activation valide que l’agent est autorisé à s’exécuter, agent s’exécute avec sandbox, firewall et filtre d’intégrité activés, detection recherche du code malveillant, et safe-outputs applique les changements dans les garde-fous" src="images/05-agent-run-log-light.svg">
</picture>

## Sûr par conception : sandbox + sorties protégées par garde-fous

- **Une [sandbox](https://github.github.com/gh-aw/reference/sandbox/) autour de l’agent.** L’agent s’exécute de manière isolée dans l’[Agent Workflow Firewall](https://github.github.com/gh-aw/reference/sandbox/), avec un accès **read-only** à votre dépôt et une [sortie réseau](https://github.github.com/gh-aw/reference/network/) limitée aux domaines que vous autorisez. Même si une [prompt injection](https://github.github.com/gh-aw/reference/threat-detection/) ou un outil compromis tente de contacter un service externe ou d’exfiltrer des données, le firewall bloque tout ce qui n’est pas dans l’allowlist.
- **Un système de [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) protégé par des garde-fous pour les écritures.** L’agent ne détient jamais les permissions d’écriture. À la place, il émet une _structured request_, par exemple « créer cette issue » ou « publier ce commentaire », puis un job séparé, limité par permissions, la valide et l’exécute en appliquant des limites par opération : nombre maximal, contraintes sur les labels et le titre, dépôts autorisés. Cette séparation vous donne le principe du moindre privilège, une défense contre la prompt injection et une piste d’audit complète de chaque action.

Les jobs de sécurité du journal d’exécution ci-dessus correspondent à ces frontières : **activation** vérifie que l’agent est autorisé à s’exécuter, **agent** s’exécute dans une sandbox derrière le firewall, **detection** recherche des comportements malveillants, et **safe-outputs** applique les changements dans les garde-fous.

<details open>
<summary>Pourquoi l’agent ne peut-il pas écrire directement dans le dépôt ?</summary>

Un accès direct en écriture ferait de chaque prompt injection une attaque potentielle de la supply chain. En gardant l’agent en read-only et en faisant passer tous les changements par le système de safe-output, une instruction malveillante récupérée depuis le texte d’une issue ou une page chargée peut, au pire, produire une _request_ que les garde-fous rejettent ou limitent. Elle ne peut jamais pousser du code discrètement, divulguer des secrets ou ouvrir un nombre illimité de pull requests.

</details>

Le schéma ci-dessous montre comment les deux couches travaillent ensemble au sein d’une même exécution de workflow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/05b-security-layers-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/05b-security-layers-light.svg">
  <img alt="Modèle de sécurité à deux couches : un trigger schedule démarre un agentic workflow ; l’agent s’exécute dans une sandbox avec un firewall qui limite la network egress ; il émet une structured output request ; un job safe-outputs séparé et limité par permissions valide et applique les changements au dépôt" src="images/05b-security-layers-light.svg">
</picture>

## Essayez : sandbox ou safe-output ?

Pour chacun des scénarios ci-dessous, décidez si la **sandbox** ou le **safe-output system** constitue la défense principale. Prenez votre décision avant d’afficher la réponse.

**Scénario A :** A prompt injected into an issue comment instructs the agent to push to a protected branch.

- [ ] J’ai pris ma décision pour le scénario A

<details>
<summary>Afficher la réponse du scénario A</summary>

**Safe-output system.** L’agent ne possède aucune permission d’écriture. Même si l’instruction injectée amène l’agent à produire une demande d’écriture, le job séparé, limité par permissions, la valide par rapport aux garde-fous et rejette toute opération en dehors du cadre autorisé.

</details>

**Scénario B :** A page the agent fetches during a run tries to send your repository secrets to an external server.

- [ ] J’ai pris ma décision pour le scénario B

<details>
<summary>Afficher la réponse du scénario B</summary>

**Sandbox / Agent Workflow Firewall.** Le trafic réseau sortant est limité à la liste autorisée de domaines. Toute requête vers un domaine non listé est bloquée par le firewall avant de quitter le runner ; la tentative d’exfiltration n’atteint jamais le serveur externe.

</details>

## :white_check_mark: Checkpoint

- [ ] Je peux décrire ce que fait la sandbox et pourquoi elle est importante pour la sécurité de l’automatisation
- [ ] Je peux expliquer comment le système safe-output empêche l’agent d’écrire directement dans le dépôt
- [ ] Je peux identifier si la sandbox ou le système safe-output constitue la défense principale pour un scénario donné
- [ ] Je peux expliquer comment le modèle à deux couches rend les agentic workflows sûrs à exécuter selon un schedule

<!-- journey: all -->

**Étape suivante :** [Exercice : reconnaître les Agentic Workflows](05c-agentic-workflows-practice.md)

<!-- /journey -->
