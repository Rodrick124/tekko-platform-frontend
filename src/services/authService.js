const USER_STORAGE_KEY = 'tekko.demo.user'
const SESSION_STORAGE_KEY = 'tekko.demo.session'

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage)
const readJson = (key) => {
  if (!canUseStorage()) return null
  try { return JSON.parse(window.localStorage.getItem(key)) }
  catch { window.localStorage.removeItem(key); return null }
}
const normalizePhone = (value = '') => value.replace(/\D/g, '').replace(/^237/, '')
const normalizeEmail = (value = '') => value.trim().toLowerCase()
const getStoredUser = () => {
  const user = readJson(USER_STORAGE_KEY)
  return user?.isDemo === true ? user : null
}
const getCurrentUser = () => {
  const user = getStoredUser()
  return user && readJson(SESSION_STORAGE_KEY)?.userId === user.id ? user : null
}
const register = ({ fullName, email, phone }) => {
  const user = {
    id: `demo-user-${globalThis.crypto?.randomUUID?.() ?? Date.now()}`,
    fullName: fullName.trim(), email: normalizeEmail(email), phone: normalizePhone(phone),
    role: 'client', createdAt: new Date().toISOString(), isDemo: true,
  }
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: user.id, isDemo: true }))
  return user
}
const login = ({ identifier }) => {
  const user = getStoredUser()
  const normalized = identifier.includes('@') ? normalizeEmail(identifier) : normalizePhone(identifier)
  if (!user || (normalized !== user.email && normalized !== user.phone)) {
    throw new Error('Aucun compte de démonstration ne correspond à cet identifiant. Créez d’abord un compte.')
  }
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: user.id, isDemo: true }))
  return user
}
const logout = () => { if (canUseStorage()) window.localStorage.removeItem(SESSION_STORAGE_KEY) }

export default { getCurrentUser, register, login, logout }
