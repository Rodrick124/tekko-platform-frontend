function formatCurrency(amount) { return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount)} FCFA` }
export default formatCurrency
