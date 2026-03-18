import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from './public'
import { protectedRoutes } from './protected'

export const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({ path, element: Element }) => (
      <Route key={path} path={path} element={<Element />} />
    ))}
    {protectedRoutes.map(({ path, element: Element }) => (
      <Route key={path} path={path} element={<Element />} />
    ))}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)
