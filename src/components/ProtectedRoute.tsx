import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  requireAuth?: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
}) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    const from = location.pathname
    const isAdminRoute = from.startsWith('/admin')
    return <Navigate to={isAdminRoute ? '/rh' : '/login'} replace state={{ from }} />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user.role === 'funcionario' ? '/colaborador' : '/admin'}
        replace
      />
    )
  }

  return <>{children}</>
}
