<!-- page-journey: codespace -->
<!-- page-adventure: side-quest -->

# Side Quest : Corriger les erreurs Codespaces `actions:write` lors de l’exécution de `gh aw run`

> _Facultatif : utilisez ce guide si l’étape 8 échoue dans un Codespace, puis revenez à [Exécuter et suivre votre workflow](08-run-your-workflow.md)._

## :clipboard: Avant de commencer

Cette side quest vous concerne si **les deux** conditions suivantes sont vraies :

- Vous exécutez `gh aw run` dans un GitHub Codespace (et non dans un environnement local).
- Vous voyez une erreur de [permission](https://github.github.com/gh-aw/reference/permissions/) `actions:write` (HTTP 403) dans le journal d’exécution de votre terminal.

Si vous n’êtes pas dans un Codespace ou ne voyez pas l’erreur 403, revenez à [Exécuter et suivre votre workflow](08-run-your-workflow.md) et utilisez plutôt le parcours GitHub Actions UI.

---

## :dart: Ce que vous allez faire

Vous allez identifier l’erreur de token Codespaces qui bloque `gh aw run` et utiliser le chemin de récupération le plus rapide. Si vous le souhaitez, vous pouvez aussi recréer votre Codespace avec les [permissions](https://github.github.com/gh-aw/reference/permissions/) supplémentaires nécessaires aux [triggers](https://github.github.com/gh-aw/reference/triggers/) de workflow lancés depuis le terminal.

---

## Symptôme

Lorsque vous exécutez :

```bash
gh aw run daily-report-status
```

vous pouvez voir :

```text
HTTP 403: Resource not accessible by integration
```

Certaines versions de `gh aw` affichent aussi un message complémentaire expliquant que le token Codespaces par défaut ne possède pas [`actions:write`](https://github.github.com/gh-aw/reference/permissions/) ni `workflows:write`.

---

## Cause

Le token par défaut à l’intérieur d’un Codespace dispose généralement d’un accès suffisant pour travailler avec votre dépôt. En revanche, il peut ne pas avoir les [permissions](https://github.github.com/gh-aw/reference/permissions/) requises par `gh aw run`. En pratique, les permissions manquantes sont généralement `actions:write` et `workflows:write`.

---

## Correction A (recommandée) : utiliser l’UI GitHub Actions

<!-- journey: codespace -->

Revenez à [Exécuter et suivre votre workflow](08-run-your-workflow.md#trigger-the-workflow-via-github-actions-ui) et déclenchez plutôt le workflow depuis l’onglet **Actions**.

<!-- /journey -->

C’est le meilleur parcours pour l’atelier, car il fonctionne même lorsque le token du terminal de votre Codespace est limité.

---

## Correction B (avancée) : créer un nouveau Codespace avec des permissions supplémentaires

Si vous voulez que `gh aw run` fonctionne depuis le terminal, ajoutez un fichier `.devcontainer/devcontainer.json` à **votre dépôt d’exercice** puis validez-le. Créez ensuite un tout nouveau Codespace à partir de ce dépôt mis à jour.

```json
{
    "customizations": {
        "codespaces": {
            "repositories": {
                "YOUR-USERNAME/YOUR-REPO": {
                    "permissions": {
                        "actions": "write",
                        "workflows": "write"
                    }
                }
            }
        }
    }
}
```

Les Codespaces existants ne récupèrent pas les nouvelles permissions après une reconstruction ; vous devez donc créer un nouveau Codespace après validation du fichier. Pour plus de détails, consultez [Managing access to other repositories within your codespace](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-repository-access-for-your-codespaces).

> [!IMPORTANT]
> Ajoutez ce fichier à votre **practice repository**, pas à `githubnext/gh-aw-workshop`.

---

## Vérifier la correction

Avant de réessayer `gh aw run daily-report-status`, vérifiez qu’une de ces affirmations est vraie :

- Une nouvelle exécution **Daily Report Status** apparaît après utilisation de l’onglet Actions
- Une nouvelle exécution **Daily Report Status** apparaît après avoir exécuté `gh aw run daily-report-status` depuis votre Codespace nouvellement créé

Si vous voyez toujours la même erreur 403 et qu’aucune nouvelle exécution n’apparaît dans l’onglet **Actions**, revenez à **Fix A** et utilisez le parcours UI pour cet atelier.

---

## :white_check_mark: Checkpoint

- [ ] Je peux voir `HTTP 403: Resource not accessible by integration` dans mon terminal lorsque j’exécute `gh aw run daily-report-status`
- [ ] Une nouvelle exécution **Daily Report Status** apparaît dans l’onglet **Actions** après l’avoir déclenchée depuis l’UI
- [ ] Si j’ai utilisé Fix B : l’exécution de `gh aw run daily-report-status` dans mon nouveau Codespace se termine sans erreur 403 et une nouvelle exécution apparaît dans l’onglet **Actions**
- [ ] Je suis prêt à revenir à [Run and Watch Your Workflow](08-run-your-workflow.md)

---

<!-- journey: codespace -->

Revenez à [Exécuter et suivre votre workflow](08-run-your-workflow.md).

<!-- /journey -->
