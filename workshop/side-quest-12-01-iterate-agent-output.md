<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête Annexe : Évaluer Et Itérer Sur La Sortie De L'agent

> _Facultatif : utilisez cette quête annexe lorsque vous voulez une méthode répétable pour juger un run de workflow, améliorer une phrase du brief du workflow et comparer le résultat, puis revenez à [Affiner, tester et améliorer votre workflow](09-agentic-editing.md)._

## :dart: Ce Que Vous Allez Faire

Exécutez votre workflow une fois, évaluez la sortie avec une courte grille, modifiez une phrase du brief, puis relancez-le. À la fin, vous aurez une comparaison avant/après au lieu d'une impression vague que le prompt est "better."

## :clipboard: Avant De Commencer

- Vous avez terminé [Step 9](09-agentic-editing.md) et disposez déjà d'un run de workflow à inspecter.
- Votre workflow publie sur une [safe output surface](https://github.github.com/gh-aw/reference/safe-outputs/) telle que l'issue **Daily Status Reports**.

## Run De Référence

Utilisez l'onglet **Actions** pour déclencher votre workflow une fois de plus afin d'avoir un exemple récent à évaluer.

Si vous préférez récupérer les fichiers du dernier run depuis un terminal, ces commandes `gh` d'exemple récupèrent l'ID du run le plus récent et téléchargent les artifacts qu'il a publiés :

```bash
RUN_ID=$(gh run list --workflow "Daily Repo Status" --limit 1 --json databaseId --jq '.[0].databaseId')
gh run download "$RUN_ID" --dir /tmp/daily-status-run
```

Si votre workflow ne publie pas d'artifact, ignorez le téléchargement et évaluez directement le dernier commentaire d'issue.

## Évaluez La Sortie Avec Une Grille En 3 Lignes

Ouvrez le dernier commentaire d'issue ou la sortie téléchargée et attribuez une note de 0 à 2 à chaque ligne.

| Dimension  | 2 points                                                           | 1 point                                                      | 0 point                                             |
| ---------- | ------------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| Précision  | Chaque fait correspond à ce que vous pouvez vérifier dans le dépôt | Un fait n'est pas clair ou demande une vérification manuelle | Un fait est faux, manquant ou manifestement inventé |
| Complétude | Tous les champs demandés sont présents                             | Un champ demandé est mince ou partiellement manquant         | Plusieurs champs demandés sont absents              |
| Ton        | La formulation correspond à la voix demandée                       | La formulation est exploitable mais générique                | La formulation paraît robotique ou hors ton         |

Notez le score de référence avant de modifier quoi que ce soit. Par exemple :

```text
Before: Accuracy 2, Completeness 1, Tone 0
Lowest score: Tone
```

## Faites Un Changement Ciblé

Prenez la ligne avec la note la plus basse et modifiez ou ajoutez une seule **phrase** dans votre [workflow brief](https://github.github.com/gh-aw/reference/markdown/) pour y répondre.

| Note la plus basse | Une phrase à modifier ou à ajouter                                                         |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Précision          | Dites à l'agent de ne pas inventer de chiffres et d'ignorer ce qu'il ne peut pas vérifier. |
| Complétude         | Nommez le champ manquant, par exemple "Include the age of the oldest open PR."             |
| Ton                | Décrivez la voix voulue, par exemple "Write in a friendly, conversational tone."           |

Si vous utilisez l'onglet **Agents** de GitHub Copilot ou la [GitHub Copilot app](side-quest-01-02-environment-reference.md#github-copilot-app), demandez une mise à jour ciblée :

```prompt
Using the agentic-workflows skill, update .github/workflows/daily-status.md
by changing one sentence in the Markdown body to improve Tone.
```

Si vous travaillez dans un environnement navigateur sans accès au terminal, utilisez ce parcours agent à la place du parcours terminal ci-dessous.

Si vous avez un terminal ouvert, ouvrez `.github/workflows/daily-status.md` et modifiez directement le Markdown body : aucune recompilation n'est nécessaire pour des changements limités au body.

> [!NOTE]
> `gh aw compile` n'est requis que lorsque vous modifiez le **frontmatter**, [triggers](https://github.github.com/gh-aw/reference/triggers/), permissions ou autres champs YAML. Modifier le brief de tâche Markdown prend effet au run suivant sans recompilation.

## Comparaison Avant/Après

Déclenchez de nouveau le workflow depuis **Actions** et évaluez la nouvelle sortie avec la même grille.

Consignez votre résultat dans une courte comparaison avant/après :

```text
Before: Accuracy 2, Completeness 1, Tone 0
After: Accuracy 2, Completeness 2, Tone 2
Changed sentence: "Write in a friendly, conversational tone."
```

Si la ligne la plus faible ne s'est pas améliorée, gardez le premier changement, choisissez une autre instruction à modifier ou ajouter et refaites la même boucle.

## Lisez Le Journal Du Run Pour Repérer Les Erreurs

<details open>
<summary>Besoin d'idées sur ce qu'il faut modifier ou où chercher les erreurs ?</summary>

Guide rapide problème → correction :

| Problème observé                        | Phrase à ajouter ou à resserrer                                         |
| --------------------------------------- | ----------------------------------------------------------------------- |
| Les faits semblent devinés              | "Use only numbers you can verify from GitHub data or repository files." |
| Un champ demandé manque                 | "Include the age of the oldest open PR if one exists."                  |
| Le ton paraît raide                     | "Write in a friendly, conversational tone."                             |
| Le format dérive                        | "Follow this exact heading and bullet structure."                       |
| Des commentaires dupliqués apparaissent | "If you have already posted today, skip."                               |

Vérification rapide du run log :

- **Compile error** — exécutez `gh aw compile` en local, ou demandez à votre agent Copilot de le faire et de corriger la ligne signalée.
- **Missing permissions** — revérifiez le [workflow frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) et confirmez que la safe output surface est correctement déclarée.
- **Rate limits or transient failures** — attendez quelques minutes puis relancez.

</details>

## :white_check_mark: Checkpoint

- [ ] Vous avez déclenché un nouveau run de workflow et capturé une sortie réelle à examiner
- [ ] Vous avez noté un score de référence pour l'accuracy, la completeness et le tone
- [ ] Vous avez modifié exactement une phrase du workflow brief pour cibler la note la plus basse
- [ ] Vous avez déclenché un second run et consigné une comparaison avant/après telle que `Before: Accuracy 2, Completeness 1, Tone 0 → After: Accuracy 2, Completeness 2, Tone 2`

<!-- journey: all -->

Revenez à [Affiner, tester et améliorer votre workflow](09-agentic-editing.md).

<!-- /journey -->
