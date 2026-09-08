import { useCallback, useMemo, useState } from 'react'
import AuthContext from './authContext.js'
import authService from '../services/authService.js'
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())
  const login = useCallback((credentials) => { const next = authService.login(credentials); setUser(next); return next }, [])
  const register = useCallback((profile) => { const next = authService.register(profile); setUser(next); return next }, [])
  const logout = useCallback(() => { authService.logout(); setUser(null) }, [])
  const value = useMemo(() => ({ user, login, register, logout, isAuthenticated: Boolean(user) }), [login, logout, register, user])
  return <AuthContext value={value}>{children}</AuthContext>
}
export default AuthProvider
