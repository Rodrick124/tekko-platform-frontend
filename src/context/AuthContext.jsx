import { useMemo, useState } from 'react'
import AuthContext from './authContext.js'
function AuthProvider({ children }) {
  // Temporary local state. Replace this with the API-backed session later.
  const [user, setUser] = useState({ id: 'demo-client', role: 'client' })
  const value = useMemo(() => ({ user, setUser, isAuthenticated: Boolean(user) }), [user])
  return <AuthContext value={value}>{children}</AuthContext>
}
export default AuthProvider
