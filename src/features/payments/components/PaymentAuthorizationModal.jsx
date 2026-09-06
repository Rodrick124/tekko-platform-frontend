import { BellRing, LoaderCircle, LockKeyhole, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import PaymentCountdown from './PaymentCountdown.jsx'

function PaymentAuthorizationModal({open, method, maskedPhone, verifying, onValidate, onCancel, onExpire}) {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current
    document.body.style.overflow = 'hidden'
    dialog?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !verifying) onCancel()
      if (event.key !== 'Tab' || !dialog) return
      const items = dialog.querySelectorAll('button:not(:disabled)')
      if (!items.length) return
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
  }, [open, verifying, onCancel])
  if (!open) return null
  const network = method === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0b1c30]/45 backdrop-blur-sm"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="authorization-title" tabIndex={-1} className="relative max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[360px] overflow-y-auto rounded-xl border border-slate-200 bg-white px-5 py-5 text-center shadow-[0_20px_25px_-5px_rgba(15,23,42,0.16),0_10px_10px_-5px_rgba(15,23,42,0.08)] outline-none sm:px-6 sm:py-6"><button type="button" onClick={onCancel} disabled={verifying} aria-label="Annuler le paiement" className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-lg text-slate-500 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-40"><X size={17}/></button><PaymentCountdown onExpire={onExpire}/><h2 id="authorization-title" className="mx-auto mt-3 max-w-[290px] text-lg font-extrabold leading-6 text-slate-950 sm:text-xl">Autorisation en cours sur votre mobile</h2><p className="mx-auto mt-1.5 max-w-[310px] text-xs leading-[1.45] text-slate-600">Une demande USSD a été envoyée au <strong className="whitespace-nowrap text-slate-900">{maskedPhone}</strong>. Autorisez le paiement de <strong className="text-slate-900">100 FCFA</strong> via {network}.</p><div className="mt-3 flex w-full items-start gap-2.5 rounded-lg bg-blue-50 p-3 text-left"><BellRing className="mt-0.5 shrink-0 text-blue-600" size={17}/><div><p className="text-xs font-bold leading-4 text-slate-900">Vous ne voyez rien s’afficher ?</p><p className="mt-0.5 text-[11px] leading-4 text-slate-600">Composez <strong>*126#</strong> (MTN) ou <strong>#150#</strong> (Orange), puis validez le paiement en attente.</p></div></div><div className="mt-4 grid grid-cols-[44fr_56fr] gap-2 max-[339px]:grid-cols-1"><button type="button" onClick={onCancel} disabled={verifying} className="h-10 whitespace-nowrap rounded-lg bg-slate-100 px-2 text-xs font-bold leading-none text-slate-800 outline-none transition hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50">Annuler</button><button type="button" onClick={onValidate} disabled={verifying} className="inline-flex h-10 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-600 px-2 text-xs font-bold leading-none text-white outline-none transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-70">{verifying ? <><LoaderCircle className="shrink-0 animate-spin" size={14}/>Vérification…</> : <><LockKeyhole className="shrink-0" size={14}/>Simuler la validation</>}</button></div></div></div>
}
export default PaymentAuthorizationModal
