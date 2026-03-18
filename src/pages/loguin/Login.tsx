// src/pages/login/Login.tsx
import { useState, useRef } from 'react'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, User } from 'lucide-react'
import './Login.modules.css'

type Perfil = 'funcionario' | 'rh'

interface FormState {
  email: string
  senha: string
  lembrar: boolean
}

export default function Login() {
  const [perfil, setPerfil] = useState<Perfil>('funcionario')
  const [form, setForm] = useState<FormState>({
    email: '',
    senha: '',
    lembrar: false,
  })
  const [mostrarSenha, setMostrar] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<
  Partial<Record<keyof FormState, string>>
>({})
  const emailRef = useRef<HTMLInputElement>(null)

  const isRH = perfil === 'rh'

  const validar = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.email.trim()) e.email = 'Informe seu e-mail'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.senha.trim()) e.senha = 'Informe sua senha'
    else if (form.senha.length < 6) e.senha = 'Mínimo 6 caracteres'
    return e
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (erros[name as keyof FormState])
      setErros((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const e2 = validar()
    if (Object.keys(e2).length) {
      setErros(e2)
      return
    }
    setCarregando(true)
    // ↓ substitua pela sua chamada real de API
    setTimeout(() => {
      console.log('Login:', { perfil, ...form })
      setCarregando(false)
    }, 1600)
  }

  const trocarPerfil = (p: Perfil) => {
    if (p === perfil) return
    setPerfil(p)
    setErros({})
    emailRef.current?.focus()
  }

  return (
    <div className={`lg-page ${isRH ? 'lg-page--rh' : ''}`}>
      {/* ── Fundo decorativo ── */}
      <div className="lg-bg" aria-hidden="true">
        <div className="lg-bg__orb lg-bg__orb--1" />
        <div className="lg-bg__orb lg-bg__orb--2" />
        <div className="lg-bg__grid" />
      </div>

      {/* ── Card principal ── */}
      <div className="lg-card">
        {/* Topo do card */}
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

        {/* Toggle Funcionário / RH */}
        <div className="lg-toggle" role="group" aria-label="Tipo de acesso">
          <button
            type="button"
            className={`lg-toggle__btn ${perfil === 'funcionario' ? 'lg-toggle__btn--active' : ''}`}
            onClick={() => trocarPerfil('funcionario')}
          >
            <User size={15} />
            Funcionário
          </button>
          <button
            type="button"
            className={`lg-toggle__btn ${isRH ? 'lg-toggle__btn--active' : ''}`}
            onClick={() => trocarPerfil('rh')}
          >
            <ShieldCheck size={15} />
            RH
          </button>
        </div>

        {/* Indicador de perfil ativo */}
        <div className={`lg-badge ${isRH ? 'lg-badge--rh' : 'lg-badge--func'}`}>
          {isRH
            ? '🔐 Acesso com privilégios administrativos'
            : '👤 Acesso padrão de colaborador'}
        </div>

        {/* Formulário */}
        <form className="lg-form" onSubmit={handleSubmit} noValidate>
          {/* E-mail */}
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
              />
            </div>
            {erros.email && (
              <span className="lg-field__err">{erros.email}</span>
            )}
          </div>

          {/* Senha */}
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
              />
              <button
                type="button"
                className="lg-field__eye"
                onClick={() => setMostrar((v) => !v)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {erros.senha && (
              <span className="lg-field__err">{erros.senha}</span>
            )}
          </div>

          {/* Lembrar + Esqueceu */}
          <div className="lg-extras">
            <label className="lg-check">
              <input
                type="checkbox"
                name="lembrar"
                checked={form.lembrar}
                onChange={handleChange}
              />
              <span className="lg-check__box" />
              Lembrar acesso
            </label>
            <a href="#" className="lg-link">
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className={`lg-btn ${isRH ? 'lg-btn--rh' : 'lg-btn--func'}`}
            disabled={carregando}
          >
            {carregando ? (
              <>
                <span className="lg-spinner" />
                Autenticando...
              </>
            ) : (
              `Entrar como ${isRH ? 'RH' : 'Funcionário'}`
            )}
          </button>
        </form>

        {/* Rodapé */}
        <p className="lg-footer">
          Problemas de acesso?{' '}
          <a href="mailto:ti@empresa.com.br" className="lg-link">
            Falar com TI
          </a>
        </p>
      </div>

      {/* Crédito de versão */}
      <span className="lg-version">Sistema v2.0</span>
    </div>
  )
}
