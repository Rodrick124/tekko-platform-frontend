import api from './api.js'
const authService = { login: (credentials) => api.post('/auth/login', credentials), register: (payload) => api.post('/auth/register', payload), logout: () => api.post('/auth/logout') }
const waitForDemo = () => new Promise((resolve) => window.setTimeout(resolve, 650))
authService.demoLogin = async () => {
  await waitForDemo()
  return {message: 'Démonstration frontend : aucune connexion réelle n’a été effectuée.'}
}
authService.demoRegister = async () => {
  await waitForDemo()
  return {message: 'Démonstration frontend : aucun compte réel n’a été créé.'}
}
export default authService
