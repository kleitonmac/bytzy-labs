export const authService = {
  login: async (matricula: string, senha: string) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula, senha }),
    })
    return response.json()
  },
}
