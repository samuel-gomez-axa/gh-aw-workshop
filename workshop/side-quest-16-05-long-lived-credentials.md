<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : risques liés aux identifiants longue durée dans les agentic workflows

> _Facultatif : suivez cette introduction a la securite pour comprendre pourquoi les personal access tokens creent une surface d'attaque plus grande que le `GITHUB_TOKEN` ephemere, surtout dans des workflows agentiques sans supervision._

## :clipboard: Avant de commencer

- Vous avez commencé [Connecter une source de données en direct à votre workflow](16-connect-data-source.md).
- Vous comprenez que `${{ secrets.GITHUB_TOKEN }}` est le token GitHub intégré, fourni automatiquement pour chaque exécution de workflow.
- Vous êtes familier avec [Quête annexe : stocker des identifiants avec GitHub Secrets](side-quest-16-02-secrets-and-permissions.md).

---

## Le risque central : des identifiants qui n’expirent jamais

Un **personal access token (PAT)** est un identifiant que vous générez manuellement et stockez dans un secret. Il :

- reste valide pendant des jours, des mois, voire indéfiniment, selon sa configuration.
- porte tous les scopes que vous lui avez accordés lors de sa création, sur tous les dépôts touchés par ces scopes.
- reste valide tant que vous ne le révoquez pas explicitement.

Le `GITHUB_TOKEN` intégré est différent. GitHub le crée au début de chaque exécution et l’invalide au moment même où elle se termine. Pas de rotation. Pas d’étape de révocation. Aucun identifiant qui persiste après la fin du job.

Pour un workflow agentique planifié, sans supervision, qui s’exécute chaque jour, cette différence compte énormément.

---

## Pourquoi les workflows sans supervision amplifient le risque

