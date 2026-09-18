import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import video from '../../assets/hero-video.mp4'
import { IoRocketOutline } from 'react-icons/io5'
import { CiLock } from 'react-icons/ci'
import { CgBolt } from 'react-icons/cg'
import { FaChartColumn } from 'react-icons/fa6'
import { useLanguage } from '../../context/LanguageContext'

const PARCEIROS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Vite',

  // Mobile
  'React Native',
  'Expo',

  // Back-end
  'Node.js',
  'NestJS',
  'Express',

  // Banco de dados
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Prisma',
  'Supabase',

  // Cloud / Infra
  'AWS',
  'Vercel',
  'Cloudflare',
  'Docker',
  'Neon',

  // APIs / Serviços
  'Stripe',
  'Firebase',
  'Mapbox',
  'Socket.IO',

  // Desenvolvimento / Design
  'GitHub',
  'Git',
  'Figma',
  'Postman',]

export default function Home() {
  const { t } = useLanguage()

  const NUMEROS = useMemo(
    () => [
      { valor: '99.9%', rotulo: t('home.metricUptime') },
      { valor: '< 1s', rotulo: t('home.metricLoad') },
      { valor: '80+', rotulo: t('home.metricProjects') },
      { valor: '24/7', rotulo: t('home.metricSupport') },
    ],
    [t],
  )

  const DIFERENCIAIS = useMemo(
    () => [
      {
        icone: <CgBolt size={32} className="text-blue-500" />,
        titulo: t('home.diffPerfTitle'),
        desc: t('home.diffPerfDesc'),
      },
      {
        icone: <CiLock size={32} className="text-red-500" />,
        titulo: t('home.diffSecTitle'),
        desc: t('home.diffSecDesc'),
      },
      {
        icone: <IoRocketOutline size={32} className="text-blue-500" />,
        titulo: t('home.diffDeployTitle'),
        desc: t('home.diffDeployDesc'),
      },
      {
        icone: <FaChartColumn size={32} className="text-red-500" />,
        titulo: t('home.diffDataTitle'),
        desc: t('home.diffDataDesc'),
      },
    ],
    [t],
  )

  return (
    <main className="home">
      <section className="hero">
        <video className="hero__video" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero__overlay hero__overlay--base" aria-hidden="true" />
        <div
          className="hero__overlay hero__overlay--vignette"
          aria-hidden="true"
        />
        <div
          className="hero__overlay hero__overlay--grain"
          aria-hidden="true"
        />
        <div
          className="hero__overlay hero__overlay--bottom"
          aria-hidden="true"
        />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {t('home.badge')}
          </div>
          <h1 className="hero__title">
            {t('home.titleLine1')}
            <em>{t('home.titleEm')}</em>
            {t('home.titleLine2')}
          </h1>
          <p className="hero__sub">{t('home.sub')}</p>
          <div className="hero__actions">
            <Link to="/contato" className="hero__btn hero__btn--primary">
              {t('home.ctaPrimary')}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/sobre" className="hero__btn hero__btn--ghost">
              {t('home.ctaGhost')}
            </Link>
          </div>
          <div className="hero__metrics">
            {NUMEROS.map((n) => (
              <div key={n.rotulo} className="hero__metric">
                <span className="hero__metric-val">{n.valor}</span>
                <span className="hero__metric-label">{n.rotulo}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className="parceiros">
        <p className="parceiros__label">{t('home.partnersLabel')}</p>
        <div className="parceiros__track">
          {[...PARCEIROS, ...PARCEIROS].map((p, i) => (
            <span key={i} className="parceiros__item">
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="features__header">
          <span className="section-label">{t('home.featuresEyebrow')}</span>
          <h2 className="section-title">
            {t('home.featuresTitleLine1')}
            <em>{t('home.featuresTitleEm')}</em>
          </h2>
          <p className="section-sub">{t('home.featuresSub')}</p>
        </div>
        <div className="features__grid">
          {DIFERENCIAIS.map((d, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="feature-card__icon">{d.icone}</span>
              <h3>{d.titulo}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-final__inner">
          <span className="section-label section-label--light">
            {t('home.ctaEyebrow')}
          </span>
          <h2>
            {t('home.ctaTitleLine1')}
            <br />
            <em>{t('home.ctaTitleEm')}</em>
          </h2>
          <p>{t('home.ctaSub')}</p>
          <Link to="/contato" className="hero__btn hero__btn--primary">
            {t('home.ctaButton')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
