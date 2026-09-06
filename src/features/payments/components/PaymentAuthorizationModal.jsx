import { LoaderCircle, LockKeyhole, Smartphone, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import PaymentCountdown from './PaymentCountdown.jsx'

function PaymentAuthorizationModal({open, method, maskedPhone, verifying, onValidate, onCancel, onExpire}) {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    const dialog = dialogRef.current
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
    return () => { document.removeEventListener('keydown', onKeyDown); previousFocus?.focus() }
  }, [open, verifying, onCancel])
  if (!open) return null
  const network = method === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'
  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="authorization-title" tabIndex={-1} className="relative w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl outline-none sm:p-8"><button type="button" onClick={onCancel} disabled={verifying} aria-label="Annuler le paiement" className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40"><X size={20}/></button><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-700"><Smartphone size={24}/></span><p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-700">Autorisation Mobile Money</p><h2 id="authorization-title" className="mt-2 text-2xl font-extrabold text-slate-950">Validez la demande sur votre téléphone</h2><p className="mt-2 text-sm leading-6 text-slate-600">Une demande de 100 FCFA a été préparée pour <strong>{maskedPhone}</strong> via {network}.</p><div className="my-6"><PaymentCountdown onExpire={onExpire}/></div><ol className="rounded-2xl bg-blue-50 p-4 text-left text-sm leading-6 text-slate-700"><li><strong>1.</strong> Consultez le prompt affiché sur votre téléphone.</li><li><strong>2.</strong> Vérifiez le montant de 100 FCFA.</li><li><strong>3.</strong> En mode réel, votre code secret resterait saisi sur votre téléphone.</li></ol><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={onCancel} disabled={verifying} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50 disabled:opacity-50">Annuler</button><button type="button" onClick={onValidate} disabled={verifying} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-70">{verifying ? <><LoaderCircle className="animate-spin" size={18}/>Vérification…</> : <><LockKeyhole size={18}/>Simuler la validation</>}</button></div><p className="mt-4 text-[11px] text-slate-500">Simulation Tekko : aucune requête USSD et aucun débit réel.</p></div></div>
}
export default PaymentAuthorizationModal
