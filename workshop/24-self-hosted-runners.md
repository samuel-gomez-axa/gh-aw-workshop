<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Executez votre workflow agentique sur un self-hosted runner

> _Les équipes enterprise ont souvent besoin d'exécuter leurs workflows sur leur propre infrastructure ; cette étape montre exactement comment faire._

## :dart: Ce que vous allez faire

Mettez à jour le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) de votre workflow pour cibler un self-hosted runner à l'aide d'un label de runner.
À la fin de cette étape, votre workflow agentique sera mis en file sur un runner géré par votre organisation plutôt que sur une machine GitHub-hosted.

## :clipboard: Avant de commencer

- Votre workflow agentique s'exécute correctement (voir [Refine, Test, and Improve Your Workflow](09-agentic-editing.md)).
- A [self-hosted runner](https://github.github.com/gh-aw/reference/self-hosted-runners/) is registered and **online** for your repository or organisation.
  If you need to set one up first, see [Side Quest: Enterprise Setup Considerations](side-quest-enterprise-setup.md).
- Vous connaissez le label assigné à votre runner, par exemple `self-hosted`, `ubuntu-self-hosted` ou un label personnalisé configuré par votre administrateur.

> [!NOTE]
> Vous n'êtes pas sur un plan enterprise ? Les runners GitHub-hosted suffisent pour le parcours principal de l'atelier. Revenez à cette étape si vous passez plus tard dans un environnement GHES ou GHEC avec des self-hosted runners.

## Comprendre le ciblage des runners dans le frontmatter

Le frontmatter d'un workflow agentique est compatible avec le YAML standard de GitHub Actions.
Le champ `runs-on:` indique à Actions quel runner utiliser ; il fonctionne de la même manière pour les workflows agentiques et les jobs classiques.

Le schéma ci-dessous montre comment Actions lit vos labels et envoie le job au premier runner inactif qui les satisfait tous.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/24-runner-label-dispatch-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/24-runner-label-dispatch-light.svg">
  <img alt="Routage par labels de runner : comment les labels runs-on dans le frontmatter envoient un job de workflow vers un self-hosted runner correspondant" src="images/24-runner-label-dispatch-light.svg">
</picture>

Votre workflow actuel cible probablement un runner GitHub-hosted. Recherchez le champ `runs-on:` dans votre frontmatter :

```markdown .github/workflows/daily-status.md
---
runs-on: ubuntu-latest
---
```

La seule modification nécessaire est la valeur de `runs-on:`.

## :pencil2: Exercice : mettez a jour votre frontmatter

Mettez à jour le champ `runs-on:` de votre workflow pour qu'il pointe vers votre self-hosted runner.

### Ouvrir votre fichier de workflow

Ouvrez `.github/workflows/daily-status.md`, ou le workflow que vous souhaitez déplacer.

Ouvrez ce fichier dans l'editeur de votre choix :

```bash
code .github/workflows/daily-status.md
```

### Modifier la valeur `runs-on:`

Remplacez `ubuntu-latest` par le label de votre runner.
Utilisez une liste si votre runner exige plusieurs labels :

Label unique :

```markdown .github/workflows/daily-status.md
---
runs-on: self-hosted
---
```

Plusieurs labels, qui doivent tous correspondre :

```markdown .github/workflows/daily-status.md
---
runs-on: [self-hosted, linux, x64]
---
```

Les labels doivent correspondre exactement à ceux enregistrés par votre administrateur sur le runner.
En cas de doute, demandez à votre administrateur ; il peut retrouver ces labels dans les paramètres d'enregistrement du runner, dans Settings → Actions → Runners.

> [!TIP]
> Les labels servent de filtres. Un job de workflow est envoyé au premier runner inactif qui satisfait tous les labels de la liste. Ajouter `linux` à côté de `self-hosted` garantit que le job n'atterrit que sur des runners Linux lorsque votre flotte est hétérogène.

Vous travaillez dans un environnement enterprise ? Consultez [Side Quest: Self-Hosted Runner Infrastructure Deep Dive](side-quest-24-01-runner-infrastructure.md) pour des conseils sur les runners [ephemeral](https://github.github.com/gh-aw/reference/ephemerals/) et JIT, la configuration de proxy et l'isolation [network](https://github.github.com/gh-aw/reference/network/) dans des environnements air-gapped.

## :pencil2: Exercice : compiler et committer

Recompilez après avoir modifié le frontmatter, puis committez les deux fichiers :

```bash
gh aw compile daily-status
```

Committez à la fois la source `.md` et le `.lock.yml` régénéré :

```bash
git add .
git commit -m "chore: target self-hosted runner for daily-status workflow"
git push
```

> [!TIP]
> Vous pouvez aussi utiliser la skill Copilot `/agentic-workflows` pour modifier le workflow ; elle compile et committe les deux fichiers ensemble, ce qui vous évite de vous retrouver avec un [lock file](https://github.github.com/gh-aw/reference/compilation-process/) obsolète.

## :pencil2: Exercice : verifier que l'execution arrive bien sur votre runner

1. Ouvrez l'onglet **Actions** de votre depot.
2. Cliquez sur **Run workflow**.
3. Ouvrez l'exécution et regardez le résumé du job.
4. Confirmez que le champ Runner affiche le nom de votre self-hosted runner, et non `GitHub Actions`.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/24-self-hosted-runner-job-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/24-self-hosted-runner-job-light.svg">
  <img alt="Nom du runner affiché dans le résumé du job Actions" src="images/24-self-hosted-runner-job-light.svg">
</picture>

## :white_check_mark: Checkpoint

- [ ] La valeur `runs-on:` de votre workflow correspond au label de votre self-hosted runner
- [ ] `gh aw compile`, si vous l'avez utilisé, s'est terminé sans erreur
- [ ] `daily-status.md` et son fichier `.lock.yml` sont committés et poussés
- [ ] Une exécution manuelle du workflow a démarré sans erreur
- [ ] Le champ Runner du résumé du job Actions affiche le nom de votre self-hosted runner, et non `GitHub Actions`
- [ ] Le journal d'exécution du workflow affiche le nom d'hôte de votre runner dans l'en-tête du job
- [ ] Vous pouvez expliquer pourquoi une liste de labels comme `[self-hosted, linux, x64]` restreint la sélection du runner
- [ ] Vous savez où trouver des indications sur les runners proxy et ephemeral si votre environnement en a besoin
- [ ] Aucune étape du workflow n'a échoué à cause d'une indisponibilité du runner ou d'un label non concordant

<!-- journey: all -->

**Suite :** [Auditez et surveillez vos workflows agentiques](25-audit-and-observability.md)

<!-- /journey -->
