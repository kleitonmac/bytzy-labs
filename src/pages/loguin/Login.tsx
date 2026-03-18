import { useState, useRef, useCallback } from 'react'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, User } from 'lucide-react'
import './Login.modules.css'

type Perfil = 'funcionario' | 'rh'

interface FormState {
  email: string
  senha: string
  lembrar: boolean
}

interface ErrosForm {
  email?: string
  senha?: string
}

export default function Login() {
  const [perfil, setPerfil] = useState<Perfil>('funcionario')
  const [form, setForm] = useState<FormState>({
    email: '',
    senha: '',
    lembrar: false,
  })
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<ErrosForm>({})
  const emailRef = useRef<HTMLInputElement>(null)

  const isRH = perfil === 'rh'

  const validar = useCallback((): ErrosForm => {
    const novosErros: ErrosForm = {}

    if (!form.email.trim()) {
      novosErros.email = 'Informe seu e-mail'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      novosErros.email = 'E-mail inválido'
    }

    if (!form.senha.trim()) {
      novosErros.senha = 'Informe sua senha'
    } else if (form.senha.length < 6) {
      novosErros.senha = 'Mínimo 6 caracteres'
    }

    return novosErros
  }, [form.email, form.senha])

  // ✅ CORREÇÃO PRINCIPAL: Tratamento específico por campo
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target

    // ✅ Type guards explícitos para cada campo
    if (name === 'email') {
      setForm(prev => ({ ...prev, email: value }))
    } else if (name === 'senha') {
      setForm(prev => ({ ...prev, senha: value }))
    } else if (name === 'lembrar') {
      setForm(prev => ({ ...prev, lembrar: checked }))
    }

    // Limpa erro do campo
    if (erros[name as keyof ErrosForm]) {
      setErros(prev => ({ ...prev, [name]: undefined }))
    }
  }, [erros])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const novosErros = validar()

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      if (novosErros.email && emailRef.current) {
        emailRef.current.focus()
      }
      return
    }

    setCarregando(true)
    setTimeout(() => {
      console.log('Login:', { perfil, ...form })
      setCarregando(false)
    }, 1600)
  }, [form, perfil, validar])

  const trocarPerfil = useCallback((novoPerfil: Perfil) => {
    if (novoPerfil === perfil) return

    setPerfil(novoPerfil)
    setErros({})
    setForm({ email: '', senha: '', lembrar: false })
    setTimeout(() => emailRef.current?.focus(), 100)
  }, [perfil])

  // Resto do JSX permanece IDENTICO...
  return (
    <div className={`lg-page ${isRH ? 'lg-page--rh' : ''}`}>
      {/* ── Todo o JSX continua exatamente igual ── */}
      <div className="lg-bg" aria-hidden="true">
        <div className="lg-bg__orb lg-bg__orb--1" />
        <div className="lg-bg__orb lg-bg__orb--2" />
        <div className="lg-bg__grid" />
      </div>

      <div className="lg-card">
        <div className="lg-card__top">
          <div className="lg-logo">
            {isRH ? (
              <ShieldCheck size={28} strokeWidth={1.8} />
            ) : (
              <User size={28} strokeWidth={1.8} />
            )}
          </div>
          <div className="lg-card__intro">
            <h1 className="lg-card__title">
              {isRH ? 'Acesso RH' : 'Portal do Colaborador'}
            </h1>
            <p className="lg-card__sub">
              {isRH
                ? 'Área restrita — Recursos Humanos'
                : 'Entre com suas credenciais corporativas'}
            </p>
          </div>
        </div>

        <div className="lg-toggle" role="group" aria-label="Tipo de acesso">
          <button
            type="button"
            className={`lg-toggle__btn ${perfil === 'funcionario' ? 'lg-toggle__btn--active' : ''}`}
            onClick={() => trocarPerfil('funcionario')}
            aria-pressed={perfil === 'funcionario'}
          >
            <User size={15} />
            Funcionário
          </button>
          <button
            type="button"
            className={`lg-toggle__btn ${isRH ? 'lg-toggle__btn--active' : ''}`}
            onClick={() => trocarPerfil('rh')}
            aria-pressed={isRH}
          >
            <ShieldCheck size={15} />
            RH
          </button>
        </div>

        <div className={`lg-badge ${isRH ? 'lg-badge--rh' : 'lg-badge--func'}`}>
          {isRH
            ? '🔐 Acesso com privilégios administrativos'
            : '👤 Acesso padrão de colaborador'}
        </div>

        <form className="lg-form" onSubmit={handleSubmit} noValidate>
          <div className={`lg-field ${erros.email ? 'lg-field--error' : ''}`}>
            <label htmlFor="email">E-mail corporativo</label>
            <div className="lg-field__wrap">
              <Mail size={16} className="lg-field__icon" />
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                placeholder="seu@empresa.com.br"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                aria-describedby={erros.email ? 'email-error' : undefined}
                aria-invalid={!!erros.email}
              />
            </div>
            {erros.email && (
              <span id="email-error" className="lg-field__err" role="alert">
                {erros.email}
              </span>
            )}
          </div>

          <div className={`lg-field ${erros.senha ? 'lg-field--error' : ''}`}>
            <label htmlFor="senha">Senha</label>
            <div className="lg-field__wrap">
              <Lock size={16} className="lg-field__icon" />
              <input
                id="senha"
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.senha}
                onChange={handleChange}
                autoComplete="current-password"
                aria-describedby={erros.senha ? 'senha-error' : undefined}
                aria-invalid={!!erros.senha}
              />
              <button
                type="button"
                className="lg-field__eye"
                onClick={() => setMostrarSenha((v) => !v)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                tabIndex={0}
              >
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {erros.senha && (
              <span id="senha-error" className="lg-field__err" role="alert">
                {erros.senha}
              </span>
            )}
          </div>

          <div className="lg-extras">
            <label className="lg-check">
              <input
                type="checkbox"
                name="lembrar"
                id="lembrar"
                checked={form.lembrar}
                onChange={handleChange}
              />
              <span className="lg-check__box" />
              <span>Lembrar acesso</span>
            </label>
            <a href="#" className="lg-link" tabIndex={0}>
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className={`lg-btn ${isRH ? 'lg-btn--rh' : 'lg-btn--func'}`}
            disabled={carregando}
            aria-busy={carregando}
          >
            {carregando ? (
              <>
                <span className="lg-spinner" aria-hidden="true" />
                Autenticando...
              </>
            ) : (
              `Entrar como ${isRH ? 'RH' : 'Funcionário'}`
            )}
          </button>
        </form>

        <p className="lg-footer">
          Problemas de acesso?{' '}
          <a href="mailto:ti@empresa.com.br" className="lg-link">
            Falar com TI
          </a>
        </p>
      </div>

      <span className="lg-version" aria-hidden="true">
        Sistema v2.0
      </span>
    </div>
  )
}
