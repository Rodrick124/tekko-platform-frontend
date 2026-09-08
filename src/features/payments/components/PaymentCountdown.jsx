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
    <div className="relative mx-auto grid size-[68px] place-items-center rounded-full" style={{background: 'conic-gradient(#2563eb ' + progress + 'deg, #dbeafe 0deg)'}}>
      <div className="grid size-[60px] place-items-center rounded-full bg-white text-center">
        <span><strong className="text-xl leading-none text-blue-700">{remaining}</strong><span className="ml-0.5 text-[9px] font-bold text-blue-700">s</span></span>
      </div>
    </div>
  )
}

export default PaymentCountdown
