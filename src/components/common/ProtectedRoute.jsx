import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
function ProtectedRoute({ allowedRole }) { const { isAuthenticated, user } = useAuth(); if (!isAuthenticated) return <Navigate to="/connexion" replace />; if (allowedRole && user?.role !== allowedRole) return <Navigate to="/interdit" replace />; return <Outlet /> }
export default ProtectedRoute
