import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState(false)

  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value)
  }

  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    })
      .then(async res => {
        if (!res.ok) return setIsAuthenticated(false)
        const data = await res.json()
        if (data) setIsAuthenticated(true)
        else setIsAuthenticated(false)
      })
      .catch(() => setIsAuthenticated(false))
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
