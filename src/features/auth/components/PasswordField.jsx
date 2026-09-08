import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import FormError from './FormError.jsx'

function PasswordField({id, label, value, onChange, error, autoComplete}) {
  const [visible, setVisible] = useState(false)
  const errorId = id + '-error'
  return <div><label htmlFor={id} className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">{label}</label><div className="relative"><input id={id} type={visible ? 'text' : 'password'} value={value} onChange={onChange} autoComplete={autoComplete} placeholder="••••••••" aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className="w-full min-h-12 rounded-xl lg:min-h-11 border border-slate-300 py-2.5 pl-3 pr-10 text-sm text-slate-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"/><button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} aria-pressed={visible} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-slate-400 outline-none hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600">{visible ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div><FormError id={errorId}>{error}</FormError></div>
}
export default PasswordField
