<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Quête annexe : référence d’audit — artifacts, logs firewall et contenu du rapport

> _Complément détaillé de [Auditez et surveillez vos agentic workflows](25-audit-and-observability.md). Utilisez cette quête annexe si vous voulez comprendre l’intégralité d’un rapport d’audit ou examiner des fichiers artifact individuels._

## 📋 Avant de commencer

- Vous avez terminé [Auditez et surveillez vos agentic workflows](25-audit-and-observability.md) et disposez d’au moins un ID d’exécution de workflow sur lequel travailler.
- `gh aw` est installé et authentifié, voir [Installer l’extension CLI gh-aw](06-install-gh-aw.md).

## Anatomie du rapport [gh aw audit](https://github.github.com/gh-aw/reference/audit/#gh-aw-audit)

`gh aw audit` génère un rapport Markdown qui couvre :

- **Métadonnées d’exécution** : nom du workflow, trigger, engine et modèle
- **Agent AIC** : total des [AI Credits](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic) consommés par le tour de l’agent
- **Threat-detection AIC (⌖ AIC)** : crédits consommés par le modèle de détection de menaces du [firewall](https://github.github.com/gh-aw/reference/sandbox/#awf-agent-workflow-firewall), rapportés séparément de l’inférence de l’agent
- **[MCP tool calls](https://github.github.com/gh-aw/guides/mcps/)** : chaque tool invoqué par l’agent, avec les erreurs éventuelles
- **Verdict de détection de menaces** : indique si une prompt injection, une fuite de secret ou un patch malveillant a été détecté
- **[Safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/)** : chaque declaration de safe-output emise par l'agent

## Fichiers artifact expliqués

### [Agent artifact](https://github.github.com/gh-aw/reference/artifacts/)

L’artifact `agent`, téléchargé à la fois par `gh aw logs --artifacts all` et par `gh aw audit`, contient l’enregistrement complet de ce qu’a fait l’agent.

| Fichier                   | Ce qu’il vous apprend                                                             |
| ------------------------- | --------------------------------------------------------------------------------- |
| `safeoutputs.jsonl`       | Chaque déclaration de safe-output émise par l’agent                               |
| `mcp-logs/`               | Un fichier de log par MCP server, listant chaque appel de tool et chaque resultat |
| `sandbox/firewall/audit/` | Journal d’accès réseau au niveau des domaines, en données brutes                  |
| `agent_usage.json`        | Utilisation des tokens pour le tour de l'agent                                    |

### Fichiers de log lisibles

Exécutez `gh aw audit <run-id> --parse` pour générer des fichiers lisibles à côté des artifacts bruts. Ces fichiers ne sont créés que lorsque vous utilisez `--parse` :

- `log.md` : la conversation complète de l’agent, formatée en Markdown
- `firewall.md` : un résumé formaté des accès réseau sortants, domaines autorisés et bloqués

Utilisez `firewall.md` pour identifier rapidement les domaines bloqués. Pour les enregistrements bruts au niveau des domaines, regardez dans `sandbox/firewall/audit/` à l’intérieur de l’artifact agent.

## Détails de facturation AIC

[AIC](https://github.github.com/gh-aw/reference/cost-management/#ai-credits-aic), pour AI Credits, est l’unité de facturation de l’inférence des agentic workflows et dérive de la consommation de tokens. Les chiffres exacts de facturation apparaissent dans votre tableau de bord de facturation GitHub.

La colonne **⌖ AIC** dans la sortie de `gh aw logs` montre les crédits consommés par le modèle de détection de menaces, séparément du tour principal de l’agent. Les deux contribuent à l’usage total d’AIC de votre organisation.

## Ajouter un domaine bloqué à [network.allowed](https://github.github.com/gh-aw/reference/network/#configuration)

Si le firewall a bloqué un domaine dont votre workflow a besoin, ajoutez-le à `network.allowed` dans le frontmatter de votre workflow puis recompilez :

```markdown
---
network:
    allowed:
        - api.example.com
---
```

Partagez avec votre équipe sécurité enterprise la liste `allowed-domains` issue d’une exécution réussie comme allowlist firewall prête à l’emploi.

## Essayez vous-même

### Lancer un audit sur une exécution récente

Ouvrez l’onglet **Actions** de votre dépôt, cliquez sur une exécution de workflow terminée et copiez l’ID d’exécution depuis l’URL, c’est le nombre après `/runs/`. Exécutez ensuite :

```bash
gh aw audit <run-id> --parse
```

Exemple de sortie :

```text
## Audit Report

**Workflow:** daily-status
**Trigger:** schedule
**Engine:** copilot
**Model:** gpt-4o

| Metric       | Value |
|---|---|
| Agent AIC    | 42    |
| ⌖ AIC        | 3     |
| MCP calls    | 7     |
| Threat verdict | none |
```

1. Trouvez un ID d’exécution dans l’onglet Actions.
2. Confirmez que le rapport affiche le nom du workflow, le trigger et le modèle.
3. Vérifiez que la valeur ⌖ AIC apparaît séparément de Agent AIC.
4. Notez le verdict de menace, typiquement `none`.

### Explorer les appels MCP tool

Téléchargez les artifacts d’une exécution, puis ouvrez le dossier `mcp-logs/`. Chaque fichier correspond à un MCP server et liste chaque appel de tool effectué par l’agent.
Téléchargez les artifacts d’une exécution, puis ouvrez le dossier `mcp-logs/`. Chaque fichier correspond à un [MCP](https://github.github.com/gh-aw/guides/mcps/) server et liste chaque appel de tool effectué par l’agent.

```bash
gh aw logs <your-workflow-id> --artifacts all
```

Parcourez les fichiers de log dans `.github/aw/logs/<run-id>/mcp-logs/`.

1. Trouvez le dossier `mcp-logs/` dans les artifacts telecharges.
2. Identifiez au moins un appel de tool et notez le nom du tool.
3. Écrivez une phrase décrivant ce que l’agent essayait d’accomplir.
4. Verifiez le nombre total de tokens dans `agent_usage.json`.

### Inspecter les enregistrements du firewall

Les logs bruts d’accès réseau au niveau des domaines se trouvent dans `sandbox/firewall/audit/` à l’intérieur de l’artifact agent. Parcourez-les pour confirmer que votre workflow n’a contacté que des domaines attendus.

1. Ouvrez `sandbox/firewall/audit/` dans les artifacts telecharges.
2. Identifiez au moins un domaine auquel le workflow a accédé.
3. Si certains domaines ont été bloqués, ajoutez-les à `network.allowed` dans le frontmatter du workflow.

## ✅ Checkpoint

- [ ] Vous pouvez identifier chaque fichier dans l’artifact agent et expliquer ce qu’il contient
- [ ] Vous comprenez ce que représente ⌖ AIC et en quoi il diffère de Agent AIC
- [ ] Vous pouvez trouver des domaines bloqués dans les journaux d’audit du firewall et les ajouter à `network.allowed`
- [ ] Vous savez ce que verifie le verdict de detection de menaces
- [ ] Vous avez exécuté `gh aw audit` sur une vraie exécution et examiné le rapport généré
- [ ] Vous avez exploré `mcp-logs/` pour identifier des appels de tools depuis une exécution terminée

<!-- journey: all -->

Retour à [Auditez et surveillez vos agentic workflows](25-audit-and-observability.md).

<!-- /journey -->
