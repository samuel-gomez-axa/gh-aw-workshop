<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Configurer Une Clé API Anthropic

> _Facultatif : parcourez ce guide lorsque vous voulez utiliser [Claude](side-quest-01-02-environment-reference.md#claude), la famille de modèles d'Anthropic, comme moteur IA de votre [agentic workflow](https://github.github.com/gh-aw/introduction/overview/), puis revenez à votre parcours principal._

Par défaut, les [agentic workflows](https://github.github.com/gh-aw/introduction/overview/) s'exécutent sur le [GitHub Copilot engine](https://github.github.com/gh-aw/reference/engines/). Si vous préférez utiliser **[Claude](https://github.github.com/gh-aw/reference/auth/#claude)**, vous aurez besoin d'une clé API Anthropic stockée comme secret de dépôt et d'une modification d'une ligne dans le [workflow frontmatter](https://github.github.com/gh-aw/reference/frontmatter/).

## 📋 Avant De Commencer

- Vous avez un compte Anthropic sur [console.anthropic.com](https://console.anthropic.com/).
- Vous avez un dépôt d'entraînement avec au moins un fichier `.md` d'agentic workflow.

---

## Ce Que Vous Allez Configurer

| Élément                       | Valeur              |
| ----------------------------- | ------------------- |
| Nom du secret de dépôt        | `ANTHROPIC_API_KEY` |
| Champ `engine` du frontmatter | `engine: claude`    |
| Domaine de l'API Anthropic    | `api.anthropic.com` |

---

## Obtenez Une Clé API Anthropic

1. Allez sur [console.anthropic.com](https://console.anthropic.com/) et connectez-vous, ou créez un compte.
2. Cliquez sur **Create Key**, donnez-lui un nom, par exemple `gh-aw-workshop`, puis cliquez sur **Create Key**.
3. Copiez la valeur de la clé : elle commence par `sk-ant-`.

> [!IMPORTANT]
>
> <details open><summary>La clé n'est affichée qu'une seule fois : enregistrez-la avant de fermer cet onglet</summary>
>
> Anthropic n'affiche la valeur complète de la clé **qu'une seule fois**. Copiez-la dans votre presse-papiers avant de fermer la boîte de dialogue ou de quitter la page. Si vous manquez cette occasion, vous devrez supprimer la clé et en générer une nouvelle.
>
> Collez la clé dans GitHub Secrets, section suivante, **avant** de fermer l'onglet de la console Anthropic.
>
> </details>

<!-- -->

> [!NOTE]
> L'utilisation de l'API Anthropic est facturée au token. Consultez la [page de tarification Anthropic](https://www.anthropic.com/pricing) et définissez une limite d'usage avant d'exécuter des workflows pour éviter les coûts inattendus.

---

## Stockez La Clé Comme Secret De Dépôt

Ouvrez votre dépôt dans un **nouvel onglet** afin de garder l'onglet de la console Anthropic ouvert jusqu'à l'enregistrement du secret.

1. Ouvrez votre dépôt sur GitHub.
2. Cliquez sur **Settings** → **Secrets and variables** → **Actions**.
3. Cliquez sur **New repository secret**.
4. Définissez le nom `ANTHROPIC_API_KEY` et collez la valeur de la clé. Vérifiez qu'il n'y a pas d'espace en trop au début ou à la fin.
5. Cliquez sur **Add secret**.
6. Confirmez que le secret apparaît dans la liste sous le nom `ANTHROPIC_API_KEY`.

> [!TIP]
> Les noms de secrets ne doivent utiliser que des lettres majuscules, des chiffres et des underscores. `ANTHROPIC_API_KEY` est le nom exact attendu par le moteur `claude` : ne le renommez pas et n'ajoutez pas de tirets.

<details open>
<summary>Erreurs courantes avec ce secret</summary>

- **Mauvais nom** : toute variation (`anthropic_api_key`, `ANTHROPIC-API-KEY`, `CLAUDE_API_KEY`) provoquera un échec d'authentification silencieux. Le nom doit être exactement `ANTHROPIC_API_KEY`.
- **Copiée avec des espaces en trop** : un collage depuis certains outils ajoute un espace au début. Supprimez et recréez le secret si vous avez un doute.
- **Onglet Anthropic fermé avant l'enregistrement** : vous ne pouvez plus récupérer la clé. Supprimez-la sur [console.anthropic.com](https://console.anthropic.com/) et générez-en une nouvelle.
- **Allow-list réseau absente** : le moteur `claude` a besoin d'un accès sortant à `api.anthropic.com`. Vérifiez qu'il figure bien dans votre liste `network.allowed` montrée dans l'exemple de frontmatter ci-dessous.

</details>

---

## Mettez À Jour Le Frontmatter De Votre Workflow

Ouvrez le fichier `.md` de votre workflow et mettez à jour son frontmatter :

```markdown
---
name: My Workflow
on:
    workflow_dispatch:
permissions:
    contents: read # keep only the scopes your workflow needs
engine: claude # switch from the default Copilot engine to Claude
network:
    allowed:
        - defaults
        - api.anthropic.com # required so the workflow can reach Anthropic
---
```

Si vous avez précédemment ajouté `copilot-requests: write` pour le moteur Copilot, vous pouvez le retirer lors du passage à `claude`.

---

## Compilez Votre Workflow

Après avoir mis à jour votre frontmatter, compilez le workflow pour régénérer le lock file :

```bash
gh aw compile
```

Vous devriez voir une sortie confirmant que le fichier a compilé sans erreur.

---

## ✅ Checkpoint

- [ ] Vous avez un compte Anthropic et généré une clé API
- [ ] `ANTHROPIC_API_KEY` est stocké comme secret de dépôt
- [ ] Le frontmatter de votre workflow contient `engine: claude`
- [ ] `gh aw compile` se termine sans erreur
- [ ] Si vous utilisez l'isolation réseau, `api.anthropic.com` figure dans la liste `network.allowed`

<!-- journey: all -->

**Retour à :** [Écrire votre premier Agentic Workflow](07-your-first-workflow.md)

<!-- /journey -->
