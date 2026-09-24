<!-- page-journey: all -->
<!-- page-adventure: core -->

# Interpréter votre première exécution

_Votre première exécution est plus utile lorsque vous pouvez expliquer ce que l’agent a fait et pourquoi._

## :dart: Ce que vous allez faire

Vous allez lire le journal en direct de l’étape 8, trouver la sortie du workflow et apprendre trois vérifications rapides pour les problèmes d’exécution les plus fréquents.

## :clipboard: Avant de commencer

- Vous avez terminé [Lancer et observer votre workflow](08-run-your-workflow.md)
- Votre workflow **Daily Report Status** a au moins une exécution terminée

## Lisez le journal en direct

Ouvrez l’exécution terminée de **Daily Report Status** depuis l’onglet **Actions**, puis cliquez sur le nom du job. Le journal suit généralement un schéma simple : l’agent réfléchit, appelle un [tool](https://github.github.com/gh-aw/reference/tools/), reçoit un résultat, puis termine.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08b-agent-loop-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08b-agent-loop-light.svg">
  <img alt="Boucle d’exécution de l’agent : Planning mène à un Tool Call, qui renvoie un Result ; l’agent repart dans la boucle ou termine avec Done" src="images/08b-agent-loop-light.svg">
</picture>

```text
🤔 Planning...  Searching for open issues with 👍 reactions
🔧 Tool call:   github.list_issues
📥 Result:      3 issues found
🤔 Thinking...  Issue #4 has the most 👍 reactions
🔧 Tool call:   github.add_comment
✅ Done
```

La question importante n’est pas « Puis-je lire chaque ligne ? », mais « Puis-je dire où l’agent a décidé, où il a agi et s’il a terminé ? ». Trouvez le premier `Tool call` dans votre propre exécution, puis remplissez le modèle ci-dessous :

```text
Premier Tool call observé :    [nom de l’outil, par ex. github.list_issues]
Ce qu’il essayait de faire :   [description en une phrase]
```

## Vérifiez la sortie

Une fois l’exécution terminée, faites défiler jusqu’à la section **Summary** de la page d’exécution. Vous y trouverez la version courte de ce que l’agent pense avoir fait, y compris l’[action safe-output](https://github.github.com/gh-aw/reference/safe-outputs/) qu’il a utilisée.

Vérifiez ensuite la sortie réelle dans votre dépôt. Pour **Daily Report Status**, cela signifie généralement ouvrir l’issue touchée par l’agent et confirmer que le commentaire ou la nouvelle issue est bien présent. Le changement sur GitHub reste la source de vérité derrière l’enregistrement [safe-output](https://github.github.com/gh-aw/reference/safe-outputs/).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08-run-summary-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08-run-summary-light.svg">
  <img alt="Panneau Summary de l’exécution du workflow" src="images/08-run-summary-light.svg">
</picture>

## Vérifiez d’abord les motifs d’erreur fréquents

Si votre exécution ne semble pas correcte, passez par ces trois vérifications dans l’ordre avant de modifier quoi que ce soit dans le workflow.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/08b-error-checks-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/08b-error-checks-light.svg">
  <img alt="Trois vérifications rapides pour une exécution de workflow en échec : vérifier si le workflow apparaît dans Actions, puis si le journal montre une action utile, puis si quelque chose a changé sur GitHub" src="images/08b-error-checks-light.svg">
</picture>

- **Le workflow n’apparaît jamais dans Actions** : confirmez que le fichier de workflow est bien commité sur `main`, puis actualisez. Si vous utilisez le chemin terminal, exécutez `gh aw compile` pour détecter les erreurs de [compile](https://github.github.com/gh-aw/reference/compilation-process/).
- **Le journal montre beaucoup de réflexion mais aucune action utile** : vos instructions sont peut-être trop vagues. Laissez l’exécution ouverte, puis affinez le corps du workflow à l’étape suivante.
- **L’exécution se termine mais rien n’a changé sur GitHub** : assurez-vous que votre dépôt contient une issue ouverte et que le workflow disposait des permissions d’écriture nécessaires.

Savoir reconnaître l’apparence d’une exécution en échec vous aide à repérer immédiatement les problèmes de permissions, avant de perdre du temps à relire le brief :

```text
🤔 Planning...  Searching for open issues
🔧 Tool call:   github.list_issues
📥 Error:       403 Forbidden — insufficient permissions
❌ Failed
```

Si ces vérifications ne résolvent pas le problème, la [Side Quest: Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md) couvre des cas supplémentaires.

## Prenez du recul

Avant de cocher le checkpoint, prenez deux minutes pour appliquer ce que vous venez de lire à votre propre exécution.

**Exercice 1 — retracez la décision :** trouvez le premier `Tool call` dans le journal d’exécution et répondez à cette question : quelle question l’agent essayait-il de résoudre à ce moment-là, et quelle information a-t-il reçue en retour ?

**Exercice 2 — évaluez le résultat :** comparez le résumé d’exécution au changement réel sur GitHub, c’est-à-dire le commentaire ou l’issue. L’agent a-t-il fait ce que vous attendiez ? Écrivez une phrase indiquant ce qui correspondait et, s’il y a lieu, ce qui était différent.

Mettez vos réponses dans un fichier brouillon, dans votre éditeur ou à l’endroit où vous gardez vos notes. Vous reviendrez à cette comparaison lorsque vous affinerez le workflow à l’étape suivante.

## :white_check_mark: Checkpoint

- [ ] J’ai ouvert le résumé d’exécution et trouvé la note safe-output
- [ ] J’ai vérifié la sortie réelle sur GitHub créée par le workflow
- [ ] J’ai retracé le premier appel d’outil et noté ce que l’agent essayait de faire
- [ ] J’ai comparé le résumé d’exécution au changement réel sur GitHub et noté le résultat
- [ ] Je connais la première vérification à faire si une exécution est absente, confuse ou terminée sans rien écrire
- [ ] Je peux identifier si une exécution a échoué à cause d’une erreur de permission, d’un brief trop vague ou d’une sortie manquante

<!-- journey: all -->

**Étape suivante :** [Affiner, tester et améliorer votre workflow](09-agentic-editing.md)

<!-- /journey -->
