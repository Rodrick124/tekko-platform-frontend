import { Menu, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import tekkoHeaderLogo from '../../assets/images/branding/tekko-logo-header.png'

const navigation = [
  { label: 'Accueil', to: ROUTES.home, end: true },
  { label: 'Prestataires', to: ROUTES.providers },
  { label: 'Comment ça marche', to: ROUTES.howItWorks },
  { label: 'À propos', to: ROUTES.about },
]

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => { const close = (event) => event.key === 'Escape' && setOpen(false); document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close) }, [])
  const navClass = ({ isActive }) => `border-b-2 py-2 text-sm font-semibold transition ${isActive ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-600 hover:text-blue-700'}`
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_1px_8px_rgba(15,23,42,.05)] backdrop-blur-md">
    <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 lg:px-8">
      <div className="flex items-center gap-8"><NavLink to={ROUTES.home} className="flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label="Tekko — Accueil"><img src={tekkoHeaderLogo} alt="Tekko" className="h-10 w-auto object-contain sm:h-12" /></NavLink>
        <nav className="hidden items-center gap-4 lg:flex" aria-label="Navigation principale">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>{item.label}</NavLink>)}</nav>
      </div>
      <div className="hidden items-center gap-2 sm:flex"><NavLink to={ROUTES.login} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Se connecter</NavLink><NavLink to={ROUTES.register} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Créer un compte</NavLink><span className="grid size-8 place-items-center rounded-full bg-blue-700 text-white"><UserRound size={16} /></span></div>
      <button type="button" className="grid size-11 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="border-t bg-white px-4 py-4 lg:hidden" aria-label="Navigation mobile"><div className="mx-auto grid max-w-6xl gap-1">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `rounded-lg px-4 py-3 font-semibold ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`} onClick={() => setOpen(false)}>{item.label}</NavLink>)}<NavLink to={ROUTES.login} className="rounded-lg px-4 py-3 font-semibold text-slate-700" onClick={() => setOpen(false)}>Se connecter</NavLink><NavLink to={ROUTES.register} className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white" onClick={() => setOpen(false)}>Créer un compte</NavLink></div></nav>}
  </header>
}
export default Header
