<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : référence de syntaxe des sub-agents

> _Facultatif : utilisez ce court exercice de correction si vous voulez disposer d’un modèle de sub-agent propre avant de revenir à [l’étape 21](21-inline-sub-agents.md)._

## 🎯 Ce que vous allez faire

Réparez un bloc [sub-agent](https://github.github.com/gh-aw/reference/inline-sub-agents/) cassé, puis réutilisez le même modèle dans votre propre workflow. À la fin, vous aurez un bloc valide, qui compile proprement et sera facile à étendre plus tard.

## 📋 Avant de commencer

- Vous commencez, ou avez déjà commencé, [Découper les workflows complexes avec des sub-agents inline](21-inline-sub-agents.md).
- Vous savez compiler un workflow grâce à [Quête annexe : utiliser `gh aw compile` pour détecter tôt les erreurs](side-quest-07-01-compile-workflow.md).

---

## Commencez par un bloc cassé

Copiez cet extrait dans un fichier brouillon, ou lisez-le attentivement avant de le corriger :

```markdown
Write a daily issue digest.

## agent: `Issue Summarizer`

## <!-- BROKEN: contains spaces and uppercase letters -->

description: Summarizes one issue in one sentence
model: small
engine: openai

---

Read one issue and return exactly one sentence.

## How to use this workflow

<!-- BROKEN: this heading appears after the sub-agent and ends the block -->

Run it from GitHub Actions.
```

Ce bloc a trois problèmes :

- le nom de l’agent est invalide
- le champ `engine` du [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/) n’a pas sa place dans un sub-agent
- le bloc est au mauvais endroit

Votre travail consiste à corriger ces trois problèmes dans cet ordre.

---

## Corrigez d’abord le titre

Utilisez ce modèle pour le titre :

```markdown
## agent: `name`
```

Un nom valide :

- commence par une lettre
- reste en minuscules
- n’utilise que des lettres, des chiffres, des tirets ou des underscores

**Action :** Remplacez `` `Issue Summarizer` `` par un nom valide avant de continuer.

Vérification rapide :

- [ ] Mon nom commence par une lettre
- [ ] Mon nom est en minuscules
- [ ] Mon nom ne contient pas d’espaces

---

## Gardez uniquement les champs du sub-agent

Dans un bloc de sub-agent, gardez un frontmatter minimal :

- `description` explique le rôle du sub-agent
- `model` est optionnel si vous voulez surcharger le modèle parent

Tout champ autre que `description` et `model` est retiré du frontmatter du sub-agent à l’exécution avec un avertissement.
Pour une tâche répétée de worker, comme "read one issue and return one sentence," `model: small` constitue un bon choix par défaut.

**Action :** Supprimez le champ non pris en charge du bloc cassé.

> [!TIP]
> Si le worker a besoin du même niveau de raisonnement que le parent, vous pouvez omettre `model` et le laisser hériter du modèle parent.

Vérification rapide :

- [ ] J’ai conservé `description`
- [ ] J’ai conservé ou retiré volontairement `model`
- [ ] J’ai retiré les champs non pris en charge comme `engine`

---

## Déplacez le bloc à la fin

Les blocs de sub-agent doivent se trouver en bas du fichier afin que le contenu principal du workflow ne soit pas tronqué trop tôt. Le bloc de sub-agent se termine lorsque l’analyseur atteint le titre `##` suivant ; tout contenu après ce titre ne fait donc pas partie du sub-agent.

**Action :** Déplacez le bloc de sub-agent de sorte que `## How to use this workflow` reste dans le workflow principal, et non dans le sub-agent.

Vérification rapide :

- [ ] Toutes les sections principales du workflow viennent en premier
- [ ] Le bloc de sub-agent est la dernière section `##` du fichier

---

## Comparez avec une version propre

Après vos modifications, votre extrait devrait ressembler à ceci :

```markdown
Write a daily issue digest.

## How to use this workflow

Run it from GitHub Actions.

## agent: `issue-summarizer`

---

description: Summarizes one issue in one sentence
model: small

---

Read one issue and return exactly one sentence.
```

Si votre version suit le même modèle, vous êtes prêt à la réutiliser dans votre propre workflow.

---

## Essayez ce modèle dans votre workflow

Ouvrez votre workflow de l’étape 21 et effectuez une vraie modification :

1. Ajoutez ou corrigez un titre de sub-agent en bas du fichier.
2. Ne gardez que `description` et, si nécessaire, `model` dans le frontmatter du sub-agent.
3. Depuis le dossier racine de votre dépôt d’exercice, exécutez :

```bash
gh aw compile
```

> [!TIP]
> Pour un retour plus rapide pendant l’édition, exécutez `gh aw compile --watch` dans un second terminal ; la [CLI reference](https://github.github.com/gh-aw/setup/cli/#compile) documente cette option.

Quand la compilation est terminée, vérifiez que vous ne voyez **pas** d’avertissements concernant des champs de sub-agent retirés, comme `engine` ou `tools`.

---

## ✅ Checkpoint

- [ ] J’ai corrigé un nom de sub-agent invalide
- [ ] Je n’ai conservé que les champs de frontmatter de sub-agent pris en charge
- [ ] J’ai placé le bloc de sub-agent en bas du fichier
- [ ] `gh aw compile` s'est termine apres que j'ai applique le meme modele a mon propre workflow
- [ ] Je n’ai vu aucun avertissement concernant des champs de sub-agent retirés pendant cette exécution

---

<!-- journey: all -->

Retour à [Découper les workflows complexes avec des sub-agents inline](21-inline-sub-agents.md).

<!-- /journey -->
