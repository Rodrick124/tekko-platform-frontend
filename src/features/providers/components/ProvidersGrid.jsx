import ProviderCard from './ProviderCard.jsx'
import ErrorMessage from '../../../components/common/ErrorMessage.jsx'
import LoadingState from '../../../components/common/LoadingState.jsx'
function ProvidersGrid({providers, loading = false, error = ''}){if(loading)return <LoadingState/>;if(error)return <ErrorMessage message={error}/>;return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{providers.map((provider)=><ProviderCard key={provider.id} provider={provider}/>)}</div>}
export default ProvidersGrid
