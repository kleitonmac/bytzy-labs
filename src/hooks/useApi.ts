// src/hooks/useApi.ts
import { useState, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL ?? ''

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (endpoint: string, options?: RequestInit) => Promise<T | null>
}

export const useApi = <T = any>(): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      setLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
          },
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Erro na requisição')
        }

        setData(result)
        return result as T
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido'
        setError(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { data, loading, error, execute }
}
