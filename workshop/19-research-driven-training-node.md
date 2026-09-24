<!-- page-journey: all -->
<!-- page-adventure: advanced -->

# Construire le prochain noeud de formation pilote par la recherche

> _Un bon contenu d'atelier vient de signaux produit réels, pas d'hypothèses._

## :dart: Ce que vous allez faire

Dans cette étape, vous allez transformer la recherche sur `github/gh-aw` en une mise à jour concrète du plan de formation : examiner les signaux actuels de la documentation gh-aw, identifier un manque pertinent pour les apprenants et rédiger une proposition de nœud d'atelier prête à être mise en œuvre. À la fin, vous disposerez d'une méthode reproductible pour décider avec assurance quoi enseigner ensuite.

## :clipboard: Avant de commencer

- Vous avez terminé [Share and Reuse Your Agentic Workflows](18-share-and-reuse.md).
- Vous savez ouvrir `workshop/README.md` et identifier où de nouveaux nœuds doivent s'insérer dans le tableau du cursus.
- Vous savez lancer `gh aw compile` pour valider un workflow, comme dans les étapes précédentes.

## Etapes

### Examiner les signaux gh-aw actuels

Commencez par collecter le signal le plus actuel depuis le depot source et ses references documentaires :

```bash
for url in \
  "https://raw.githubusercontent.com/github/gh-aw/main/LLMs.txt" \
  "https://raw.githubusercontent.com/github/gh-aw/main/llms.txt" \
  "https://github.github.com/gh-aw/llms.txt"; do
  if curl -fsSL "$url" | head -n 40; then
    break
  fi
done
```

Cela vous donne un index compact de ce que le projet gh-aw met actuellement en avant pour la consommation par les modèles et la documentation.

### Choisir un manque a fort impact pour les apprenants

Relisez votre parcours d'atelier actuel et posez-vous une question pratique : _qu'est-ce qu'un apprenant peut faire maintenant qu'il ne pouvait pas faire avant l'existence de ce nouveau nœud ?_ Gardez une réponse resserrée. Les bons manques sont concrets, par exemple "comment valider les contraintes d'un workflow avant d'ouvrir une PR" ou "comment choisir des [safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/) pour une automatisation".

### Rediger une proposition de noeud avec un perimetre clair

Redigez en un paragraphe le perimetre du noeud, puis listez les [artifacts](https://github.github.com/gh-aw/reference/artifacts/) précis qu'il doit modifier :

- un nouveau fichier `workshop/<step>-<slug>.md`
- une nouvelle ligne dans le tableau du cursus de `workshop/README.md`
- une mise à jour facultative de la formulation dans `workshop/00-welcome.md` si le nombre total d'étapes change

### Conserver les métadonnées de recherche dans des commentaires XML

Ajoutez des commentaires XML pour conserver le raisonnement sans interrompre la lecture des apprenants :

```markdown workshop/28-safe-outputs-selection.md
<!--
<research-metadata>
  <focus>safe outputs selection</focus>
  <sources>
    <source>https://raw.githubusercontent.com/github/gh-aw/main/LLMs.txt</source>
    <source>https://github.github.com/gh-aw/reference/safe-outputs/</source>
  </sources>
  <rationale>...</rationale>
</research-metadata>
-->
```

Gardez ce commentaire concis et rattachable aux vraies sources que vous avez utilisées.

### Valider avant d'ouvrir une pull request

Lancez les vérifications markdown lint et [compile](https://github.github.com/gh-aw/reference/compilation-process/) afin que votre proposition soit prête pour la production :

```bash
npx --yes markdownlint-cli2 "workshop/**/*.md"
gh aw compile
```

## :white_check_mark: Checkpoint

- [ ] Vous avez examiné les signaux d'orientation gh-aw actuels à partir de `LLMs.txt`
- [ ] Vous avez identifié un manque concret à combler pour un nouveau nœud de formation
- [ ] Vous avez rédigé un périmètre de nœud borné, rattaché à des fichiers précis du dépôt
- [ ] Vous avez consigné la justification dans des commentaires XML
- [ ] Vous avez lancé les validations lint et compile avant de préparer une PR

<!-- journey: all -->

**Suite :** [Faites en sorte que votre workflow se souvienne d'une execution a l'autre](20-persistent-memory.md)

<!-- /journey -->

<!--
<research-node-metadata>
  <intent>Teach maintainers how to choose and justify the next workshop node using live gh-aw research.</intent>
  <primary-source>https://raw.githubusercontent.com/github/gh-aw/main/LLMs.txt</primary-source>
  <secondary-sources>
    <source>https://github.github.com/gh-aw/llms.txt</source>
    <source>https://github.github.com/gh-aw/patterns/memory-ops/</source>
  </secondary-sources>
</research-node-metadata>
-->
