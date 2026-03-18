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
  geral?: string
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
    }

    return novosErros
  }, [form.email, form.senha])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = e.target

      setForm((prev) => ({
        ...prev,
        [name]: name === 'lembrar' ? checked : value,
      }))

      if (erros[name as keyof ErrosForm]) {
        setErros((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [erros],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const novosErros = validar()

      if (Object.keys(novosErros).length > 0) {
        setErros(novosErros)
        if (novosErros.email && emailRef.current) {
          emailRef.current.focus()
        }
        return
      }

      try {
        setCarregando(true)
        setErros({})

        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            perfil,
            email: form.email,
            senha: form.senha,
            lembrar: form.lembrar,
          }),
        })

        if (!response.ok) throw new Error()

        setForm((prev) => ({ ...prev, senha: '' }))
      } catch {
        setErros({ geral: 'Credenciais inválidas ou erro no servidor' })
      } finally {
        setCarregando(false)
      }
    },
    [form, perfil, validar],
  )

  const trocarPerfil = useCallback(
    (novoPerfil: Perfil) => {
      if (novoPerfil === perfil) return

      setPerfil(novoPerfil)
      setErros({})
      setForm({ email: '', senha: '', lembrar: false })
      setTimeout(() => emailRef.current?.focus(), 100)
    },
    [perfil],
  )

  return (
    <div className={`lg-page ${isRH ? 'lg-page--rh' : ''}`}>
      <div className="lg-card">
        <div className="lg-toggle">
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

        {erros.geral && <div className="lg-error-global">{erros.geral}</div>}

        <form className="lg-form" onSubmit={handleSubmit} noValidate>
          <div className={`lg-field ${erros.email ? 'lg-field--error' : ''}`}>
            <label>E-mail corporativo</label>
            <div className="lg-field__wrap">
              <Mail size={16} className="lg-field__icon" />
              <input
                ref={emailRef}
                name="email"
                type="email"
                placeholder="seu@empresa.com.br"
                value={form.email}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            {erros.email && (
              <span className="lg-field__err">{erros.email}</span>
            )}
          </div>

          <div className={`lg-field ${erros.senha ? 'lg-field--error' : ''}`}>
            <label>Senha</label>
            <div className="lg-field__wrap">
              <Lock size={16} className="lg-field__icon" />
              <input
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
                onClick={() => setMostrarSenha((v) => !v)}
              >
                {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {erros.senha && (
              <span className="lg-field__err">{erros.senha}</span>
            )}
          </div>

          <div className="lg-extras">
            <label className="lg-check">
              <input
                type="checkbox"
                name="lembrar"
                checked={form.lembrar}
                onChange={handleChange}
              />
              <span className="lg-check__box" />
              <span>Manter conectado</span>
            </label>

            <a href="/recuperar-senha" className="lg-link lg-link-white">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className={`lg-btn ${isRH ? 'lg-btn--rh' : 'lg-btn--func'}`}
            disabled={carregando}
          >
            {carregando ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>

        <p className="lg-footer lg-footer-white">
          Problemas de acesso?{' '}
          <a href="mailto:ti@empresa.com.br" className="lg-link lg-link-white">
            Falar com a TI
          </a>
        </p>
      </div>
    </div>
  )
}
