import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import UnlockedContactCard from './UnlockedContactCard.jsx'

function PaymentSuccessModal({open, provider, grant, onClose}) {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current
    document.body.style.overflow = 'hidden'
    dialog?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialog) return
      const items = dialog.querySelectorAll('button, a[href]')
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
  }, [open, onClose])
  if (!open || !grant) return null
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0b1c30]/45 backdrop-blur-sm"><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="success-title" tabIndex={-1} className="relative max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[410px] overflow-y-auto rounded-xl border border-slate-200 border-t-[3px] border-t-emerald-500 bg-white px-[18px] pb-[18px] pt-5 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.16),0_10px_10px_-5px_rgba(15,23,42,0.08)] outline-none sm:px-5 sm:pb-5"><button type="button" onClick={onClose} aria-label="Fermer" className="absolute right-2.5 top-2.5 z-10 grid size-8 place-items-center rounded-lg text-slate-500 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600"><X size={17}/></button><div className="pr-8"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Transaction confirmée • 100 FCFA</p><h2 id="success-title" className="mt-1 text-lg font-extrabold leading-6 text-slate-950 sm:text-xl">Coordonnées du prestataire débloquées !</h2></div><div className="mt-3"><UnlockedContactCard provider={provider} grant={grant} compact/></div></div></div>
}
export default PaymentSuccessModal
