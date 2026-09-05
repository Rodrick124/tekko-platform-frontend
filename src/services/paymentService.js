import api from './api.js'
const paymentService = { create: (providerId) => api.post('/payments', { providerId }), getStatus: (reference) => api.get(`/payments/${reference}`) }
export default paymentService
