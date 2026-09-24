<!-- page-journey: all -->
<!-- page-adventure: core -->

# Affiner, tester et améliorer votre workflow

_Le chemin le plus rapide vers un meilleur workflow consiste à boucler serré : décrire ce que vous voulez, relire le diff, tester et comparer le résultat._

## 🎯 Ce que vous allez faire

Vous allez utiliser le skill Copilot `agentic-workflows`, installé dans votre dépôt d’entraînement à l’étape 7, pour modifier, déboguer et optimiser `daily-report-status.md`, puis déclencher une nouvelle exécution et comparer la sortie à la précédente.

À la fin de cette étape, votre workflow produira une sortie plus utile et vous disposerez d’une boucle d’itération reproductible que vous pourrez réutiliser chaque fois que la sortie du workflow sera vague, incorrecte ou incomplète.

## 📋 Avant de commencer

- Vous avez terminé [Interpréter votre première exécution](08b-interpret-your-run.md)
- Votre workflow `daily-report-status` a au moins une exécution terminée
- `.github/skills/agentic-workflows/` existe dans votre dépôt d’entraînement, créé à l’étape 7

## Qu’est-ce que le skill agentic-workflows ?

Le skill `agentic-workflows` est un skill Copilot installé dans votre dépôt d’entraînement. Il agit comme un répartiteur : lorsque vous décrivez une tâche de workflow en langage clair et mentionnez le skill par son nom, il achemine votre demande vers le bon prompt d’édition, de débogage ou d’optimisation et effectue directement les changements dans votre dépôt.

Vous l’invoquez dans Copilot CLI depuis le terminal de votre Codespace :

```bash
gh copilot
```

Puis envoyez :

```prompt
/agentic-workflows [your request here]
```

Le skill reconnaît trois grands types de tâche, **Edit**, **Debug** et **Optimize**, puis achemine votre demande vers le prompt correspondant. Si vous travaillez en local ou dans un Codespace sans session Copilot, le chemin terminal indiqué dans chaque section ci-dessous montre l’équivalent manuel.

> [!TIP]
>
> <details>
> <summary><b>Quête annexe facultative :</b> Vous voulez le tableau complet des types de tâche avec des expressions de déclenchement en exemple, ainsi que des scénarios d’entraînement pour associer une demande au bon type de tâche ?</summary>
>
> Suivez [Side Quest: How the `agentic-workflows` Skill Dispatcher Works](side-quest-10-03-skill-dispatcher.md), puis revenez ici.
>
> </details>

## Commencez par une observation concrète

Ouvrez la dernière exécution dans l’onglet **Actions** et repérez un seul point que vous souhaitez améliorer.

Bons exemples :

- Le résumé est trop générique.
- Un détail important manque.
- Le ton semble trop rigide.
- La mise en forme est incohérente.

Choisissez un seul problème pour cette itération. De petits changements isolés rendent bien plus facile l’identification de ce qui améliore réellement le résultat.

## Edit : améliorez le workflow brief

Après avoir examiné la sortie de l’exécution, vous avez peut-être remarqué que le commentaire de l’agent était générique. Vous allez maintenant rendre le brief plus spécifique afin que l’agent explique _pourquoi_ l’issue qui suscite le plus de réactions compte, et pas seulement laquelle c’est.

Dans le terminal de votre Codespace, exécutez `gh copilot`, puis collez :

```prompt
/agentic-workflows update .github/workflows/daily-report-status.md
so that the agent adds one sentence explaining why resolving the most-reacted issue
would benefit the team. Keep the existing [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) constraint (at most one comment).
```

Le skill charge le prompt de mise à jour, effectue la modification ciblée dans le corps Markdown, recompile le workflow, puis vous montre le diff. Examinez le corps Markdown mis à jour et confirmez que la nouvelle instruction est claire et précise avant de commiter.

<details open>
<summary>🖥️ Chemin terminal</summary>

Ouvrez `.github/workflows/daily-report-status.md` et ajoutez une phrase au corps Markdown, par exemple :

```text
After identifying the most-reacted issue, write one sentence explaining why resolving it
would benefit the team, based on the issue title and description.
```

Recompilez puis poussez :

