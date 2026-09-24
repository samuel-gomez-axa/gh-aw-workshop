<!-- page-journey: terminal -->
<!-- page-adventure: side-quest -->

# Side Quest : Bases du terminal

> _Facultatif : suivez cette courte introduction si vous débutez avec le terminal, puis revenez à Step 1._

## :clipboard: Avant de commencer

- Un ordinateur sous macOS, Windows ou Linux avec un accès à Internet

---

## Comment ouvrir un terminal

**macOS:** Appuyez sur **Command ⌘ + Space**, tapez **Terminal**, puis appuyez sur **Enter**. Vous verrez une invite comme `yourname@MacBook ~ %`.

**Windows:** Appuyez sur **Win**, tapez **Terminal**, puis appuyez sur **Enter**. Vous verrez une invite comme `C:\Users\yourname>`.

**Linux:** Appuyez sur **Ctrl + Alt + T**, ou faites un clic droit sur le bureau et choisissez **Ouvrir un terminal**. Vous verrez une invite comme `yourname@machine:~$`.

L’**invite** est une courte ligne de texte qui se termine par `$`, `%` ou `>`. Quand vous la voyez, le terminal est prêt à recevoir votre **commande**. Tout ce que le terminal affiche en retour correspond à la **sortie**.

---

## Exercice 1 : vérifier que votre terminal fonctionne

Tapez cette commande et appuyez sur **Enter** :

```bash
echo "hello, terminal!"
```

Vous devriez voir `hello, terminal!` s’afficher en sortie. Si c’est le cas, votre terminal fonctionne. :white_check_mark:

---

## Exercice 2 : voir où vous êtes

Votre terminal a toujours un **répertoire courant** : le dossier dans lequel il se trouve. Exécutez :

```bash
pwd
ls
```

- `pwd` affiche le chemin de votre répertoire courant (par exemple `/Users/alice`).
- `ls` liste les fichiers et dossiers qu’il contient.

> [!TIP]
> Dans Windows Command Prompt, utilisez `cd` (sans argument) à la place de `pwd`, et `dir` à la place de `ls`.

---

## Exercice 3 : naviguer entre les dossiers

Pour entrer dans un dossier puis revenir en arrière, exécutez chaque commande séparément :

```bash
cd Documents
```

```bash
cd ..
```

- `cd <folder>` entre dans ce dossier.
- `cd ..` revient au dossier parent.

---

## Exercice 4 : créer puis supprimer un dossier

Créez un nouveau dossier :

```bash
mkdir test-dir
```

Entrez ensuite dedans :

```bash
cd test-dir
```

Revenez ensuite au dossier précédent et supprimez-le :

```bash
cd ..
rm -r test-dir
```

> [!TIP]
> `mkdir` fonctionne de la même manière sur toutes les plateformes. Dans Windows Command Prompt, utilisez `rmdir /s test-dir` à la place de `rm -r test-dir`.

---

<!-- journey: terminal -->

## :white_check_mark: Checkpoint

- [ ] Vous avez ouvert un terminal et vu une invite (`$`, `%` ou `>`)
- [ ] Vous avez exécuté `echo "hello, terminal!"` et vu le message s’afficher
- [ ] Vous avez exécuté `pwd` et `ls` et vu votre répertoire courant et son contenu
- [ ] Vous êtes entré dans un dossier avec `cd` puis revenu avec `cd ..`
- [ ] Vous avez créé un dossier avec `mkdir` puis l’avez supprimé avec `rm -r`

---

Quand vous avez terminé ici, revenez à [Ce qu’il vous faut avant de commencer](01-prerequisites.md).

<!-- /journey -->
