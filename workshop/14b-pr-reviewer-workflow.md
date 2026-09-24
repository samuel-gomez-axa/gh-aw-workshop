<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Creez un relecteur de PR avec un agent et une skill

_Transformez la revue de pull request en une petite équipe : un orchestrateur, un relecteur ciblé et des consignes de revue réutilisables._

## 🎯 Ce que vous allez faire

Vous allez utiliser votre agent IA et la skill `/agentic-workflows` pour créer un relecteur de PR piloté par événement. Le workflow définira :

- un agent inline `pr-reviewer` qui inspecte une pull request
- une skill inline `pr-review-standards` qui maintient des constats fondés sur des preuves
- un brief parent qui transforme les constats du relecteur en une unique revue de pull request sûre

À la fin, vous aurez un relecteur qui s'exécute lorsqu'un brouillon devient prêt, qui peut être relancé avec `/review` et qui sépare sa méthode de revue de son orchestration.

## 📋 Avant de commencer

- Vous disposez d'un workflow fonctionnel issu de [Refine, Test, and Improve Your Workflow](09-agentic-editing.md).
- Vous avez poussé les fichiers créés par `gh aw init`, y compris `.github/skills/agentic-workflows/`.
- La commande `gh aw` fonctionne dans votre terminal local.

## Comprendre la séparation entre agent et skill

