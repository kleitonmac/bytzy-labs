export const funcionarioService = {
  getAll: () =>
    fetch('http://localhost:5000/api/funcionarios').then((res) => res.json()),
  create: (data: FormData) =>
    fetch('http://localhost:5000/api/funcionarios', {
      method: 'POST',
      body: data,
    }).then((res) => res.json()),
  update: (id: number, data: FormData) =>
    fetch(`http://localhost:5000/api/funcionarios/${id}`, {
      method: 'PUT',
      body: data,
    }).then((res) => res.json()),
  delete: (id: number) =>
    fetch(`http://localhost:5000/api/funcionarios/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json()),
  getById: (id: number) =>
    fetch(`http://localhost:5000/api/funcionarios/${id}`).then((res) =>
      res.json(),
    ),
}
