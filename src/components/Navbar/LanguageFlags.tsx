import type { Locale } from '../../i18n'

type Props = {
  locale: Locale
  onChange: (l: Locale) => void
  /** Títulos acessíveis por idioma (ex.: useLanguage().t) */
  labels?: Record<Locale, string>
}

function FlagBR() {
  return (
    <svg viewBox="0 0 24 18" width={22} height={16} aria-hidden>
      <rect width="24" height="18" rx="2" fill="#009b3a" />
      <path d="M12 2.5l9.2 6.5L12 15.5 2.8 9z" fill="#ffdf00" />
      <circle cx="12" cy="9" r="3.4" fill="#002776" />
    </svg>
  )
}

function FlagUS() {
  return (
    <svg viewBox="0 0 24 18" width={22} height={16} aria-hidden>
      <rect width="24" height="18" rx="2" fill="#b22234" />
      <path
        fill="#fff"
        d="M0 2h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z"
      />
      <rect width="10" height="10" fill="#3c3b6e" rx="1" />
    </svg>
  )
}

function FlagES() {
  return (
    <svg viewBox="0 0 24 18" width={22} height={16} aria-hidden>
      <rect width="24" height="18" rx="2" fill="#c60b1e" />
      <rect y="4.5" width="24" height="9" fill="#ffc400" />
    </svg>
  )
}

const ITEMS: Array<{
  locale: Locale
  label: string
  Flag: typeof FlagBR
}> = [
  { locale: 'pt', label: 'PT-BR', Flag: FlagBR },
  { locale: 'en', label: 'EN', Flag: FlagUS },
  { locale: 'es', label: 'ES', Flag: FlagES },
]

export function LanguageFlags({ locale, onChange, labels }: Props) {
  return (
    <div className="langFlags" role="group" aria-label="Language / Idioma">
      {ITEMS.map(({ locale: loc, label, Flag }) => (
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
          <Flag />
        </button>
      ))}
    </div>
  )
}
