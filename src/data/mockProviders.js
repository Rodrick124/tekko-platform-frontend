const featuredProviders = [
  { id: 'p-001', name: 'Jean-Paul Kamga', categoryId: 'electricite', category: 'Électricité & Câblage', city: 'Douala', district: 'Akwa', rating: 4.9, jobs: 142, eta: '25–40 min', available: true, description: 'Dépannage tableau électrique, raccordement et groupe électrogène.', services: ['Tableau électrique', 'Groupe secours'] },
  { id: 'p-002', name: 'Paul Tcham', categoryId: 'climatisation', category: 'Climatisation & Froid', city: 'Douala', district: 'Bonamoussadi', rating: 4.9, jobs: 128, eta: '20–45 min', available: true, description: 'Diagnostic pannes, compresseurs inverter et recharge gaz.', services: ['Recharge gaz', 'Split inverter'] },
  { id: 'p-003', name: 'André Bibila', categoryId: 'plomberie', category: 'Plomberie & Sanitaire', city: 'Douala', district: 'Deido', rating: 4.8, jobs: 94, eta: '15–30 min', available: true, description: 'Recherche de fuite, débouchage et chauffe-eau.', services: ['Débouchage WC', 'Fuite eau'] },
  { id: 'p-004', name: 'Fabrice Nguemo', categoryId: 'videosurveillance', category: 'Vidéosurveillance & Alarme', city: 'Yaoundé', district: 'Bastos', rating: 5, jobs: 83, eta: '30–50 min', available: true, description: 'Installation caméras IP avec visualisation smartphone.', services: ['Caméras Hikvision', 'Alarme Dahua'] },
  { id: 'p-005', name: 'Marie-Noëlle Fotso', categoryId: 'electromenager', category: 'Dépannage Électroménager', city: 'Yaoundé', district: 'Mvan', rating: 4.7, jobs: 110, eta: 'Libre à 15h30', available: false, description: 'Réparation frigos, congélateurs et machines à laver.', services: ['Froid domestique', 'Lave-linge'] },
  { id: 'p-006', name: 'Franck Mbarga', categoryId: 'informatique', category: 'Informatique & Réseaux', city: 'Yaoundé', district: 'Yassa', rating: 4.9, jobs: 76, eta: '35–55 min', available: true, description: 'Réparation ordinateurs, réseaux et configuration Wi-Fi.', services: ['Formatage & SSD', 'Réseau Wi-Fi'] },
  { id: 'p-007', name: 'Estelle Mballa', categoryId: 'electricite', category: 'Électricité & Câblage', city: 'Yaoundé', district: 'Biyem-Assi', rating: 4.8, jobs: 67, eta: '30–45 min', available: true, description: 'Installations résidentielles et recherche de court-circuit.', services: ['Câblage', 'Disjoncteurs'] },
  { id: 'p-008', name: 'Boris Ewane', categoryId: 'plomberie', category: 'Plomberie & Sanitaire', city: 'Douala', district: 'Makepe', rating: 4.6, jobs: 58, eta: '40–60 min', available: false, description: 'Raccordement, sanitaires et entretien de pompes.', services: ['Pompes à eau', 'Sanitaires'] },
  { id: 'p-009', name: 'Clarisse Talla', categoryId: 'climatisation', category: 'Climatisation & Froid', city: 'Bafoussam', district: 'Centre-ville', rating: 4.9, jobs: 51, eta: '25–50 min', available: true, description: 'Entretien splits et maintenance de chambres froides.', services: ['Entretien split', 'Chambre froide'] },
  { id: 'p-010', name: 'Alain Ngono', categoryId: 'informatique', category: 'Informatique & Réseaux', city: 'Douala', district: 'Bonanjo', rating: 4.7, jobs: 49, eta: '30–45 min', available: true, description: 'Support informatique PME et câblage réseau RJ45.', services: ['Support PC', 'Câblage RJ45'] },
  { id: 'p-011', name: 'Nadine Soppo', categoryId: 'electromenager', category: 'Dépannage Électroménager', city: 'Kribi', district: 'Centre', rating: 4.8, jobs: 36, eta: '45–70 min', available: true, description: 'Diagnostic et réparation d’appareils domestiques.', services: ['Four électrique', 'Réfrigérateur'] },
  { id: 'p-012', name: 'Samuel Elong', categoryId: 'videosurveillance', category: 'Vidéosurveillance & Alarme', city: 'Limbe', district: 'Mile 4', rating: 4.6, jobs: 31, eta: '50–75 min', available: false, description: 'Pose de caméras, alarmes et contrôle d’accès.', services: ['Caméra IP', 'Contrôle accès'] },
]

