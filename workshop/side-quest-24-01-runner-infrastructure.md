<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : exploration approfondie de l’infrastructure des self-hosted runners

> _Complément de [Exécutez votre agentic workflow sur un self-hosted runner](24-self-hosted-runners.md). Utilisez cette quête annexe lorsque votre environnement enterprise exige des [ephemeral runners](https://github.github.com/gh-aw/reference/self-hosted-runners/), une configuration proxy ou une isolation réseau air-gapped._

## 📋 Avant de commencer

- Vous avez terminé [Exécutez votre agentic workflow sur un self-hosted runner](24-self-hosted-runners.md) ou vous êtes en train de la suivre.
- Vous avez accès à votre infrastructure enterprise de runners, ou pouvez consulter votre administrateur.

## Ephemeral et [JIT runners](https://github.github.com/gh-aw/reference/self-hosted-runners/)

Les ephemeral runners sont détruits après un seul job. Chaque exécution démarre donc sur une machine neuve, ce qui évite toute fuite d’état entre exécutions. Enregistrez-en un avec le flag ephemeral et ciblez-le avec la même stratégie de labels que celle décrite dans l’étape 24.

Les runners just-in-time, ou JIT, sont provisionnés à la demande puis désenregistrés immédiatement après usage. Ils exigent un registration token limité à votre organisation ou à votre dépôt et sont généralement gérés par un runner controller comme actions-runner-controller.

> [!TIP]
> Les ephemeral et JIT runners sont le modèle recommandé pour les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/#what-are-agentic-workflows) en environnement enterprise : ils éliminent l’état résiduel et garantissent que chaque exécution commence dans un environnement propre et connu.

## Exigences proxy et [réseau](https://github.github.com/gh-aw/reference/network/#configuration)

Les [self-hosted runners](https://github.github.com/gh-aw/reference/self-hosted-runners/) des environnements enterprise se trouvent souvent derrière un proxy sortant. L’[agentic engine](https://github.github.com/gh-aw/reference/engines/) doit pouvoir joindre les endpoints du modèle et les API GitHub.

Si votre runner utilise un proxy, définissez ces variables d’environnement dans la configuration système du runner **avant** de l’enregistrer, ou demandez à votre administrateur de confirmer qu’elles sont déjà définies :

```bash
HTTPS_PROXY=https://proxy.example.com:3128
HTTP_PROXY=http://proxy.example.com:3128
NO_PROXY=localhost,127.0.0.1,github.example.com
```

Vous n’avez **pas** besoin de les ajouter au fichier de workflow lui-même : le processus du runner les hérite automatiquement de l’environnement système.

> [!NOTE]
> Le nom d’hôte exact du proxy et le port doivent vous être fournis par votre équipe réseau ou votre administrateur enterprise. Les valeurs ci-dessus ne sont que des exemples.

## Isolation réseau

Si votre runner opère dans un environnement air-gapped ou restreint, assurez-vous qu’il peut joindre l’API GitHub, l’endpoint de votre modèle et tous les [MCP](https://github.github.com/gh-aw/guides/mcps/) tool servers appelés par votre workflow. Travaillez avec votre administrateur réseau pour placer ces endpoints en allowlist avant d’exécuter des agentic workflows.

Vous pouvez utiliser le champ de frontmatter `network.allowed` pour déclarer explicitement les domaines dont votre workflow a besoin :

```markdown
---
network:
    allowed:
        - api.github.com
        - api.example.com
---
```

Après une exécution réussie, l’artifact `firewall.md` fournit une liste prête à l’emploi de chaque domaine contacté par l’agent. Partagez-la avec votre équipe sécurité comme baseline d’allowlist. Consultez [Référence d’audit](side-quest-25-01-audit-reference.md) pour les détails de lecture des logs firewall.

## ✅ Checkpoint

- [ ] Vous comprenez la différence entre ephemeral runners et JIT runners
- [ ] Vous savez où définir les variables d’environnement proxy pour un self-hosted runner
- [ ] Vous pouvez identifier les endpoints qu’un agentic workflow doit joindre, API GitHub, endpoint du modèle, MCP servers
- [ ] Vous savez utiliser `network.allowed` dans le frontmatter pour declarer les domaines requis
- [ ] Vous savez utiliser l’artifact `firewall.md` pour construire une allowlist à destination de votre équipe sécurité

<!-- journey: all -->

Retour à [Exécutez votre agentic workflow sur un self-hosted runner](24-self-hosted-runners.md).

<!-- /journey -->
