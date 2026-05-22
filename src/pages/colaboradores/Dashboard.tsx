import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

interface RegistroPonto {
  data: string
  entrada: string
  saida: string
  almoco: string
}

export default function ColaboradorDashboard() {
  const { user, logout } = useAuth()
  const { t, locale } = useLanguage()
  const [escala, setEscala] = useState({
    entradas_saidas: [] as RegistroPonto[],
    horas_extras: 0,
    folgas: [] as string[],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEscala()
  }, [])

  const dateLocale = locale === 'pt' ? 'pt-BR' : locale

  const loadEscala = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/escala', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setEscala(data)
    } catch (error) {
      console.error(t('colaborador.loadError'), error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p>{t('colaborador.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white px-6 py-4 rounded-2xl shadow-xl ring-1 ring-gray-900/5">
            <img
              src="/api/placeholder/80/80"
              alt={user?.nome}
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('colaborador.hello', { name: user?.nome || '' })}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {t('colaborador.registration')}{' '}
                <span className="font-semibold text-blue-600">
                  {user?.matricula}
                </span>
              </p>
              <button
                onClick={logout}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors"
              >
                {t('colaborador.logout')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📋 {t('colaborador.scheduleTitle')}
            </h2>
            <div className="space-y-3">
              {escala.entradas_saidas.length > 0 ? (
                escala.entradas_saidas.map((registro, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        {new Date(registro.data).toLocaleDateString(dateLocale)}
                      </span>
                      <div className="text-right">
                        <div>→ {registro.entrada}</div>
                        <div>☕ {registro.almoco}</div>
                        <div>← {registro.saida}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {t('colaborador.noRecords')}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border-2 border-yellow-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-400 rounded-2xl mr-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    {t('colaborador.overtime')}
                  </p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {escala.horas_extras}h
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border-2 border-green-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-400 rounded-2xl mr-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {t('colaborador.daysOff')}
                  </p>
                  <p className="text-lg font-bold text-green-900">
                    {escala.folgas.length > 0
                      ? escala.folgas
                          .map((f) => new Date(f).toLocaleDateString(dateLocale))
                          .join(', ')
                      : t('colaborador.noDaysOff')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
