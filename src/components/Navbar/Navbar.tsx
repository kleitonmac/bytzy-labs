// src/components/Navbar/Navbar.tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/logo.png'
const links = [
  { path: '/', label: 'Início' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* Fecha menu ao trocar de rota */
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  /* Detecta scroll para ativar backdrop */
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
        {/* ── Logo ── */}
        <Link to="/" className={styles.navbarLogo}>
         <img src={logo} alt="Squad Nexty" style={{ width: 30, height: 30 }} />
          <span className={styles.logoText}>Squad Nexty</span>
        </Link>
        {/* ── Links desktop ── */}
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

        {/* ── Ações ── */}
        <div className={styles.navbarActions}>
          <Link to="/login" className={styles.loginBtn}>
            Entrar
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── Menu mobile ── */}
      {open && (
        <div className={styles.mobileMenu}>
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
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className={styles.mobileLogin}
          >
            Entrar
          </Link>
        </div>
      )}
    </header>
  )
}
