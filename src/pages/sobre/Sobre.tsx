import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Layers,
  Wrench,
  Zap,
  ArrowRight,
  Globe,
  Shield,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react'
import './Sobre.modules.css'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const ANO_FUNDACAO = 2020
const ANO_ATUAL = new Date().getFullYear()
const ANOS_MERCADO = ANO_ATUAL - ANO_FUNDACAO

const TECNOLOGIAS = [
  'React',
  'TypeScript',
  'Vite',
  'Next.js',
  'Node.js',
  'TailwindCSS',
  'Figma',
  'Git',
  'Vercel',
  'Jest',
  'Storybook',
  'PostgreSQL',
] as const

type CountTarget = string | number

function useCountUp(
  target: CountTarget,
  duration: number = 1200,
  trigger: boolean = false,
): CountTarget {
  const [value, setValue] = useState<CountTarget>(0)

  useEffect(() => {
    if (!trigger) return

    const num = parseInt(String(target))
    if (isNaN(num)) {
      setValue(target)
      return
    }

    let start: number | null = null

    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * num))

      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }

    requestAnimationFrame(step)
  }, [target, duration, trigger])

  return value
}

interface StatProps {
  num: string
  label: string
  trigger: boolean
}

const Stat = ({ num, label, trigger }: StatProps) => {
  const val = useCountUp(num, 1000, trigger)
  return (
    <div className="sb-stat">
      <span className="sb-stat__num">{val}</span>
      <span className="sb-stat__label">{label}</span>
    </div>
  )
}

