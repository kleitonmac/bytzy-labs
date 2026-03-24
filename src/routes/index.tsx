import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from './public'
import { protectedRoutes } from './protected'

export const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
    {protectedRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)
