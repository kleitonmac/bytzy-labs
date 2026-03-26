import pt from './locales/pt'

export type Locale = 'pt' | 'en' | 'es'

// Transforma literais (ex.: "Início") em `string` genérico, evitando erros
// quando outros idiomas não repetem exatamente as mesmas strings do PT.
type WidenLiteral<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Array<infer U>
        ? WidenLiteral<U>[]
        : T extends object
          ? { [K in keyof T]: WidenLiteral<T[K]> }
          : T

export type LocaleMessages = WidenLiteral<typeof pt>

/** Para consumo direto do bundle PT */
export { pt }
