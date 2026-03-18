import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { funcionarioService } from '../../services/funcionarioService';

interface Funcionario {
  id: number;
  matricula: string;
  nome: string;
  sobrenome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  sexo?: string;
  cep?: string;
  fotoUrl?: string;
  role: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [form, setForm] = useState({
    matricula: '',
    senha: '',
    nome: '',
    sobrenome: '',
    endereco: '',
    telefone: '',
    email: '',
    sexo: '',
    cep: '',
    role: 'funcionario'
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFuncionarios();
  }, []);

  const loadFuncionarios = async () => {
    try {
      const data = await funcionarioService.getAll();
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (foto) formData.append('foto', foto);

    try {
      if (editingId) {
        await funcionarioService.update(editingId, formData);
      } else {
        await funcionarioService.create(formData);
      }
      loadFuncionarios();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      matricula: '', senha: '', nome: '', sobrenome: '', endereco: '',
      telefone: '', email: '', sexo: '', cep: '', role: 'funcionario'
    });
    setEditingId(null);
    setFoto(null);
  };

  const editFuncionario = (funcionario: Funcionario) => {
    setForm({
      matricula: funcionario.matricula,
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      endereco: funcionario.endereco || '',
      telefone: funcionario.telefone || '',
      email: funcionario.email || '',
      sexo: funcionario.sexo || '',
      cep: funcionario.cep || '',
      role: funcionario.role,
      senha: ''
    });
    setEditingId(funcionario.id);
  };

  const deleteFuncionario = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        await funcionarioService.delete(id);
        loadFuncionarios();
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel Admin/RH - {user?.nome}
          </h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário CRUD */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? 'Editar Funcionário' : 'Novo Funcionário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Matrícula *"
                  value={form.matricula}
                  onChange={(e) => setForm({ ...form, matricula: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Senha *"
                  value={form.senha}
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required={!editingId}
                />
              </div>
              <input
                placeholder="Nome *"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                placeholder="Sobrenome"
                value={form.sobrenome}
                onChange={(e) => setForm({ ...form, sobrenome: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Telefone"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <input
                  placeholder="CEP"
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                placeholder="Endereço"
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
                  <option value="">Sexo</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  <option value="funcionario">Funcionário</option>
                  <option value="rh">RH</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {loading ? 'Salvando...' : editingId ? 'Atualizar' : 'Adicionar'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista de Funcionários */}
          <div className="bg-white p-8 rounded-xl shadow-lg overflow-hidden">
            <h2 className="text-2xl font-semibold mb-6">Funcionários Cadastrados</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
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
                            <div className="text-sm text-gray-500">{funcionario.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {funcionario.matricula}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          funcionario.role === 'admin' ? 'bg-red-100 text-red-800' :
                          funcionario.role === 'rh' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {funcionario.role === 'admin' ? 'Admin' : funcionario.role === 'rh' ? 'RH' : 'Funcionário'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => editFuncionario(funcionario)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteFuncionario(funcionario.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
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
  );
}
