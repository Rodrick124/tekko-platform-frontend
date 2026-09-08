function AuthLayoutCard({mode, infoPanel, formPanel}) {
  const infoOrder = mode === 'login' ? 'md:order-1' : 'md:order-2'
  const formOrder = mode === 'login' ? 'md:order-2' : 'md:order-1'
  const motion = 'transition-[opacity,transform] duration-[350ms] motion-reduce:transition-none'
  return <div id="auth-content" className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-5px_rgba(11,25,44,0.08),0_4px_12px_-2px_rgba(11,25,44,0.03)] md:grid-cols-12"><div className={motion + ' md:col-span-5 ' + infoOrder}>{infoPanel}</div><div className={motion + ' flex items-center p-7 sm:p-10 md:col-span-7 md:min-h-[580px] md:p-12 ' + formOrder}>{formPanel}</div></div>
}
export default AuthLayoutCard
