<!-- page-journey: ui -->
<!-- page-adventure: side-quest -->

# Side Quest : Méthode 2 (UI-only) — Secret COPILOT_GITHUB_TOKEN

> _Facultatif : voici la variante orientée GitHub UI de la méthode 2. Utilisez-la lorsque vous préférez, ou devez, terminer une configuration de [billing](https://github.github.com/gh-aw/reference/billing/) personnelle sans commandes de terminal._

Cette méthode stocke un [fine-grained Personal Access Token](https://github.github.com/gh-aw/reference/auth/#copilot-default) (PAT) comme secret de dépôt nommé `COPILOT_GITHUB_TOKEN`. L’[engine](https://github.github.com/gh-aw/reference/engines/) de l’[agentic workflow](https://github.github.com/gh-aw/introduction/overview/) le récupère automatiquement.

## :clipboard: Avant de commencer

- Vous avez un compte GitHub avec un abonnement Copilot actif.
- Vous avez lu [Side Quest : Configurer l’authentification GitHub Copilot](side-quest-06-03-copilot-token.md) et choisi la méthode 2.

## :pencil2: Sous-exercice A : générer le token

1. Ouvrez [github.com/settings/tokens](https://github.com/settings/tokens) et cliquez sur **Generate new token (fine-grained)**.
2. Donnez un nom au token (par exemple, gh-aw-copilot) et définissez une expiration (90 jours est une valeur par défaut courante). Définissez un rappel pour faire tourner le token avant son expiration.
3. Définissez **Repository access** en fonction de la visibilité de votre dépôt d’atelier :
    - Pour un dépôt public, choisissez **Public repositories**.
    - Pour un dépôt privé, choisissez **Only select repositories** puis sélectionnez votre dépôt.
4. Sous [Permissions](https://github.github.com/gh-aw/reference/permissions/) → **Account permissions**, réglez Copilot requests sur Read-only.
5. Cliquez sur **Generate token** et copiez immédiatement la valeur. GitHub ne l’affiche qu’une seule fois.

> [!IMPORTANT]
> Copiez le token avant de changer de page ou de fermer l’onglet. Si vous ratez cette fenêtre, vous devrez générer un nouveau token.

**Vérifiez :** la valeur du token est visible à l’écran et copiée dans votre presse-papiers avant de continuer.

Vérification rapide :

- [ ] Je peux voir un PAT nouvellement créé dans ma liste de tokens
- [ ] J’ai copié la valeur du token avant de quitter la page
- [ ] J’ai noté la date d’expiration du token

## :pencil2: Sous-exercice B : enregistrer le secret

Ouvrez votre dépôt dans un nouvel onglet afin de garder la page du token ouverte jusqu’à l’enregistrement du secret.

1. Dans votre dépôt, ouvrez **Settings** → **Secrets and variables** → **Actions**.
2. Cliquez sur **New repository secret**.
3. Saisissez le nom `COPILOT_GITHUB_TOKEN` (majuscules et underscores).
4. Collez la valeur du token et vérifiez qu’aucun espace supplémentaire n’a été ajouté avant ou après la chaîne du token.
5. Cliquez sur **Add secret**.
6. Vérifiez que le secret apparaît dans la liste sous le nom `COPILOT_GITHUB_TOKEN`.

**Vérifiez :** `COPILOT_GITHUB_TOKEN` apparaît dans la liste des Secrets ; vous pouvez alors fermer l’onglet du token sans risque.

Vérification rapide :

- [ ] Le nom du secret est exactement `COPILOT_GITHUB_TOKEN`
- [ ] Le secret apparaît maintenant dans la liste des secrets Actions du dépôt
- [ ] Je n’ai fermé l’onglet du token qu’après avoir confirmé l’enregistrement du secret

## Sélectionnez le token dans votre workflow

1. Modifiez le workflow source et supprimez `copilot-requests: write`.
2. Validez le changement du fichier source.
3. Demandez à l’agent **Agentic Workflows** d’exécuter `gh aw compile` puis de valider le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) mis à jour.

Lorsque `copilot-requests: write` est présent, le workflow ignore `COPILOT_GITHUB_TOKEN` pour l’inférence.

## :white_check_mark: Checkpoint

- [ ] Vous avez généré un nouveau fine-grained PAT et l’avez copié avant de quitter la page du token
- [ ] Le token a **Copilot requests: Read-only** sous **Account permissions**
- [ ] `COPILOT_GITHUB_TOKEN` existe dans **Settings** → **Secrets and variables** → **Actions**
- [ ] `copilot-requests: write` n’est pas présent dans le workflow source
- [ ] L’agent a recompilé et validé le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) mis à jour
- [ ] Vous avez défini un rappel pour faire tourner le PAT avant sa date d’expiration
- [ ] Vous comprenez quand utiliser la méthode 1 ou la méthode 2 (utilisez la [vue d’ensemble de l’authentification](side-quest-06-03-copilot-token.md) si besoin)

<!-- journey: ui -->

Besoin d’un rappel sur le moment où choisir la méthode 2 ou sur la manière dont cela s’intègre à votre configuration d’auth ? Revenez à [Side Quest : Configurer l’authentification GitHub Copilot](side-quest-06-03-copilot-token.md).

<!-- /journey -->

<!-- journey: ui -->

**Retour :** [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md) | [Écrire votre premier agentic workflow](07-your-first-workflow.md)

<!-- /journey -->
