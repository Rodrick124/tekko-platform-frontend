function AuthLayoutCard({mode, infoPanel, formPanel}) {
  const isLogin = mode === 'login'
  const motion = 'h-full min-w-0 self-stretch transition-[opacity,transform] duration-[350ms] motion-reduce:transition-none'
  const infoColumn = <div key="info" className={motion + ' hidden lg:block'}>{infoPanel}</div>
  const formColumn = <div key="form" className={motion + ' flex items-center p-6 sm:p-8 md:p-10 lg:min-h-[580px] lg:p-12'}>{formPanel}</div>
  return <div id="auth-content" className={'auth-layout-card min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-5px_rgba(11,25,44,0.08),0_4px_12px_-2px_rgba(11,25,44,0.03)] lg:rounded-3xl auth-layout-card--' + mode}>{isLogin ? <>{infoColumn}{formColumn}</> : <>{formColumn}{infoColumn}</>}</div>
}
export default AuthLayoutCard
