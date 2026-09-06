import { ArrowLeft, ChevronRight, LockKeyhole } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes.js'
import mockProviders from '../../../data/mockProviders.js'
import MobileMoneyForm from '../components/MobileMoneyForm.jsx'
import PaymentAuthorizationModal from '../components/PaymentAuthorizationModal.jsx'
import PaymentDemoControls from '../components/PaymentDemoControls.jsx'
import PaymentErrorModal from '../components/PaymentErrorModal.jsx'
import PaymentSecurityNotice from '../components/PaymentSecurityNotice.jsx'
import PaymentSuccessModal from '../components/PaymentSuccessModal.jsx'
import PaymentSummary from '../components/PaymentSummary.jsx'
import UnlockedContactCard from '../components/UnlockedContactCard.jsx'
import { createDemoGrant, getDemoGrant, maskPaymentPhone } from '../services/paymentDemo.js'

function PaymentPage() {
  const {providerId} = useParams()
  const provider = mockProviders.find((item) => item.id === providerId)
  const [grant, setGrant] = useState(() => getDemoGrant(providerId))
  const [scenario, setScenario] = useState('success')
  const [request, setRequest] = useState(null)
  const [authorizationOpen, setAuthorizationOpen] = useState(false)
  const [authorizationKey, setAuthorizationKey] = useState(0)
  const [verifying, setVerifying] = useState(false)
  const [errorType, setErrorType] = useState(null)
  const [successOpen, setSuccessOpen] = useState(false)

  const closeAuthorization = useCallback(() => {
    setAuthorizationOpen(false)
    setVerifying(false)
  }, [])
  const showError = useCallback((type) => {
    closeAuthorization()
    setErrorType(type)
  }, [closeAuthorization])
  const start = ({method, phone}) => {
    if (grant) return
    setRequest({method, maskedPhone: maskPaymentPhone(phone)})
    setAuthorizationKey((value) => value + 1)
    setAuthorizationOpen(true)
  }
  const validate = () => {
    if (verifying) return
    setVerifying(true)
    window.setTimeout(() => {
      if (scenario !== 'success') {
        showError(scenario)
        return
      }
      const newGrant = createDemoGrant(providerId)
      setGrant(newGrant)
      closeAuthorization()
      setSuccessOpen(true)
    }, 700)
  }
  const retry = () => {
    setErrorType(null)
    setAuthorizationKey((value) => value + 1)
    setAuthorizationOpen(true)
  }
  const cancel = useCallback(() => showError('cancelled'), [showError])
  const expire = useCallback(() => showError('expired'), [showError])
  const closeError = useCallback(() => setErrorType(null), [])
  const closeSuccess = useCallback(() => setSuccessOpen(false), [])

  if (!provider) return <section className="mx-auto max-w-2xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">Prestataire introuvable</h1><p className="mt-3 text-slate-600">Impossible de préparer un paiement pour cet identifiant.</p><Link to={ROUTES.providers} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"><ArrowLeft size={18}/>Retour aux prestataires</Link></section>
  return <section className="py-10"><div className="mx-auto max-w-6xl px-4 lg:px-8"><nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-xs text-slate-500"><Link to={ROUTES.home}>Accueil</Link><ChevronRight size={13}/><Link to={ROUTES.providers}>Prestataires</Link><ChevronRight size={13}/><Link to={'/prestataires/' + provider.id}>{provider.name}</Link><ChevronRight size={13}/><span className="font-bold text-slate-800">Paiement sécurisé</span></nav><div className="mt-8"><p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-[10px] font-bold uppercase text-blue-700"><LockKeyhole size={13}/>Pass accès direct 24h</p><h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Débloquez le contact en toute sécurité</h1><p className="mt-2 text-sm text-slate-600">{grant ? 'Votre accès de démonstration est déjà actif : aucun second paiement n’est nécessaire.' : 'Simulez un micropaiement unique de 100 FCFA. Aucun contact n’est visible avant confirmation.'}</p></div><div className="mt-8 grid items-start gap-6 lg:grid-cols-12"><div className="space-y-5 lg:col-span-5"><PaymentSummary provider={provider}/><PaymentSecurityNotice/><PaymentDemoControls value={scenario} onChange={setScenario} disabled={authorizationOpen || Boolean(grant)}/></div><div className="lg:col-span-7">{grant ? <UnlockedContactCard provider={provider} grant={grant}/> : <MobileMoneyForm onSubmit={start} processing={authorizationOpen}/>}</div></div></div><PaymentAuthorizationModal key={authorizationKey} open={authorizationOpen} method={request?.method} maskedPhone={request?.maskedPhone} verifying={verifying} onValidate={validate} onCancel={cancel} onExpire={expire}/><PaymentErrorModal type={errorType} onRetry={retry} onClose={closeError}/><PaymentSuccessModal open={successOpen} provider={provider} grant={grant} onClose={closeSuccess}/></section>
}
export default PaymentPage