const Sobre = () => {
  const { t } = useLanguage()
  const statsRef = useRef<HTMLDivElement | null>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  const SERVICOS = useMemo<
    Array<{
      icon: LucideIcon
      titulo: string
      descricao: string
      tags: string[]
    }>
  >(
    () => [
      {
        icon: Layers,
        titulo: t('sobre.servico1t'),
        descricao: t('sobre.servico1d'),
        tags: ['React', 'Vite', 'TypeScript'],
      },
      {
        icon: Wrench,
        titulo: t('sobre.servico2t'),
        descricao: t('sobre.servico2d'),
        tags: [t('sobre.tagRefactor'), t('sobre.tagCicd'), t('sobre.tagTests')],
      },
      {
        icon: Globe,
        titulo: t('sobre.servico3t'),
        descricao: t('sobre.servico3d'),
        tags: [t('sobre.tagSeo'), t('sobre.tagPerf'), t('sobre.tagResp')],
      },
      {
        icon: Shield,
        titulo: t('sobre.servico4t'),
        descricao: t('sobre.servico4d'),
        tags: [t('sobre.tagArch'), t('sobre.tagReview'), t('sobre.tagStack')],
      },
    ],
    [t],
  )

  const STATS = useMemo(
    () => [
      { num: '80+', label: t('sobre.statProjects') },
      { num: `${ANOS_MERCADO}+`, label: t('sobre.statYears') },
      { num: '100%', label: t('sobre.statClients') },
      { num: '24h', label: t('sobre.statResponse') },
    ],
    [t],
  )

  const TIMELINE = useMemo(
    () =>
      [
        { ano: ANO_FUNDACAO, key: 'timeline1' as const },
        { ano: ANO_FUNDACAO + 1, key: 'timeline2' as const },
        { ano: ANO_FUNDACAO + 2, key: 'timeline3' as const },
        { ano: ANO_FUNDACAO + 3, key: 'timeline4' as const },
        { ano: ANO_ATUAL, key: 'timeline5' as const },
      ].map((row) => ({
        ano: row.ano,
        evento: t(`sobre.${row.key}`),
      })),
    [t],
  )

  const EQUIPE = useMemo(
    () => [
      {
        nome: 'Ana Silva',
        cargo: t('sobre.member1role'),
        bio: t('sobre.member1bio'),
        img: null as string | null,
        social: { github: '#', linkedin: '#', twitter: '#' },
      },
      {
        nome: 'Carlos Santos',
        cargo: t('sobre.member2role'),
        bio: t('sobre.member2bio'),
        img: null as string | null,
        social: { github: '#', linkedin: '#', twitter: '#' },
      },
      {
        nome: 'Mariana Costa',
        cargo: t('sobre.member3role'),
        bio: t('sobre.member3bio'),
        img: null as string | null,
        social: { github: '#', linkedin: '#', twitter: '#' },
      },
    ],
    [t],
  )

  const codeSnippet = useMemo(
    () => `// ${t('sobre.codeComment')}
const empresa = {
  foco: "${t('sobre.codeFoco')}",
  desde: ${ANO_FUNDACAO},
  especialidades: [
    "${t('sobre.codeEsp1')}",
    "${t('sobre.codeEsp2')}",
    "${t('sobre.codeEsp3')}",
    "${t('sobre.codeEsp4')}",
  ],
  stack: "${t('sobre.codeStack')}",
  entrega: "${t('sobre.codeEntrega')}",
}`,
    [t],
  )

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0]
        if (entry.isIntersecting) setStatsVisible(true)
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="sb-page">
      <section className="sb-hero">
        <div className="sb-hero__bg" aria-hidden="true">
          <div className="sb-hero__grid" />
          <div className="sb-hero__glow sb-hero__glow--1" />
          <div className="sb-hero__glow sb-hero__glow--2" />
        </div>

        <div className="sb-hero__inner">
          <div className="sb-hero__badge">
            <Sparkles size={12} />{' '}
            {t('sobre.heroBadge', { year: ANO_FUNDACAO, years: ANOS_MERCADO })}
          </div>

          <h1 className="sb-hero__title">
            {t('sobre.heroTitle1')}
            <br />
            <em>{t('sobre.heroEm1')}</em> <br />
            {t('sobre.heroTitle2')}
            <br />
            <em>{t('sobre.heroEm2')}</em>
          </h1>

          <p className="sb-hero__sub">{t('sobre.heroSub')}</p>

          <div className="sb-hero__cta">
            <Link to="/contato" className="sb-btn sb-btn--primary">
              {t('sobre.ctaStart')} <ArrowRight size={16} />
            </Link>
            <a href="#servicos" className="sb-btn sb-btn--ghost">
              {t('sobre.ctaServices')} <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div className="sb-hero__code" aria-hidden="true">
          <div className="sb-code-card">
            <div className="sb-code-card__dots">
              <span />
              <span />
              <span />
            </div>
            <pre className="sb-code-card__body">{codeSnippet}</pre>
          </div>
        </div>
      </section>

      <section className="sb-stats" ref={statsRef}>
        {STATS.map((s, i) => (
          <Stat key={i} {...s} trigger={statsVisible} />
        ))}
      </section>

      <section className="sb-about" id="sobre">
        <div className="sb-about__text">
          <span className="sb-label">{t('sobre.aboutLabel')}</span>
          <h2 className="sb-title">
            {t('sobre.aboutTitle1')}
            <br />
            <em>{t('sobre.aboutTitleEm')}</em>
          </h2>
          <p>{t('sobre.aboutP1', { year: ANO_FUNDACAO })}</p>
          <p>{t('sobre.aboutP2', { years: ANOS_MERCADO })}</p>
          <ul className="sb-about__checks">
            {[
              t('sobre.check1'),
              t('sobre.check2'),
              t('sobre.check3'),
              t('sobre.check4'),
            ].map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="sb-timeline">
          <div className="sb-timeline__line" />
          {TIMELINE.map((row, i) => (
            <div
              key={i}
              className="sb-timeline__item"
              style={
                {
                  animationDelay: `${i * 0.1}s`,
                } as React.CSSProperties
              }
            >
              <div className="sb-timeline__dot">
                <Code2 size={12} />
              </div>
              <div className="sb-timeline__content">
                <span className="sb-timeline__year">{row.ano}</span>
                <p>{row.evento}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sb-services" id="servicos">
        <div className="sb-services__header">
          <span className="sb-label">{t('sobre.servicesLabel')}</span>
          <h2 className="sb-title">
            {t('sobre.servicesTitle1')}
            <em>{t('sobre.servicesTitleEm')}</em>
          </h2>
        </div>

        <div className="sb-services__grid">
          {SERVICOS.map((s, i) => (
            <div
              key={i}
              className="sb-service-card"
              style={
                {
                  animationDelay: `${i * 0.08}s`,
                } as React.CSSProperties
              }
            >
              <div className="sb-service-card__icon">
                <s.icon size={28} />
              </div>
              <h3>{s.titulo}</h3>
              <p>{s.descricao}</p>
              <div className="sb-service-card__tags">
                {s.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sb-tech">
        <span className="sb-label">{t('sobre.techLabel')}</span>
        <h2 className="sb-title">
          {t('sobre.techTitle1')}
          <em>{t('sobre.techTitleEm')}</em>
        </h2>
        <div className="sb-tech__grid">
          {TECNOLOGIAS.map((tech) => (
            <div key={tech} className="sb-tech__pill">
              <Zap size={12} /> {tech}
            </div>
          ))}
        </div>
      </section>

      <section className="sb-team" id="equipe">
        <div className="sb-team__header">
          <span className="sb-label">{t('sobre.teamLabel')}</span>
          <h2 className="sb-title">
            {t('sobre.teamTitle1')}
            <em>{t('sobre.teamTitleEm')}</em>
          </h2>
        </div>

        <div className="sb-team__grid">
          {EQUIPE.map((m, i) => (
            <div
              key={i}
              className="sb-member"
              style={
                {
                  animationDelay: `${i * 0.1}s`,
                } as React.CSSProperties
              }
            >
              <div className="sb-member__avatar">
                {m.img ? (
                  <img src={m.img} alt={m.nome} />
                ) : (
                  <span>
                    {m.nome
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                )}
              </div>
              <div className="sb-member__info">
                <h3>{m.nome}</h3>
                <span className="sb-member__cargo">{m.cargo}</span>
                <p>{m.bio}</p>
                <div className="sb-member__social">
                  <a href={m.social.github}>
                    <Github size={16} />
                  </a>
                  <a href={m.social.linkedin}>
                    <Linkedin size={16} />
                  </a>
                  <a href={m.social.twitter}>
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sb-cta">
        <div className="sb-cta__inner">
          <div className="sb-cta__glow" />
          <span className="sb-label sb-label--inv">{t('sobre.ctaEyebrow')}</span>
          <h2>
            {t('sobre.ctaTitle1')}
            <br />
            <em>{t('sobre.ctaTitleEm')}</em>
          </h2>
          <p>{t('sobre.ctaSub')}</p>
          <Link to="/contato" className="sb-btn sb-btn--primary">
            {t('sobre.ctaButton')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Sobre
