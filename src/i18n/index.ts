// src/i18n/index.ts

import type { Locale, LocaleMessages } from './types'
import { pt } from './types'
import en from './locales/en'
import es from './locales/es'

export type { Locale, LocaleMessages }

export const translations: Record<Locale, LocaleMessages> = {
  pt,
  en: en as LocaleMessages,
  es: es as LocaleMessages,
}
