import { useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  User,
  Building,
  CheckCircle,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react'
import './Contato.css'

// ✅ TIPOS
type FormContato = {
  nome: string
  email: string
  empresa: string
  assunto: string
  mensagem: string
}

type Errors = Partial<Record<keyof FormContato, string>>

// WhatsApp Icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// Config
const CONFIG = {
  whatsapp: '5527999990000',
  whatsappMsg: 'Olá! Vim pelo site e gostaria de mais informações.',
  email: 'contato@empresa.com.br',
  telefone: '+55 (27) 99999-0000',
  endereco: 'Serra, Espírito Santo — Brasil',
}

const ASSUNTOS = [
  'Orçamento / Proposta',
  'Suporte técnico',
  'Parceria comercial',
  'Dúvida geral',
  'Outro',
]

const Contato = () => {
  const [formData, setFormData] = useState<FormContato>({
    nome: '',
    email: '',
    empresa: '',
    assunto: '',
    mensagem: '',
  })

  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const validate = (): Errors => {
    const e: Errors = {}

    if (!formData.nome.trim()) e.nome = 'Informe seu nome'
    if (!formData.email.trim()) e.email = 'Informe seu e-mail'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'E-mail inválido'

    if (!formData.assunto) e.assunto = 'Escolha um assunto'
    if (!formData.mensagem.trim()) e.mensagem = 'Escreva sua mensagem'

    return e
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof FormContato]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errs = validate()

    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setEnviando(true)

    setTimeout(() => {
      console.log('Formulário:', formData)

      setEnviando(false)
      setEnviado(true)

      setFormData({
        nome: '',
        email: '',
        empresa: '',
        assunto: '',
        mensagem: '',
      })

      setTimeout(() => setEnviado(false), 6000)
    }, 1400)
  }

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`

  return (
    <div className="ct-page">
      {/* ── Hero header ── */}
      <header className="ct-hero">
        <div className="ct-hero__inner">
          <span className="ct-eyebrow">Entre em contato</span>
          <h1 className="ct-title">
            Vamos construir
            <br />
            <em>algo juntos?</em>
          </h1>
          <p className="ct-lead">
            Seja um projeto, dúvida ou parceria — nossa equipe responde em
            até&nbsp;<strong>24 horas</strong>.
          </p>

          {/* Atalhos rápidos */}
          <div className="ct-quick">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-quick__btn ct-quick__btn--wa"
            >
              <WhatsAppIcon />
              Chamar no WhatsApp
              <ExternalLink size={14} />
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="ct-quick__btn ct-quick__btn--mail"
            >
              <Mail size={18} />
              Enviar e-mail direto
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="ct-hero__deco" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      {/* ── Grid: info + formulário ── */}
      <main className="ct-main">
        {/* Coluna lateral — informações */}
        <aside className="ct-info">
          <div className="ct-info__card">
            <h2 className="ct-section-title">Fale diretamente</h2>

            <div className="ct-channels">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-channel ct-channel--wa"
              >
                <div className="ct-channel__icon">
                  <WhatsAppIcon />
                </div>
                <div className="ct-channel__body">
                  <strong>WhatsApp</strong>
                  <span>{CONFIG.telefone}</span>
                  <em>Resposta rápida · seg–sáb</em>
                </div>
                <ArrowRight size={16} className="ct-channel__arrow" />
              </a>

              <a
                href={`mailto:${CONFIG.email}`}
                className="ct-channel ct-channel--mail"
              >
                <div className="ct-channel__icon">
                  <Mail size={20} />
                </div>
                <div className="ct-channel__body">
                  <strong>E-mail</strong>
                  <span>{CONFIG.email}</span>
                  <em>Resposta em até 24h</em>
                </div>
                <ArrowRight size={16} className="ct-channel__arrow" />
              </a>

              <div className="ct-channel ct-channel--phone">
                <div className="ct-channel__icon">
                  <Phone size={20} />
                </div>
                <div className="ct-channel__body">
                  <strong>Telefone</strong>
                  <span>{CONFIG.telefone}</span>
                  <em>Horário comercial</em>
                </div>
              </div>

              <div className="ct-channel ct-channel--addr">
                <div className="ct-channel__icon">
                  <MapPin size={20} />
                </div>
                <div className="ct-channel__body">
                  <strong>Localização</strong>
                  <span>{CONFIG.endereco}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horários */}
          <div className="ct-info__card ct-hours">
            <h2 className="ct-section-title">
              <Clock size={15} /> Atendimento
            </h2>
            <ul className="ct-hours__list">
              <li>
                <span>Segunda – Sexta</span>
                <strong>09:00 – 18:00</strong>
              </li>
              <li>
                <span>Sábado</span>
                <strong>09:00 – 13:00</strong>
              </li>
              <li className="ct-hours__off">
                <span>Domingo</span>
                <strong>Fechado</strong>
              </li>
              <li className="ct-hours__off">
                <span>Feriados</span>
                <strong>Fechado</strong>
              </li>
            </ul>
            <div className="ct-hours__badge">
              <span className="ct-dot" />
              Online agora
            </div>
          </div>
        </aside>

        {/* Formulário completo */}
        <section className="ct-form-wrap">
          <div className="ct-form-card">
            <h2 className="ct-section-title">Envie uma mensagem</h2>
            <p className="ct-form-sub">
              Preencha o formulário e retornaremos o quanto antes.
            </p>

            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-row">
                <div
                  className={`ct-field ${errors.nome ? 'ct-field--error' : ''}`}
                >
                  <label htmlFor="nome">
                    <User size={13} /> Nome completo{' '}
                    <abbr title="obrigatório">*</abbr>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.nome && (
                    <span className="ct-field__err">{errors.nome}</span>
                  )}
                </div>

                <div
                  className={`ct-field ${errors.email ? 'ct-field--error' : ''}`}
                >
                  <label htmlFor="email">
                    <Mail size={13} /> E-mail <abbr title="obrigatório">*</abbr>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="ct-field__err">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="empresa">
                    <Building size={13} /> Empresa{' '}
                    <span className="ct-optional">(opcional)</span>
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>

                <div
                  className={`ct-field ${errors.assunto ? 'ct-field--error' : ''}`}
                >
                  <label htmlFor="assunto">
                    <MessageSquare size={13} /> Assunto{' '}
                    <abbr title="obrigatório">*</abbr>
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                  >
                    <option value="">Selecione...</option>
                    {ASSUNTOS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  {errors.assunto && (
                    <span className="ct-field__err">{errors.assunto}</span>
                  )}
                </div>
              </div>

              <div
                className={`ct-field ${errors.mensagem ? 'ct-field--error' : ''}`}
              >
                <label htmlFor="mensagem">
                  <MessageSquare size={13} /> Mensagem{' '}
                  <abbr title="obrigatório">*</abbr>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  placeholder="Descreva seu projeto, dúvida ou proposta..."
                  value={formData.mensagem}
                  onChange={handleChange}
                />
                <div className="ct-char">
                  {formData.mensagem.length} caracteres
                </div>
                {errors.mensagem && (
                  <span className="ct-field__err">{errors.mensagem}</span>
                )}
              </div>

              <div className="ct-form__footer">
                <p className="ct-privacy">
                  🔒 Seus dados são tratados com segurança e nunca
                  compartilhados.
                </p>
                <button
                  type="submit"
                  className="ct-btn-submit"
                  disabled={enviando}
                >
                  {enviando ? (
                    <>
                      <span className="ct-spinner" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {enviado && (
              <div className="ct-success" role="alert">
                <CheckCircle size={22} />
                <div>
                  <strong>Mensagem enviada!</strong>
                  <span>Retornaremos em breve pelo e-mail informado.</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── Botão flutuante WhatsApp ── */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ct-fab"
        aria-label="Abrir WhatsApp"
        title="Fale pelo WhatsApp"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

export default Contato
