<!-- page-journey: all -->
<!-- page-adventure: core -->
<!-- learning:false -->

# Visite de l’atelier GitHub Agentic Workflows

Un atelier pratique pour créer un workflow automatisé avec l’IA, puis apprendre à le faire évoluer dans GitHub Actions. Parcourez le programme pour voir le résultat visé, les activités et les apprentissages de chaque étape.

## Partie 1 — Créez votre premier workflow

### Contexte — [Design System AXA France Canopée](0-design-system.md)

- **À l’issue :** vous savez où un workflow peut intervenir dans le dépôt Canopée.
- **Vous faites :** explorez ses univers, ses packages, ses thèmes, ses composants et ses surfaces de contribution.
- **Vous apprenez :** à repérer l’architecture et les conventions utiles avant d’automatiser une tâche.

### Repère — [Des exercices à une stratégie de maintenance](0.5-strategie-maintenance.md)

- **À l’issue :** vous comprenez que les exemples de l’atelier sont des points de départ pour réfléchir à la maintenance globale du dépôt.
- **Vous faites :** examinez des pistes comme la CI, les cross-reviews spécialisées, la documentation, la sécurité, le backlog et les releases.
- **Vous apprenez :** à composer une stratégie adaptée au Design System sans imposer une architecture, en choisissant les contrôles et le niveau d’autonomie de chaque workflow.

### Étape 0 — [Bienvenue : ce que vous allez construire](00-welcome.md)

- **À l’issue :** vous savez quel workflow vous allez créer : un rapport quotidien sur l’activité récente d’un dépôt.
- **Vous faites :** découvrez le résultat attendu et le parcours de création, de compilation et d’amélioration.
- **Vous apprenez :** comment un agent lit un dépôt, choisit les informations utiles et publie un résumé.

### Étape 1 — [Ce qu’il vous faut avant de commencer](01-prerequisites.md)

- **À l’issue :** votre compte GitHub, l’accès à Copilot et les outils nécessaires sont prêts.
- **Vous faites :** vérifiez l’accès à GitHub Copilot et préparez-vous à travailler dans un terminal local.
- **Vous apprenez :** quels comptes, outils et accès sont requis pour suivre l’atelier.

### Étape 2 — [Configurer votre terminal local](02a-setup-codespace.md)

- **À l’issue :** votre dépôt d’exercice est cloné et les commandes `git` et `gh` fonctionnent dans votre terminal.
- **Vous faites :** créez le dépôt, clonez-le sur votre machine et vérifiez les outils CLI.
- **Vous apprenez :** à préparer un environnement local utilisable pour les étapes suivantes.

### Étape 4 — [Qu’est-ce que GitHub Actions ?](04-github-actions-intro.md)

- **À l’issue :** vous savez lire un workflow GitHub Actions classique.
- **Vous faites :** révisez triggers, jobs et steps, puis classez des exemples de workflows.
- **Vous apprenez :** les primitives déterministes d’Actions qui servent de base aux agentic workflows.

### Étape 5 — [Qu’est-ce qu’un Agentic Workflow ?](05-agentic-workflows-intro.md)

- **À l’issue :** vous savez reconnaître quand une tâche a besoin du jugement d’un agent.
- **Vous faites :** examinez la structure en deux fichiers, classez des exemples et rédigez un task brief.
- **Vous apprenez :** le rôle du trigger, de l’agent, du brief et du fichier compilé.

### Étape 5b — [Comment les Agentic Workflows restent sûrs](05b-agentic-workflows-security.md)

- **À l’issue :** vous pouvez expliquer les deux frontières de sécurité d’un agentic workflow.
- **Vous faites :** étudiez le rôle de la sandbox et des safe outputs, puis analysez deux scénarios.
- **Vous apprenez :** comment le firewall, les permissions limitées et les garde-fous d’écriture réduisent les risques.

### Étape 5c — [Exercice : reconnaître les Agentic Workflows](05c-agentic-workflows-practice.md)

- **À l’issue :** vous avez rédigé un brief d’une phrase pour une tâche routinière.
- **Vous faites :** choisissez entre un workflow standard et agentique pour plusieurs tâches, puis écrivez votre brief.
- **Vous apprenez :** à préciser les données à lire, le résultat à publier et la cadence d’exécution.

