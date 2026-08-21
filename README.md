# @animalink/i18n

Traduction React réduite à l'essentiel : un dictionnaire `clé → texte`, une
fonction, un composant. Pas de format de fichier imposé, pas de chargeur, pas de
configuration — vous fournissez un objet, la librairie le consulte.

```tsx
import { setTranslation, Trans } from "@animalink/i18n"

setTranslation({ hello: "Bonjour", greeting: "Bonjour {{name}}" })

;<Trans>hello</Trans> // → Bonjour
;<Trans params={{ name: "Salva" }}>greeting</Trans> // → Bonjour Salva
```

Une clé absente du dictionnaire est affichée telle quelle : un texte non traduit
reste lisible, et vous pouvez écrire directement la phrase française comme clé.

## Installation

```bash
pnpm add @animalink/i18n
```

`react` (18.3+ ou 19) est une dépendance pair.

## API

### `translate(key, params?)`

Traduit une clé hors du rendu React — messages d'erreur, notifications,
attributs.

```ts
import { translate } from "@animalink/i18n"

toast.error(translate("Le formulaire est invalide"))
translate("Bonjour {{name}}", { name: "Salva" })
```

### `<Trans>`

Équivalent en composant. Si la traduction est un fragment HTML
(`"<b>Conditions</b>"`), il est interprété ; sinon le texte est rendu tel quel.

```tsx
<Trans className="text-sm" params={{ count: 3 }}>
  {"{{count}} résultats"}
</Trans>
```

### Alimenter le dictionnaire

```ts
import { setTranslation, addTrans, arrayToTranslationObject } from "@animalink/i18n"

setTranslation({ hello: "Bonjour" }) // remplace tout le dictionnaire
addTrans("bye", "Au revoir") // ajoute une entrée

// Depuis une liste { key, value }, telle que servie par une API
setTranslation(arrayToTranslationObject(await api.get("/translations")))
```

`getTranslations()` retourne le dictionnaire courant et `hasTranslation(key)`
indique si une clé existe (comparaison insensible à la casse).

### Chargement asynchrone

`TranslationProvider` récupère le dictionnaire au montage et ne rend ses enfants
qu'une fois la réponse reçue — de quoi éviter l'affichage des clés brutes
pendant le chargement.

```tsx
<TranslationProvider provider={() => api.get("/translations")}>
  <App />
</TranslationProvider>
```

Les composants sous le provider peuvent lire le contexte pour déclencher un
rechargement :

```ts
const { translations, updateTranslations } = useTranslationContext()
```

## Un seul dictionnaire par application

Le dictionnaire est un singleton de module. Si deux copies du paquet cohabitent
dans `node_modules`, elles auront chacune le leur et les traductions
sembleront ignorées par moitié.

En pratique : déclarez `@animalink/i18n` en **peerDependency** dans les
librairies qui l'utilisent, jamais en dependency — c'est ce que fait
[`@animalink/form`](https://github.com/SalvadorCardona/animalink-form).

## Développement

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

### Publier une version

```bash
pnpm changeset   # décrire le changement et son impact
```

La CI publie sur npm après fusion sur `main`.

## Licence

MIT
