import { BadgeCheck, Clock3, MapPin, MessageCircle, ShieldCheck, WalletCards } from 'lucide-react'

const content = {
  login: {
    badge: 'Espace client sécurisé',
    title: 'Bon retour parmi nous.',
    text: 'Retrouvez vos prestataires, vos paiements de 100 FCFA et vos contacts WhatsApp débloqués depuis votre espace Tekko.',
    items: [
      [Clock3, 'Contacts actifs garantis 24h', 'Accès immédiat et historique vérifiable.'],
      [WalletCards, 'Historique Mobile Money', 'Paiements transparents et faciles à retrouver.'],
      [ShieldCheck, 'Prestataires camerounais référencés', 'Professionnels locaux audités par Tekko.'],
    ],
  },
  register: {
    badge: 'Rejoignez Tekko',
    title: 'Le bon prestataire, à portée de main.',
    text: 'Débloquez en un clic les coordonnées des meilleurs artisans vérifiés de Douala et Yaoundé.',
    items: [
      [BadgeCheck, 'Prestataires camerounais référencés', 'Électriciens, plombiers et frigoristes vérifiés.'],
      [WalletCards, 'Seulement 100 FCFA le contact', 'Règlement par MTN MoMo ou Orange Money.'],
      [MessageCircle, 'Accès direct WhatsApp pendant 24h', 'Échange direct, sans intermédiaire.'],
    ],
  },
}

function AuthInfoPanel({mode}) {
  const panel = content[mode]
  return <aside className="relative flex min-h-[580px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0f2851] via-[#0b192c] to-[#081324] p-8 text-white md:p-10"><div className="absolute -bottom-24 -right-24 size-64 rounded-full bg-blue-600/20 blur-3xl"/><div className="relative z-10"><span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400"><ShieldCheck size={14}/>{panel.badge}</span><h2 className="mt-6 text-2xl font-extrabold leading-tight lg:text-3xl">{panel.title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{panel.text}</p><div className="mt-8 space-y-4">{panel.items.map(([Icon, title, text]) => <div key={title} className="flex items-start gap-3.5"><span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/5 bg-white/10 text-emerald-400"><Icon size={16}/></span><span><strong className="block text-sm font-semibold">{title}</strong><small className="mt-0.5 block text-xs leading-4 text-slate-400">{text}</small></span></div>)}</div></div><div className="relative z-10 mt-8 flex items-center gap-2 border-t border-white/10 pt-7 text-xs text-slate-400"><MapPin size={14}/>Plateforme Douala &amp; Yaoundé</div></aside>
}
export default AuthInfoPanel
