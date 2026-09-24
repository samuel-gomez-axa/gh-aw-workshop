<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : opérations de données [Deterministic](https://github.github.com/gh-aw/patterns/deterministic-ops/) vs [Agentic](https://github.github.com/gh-aw/introduction/overview/#what-are-agentic-workflows)

> _Facultatif : utilisez ce guide si vous ne savez pas quelles parties d’un workflow de données doivent rester déterministes et quelles parties doivent être agentiques, puis revenez à [l’étape 16](16-connect-data-source.md)._

Les workflows de données fonctionnent mieux lorsque vous séparez délibérément les tâches. Gardez les opérations répétables déterministes. Utilisez l’agent lorsque vous avez besoin de jugement.

## :clipboard: Avant de commencer

- Terminez [Connecter une source de données en direct](16-connect-data-source.md) (obligatoire)
- Soyez familier avec les commandes de la CLI `gh`

---

## La règle de décision

Utilisez ce test rapide :

- Si vous pouvez définir à l’avance une logique exacte de réussite ou d’échec, gardez-la déterministe.
- Si vous devez décider laquelle de 40 issues ouvertes est la plus urgente, rendez-la agentique.
- Si vous devez expliquer des changements de tendance à la direction, rendez-la agentique.

Vous n’avez pas besoin d’un seul mode pour tout le workflow. La plupart des workflows de production sont hybrides.

---

## Exemples d’opérations de données

| Tâche                                                              | Meilleur choix | Pourquoi                                               |
| ------------------------------------------------------------------ | -------------- | ------------------------------------------------------ |
| Récupérer les commits des 24 dernières heures                      | Deterministic  | Même commande, même structure, à chaque exécution      |
| Compter les incidents P1 ouverts à partir des labels d’issues      | Deterministic  | Logique de filtrage et de comptage exacte              |
| Décider quels incidents semblent les plus urgents pour des humains | Agentic        | Requiert un jugement contextuel                        |
| Résumer des changements de tendance pour la direction              | Agentic        | Requiert interprétation et rédaction adaptée au public |
| Valider un schéma JSON avant usage en aval                         | Deterministic  | Règles de validation fixes                             |
| Expliquer les causes probables d’un pic de changement              | Agentic        | Raisonnement par hypothèse et narration                |

---

## Plan hybride

Suivez cette structure pour des flux de statut de dépôt, de triage d’incidents et de reporting :

1. **Extraction déterministe** : exécutez des commandes fixes (`gh`, `git`, appels d’API) pour collecter les données.
2. **Mise en forme déterministe** : normalisez et étiquetez les sorties ([`$GITHUB_OUTPUT`](https://github.github.com/gh-aw/reference/environment-variables/#system-injected-runtime-variables), champs JSON, comptages).
3. **Interprétation agentique** : demandez à l’agent d’identifier les risques, les priorités et les motifs notables.
4. **Communication agentique** : demandez une sortie adaptée au rôle visé (digest engineering, résumé pour la direction, transmission d’astreinte).

Cela rend votre pipeline fiable. Cela vous donne aussi un raisonnement souple là où les scripts deviennent fragiles.

## :hammer_and_wrench: Essayez : étiquetez chaque étape D ou A

Lisez l’extrait de workflow. Dans le bloc de commentaires, étiquetez chaque étape avec **D** pour deterministic ou **A** pour agentic.

```markdown
# Step A: Fetch open issues from the last 24 hours.

gh issue list --state open --search "updated:>=2026-07-13" --json number,title,labels,updatedAt

# Step B: Shape the output into a sorted table with issue number, label count, and last update time.

# Step C: Decide which three issues need maintainer attention today and explain why.

# Your labels:

# Step A: \_

# Step B: \_

# Step C: \_
```

<details>
<summary>Afficher la correction</summary>

- Step A : **D** — commande fixe et champs fixes.
- Step B : **D** — transformation et règles de tri fixes.
- Step C : **A** — nécessite priorisation et explication.

</details>

---

## Anti-patterns courants

- Injecter des logs bruts et bruyants directement dans le prompt sans les mettre en forme d’abord
- Demander à l’agent de calculer des métriques exactes que des commandes shell peuvent calculer de façon fiable
- Écrire en dur des dizaines de règles de branchement pour des tâches narratives qui changent chaque semaine
- Utiliser l’agent pour des vérifications de sécurité qui exigent des garanties déterministes strictes

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez expliquer en une phrase la différence entre travail déterministe et travail agentique
- [ ] Vous pouvez identifier une étape de votre workflow qui doit rester déterministe
- [ ] Vous pouvez identifier une étape de votre workflow qui doit devenir agentique
- [ ] Vous pouvez décrire une conception hybride pour votre workflow de données actuel
- [ ] Vous savez quand une validation deterministe doit rester en dehors de l'agent

---

<!-- journey: all -->

Retour à [Connecter une source de données en direct à votre workflow](16-connect-data-source.md).

<!-- /journey -->
