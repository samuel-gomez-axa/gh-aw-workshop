<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Classer les agentic workflows et les workflows standards

> _Facultatif : faites cette side quest après [Que sont les agentic workflows ?](05-agentic-workflows-intro.md) pour affiner la distinction grâce à un exercice pratique de classification._

## :clipboard: Avant de commencer

- Vous avez lu [Que sont les agentic workflows ?](05-agentic-workflows-intro.md)

## La distinction centrale

Un workflow Actions standard exécute les mêmes étapes fixes à chaque fois ; aucun jugement n’est nécessaire. Un [agentic workflow](https://github.github.com/gh-aw/introduction/overview/#what-are-agentic-workflows) remplace ces étapes fixes par un brief de tâche en anglais courant, et l’agent d’IA décide comment l’exécuter.

**Signal clé :** si la sortie peut être différente à chaque exécution parce que l’agent lit le contexte et prend des décisions, alors c’est agentique.

## Classer la tâche A

**Task:** Run unit tests on every pull request, fail if any test exits non-zero, and upload coverage.

Écrivez votre classification (agentic ou standard) dans vos notes, puis révélez la réponse.

<details>
<summary>Vérifier la réponse de la tâche A</summary>

**Workflow Actions standard.** Chaque exécution suit des étapes fixes identiques : démarrer le job de test, échouer sur un code de sortie non nul, téléverser l’artefact de couverture. Aucun jugement n’est nécessaire ; le résultat est le même quelle que soit la modification dans la PR.

```yaml
# Example: standard deterministic step
- run: npm test
```

</details>

## Classer la tâche B

**Task:** Review newly opened issues each morning, group them by theme, flag the urgent ones, and post a short triage summary.

Écrivez votre classification, puis révélez la réponse.

<details>
<summary>Vérifier la réponse de la tâche B</summary>

**Agentic workflow.** L’agent doit inspecter le contexte vivant du dépôt, décider comment regrouper les issues similaires et juger ce qui paraît urgent ; rien de tout cela n’est une règle fixe. Le résumé changera chaque matin en fonction des issues présentes.

```markdown
<!-- Example task brief for Task B -->

Review all issues opened in the last 24 hours. Group them by theme,
flag any that look urgent, and post a triage digest as a new issue comment.
```

</details>

## Classer la tâche C

**Task:** Each Friday, scan all open issues and pull requests, summarize recent activity by contributor, and post a weekly team progress digest.

Écrivez votre classification, puis révélez la réponse.

<details>
<summary>Vérifier la réponse de la tâche C</summary>

**Agentic workflow.** L’agent lit l’activité des contributeurs, décide de ce qui constitue une progression significative et compose une synthèse différente chaque semaine. La sortie demande de l’interprétation, pas seulement un comptage.

</details>

## Classer la tâche D — hybride

**Task:** On every pull request, run ESLint (fail on errors), then have an AI read the diff and post a summary comment.

Écrivez votre classification, puis révélez la réponse.

<details>
<summary>Vérifier la réponse de la tâche D</summary>

**Agentic (hybrid) workflow.** ESLint est déterministe : même résultat succès/échec à chaque exécution. Le résumé produit par l’IA demande un jugement : lire le diff et décider comment décrire le changement.

- Le step ESLint : déterministe, même résultat pour le même code
- Le step de résumé IA : sortie différente à chaque exécution, selon ce qui a changé

Un workflow qui mélange des steps déterministes et IA reste globalement agentique.

```markdown
<!-- Hybrid example: deterministic + agentic -->

Run ESLint on the changed files, then read the diff and post a plain-English
summary of what changed and why it matters.
```

</details>

## À vous de jouer

Écrivez une phrase décrivant ce que _votre_ agentic workflow devrait faire. Gardez-la dans vos notes ; vous réutiliserez cette idée à Step 7. Concentrez-vous sur une tâche qui demande du jugement, pas sur un script de test ou de déploiement.

## Auto-vérification

Qu’est-ce qui rend un workflow agentique plutôt que standard ? Écrivez votre réponse, puis révélez-la.

<details>
<summary>Afficher la réponse modèle</summary>

Un workflow est agentique lorsqu’un agent d’IA prend des décisions de jugement, lit le contexte, décide de ce qui compte et produit une sortie différente à chaque exécution. Les workflows standards suivent des étapes fixes.

Votre réponse contient-elle :

- le fait qu’une IA prenne des décisions de jugement sur un contexte vivant
- une sortie qui varie à chaque exécution
- un contraste avec les workflows standard à étapes fixes

</details>

> [!TIP]
> Prêt à aller plus loin ? [Side Quest : La structure à deux fichiers](side-quest-05-03-two-file-structure.md) montre comment `.md` et `.lock.yml` sont liés et passe en revue le vocabulaire clé.

---

Revenez à l’aventure principale : [Que sont les agentic workflows ?](05-agentic-workflows-intro.md).

## :white_check_mark: Checkpoint

- [ ] Vous avez classé la tâche A comme un workflow standard et expliqué pourquoi elle ne demande aucun jugement d’IA
- [ ] Vous avez classé la tâche B comme un agentic workflow et nommé la décision prise par l’agent
- [ ] Vous avez classé la tâche C comme un agentic workflow et décrit en quoi chaque exécution du vendredi serait différente
- [ ] Vous avez classé la tâche D comme un agentic workflow hybride et identifié son step déterministe
- [ ] Vous pouvez expliquer en une phrase ce qui rend un workflow agentique
- [ ] Vous avez noté votre propre idée d’agentic workflow pour l’étape 7
