import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
function PublicLayout() { return <div className="flex min-h-screen flex-col bg-[#f8f9ff]"><Header /><main className="flex-1"><Outlet /></main><Footer /></div> }
export default PublicLayout
