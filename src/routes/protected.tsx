import { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const protectedRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['rh', 'admin']}>
        <div className="p-12 min-h-screen">
          <h1 className="text-4xl font-bold">🛠️ Admin Dashboard</h1>
          <p>João Silva (Admin) - CRUD Funcionários</p>
        </div>
      </ProtectedRoute>
    )
  },
  {
    path: '/colaborador',
    element: (
      <ProtectedRoute allowedRoles={['funcionario']}>
        <div className="p-12 min-h-screen">
          <h1 className="text-4xl font-bold">👋 Colaborador</h1>
          <p>Pedro Oliveira - Escala de Ponto</p>
        </div>
      </ProtectedRoute>
    )
  }
]
