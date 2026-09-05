import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
function AdminRoute() { return <ProtectedRoute allowedRole="admin" /> }
export default AdminRoute
