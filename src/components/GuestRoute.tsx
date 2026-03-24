import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface GuestRouteProps {
  children: React.ReactNode
  tipo?: 'funcionario' | 'rh'
}

/** Redireciona usuário logado para sua área. Usado em /login e /rh */
export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (user) {
    const destino =
      user.role === 'funcionario' ? '/colaborador' : '/admin'
    return <Navigate to={destino} replace />
  }

  return <>{children}</>
}
