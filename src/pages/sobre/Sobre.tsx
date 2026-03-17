// pages/Sobre.jsx
import React, { useEffect, useRef, useState } from 'react'
import {
  Code2,
  Layers,
  Wrench,
  Zap,
  Users,
  Award,
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

/* ── Dados configuráveis ─────────────────── */
const ANO_FUNDACAO = 2020
const ANO_ATUAL = new Date().getFullYear()
const ANOS_MERCADO = ANO_ATUAL - ANO_FUNDACAO

const SERVICOS = [
  {
    icon: <Layers size={28} />,
    titulo: 'Single Page Applications',
    descricao:
      'Desenvolvemos SPAs modernas com React, performance de ponta e experiência de usuário memorável. Do design ao deploy.',
    tags: ['React', 'Vite', 'TypeScript'],
  },
  {
    icon: <Wrench size={28} />,
    titulo: 'Manutenção de Código',
    descricao:
      'Refatoramos, otimizamos e mantemos projetos existentes. Seu código legado vira ativo estratégico — limpo, documentado e escalável.',
    tags: ['Refatoração', 'CI/CD', 'Testes'],
  },
  {
    icon: <Globe size={28} />,
    titulo: 'Landing Pages',
    descricao:
      'Páginas de alta conversão com carregamento rápido, SEO técnico e design responsivo que representam sua marca com precisão.',
    tags: ['SEO', 'Performance', 'Responsivo'],
  },
  {
    icon: <Shield size={28} />,
    titulo: 'Consultoria Técnica',
    descricao:
      'Auditoria de projetos, escolha de stack, arquitetura de frontend e mentoria para equipes de desenvolvimento.',
    tags: ['Arquitetura', 'Code Review', 'Stack'],
  },
]

const STATS = [
  { num: '80+', label: 'Projetos entregues' },
  { num: `${ANOS_MERCADO}+`, label: 'Anos no mercado' },
  { num: '100%', label: 'Clientes satisfeitos' },
  { num: '24h', label: 'Tempo de resposta' },
]

const EQUIPE = [
  {
    nome: 'Ana Silva',
    cargo: 'Dev Frontend & Fundadora',
    bio: 'Especialista em React e design systems. Transforma interfaces complexas em experiências simples.',
    img: null,
    social: { github: '#', linkedin: '#', twitter: '#' },
  },
  {
    nome: 'Carlos Santos',
    cargo: 'Engenheiro Full Stack',
    bio: 'Arquiteto de soluções com foco em performance e boas práticas. Obcecado por código limpo.',
    img: null,
    social: { github: '#', linkedin: '#', twitter: '#' },
  },
  {
    nome: 'Mariana Costa',
    cargo: 'UI/UX & Dev Frontend',
    bio: 'Une design centrado no usuário com código de qualidade. Especialista em acessibilidade.',
    img: null,
    social: { github: '#', linkedin: '#', twitter: '#' },
  },
]

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
]

const TIMELINE = [
  { ano: ANO_FUNDACAO, evento: 'Fundação da empresa com foco em SPAs React' },
  {
    ano: ANO_FUNDACAO + 1,
    evento: 'Primeiros 20 projetos entregues — base de clientes consolidada',
  },
  {
    ano: ANO_FUNDACAO + 2,
    evento: 'Expansão para manutenção e consultoria técnica',
  },
  {
    ano: ANO_FUNDACAO + 3,
    evento:
      'Equipe triplicou; adoção de TypeScript e testes em todos os projetos',
  },
  {
    ano: ANO_ATUAL,
    evento: 'Referência regional em desenvolvimento frontend de qualidade',
  },
]

/* ── Hook: contador animado ──────────────── */
function useCountUp(target, duration = 1200, trigger = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const num = parseInt(target)
    if (isNaN(num)) {
      setValue(target)
      return
    }
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(p * num))
      if (p < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, trigger])
  return value
}

/* ── Subcomponente: Stat ─────────────────── */
const Stat = ({ num, label, trigger }) => {
  const val = useCountUp(num, 1000, trigger)
  return (
    <div className="sb-stat">
      <span className="sb-stat__num">{val}</span>
      <span className="sb-stat__label">{label}</span>
    </div>
  )
}

