export interface Funcionario {
  id: number | string
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

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const funcionarioService = {
  getAll: () =>
    fetch('http://localhost:5000/api/funcionarios', { headers: getHeaders() }).then(
      (res) => res.json()
    ),
  create: (data: Partial<Funcionario> & { codigo?: string; senha: string }) =>
    fetch('http://localhost:5000/api/funcionarios', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  update: (
    id: number | string,
    data: Partial<Funcionario> & { senha?: string }
  ) =>
    fetch(`http://localhost:5000/api/funcionarios/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  delete: (id: number | string) =>
    fetch(`http://localhost:5000/api/funcionarios/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then((res) => res.json()),
  getById: (id: number | string) =>
    fetch(`http://localhost:5000/api/funcionarios/${id}`, {
      headers: getHeaders(),
    }).then((res) => res.json()),
}
