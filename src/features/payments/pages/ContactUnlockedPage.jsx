import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import mockProviders from '../../../data/mockProviders.js'
import { ROUTES } from '../../../constants/routes.js'
import UnlockedContactCard from '../components/UnlockedContactCard.jsx'
import { getDemoGrant } from '../services/paymentDemo.js'
function ContactUnlockedPage() {
  const {providerId} = useParams()
  const provider = mockProviders.find((item) => item.id === providerId)
  const grant = getDemoGrant(providerId)
  if (provider && grant) return <section className="mx-auto max-w-3xl px-4 py-14"><UnlockedContactCard provider={provider} grant={grant}/><Link to={'/prestataires/' + provider.id} className="mx-auto mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={17}/>Retour au profil</Link></section>
  return <section className="mx-auto max-w-2xl px-4 py-20 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-blue-100 text-blue-700"><ShieldAlert size={30}/></span><h1 className="mt-5 text-3xl font-bold">Autorisation requise</h1><p className="mt-3 leading-7 text-slate-600">Ce contact nécessite un accès de démonstration actif dans cet onglet. Aucun numéro n’est disponible sans validation.</p><Link to={provider ? '/paiement/' + provider.id : ROUTES.providers} className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"><ArrowLeft size={18}/>{provider ? 'Accéder au paiement' : 'Voir les prestataires'}</Link></section>
}
export default ContactUnlockedPage