### Étape 6 — [Installer l’extension CLI gh-aw](06-install-gh-aw.md)

- **À l’issue :** l’extension `gh-aw` est installée et votre terminal est prêt pour créer un workflow.
- **Vous faites :** vérifiez l’authentification GitHub CLI, installez l’extension et lancez un diagnostic.
- **Vous apprenez :** à vérifier l’environnement et à initialiser les outils de l’atelier.

### Étape 7 — [Rédiger votre premier Agentic Workflow](07-your-first-workflow.md)

- **À l’issue :** votre dépôt contient un workflow quotidien planifié et son fichier compilé.
- **Vous faites :** demandez à Copilot de créer le workflow, ses permissions et ses safe outputs, puis compilez-le.
- **Vous apprenez :** comment le brief et le frontmatter définissent le comportement et comment le fichier source devient un workflow exécutable.

### Étape 7d — [Confirmer l’accès au modèle](07d-confirm-model-access.md)

- **À l’issue :** vous avez confirmé l’accès à Copilot et configuré une méthode de facturation pour le workflow.
- **Vous faites :** envoyez un prompt de test, choisissez le mode de facturation et appliquez la configuration correspondante.
- **Vous apprenez :** à distinguer l’accès au modèle de la facturation des exécutions.

### Étape 8 — [Lancer et observer votre workflow](08-run-your-workflow.md)

- **À l’issue :** votre workflow s’est exécuté avec succès dans GitHub Actions.
- **Vous faites :** déclenchez-le et observez son exécution dans l’onglet Actions.
- **Vous apprenez :** à lancer une exécution et à en vérifier l’état.

### Étape 8b — [Interpréter votre première exécution](08b-interpret-your-run.md)

- **À l’issue :** vous savez retrouver le rapport produit et vérifier les problèmes courants.
- **Vous faites :** lisez le journal d’exécution, inspectez la sortie et recherchez les motifs d’erreur.
- **Vous apprenez :** à utiliser les traces pour comprendre le comportement de l’agent et diagnostiquer un échec.

### Étape 9 — [Affiner, tester et améliorer votre workflow](09-agentic-editing.md)

- **À l’issue :** votre rapport est plus utile et vous disposez d’une boucle d’itération réutilisable.
- **Vous faites :** utilisez le skill `agentic-workflows` pour modifier, déboguer ou optimiser le workflow, puis comparez les exécutions.
- **Vous apprenez :** à améliorer un brief à partir de résultats observés.

### Étape 14 — [Et ensuite ? Continuez à explorer](14-next-steps.md)

- **À l’issue :** vous avez choisi un sujet ou une ressource pour poursuivre.
- **Vous faites :** faites le point sur le parcours et explorez les pistes proposées.
- **Vous apprenez :** à identifier les prochaines compétences à approfondir selon vos besoins.

### Étape 14b — [Créer un workflow de revue de pull request](14b-pr-reviewer-workflow.md)

- **À l’issue :** vous avez un relecteur de pull request déclenché par événement, avec des constats étayés.
- **Vous faites :** créez un workflow qui délègue l’inspection à un agent spécialisé et publie une revue via une safe output.
- **Vous apprenez :** à séparer orchestration, agent, skill de revue et écriture contrôlée.

## Partie 2 — Allez plus loin

### Étape 15 — [Rendre votre workflow plus intelligent avec la logique conditionnelle](15-conditional-logic.md)

- **À l’issue :** votre agent ne publie un résumé que si le dépôt a connu une activité récente.
- **Vous faites :** comptez les commits dans une étape déterministe et reliez le résultat à une condition `if:`.
- **Vous apprenez :** à transmettre des sorties entre étapes et à éviter une exécution agentique inutile.

### Étape 16 — [Connecter une source de données en direct](16-connect-data-source.md)

- **À l’issue :** votre résumé inclut les issues ouvertes en plus de l’activité de commits.
- **Vous faites :** récupérez des données avec GitHub CLI et injectez-les dans le prompt.
- **Vous apprenez :** à séparer la collecte déterministe des données et leur interprétation par l’agent.

