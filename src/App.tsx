// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/home/Home'
import LoginFuncionario from './pages/loguin/LoginFuncionario'
import LoginRH from './pages/loguin/LoginRH'
import Sobre from './pages/sobre/Sobre'
import Contato from './pages/contato/Contato'
import AdminDashboard from './pages/admin/Dashboard'
import ColaboradorDashboard from './pages/colaboradores/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route
          path="/login"
          element={
            <GuestRoute tipo="funcionario">
              <LoginFuncionario />
            </GuestRoute>
          }
        />
        <Route
          path="/rh"
          element={
            <GuestRoute tipo="rh">
              <LoginRH />
            </GuestRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['rh', 'admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/colaborador"
          element={
            <ProtectedRoute allowedRoles={['funcionario', 'rh', 'admin']}>
              <ColaboradorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
