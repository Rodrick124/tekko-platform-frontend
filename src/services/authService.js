import api from './api.js'
const authService = { login: (credentials) => api.post('/auth/login', credentials), register: (payload) => api.post('/auth/register', payload), logout: () => api.post('/auth/logout') }
export default authService
