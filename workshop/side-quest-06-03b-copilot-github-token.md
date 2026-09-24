<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Méthode 2 — Secret COPILOT_GITHUB_TOKEN

> _Facultatif : utilisez cette méthode pour la [billing](https://github.github.com/gh-aw/reference/billing/) personnelle, ou lorsque l’organisation propriétaire du dépôt n’a pas activé la facturation Copilot centralisée._

Cette méthode stocke un [Personal Access Token](https://github.github.com/gh-aw/reference/glossary/#personal-access-token-pat) (PAT) comme secret de dépôt nommé [`COPILOT_GITHUB_TOKEN`](https://github.github.com/gh-aw/reference/auth/#copilotgithubtoken). L’[engine](https://github.github.com/gh-aw/reference/engines/) de l’[agentic workflow](https://github.github.com/gh-aw/introduction/overview/) le récupère automatiquement. Pour comprendre les types de PAT et savoir quand utiliser chacun, consultez l’[auth overview](side-quest-06-03-copilot-token.md).

Si vous voulez un parcours entièrement en UI sans commandes de terminal, utilisez [Method 2 (UI-only)](side-quest-06-03c-copilot-github-token-ui-only.md).

## :clipboard: Avant de commencer

- Vous avez un compte GitHub avec un abonnement Copilot actif.
- Vous avez lu [Side Quest : Configurer l’authentification GitHub Copilot](side-quest-06-03-copilot-token.md) et choisi la méthode 2.

## Chemin terminal le plus court

Si votre workflow contient actuellement `copilot-requests: write`, supprimez d’abord cette ligne. Lorsqu’elle est présente, le workflow ignore `COPILOT_GITHUB_TOKEN` pour l’inférence.

Exécutez ensuite :

```bash
gh aw secrets bootstrap
```

Ce parcours guidé vérifie si le secret manque, vous accompagne pour créer ou coller un [fine-grained PAT](https://github.github.com/gh-aw/reference/auth/#copilot-default) valide, puis l’enregistre comme `COPILOT_GITHUB_TOKEN`.

Si vous préférez créer et enregistrer le PAT manuellement, suivez la procédure complète ci-dessous.

## :pencil2: Sous-exercice A : générer le token manuellement

1. Ouvrez [github.com/settings/tokens](https://github.com/settings/tokens) et cliquez sur **Generate new token (fine-grained)**.
2. Donnez un nom au token (par exemple `gh-aw-copilot`) et définissez une expiration (90 jours est une valeur par défaut courante).
3. Pour un dépôt d’atelier public, choisissez **Public repositories**. Pour un dépôt d’atelier privé, choisissez **Only select repositories** et sélectionnez-le.
4. Sous **[Permissions](https://github.github.com/gh-aw/reference/permissions/)** → **Account permissions**, réglez **Copilot requests** sur **Read-only**.
5. Cliquez sur **Generate token** et copiez immédiatement la valeur ; GitHub ne l’affiche qu’une seule fois.

> [!IMPORTANT]
> Copiez le token avant de changer de page ou de fermer l’onglet. Si vous ratez cette fenêtre, vous devrez générer un nouveau token.

Ajoutez un rappel de rotation pour penser à renouveler le token avant son expiration :

```bash
printf 'Rotate COPILOT_GITHUB_TOKEN by YYYY-MM-DD\n' >> ~/copilot-token-rotation.txt
```

Remplacez `YYYY-MM-DD` par la date d’expiration de votre token.

- [ ] J’ai copié la valeur du token avant de quitter la page
- [ ] J’ai noté la date de rotation du token

## :pencil2: Sous-exercice B : enregistrer le secret manuellement

Enregistrez le token comme secret de dépôt :

```bash
gh secret set COPILOT_GITHUB_TOKEN
```

Cette commande demandera la valeur du token de manière interactive. Sinon, suivez les étapes UI complètes dans [la méthode 2 (UI-only)](side-quest-06-03c-copilot-github-token-ui-only.md).

**Essayez : vérifiez que le secret a bien été enregistré :**

```bash
gh secret list | grep COPILOT_GITHUB_TOKEN
```

Vous devriez voir `COPILOT_GITHUB_TOKEN` dans la sortie. Une fois confirmé, vous pouvez fermer l’onglet du token sans risque.

- [ ] `COPILOT_GITHUB_TOKEN` apparaît dans la liste des secrets du dépôt
- [ ] Je n’ai fermé l’onglet du token qu’après avoir confirmé l’enregistrement du secret

## Sélectionnez le token dans votre workflow

Si vous ne l’avez pas déjà fait, supprimez `copilot-requests: write` du workflow source. Lorsque cette permission est présente, le workflow ignore `COPILOT_GITHUB_TOKEN` pour l’inférence.

```bash
gh aw compile
git add .
git commit -m "Use personal Copilot billing"
git push
```

La compilation met à jour le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) pour qu’il utilise la méthode fondée sur le token.

## :white_check_mark: Checkpoint

- [ ] Vous avez généré un fine-grained PAT avec **Copilot requests: Read-only** sous **Account permissions**
- [ ] `COPILOT_GITHUB_TOKEN` existe dans les secrets Actions de votre dépôt
- [ ] `gh secret list` confirme la présence du secret
- [ ] `copilot-requests: write` n’est pas présent dans le workflow source
- [ ] Les fichiers source et lock recompilés sont validés
- [ ] Vous avez noté la date d’expiration du PAT et créé un rappel de rotation

<!-- journey: all -->

Besoin d’un rappel sur le moment où choisir la méthode 2 ou sur la manière dont cela s’insère dans votre configuration d’auth ? Revenez à [Side Quest : Configurer l’authentification GitHub Copilot](side-quest-06-03-copilot-token.md).

<!-- /journey -->

<!-- journey: all -->

**Retour :** [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md) | [Écrire votre premier agentic workflow](07-your-first-workflow.md)

<!-- /journey -->
