import { AlertTriangle, Clock3, RotateCcw, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
const CONTENT = {
  refused: {title: 'Paiement refusé', text: 'La validation a été refusée. Vérifiez le solde du compte ou réessayez.', icon: AlertTriangle},
  expired: {title: 'Délai dépassé', text: 'La demande a expiré après 90 secondes. Vous pouvez en générer une nouvelle.', icon: Clock3},
  cancelled: {title: 'Paiement annulé', text: 'Aucun débit n’a été effectué et aucun accès n’a été créé.', icon: X},
  error: {title: 'Erreur de vérification', text: 'La simulation n’a pas pu confirmer la demande. Réessayez dans un instant.', icon: AlertTriangle},
}
function PaymentErrorModal({type, onRetry, onClose}) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!type) return undefined
    closeRef.current?.focus()
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [type, onClose])
  if (!type) return null
  const item = CONTENT[type] || CONTENT.error
  const Icon = item.icon
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"><div role="alertdialog" aria-modal="true" aria-labelledby="payment-error-title" className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl"><span className="mx-auto grid size-14 place-items-center rounded-full bg-red-100 text-red-700"><Icon size={27}/></span><h2 id="payment-error-title" className="mt-4 text-2xl font-extrabold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><button ref={closeRef} type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold">Fermer</button><button type="button" onClick={onRetry} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"><RotateCcw size={17}/>Réessayer</button></div></div></div>
}
export default PaymentErrorModal
