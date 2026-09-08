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
  return <aside className="relative flex h-full flex-col justify-between bg-gradient-to-br from-[#0f2851] via-[#0b192c] to-[#081324] p-5 text-white sm:p-6 lg:min-h-[580px] lg:p-10"><div className="pointer-events-none absolute -bottom-24 -right-24 size-52 rounded-full bg-blue-600/20 blur-3xl lg:size-64"/><div className="relative z-10"><span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 lg:gap-2 lg:px-3 lg:text-[10px]"><ShieldCheck size={13}/>{panel.badge}</span><h2 className="mt-3 text-xl font-extrabold leading-7 sm:text-[22px] lg:mt-6 lg:text-3xl lg:leading-tight">{panel.title}</h2><p className="mt-1.5 text-[13px] leading-5 text-slate-300 lg:mt-3 lg:text-sm lg:leading-6">{panel.text}</p><div className="mt-4 grid gap-3 lg:mt-8 lg:gap-4">{panel.items.map(([Icon, title, text]) => <div key={title} className="flex min-w-0 items-start gap-2.5 lg:gap-3.5"><span className="grid size-7 shrink-0 place-items-center rounded-lg border border-white/5 bg-white/10 text-emerald-400 lg:size-8"><Icon size={14}/></span><span className="min-w-0"><strong className="block text-xs font-semibold leading-4 lg:text-sm lg:leading-5">{title}</strong><small className="mt-0.5 block text-[10px] leading-[15px] text-slate-400 lg:text-xs lg:leading-4">{text}</small></span></div>)}</div></div><div className="relative z-10 mt-4 flex items-center gap-1.5 border-t border-white/10 pt-3 text-[10px] text-slate-400 lg:mt-8 lg:gap-2 lg:pt-7 lg:text-xs"><MapPin size={13}/>Plateforme Douala &amp; Yaoundé</div></aside>
}
export default AuthInfoPanel
