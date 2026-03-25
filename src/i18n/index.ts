import type { Locale, LocaleMessages } from './types'

import pt from './locales/pt'
import en from './locales/en'
import es from './locales/es'

export type { Locale, LocaleMessages }

export const translations: Record<Locale, LocaleMessages> = {
  pt,
  en,
  es,
}
