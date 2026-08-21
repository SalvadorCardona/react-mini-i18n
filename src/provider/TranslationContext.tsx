import { createContext } from "react"
import translate, {
  getTranslations,
  TranslationsBagInterface,
} from "@/translate"

export interface TranslationContextInterface {
  translations: TranslationsBagInterface
  updateTranslations: () => void
  translate: (key: string, params?: TranslationsBagInterface) => string
}

export const TranslationContext = createContext<TranslationContextInterface>({
  translations: getTranslations(),
  updateTranslations: () => {},
  translate,
})
