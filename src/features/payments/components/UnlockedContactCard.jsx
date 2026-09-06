import { Check, Clock3, Copy, MessageCircle, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DEMO_CONTACT } from '../services/paymentDemo.js'

function formatRemaining(expiresAt) {
  const seconds = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  return hours + ' h ' + minutes + ' min'
}

function UnlockedContactCard({provider, grant}) {
  const [remaining, setRemaining] = useState(() => formatRemaining(grant.expiresAt))
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(formatRemaining(grant.expiresAt)), 30000)
    return () => window.clearInterval(timer)
  }, [grant.expiresAt])
  const notify = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2200) }
  const copy = async () => {
    try { await navigator.clipboard.writeText(DEMO_CONTACT); notify('Numéro fictif copié') }
    catch { notify('Copie non disponible dans ce navigateur') }
  }
  const shareText = encodeURIComponent('Je souhaite contacter ' + provider.name + ' via Tekko. Numéro de démonstration : ' + DEMO_CONTACT)
  return <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-emerald-200 sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800"><Check size={15}/>Contact débloqué</span><h2 className="mt-4 text-2xl font-extrabold">{provider.name}</h2><p className="mt-1 text-sm text-slate-600">Numéro fictif réservé à la démonstration.</p></div><span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><Clock3 size={17}/>{remaining} restantes</span></div><p className="mt-7 break-words text-3xl font-black tracking-tight text-slate-950">{DEMO_CONTACT}</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50"><Copy size={17}/>Copier</button><a href={'https://wa.me/?text=' + shareText} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"><MessageCircle size={17}/>WhatsApp</a><button type="button" onClick={() => notify('Appel simulé — aucun appel n’a été lancé')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"><Phone size={17}/>Appeler</button></div><p className="mt-4 min-h-5 text-center text-xs font-semibold text-blue-700" role="status" aria-live="polite">{notice}</p><p className="mt-2 text-xs leading-5 text-slate-500">Accès temporaire conservé uniquement dans cet onglet pendant 24 heures. Référence : {grant.reference}</p></div>
}
export default UnlockedContactCard
