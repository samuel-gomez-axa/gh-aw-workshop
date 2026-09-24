<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : transmettre des données entre étapes avec $GITHUB_OUTPUT

> _Facultatif : suivez cette analyse approfondie si vous voulez comprendre comment les données circulent entre les étapes, puis revenez à [l’étape 16](16-connect-data-source.md)._

[GitHub Actions](https://github.github.com/gh-aw/introduction/overview/) exécute chaque étape dans son propre processus shell. Cela signifie qu’un simple `export MY_VAR=value` dans une étape est **invisible** pour l’étape suivante : l’environnement est supprimé lorsque l’étape se termine. `$GITHUB_OUTPUT` est le mécanisme officiel pour conserver des données entre les [étapes](https://github.github.com/gh-aw/reference/steps-jobs/#custom-steps-steps).

---

## Pourquoi `export` ne fonctionne pas d’une étape à l’autre

```bash
# ❌ This looks reasonable but DOES NOT WORK
- name: Set a value
  run: export RESULT="hello"

- name: Use the value
  run: echo "$RESULT"   # prints nothing — RESULT is gone
```

Chaque étape est un processus enfant distinct. Les [variables d’environnement](https://github.github.com/gh-aw/reference/environment-variables/) définies avec `export` ne survivent que pendant la durée de cette étape.

---

## Valeurs sur une seule ligne

Ajoutez une paire `key=value` au chemin de fichier stocké dans la variable d’environnement `$GITHUB_OUTPUT` :
Ajoutez une paire `key=value` au chemin de fichier stocké dans la variable d’environnement [`$GITHUB_OUTPUT`](https://github.github.com/gh-aw/reference/environment-variables/#system-injected-runtime-variables) :

```bash
# ✅ Write a single-line value
echo "status=healthy" >> $GITHUB_OUTPUT
```

Pour la relire dans une étape ultérieure, référencez `${{ steps.<id>.outputs.status }}` ; mais vous devez d’abord donner un `id` à l’étape qui écrit la valeur.

---

## Donner un `id` aux étapes

Un `id` d’étape permet de référencer ses sorties ailleurs dans le workflow. Ajoutez `id:` au même niveau que `name:` et `run:` :

```markdown
- name: Check health
  id: health_check
  run: |
  echo "status=healthy" >> $GITHUB_OUTPUT
```

N’importe quelle étape ultérieure, ou même le prompt de l’IA, peut maintenant référencer cette valeur :

```text
${{ steps.health_check.outputs.status }}
```

---

## Valeurs multilignes avec la syntaxe heredoc `<<EOF`

Un simple `echo "key=value"` ne fonctionne pas pour du contenu multiligne, car les retours à la ligne cassent le format `key=value`. Utilisez plutôt un délimiteur heredoc :

```bash
# ✅ Write a multi-line value
echo "commit_log<<EOF" >> $GITHUB_OUTPUT
echo "$COMMIT_LOG" >> $GITHUB_OUTPUT
echo "EOF" >> $GITHUB_OUTPUT
```

Ces trois lignes indiquent ensemble à GitHub Actions :

1. `commit_log<<EOF` : démarrer une valeur multiligne nommée `commit_log`, avec `EOF` comme marqueur de fin.
2. `$COMMIT_LOG` : le contenu réel, qui peut s’étendre sur plusieurs lignes.
3. `EOF` : fermer le bloc.

Vous pouvez utiliser n’importe quelle chaîne unique comme délimiteur ; `EOF` n’est qu’une convention.

---

## Injecter des outputs dans un prompt d’IA

Une fois vos données dans `$GITHUB_OUTPUT`, vous les référencez directement dans le corps Markdown du workflow, qui **est** le prompt de l’IA dans gh-aw. Il n’y a pas d’étape séparée pour invoquer l’IA ; le texte du corps est envoyé au modèle une fois que toutes les sorties des étapes ont été résolues.

**[Frontmatter](https://github.github.com/gh-aw/reference/frontmatter/)** (étape de préparation des données) :

```markdown
---
steps:
    - name: Fetch recent commits
      id: recent
      run: |
          echo "commit_log<<EOF" >> $GITHUB_OUTPUT
          git log --oneline -10 >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT
---
```

**Corps du workflow (le prompt)** :

```markdown
Here are the recent commits:
${{ steps.recent.outputs.commit_log }}

Write a one-paragraph summary of this activity.
```

L’expression `${{ ... }}` est résolue par GitHub Actions **avant** que le corps soit envoyé au modèle, donc l’IA reçoit le texte entièrement développé.

---

## :white_check_mark: Checkpoint

- [ ] Vous pouvez expliquer pourquoi `export` ne transmet pas de valeurs entre les étapes
- [ ] Vous pouvez ecrire une valeur sur une seule ligne dans `$GITHUB_OUTPUT`
- [ ] Vous savez comment donner un `id` à une étape et référencer ses sorties
- [ ] Vous pouvez utiliser la syntaxe heredoc `<<EOF` pour des valeurs multilignes
- [ ] Vous pouvez référencer les sorties d’étapes dans un prompt d’IA

---

<!-- journey: all -->

Retour à [Connecter une source de données en direct à votre workflow](16-connect-data-source.md).

<!-- /journey -->