### Étape 17 — [Donner plus d’outils à votre agent avec MCP](17-add-mcp-tools.md)

- **À l’issue :** votre agent peut appeler les outils d’un serveur MCP configuré.
- **Vous faites :** ajoutez un serveur MCP au workflow, référencez ses outils dans le brief et observez leur utilisation.
- **Vous apprenez :** comment MCP expose des outils et permet à l’agent d’interagir avec des sources de données.

### Étape 18 — [Partager et réutiliser vos Agentic Workflows](18-share-and-reuse.md)

- **À l’issue :** votre workflow est disponible comme modèle que vos collègues peuvent ajouter à leur dépôt.
- **Vous faites :** choisissez une destination de partage, préparez le template et documentez son ajout.
- **Vous apprenez :** comment distribuer et réutiliser un workflow entre dépôts.

### Étape 19 — [Créer un prochain nœud d’entraînement guidé par la recherche](19-research-driven-training-node.md)

- **À l’issue :** vous disposez d’une proposition de module de formation prête à être mise en œuvre.
- **Vous faites :** examinez la documentation gh-aw, repérez un besoin des apprenants et formulez un contenu pour y répondre.
- **Vous apprenez :** à utiliser des signaux de recherche pour décider quoi enseigner ensuite.

### Étape 20 — [Faire mémoriser des informations à votre workflow entre les exécutions](20-persistent-memory.md)

- **À l’issue :** votre workflow conserve les issues déjà signalées et évite les doublons.
- **Vous faites :** configurez `cache-memory` et demandez à l’agent de lire et mettre à jour cet état.
- **Vous apprenez :** comment une mémoire persistante ajoute un état entre les exécutions.

### Étape 21 — [Découper les workflows complexes avec des inline sub-agents](21-inline-sub-agents.md)

- **À l’issue :** une tâche répétitive est confiée à un sous-agent ciblé.
- **Vous faites :** ajoutez un sous-agent au workflow et distinguez son travail de celui de l’agent parent.
- **Vous apprenez :** à répartir les responsabilités sans alourdir le brief principal.

### Étape 22 — [Rendre vos workflows résistants aux échecs](22-error-handling-and-resilience.md)

- **À l’issue :** votre workflow dispose de consignes et de solutions de repli pour mieux gérer les erreurs.
- **Vous faites :** repérez des modes d’échec et ajoutez un brief défensif, des limites de durée et un fallback de safe output.
- **Vous apprenez :** à anticiper les erreurs d’outil, les délais dépassés et les sorties bloquées.

### Étape 23 — [Tester vos idées de prompt avec des expériences A/B](23-ab-experiments.md)

- **À l’issue :** vous avez comparé des variantes de prompt à partir de plusieurs exécutions.
- **Vous faites :** configurez une expérience, exécutez les variantes et inspectez les résultats.
- **Vous apprenez :** à comparer des changements de façon contrôlée plutôt que de vous fier à une seule sortie.

### Étape 24 — [Exécuter votre Agentic Workflow sur un self-hosted runner](24-self-hosted-runners.md)

- **À l’issue :** votre workflow cible un runner géré par votre organisation.
- **Vous faites :** configurez le label du runner dans le frontmatter et vérifiez le chemin d’exécution.
- **Vous apprenez :** comment diriger un workflow vers une infrastructure auto-hébergée.

### Étape 25 — [Auditer et observer vos Agentic Workflows](25-audit-and-observability.md)

- **À l’issue :** vous savez où chercher pour expliquer une exécution ou diagnostiquer un comportement inattendu.
- **Vous faites :** consultez les journaux, auditez une exécution et inspectez les artifacts et la rétention.
- **Vous apprenez :** à suivre l’activité, les coûts et les éléments utiles à l’audit.

### Étape 26 — [Gérer les coûts et les budgets d’AI Credits](26-manage-costs-and-budgets.md)

- **À l’issue :** vous avez estimé les dépenses de votre workflow et défini un moyen de les maîtriser.
- **Vous faites :** examinez l’usage, projetez les coûts et appliquez une technique de réduction ou un budget.
- **Vous apprenez :** à interpréter les AI Credits et à anticiper les coûts d’un workflow planifié.

