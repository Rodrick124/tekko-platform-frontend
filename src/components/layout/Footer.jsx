import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import tekkoFullLogo from '../../assets/images/branding/tekko-logo-full.jpeg'

function Footer() { return <footer className="border-t border-slate-200 bg-white pb-8 pt-16"><div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
  <div><img src={tekkoFullLogo} alt="Tekko — Un scan, un problème, une solution" className="h-auto w-full max-w-56 object-contain" /><p className="mt-3 text-sm leading-6 text-slate-600">Trouvez le bon prestataire, près de chez vous. Accès sécurisé aux contacts vérifiés.</p><div className="mt-4 flex gap-2 text-[10px] font-bold"><span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">MTN Mobile Money</span><span className="rounded bg-orange-100 px-2 py-1 text-orange-800">Orange Money</span></div></div>
  <div><h2 className="font-bold">Services populaires</h2><ul className="mt-4 space-y-2 text-sm text-slate-600">{['Électricité & Câblage','Climatisation & Froid','Plomberie & Sanitaire','Vidéosurveillance & Alarme'].map((name) => <li key={name}><Link to={`${ROUTES.providers}?service=${encodeURIComponent(name)}`} className="hover:text-blue-700">{name}</Link></li>)}</ul></div>
  <div><h2 className="font-bold">Villes couvertes</h2><ul className="mt-4 space-y-2 text-sm text-slate-600">{['Douala','Yaoundé','Bafoussam','Kribi','Limbe'].map((city) => <li key={city}><Link to={`${ROUTES.providers}?localisation=${city}`} className="hover:text-blue-700">{city}</Link></li>)}</ul></div>
  <div><h2 className="font-bold">Plateforme & Légal</h2><ul className="mt-4 space-y-2 text-sm text-slate-600"><li><Link to={ROUTES.howItWorks}>Comment ça marche</Link></li><li><Link to={ROUTES.about}>À propos</Link></li><li><a href="mailto:support@servicelink.cm" className="inline-flex items-center gap-1 text-emerald-700"><MessageCircle size={15} />Support</a></li></ul></div>
  </div><div className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>© 2026 Tekko Cameroun. Tous droits réservés.</p><p className="text-emerald-700">● Réseau vérifié</p></div></div></footer> }
export default Footer
