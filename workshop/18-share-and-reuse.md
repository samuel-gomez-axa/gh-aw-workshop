<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Partagez et reutilisez vos workflows agentiques

> _Votre workflow vaut plus qu'un seul dépôt ; apprenez à le transformer en modèle réutilisable que toute votre équipe peut adopter._

## 🎯 Ce que vous allez faire

Vous allez copier votre fichier de workflow terminé vers un emplacement partagé afin que vos collègues puissent l'ajouter à leurs propres dépôts avec une seule commande. À la fin de cette étape, vous aurez un [reusable workflow template](https://github.github.com/gh-aw/guides/reusing-workflows/) et vous saurez comment le distribuer.

## 📋 Avant de commencer

- Vous disposez d'un workflow agentique fonctionnel (terminé dans [Refine, Test, and Improve Your Workflow](09-agentic-editing.md) ou dans l'une des étapes de création).
- Vous avez les droits de push sur au moins un dépôt dans lequel vous voulez partager le workflow (cela peut être le même dépôt d'exercice).

## Etapes

### Comprendre le fonctionnement des templates gh-aw

Lorsque vous lancez `gh aw add`, l'extension récupère directement un fichier Markdown de workflow depuis un dépôt GitHub. Tout fichier `.md` dans un dossier `.github/workflows/` d'un dépôt public, ou auquel vous avez accès, peut servir de template.

Cela signifie que **votre workflow est déjà un template** ; il vous suffit d'indiquer aux autres où le trouver.

### Choisir une destination de partage

Vous avez deux options :

| Objectif                         | Où placer le workflow                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Partager au sein de votre equipe | Un dépôt partagé "workflows" dans votre organisation GitHub (par ex. `your-org/workflow-templates`) |
| Partager publiquement            | N'importe quel dépôt public, même celui sur lequel vous travaillez déjà                             |

Pour cette étape, vous utiliserez votre propre dépôt d'exercice. Si vous voulez plus tard déplacer le template vers un dépôt dédié, le processus sera identique.

### Vérifier que votre fichier de workflow est committé

Votre workflow se trouve dans `.github/workflows/<name>.md` dans votre dépôt. Assurez-vous que la dernière version est bien commitée et poussée.

### Parcours terminal — vérifier avec Git

```bash
git status
git log --oneline -3
```

Si vous voyez des modifications non commitées, committez-les maintenant avant de partager.

### Vérifier sur GitHub

1. Accédez à votre dépôt sur GitHub.
2. Ouvrez `.github/workflows/`.
3. Confirmez que votre fichier de workflow `.md` apparaît bien dans la liste avec vos modifications les plus récentes.

### Partager la commande `gh aw add`

Une fois votre workflow poussé, donnez à vos collègues cette commande en une ligne pour l'ajouter à leur propre dépôt :

```bash
gh aw add <your-github-username>/<your-repo>/<workflow-name>
```

Par exemple, si votre nom d'utilisateur est `jsmith`, votre dépôt `my-workshop` et votre fichier de workflow `daily-status.md` :

```bash
gh aw add jsmith/my-workshop/daily-status
```

Votre collègue exécute cette commande dans son dépôt. `gh aw add` copie le fichier Markdown dans son dossier `.github/workflows/`, puis il peut l'éditer et le [compiler](https://github.github.com/gh-aw/reference/compilation-process/) pour son propre contexte.

> [!TIP]
> Vous pouvez aussi épingler une version précise avec un tag ou un commit SHA : `gh aw add jsmith/my-workshop/daily-status@v1.0`. C'est utile lorsque vous voulez garantir la stabilité dans un déploiement à l'échelle de l'équipe.

### Documenter votre template

Ajoutez un court commentaire en haut du brief Markdown de votre workflow afin que les utilisateurs sachent quoi personnaliser :

```markdown .github/workflows/daily-status.md
<!-- TEMPLATE: Replace "my-repo" with your repository name.
     Adjust the schedule and permissions to match your needs. -->
```

Cet indice évite à vos collègues de devoir deviner quoi faire lorsqu'ils ouvrent le fichier pour la première fois.

> [!NOTE]
> Le destinataire doit encore compiler le workflow avec `gh aw compile`, puis le pousser avant que GitHub Actions ne puisse l'exécuter. Pensez à le rappeler à votre équipe.

## ✅ Checkpoint

- [ ] Votre fichier de workflow `.md` est committé et poussé vers un dépôt GitHub
- [ ] Vous savez construire la commande `gh aw add` pour votre workflow
- [ ] Vous avez ajoute un bref commentaire de template expliquant quoi personnaliser
- [ ] Un collegue, ou vous dans un second depot, a importe le template avec succes via `gh aw add`

<!-- journey: all -->

**Suite :** [Construire le prochain noeud de formation pilote par la recherche](19-research-driven-training-node.md)

<!-- /journey -->
