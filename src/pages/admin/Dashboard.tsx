import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { funcionarioService } from '../../services/funcionarioService'

interface Funcionario {
  id: number | string
  codigo?: string
  matricula: string
  nome: string
  sobrenome: string
  endereco?: string
  telefone?: string
  email?: string
  sexo?: string
  cep?: string
  fotoUrl?: string
  role: string
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [form, setForm] = useState({
    codigo: '',
    matricula: '',
    senha: '',
    nome: '',
    sobrenome: '',
    endereco: '',
    telefone: '',
    email: '',
    sexo: '',
    cep: '',
    role: 'funcionario',
  })
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadFuncionarios()
  }, [])

  const loadFuncionarios = async () => {
    try {
      const data = await funcionarioService.getAll()
      setFuncionarios(data)
    } catch (error) {
      console.error(t('admin.loadError'), error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        await funcionarioService.update(editingId, {
          ...form,
          senha: form.senha || undefined,
        })
      } else {
        await funcionarioService.create({
          ...form,
          senha: form.senha || '123456',
        })
      }
      loadFuncionarios()
      resetForm()
    } catch (error) {
      console.error(t('admin.saveError'), error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      codigo: '',
      matricula: '',
      senha: '',
      nome: '',
      sobrenome: '',
      endereco: '',
      telefone: '',
      email: '',
      sexo: '',
      cep: '',
      role: 'funcionario',
    })
    setEditingId(null)
  }

  const editFuncionario = (funcionario: Funcionario) => {
    setForm({
      codigo: funcionario.codigo || funcionario.matricula,
      matricula: funcionario.matricula,
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      endereco: funcionario.endereco || '',
      telefone: funcionario.telefone || '',
      email: funcionario.email || '',
      sexo: funcionario.sexo || '',
      cep: funcionario.cep || '',
      role: funcionario.role,
      senha: '',
    })
    setEditingId(funcionario.id)
  }

  const deleteFuncionario = async (id: number | string) => {
    if (confirm(t('admin.confirmDelete'))) {
      try {
        await funcionarioService.delete(id)
        loadFuncionarios()
      } catch (error) {
        console.error(t('admin.deleteError'), error)
      }
    }
  }

  const roleLabel = (role: string) => {
    if (role === 'admin') return 'Admin'
    if (role === 'rh') return 'RH'
    return t('admin.employeeRole')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('admin.title')} - {user?.nome}
          </h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            {t('admin.logout')}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? t('admin.editEmployee') : t('admin.newEmployee')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder={t('admin.idPlaceholder')}
                  value={form.codigo}
                  onChange={(e) =>
                    setForm({ ...form, codigo: e.target.value })
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  placeholder={t('admin.registrationPlaceholder')}
                  value={form.matricula}
                  onChange={(e) =>
                    setForm({ ...form, matricula: e.target.value })
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder={t('admin.passwordPlaceholder')}
                  value={form.senha}
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required={!editingId}
                />
              </div>
              <input
                placeholder={t('admin.firstNamePlaceholder')}
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                placeholder={t('admin.lastNamePlaceholder')}
                value={form.sobrenome}
                onChange={(e) =>
                  setForm({ ...form, sobrenome: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder={t('admin.phonePlaceholder')}
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  placeholder={t('admin.zipPlaceholder')}
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="email"
                placeholder={t('admin.emailPlaceholder')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                placeholder={t('admin.addressPlaceholder')}
                value={form.endereco}
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.sexo}
                  onChange={(e) => setForm({ ...form, sexo: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">{t('admin.sexPlaceholder')}</option>
                  <option value="M">{t('admin.male')}</option>
                  <option value="F">{t('admin.female')}</option>
                  <option value="O">{t('admin.other')}</option>
                </select>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="funcionario">{t('admin.employeeRole')}</option>
                  <option value="rh">RH</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading
                    ? t('admin.saving')
                    : editingId
                      ? t('admin.update')
                      : t('admin.add')}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    {t('admin.cancel')}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg overflow-hidden">
            <h2 className="text-2xl font-semibold mb-6">
              {t('admin.listTitle')}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.registration')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.role')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {funcionarios.map((funcionario) => (
                    <tr key={funcionario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {funcionario.fotoUrl && (
                            <img
                              src={`http://localhost:5000${funcionario.fotoUrl}`}
                              alt={funcionario.nome}
                              className="h-10 w-10 rounded-full object-cover mr-4"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {funcionario.nome} {funcionario.sobrenome}
                            </div>
                            <div className="text-sm text-gray-500">
                              {funcionario.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {funcionario.matricula}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            funcionario.role === 'admin'
                              ? 'bg-red-100 text-red-800'
                              : funcionario.role === 'rh'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {roleLabel(funcionario.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => editFuncionario(funcionario)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {t('admin.edit')}
                        </button>
                        <button
                          onClick={() => deleteFuncionario(funcionario.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {t('admin.delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
