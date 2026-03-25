// src/components/Navbar/Navbar.tsx
import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { LanguageFlags } from './LanguageFlags'

export default function Navbar() {
  const { user } = useAuth()
  const { t, locale, setLocale } = useLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links = useMemo(
    () => [
      { path: '/', label: t('nav.home') },
      { path: '/sobre', label: t('nav.about') },
      { path: '/contato', label: t('nav.contact') },
    
  ], [t])

  const langLabels = useMemo(
    () => ({
      pt: t('nav.langPt'),
      en: t('nav.langEn'),
      es: t('nav.langEs'),
    }),
    [t],
  )

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={styles.navbarContainer}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <nav className={styles.navbar}>
        {/* 🔥 Logo */}
        <Link to="/" className={styles.navbarLogo}>
          <img src={logo} alt="Squad Nexty" style={{ width: 30, height: 30 }} />
          <span className={styles.logoText}>Squad Nexty</span>
        </Link>

        {/* 🔗 Links desktop */}
        <div className={styles.navbarLinks}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.active : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ⚙️ Ações */}
        <div className={styles.navbarActions}>
          {/* 🌍 Idiomas desktop */}
          <div className={styles.navbarLang}>
            <LanguageFlags
              locale={locale}
              onChange={setLocale}
              labels={langLabels}
            />
          </div>

          {/* 👤 Usuário */}
          {user && (
            <Link
              to={user.role === 'funcionario' ? '/colaborador' : '/admin'}
              className={styles.loginBtn}
            >
              {user.nome}
            </Link>
          )}

          {/* ☰ Menu */}
          <button
            className={styles.menuBtn}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className={styles.mobileMenu}>
          {/* 🔗 Links */}
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={styles.mobileLink}
            >
              {link.label}
            </Link>
          ))}

          {/* 👤 Área do usuário */}
          {user && (
            <Link
              to={user.role === 'funcionario' ? '/colaborador' : '/admin'}
              onClick={() => setOpen(false)}
              className={styles.mobileLogin}
            >
              {t('nav.userArea')}
            </Link>
          )}

          {/* 🌍 Idioma (embaixo - profissional) */}
          <div className={styles.mobileLang}>
            <p className={styles.mobileLangFlag}>{t('nav.selectLanguage')}</p>
            <LanguageFlags
              locale={locale}
              onChange={setLocale}
              labels={langLabels}
            />
          </div>
        </div>
      )}
    </header>
  )
}
