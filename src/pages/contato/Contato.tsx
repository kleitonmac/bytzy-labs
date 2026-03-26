import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
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
import { useLanguage } from '../../context/LanguageContext'

type FormContato = {
  nome: string
  email: string
  empresa: string
  assunto: string
  mensagem: string
}

type Errors = Partial<Record<keyof FormContato, string>>

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const CONFIG = {
  whatsapp: '5527981911375',
  email: 'nextysquard@gmail.com',
  telefone: '+55 (27) 98191-1375',
  endereco: 'Serra, Espírito Santo — Brasil',
}

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_nextysqd'
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_kleiton'
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'P3SS19_xUjHt9-wx4'

const Contato = () => {
  const { t } = useLanguage()

  const ASSUNTOS = useMemo(
    () => [
      t('contato.assunto1'),
      t('contato.assunto2'),
      t('contato.assunto3'),
      t('contato.assunto4'),
      t('contato.assunto5'),
    ],
    [t],
  )

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

    if (!formData.nome.trim()) e.nome = t('contato.errName')
    if (!formData.email.trim()) e.email = t('contato.errEmail')
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = t('contato.errEmailInvalid')

    if (!formData.assunto) e.assunto = t('contato.errSubject')
    if (!formData.mensagem.trim()) e.mensagem = t('contato.errMessage')

    return e
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    const key: keyof FormContato =
      name === 'user_name'
        ? 'nome'
        : name === 'user_email'
          ? 'email'
          : (name as keyof FormContato)

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errs = validate()

    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setErrors({
        mensagem: t('contato.errConfig'),
      })
      return
    }

    const corpoMensagem = [
      `${t('contato.emailSubjectPrefix')} ${formData.assunto}`,
      `${t('contato.emailCompanyPrefix')} ${formData.empresa.trim() || '—'}`,
      '',
      formData.mensagem,
    ].join('\n')

    setEnviando(true)
    setErrors({})

    try {
      const templateParams = {
        from_name: formData.nome,
        from_email: formData.email,
        message: corpoMensagem,
      }
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      )
      console.log('EmailJS:', response.status, response.text)
      setEnviado(true)
      setFormData({
        nome: '',
        email: '',
        empresa: '',
        assunto: '',
        mensagem: '',
      })
      setTimeout(() => setEnviado(false), 6000)
    } catch (err: unknown) {
      console.error('EmailJS:', err)
      const detalhe =
        err &&
        typeof err === 'object' &&
        'text' in err &&
        typeof (err as { text: string }).text === 'string'
          ? (err as { text: string }).text
          : ''
      setErrors({
        mensagem: detalhe
          ? `${t('contato.errSendPrefix')}${detalhe}`
          : t('contato.errSendGeneric'),
      })
    } finally {
      setEnviando(false)
    }
  }

  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t('contato.whatsappMsg'))}`

  return (
    <div className="ct-page">
      <header className="ct-hero">
        <div className="ct-hero__inner">
          <span className="ct-eyebrow">{t('contato.eyebrow')}</span>
          <h1 className="ct-title">
            {t('contato.title1')}
            <br />
            <em>{t('contato.titleEm')}</em>
          </h1>
          <p className="ct-lead">
            {t('contato.lead')}
            <strong>{t('contato.leadStrong')}</strong>
            {t('contato.leadEnd')}
          </p>

          <div className="ct-quick">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-quick__btn ct-quick__btn--wa"
            >
              <WhatsAppIcon />
              {t('contato.waBtn')}
              <ExternalLink size={14} />
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="ct-quick__btn ct-quick__btn--mail"
            >
              <Mail size={18} />
              {t('contato.mailBtn')}
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

      <main className="ct-main">
        <aside className="ct-info">
          <div className="ct-info__card">
            <h2 className="ct-section-title">{t('contato.sideTitle')}</h2>

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
                  <strong>{t('contato.waLabel')}</strong>
                  <span>{CONFIG.telefone}</span>
                  <em>{t('contato.waHint')}</em>
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
                  <strong>{t('contato.emailLabel')}</strong>
                  <span>{CONFIG.email}</span>
                  <em>{t('contato.emailHint')}</em>
                </div>
                <ArrowRight size={16} className="ct-channel__arrow" />
              </a>

              <div className="ct-channel ct-channel--phone">
                <div className="ct-channel__icon">
                  <Phone size={20} />
                </div>
                <div className="ct-channel__body">
                  <strong>{t('contato.phoneLabel')}</strong>
                  <span>{CONFIG.telefone}</span>
                  <em>{t('contato.phoneHint')}</em>
                </div>
              </div>

              <div className="ct-channel ct-channel--addr">
                <div className="ct-channel__icon">
                  <MapPin size={20} />
                </div>
                <div className="ct-channel__body">
                  <strong>{t('contato.locLabel')}</strong>
                  <span>{CONFIG.endereco}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ct-info__card ct-hours">
            <h2 className="ct-section-title">
              <Clock size={15} /> {t('contato.hoursTitle')}
            </h2>
            <ul className="ct-hours__list">
              <li>
                <span>{t('contato.hoursWeekdays')}</span>
                <strong>09:00 – 18:00</strong>
              </li>
              <li>
                <span>{t('contato.hoursSat')}</span>
                <strong>09:00 – 13:00</strong>
              </li>
              <li className="ct-hours__off">
                <span>{t('contato.hoursSun')}</span>
                <strong>{t('contato.closed')}</strong>
              </li>
              <li className="ct-hours__off">
                <span>{t('contato.hoursHol')}</span>
                <strong>{t('contato.closed')}</strong>
              </li>
            </ul>
            <div className="ct-hours__badge">
              <span className="ct-dot" />
              {t('contato.onlineNow')}
            </div>
          </div>
        </aside>

        <section className="ct-form-wrap">
          <div className="ct-form-card">
            <h2 className="ct-section-title">{t('contato.formTitle')}</h2>
            <p className="ct-form-sub">{t('contato.formSub')}</p>

            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-row">
                <div
                  className={`ct-field ${errors.nome ? 'ct-field--error' : ''}`}
                >
                  <label htmlFor="nome">
                    <User size={13} /> {t('contato.labelName')}{' '}
                    <abbr title={t('contato.req')}>*</abbr>
                  </label>
                  <input
                    id="nome"
                    name="user_name"
                    type="text"
                    placeholder={t('contato.phName')}
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
                    <Mail size={13} /> {t('contato.labelEmail')}{' '}
                    <abbr title={t('contato.req')}>*</abbr>
                  </label>
                  <input
                    id="email"
                    name="user_email"
                    type="email"
                    placeholder={t('contato.phEmail')}
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
                    <Building size={13} /> {t('contato.labelCompany')}{' '}
                    <span className="ct-optional">{t('contato.optional')}</span>
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder={t('contato.phCompany')}
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>

                <div
                  className={`ct-field ${errors.assunto ? 'ct-field--error' : ''}`}
                >
                  <label htmlFor="assunto">
                    <MessageSquare size={13} /> {t('contato.labelSubject')}{' '}
                    <abbr title={t('contato.req')}>*</abbr>
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                  >
                    <option value="">{t('contato.selectPlaceholder')}</option>
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
                  <MessageSquare size={13} /> {t('contato.labelMessage')}{' '}
                  <abbr title={t('contato.req')}>*</abbr>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  placeholder={t('contato.phMessage')}
                  value={formData.mensagem}
                  onChange={handleChange}
                />
                <div className="ct-char">
                  {formData.mensagem.length} {t('contato.chars')}
                </div>
                {errors.mensagem && (
                  <span className="ct-field__err">{errors.mensagem}</span>
                )}
              </div>

              <div className="ct-form__footer">
                <p className="ct-privacy">🔒 {t('contato.privacy')}</p>
                <button
                  type="submit"
                  className="ct-btn-submit"
                  disabled={enviando}
                >
                  {enviando ? (
                    <>
                      <span className="ct-spinner" />
                      {t('contato.sending')}
                    </>
                  ) : (
                    <>
                      {t('contato.submit')} <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {enviado && (
              <div className="ct-success" role="alert">
                <CheckCircle size={22} />
                <div>
                  <strong>{t('contato.successTitle')}</strong>
                  <span>{t('contato.successSub')}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ct-fab"
        aria-label={t('contato.fabLabel')}
        title={t('contato.fabTitle')}
      >
        <WhatsAppIcon />
        <span>{t('contato.fabShort')}</span>
      </a>
    </div>
  )
}

export default Contato