### Étape 27 — [Vérifier la qualité de votre workflow avec des evals](27-evaluate-workflow-quality.md)

- **À l’issue :** votre workflow produit des résultats d’évaluation vérifiables et comparables entre exécutions.
- **Vous faites :** ajoutez des questions binaires, lancez le workflow et inspectez l’artifact `evals`.
- **Vous apprenez :** à définir des critères observables et à repérer des régressions de qualité.

### Étape 28 — [Orchestrer plusieurs Agentic Workflows](28-orchestrate-workflows.md)

- **À l’issue :** un workflow coordinateur route les tâches vers des workflows spécialistes.
- **Vous faites :** créez l’orchestrateur, définissez sa logique de routage et vérifiez les workflows déclenchés.
- **Vous apprenez :** à répartir le travail entre workflows et à déclencher un spécialiste avec une safe output.

### Étape 29 — [Apprendre à votre agent des connaissances métier avec des skills](29-skills-and-domain-knowledge.md)

- **À l’issue :** votre workflow applique une connaissance métier réutilisable décrite dans un skill.
- **Vous faites :** rédigez un `SKILL.md`, référencez-le et choisissez comment l’injecter dans le workflow.
- **Vous apprenez :** à structurer les consignes métier et à choisir entre découverte (`hint`) et intégration du contenu (`merge`).

## Quêtes annexes facultatives

