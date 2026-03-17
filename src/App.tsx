// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import video from './assets/hero-video.mp4'
import Login from './pages/loguin/Login'
import Sobre from './pages/sobre/Sobre'
import Contato from './pages/contato/Contato'
import './App.css'

import { IoRocketOutline } from 'react-icons/io5'
import { CiLock } from 'react-icons/ci'
import { CgBolt } from 'react-icons/cg'
import { FaChartColumn } from 'react-icons/fa6'

/* ── Logos / parceiros ── */
const PARCEIROS = ['Vercel', 'Supabase', 'AWS', 'Stripe', 'Figma', 'GitHub']

/* ── Diferenciais ── */
const DIFERENCIAIS = [
  {
    icone: <CgBolt size={32} className="text-blue-500" />,
    titulo: 'Performance Real',
    desc: 'Arquitetura otimizada para carregar em menos de 1 segundo, em qualquer dispositivo.',
  },
  {
    icone: <CiLock size={32} className="text-red-500" />,
    titulo: 'Segurança de Ponta',
    desc: 'Infraestrutura com criptografia end-to-end e conformidade com LGPD.',
  },
  {
    icone: <IoRocketOutline size={32} className="text-blue-500" />,
    titulo: 'Deploy Contínuo',
    desc: 'CI/CD integrado. Cada atualização vai ao ar de forma automática e sem downtime.',
  },
  {
    icone: <FaChartColumn size={32} className="text-red-500" />,
    titulo: 'Dados em Tempo Real',
    desc: 'Dashboards e métricas atualizados ao vivo para decisões mais inteligentes.',
  },
]

/* ── Números ── */
const NUMEROS = [
  { valor: '99.9%', rotulo: 'Uptime garantido' },
  { valor: '< 1s', rotulo: 'Tempo de carga' },
  { valor: '80+', rotulo: 'Projetos entregues' },
  { valor: '24/7', rotulo: 'Suporte ativo' },
]

function Home() {
  return (
    <main className="home">
      {/* ══ HERO com vídeo ══════════════════════ */}
      <section className="hero">
        {/* Vídeo de fundo */}
        <video className="hero__video" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>

        {/* Camadas de overlay */}
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

        {/* Conteúdo */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Novo: Integração com IA generativa disponível
          </div>

          <h1 className="hero__title">
            Tecnologia que <em>transforma</em> negócios reais.
          </h1>

          <p className="hero__sub">
            Desenvolvemos soluções digitais de alto desempenho — das single
            pages ao sistemas completos. Seu projeto, nossa obsessão por
            qualidade.
          </p>

          <div className="hero__actions">
            <Link to="/contato" className="hero__btn hero__btn--primary">
              Começar agora
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
              Conheça a empresa
            </Link>
          </div>

          {/* Métricas rápidas no hero */}
          <div className="hero__metrics">
            {NUMEROS.map((n) => (
              <div key={n.rotulo} className="hero__metric">
                <span className="hero__metric-val">{n.valor}</span>
                <span className="hero__metric-label">{n.rotulo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ══ PARCEIROS ═══════════════════════════ */}
      <section className="parceiros">
        <p className="parceiros__label">Tecnologias que utilizamos</p>
        <div className="parceiros__track">
          {[...PARCEIROS, ...PARCEIROS].map((p, i) => (
            <span key={i} className="parceiros__item">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ══ DIFERENCIAIS ════════════════════════ */}
      <section className="features">
        <div className="features__header">
          <span className="section-label">Por que nos escolher</span>
          <h2 className="section-title">
            Construído para <em>performance</em>
          </h2>
          <p className="section-sub">
            Cada decisão técnica é tomada pensando em escala, velocidade e
            experiência do usuário final.
          </p>
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

      {/* ══ CTA FINAL ═══════════════════════════ */}
      <section className="cta-final">
        <div className="cta-final__inner">
          <span className="section-label section-label--light">
            Pronto para começar?
          </span>
          <h2>
            Vamos construir algo
            <br />
            <em>extraordinário juntos</em>
          </h2>
          <p>
            Conte seu projeto. Respondemos em até 24h com uma proposta clara.
          </p>
          <Link to="/contato" className="hero__btn hero__btn--primary">
            Falar com nossa equipe
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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