Les scripts CI/CD classiques sont étroits et [deterministic](https://github.github.com/gh-aw/patterns/deterministic-ops/) : ils exécutent un ensemble fixe de commandes. Si un PAT fuit depuis un pipeline classique, l’attaquant obtient ce que ces commandes précises exigeaient.

Un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/#what-are-agentic-workflows) est plus large. L’agent décide à l’exécution quels outils appeler. Si un PAT à large scope fuit, cela peut arriver via :

- une dépendance compromise
- le contenu malveillant d’une issue ou d’une PR qui pousse l’agent à l’afficher
- une surface `safe-outputs` mal configurée

Lorsque cela arrive, l’attaquant obtient un accès à tous les dépôts et organisations couverts par le PAT, pas seulement celui visé par le workflow. Le PAT n’expire pas de lui-même. Il persiste jusqu’à ce que quelqu’un le remarque et le révoque manuellement.

Les workflows sans supervision s’exécutent sans humain pour surveiller chaque log. La fenêtre entre la fuite et sa découverte peut durer des heures ou des jours.

---

## Comment gh-aw limite le [blast radius](https://github.github.com/gh-aw/introduction/architecture/#threat-model)

gh-aw vous donne trois mécanismes de conception qui réduisent le risque lié aux identifiants de longue durée de vie :

### Préférer le `GITHUB_TOKEN` éphémère

Pour toute opération qui ne touche que le dépôt courant, utilisez `${{ secrets.GITHUB_TOKEN }}` plutôt qu’un PAT. Vous n’avez ni à le créer, ni à le faire tourner, ni à le révoquer. La fenêtre de risque est la durée d’une seule exécution.

```markdown
- name: Fetch open issues
  id: issues
  run: |
  gh issue list --state open --limit 10 --json number,title \
   --jq '.[] | "#\(.number) \(.title)"'
  env:
  GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Garder `permissions:` minimal

Même un `GITHUB_TOKEN` éphémère comporte un risque s’il a trop de scopes. Ne déclarez que les [permissions](https://github.github.com/gh-aw/reference/permissions/) dont votre tâche a réellement besoin. Dans gh-aw, les permissions `write` sont rejetées par le compilateur pour des raisons de sécurité : utilisez des scopes en lecture seule ou `none`, et laissez toute intention d’écriture derrière [`safe-outputs`](https://github.github.com/gh-aw/reference/safe-outputs/).

Comparez les deux blocs ci-dessous :

```markdown
# ❌ Invalid in gh-aw: write permissions are rejected by the compiler

# Use safe-outputs for any write operation instead.

---

permissions:
contents: write
issues: write
pull-requests: write

---
```

```markdown
# ✅ Safe: minimal scopes matching actual needs

---

permissions:
contents: read
issues: read

---
```

Avec des permissions en lecture seule, un token compromis ou mal orienté ne peut ni pousser du code, ni ouvrir des PR, ni modifier des secrets, même si un attaquant y accède pendant la fenêtre d’exécution.

> [!TIP]
> Si un appel avec `GITHUB_TOKEN` échoue avec une erreur 403, vérifiez que la permission requise est bien listée. Ajouter la permission minimale qui permet à l’appel de réussir est plus sûr que d’élargir par défaut à `write`.

### Utiliser `network.allowed` pour bloquer l’exfiltration

Si un PAT est présent dans l’environnement du workflow, le principal risque est qu’il puisse être envoyé vers un endpoint contrôlé par un attaquant. Une allowlist `network` arrête cela à la [network layer](https://github.github.com/gh-aw/reference/network/) :

```markdown
---
network:
    allowed:
        - api.github.com
        - copilot-proxy.githubusercontent.com
---
```

Même si une instruction injectée demande à l’agent d’envoyer un PAT avec `curl` vers un serveur externe, la connexion est rejetée avant qu’aucune donnée ne quitte le runner.

---

## Quand un PAT est inévitable

Parfois, votre workflow a réellement besoin d’un accès dépassant ce que `GITHUB_TOKEN` peut fournir, par exemple pour lire un dépôt privé dans une autre organisation ou appeler une API qui exige un token de compte de service.

Lorsque vous devez utiliser un PAT :

| Pratique                                              | Pourquoi c’est utile                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Utiliser un PAT fine-grained avec les scopes minimaux | Limite ce qu’un attaquant obtient s’il fuit                                        |
| Définir l’expiration la plus courte possible          | Réduit la période pendant laquelle un token divulgué reste valide                  |
| Faire tourner le PAT selon un calendrier              | Un PAT tourné invalide toute copie déjà récupérée par un attaquant                 |
| Injecter le PAT au niveau de l’étape, pas globalement | Le garde hors de l’environnement des autres étapes, y compris celle du prompt d’IA |
| Ajouter `network.allowed`                             | Empêche que le token soit envoyé vers des endpoints contrôlés par un attaquant     |

---

## :pencil2: Exercice : auditer votre workflow actuel

Ouvrez votre fichier de workflow, par exemple `.github/workflows/daily-report.md`, et répondez aux questions suivantes :

- [ ] Vérifiez que le workflow utilise `GITHUB_TOKEN` plutôt qu’un PAT stocké dans un secret partout où c’est possible.
- [ ] Si un PAT est présent, confirmez que ses scopes sont limités au strict nécessaire et n’incluent pas d’accès en écriture à d’autres dépôts.
- [ ] Vérifiez que le workflow déclare un bloc `permissions:` limitant le scope du token à ce qui est nécessaire.

Utilisez la checklist ci-dessous pour consigner vos observations dans un commentaire ou dans le journal d’issues de votre workflow :

```markdown
## Credential audit — <workflow name>

- [ ] Uses `GITHUB_TOKEN` (ephemeral) rather than a PAT where possible
- [ ] PAT scopes are fine-grained and limited to the minimum required
- [ ] `permissions:` block is present and restricts to read-only where applicable
- [ ] `network.allowed` is set to prevent outbound credential exfiltration
- [ ] Documented credential type used (PAT or `GITHUB_TOKEN`) and the reason for the choice
```

---

## Comparaison en un coup d’œil

> :thinking: **Prédiction :** Avant de lire le tableau ci-dessous, listez de mémoire les propriétés d’un PAT qui le rendent plus risqué que `GITHUB_TOKEN` dans un workflow sans supervision. Comparez ensuite votre liste au tableau.

| Propriété                  | `GITHUB_TOKEN`                                | PAT                                                  |
| -------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| Créé par                   | GitHub, automatiquement                       | Vous, manuellement                                   |
| Expiration                 | Fin de l’exécution du workflow                | Configurable, potentiellement indéfinie              |
| Scope                      | Limité au dépôt courant                       | Tout dépôt ou organisation que vous avez autorisé    |
| Rotation                   | Automatique, nouveau token a chaque execution | Manuelle ou scriptable                               |
| Révocation en cas de fuite | Automatique à la fin de l’exécution           | Action manuelle requise                              |
| Fenêtre de risque          | De quelques secondes à quelques minutes       | De plusieurs jours à plusieurs mois, voire indéfinie |

---

## Ce que vous pouvez faire en tant qu’auteur de workflow

| Pratique                                                                       | Pourquoi c’est utile                                         |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Utiliser `GITHUB_TOKEN` tant que la tâche reste dans le dépôt courant          | Élimine complètement les identifiants longue durée           |
| Déclarer un bloc `permissions:` minimal                                        | Limite ce que n’importe quel token peut autoriser            |
| Ajouter `network.allowed`                                                      | Bloque l’exfiltration sortante de n’importe quel identifiant |
| Injecter les PAT avec `env:` au niveau de l’étape                              | Garde l’identifiant hors de l’étape du prompt d’IA           |
| Utiliser des PAT fine-grained à courte expiration lorsqu’un PAT est nécessaire | Limite le blast radius et la persistance                     |

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez expliquer en une phrase pourquoi un PAT est plus risqué que `GITHUB_TOKEN` dans un workflow sans supervision
- [ ] Vous pouvez décrire la différence de fenêtre de risque entre les deux types d’identifiants
- [ ] Vous savez garder `permissions:` minimal et expliquer pourquoi c'est important
- [ ] Vous savez ajouter `network.allowed` pour bloquer l’exfiltration d’identifiants
- [ ] Vous pouvez citer deux pratiques qui reduisent le risque lorsqu'un PAT est inevitable
- [ ] Vous avez identifié si votre workflow utilise un PAT ou le `GITHUB_TOKEN` éphémère, et noté la différence dans votre log ou votre issue

---

<!-- journey: all -->

Retour à [Connecter une source de données en direct à votre workflow](16-connect-data-source.md).

<!-- /journey -->