const providerNames = [
  'Arnaud', 'Brice', 'Cédric', 'David', 'Emmanuel', 'Félix', 'Ghislain', 'Hervé',
  'Ibrahim', 'Jérôme', 'Kevin', 'Loïc', 'Marc', 'Narcisse', 'Olivier', 'Patrick',
  'Raphaël', 'Serge', 'Thierry', 'Ulrich', 'Valentin', 'Wilfried', 'Xavier', 'Yann',
]

const providerSurnames = [
  'Abanda', 'Atangana', 'Belinga', 'Biya', 'Ebanda', 'Etoa', 'Fouda', 'Kengne',
  'Mballa', 'Meka', 'Mendo', 'Mouelle', 'Ndom', 'Ngoa', 'Nguefack', 'Njoya',
  'Nsame', 'Onana', 'Simo', 'Tchinda', 'Tchoumi', 'Toko', 'Wamba', 'Zang',
]

const providerTemplates = [
  {
    categoryId: 'electricite',
    category: 'Électricité & Câblage',
    description: 'Installation électrique, dépannage et mise en sécurité des bâtiments.',
    services: ['Tableau électrique', 'Câblage bâtiment'],
  },
  {
    categoryId: 'climatisation',
    category: 'Climatisation & Froid',
    description: 'Entretien de climatiseurs, diagnostic de panne et recharge de gaz.',
    services: ['Entretien split', 'Recharge gaz'],
  },
  {
    categoryId: 'plomberie',
    category: 'Plomberie & Sanitaire',
    description: 'Recherche de fuite, dépannage sanitaire et installation de plomberie.',
    services: ['Recherche de fuite', 'Installation sanitaire'],
  },
  {
    categoryId: 'videosurveillance',
    category: 'Vidéosurveillance & Alarme',
    description: 'Installation de caméras, alarmes et solutions de contrôle d’accès.',
    services: ['Caméras IP', 'Alarme maison'],
  },
  {
    categoryId: 'electromenager',
    category: 'Dépannage Électroménager',
    description: 'Réparation et entretien des appareils électroménagers domestiques.',
    services: ['Réfrigérateur', 'Machine à laver'],
  },
  {
    categoryId: 'informatique',
    category: 'Informatique & Réseaux',
    description: 'Assistance informatique, dépannage réseau et installation Wi-Fi.',
    services: ['Support informatique', 'Réseau Wi-Fi'],
  },
]

const cities = [
  { city: 'Douala', districts: ['Akwa', 'Bonamoussadi', 'Deido', 'Makepe'] },
  { city: 'Yaoundé', districts: ['Bastos', 'Mvan', 'Biyem-Assi', 'Omnisports'] },
  { city: 'Bafoussam', districts: ['Centre-ville', 'Djeleng', 'Tamdja', 'Kouogouo'] },
  { city: 'Kribi', districts: ['Centre', 'Ngoye', 'Mpalla', 'Talla'] },
  { city: 'Limbe', districts: ['Mile 4', 'Down Beach', 'Bota', 'Church Street'] },
]

const generatedProviders = providerTemplates.flatMap((template, templateIndex) =>
  Array.from({ length: 48 }, (_, providerIndex) => {
    const location = cities[(providerIndex + templateIndex) % cities.length]
    const district = location.districts[(providerIndex + templateIndex) % location.districts.length]
    const name = `${providerNames[(providerIndex + templateIndex) % providerNames.length]} ${providerSurnames[(providerIndex * 3 + templateIndex) % providerSurnames.length]}`
    const jobs = 28 + ((providerIndex * 17 + templateIndex * 11) % 125)

    return {
      id: `p-${String(13 + templateIndex * 48 + providerIndex).padStart(3, '0')}`,
      name,
      categoryId: template.categoryId,
      category: template.category,
      city: location.city,
      district,
      rating: Number((4.5 + ((providerIndex + templateIndex) % 6) / 10).toFixed(1)),
      jobs,
      eta: `${20 + ((providerIndex + templateIndex) % 5) * 5}–${40 + ((providerIndex + templateIndex) % 5) * 5} min`,
      available: providerIndex % 5 !== 4,
      description: template.description,
      services: template.services,
    }
  }),
)

const mockProviders = [...featuredProviders, ...generatedProviders]
export default mockProviders
