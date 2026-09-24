<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : comment fonctionne l’assignation round-robin des expériences A/B

> _Facultatif : faites ce détour si vous voulez une explication plus poussée du mécanisme [round-robin](https://github.github.com/gh-aw/experimental/experiments/#statistical-balancing) derrière `experiments:`, puis revenez à [l’étape 23](23-ab-experiments.md)._

## :dart: Ce que vous allez faire

Vous allez examiner le fonctionnement interne de l’assignation `experiments:` et apprendre exactement ce que gh-aw fait à chaque exécution, afin de pouvoir prédire quelle variante vient ensuite et lire l’[artifact](https://github.github.com/gh-aw/reference/artifacts/) `experiment` en toute confiance.

## Comprendre comment fonctionne le [round-robin](https://github.github.com/gh-aw/experimental/experiments/#statistical-balancing)

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/23-ab-roundrobin-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/23-ab-roundrobin-light.svg">
   <img alt="Cycle round-robin d’une expérience A/B : cinq étapes exécutées par gh-aw à chaque exécution de workflow" src="images/23-ab-roundrobin-light.svg">
</picture>

À chaque exécution, gh-aw :

1. charge l’état depuis `experiments/{workflow-id}`, créé lors de la première exécution ;
2. choisit la variante avec le nombre d’invocations le plus faible, les égalités étant tranchées par l’ordre de premier élément dans le tableau ;
3. enregistre les compteurs mis à jour ;
4. televerse l'[artifact](https://github.github.com/gh-aw/reference/artifacts/) `experiment` ;
5. injecte la variante sélectionnée dans vos conditionnels de template.

## Prédire l’ordre d’assignation

Comme les égalités sont tranchées par l’ordre de premier élément dans le tableau, vous pouvez prédire chaque assignation avant d’exécuter le workflow :

- Avec `output_style: [concise, detailed]` et des compteurs à zéro pour les deux, `concise` passe en premier, car il est premier dans le tableau, puis `detailed`.
- Une fois que les deux variantes ont chacune une exécution, les compteurs sont de nouveau à égalité, donc `concise` est encore choisi en premier la fois suivante.
- Si vous ajoutez une troisième variante, `output_style: [concise, detailed, executive]`, après qu’`concise` et `detailed` aient chacune une exécution, `executive` est choisi en premier car son compteur, zéro, est inférieur à celui des deux autres.

| Exécution n°                   | Compteurs avant exécution (`concise` / `detailed` / `executive`) | Variante assignée |
| ------------------------------ | ---------------------------------------------------------------- | ----------------- |
| 1                              | 0 / 0 / —                                                        | `concise`         |
| 2                              | 1 / 0 / —                                                        | `detailed`        |
| 3 (après ajout de `executive`) | 1 / 1 / 0                                                        | `executive`       |
| 4                              | 1 / 1 / 1                                                        | `concise`         |
| 5                              | 2 / 1 / 1                                                        | `detailed`        |

## Inspecter les compteurs de l’artifact

1. Ouvrez une exécution, faites défiler jusqu’à **[Artifacts](https://github.github.com/gh-aw/reference/artifacts/)** et téléchargez `experiment`.
2. Ouvrez le fichier JSON et confirmez que les compteurs correspondent à votre tableau prédit.
3. Répétez sur plusieurs exécutions pour gagner en confiance dans l’ordre d’assignation avant de vous y fier pour une expérience réelle.

## :white_check_mark: Checkpoint

- [ ] Je peux décrire les cinq étapes exécutées par gh-aw à chaque exécution pour un bloc `experiments:`
- [ ] Je sais que les égalités sont tranchées par l’ordre de premier élément dans le tableau
- [ ] Je peux prédire l’assignation suivante à partir des compteurs courants dans l’artifact `experiment`
- [ ] Je peux vérifier une prédiction en téléchargeant puis en lisant l’artifact `experiment`

---

**Retour à l’aventure principale :** [Étape 23 — testez vos idées de prompt avec des expériences A/B](23-ab-experiments.md)

<!-- /journey -->
