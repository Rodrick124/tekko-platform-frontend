import mockUsers from '../data/mockUsers.js'

const USERS_STORAGE_KEY = 'tekko.demo.users'
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
const getStoredUsers = () => {
  const storedUsers = readJson(USERS_STORAGE_KEY)
  if (Array.isArray(storedUsers)) {
    const users = storedUsers.filter((user) => user?.isDemo === true)
    const knownIds = new Set(users.map((user) => user.id))
    const missingMockUsers = mockUsers.filter((user) => !knownIds.has(user.id))
    if (missingMockUsers.length && canUseStorage()) {
      const mergedUsers = [...users, ...missingMockUsers]
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mergedUsers))
      return mergedUsers
    }
    return users
  }

  const legacyUser = readJson(USER_STORAGE_KEY)
  const users = legacyUser?.isDemo === true ? [legacyUser] : mockUsers
  if (canUseStorage()) window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  return users
}
const getStoredUser = () => {
  const users = getStoredUsers()
  const session = readJson(SESSION_STORAGE_KEY)
  return users.find((user) => user.id === session?.userId) ?? null
}
const getCurrentUser = () => {
  return getStoredUser()
}
const register = ({ fullName, email, phone, password }) => {
  const users = getStoredUsers()
  const normalizedEmail = normalizeEmail(email)
  const normalizedPhone = normalizePhone(phone)
  const existingUser = users.find((user) => user.email === normalizedEmail || user.phone === normalizedPhone)
  if (existingUser) throw new Error('Un compte de démonstration existe déjà avec cet e-mail ou ce numéro.')
  const user = {
    id: `demo-user-${globalThis.crypto?.randomUUID?.() ?? Date.now()}`,
    fullName: fullName.trim(), email: normalizedEmail, phone: normalizedPhone, password,
    role: 'client', createdAt: new Date().toISOString(), isDemo: true,
  }
  users.push(user)
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: user.id, isDemo: true }))
  return user
}
const login = ({ identifier, password }) => {
  const users = getStoredUsers()
  const normalized = identifier.includes('@') ? normalizeEmail(identifier) : normalizePhone(identifier)
  const user = users.find((candidate) => normalized === candidate.email || normalized === candidate.phone)
  if (!user || (user.password && user.password !== password)) {
    throw new Error('Aucun compte de démonstration ne correspond à cet identifiant. Créez d’abord un compte.')
  }
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: user.id, isDemo: true }))
  return user
}
const logout = () => { if (canUseStorage()) window.localStorage.removeItem(SESSION_STORAGE_KEY) }

export default { getCurrentUser, register, login, logout }
