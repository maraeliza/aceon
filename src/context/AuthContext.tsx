import React, { createContext, useState, useEffect, ReactNode } from 'react'

// Definindo o tipo do contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Simulação de verificação de autenticação (pode ser uma chamada de API ou verificação de cookie)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulando a chamada de verificação de autenticação (pode ser uma API ou verificação de cookie)
        const authStatus = await simulateAuthCheck() // Substitua com a lógica real
        setIsAuthenticated(authStatus)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Funções de login e logout (para o exemplo)
  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Função para acessar o contexto
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Simulação de verificação de autenticação (exemplo)
const simulateAuthCheck = () =>
  new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 1000))
