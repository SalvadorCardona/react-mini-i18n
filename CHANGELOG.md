# @animalink/i18n

## 0.2.0

### Minor Changes

- 287416e: Première publication : extraction du module de traduction du monorepo Animalink
  vers une librairie autonome.

  `translate`, `Trans`, `TranslationProvider` et les utilitaires de dictionnaire
  sont désormais publiables indépendamment ; le module n'a d'autre dépendance que
  React. Couvert par 19 tests, il n'en avait aucun.
