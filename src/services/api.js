import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
// Add authentication headers and token refresh handling here when the API is ready.
export default api
