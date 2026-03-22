import { RouteObject } from 'react-router-dom'
import Login from '../pages/login/Login'
import Sobre from '../pages/sobre/Sobre'
import Contato from '../pages/contato/Contato'

export const publicRoutes: RouteObject[] = [
  { path: '/', element: () => <div>Início</div> },
  { path: '/sobre', element: Sobre },
  { path: '/contato', element: Contato },
  { path: '/login', element: Login },
]
