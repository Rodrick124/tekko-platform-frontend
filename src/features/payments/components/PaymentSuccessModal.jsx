import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import UnlockedContactCard from './UnlockedContactCard.jsx'
function PaymentSuccessModal({open, provider, grant, onClose}) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  if (!open || !grant) return null
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"><div role="dialog" aria-modal="true" aria-labelledby="success-title" className="mx-auto my-6 w-full max-w-2xl rounded-3xl bg-emerald-50 p-4 shadow-2xl sm:p-7"><div className="relative px-3 pb-5 text-center"><button ref={closeRef} type="button" onClick={onClose} aria-label="Fermer" className="absolute right-0 top-0 rounded-full p-2 text-slate-500 hover:bg-white"><X size={20}/></button><CheckCircle2 className="mx-auto text-emerald-600" size={48}/><p className="mt-3 text-xs font-bold uppercase tracking-widest text-emerald-700">Transaction confirmée</p><h2 id="success-title" className="mt-2 text-3xl font-black">Paiement simulé avec succès</h2><p className="mt-2 text-sm text-slate-600">Votre accès de démonstration est actif pendant 24 heures.</p></div><UnlockedContactCard provider={provider} grant={grant}/></div></div>
}
export default PaymentSuccessModal