Le workflow parent doit coordonner l'exécution, pas contenir toutes les règles de revue. Il délègue l'analyse du diff à un [inline agent](https://github.github.com/gh-aw/reference/inline-sub-agents/) ciblé. Cet agent applique une skill inline qui contient la méthode de revue.

| Element                     | Responsabilité                                                            |
| --------------------------- | ------------------------------------------------------------------------- |
| Brief parent                | Identifier la pull request, appeler le relecteur et soumettre le résultat |
| Agent `pr-reviewer`         | Lire le diff et renvoyer des constats priorisés et étayés                 |
| Skill `pr-review-standards` | Définir ce qui constitue un constat utile et comment le formater          |

Le schéma ci-dessous montre comment ces trois couches se connectent à l'exécution, avec la safe output qui effectue la seule écriture dans le dépôt.

<picture>
  <source srcset="images/14b-pr-reviewer-layers-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="images/14b-pr-reviewer-layers-light.svg" alt="Architecture en trois couches du relecteur de PR : le brief parent orchestre, l'agent pr-reviewer examine le diff, la skill pr-review-standards définit la qualité, et une Safe Output soumet la revue" width="1200" height="560">
</picture>

L'agent peut changer sa façon d'étudier une pull request sans modifier les standards stables de la skill. Vous pouvez aussi améliorer la skill sans rallonger le brief parent. Cette même séparation permet également d'étendre facilement le relecteur pour appliquer des labels selon les fichiers modifiés (voir [Pattern: Auto-Label PRs by Content](side-quest-13-01-pr-labeler-pattern.md)) ou publier un résumé structuré qui sert aussi de brouillon de note de version (voir [Pattern: Generate a PR Summary Comment](side-quest-13-02-pr-summary-pattern.md)).

> 🤔 **Predict:** Quelle instruction a sa place dans la skill : “review pull request 42” ou “cite a changed file and line for every finding” ? La première relève de l'orchestration propre à l'exécution ; la seconde est une consigne de revue réutilisable.

## Demandez à votre agent de créer le workflow

Ouvrez votre agent IA dans le dépôt d'exercice et donnez-lui ce prompt :

```prompt
/agentic-workflows Create a PR reviewer workflow at .github/workflows/pr-reviewer.md with an inline pr-reviewer agent and pr-review-standards skill, triggering on pull_request ready_for_review and the /review slash command.
```

Examinez le diff de l'agent avant de l'accepter. La source doit contenir un brief parent ainsi que les deux blocs inline vers le bas du fichier.

> [!TIP]
> Pour les workflows au-delà de cet atelier, le [gh-aw wizard](https://githubnext.github.io/gh-aw-wizard/) peut vous générer un prompt similaire à partir d'un court questionnaire.

## Inspectez la structure générée

Le frontmatter du workflow doit suivre cette forme :

```markdown .github/workflows/pr-reviewer.md
---
on:
    pull_request:
        types: [ready_for_review]
    slash_command:
        strategy: centralized
        name: review
        events: [pull_request_comment, pull_request_review_comment]
permissions:
    contents: read
    pull-requests: read
    copilot-requests: write
tools:
    github:
        mode: gh-proxy
        toolsets: [pull_requests, repos]
safe-outputs:
    submit-pull-request-review:
        max: 1
        allowed-events: [COMMENT, REQUEST_CHANGES]
---
```

Remarquez que le job de l'agent n'a aucune permission d'écriture sur le dépôt ou la pull request. `copilot-requests: write` sert seulement à authentifier Copilot. La [safe output](https://github.github.com/gh-aw/reference/safe-outputs/) `submit-pull-request-review` effectue l'écriture contrôlée dans le dépôt une fois l'agent terminé. `APPROVE` est volontairement absent, car le token GitHub Actions par défaut ne peut pas approuver les pull requests.

Vers le bas du fichier, cherchez les deux blocs réutilisables :

```markdown .github/workflows/pr-reviewer.md
## agent: `pr-reviewer`

---

description: Reviews one pull request for actionable problems
model: small

---

Inspect the pull request diff. Discover the relevant skill under the available
skills directories and apply its review guidance. Return prioritized findings
with evidence for the parent agent.

## skill: `pr-review-standards`

---

## description: Produces evidence-based pull request review findings

Report only actionable problems introduced by the changed lines. For every
finding, cite the changed file and line, explain the impact, and suggest a
specific next step. Omit style-only and speculative feedback.
```

La formulation exacte peut varier. Vérifiez que les responsabilités restent bien séparées : le parent coordonne, l'agent enquête et la skill définit la qualité de la revue. Si votre équipe travaille à partir d'une checklist partagée plutôt que de critères ouverts, [Pattern: PR Review Checklist](side-quest-13-03-pr-checklist-pattern.md) montre comment restructurer la skill autour de ce format.

## Compiler et pousser

Dans votre terminal local, lancez :

```bash
gh aw compile
git add .
git commit -m "feat: add agent and skill PR reviewer"
git push
```

En option pendant que votre agent édite : lancez `gh aw compile --watch` dans un terminal séparé pour obtenir un retour immédiat du compilateur.

## Tester le déclencheur Ready for review

1. Créez une branche avec une petite modification de code contenant un bug évident, sans enjeu de sécurité.
2. Ouvrez une pull request **draft** vers votre branche par défaut.
3. Sélectionnez **Ready for review**.
4. Ouvrez l'onglet **Actions** et inspectez l'exécution **PR Reviewer**.
5. Revenez à la pull request et inspectez la revue soumise.

Dans le journal d'exécution, vérifiez que le parent appelle `pr-reviewer` et que le relecteur charge la skill de revue avant de renvoyer ses constats.

Pour tester le parcours manuel, ajoutez un commentaire `/review` à la pull request. Après avoir poussé un autre commit, réutilisez `/review` au lieu de remettre la pull request en brouillon.

> [!NOTE]
> Si aucune exécution ne démarre, vérifiez que le workflow se trouve sur votre branche par défaut et que vous avez bien fait passer la pull request de draft à ready. Ouvrir directement une pull request en état ready n'émet pas l'événement `ready_for_review`.

Si l'exécution se termine mais que la revue ne mentionne pas la skill `pr-review-standards` ou ne cite pas les fichiers et lignes modifiés, le relecteur n'a probablement pas trouvé le répertoire de skills. Utilisez cette checklist pour corriger cela :

1. Vérifiez que `.github/skills/agentic-workflows/` existe et a bien été poussé. Lancez `ls .github/skills/` dans votre terminal. Si le répertoire manque, lancez `gh aw init`, committez les fichiers générés puis poussez-les.
2. Si le répertoire existe mais que la skill n'a toujours pas été appliquée, demandez à l'agent de renforcer l'instruction :

```prompt
/agentic-workflows Update .github/workflows/pr-reviewer.md so the pr-reviewer agent explicitly searches for and applies the pr-review-standards skill before returning findings.
```

1. Compilez, committez et relancez `/review` pour confirmer que la skill est maintenant appliquée.

## Améliorez une couche

Choisissez une modification et faites-la passer par `/agentic-workflows` :

- Mettez à jour la **skill** si le standard de revue doit changer pour toutes les revues.
- Mettez à jour l'**agent** si sa méthode d'investigation ou les preuves qu'il renvoie doivent évoluer.
- Mettez à jour le **brief parent** si la soumission de revue ou l'orchestration doit changer.

Par exemple :

```prompt
/agentic-workflows Update the pr-review-standards skill in .github/workflows/pr-reviewer.md to distinguish blocking findings from non-blocking observations.
```

Relancez `/review` puis comparez le nouveau résultat avec la première revue. Une fois quelques variantes essayées, utilisez la side quest [Observe and Reduce Token Costs](side-quest-13-04-token-optimization.md) pour mesurer l'impact AIC de chaque changement et identifier les optimisations les plus utiles.

## ✅ Checkpoint

- [ ] Vous avez créé `.github/workflows/pr-reviewer.md` avec votre agent IA et `/agentic-workflows`
- [ ] Le workflow contient un agent inline `pr-reviewer` et une skill inline `pr-review-standards`
- [ ] Le brief parent appelle le relecteur, et le relecteur applique la skill
- [ ] Le job de l'agent dispose de [permissions](https://github.github.com/gh-aw/reference/permissions/) en lecture seule sur le dépôt et les pull requests
- [ ] La safe output autorise une revue `COMMENT` ou `REQUEST_CHANGES`, mais pas `APPROVE`
- [ ] `gh aw compile` s'est terminé et les deux fichiers du workflow sont committés et poussés
- [ ] Le passage d'une draft en ready ou le commentaire `/review` a déclenché le workflow
- [ ] La revue soumise cite des preuves issues des lignes modifiées
- [ ] Vous avez modifié une couche et comparé la nouvelle exécution à la première revue

<!-- journey: all -->

**Suite :** [Rendez votre workflow plus malin avec une logique conditionnelle](15-conditional-logic.md)

<!-- /journey -->
