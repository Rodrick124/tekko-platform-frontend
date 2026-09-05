function formatDate(value) { return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(value)) }
export default formatDate
