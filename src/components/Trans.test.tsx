import { beforeEach, describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Trans } from "@/components/Trans"
import { setTranslation } from "@/translate"
import { TranslationContext } from "@/provider/TranslationContext"

describe("Trans", () => {
  beforeEach(() => {
    setTranslation({})
  })

  it("affiche la traduction de son contenu", () => {
    setTranslation({ hello: "Bonjour" })
    render(<Trans>hello</Trans>)
    expect(screen.getByText("Bonjour")).toBeInTheDocument()
  })

  it("affiche le texte d'origine quand aucune traduction n'existe", () => {
    render(<Trans>Texte brut</Trans>)
    expect(screen.getByText("Texte brut")).toBeInTheDocument()
  })

  it("interpole les paramètres", () => {
    setTranslation({ greeting: "Bonjour {{name}}" })
    render(<Trans params={{ name: "Salva" }}>greeting</Trans>)
    expect(screen.getByText("Bonjour Salva")).toBeInTheDocument()
  })

  it("enveloppe le texte dans un span quand une classe est fournie", () => {
    const { container } = render(<Trans className="titre">Texte</Trans>)
    expect(container.querySelector("span.titre")).not.toBeNull()
  })

  it("ne rend rien sans contenu", () => {
    const { container } = render(<Trans />)
    expect(container).toBeEmptyDOMElement()
  })

  it("interprète une traduction qui est un fragment HTML", () => {
    setTranslation({ cgu: "<b>Conditions</b>" })
    const { container } = render(<Trans>cgu</Trans>)
    expect(container.querySelector("b")?.textContent).toBe("Conditions")
  })

  it("préfère la fonction de traduction fournie par le contexte", () => {
    setTranslation({ hello: "Bonjour" })
    render(
      <TranslationContext.Provider
        value={{
          translations: {},
          updateTranslations: () => {},
          translate: () => "Depuis le contexte",
        }}
      >
        <Trans>hello</Trans>
      </TranslationContext.Provider>
    )
    expect(screen.getByText("Depuis le contexte")).toBeInTheDocument()
  })
})
