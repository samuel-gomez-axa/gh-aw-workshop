<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Dépannage de l’installation de `gh-aw`

> _Facultatif : utilisez ce guide si l’installation de Step 6 échoue, puis revenez au parcours principal._

Si `gh extension install github/gh-aw` échoue, utilisez la correction correspondante ci-dessous puis réessayez.

Le diagramme ci-dessous montre comment identifier votre type d’erreur et appliquer la bonne correction :

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/sq-06-01-install-troubleshooting-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/sq-06-01-install-troubleshooting-light.svg">
   <img alt="Flux de décision pour le dépannage d’installation : gh extension install échoue, puis bifurcation selon le type d’erreur — HTTP 401 non authentifié, HTTP 403 token de Codespace d’organisation, erreur de proxy ou de réseau, ou endpoint GHES — chaque cas menant à sa correction spécifique, tous convergeant vers une vérification réussie de gh aw --version." src="images/sq-06-01-install-troubleshooting-light.svg">
</picture>

---

## Corrections rapides pour l’installation en terminal local (parcours local)

Si vous êtes encore en train de configurer votre terminal local et n’installez pas encore `gh-aw`, utilisez d’abord ce tableau :

| Message d’erreur                                      | Pourquoi cela arrive                                                                      | Comment le corriger                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `command not found`                                   | L’outil est absent ou la session de terminal n’a pas encore pris l’installation en compte | Installez ou réinstallez l’outil en suivant les instructions de l’étape ci-dessus, puis fermez et rouvrez complètement votre terminal. Quand l’installation réussit, la commande s’exécute sans l’erreur `command not found`.                                                              |
| `permission denied`                                   | La commande a besoin de privilèges élevés ou les permissions du fichier sont restreintes  | Relancez la commande d’installation qui a échoué avec `sudo` (Linux/macOS) exactement comme indiqué dans l’étape, ou ouvrez un terminal élevé (Administrator) sur Windows puis réessayez. Quand la correction fonctionne, la commande d’installation se termine sans erreur de permission. |
| `No such file or directory` / erreurs liées au chemin | Votre terminal ne se trouve pas dans le dossier attendu                                   | Exécutez `pwd` (macOS/Linux) ou `cd` sans argument (Windows) pour voir votre emplacement actuel. Passez au bon répertoire avec `cd my-agentic-workflows`, puis réessayez la commande. Quand vous êtes dans le bon dossier, l’erreur de chemin disparaît et la commande réussit.            |

---

## Non authentifié (HTTP 401)

Si vous voyez des erreurs comme :

```text
error connecting to api.github.com: HTTP 401: Bad credentials
```

ou :

```text
failed to authenticate to api.github.com
```

Exécutez :

```bash
gh auth login
gh auth status
gh extension install github/gh-aw
```

Vérifiez que `gh auth status` affiche `Logged in to github.com`.

---

## Limitation du token de Codespace d’organisation (HTTP 403)

Dans un Codespace appartenant à une organisation, `gh` est pré-authentifié avec un token à portée organisation qui ne peut pas accéder au marketplace des extensions. `gh extension install github/gh-aw` échouera avec HTTP 403 dans cet environnement. Pour cette raison, l’étape principale recommande désormais le script curl comme chemin d’installation principal.

Si vous arrivez ici après un 403, exécutez le script d’installation :

```bash
curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash
gh aw --version
```

Vous n’avez **pas** besoin d’exécuter `gh auth login` dans ce cas.

---

## Derrière un proxy d’entreprise

Définissez les variables de proxy dans votre shell courant, puis réessayez :

```bash
export HTTPS_PROXY="http://proxy.company.com:8080"
export HTTP_PROXY="$HTTPS_PROXY"
export NO_PROXY="127.0.0.1,localhost,.company.com"
gh config set git_protocol https
gh auth status
gh extension install github/gh-aw
```

---

## Endpoint [GitHub Enterprise Server](https://github.github.com/gh-aw/setup/cli/#github-enterprise-server-support) (GHE/GHES)

Authentifiez-vous sur votre nom d’hôte GHES et installez avec `--hostname` :

```bash
gh config set git_protocol https --host ghes.example.com
gh auth login --hostname ghes.example.com --scopes "repo,read:org,workflow"
gh extension install github/gh-aw --hostname ghes.example.com
gh auth status --hostname ghes.example.com
```

Si votre administrateur exige des scopes différents, utilisez les scopes minimums qu’il fournit. Lorsque les étapes ci-dessus réussissent, `gh auth status --hostname ghes.example.com` affiche "Logged in to ghes.example.com" et `gh aw --version` affiche un numéro de version.

---

## Le téléchargement de l’extension échoue sur un [network](https://github.github.com/gh-aw/reference/network/) verrouillé

Si l’installation échoue avec une erreur réseau :

1. Téléchargez l’artefact de release correspondant depuis [github/gh-aw releases](https://github.com/github/gh-aw/releases).
2. Extrayez-le sur une machine capable d’atteindre GitHub.
3. Déplacez le dossier extrait vers votre machine d’atelier et installez-le depuis un chemin local :

```bash
gh extension install /path/to/gh-aw
gh extension list
```

---

<!-- journey: all -->

Revenez à [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md).

<!-- /journey -->

## :white_check_mark: Checkpoint

Utilisez cette checklist pour confirmer que le problème d’installation est entièrement résolu avant de revenir au parcours principal :

- [ ] `gh auth status` (ou `gh auth status --hostname <your-host>` pour GHES) affiche "Logged in to …" sans erreur
- [ ] `gh extension install github/gh-aw` s’est terminé sans erreur HTTP 4xx ni erreur réseau
- [ ] `gh aw --version` affiche un numéro de version (par exemple `gh-aw 1.x.x`)
- [ ] `gh extension list` affiche `github/gh-aw` dans la sortie
- [ ] Je suis prêt à revenir à [Installer l’extension `gh-aw` CLI](06-install-gh-aw.md) et à continuer
