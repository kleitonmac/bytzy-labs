import { useState, useRef, useCallback } from 'react'
import { Hash, Lock, Eye, EyeOff, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import './Login.modules.css'

interface FormState {
  id: string
  senha: string
  lembrar: boolean
}

interface ErrosForm {
  id?: string
  senha?: string
  geral?: string
}

export default function LoginFuncionario() {
  const { loginFuncionario } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    id: '',
    senha: '',
    lembrar: false,
  })
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<ErrosForm>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const validar = useCallback((): ErrosForm => {
    const novosErros: ErrosForm = {}

    if (!form.id.trim()) novosErros.id = t('login.idRequired')
    if (!form.senha.trim()) novosErros.senha = t('login.passwordRequired')

    return novosErros
  }, [form.id, form.senha, t])

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
        inputRef.current?.focus()
        return
      }

      try {
        setCarregando(true)
        setErros({})

        const ok = await loginFuncionario(form.id, form.senha)

        if (!ok) {
          setErros({ geral: t('login.employeeInvalid') })
        } else {
          navigate('/colaborador')
        }
      } catch {
        setErros({ geral: t('login.connectionError') })
      } finally {
        setCarregando(false)
      }
    },
    [form, validar, loginFuncionario, navigate, t],
  )

  return (
    <div className="lg-page lg-page--func">
      <div className="lg-card">
        <div className="lg-header">
          <User size={32} className="lg-header__icon" />
          <h1 className="lg-header__title">{t('login.employeeTitle')}</h1>
          <p className="lg-header__sub">{t('login.subtitle')}</p>
        </div>

        {erros.geral && <div className="lg-error-global">{erros.geral}</div>}

        <form className="lg-form" onSubmit={handleSubmit} noValidate>
          <div className={`lg-field ${erros.id ? 'lg-field--error' : ''}`}>
            <label>ID</label>
            <div className="lg-field__wrap">
              <Hash size={16} className="lg-field__icon" />
              <input
                ref={inputRef}
                name="id"
                type="text"
                placeholder={t('login.employeePlaceholder')}
                value={form.id}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            {erros.id && <span className="lg-field__err">{erros.id}</span>}
          </div>

          <div className={`lg-field ${erros.senha ? 'lg-field--error' : ''}`}>
            <label>{t('login.password')}</label>
            <div className="lg-field__wrap">
              <Lock size={16} className="lg-field__icon" />
              <input
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="********"
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
              <span>{t('login.keepConnected')}</span>
            </label>
          </div>

          <button
            type="submit"
            className="lg-btn lg-btn--func"
            disabled={carregando}
          >
            {carregando ? t('login.authenticating') : t('login.enter')}
          </button>
        </form>

        <p className="lg-footer lg-footer-white">
          {t('login.adminQuestion')}{' '}
          <Link to="/rh" className="lg-link lg-link-white">
            {t('login.accessHere')}
          </Link>
        </p>
      </div>
    </div>
  )
}
