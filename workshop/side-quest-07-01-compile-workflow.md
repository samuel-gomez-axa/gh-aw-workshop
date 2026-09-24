<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Utiliser `gh aw compile` pour détecter les erreurs tôt

> _Facultatif : faites ce détour si vous voulez une présentation plus approfondie de `gh aw compile`, puis revenez à [l’étape 7](07-your-first-workflow.md) ou [l’étape 9](09-agentic-editing.md)._

## 🎯 Ce que vous allez faire

Vous utiliserez `gh aw compile` comme boucle de retour rapide pendant que vous modifiez des fichiers de workflow. À la fin, vous saurez quand utiliser `--no-emit` pour des vérifications à blanc, quand utiliser `--validate` pour un dépannage ciblé, quand laisser `--watch` actif et comment corriger les erreurs de compilation les plus courantes.

## Ce que fait `gh aw compile`

`gh aw compile` vérifie votre fichier source de workflow, valide le [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) et la structure du corps Markdown, puis génère le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) compilé qu’exécute GitHub Actions. Il détecte les erreurs de format et de schéma avant que vous validiez ou déclenchiez un workflow.

Exécutez-le chaque fois que vous modifiez un fichier de workflow :

```bash
gh aw compile
```

En cas de succès, vous devriez voir un message de réussite en vert et un fichier `.lock.yml` mis à jour à côté de votre fichier source.

> [!NOTE]
> `gh aw compile` vérifie la structure du fichier, pas la qualité du raisonnement de l’agent ni de sa sortie finale. Vous devez quand même tester le workflow séparément après une compilation propre.

## Utiliser `--no-emit` pour des vérifications rapides de structure

Quand vous voulez seulement une réponse oui/non sans générer de [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml), utilisez `--no-emit` :

```bash
gh aw compile --no-emit
```

Cela est utile après chaque petite modification, car la structure du fichier est confirmée sans écrire ni écraser le [lock file](https://github.github.com/gh-aw/reference/glossary/#workflow-lock-file-lockyml) généré à chaque fois.

## Dépanner avec `--validate`

Utilisez simplement `gh aw compile` pour les modifications normales de workflow. Si vous avez besoin d’un dépannage ciblé ou d’un audit explicite de schéma/dépréciation, ajoutez `--validate` :

```bash
gh aw compile --validate
```

Cela active la validation du schéma des workflows GitHub Actions, la validation des images de conteneur et la validation des SHA d’actions. C’est plus complet qu’une compilation simple, mais aussi plus lent ; réservez-le donc à ces contrôles ciblés plutôt qu’aux boucles de compilation routinières.

## Utiliser `--watch` pendant vos itérations

Si vous modifiez encore à la main, laissez le compilateur tourner :

```bash
gh aw compile --watch
```

Chaque sauvegarde déclenche une nouvelle compilation ; vous obtenez donc un retour immédiat au lieu de découvrir plus tard des erreurs YAML.

> [!TIP]
> Pour la boucle de retour la plus rapide, laissez `--watch` tourner dans un terminal pendant que vous modifiez dans un autre.

## Comment lire une erreur de compilation

Lorsque `gh aw compile` échoue, commencez par le premier numéro de ligne signalé. Les erreurs YAML sont souvent causées par la ligne au-dessus ou au-dessous de la ligne indiquée, surtout quand l’indentation est incorrecte.

Les exemples ci-dessous montrent des fichiers source `gh-aw` avant [compilation](https://github.github.com/gh-aw/reference/compilation-process/) ; des valeurs comme `schedule: daily` et `schedule: daily on weekdays` y sont donc des raccourcis valides. L’erreur vient de l’indentation, pas de la valeur de schedule elle-même.

```markdown
---
# ❌ Broken — "workflow_dispatch" is not nested under "on:"
on:
    schedule: daily
workflow_dispatch: {}
---
```

```markdown
---
# ✅ Fixed
on:
    schedule: daily
    workflow_dispatch: {}
---
```

```markdown
---
# ❌ Broken — "schedule" is not indented under "on:"
on:
schedule: daily on weekdays
  workflow_dispatch: {}
---
```

```markdown
---
# ✅ Fixed
on:
    schedule: daily on weekdays
    workflow_dispatch: {}
---
```

## Corrections rapides pour les erreurs de compilation courantes

| Si vous voyez ce type d’erreur                                                                                          | Cela signifie généralement                                      | Vérifiez d’abord ceci                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Erreur de parsing YAML ou `did not find expected key`                                                                   | Une clé est indentée au mauvais niveau                          | Assurez-vous que les clés imbriquées sous `on:`, [`permissions:`](https://github.github.com/gh-aw/reference/permissions/), `tools:` ou `safe-outputs:` sont indentées de deux espaces de plus que leur parent |
| `found character that cannot start any token`                                                                           | Vous avez collé une tabulation ou une ponctuation YAML parasite | Remplacez les tabulations par des espaces et vérifiez l’absence de caractères spéciaux accidentels dans les valeurs non quotées                                                                               |
| `unexpected end of stream` ou erreurs de [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)/document | Les délimiteurs du frontmatter sont incomplets                  | Vérifiez que le fichier contient bien le `---` d’ouverture et le `---` de fermeture du [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)                                                  |
| Une section qui fonctionnait auparavant échoue soudainement après une modification                                      | La dernière modification a changé une structure YAML voisine    | Revérifiez le dernier bloc que vous avez touché avant de lire le reste du fichier                                                                                                                             |

<!-- journey: terminal -->

## ✅ Checkpoint

- [ ] Je sais ce que `gh aw compile` vérifie avant l’exécution d’un workflow
- [ ] Je peux utiliser `--no-emit` pour des vérifications rapides de structure sans générer de lock file
- [ ] Je peux utiliser `--watch` pour obtenir un retour en direct pendant mes modifications
- [ ] Je sais repérer des erreurs d’indentation dans un exemple d’erreur de compilation
- [ ] Je connais les premiers endroits à vérifier quand la compilation échoue

---

**Retour :** [Étape 7 — Votre premier workflow](07-your-first-workflow.md) | [Étape 9 — Édition agentique](09-agentic-editing.md)

<!-- /journey -->
