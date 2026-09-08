import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes.js'
import AuthInfoPanel from './AuthInfoPanel.jsx'
import AuthLayoutCard from './AuthLayoutCard.jsx'
import AuthModeToggle from './AuthModeToggle.jsx'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'

function AuthPage({initialMode = 'login'}) {
  const location = useLocation()
  const navigate = useNavigate()
  const mode = location.pathname === ROUTES.register ? 'register' : initialMode
  const [notice, setNotice] = useState('')
  const changeMode = (nextMode) => {
    if (nextMode === mode) return
    setNotice('')
    navigate(nextMode === 'login' ? ROUTES.login : ROUTES.register)
  }
  const showDemoNotice = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 5000)
  }
  const form = mode === 'login'
    ? <LoginForm onModeChange={changeMode} onSuccess={showDemoNotice}/>
    : <RegisterForm onModeChange={changeMode} onSuccess={showDemoNotice}/>
  return <section className="min-w-0 px-4 py-6 sm:py-8 lg:px-4 lg:py-14"><div className="mx-auto w-full max-w-[560px] lg:max-w-5xl"><AuthModeToggle mode={mode} onChange={changeMode}/>{notice && <div role="status" aria-live="polite" className="mt-3 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18}/><span>{notice}</span></div>}<div key={mode} className="mt-3 animate-[auth-enter_350ms_ease-out] motion-reduce:animate-none"><AuthLayoutCard mode={mode} infoPanel={<AuthInfoPanel mode={mode}/>} formPanel={form}/></div></div></section>
}
export default AuthPage
