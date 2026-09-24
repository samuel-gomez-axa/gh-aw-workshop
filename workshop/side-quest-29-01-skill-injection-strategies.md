<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : stratégies d’injection de skill — hint, fusion et inline

> _Facultatif : utilisez ce guide plus détaillé si vous voulez une vision complète des choix possibles pour brancher un [`SKILL.md`](https://github.github.com/gh-aw/reference/custom-agent-for-aw/#using-the-skill-files-for-agentic-workflows) dans le prompt d’un workflow avant de revenir à [l’étape 29](29-skills-and-domain-knowledge.md)._

## :dart: Ce que vous allez faire

Comparez trois stratégies pour connecter un `SKILL.md` à un prompt de workflow, **hint**, **fusion** et **inline**, puis exercez-vous à écrire chacune d’elles. À la fin, vous serez capable de choisir la bonne stratégie pour une tâche donnée et un budget de contexte donné.

## :clipboard: Avant de commencer

- Vous êtes en train de suivre [Enseignez des connaissances métier à votre agent avec des skills](29-skills-and-domain-knowledge.md).
- Vous disposez déjà d’un fichier `SKILL.md`, par exemple `.github/skills/issue-triage/SKILL.md` issu de l’étape 29.

---

## Décider avec un tableau

| Facteur             | Hint (generalist)                              | Fusion (targeted)                           | Inline (self-contained)                                 |
| ------------------- | ---------------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| Domaine de la tâche | Large ou inconnu au moment de l’écriture       | Étroit et bien défini                       | Spécifique à un seul workflow                           |
| Ensemble de skills  | Évolue dynamiquement au fil du temps           | Connu et stable                             | Non réutilisé ailleurs                                  |
| Budget de contexte  | Large                                          | Restreint                                   | Petit, seulement ce qui tient en inline                 |
| Déterminisme        | Plus faible, l’agent choisit ce qui s’applique | Plus élevé, vous précisez le fragment exact | Le plus élevé, le contenu est embarqué avec le workflow |
| Réutilisation       | À travers plusieurs workflows                  | À travers plusieurs workflows               | Un seul workflow                                        |

> :thinking: **Prédiction :** Avant de lire les exemples ci-dessous, devinez quelle stratégie correspond à votre skill de l’étape 29. Le domaine de votre tâche reste-t-il étroit, ou pourrait-il s’étendre plus tard à de nouvelles conventions ?

---

## Hint : laisser l’agent découvrir lui-même les skills

Utilisez **hint** lorsque vous voulez que l’agent explore le dépôt et sélectionne lui-même les skills pertinents. C’est l’option la moins coûteuse en effort et elle passe bien à l’échelle à mesure que votre bibliothèque de skills grandit, au prix d’un peu moins de déterminisme : vous faites confiance au jugement de l’agent pour décider ce qui s’applique.

```markdown
If the repository contains `SKILL.md` files under `skills/` or `.github/skills/`,
check which ones are relevant to this task. For each relevant skill, read its
content and apply the guidance it provides.
```

**Action :** Ajoutez ce paragraphe de hint à un workflow brief qui touche aux issues, aux pull requests ou à un autre domaine couvert par l’un de vos skills.

---

## Fusion : référencer le fragment exact dont vous avez besoin

Utilisez **fusion** lorsque vous savez exactement de quelle section du skill l’agent a besoin et que vous voulez garder un prompt compact. Un commentaire de fusion ne référence que le fragment pertinent, jamais le fichier entier, afin que le compilateur n’intègre que cette partie au moment de la compilation.

```markdown
<!-- gh-skill-fusion: .github/skills/issue-triage/SKILL.md#issue-triage -->

Classify this issue as bug, feature, or question. If it is a bug, confirm the
body includes reproduction steps, expected vs. actual behavior, and environment
details.
```

**Action :** Ajoutez un commentaire `gh-skill-fusion` au-dessus d’une section de workflow qui correspond directement à un titre de votre `SKILL.md`.

> [!TIP]
> L’ancre après `#` dans le commentaire de fusion doit correspondre exactement à un titre du `SKILL.md` cible. Si elle ne correspond pas, le compilateur ne peut pas résoudre le fragment.

---

## Inline : embarquer le skill directement dans le fichier du workflow

Utilisez les skills **inline** lorsque le skill est petit, spécifique à un seul workflow et inutile ailleurs. Intégrez le fragment directement dans le fichier de workflow sous un titre `## skill: \`name\``; gh-aw l’extrait au bon endroit lors du setup, de sorte que vous n’avez pas à maintenir de fichier`SKILL.md` séparé.

```markdown
## skill: `issue-triage`

Classify each issue as `bug`, `feature`, or `question` based on its title and body.
For issues classified as `bug`, confirm the body includes steps to reproduce,
expected vs. actual behavior, and environment details.
```

**Action :** Si vous avez une convention ponctuelle dont seul ce workflow a besoin, essayez de la déplacer dans un bloc `## skill:` au lieu d’un fichier séparé.

---

## Entraînement : appliquer les trois stratégies à un seul skill

Prenez le fichier `.github/skills/issue-triage/SKILL.md` que vous avez écrit à l’étape 29, ou un skill équivalent de votre cru, et essayez successivement chaque stratégie :

1. Ajoutez un paragraphe **hint** à un workflow brief et compilez-le.
2. Remplacez le hint par un commentaire **fusion** pointant vers un titre de votre skill, puis recompilez.
3. Copiez le même contenu dans un bloc inline `## skill:` directement dans le fichier de workflow, supprimez le commentaire de fusion et compilez une troisième fois.

Après chaque compilation, vérifiez dans le `.lock.yml` l’étape d’activation ou le contenu de skill extrait, et confirmez que vous n’obtenez aucun avertissement concernant une référence de skill non épinglée ou non résolue.

```bash
gh aw compile
```

## :white_check_mark: Checkpoint

- [ ] Je peux expliquer quand choisir hint plutôt que fusion, et quand choisir inline plutôt que les deux autres
- [ ] J'ai ecrit un paragraphe hint faisant reference a `skills/` ou `.github/skills/`
- [ ] J'ai écrit un commentaire fusion avec une ancre valide correspondant à un titre de `SKILL.md`
- [ ] J'ai ecrit un bloc inline `## skill:` comme alternative a un fichier separe
- [ ] `gh aw compile` a réussi pour au moins une de ces stratégies, sans avertissement de skill non épinglé

---

<!-- journey: all -->

Retour à [Enseignez des connaissances métier à votre agent avec des skills](29-skills-and-domain-knowledge.md).

<!-- /journey -->
