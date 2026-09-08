function AuthModeToggle({mode, onChange}) {
  const itemClass = (active) => 'min-w-0 flex-1 whitespace-nowrap rounded-xl px-2 py-2 text-xs font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:px-4 sm:text-sm lg:py-2.5 ' + (active ? 'bg-blue-600 text-white shadow-sm' : 'text-[#0f2851] hover:bg-white/60')
  return <div role="tablist" aria-label="Choix d’authentification" className="mx-auto flex h-11 w-full max-w-full rounded-2xl bg-slate-200/80 p-1 shadow-inner lg:h-auto lg:max-w-md lg:p-1.5"><button type="button" role="tab" aria-selected={mode === 'login'} className={itemClass(mode === 'login')} onClick={() => onChange('login')}>Se connecter</button><button type="button" role="tab" aria-selected={mode === 'register'} className={itemClass(mode === 'register')} onClick={() => onChange('register')}>Créer un compte</button></div>
}
export default AuthModeToggle
