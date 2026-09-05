import { ArrowLeft, RefreshCw } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes.js'
import PaymentStatusCard from '../components/PaymentStatusCard.jsx'
import PaymentTimeline from '../components/PaymentTimeline.jsx'
function PaymentStatusPage(){const {reference}=useParams();const {state}=useLocation();return <section className="py-14"><div className="mx-auto max-w-4xl px-4 lg:px-8"><PaymentStatusCard status="pending" reference={reference}/><PaymentTimeline/><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" disabled className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500"><RefreshCw size={17}/>Vérification serveur indisponible</button><Link to={state?.providerId?`/prestataires/${state.providerId}`:ROUTES.providers} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold"><ArrowLeft size={17}/>Retour au prestataire</Link></div><p className="mt-5 text-center text-xs text-slate-500">Aucun accès n’est créé par cette interface de démonstration.</p></div></section>}
export default PaymentStatusPage
