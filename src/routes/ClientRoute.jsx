import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
function ClientRoute() { return <ProtectedRoute allowedRole="client" /> }
export default ClientRoute
