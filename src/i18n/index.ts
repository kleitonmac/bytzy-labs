import type { Locale, LocaleMessages } from './types'
import { pt } from './types'
import en from './locales/en'
import es from './locales/es'

export type { Locale, LocaleMessages } from './types'

export const translations: Record<Locale, LocaleMessages> = { pt, en, es }
