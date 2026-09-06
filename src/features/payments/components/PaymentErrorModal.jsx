import { AlertTriangle, Clock3, RotateCcw, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
const CONTENT = {
  refused: {title: 'Paiement refusé', text: 'Vérifiez le solde du compte ou réessayez.', icon: AlertTriangle},
  expired: {title: 'Délai dépassé', text: 'La demande a expiré. Vous pouvez en générer une nouvelle.', icon: Clock3},
  cancelled: {title: 'Paiement annulé', text: 'Aucun débit et aucun accès n’ont été créés.', icon: X},
  error: {title: 'Erreur de vérification', text: 'La simulation n’a pas pu confirmer la demande.', icon: AlertTriangle},
}
function PaymentErrorModal({type, onRetry, onClose}) {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (!type) return undefined
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current
    document.body.style.overflow = 'hidden'
    dialog?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialog) return
      const items = dialog.querySelectorAll('button')
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [type, onClose])
  if (!type) return null
  const item = CONTENT[type] || CONTENT.error
  const Icon = item.icon
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="payment-error-title" tabIndex={-1} className="max-h-[80dvh] w-[calc(100%-32px)] max-w-[360px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_24px_64px_rgba(15,23,42,0.24)] outline-none sm:max-h-[85vh] sm:max-w-[380px] sm:p-6"><span className="mx-auto grid size-11 place-items-center rounded-full bg-red-100 text-red-700"><Icon size={22}/></span><h2 id="payment-error-title" className="mt-3 text-xl font-extrabold">{item.title}</h2><p className="mt-1.5 text-sm leading-5 text-slate-600">{item.text}</p><div className="mt-5 grid grid-cols-2 gap-2"><button type="button" onClick={onClose} className="h-11 rounded-xl border border-slate-300 px-3 text-sm font-bold outline-none transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-600">Fermer</button><button type="button" onClick={onRetry} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 text-sm font-bold text-white outline-none transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"><RotateCcw size={16}/>Réessayer</button></div></div></div>
}
export default PaymentErrorModal
