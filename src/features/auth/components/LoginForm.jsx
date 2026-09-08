import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes.js'
import authService from '../../../services/authService.js'
import FormError from './FormError.jsx'
import PasswordField from './PasswordField.jsx'

function LoginForm({onModeChange, onSuccess}) {
  const [values, setValues] = useState({identifier: '', password: '', remember: false})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const update = (field) => (event) => setValues((current) => ({...current, [field]: event.target.value}))
  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const next = {}
    if (!values.identifier.trim()) next.identifier = 'Renseignez votre adresse e-mail ou votre numéro de téléphone.'
    if (!values.password) next.password = 'Renseignez votre mot de passe.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitting(true)
    const result = await authService.demoLogin()
    setSubmitting(false)
    onSuccess(result.message)
  }
  return <div className="mx-auto w-full max-w-md"><header className="mb-8"><h1 className="text-2xl font-bold text-[#0b192c] sm:text-3xl">Connectez-vous</h1><p className="mt-1.5 text-sm text-slate-500">Accédez à vos déblocages et coordonnées de prestataires.</p></header><form onSubmit={submit} noValidate className="space-y-5"><div><label htmlFor="login-identifier" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Adresse e-mail ou numéro de téléphone (+237)</label><input id="login-identifier" value={values.identifier} onChange={update('identifier')} autoComplete="username" placeholder="ex : 670 12 34 56 ou client@email.cm" aria-invalid={Boolean(errors.identifier)} aria-describedby={errors.identifier ? 'login-identifier-error' : undefined} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"/><FormError id="login-identifier-error">{errors.identifier}</FormError></div><div><div className="mb-1.5 flex items-center justify-end"><Link to={ROUTES.forgotPassword} className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">Mot de passe oublié ?</Link></div><PasswordField id="login-password" label="Mot de passe" value={values.password} onChange={update('password')} error={errors.password} autoComplete="current-password"/></div><label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600"><input type="checkbox" checked={values.remember} onChange={(event) => setValues((current) => ({...current, remember: event.target.checked}))} className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"/>Se souvenir de cet appareil</label><button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <><LoaderCircle className="animate-spin" size={17}/>Validation…</> : <>Se connecter<ArrowRight size={17}/></>}</button></form><p className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-600">Vous n’avez pas encore de compte ? <button type="button" onClick={() => onModeChange('register')} className="ml-1 font-bold text-blue-600 hover:underline">Créer un compte</button></p></div>
}
export default LoginForm
