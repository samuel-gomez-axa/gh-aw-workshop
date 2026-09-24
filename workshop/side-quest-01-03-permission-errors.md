<!-- page-journey: all -->
<!-- page-adventure: side-quest -->

# Side Quest : Erreurs de permission

> _Facultatif : lisez ceci si vous voyez une erreur `permission denied` et avez besoin d’aide pour la résoudre._

## :clipboard: Avant de commencer

- Vous avez ouvert un terminal (voir [Side Quest: Terminal Basics](side-quest-01-01-terminal-basics.md) si besoin)
- Vous avez rencontré une erreur `permission denied` pendant l’installation, ou vous voulez savoir quoi faire si cela arrive

---

## Qu’est-ce qu’une erreur de permission ?

Quand vous voyez `permission denied`, votre compte utilisateur n’a pas les droits nécessaires pour exécuter cette commande telle qu’elle est écrite. C’est une fonctionnalité de sécurité : elle évite les modifications accidentelles des fichiers système.

<picture>
   <source media="(prefers-color-scheme: dark)" srcset="images/side-quest-01-03-permission-decision-dark.svg">
   <source media="(prefers-color-scheme: light)" srcset="images/side-quest-01-03-permission-decision-light.svg">
   <img alt="Flux de décision pour une erreur permission denied : exécuter une commande, vérifier la permission, puis en cas de refus, élever l’accès avec sudo ou Run as administrator avant que la commande réussisse" src="images/side-quest-01-03-permission-decision-light.svg">
</picture>

---

## Comment la corriger

### macOS et Linux

Relancez la commande en ajoutant `sudo` devant :

```bash
sudo <your-command>
```

Votre mot de passe vous sera demandé. `sudo` signifie "superuser do" et accorde temporairement des droits élevés pour cette commande uniquement.

### Windows

Faites un clic droit sur **Windows Terminal** ou **PowerShell** et choisissez **Run as administrator**, puis réessayez la commande.

---

> [!TIP]
> N’utilisez un accès élevé que lorsque les instructions de l’atelier vous le demandent explicitement. Exécuter tout en root ou en administrateur n’est pas recommandé et peut provoquer des changements difficiles à annuler.

---

## Exercice : observer et corriger une erreur de permission

Exécutez cette commande pour provoquer volontairement un message `permission denied`.

**macOS / Linux:**

```bash
cat /etc/sudoers
```

Vous devriez voir une sortie comme `cat: /etc/sudoers: Permission denied`. Notez le chemin exact du fichier indiqué dans le message.

Relancez-la maintenant avec `sudo` et vérifiez que l’erreur disparaît :

```bash
sudo cat /etc/sudoers
```

**Windows:** Ouvrez un PowerShell standard (non administrateur) et exécutez :

```powershell
Get-Content "$env:SystemRoot\System32\drivers\etc\hosts"
```

Ouvrez ensuite un PowerShell administrateur et exécutez la même commande : elle devrait réussir.

---

<!-- journey: all -->

## :white_check_mark: Checkpoint

- [ ] Vous avez exécuté la commande d’exercice et vu `permission denied` (ou un message équivalent de refus d’accès) dans la sortie du terminal
- [ ] Vous avez identifié le chemin exact du fichier affiché dans le message d’erreur
- [ ] Vous avez relancé la commande avec des droits élevés (`sudo` ou Run as administrator) et confirmé qu’elle s’exécute sans erreur
- [ ] Vous pouvez expliquer en une phrase pourquoi votre compte n’avait pas l’accès requis ; écrivez-la comme commentaire sur l’issue de votre dépôt d’exercice

---

Quand vous avez terminé ici, revenez à [Side Quest : Bases du terminal](side-quest-01-01-terminal-basics.md).

<!-- /journey -->
