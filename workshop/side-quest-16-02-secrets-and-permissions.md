<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : stocker des identifiants avec GitHub Secrets

> _Facultatif : suivez ce guide lorsque votre workflow a besoin d'un token ou d'une cle API qui ne doit pas apparaitre en clair, puis revenez a votre parcours principal._

## 📋 Avant de commencer

- Il est utile d’être familier avec [Connecter une source de données en direct à votre workflow](16-connect-data-source.md).
- Vous comprenez a quoi ressemble un YAML de workflow GitHub Actions.

---

Les workflows GitHub Actions s’exécutent dans un environnement partagé où le code, les logs et la configuration sont visibles par les collaborateurs. Écrire des identifiants en dur est dangereux : ils se retrouvent dans l’historique des versions et dans les logs. **[GitHub Secrets](https://github.github.com/gh-aw/reference/safe-outputs/)** vous fournit un coffre-fort sécurisé pour les valeurs sensibles que les workflows peuvent lire sans les exposer.

---

## Qu’est-ce qu’un GitHub Secret ?

Un secret est une valeur nommée et chiffrée stockée dans les paramètres de votre dépôt. Votre workflow la lit avec `${{ secrets.SECRET_NAME }}` à l’exécution. Les secrets :

- ne sont **jamais** affichés en clair dans l’interface après leur enregistrement.
- sont **masqués** dans les logs du workflow : si la valeur d’un secret apparaît dans la sortie, GitHub la remplace par `***`.

> [!NOTE]
> Cette quête annexe se concentre sur les secrets de dépôt. Si plusieurs dépôts ont besoin du même secret, vous pouvez aussi le stocker comme secret d’organisation et accorder l’accès aux dépôts sélectionnés.

---

## Quand avez-vous besoin d’un secret ?

Vous avez besoin d’un secret chaque fois que votre workflow s’authentifie à un service externe. Cas courants :

| Scénario                                                                                                           | Secret à stocker                                              |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Appel d’une API tierce (Slack, Jira, etc.)                                                                         | Clé API ou bearer token                                       |
| Publication vers un webhook externe                                                                                | URL du webhook (traitez les URL avec token comme des secrets) |
| Connexion à un [MCP server](https://github.github.com/gh-aw/reference/mcp-gateway/) qui exige une authentification | Token spécifique au serveur                                   |

## Choisir le bon token GitHub

Utilisez cette comparaison rapide lorsque votre workflow a besoin d’accéder à GitHub :

| Si vous devez...                                                                                                                                        | Utiliser                            | Pourquoi                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| Lire ou agir sur le même dépôt pendant l’exécution d’un workflow                                                                                        | `${{ secrets.GITHUB_TOKEN }}`       | GitHub le crée automatiquement pour chaque exécution, et il expire à la fin de l’exécution.       |
| Aller au-delà de ce dépôt, par exemple accéder à un autre dépôt ou déclencher un workflow ailleurs, ou utiliser des scopes que le token intégré n’a pas | Un PAT stocké comme secret de dépôt | Vous le créez vous-même et pouvez lui donner l’accès supplémentaire précis dont vous avez besoin. |

---

## Ajouter un secret à votre dépôt

### GitHub UI (recommandée)

1. Ouvrez votre depot sur GitHub.
2. Cliquez sur **Settings** → **Secrets and variables** → **Actions**.
3. Cliquez sur **New repository secret**.
4. Saisissez un nom, par exemple `SLACK_WEBHOOK_URL`, ainsi que la valeur du secret.
5. Cliquez sur **Add secret**.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-secrets-settings-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/side-quest-secrets-settings-light.svg">
  <img alt="Page des secrets du dépôt" src="images/side-quest-secrets-settings-light.svg">
</picture>

> [!TIP]
> Les noms de secrets doivent utiliser uniquement des lettres majuscules, des chiffres et des underscores. Par convention, utilisez `SCREAMING_SNAKE_CASE`.

---

## ✏️ Essayez : vérifier le masquage

Ajoutez un secret de test nommé `WORKSHOP_TOKEN` avec n’importe quelle valeur jetable, puis vérifiez que GitHub le masque dans les logs.

1. Créez `WORKSHOP_TOKEN` dans **Settings** → **Secrets and variables** → **Actions**.
2. Ajoutez cette étape temporaire à un workflow que vous pouvez lancer manuellement :

```markdown
- name: Confirm secret masking
  run: echo "token=${{ secrets.WORKSHOP_TOKEN }}"
```

1. Déclenchez une exécution manuelle depuis l’onglet **Actions**.
2. Ouvrez les logs de l’exécution et confirmez que la sortie affiche `token=***`, et non la valeur saisie.
3. Supprimez l’étape temporaire après avoir vérifié le masquage.

---

## Référencer un secret dans votre workflow

Dans n’importe quelle étape du workflow, référencez un secret avec `${{ secrets.SECRET_NAME }}` :

```markdown
- name: Notify Slack
  run: |
  curl -s -X POST "${{ secrets.SLACK_WEBHOOK_URL }}" \
   -H "Content-Type: application/json" \
   -d '{"text": "Daily status report is ready."}'
```

## Aller plus loin

<details open>
<summary>En savoir plus sur l’utilisation du `GITHUB_TOKEN` intégré pour les appels à l’API GitHub</summary>

La plupart des appels à l’API GitHub dans cet atelier fonctionnent avec le [`GITHUB_TOKEN`](https://github.github.com/gh-aw/reference/environment-variables/#system-injected-runtime-variables) fourni automatiquement :

```markdown
- name: List open pull requests
  env:
  GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: gh pr list --state open
```

La CLI `gh` lit `GH_TOKEN` automatiquement lorsqu’il est défini comme [variable d’environnement](https://github.github.com/gh-aw/reference/environment-variables/).

</details>

<details open>
<summary>Comprendre comment le `frontmatter` `permissions` contrôle le `GITHUB_TOKEN` intégré</summary>

Les workflows gh-aw déclarent les [permissions](https://github.github.com/gh-aw/reference/permissions/) requises dans le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/). Ne demandez que ce dont vous avez besoin :

```markdown
---
permissions:
    contents: read
    issues: read
    pull-requests: read
---
```

Si un appel avec `GITHUB_TOKEN` échoue avec une erreur 403, vérifiez que la permission requise est bien listée dans le frontmatter. Garder des permissions minimales réduit le [blast radius](https://github.github.com/gh-aw/introduction/architecture/#threat-model) si un workflow est un jour mal utilisé.

</details>

---

## ✅ Checkpoint

- [ ] Vous pouvez ajouter un secret à votre dépôt via la GitHub UI
- [ ] Vous savez comment referencer un secret avec `${{ secrets.SECRET_NAME }}`
- [ ] Vous comprenez quand utiliser `GITHUB_TOKEN` plutôt qu’un PAT créé manuellement
- [ ] Vous pouvez expliquer pourquoi il est risqué d’écrire des identifiants en dur dans des fichiers de workflow

<!-- journey: all -->

**Retour à :** [Connecter une source de données en direct à votre workflow](16-connect-data-source.md) ou [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md)

<!-- /journey -->
