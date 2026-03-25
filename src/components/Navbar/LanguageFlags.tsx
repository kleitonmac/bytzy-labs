import type { Locale } from '../../i18n'

type Props = {
  locale: Locale
  onChange: (l: Locale) => void
  /** Títulos acessíveis por idioma (ex.: useLanguage().t) */
  labels?: Record<Locale, string>
}

const ITEMS: Array<{
  locale: Locale
  label: string
  flagClass: string
}> = [
  { locale: 'pt', label: 'PT-BR', flagClass: 'fi fi-br' },
  { locale: 'en', label: 'EN', flagClass: 'fi fi-us' },
  { locale: 'es', label: 'ES', flagClass: 'fi fi-es' },
]

export function LanguageFlags({ locale, onChange, labels }: Props) {
  return (
    <div className="langFlags" role="group" aria-label="Language / Idioma">
      {ITEMS.map(({ locale: loc, label, flagClass }) => (
        <button
          key={loc}
          type="button"
          className="langFlagBtn"
          data-active={locale === loc ? 'true' : 'false'}
          onClick={() => onChange(loc)}
          title={labels?.[loc] ?? label}
          aria-label={labels?.[loc] ?? label}
          aria-pressed={locale === loc}
        >
          <span className={flagClass} />
        </button>
      ))}
    </div>
  )
}