```bash
gh aw compile
git add .
git commit -m "feat: add team-benefit sentence to daily-report-status brief"
git push
```

</details>

## Debug : enquêtez sur une sortie inattendue

Si l’exécution de l’étape 8 s’est terminée mais que la sortie était vide, vague ou entièrement absente, utilisez le skill pour diagnostiquer la cause la plus probable et proposer une correction.

Dans le terminal de votre Codespace, exécutez `gh copilot`, puis collez ce prompt en remplaçant le texte entre crochets par ce que vous avez réellement observé :

```prompt
/agentic-workflows debug .github/workflows/daily-report-status.md.
The last run [describe the problem — for example: "posted a comment but left the
summary blank" or "finished without posting anything"].
Suggest the most likely cause and propose one change to the workflow brief to fix it.
```

Le skill lit le fichier de workflow, identifie des causes probables comme un brief trop vague, une instruction de repli manquante ou une surface safe-output trop large, puis propose une correction ciblée et minimale.

<details open>
<summary>🖥️ Chemin terminal</summary>

Ouvrez le journal d’exécution depuis l’onglet **Actions** et trouvez le premier `Tool call` effectué par l’agent. Ouvrez ensuite `.github/workflows/daily-report-status.md` et ajoutez une instruction de repli dans le corps Markdown, par exemple :

```text
If no open issues have 👍 reactions, post a comment on the most recently updated
open issue instead.
```

Recompilez puis poussez la modification.

</details>

## Optimize : réduisez l’usage de tokens

Une fois que le workflow produit une sortie correcte, vous pouvez réduire la quantité d’[AI Credit](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic) consommée à chaque exécution. C’est particulièrement important pour les workflows qui s’exécutent selon un [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule).

Dans le terminal de votre Codespace, exécutez `gh copilot`, puis collez :

```prompt
/agentic-workflows optimize .github/workflows/daily-report-status.md
to reduce token usage. Apply only changes that do not change the workflow's outcome.
```

Le skill applique des techniques telles que la suppression d’instructions redondantes, la consolidation de contraintes répétées et l’élimination de déclarations safe-output inutilisées.

<details open>
<summary>🖥️ Chemin terminal</summary>

Examinez le corps Markdown de votre workflow et retirez toute phrase qui répète la même contrainte ou reformule quelque chose déjà imposé par le frontmatter, par exemple « publier un seul commentaire » si `safe-outputs` vous limite déjà à un commentaire. Recompilez après chaque suppression pour vérifier que rien ne casse.

</details>

## Commitez les deux fichiers du workflow

Commitez à la fois le workflow source et le lock file recompilé :

```bash
git add .
git commit -m "refine daily-report-status workflow output"
git push
```

Si votre workflow utilise un autre nom de fichier, indexez ce fichier `.md` et son fichier `.lock.yml` correspondant à la place.

## Déclenchez une nouvelle exécution et comparez

Utilisez [**workflow_dispatch**](https://github.github.com/gh-aw/reference/triggers/) depuis l’onglet **Actions** pour déclencher une nouvelle exécution. Comparez ensuite le dernier résultat au précédent.

Posez-vous les questions suivantes :

- Est-ce que la nouvelle exécution reflète bien le changement apporté ?
- La sortie est-elle plus utile qu’avant ?
- Avez-vous amélioré le problème d’origine sans en créer un nouveau ?

Si oui, gardez la modification. Sinon, annulez-la et essayez un autre ajustement.

Si vous voulez une boucle de revue plus stricte, notez chaque exécution sur l’exactitude, l’exhaustivité et le ton avant de décider du changement suivant.

## ✅ Checkpoint

- [ ] J’ai identifié un problème précis à partir d’une exécution réelle du workflow
- [ ] J’ai utilisé le skill `/agentic-workflows`, ou fait une modification manuelle, pour le traiter
- [ ] Le lock file compilé a été mis à jour et commité avec la source du workflow
- [ ] `daily-report-status.md` et `daily-report-status.lock.yml` sont tous les deux commités et poussés
- [ ] J’ai comparé la nouvelle exécution à la précédente et décidé de la suite des changements

<!-- journey: all -->

**Étape suivante :** [Et ensuite ? Continuez à explorer](14-next-steps.md)

<!-- /journey -->
