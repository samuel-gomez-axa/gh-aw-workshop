<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Configurer Une Clé API OpenAI

> _Facultatif : parcourez ce guide lorsque vous voulez utiliser le moteur `codex`, propulsé par OpenAI, pour votre agentic workflow, puis revenez à votre parcours principal._

Par défaut, les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/) utilisent le [GitHub Copilot engine](https://github.github.com/gh-aw/reference/engines/). Pour utiliser des **modèles OpenAI**, stockez une clé API OpenAI comme secret de dépôt et ajoutez une ligne au [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/).

## 📋 Avant De Commencer

- Vous avez terminé [Install `gh-aw`](06-install-gh-aw.md) et disposez d'un agentic workflow fonctionnel.
- Vous connaissez les blocs `env:` du [YAML frontmatter](https://github.github.com/gh-aw/reference/frontmatter/). Si le frontmatter est nouveau pour vous, parcourez [Side Quest: Frontmatter Deep Dive — Part A](side-quest-11-01-frontmatter-deep-dive.md) avant de continuer.
- Vous avez un compte OpenAI ou accès à une clé API OpenAI fournie par votre organisation.

> [!NOTE]
> Dans `gh-aw`, `codex` est l'identifiant de moteur pour l'exécution propulsée par OpenAI. Il ne fait pas référence à la famille de modèles abandonnée [OpenAI Codex](side-quest-01-02-environment-reference.md#openai-codex).

---

## Ce Que Vous Allez Configurer

| Élément                       | Valeur           |
| ----------------------------- | ---------------- |
| Nom du secret de dépôt        | `OPENAI_API_KEY` |
| Champ `engine` du frontmatter | `engine: codex`  |
| Domaine de l'API OpenAI       | `api.openai.com` |

---

## Obtenez Une Clé API OpenAI

1. Rendez-vous sur le tableau de bord des clés API OpenAI à l'adresse `platform.openai.com/api-keys` et connectez-vous, ou créez un compte.
2. Cliquez sur **Create new secret key**, donnez-lui un nom, par exemple `gh-aw-workshop`, puis cliquez sur **Create secret key**.
3. Copiez immédiatement la valeur de la clé : elle commence par `sk-` et OpenAI ne l'affiche **qu'une seule fois**.

> [!IMPORTANT]
> Collez la clé dans GitHub Secrets, section suivante, **avant** de fermer l'onglet de la plateforme OpenAI. Si vous le fermez d'abord, vous devrez supprimer la clé et en générer une nouvelle.

**✏️ Vérifiez :** Confirmez que votre nouvelle clé apparaît dans la liste à `platform.openai.com/api-keys` avant de continuer.

---

## Stockez La Clé Comme Secret De Dépôt

Ouvrez votre dépôt dans un **nouvel onglet** afin de garder l'onglet de la plateforme OpenAI ouvert.

1. Cliquez sur **Settings** → **Secrets and variables** → **Actions**.
2. Cliquez sur **New repository secret**.
3. Définissez le nom `OPENAI_API_KEY` et collez la valeur de la clé, sans espace en trop.
4. Cliquez sur **Add secret**.

> [!IMPORTANT]
> Le nom doit être exactement `OPENAI_API_KEY`. Toute variation (`openai_api_key`, `OPENAI-API-KEY`) provoque un échec d'authentification silencieux.

**✏️ Vérifiez :** Exécutez cette commande et confirmez que `OPENAI_API_KEY` apparaît dans la sortie :

```bash
gh secret list
```

---

## Mettez À Jour Le Frontmatter De Votre Workflow

Ajoutez `engine: codex` et l'entrée `network.allowed` au frontmatter de votre workflow. Vous pouvez omettre `copilot-requests: write`, qui est spécifique au moteur Copilot.

```markdown
---
name: My Workflow
on:
    workflow_dispatch:
permissions:
    contents: read
engine: codex
network:
    allowed:
        - defaults
        - api.openai.com
---
```

**✏️ Vérifiez :** Confirmez que votre frontmatter inclut `engine: codex` et la référence au secret :

```markdown
---
engine: codex
env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
---
```

---

## Facultatif : Choisissez Un Modèle OpenAI Précis

Pour épingler une version de modèle, utilisez la syntaxe étendue du moteur :

```markdown
---
engine:
    id: codex
    model: gpt-4o-mini
---
```

Laissez `model` de côté pour utiliser la valeur par défaut actuelle du moteur, que l'équipe `gh-aw` maintient à jour.

---

## Validez Votre Workflow

Après avoir mis à jour votre frontmatter, validez le workflow pour vérifier l'absence d'erreurs :

```bash
gh aw compile --validate
```

Vous devriez voir :

```text
✔️ <your-workflow>.md — valid
```

---

## ✅ Checkpoint

- [ ] Vous avez un compte OpenAI et généré une clé API
- [ ] Ma nouvelle clé est listée sur `platform.openai.com/api-keys`
- [ ] `OPENAI_API_KEY` est stocké comme secret de dépôt, `gh secret list` le confirme
- [ ] Le frontmatter de mon workflow contient `engine: codex` et `api.openai.com` dans `network.allowed`
- [ ] `gh aw compile --validate` ne signale aucune erreur

<!-- journey: all -->

**Retour à :** [Écrire votre premier Agentic Workflow](07-your-first-workflow.md)

<!-- /journey -->