/* ── Componente principal ────────────────── */
const Sobre = () => {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true)
      },
      { threshold: 0.3 },
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="sb-page">
      {/* ══ HERO ══════════════════════════════ */}
      <section className="sb-hero">
        <div className="sb-hero__bg" aria-hidden="true">
          <div className="sb-hero__grid" />
          <div className="sb-hero__glow sb-hero__glow--1" />
          <div className="sb-hero__glow sb-hero__glow--2" />
        </div>

        <div className="sb-hero__inner">
          <div className="sb-hero__badge">
            <Sparkles size={12} />
            Desde {ANO_FUNDACAO} · {ANOS_MERCADO} anos construindo a web
          </div>

          <h1 className="sb-hero__title">
            Código que
            <br />
            <em>funciona.</em>
            <br />
            Design que
            <br />
            <em>convence.</em>
          </h1>

          <p className="sb-hero__sub">
            Somos uma empresa especializada em criação de{' '}
            <strong>Single Page Applications</strong>, landing pages de alta
            conversão e manutenção de projetos existentes. Cada linha de código
            é escrita com intenção.
          </p>

          <div className="sb-hero__cta">
            <a href="/contato" className="sb-btn sb-btn--primary">
              Iniciar projeto <ArrowRight size={16} />
            </a>
            <a href="#servicos" className="sb-btn sb-btn--ghost">
              Nossos serviços <ChevronRight size={16} />
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
            <pre className="sb-code-card__body">{`// O que fazemos
const empresa = {
  foco: "Frontend de qualidade",
  desde: ${ANO_FUNDACAO},
  especialidades: [
    "Single Page Apps",
    "Manutenção de código",
    "Landing pages",
    "Consultoria técnica",
  ],
  stack: "React + TypeScript",
  entrega: "Sempre no prazo ✓",
}`}</pre>
          </div>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════ */}
      <section className="sb-stats" ref={statsRef}>
        {STATS.map((s, i) => (
          <Stat key={i} num={s.num} label={s.label} trigger={statsVisible} />
        ))}
      </section>

      {/* ══ SOBRE / HISTÓRIA ══════════════════ */}
      <section className="sb-about" id="sobre">
        <div className="sb-about__text">
          <span className="sb-label">Nossa história</span>
          <h2 className="sb-title">
            Nascemos para fazer
            <br />o <em>frontend direito</em>
          </h2>
          <p>
            Em <strong>{ANO_FUNDACAO}</strong>, cansados de ver projetos bem
            pensados sendo prejudicados por código descuidado, fundamos a
            empresa com uma missão clara: entregar frontend de qualidade real —
            performático, acessível, escalável e bonito.
          </p>
          <p>
            Hoje, {ANOS_MERCADO} anos depois, somos a equipe técnica de
            confiança de dezenas de empresas e startups que precisam de{' '}
            <strong>SPAs modernas</strong>, manutenção responsável de código
            existente ou uma landing page que realmente converte.
          </p>
          <p>
            Não terceirizamos. Não usamos templates genéricos. Cada projeto é
            construído do zero com atenção ao detalhe que faz a diferença.
          </p>

          <ul className="sb-about__checks">
            {[
              'Código documentado e testado',
              'Comunicação clara em todo o projeto',
              'Sem surpresas no prazo ou escopo',
              'Suporte pós-entrega incluso',
            ].map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="sb-timeline">
          <div className="sb-timeline__line" />
          {TIMELINE.map((t, i) => (
            <div
              key={i}
              className="sb-timeline__item"
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <div className="sb-timeline__dot">
                <Code2 size={12} />
              </div>
              <div className="sb-timeline__content">
                <span className="sb-timeline__year">{t.ano}</span>
                <p>{t.evento}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVIÇOS ══════════════════════════ */}
      <section className="sb-services" id="servicos">
        <div className="sb-services__header">
          <span className="sb-label">O que fazemos</span>
          <h2 className="sb-title">
            Serviços que <em>entregamos</em>
          </h2>
          <p className="sb-services__sub">
            Especialistas em frontend — sem achismos, com método e resultado.
          </p>
        </div>

        <div className="sb-services__grid">
          {SERVICOS.map((s, i) => (
            <div
              key={i}
              className="sb-service-card"
              style={{ '--delay': `${i * 0.08}s` }}
            >
              <div className="sb-service-card__icon">{s.icon}</div>
              <h3>{s.titulo}</h3>
              <p>{s.descricao}</p>
              <div className="sb-service-card__tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TECNOLOGIAS ═══════════════════════ */}
      <section className="sb-tech">
        <span className="sb-label">Nosso stack</span>
        <h2 className="sb-title">
          Ferramentas que <em>dominamos</em>
        </h2>
        <div className="sb-tech__grid">
          {TECNOLOGIAS.map((t) => (
            <div key={t} className="sb-tech__pill">
              <Zap size={12} />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ══ EQUIPE ════════════════════════════ */}
      <section className="sb-team" id="equipe">
        <div className="sb-team__header">
          <span className="sb-label">As pessoas por trás</span>
          <h2 className="sb-title">
            Nossa <em>equipe</em>
          </h2>
        </div>

        <div className="sb-team__grid">
          {EQUIPE.map((m, i) => (
            <div
              key={i}
              className="sb-member"
              style={{ '--delay': `${i * 0.1}s` }}
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
                  <a href={m.social.github} aria-label="GitHub">
                    {' '}
                    <Github size={16} />
                  </a>
                  <a href={m.social.linkedin} aria-label="LinkedIn">
                    {' '}
                    <Linkedin size={16} />
                  </a>
                  <a href={m.social.twitter} aria-label="Twitter">
                    {' '}
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════ */}
      <section className="sb-cta">
        <div className="sb-cta__inner">
          <div className="sb-cta__glow" aria-hidden="true" />
          <span className="sb-label sb-label--inv">Pronto para começar?</span>
          <h2>
            Vamos transformar sua ideia
            <br />
            em <em>código de verdade</em>
          </h2>
          <p>
            Conta pra gente o que você precisa. Respondemos em até 24 horas com
            uma proposta clara e sem enrolação.
          </p>
          <a href="/contato" className="sb-btn sb-btn--white">
            Falar com a equipe <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Sobre
