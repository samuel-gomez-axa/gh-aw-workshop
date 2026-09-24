<!-- page-journey: all -->
<!-- page-adventure: core -->

# Lancer et observer votre workflow

_Voir un agent travailler en temps réel rend le workflow concret._

## 🎯 Ce que vous allez faire

Vous allez déclencher le workflow `daily-report-status` créé à l’étape 7, l’observer démarrer dans l’onglet **Actions** et confirmer qu’il se termine avec succès.

## 📋 Avant de commencer

- Vous avez terminé [Confirmer l’accès au modèle](07d-confirm-model-access.md)
- `daily-report-status.md` et `daily-report-status.lock.yml` sont commités dans `.github/workflows/` sur `main`
- Votre dépôt d’entraînement a au moins une issue ouverte ; sinon, créez-en une dans l’onglet **Issues**

## Vérification avant départ

Un [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) manquant ou obsolète est la cause la plus fréquente des échecs `model-access-not-configured` à cette étape. Effectuez ces vérifications avant de déclencher le workflow ; chacune prend moins d’une minute.

**Le lock file est présent et à jour.** Ouvrez `.github/workflows/` dans votre dépôt sur GitHub et confirmez que les deux fichiers sont présents :

- `daily-report-status.md` (source)
- `daily-report-status.lock.yml` (compiled lock file)

Si l’un des fichiers manque, revenez à [l’étape 7](07-your-first-workflow.md) pour terminer les étapes de création du workflow. Si le lock file est présent mais que vous doutez de son actualité, recompilez puis poussez avant de continuer :

```bash
gh aw compile
git add .
git commit -m "chore: sync lock file" && git push
```

**La configuration de facturation correspond au lock file.** Ouvrez `daily-report-status.lock.yml`, ou `daily-report-status.md`, et vérifiez que le bloc `permissions:` correspond au mode de facturation choisi à l’étape 7d :

| Billing path                     | `copilot-requests: write` présent                                               |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Organization centralized billing | Oui                                                                             |
| Personal billing                 | Non, et `COPILOT_GITHUB_TOKEN` est défini dans **Settings → Secrets → Actions** |

En cas d’écart, revenez à [Confirmer l’accès au modèle](07d-confirm-model-access.md) pour corriger la configuration puis recompiler.

## Exécutez le workflow

Commencez depuis l’onglet Actions, car cette méthode fonctionne pour tout le monde, même si le jeton de votre terminal n’a pas la permission de déclencher des workflows.

Si vous préférez le terminal, vous pouvez utiliser [`gh aw run daily-report-status`](https://github.github.com/gh-aw/setup/cli/#run) comme option avancée. Si cette commande échoue dans Codespaces, utilisez plutôt l’onglet Actions ou suivez [Side Quest: Fix Codespaces `actions:write` Errors](side-quest-08-01-codespaces-actions-write.md).

### Avant de cliquer sur Run

- [ ] J’ai terminé [Confirmer l’accès au modèle](07d-confirm-model-access.md) et la méthode de facturation choisie, soit organization centralized billing, soit `COPILOT_GITHUB_TOKEN`, est active
- [ ] **Daily Report Status** apparaît dans la barre latérale **Actions**
- [ ] J’ai au moins une issue ouverte dans mon dépôt d’entraînement

### Déclenchez le workflow via l’interface GitHub Actions

Ouvrez votre dépôt d’entraînement sur GitHub et cliquez sur **Actions** dans la navigation supérieure. Dans la barre latérale gauche, sélectionnez **Daily Report Status**.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08-actions-tab-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08-actions-tab-light.svg">
  <img alt="Onglet Actions montrant où trouver Daily Report Status dans la liste des workflows" src="images/08-actions-tab-light.svg">
</picture>

Cliquez sur **Run workflow**, laissez la branche par défaut sélectionnée, puis cliquez sur le bouton vert **Run workflow**. Si **Daily Report Status** n’apparaît pas, actualisez la page, confirmez que les deux fichiers de workflow sont bien sur `main`, puis exécutez `gh aw compile` dans votre terminal préparé pour rechercher des erreurs de compilation.

Si l’exécution échoue immédiatement avec une erreur d’accès au modèle ou d’authentification, revenez à [l’étape 7d](07d-confirm-model-access.md) et confirmez que la méthode de facturation sélectionnée correspond bien au workflow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08-run-workflow-button-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08-run-workflow-button-light.svg">
  <img alt="Barre latérale du workflow avec le bouton Run workflow mis en évidence" src="images/08-run-workflow-button-light.svg">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08-run-workflow-confirm-dropdown-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08-run-workflow-confirm-dropdown-light.svg">
  <img alt="Menu de confirmation Run workflow montrant la sélection de branche et le bouton final Run workflow" src="images/08-run-workflow-confirm-dropdown-light.svg">
</picture>

### Observez le démarrage de l’exécution

Le schéma ci-dessous montre le cycle de vie complet d’une exécution de workflow, depuis le moment où vous cliquez sur **Run workflow** jusqu’à la mise à jour de votre dépôt par l’agent.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08-run-lifecycle-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08-run-lifecycle-light.svg">
  <img alt="Cycle de vie d’une exécution de workflow : du déclenchement manuel aux états en file d’attente, en cours et terminé, avec en fin de parcours une mise à jour d’une issue du dépôt par l’agent" src="images/08-run-lifecycle-light.svg">
</picture>

Après quelques secondes, une nouvelle exécution apparaît avec une icône jaune en rotation. Cliquez sur l’exécution, puis sur le nom du job pour ouvrir le journal en direct.

Vous n’avez pas encore besoin de décoder chaque ligne. Pour le moment, confirmez simplement que le workflow est actif et que le journal se met à jour pendant que l’agent planifie et utilise des outils.

### Confirmez que l’exécution est terminée

Attendez que l’exécution devienne verte avec un ✅. Ouvrez ensuite l’onglet **Issues** de votre dépôt et vérifiez que l’agent a mis à jour une issue ou en a créé une nouvelle.

## ✅ Checkpoint

- [ ] Le workflow **Daily Report Status** apparaît dans l’onglet **Actions**
- [ ] J’ai déclenché une exécution manuelle depuis l’interface GitHub
- [ ] J’ai ouvert le journal en direct pendant que l’exécution était active
- [ ] L’exécution s’est terminée avec un ✅ vert

<!-- journey: all -->

**Étape suivante :** [Interpréter votre première exécution](08b-interpret-your-run.md)

<!-- /journey -->
