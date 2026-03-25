import pt from './locales/pt'

export type Locale = 'pt' | 'en' | 'es'

export type LocaleMessages = typeof pt

/** Para consumo direto do bundle PT sem importar `locales/pt` duas vezes */
export { pt }
