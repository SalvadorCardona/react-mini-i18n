import { beforeEach, describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Trans } from "@/components/Trans"
import { setTranslation } from "@/translate"
import { TranslationContext } from "@/provider/TranslationContext"

describe("Trans", () => {
  beforeEach(() => {
    setTranslation({})
  })

  it("renders the translation of its content", () => {
    setTranslation({ hello: "Hello" })
    render(<Trans>hello</Trans>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("renders the original text when no translation exists", () => {
    render(<Trans>Raw text</Trans>)
    expect(screen.getByText("Raw text")).toBeInTheDocument()
  })

  it("interpolates parameters", () => {
    setTranslation({ greeting: "Hello {{name}}" })
    render(<Trans params={{ name: "Sam" }}>greeting</Trans>)
    expect(screen.getByText("Hello Sam")).toBeInTheDocument()
  })

  it("wraps the text in a span when a class name is given", () => {
    const { container } = render(<Trans className="heading">Text</Trans>)
    expect(container.querySelector("span.heading")).not.toBeNull()
  })

  it("renders nothing without content", () => {
    const { container } = render(<Trans />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders a translation that is an HTML fragment as markup", () => {
    setTranslation({ cgu: "<b>Terms</b>" })
    const { container } = render(<Trans>cgu</Trans>)
    expect(container.querySelector("b")?.textContent).toBe("Terms")
  })

  it("prefers the translate function provided by the context", () => {
    setTranslation({ hello: "Hello" })
    render(
      <TranslationContext.Provider
        value={{
          translations: {},
          updateTranslations: () => {},
          translate: () => "From the context",
        }}
      >
        <Trans>hello</Trans>
      </TranslationContext.Provider>
    )
    expect(screen.getByText("From the context")).toBeInTheDocument()
  })
})
