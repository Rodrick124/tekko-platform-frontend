import api from './api.js'
const providerService = { list: (params) => api.get('/providers', { params }), getById: (id) => api.get(`/providers/${id}`) }
export default providerService
