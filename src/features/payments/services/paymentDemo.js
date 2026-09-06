const SESSION_PREFIX = 'tekko-demo-access:'
export const DEMO_CONTACT = '+237 600 00 00 00'
export const ACCESS_DURATION_MS = 24 * 60 * 60 * 1000

export function createDemoReference() {
  return 'TK-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase()
}

export function createDemoGrant(providerId) {
  const grantedAt = Date.now()
  const grant = {
    providerId,
    reference: createDemoReference(),
    grantedAt,
    expiresAt: grantedAt + ACCESS_DURATION_MS,
    status: 'confirmed-demo',
  }
  sessionStorage.setItem(SESSION_PREFIX + providerId, JSON.stringify(grant))
  return grant
}

function parseGrant(raw) {
  try {
    const grant = JSON.parse(raw)
    if (!grant?.providerId || !grant?.reference || grant.expiresAt <= Date.now()) return null
    return grant
  } catch {
    return null
  }
}

export function getDemoGrant(providerId) {
  const key = SESSION_PREFIX + providerId
  const grant = parseGrant(sessionStorage.getItem(key))
  if (!grant) sessionStorage.removeItem(key)
  return grant
}

export function findDemoGrantByReference(reference) {
  for (let index = 0; index < sessionStorage.length; index += 1) {
    const key = sessionStorage.key(index)
    if (!key?.startsWith(SESSION_PREFIX)) continue
    const grant = parseGrant(sessionStorage.getItem(key))
    if (grant?.reference === reference) return grant
  }
  return null
}

export function clearDemoGrant(providerId) {
  sessionStorage.removeItem(SESSION_PREFIX + providerId)
}

export function maskPaymentPhone(phone) {
  const digits = String(phone).replace(/\D/g, '')
  return '+237 6•• •• ' + digits.slice(-2).padStart(2, '•')
}
