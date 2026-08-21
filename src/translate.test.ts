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

  it("returns the translation when the key is known", () => {
    setTranslation({ hello: "Hello" })
    expect(translate("hello")).toBe("Hello")
  })

  it("returns the key as-is when it is unknown", () => {
    // Untranslated text stays readable: the key is already the default wording.
    expect(translate("Une phrase jamais traduite")).toBe(
      "Une phrase jamais traduite"
    )
  })

  it("interpolates parameters into the translation", () => {
    setTranslation({ greeting: "Hello {{name}}" })
    expect(translate("greeting", { name: "Sam" })).toBe("Hello Sam")
  })

  it("interpolates into an untranslated key too", () => {
    expect(translate("Hello {{name}}", { name: "Sam" })).toBe("Hello Sam")
  })

  it("replaces the whole dictionary with setTranslation", () => {
    setTranslation({ a: "A" })
    setTranslation({ b: "B" })
    expect(getTranslations()).toEqual({ b: "B" })
  })

  it("adds an entry without dropping the others with addTrans", () => {
    setTranslation({ a: "A" })
    addTrans("b", "B")
    expect(getTranslations()).toEqual({ a: "A", b: "B" })
  })
})

describe("translateWithParams", () => {
  it("replaces each placeholder with its value", () => {
    expect(translateWithParams("{{a}} et {{b}}", { a: "1", b: "2" })).toBe(
      "1 et 2"
    )
  })

  it("leaves a placeholder untouched when no value matches", () => {
    expect(translateWithParams("Hello {{name}}", {})).toBe("Hello {{name}}")
  })
})

describe("hasTranslation", () => {
  beforeEach(() => {
    setTranslation({ bonjour: "Hello" })
  })

  it("is case-insensitive on the key", () => {
    expect(hasTranslation("BONJOUR")).toBe(true)
  })

  it("is false for a missing key", () => {
    expect(hasTranslation("absente")).toBe(false)
  })
})

describe("arrayToTranslationObject", () => {
  it("turns a list of entries into a dictionary", () => {
    expect(
      arrayToTranslationObject([
        { key: "a", value: "A" },
        { key: "b", value: "B" },
      ])
    ).toEqual({ a: "A", b: "B" })
  })

  it("skips entries whose key or value is empty", () => {
    expect(
      arrayToTranslationObject([
        { key: "a", value: "A" },
        { key: null, value: "B" },
        { key: "c", value: null },
      ])
    ).toEqual({ a: "A" })
  })
})
