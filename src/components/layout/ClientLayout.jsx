import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
function ClientLayout() { return <div className="min-h-screen bg-slate-50"><Header /><main><Outlet /></main></div> }
export default ClientLayout
