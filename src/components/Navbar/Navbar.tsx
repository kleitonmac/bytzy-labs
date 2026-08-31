import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa6'
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
    ],
    [t],
  )

  const langLabels = useMemo(
    () => ({
      pt: t('nav.langPt'),
      en: t('nav.langEn'),
      es: t('nav.langEs'),
    }),
    [t],
  )

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

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
        <Link to="/" className={styles.navbarLogo}>
          <img src={logo} alt="Consulting LM" style={{ width: 30, height: 30 }} />
          <span className={styles.logoText}>Consulting LM</span>
        </Link>

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
          <div className={styles.navbarLang}>
            <span className={styles.langLabel}>{t('nav.languageSection')}</span>
            <LanguageFlags
              locale={locale}
              onChange={setLocale}
              labels={langLabels}
            />
          </div>
        </div>

        <div className={styles.navbarActions}>
          <div className={styles.navbarLangDesktop}>
            <span className={styles.langLabel}>{t('nav.languageSection')}</span>
            <LanguageFlags
              locale={locale}
              onChange={setLocale}
              labels={langLabels}
            />
          </div>
          {user && (
            <Link
              to={user.role === 'funcionario' ? '/colaborador' : '/admin'}
              className={styles.loginBtn}
            >
              {user.nome}
            </Link>
          )}
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        className={`${styles.drawerOverlay} ${open ? styles.drawerOpen : ''}`}
        onClick={() => setOpen(false)}
      />

      <div className={`${styles.drawerPanel} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <Link
            to="/"
            className={styles.drawerLogo}
            onClick={() => setOpen(false)}
          >
            <img src={logo} alt="Consulting LM" style={{ width: 30, height: 30 }} />
            <span className={styles.drawerLogoText}>Consulting LM</span>
          </Link>
          <button
            type="button"
            className={styles.drawerCloseBtn}
            onClick={() => setOpen(false)}
            aria-label={t('nav.closeMenu')}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.drawerContent}>
          <div className={styles.drawerLang}>
            <span className={styles.drawerSectionTitle}>
              {t('nav.languageSection')}
            </span>
            <LanguageFlags
              locale={locale}
              onChange={setLocale}
              labels={langLabels}
            />
          </div>

          <div className={styles.drawerNavLinks}>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`${styles.drawerNavLink} ${
                  location.pathname === link.path ? styles.drawerActive : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {user && (
            <Link
              to={user.role === 'funcionario' ? '/colaborador' : '/admin'}
              onClick={() => setOpen(false)}
              className={styles.drawerLogin}
            >
              {t('nav.userArea')}
            </Link>
          )}

          <div className={styles.drawerDivider} />

          <div className={styles.drawerSocialsSection}>
            <h4 className={styles.drawerSectionTitle}>
              {t('contato.sideTitle')}
            </h4>
            <div className={styles.drawerSocialLinks}>
              <a
                href={`https://wa.me/5527981911375?text=${encodeURIComponent(
                  t('contato.whatsappMsg'),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.drawerSocialItem} ${styles.drawerWhatsapp}`}
              >
                <FaWhatsapp size={20} />
                <div className={styles.drawerSocialInfo}>
                  <span className={styles.drawerSocialLabel}>WhatsApp</span>
                  <span className={styles.drawerSocialValue}>
                    +55 (27) 98191-1375
                  </span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/squadnexty"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.drawerSocialItem} ${styles.drawerInstagram}`}
              >
                <FaInstagram size={20} />
                <div className={styles.drawerSocialInfo}>
                  <span className={styles.drawerSocialLabel}>Instagram</span>
                  <span className={styles.drawerSocialValue}>@squadnexty</span>
                </div>
              </a>

              <a
                href="mailto:contatoconsultinglm@gmail.com"
                className={`${styles.drawerSocialItem} ${styles.drawerEmail}`}
              >
                <FaEnvelope size={20} />
                <div className={styles.drawerSocialInfo}>
                  <span className={styles.drawerSocialLabel}>E-mail</span>
                  <span className={styles.drawerSocialValue}>
                    contatoconsultinglm@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
