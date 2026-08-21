---
"@animalink/i18n": minor
---

Première publication : extraction du module de traduction du monorepo Animalink
vers une librairie autonome.

`translate`, `Trans`, `TranslationProvider` et les utilitaires de dictionnaire
sont désormais publiables indépendamment ; le module n'a d'autre dépendance que
React. Couvert par 19 tests, il n'en avait aucun.
