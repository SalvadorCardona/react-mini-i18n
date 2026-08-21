import { useContext } from "react"
import { TranslationContext } from "@/provider/TranslationContext"

export default function useTranslationContext() {
  return useContext(TranslationContext)
}
