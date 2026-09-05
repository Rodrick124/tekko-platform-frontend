import { Check, Clock3, Server, Smartphone } from 'lucide-react'
const steps=[{Icon:Smartphone,label:'Demande Mobile Money initialisée'},{Icon:Clock3,label:'Validation sur le téléphone'},{Icon:Server,label:'Confirmation backend et webhook'},{Icon:Check,label:'Accès WhatsApp pendant 24 heures'}]
function PaymentTimeline(){return <ol className="mt-6 grid gap-3 sm:grid-cols-4">{steps.map(({Icon,label},index)=><li key={label} className={`rounded-xl border p-4 text-xs ${index===0?'border-blue-300 bg-blue-50 text-blue-800':'border-slate-200 bg-white text-slate-500'}`}><Icon size={18}/><span className="mt-2 block font-semibold">{label}</span></li>)}</ol>}
export default PaymentTimeline
