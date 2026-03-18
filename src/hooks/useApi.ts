import { useState, useCallback } from 'react'

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (endpoint: string, options?: RequestInit) => Promise<T | null>
}

export const useApi = (): ApiResponse<any> => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      setLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:5000${endpoint}`, {
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
        return result
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
