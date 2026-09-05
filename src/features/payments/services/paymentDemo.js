function initializeDemoPayment({ providerId, method, phone }) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve({ reference: `DEMO-${providerId}-${Date.now()}`, providerId, method, phoneLastDigits: phone.slice(-2), status: 'pending' }), 700)
  })
}
export default initializeDemoPayment
