import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth.js'
import FormError from './FormError.jsx'
import PasswordField from './PasswordField.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^6\d{8}$/

function RegisterForm({onModeChange, onSuccess}) {
  const { register } = useAuth()
  const [values, setValues] = useState({name: '', email: '', phone: '', password: '', confirmation: '', terms: false})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const update = (field) => (event) => setValues((current) => ({...current, [field]: event.target.value}))
  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const next = {}
    const phone = values.phone.replace(/\D/g, '')
    if (!values.name.trim()) next.name = 'Renseignez votre nom complet.'
    if (!emailPattern.test(values.email.trim())) next.email = 'Saisissez une adresse e-mail valide.'
    if (!phonePattern.test(phone)) next.phone = 'Saisissez neuf chiffres commençant par 6.'
    if (values.password.length < 8) next.password = 'Utilisez au moins huit caractères.'
    if (values.confirmation !== values.password) next.confirmation = 'Les mots de passe ne correspondent pas.'
    if (!values.terms) next.terms = 'Vous devez accepter les conditions pour continuer.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitting(true)
    try {
      register({fullName: values.name, email: values.email, phone, password: values.password})
      setValues((current) => ({...current, password: '', confirmation: ''}))
      onSuccess('Compte de démonstration créé et connecté.')
    } catch (error) {
      setErrors({email: error.message})
    } finally {
      setSubmitting(false)
    }
  }
  const fieldClass = 'w-full min-h-12 rounded-xl lg:min-h-11 border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
  return <div className="mx-auto min-w-0 w-full max-w-md"><header className="mb-6"><h1 className="text-[26px] font-bold text-[#0b192c] sm:text-[28px] md:text-3xl">Créez votre compte</h1><p className="mt-1 text-sm text-slate-500">Rejoignez Tekko et trouvez facilement le bon prestataire qualifié.</p></header><form onSubmit={submit} noValidate className="space-y-4 md:space-y-3.5 lg:space-y-4"><div><label htmlFor="register-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Nom complet</label><input id="register-name" value={values.name} onChange={update('name')} autoComplete="name" placeholder="ex : Jean-Paul Mvondo" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'register-name-error' : undefined} className={fieldClass}/><FormError id="register-name-error">{errors.name}</FormError></div><div><label htmlFor="register-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Adresse e-mail</label><input id="register-email" type="email" value={values.email} onChange={update('email')} autoComplete="email" placeholder="ex : client@domaine.cm" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'register-email-error' : undefined} className={fieldClass}/><FormError id="register-email-error">{errors.email}</FormError></div><div><label htmlFor="register-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">Numéro de téléphone</label><div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20"><span className="flex items-center border-r border-slate-200 bg-slate-100 px-3 text-xs font-bold text-slate-700">CM +237</span><input id="register-phone" inputMode="numeric" value={values.phone} onChange={update('phone')} autoComplete="tel-national" placeholder="670 12 34 56" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'register-phone-error' : undefined} className="min-h-12 min-w-0 flex-1 lg:min-h-11 px-4 py-2.5 text-sm outline-none"/></div><FormError id="register-phone-error">{errors.phone}</FormError></div><div className="grid min-w-0 gap-3 md:grid-cols-2"><PasswordField id="register-password" label="Mot de passe" value={values.password} onChange={update('password')} error={errors.password} autoComplete="new-password"/><PasswordField id="register-confirmation" label="Confirmer le mot de passe" value={values.confirmation} onChange={update('confirmation')} error={errors.confirmation} autoComplete="new-password"/></div><div><label className="flex cursor-pointer items-start gap-3 text-[13px] font-medium leading-5 text-slate-700"><input type="checkbox" checked={values.terms} onChange={(event) => setValues((current) => ({...current, terms: event.target.checked}))} aria-invalid={Boolean(errors.terms)} aria-describedby={errors.terms ? 'register-terms-error' : undefined} className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-600"/><span>J’accepte les <a href="/conditions-utilisation" className="font-semibold text-blue-600 underline">Conditions Générales d’Utilisation</a> et la <a href="/politique-confidentialite" className="font-semibold text-blue-600 underline">Politique de Confidentialité</a> de Tekko.</span></label><FormError id="register-terms-error">{errors.terms}</FormError></div><button type="submit" disabled={submitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <><LoaderCircle className="animate-spin" size={17}/>Validation…</> : <>Créer mon compte client<ArrowRight size={17}/></>}</button></form><p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-600">Vous possédez déjà un compte ? <button type="button" onClick={() => onModeChange('login')} className="ml-1 font-bold text-blue-600 hover:underline">Se connecter</button></p></div>
}
export default RegisterForm
