import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Locale, type LocaleMessages } from '../i18n'

const STORAGE_KEY = 'squad-nexty-locale'

function readStoredLocale(): Locale {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s === 'pt' || s === 'en' || s === 'es') return s
  } catch {
    /* ignore */
  }
  return 'pt'
}

function htmlLang(locale: Locale): string {
  if (locale === 'pt') return 'pt-BR'
  if (locale === 'en') return 'en'
  return 'es'
}

type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string, vars?: Record<string, string | number>) => string
  dict: LocaleMessages
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((cur, key) => {
    if (cur && typeof cur === 'object' && key in cur) {
      return (cur as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== 'undefined' ? readStoredLocale() : 'pt',
  )

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = htmlLang(l)
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale)
  }, [locale])

  const dict = translations[locale]

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>): string => {
      const found = getByPath(dict, path)
      if (typeof found !== 'string') return path
      let out = found
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replaceAll(`{${k}}`, String(v))
        }
      }
      return out
    },
    [dict],
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, dict }),
    [locale, setLocale, t, dict],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
