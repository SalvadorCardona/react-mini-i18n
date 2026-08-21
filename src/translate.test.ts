import { beforeEach, describe, expect, it } from "vitest"
import translate, {
  addTrans,
  getTranslations,
  setTranslation,
} from "@/translate"
import { hasTranslation } from "@/hasTranslation"
import { translateWithParams } from "@/translateWithParams"
import { arrayToTranslationObject } from "@/arrayToTranslationObject"

describe("translate", () => {
  beforeEach(() => {
    setTranslation({})
  })

  it("retourne la traduction quand la clé est connue", () => {
    setTranslation({ hello: "Bonjour" })
    expect(translate("hello")).toBe("Bonjour")
  })

  it("retourne la clé telle quelle quand elle est inconnue", () => {
    // Un texte non traduit reste lisible : la clé est déjà la version par défaut.
    expect(translate("Une phrase jamais traduite")).toBe(
      "Une phrase jamais traduite"
    )
  })

  it("interpole les paramètres dans la traduction", () => {
    setTranslation({ greeting: "Bonjour {{name}}" })
    expect(translate("greeting", { name: "Salva" })).toBe("Bonjour Salva")
  })

  it("interpole aussi dans une clé non traduite", () => {
    expect(translate("Bonjour {{name}}", { name: "Salva" })).toBe("Bonjour Salva")
  })

  it("remplace tout le dictionnaire avec setTranslation", () => {
    setTranslation({ a: "A" })
    setTranslation({ b: "B" })
    expect(getTranslations()).toEqual({ b: "B" })
  })

  it("ajoute une entrée sans écraser les autres avec addTrans", () => {
    setTranslation({ a: "A" })
    addTrans("b", "B")
    expect(getTranslations()).toEqual({ a: "A", b: "B" })
  })
})

describe("translateWithParams", () => {
  it("remplace chaque marqueur par sa valeur", () => {
    expect(translateWithParams("{{a}} et {{b}}", { a: "1", b: "2" })).toBe(
      "1 et 2"
    )
  })

  it("laisse intact un marqueur sans valeur correspondante", () => {
    expect(translateWithParams("Bonjour {{name}}", {})).toBe("Bonjour {{name}}")
  })
})

describe("hasTranslation", () => {
  beforeEach(() => {
    setTranslation({ bonjour: "Hello" })
  })

  it("est insensible à la casse de la clé", () => {
    expect(hasTranslation("BONJOUR")).toBe(true)
  })

  it("est faux pour une clé absente", () => {
    expect(hasTranslation("absente")).toBe(false)
  })
})

describe("arrayToTranslationObject", () => {
  it("transforme une liste d'entrées en dictionnaire", () => {
    expect(
      arrayToTranslationObject([
        { key: "a", value: "A" },
        { key: "b", value: "B" },
      ])
    ).toEqual({ a: "A", b: "B" })
  })

  it("ignore les entrées dont la clé ou la valeur est vide", () => {
    expect(
      arrayToTranslationObject([
        { key: "a", value: "A" },
        { key: null, value: "B" },
        { key: "c", value: null },
      ])
    ).toEqual({ a: "A" })
  })
})
