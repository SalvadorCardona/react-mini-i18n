import { getTranslations } from "@/translate"

export function hasTranslation(key: string): boolean {
  key = key.toLowerCase()

  return !!getTranslations()[key]
}
