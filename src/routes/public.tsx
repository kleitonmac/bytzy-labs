import { RouteObject } from 'react-router-dom'
import Login from '../pages/Login'
import Sobre from '../pages/Sobre'
import Contato from '../pages/Contato'

export const publicRoutes: RouteObject[] = [
  { path: '/', element: () => <div>Início</div> },
  { path: '/sobre', element: Sobre },
  { path: '/contato', element: Contato },
  { path: '/login', element: Login }
]
