import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes.js'
import mockProviders from '../../../data/mockProviders.js'
import PaymentStatusCard from '../components/PaymentStatusCard.jsx'
import PaymentTimeline from '../components/PaymentTimeline.jsx'
import UnlockedContactCard from '../components/UnlockedContactCard.jsx'
import { findDemoGrantByReference } from '../services/paymentDemo.js'
function PaymentStatusPage() {
  const {reference} = useParams()
  const grant = findDemoGrantByReference(reference)
  const provider = grant ? mockProviders.find((item) => item.id === grant.providerId) : null
  return <section className="py-14"><div className="mx-auto max-w-4xl px-4 lg:px-8"><PaymentStatusCard status={grant ? 'confirmed' : 'pending'} reference={reference}/>{grant && provider ? <div className="mt-6"><UnlockedContactCard provider={provider} grant={grant}/></div> : <PaymentTimeline/>}<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">{grant && provider && <Link to={'/contact-debloque/' + provider.id} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"><ExternalLink size={17}/>Ouvrir le contact</Link>}<Link to={provider ? '/prestataires/' + provider.id : ROUTES.providers} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold"><ArrowLeft size={17}/>Retour au prestataire</Link></div>{!grant && <p className="mt-5 text-center text-xs text-slate-500">Cette référence ne correspond à aucun accès actif dans cet onglet.</p>}</div></section>
}
export default PaymentStatusPage