- [Agentic Workflows pour les utilisateurs avancés de GitHub Actions](side-quest-05-01-actions-power-user.md) — aide-mémoire d’une page sur ce qui change et ce qui reste identique dans les agentic workflows ; dérive de [l’étape 5](05-agentic-workflows-intro.md).
- [Approfondissement des Agentic Workflows](side-quest-05-02-aw-deep-dive.md) — exercices de classification, exemple de sortie d’agent, structure à deux fichiers et vérifications de concepts ; dérive de [l’étape 5](05-agentic-workflows-intro.md).
- [Bases du terminal](side-quest-01-01-terminal-basics.md) — introduction facultative qui dérive de [l’étape 1](01-prerequisites.md).
- [Configurer votre terminal local](side-quest-02-01-local-terminal.md) — guide d’appoint si vous voulez plus de détails sur la préparation de votre machine avant de suivre le parcours principal.
- [Enterprise Setup Considerations](side-quest-enterprise-setup.md) — lecture obligatoire pour les utilisateurs GHES et utile pour tout environnement d’entreprise géré ; les points de retour les plus courants incluent [Step 1](01-prerequisites.md), [Step 2](02a-setup-codespace.md), la quête annexe [Local Terminal](side-quest-02-01-local-terminal.md) et [Step 5](05-agentic-workflows-intro.md).
- [Environment Reference](side-quest-01-02-environment-reference.md) — glossaire des environnements de l’atelier et des termes liés aux outils avec des liens vers la documentation officielle ; dérive de [Step 1](01-prerequisites.md).
- [Permission Errors](side-quest-01-03-permission-errors.md) — guide de dépannage pour les erreurs `permission denied` rencontrées pendant les étapes basées sur le terminal ; dérive de [Step 1](01-prerequisites.md).
- [Install `gh-aw` Troubleshooting](side-quest-06-01-install-troubleshooting.md) — référence facultative de dépannage d’installation qui dérive de [Step 6](06-install-gh-aw.md).
- [Use `gh-aw` with the GitHub Copilot Cloud Agent](side-quest-06-02-cca-codespace.md) — cas particulier si vous partez depuis Copilot Cloud Agent et devez basculer vers un terminal exploitable pour les commandes CLI `gh-aw` ; dérive de [Step 6](06-install-gh-aw.md).
- [Install `gh-aw` in a Local Terminal](side-quest-06-04-install-local.md) — alternative facultative pour les participants qui ont terminé la quête annexe de configuration du terminal local et veulent continuer sur leur propre machine.
- [Using `gh aw compile` to Catch Errors Early](side-quest-07-01-compile-workflow.md) — référence rapide pour `gh aw compile`, `--validate`, `--watch` et les erreurs de compilation courantes ; dérive de [Step 7](07-your-first-workflow.md) ou [Step 9](09-agentic-editing.md).
- [Fix Codespaces `actions:write` Errors When Running `gh aw run`](side-quest-08-01-codespaces-actions-write.md) — guide de dépannage pour un cas spécifique à Codespaces si vous utilisez encore cet environnement en dehors du parcours principal ; dérive de [Step 8](08-run-your-workflow.md).
- [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md) — guide de dépannage enrichi pour les cinq motifs de journaux les plus fréquents ; dérive de [Step 9](08b-interpret-your-run.md).
- [Pattern: Long `[plan]` Chains](side-quest-09-01a-pattern-long-plan-chain.md) — explique comment repérer une boucle de planification et réécrire votre workflow brief pour que l’agent commence par un premier appel d’outil explicite ; dérive de [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md).
- [Pattern: Empty `[result]` Data](side-quest-09-01b-pattern-empty-results.md) — explique comment diagnostiquer des réponses d’outil vides et déterminer si la cause racine est une portée de lecture manquante, un filtrage trop strict, ou des données de dépôt réellement vides ; dérive de [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md).
- [Pattern: Safe-output `limit reached`](side-quest-09-01c-pattern-safe-output-blocked.md) — explique comment interpréter des écritures bloquées et choisir entre augmenter les sorties autorisées ou contraindre le comportement de l’agent ; dérive de [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md).
- [Pattern: `permission denied`](side-quest-09-01d-pattern-permission-denied.md) — explique comment rattacher les échecs de permission au bon mécanisme de contrôle : accès en lecture dans `permissions:` et liste d’autorisation d’écriture dans `safe-outputs:` ; dérive de [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md).
- [Pattern: "Done" but Nothing Written](side-quest-09-01e-pattern-done-no-write.md) — explique comment diagnostiquer les exécutions réussies qui ne produisent aucune écriture et renforcer les instructions pour que les écritures attendues se produisent de façon fiable ; dérive de [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md).
- [Debugging Checklist](side-quest-09-01f-debugging-checklist.md) — flux de triage reproductible en sept étapes à appliquer lorsqu’une exécution produit un résultat inattendu ; dérive de [Diagnosing Common Agent Output Patterns](side-quest-09-01-debug-output.md).
- [Writing a Clear Agent Brief](side-quest-10-01-agent-brief.md) — cadre en cinq étapes pour concevoir n’importe quel agentic workflow brief ; dérive de [Step 10](09-agentic-editing.md).
- [Jailbreaking the Agent Brief](side-quest-10-02-jailbreak-brief.md) — explique comment des instructions adverses intégrées au contenu du dépôt tentent d’écraser le task brief de l’agent, et comment le brief compilé, un `permissions:` minimal, `safe-outputs` et `network.allowed-domains` limitent toute réussite partielle ; dérive de [Step 10](09-agentic-editing.md).
- [Frontmatter Deep Dive — Part A](side-quest-11-01-frontmatter-deep-dive.md) — visite guidée des sections d’ouverture, de trigger et de permissions du frontmatter `gh-aw`, avec des activités de prédiction et d’essai ; dérive de [Step 7](07-your-first-workflow.md).
- [Workflow File Structure at a Glance](side-quest-11-01b-workflow-structure.md) — carte visuelle de la structure à deux fichiers, c’est-à-dire (`.md` + `.lock.yml`), des sections du frontmatter et du corps Markdown ; dérive de [Step 7](07-your-first-workflow.md).
- [Frontmatter Deep Dive — Part B](side-quest-11-08-frontmatter-tools-outputs.md) — visite guidée des sections tools, safe-outputs, fence de fermeture et corps de l’agent, avec des activités de prédiction et d’essai ; fait suite à la partie A.
- [Pattern: Auto-Label PRs by Content](side-quest-13-01-pr-labeler-pattern.md) — applique automatiquement des labels selon les fichiers modifiés dans une pull request ; dérive de [Step 14b](14b-pr-reviewer-workflow.md).
- [Pattern: Generate a PR Summary Comment](side-quest-13-02-pr-summary-pattern.md) — publie un commentaire de résumé structuré, prêt pour un changelog, lorsqu’une pull request s’ouvre ; dérive de [Step 14b](14b-pr-reviewer-workflow.md).
- [Pattern: PR Review Checklist](side-quest-13-03-pr-checklist-pattern.md) — évalue les pull requests à l’aide d’une checklist qualité et publie un tableau réussite/échec ; dérive de [Step 14b](14b-pr-reviewer-workflow.md).
- [Observe and Reduce Token Costs](side-quest-13-04-token-optimization.md) — activité pratique d’optimisation pour établir une base AIC, auditer les exécutions coûteuses, identifier les facteurs de coût et tester un changement de réduction de tokens à la fois ; dérive de [Step 14b](14b-pr-reviewer-workflow.md).
- [Fuzzy Schedule Expressions](side-quest-13-01-schedule-expressions.md) — référence rapide pour choisir entre `daily`, `hourly`, `weekly` et d’autres expressions schedule approximatives ; dérive de [Step 9](09-agentic-editing.md).
- [Evaluating and Iterating on Agent Output](side-quest-12-01-iterate-agent-output.md) — grille structurée pour juger la qualité des sorties, tableau de référence à cinq lignes liant problème et correction, et boucle d’itération avec un seul changement à la fois ; dérive de [Step 9](09-agentic-editing.md).
- [GitHub Actions Expressions and Contexts](side-quest-15-01-expressions-and-contexts.md) — approfondissement de la syntaxe `${{ }}`, des objets de contexte disponibles, des références de sortie et des conditions `if:` ; dérive de [Step 15](15-conditional-logic.md).
- [Chaining Conditions — Run an Agent Only When Security Findings Exist](side-quest-15-02-chaining-conditions.md) — exercice pratique pour ajouter une étape de comptage d’alertes Dependabot et la chaîner avec une vérification de branche afin que l’agent ne s’exécute que lorsqu’il existe de vrais constats de sécurité ; dérive de [Step 15](15-conditional-logic.md).
- [YAML Frontmatter Pitfalls](side-quest-11-02-yaml-frontmatter.md) — guide de référence sur les cinq erreurs YAML les plus fréquentes ; dérive de [Step 7](07-your-first-workflow.md).
- [Write Better AI Task Briefs](side-quest-11-03-better-prompts.md) — cinq techniques de prompt engineering pour obtenir des sorties IA plus claires et plus cohérentes ; dérive de [Step 7](07-your-first-workflow.md).
- [Explore and Adapt an Annotated Workflow](side-quest-11-04-annotated-workflow.md) — visite guidée annotée de `daily-status.md` avec des modifications pratiques pour confirmer chaque décision de conception ; dérive de [Step 7](07-your-first-workflow.md).
- [Event-Driven Triggers in Agentic Workflows](side-quest-11-05-event-triggers.md) — introduction au choix entre `pull_request`, `push`, `issues` et `schedule`, ainsi qu’à l’alignement de `safe-outputs` sur le trigger ; dérive de [Step 11c](15-conditional-logic.md).
- [Passing Data Between Steps with $GITHUB_OUTPUT](side-quest-16-01-github-output.md) — approfondissement du fonctionnement de `$GITHUB_OUTPUT` ; dérive de [Step 16](16-connect-data-source.md).
- [How MCP Tool Servers Work](side-quest-17-01-mcp-concepts.md) — introduction conceptuelle expliquant ce qu’est MCP, comment la boucle agentic évolue et comment lire les appels d’outils dans le journal Actions ; dérive de [Step 17](17-add-mcp-tools.md).
- [Storing Credentials with GitHub Secrets](side-quest-16-02-secrets-and-permissions.md) — guide pour créer des secrets de dépôt, les référencer dans des étapes de workflow, utiliser le `GITHUB_TOKEN` intégré et limiter les permissions ; dérive de [Step 16](16-connect-data-source.md) ou [Step 17](17-add-mcp-tools.md).
- [Token and Secret Exfiltration in Agentic Workflows](side-quest-16-03-token-exfiltration.md) — explique comment un contenu de dépôt conçu à dessein peut tenter de divulguer des tokens ou des clés API, et comment le masquage dans les journaux, `safe-outputs`, `network.allowed-domains` et un `permissions:` minimal l’empêchent ; dérive de [Step 16](16-connect-data-source.md).
- [Deterministic vs Agentic Data Ops](side-quest-16-04-deterministic-vs-agentic-data-ops.md) — guide de décision pour séparer les opérations de données fixes de l’interprétation agentic dans des workflows hybrides ; dérive de [Step 16](16-connect-data-source.md).
- [Long-Lived Credential Risks in Agentic Workflows](side-quest-16-05-long-lived-credentials.md) — explique pourquoi les personal access tokens créent une surface d’attaque plus large que le `GITHUB_TOKEN` éphémère, et comment la minimisation de `permissions:` et `network.allowed-domains` réduit le rayon d’impact ; dérive de [Step 16](16-connect-data-source.md).
- [Agentic Workflow Security Architecture (Explain Like You're 5)](side-quest-17-02-security-architecture.md) — explication visuelle, accessible aux débutants, des limites de la sandbox, de l’endroit où l’agent s’exécute et de l’apparence de safe outputs sûres ; dérive de [Step 17](17-add-mcp-tools.md).
- [Prompt Injection Attacks in Agentic Workflows](side-quest-17-03-prompt-injection.md) — explique ce qu’est la prompt injection, comment le task brief de gh-aw, `permissions:` et `safe-outputs` en limitent l’impact, et ce que vous pouvez faire comme auteur de workflow ; dérive de [Step 17](17-add-mcp-tools.md).
- [Permission Escalation in Agentic Workflows](side-quest-17-04-permission-escalation.md) — explique comment une autorité de workflow trop large permet à un agent mal orienté de tenter des changements dont la tâche n’avait pas besoin, et comment un `permissions:` minimal, `safe-outputs` et `protected-files` appliquent le principe du moindre privilège ; dérive de [Step 17](17-add-mcp-tools.md).
- [Supply Chain Attacks via MCP Tool Servers](side-quest-17-05-supply-chain-mcp.md) — explique comment un serveur MCP compromis ou malveillant peut fournir à votre agent des résultats d’outil empoisonnés, et comment `network.allowed-domains`, le bloc `tools:` explicite, des permissions minimales et `safe-outputs` réduisent ce risque ; dérive de [Step 17](17-add-mcp-tools.md).
- [Output Injection via Safe Outputs](side-quest-17-06-output-injection.md) — explique comment un contenu de dépôt conçu à dessein peut intégrer un Markdown trompeur dans la sortie de l’agent pour piéger des relecteurs humains, et comment les déclarations de surface de `safe-outputs` et le cadrage des labels l’empêchent ; dérive de [Step 17](17-add-mcp-tools.md).
- [Repository Poisoning via Agentic Write Access](side-quest-17-07-repo-poisoning.md) — explique comment un agent mal orienté disposant de `contents: write` pourrait être manipulé pour commiter des portes dérobées ou écraser des fichiers sensibles, et comment `contents: read`, `protected-files` et `safe-outputs: create-pull-request` ferment complètement cette voie ; dérive de [Step 17](17-add-mcp-tools.md).
- [Configure GitHub Copilot for Agentic Workflows](side-quest-06-03-copilot-token.md) — explique la facturation centralisée par organisation et la facturation personnelle via `COPILOT_GITHUB_TOKEN` ; dérive de [Step 7d](07d-confirm-model-access.md).
- [Method 1 — Copilot Requests Permission](side-quest-06-03a-copilot-requests-permission.md) — à utiliser lorsque votre organisation a activé la facturation centralisée de Copilot pour GitHub Actions ; dérive de [Configure GitHub Copilot for Agentic Workflows](side-quest-06-03-copilot-token.md).
- [Method 2 — `COPILOT_GITHUB_TOKEN` Secret](side-quest-06-03b-copilot-github-token.md) — à utiliser pour la facturation personnelle ou lorsque la facturation centralisée de Copilot n’est pas activée ; dérive de [Configure GitHub Copilot for Agentic Workflows](side-quest-06-03-copilot-token.md).
- [Method 2 (UI-only) — `COPILOT_GITHUB_TOKEN` Secret](side-quest-06-03c-copilot-github-token-ui-only.md) — termine la configuration de facturation personnelle en utilisant uniquement l’interface web GitHub, sans commandes terminal ; dérive de [Configure GitHub Copilot for Agentic Workflows](side-quest-06-03-copilot-token.md).
- [Configure an Anthropic API Key](side-quest-11-06-anthropic-key.md) — guide pas à pas pour générer une clé Anthropic, l’enregistrer comme secret de dépôt et basculer votre workflow vers `engine: claude` ; dérive de [Step 7](07-your-first-workflow.md).
- [Configure an OpenAI API Key](side-quest-11-07-openai-key.md) — guide pas à pas pour générer une clé OpenAI, l’enregistrer comme secret de dépôt et basculer votre workflow vers `engine: codex` ; dérive de [Step 7](07-your-first-workflow.md).
- [Choosing Between Cache Memory and Repo Memory](side-quest-20-01-memory-patterns.md) — guide de décision, références complètes des champs et exemples de task briefs pour `cache-memory` et `repo-memory` ; dérive de [Step 20](20-persistent-memory.md).
- [Sub-Agent Syntax Reference](side-quest-21-01-sub-agent-syntax.md) — règles de nommage, règles de limites de blocs, champs de frontmatter pris en charge et tableau d’alias de modèles pour les inline sub-agents ; dérive de [Step 21](21-inline-sub-agents.md).
- [Agent Session Phases Explained](side-quest-11-09-agent-session-phases.md) — tableau de référence complet des phases, conseils sur le fil d’activité, prompts de pilotage et chemins avancés de fusion d’agent ou `--watch` ; dérive de [Step 9](09-agentic-editing.md).
- [How A/B Experiment Round-Robin Assignment Works](side-quest-23-01-ab-roundrobin.md) — approfondissement des cinq étapes par exécution que gh-aw réalise pour `experiments:`, de la priorité au premier élément du tableau en cas d’égalité, et de tableaux de prédiction commentés pour lire l’artefact `experiment` ; dérive de [Step 23](23-ab-experiments.md).
- [Audit Reference — Artifacts, Firewall Logs, and Report Contents](side-quest-25-01-audit-reference.md) — décomposition détaillée des champs du rapport `gh aw audit`, des fichiers d’artefacts d’agent, de la facturation ⌖ AIC, de `firewall.md` et de `network.allow` ; dérive de [Step 25](25-audit-and-observability.md).
- [Self-Hosted Runner Infrastructure Deep Dive](side-quest-24-01-runner-infrastructure.md) — introduction à l’infrastructure d’entreprise couvrant les runners éphémères et JIT, la configuration de proxy et l’isolation réseau pour les environnements air-gapped ; dérive de [Step 24](24-self-hosted-runners.md).
- [Project Future AI Credit Costs with `gh aw forecast`](side-quest-26-01-forecast-costs.md) — visite guidée complète de `gh aw forecast` : lecture des sorties P10, P50 et P90, usage de `--period week` et `--days 7`, projection sur tous les workflows et dérivation d’une valeur `max-daily-ai-credits` à partir du chiffre P90 ; dérive de [Step 26](26-manage-costs-and-budgets.md).
- [Skill Injection Strategies — Hint, Fusion, and Inline](side-quest-29-01-skill-injection-strategies.md) — tableau de décision, exemples de code et exercice pratique sur les stratégies hint, fusion et inline pour injecter un `SKILL.md` dans un prompt de workflow ; dérive de [Step 29](29-skills-and-domain-knowledge.md).
- [Recognizing Common Agentic Workflow Failure Modes](side-quest-22-01-failure-modes.md) — exemples commentés d’échec dus à des données vides, des erreurs d’outil, des timeouts et une dérive de prompt, avec un exercice d’association entre problème et correction ; dérive de [Step 22](22-error-handling-and-resilience.md).
- [How the `agentic-workflows` Skill Dispatcher Works](side-quest-10-03-skill-dispatcher.md) — tableau complet des types de tâche avec expressions de déclenchement, plus des scénarios d’entraînement pour associer une demande au chemin Edit, Debug ou Optimize ; dérive de [Step 9](09-agentic-editing.md).

## Commencer

Commencez par [Contexte : Design System AXA France Canopée](0-design-system.md), puis continuez avec [Bienvenue](00-welcome.md).
