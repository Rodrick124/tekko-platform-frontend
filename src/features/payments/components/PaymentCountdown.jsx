import { useEffect, useState } from 'react'

function PaymentCountdown({duration = 90, onExpire}) {
  const [remaining, setRemaining] = useState(duration)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          window.clearInterval(timer)
          onExpire()
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [duration, onExpire])

  const progress = (remaining / duration) * 360
  return (
    <div className="relative mx-auto grid size-28 place-items-center rounded-full" style={{background: 'conic-gradient(#2563eb ' + progress + 'deg, #dbeafe 0deg)'}}>
      <div className="grid size-24 place-items-center rounded-full bg-white text-center">
        <span><strong className="block text-3xl text-slate-950">{remaining}</strong><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">secondes</span></span>
      </div>
    </div>
  )
}

export default PaymentCountdown
