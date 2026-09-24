<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Connectez une source de donnees en direct a votre workflow

> _Les workflows deviennent vraiment puissants lorsqu'ils agissent sur des donnees reelles et a jour, pas seulement sur des prompts predefinis._

## 🎯 Ce que vous allez faire

Vous allez etendre votre workflow daily-status pour recuperer les issues ouvertes de votre depot avec le [GitHub CLI](side-quest-01-02-environment-reference.md#github-cli-gh), puis injecter ces donnees dans votre prompt IA. A la fin, votre resume inclura un apercu des issues en attente en plus de l'activite de commit.

## 📋 Avant de commencer

- Vous avez installe l'extension `gh-aw` dans [Install the `gh-aw` CLI Extension](06-install-gh-aw.md).
- Vous disposez d'un workflow daily-status fonctionnel issu de [Build: Daily Repo Status Workflow](07-your-first-workflow.md).
- Vous etes a l'aise pour executer et faire evoluer des workflows a partir de [Refine, Test, and Improve Your Workflow](09-agentic-editing.md).

## Etapes

### Comprendre le schema de circulation des donnees

[gh-aw workflows](https://github.github.com/gh-aw/introduction/overview/) s'executent dans GitHub Actions, donc votre workflow peut recuperer des donnees de depot en direct avant que l'IA n'ecrive quoi que ce soit. Dans cette etape, vous allez utiliser des etapes shell pour collecter les donnees, puis une section de prompt plus bas pour transformer ces donnees en resume.

Pensez-y comme a un passage de relais. D'abord, le workflow recueille les faits de facon previsible. Ensuite, le prompt lit ces resultats enregistres et demande a l'IA d'expliquer ce qui compte.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/16-step-agent-flow-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/16-step-agent-flow-light.svg">
  <img alt="Schema montrant comment des etapes shell deterministic recuperent des donnees en direct, transmettent leurs sorties au prompt IA via $GITHUB_OUTPUT, puis l'agent produit un rapport de synthese" src="images/16-step-agent-flow-light.svg">
</picture>

> [!TIP]
> Si les sorties d'etape, la syntaxe here-document ou la distinction entre logique scriptée et logique agentique vous sont nouvelles, parcourez [Side Quest: Passing Data Between Steps with $GITHUB_OUTPUT](side-quest-16-01-github-output.md) et [Side Quest: Deterministic vs Agentic Data Ops](side-quest-16-04-deterministic-vs-agentic-data-ops.md).

### Recuperer l'historique des commits

Dans votre session Copilot CLI dans le terminal, collez :

```prompt
/agentic-workflows update .github/workflows/daily-status.md to add two shell steps
that fetch (1) the recent commit log from the last 24 hours with step id `recent`
and (2) all open issues with step id `issues`, and update the AI prompt to inject
those step outputs into the summary.
```

La skill ajoute ces deux etapes et met a jour le brief de la tache. Examinez le diff avant de commit.

<details open>
<summary>✏️ Manual edit path</summary>

Ouvrez `.github/workflows/daily-status.md` et ajoutez deux etapes au bloc `steps:` du [frontmatter](https://github.github.com/gh-aw/reference/frontmatter/).

D'abord, recuperez le journal des commits recents, puis les issues ouvertes, en vous appuyant sur les blocs de reference YAML ci-dessous. Apres avoir ajoute les deux etapes, lancez `gh aw compile` puis poussez.

</details>

Voici a quoi ressemble la premiere etape ; la skill l'ajoutera pour vous :

Commencez par recuperer le journal des commits recents :

```markdown .github/workflows/daily-status.md
- name: Fetch recent commits
  id: recent # step ID — referenced as steps.recent.outputs.…
  run: |
    # Lists commits from the last 24 hours (max 10), format: "<hash> <subject>"
    COMMIT_LOG=$(git log --oneline --since="24 hours ago" --format="%h %s" | head -10)
    # <<EOF writes a multi-line value to $GITHUB_OUTPUT
    echo "commit_log<<EOF" >> $GITHUB_OUTPUT
    echo "$COMMIT_LOG" >> $GITHUB_OUTPUT
    echo "EOF" >> $GITHUB_OUTPUT
```

🤔 Faites une pause et predisez : que contiendra la sortie `commit_log` si aucun commit n'a ete effectue dans les 24 dernieres heures ? Faites votre prediction maintenant puis verifiez-la apres avoir lance une execution.

### Recuperer les issues ouvertes

Ensuite, ajoutez une etape pour recuperer les issues ouvertes :

```markdown .github/workflows/daily-status.md
- name: Fetch open issues
  id: issues # step ID — referenced as steps.issues.outputs.…
  run: |
    # Fetch the 10 most recent open issues, formatted as "#42 Fix the bug"
    ISSUE_LIST=$(gh issue list --state open --limit 10 \
     --json number,title \
     --jq '.[] | "#\(.number) \(.title)"')
    # Count all open issues
    ISSUE_COUNT=$(gh issue list --state open --json number --jq 'length')
    echo "open_issues<<EOF" >> $GITHUB_OUTPUT
    echo "$ISSUE_LIST" >> $GITHUB_OUTPUT
    echo "EOF" >> $GITHUB_OUTPUT
    echo "open_issues_count=$ISSUE_COUNT" >> $GITHUB_OUTPUT
    env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }} # provided automatically — no setup needed
```

✏️ Essayez : lancez `gh issue list --state open --json number --jq 'length'` dans votre terminal et notez le total. Apres avoir declenche une execution du workflow, verifiez si le workflow signale le meme nombre.

🤔 Faites une pause et predisez : que recevra l'IA si la liste d'issues est vide ? Le prompt produira-t-il quand meme une sortie utile ?

### Injecter les donnees dans votre prompt IA

Le prompt IA se trouve dans le corps Markdown apres le frontmatter. Mettez cette section a jour pour qu'elle utilise les sorties d'etape :

```markdown .github/workflows/daily-status.md
---
# … your existing frontmatter with the two new steps …
---

Summarise recent activity in this repository.

Recent commits (last 24 hours):
${{ steps.recent.outputs.commit_log }}

Open issues (${{ steps.issues.outputs.open_issues_count }} total):
${{ steps.issues.outputs.open_issues }}

Write a concise, friendly update — two short paragraphs.
Highlight anything that looks urgent in the issue list.
```

GitHub resolut les expressions de sortie d'etape avant que l'IA ne voie le prompt ; le modele recoit donc du texte brut au lieu de la syntaxe du workflow.

🤔 Faites une pause et predisez : si la sortie `commit_log` est vide, le prompt reste-t-il comprehensible pour l'IA ? Quelle modification d'une ligne rendrait l'instruction plus robuste ?

✏️ Essayez : remplacez `"two short paragraphs"` par `"one bullet list per topic"` puis relancez. Observez comment le format de sortie change.

### [Compiler](https://github.github.com/gh-aw/reference/compilation-process/), pousser et tester

La skill `/agentic-workflows` recompile automatiquement le lock file. Si vous avez edite le workflow manuellement, lancez d'abord `gh aw compile`, puis poussez :

```bash
git add .
git commit -m "feat: inject open issues into daily summary prompt"
git push
```

Ouvrez l'onglet **Actions** et verifiez que les nouvelles etapes apparaissent et que le resume de l'IA mentionne a la fois les commits et les issues.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="images/16-data-source-run-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="images/16-data-source-run-light.svg">
  <img alt="Execution Actions montrant l'etape fetch-issues et le resume mis a jour" src="images/16-data-source-run-light.svg">
</picture>

> [!TIP]
> Si votre depot n'a aucune issue ouverte, l'IA l'indiquera ; c'est attendu. Creez une issue de test pour voir l'integration en action.

### Essayer d'autres sources de donnees

Une fois ce schema bien compris, la meme technique fonctionne aussi pour :

| Donnees                         | Commande                                 |
| ------------------------------- | ---------------------------------------- |
| Pull requests ouvertes          | `gh pr list --state open`                |
| Releases recentes               | `gh release list --limit 5`              |
| Executions de workflow en echec | `gh run list --status failure --limit 5` |
| Statistiques du depot           | `gh api repos/:owner/:repo`              |

## ✅ Checkpoint

- [ ] Votre workflow contient une etape recent-commits avec `id: recent`
- [ ] Votre workflow contient une etape open-issues avec `id: issues`
- [ ] Votre prompt IA utilise les deux sorties enregistrees
- [ ] Les deux fichiers `.github/workflows/daily-status.md` et `.github/workflows/daily-status.lock.yml` sont compiles, committes et pousses
- [ ] Une execution manuelle se termine et le resume mentionne a la fois les commits et les issues ouvertes
- [ ] Vous pouvez expliquer comment le workflow transmet les donnees recuperees au prompt
- [ ] Vous pouvez decrire ce qui se passe si la sortie recent commit est vide et comment votre prompt le gere

<!-- journey: all -->

**Suite :** [Donnez plus d'outils a votre agent avec MCP](17-add-mcp-tools.md)

<!-- /journey -->

> [!TIP]
>
> <details>
> <summary>Lecture securite : exfiltration de token et risques lies aux identifiants longue duree</summary>
>
> Maintenant que votre workflow lit des donnees de depot en direct, vous exposez une surface que des attaquants peuvent tenter d'exploiter :
>
> - **Token exfiltration** : apprenez comment un contenu d'issue ou de PR malveillant peut tenter de faire fuiter votre `GITHUB_TOKEN`, et comment gh-aw l'en empeche, dans [Side Quest: Token and Secret Exfiltration in Agentic Workflows](side-quest-16-03-token-exfiltration.md).
> - **Long-lived credential risks** : si votre workflow a un jour besoin d'un personal access token (PAT), lisez [Side Quest: Long-Lived Credential Risks in Agentic Workflows](side-quest-16-05-long-lived-credentials.md) pour comprendre pourquoi les PAT creent une surface d'attaque plus large et comment la minimisation de [`permissions:`](https://github.github.com/gh-aw/reference/permissions/) et `network.allowed` limitent l'impact.
>
> </details>
