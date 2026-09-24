<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Triggers Événementiels Dans Les Agentic Workflows

> _Facultatif : utilisez cette introduction si vous voulez de l'aide pour choisir entre des workflows [scheduled](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule) et des workflows événementiels avant de terminer [Créer — PR Code Reviewer](15-conditional-logic.md), puis revenez à l'aventure principale._

## :dart: Ce Que Vous Allez Faire

Vous allez comparer les [triggers](https://github.github.com/gh-aw/reference/triggers/) scheduled et event-driven, copier quatre blocs de triggers de départ et apprendre comment le choix du trigger influence `safe-outputs`. À la fin, vous saurez quand utiliser `pull_request`, `push`, `issues` ou `schedule`.

## :clipboard: Avant De Commencer

- Vous disposez déjà d'un fichier de workflow venant de Step 7 ou Step 15, comme `.github/workflows/daily-status.md`.
- Vous savez comment valider et pousser des changements dans le parcours que vous avez choisi.

## Triggers Scheduled Vs Event-Driven

Un workflow **scheduled** s'exécute parce que l'heure prévue est arrivée. Un workflow **event-driven** s'exécute parce qu'un événement s'est produit dans le dépôt, comme l'ouverture d'une pull request ou la réouverture d'une issue.

| Style de trigger | Ce qui le déclenche            | Bon cas d'usage                             |
| ---------------- | ------------------------------ | ------------------------------------------- |
| Planifié         | Le temps passe                 | Résumés quotidiens, rappels, audits         |
| Événementiel     | Un événement GitHub se produit | Revue de PR, tri d'issues, suivi après push |

Si vous voulez que le workflow réagisse à une action précise dans le dépôt, utilisez un trigger événementiel. Si vous voulez qu'il s'exécute même lorsque personne n'a touché au dépôt, utilisez un [schedule](https://github.github.com/gh-aw/reference/triggers/#scheduled-triggers-schedule).

## Quatre Patterns De Trigger Courants

### `pull_request`

Utilisez-le lorsque le workflow doit réagir à l'activité d'une pull request.

```markdown
---
on:
    pull_request: {}
    workflow_dispatch: {}
---
```

C'est un bon choix lorsque vous voulez un retour lié à la PR en cours, comme le PR Code Reviewer in Step 11c.

### `push`

Utilisez-le lorsque le workflow doit réagir dès que des commits arrivent sur une branche.

```markdown
---
on:
    push:
        branches: [main]
    workflow_dispatch: {}
---
```

C'est un bon choix lorsque vous voulez vérifier ou résumer des changements après un push de code.

### `issues`

Utilisez-le lorsque le workflow doit réagir à l'activité des issues.

```markdown
---
on:
    issues:
        types: [opened, reopened]
    workflow_dispatch: {}
---
```

C'est un bon choix lorsque vous voulez qu'un assistant trie, étiquette ou réponde quand quelqu'un ouvre une issue.

### `schedule`

Utilisez-le lorsque le workflow doit s'exécuter selon l'horloge, que quelqu'un ait modifié le dépôt ou non.

```markdown
---
on:
    schedule: daily
    workflow_dispatch: {}
---
```

C'est un bon choix pour des rapports récurrents comme le workflow Daily Repo Status de Step 7.

## Essayez : Remplacez Votre Trigger

Ouvrez votre fichier de workflow, comme `.github/workflows/daily-status.md`, et remplacez le bloc `on:` existant par `workflow_dispatch` plus un event trigger de cette page.

Ensuite :

1. Enregistrez le fichier de workflow avec votre bloc de trigger mis à jour.
2. Exécutez `gh aw compile` pour vérifier que la modification est valide.
3. Validez et poussez la modification selon le parcours que vous avez choisi.
4. Ouvrez le workflow dans l'UI GitHub Actions, déclenchez-le manuellement et confirmez qu'il s'exécute.

## Comment Le Choix Du Trigger Modifie `safe-outputs`

Le trigger décide **quand** le workflow démarre. Le bloc [safe-outputs](https://github.github.com/gh-aw/reference/safe-outputs/) décide **où il a le droit d'écrire en retour**.

| Trigger        | Cible naturelle de réponse                             | Choix courant de `safe-outputs`                                                                           |
| -------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `pull_request` | La pull request en cours                               | `add-comment`                                                                                             |
| `issues`       | L'issue en cours                                       | `add-comment`                                                                                             |
| `push`         | Souvent aucun fil de conversation intégré              | Généralement aucun au départ, ou `add-comment` si le workflow publie sur une issue ou une PR qu'il trouve |
| `schedule`     | Généralement une issue permanente ou un fil de rapport | `add-comment`                                                                                             |

> [!IMPORTANT]
> Le trigger n'accorde **pas** automatiquement l'accès en écriture. Vous devez quand même choisir la bonne entrée `safe-outputs` pour l'endroit où vous voulez que l'agent écrive.

## Trois Questions Pour Choisir Le Bon Trigger

Posez-vous ces questions :

1. **Qu'est-ce qui doit exactement déclencher ce workflow ?**
2. **Existe-t-il déjà une pull request ou une issue à laquelle l'agent doit répondre ?**
3. **Le workflow doit-il quand même s'exécuter si rien n'a changé ?**

Utilisez cette règle pratique :

- Si la réponse est "a PR changed," commencez par `pull_request`.
- Si la réponse est "a commit landed," commencez par `push`.
- Si la réponse est "an issue changed," commencez par `issues`.
- Si la réponse est "nothing happened, but I still want a report," commencez par `schedule`.

## Exemple Concret : Step 7 Vs Step 15

Le workflow Daily Repo Status de [Step 7](07-your-first-workflow.md) et le PR Code Reviewer de [Step 15](15-conditional-logic.md) utilisent le même format de workflow, mais résolvent des problèmes de temporalité différents.

| Step                | Trigger            | Pourquoi il convient                                                   | Safe output   |
| ------------------- | ------------------ | ---------------------------------------------------------------------- | ------------- |
| 7 Daily Repo Status | `schedule: daily`  | Vous voulez un rapport tous les jours, même lorsqu'il ne se passe rien | `add-comment` |
| 15 PR Code Reviewer | `pull_request: {}` | Vous voulez un retour uniquement lorsqu'une PR change                  | `add-comment` |

C'est la décision centrale : choisissez le trigger qui correspond au moment qui vous intéresse, puis choisissez la cible d'écriture qui correspond à l'objet auquel vous voulez que le workflow réponde.

<!-- journey: all -->

## :white_check_mark: Checkpoint

- [ ] Je peux expliquer la différence entre un workflow scheduled et un workflow event-driven
- [ ] Je connais les blocs de trigger de départ pour `pull_request`, `push`, `issues` et `schedule`
- [ ] J'ai modifié le trigger de mon workflow et confirmé qu'il compile toujours avec `gh aw compile`
- [ ] Je comprends que `safe-outputs` contrôle l'accès en écriture séparément du trigger
- [ ] Je peux expliquer pourquoi Step 7 et Step 15 utilisent tous les deux `add-comment` comme choix `safe-outputs`

---

Retour à l'aventure principale : [Créer — PR Code Reviewer](15-conditional-logic.md).

<!-- /journey -->
