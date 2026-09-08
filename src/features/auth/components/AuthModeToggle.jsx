function AuthModeToggle({mode, onChange}) {
  const itemClass = (active) => 'flex-1 rounded-xl px-4 py-2.5 text-sm font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ' + (active ? 'bg-blue-600 text-white shadow-sm' : 'text-[#0f2851] hover:bg-white/60')
  return <div role="tablist" aria-label="Choix d’authentification" className="mx-auto flex w-full max-w-md rounded-2xl bg-slate-200/80 p-1.5 shadow-inner"><button type="button" role="tab" aria-selected={mode === 'login'} className={itemClass(mode === 'login')} onClick={() => onChange('login')}>Se connecter</button><button type="button" role="tab" aria-selected={mode === 'register'} className={itemClass(mode === 'register')} onClick={() => onChange('register')}>Créer un compte</button></div>
}
export default AuthModeToggle
