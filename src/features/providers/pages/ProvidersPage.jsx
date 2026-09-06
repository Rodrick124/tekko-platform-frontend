import { Headphones, SlidersHorizontal } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../../../components/common/EmptyState.jsx'
import Pagination from '../../../components/ui/Pagination.jsx'
import mockCategories from '../../../data/mockCategories.js'
import mockProviders from '../../../data/mockProviders.js'
import ActiveFilterChips from '../components/ActiveFilterChips.jsx'
import ProviderFilters from '../components/ProviderFilters.jsx'
import ProviderSearchBar from '../components/ProviderSearchBar.jsx'
import ProvidersGrid from '../components/ProvidersGrid.jsx'
import ProvidersHero from '../components/ProvidersHero.jsx'
import UnlockExplanationSection from '../components/UnlockExplanationSection.jsx'

const PAGE_SIZE = 6
const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function ProvidersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const listTop = useRef(null)
  const search = searchParams.get('recherche') || searchParams.get('service') || ''
  const filters = { category: searchParams.get('categorie') || '', availability: searchParams.get('disponibilite') || '', sort: searchParams.get('tri') || 'pertinence' }
  const location = searchParams.get('localisation') || ''

  const updateParam = (key, value) => { const next = new URLSearchParams(searchParams); next.delete('service'); if (value) next.set(key, value); else next.delete(key); if (key !== 'page') next.delete('page'); setSearchParams(next, { replace: true }) }
  const reset = () => setSearchParams({}, { replace: true })

  const filtered = useMemo(() => {
    const term = normalize(search)
    const place = normalize(location)
    const result = mockProviders.filter((provider) => {
      const haystack = normalize([provider.name, provider.category, provider.description, ...provider.services].join(' '))
      const placeText = normalize(`${provider.city} ${provider.district}`)
      return (!term || haystack.includes(term)) && (!filters.category || provider.categoryId === filters.category) && (!place || placeText.includes(place)) && (!filters.availability || (filters.availability === 'maintenant' ? provider.available : !provider.available))
    })
    if (filters.sort === 'nom') result.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
    if (filters.sort === 'evaluation') result.sort((a, b) => b.rating - a.rating)
    return result
  }, [search, location, filters.category, filters.availability, filters.sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const requestedPage = Number.parseInt(searchParams.get('page') || '1', 10)
  const page = Math.min(Math.max(Number.isNaN(requestedPage) ? 1 : requestedPage, 1), totalPages)
  const visibleProviders = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const changePage = (nextPage) => { updateParam('page', String(nextPage)); window.requestAnimationFrame(() => listTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }
  const categoryName = mockCategories.find((item) => item.id === filters.category)?.name
  const activeFilters = [{ key: 'recherche', label: search && `Recherche : ${search}` }, { key: 'categorie', label: categoryName }, { key: 'localisation', label: location && `Lieu : ${location}` }, { key: 'disponibilite', label: filters.availability === 'maintenant' ? 'Disponible maintenant' : filters.availability === 'plus-tard' ? 'Disponible plus tard' : '' }].filter((item) => item.label)

  return <><ProvidersHero resultCount={filtered.length}/><section className="bg-[#f8f9ff] pb-14"><div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="-translate-y-1 rounded-2xl bg-blue-50 p-4 shadow-sm ring-1 ring-blue-100"><ProviderSearchBar search={search} location={location} onSearchChange={(value)=>updateParam('recherche', value)} onLocationChange={(value)=>updateParam('localisation', value)}/><div className="mt-3"><ProviderFilters filters={filters} onChange={updateParam} onReset={reset}/></div><div className="mt-3"><ActiveFilterChips items={activeFilters} onRemove={(key)=>updateParam(key, '')} onReset={reset}/></div></div><div className="-mx-4 mt-4 overflow-x-auto bg-blue-50 px-4 py-4 lg:mx-0 lg:rounded-xl"><div className="flex min-w-max gap-2"><button type="button" onClick={()=>updateParam('categorie','')} className={`rounded-full px-4 py-2 text-xs font-bold ${!filters.category?'bg-blue-600 text-white':'bg-white text-slate-700'}`}>Tous les prestataires</button>{mockCategories.map((category)=><button type="button" key={category.id} onClick={()=>updateParam('categorie',category.id)} className={`rounded-full px-4 py-2 text-xs font-semibold ${filters.category===category.id?'bg-blue-600 text-white':'bg-white text-slate-700 hover:text-blue-700'}`}>{category.name}</button>)}</div></div><div ref={listTop} className="scroll-mt-24 pt-10"><div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-bold">Prestataires disponibles</h2><p className="mt-1 text-xs text-slate-500">Identité vérifiée, compétences validées et évaluations fictives.</p></div><p className="text-xs text-slate-500">{filtered.length ? `${(page-1)*PAGE_SIZE+1}–${Math.min(page*PAGE_SIZE,filtered.length)} sur ${filtered.length}` : '0 résultat'}</p></div>{visibleProviders.length?<ProvidersGrid providers={visibleProviders}/>:<div className="rounded-2xl bg-white p-5"><EmptyState message="Aucun prestataire ne correspond à ces critères."/><button type="button" onClick={reset} className="mx-auto mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"><SlidersHorizontal size={17}/>Réinitialiser les filtres</button></div>}<div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"><p className="text-xs text-slate-500">Page {page} sur {totalPages}</p><Pagination page={page} totalPages={totalPages} onChange={changePage}/></div><aside className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-blue-100 p-6 sm:flex-row sm:items-center"><div className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-600 text-white"><Headphones/></span><p className="text-sm"><strong className="block">Vous ne trouvez pas votre quartier ou métier précis ?</strong><span className="text-xs text-slate-600">Modifiez les filtres ou consultez l’ensemble des prestataires locaux.</span></p></div><button type="button" onClick={reset} className="rounded-xl bg-white px-5 py-3 text-xs font-bold text-blue-700 shadow-sm">Voir tout l’annuaire</button></aside></div></div></section><UnlockExplanationSection/></>
}
export default ProvidersPage
