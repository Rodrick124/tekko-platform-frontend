function ProviderCard({ provider }) { return <article className="rounded border bg-white p-4"><h2>{provider?.name ?? 'Prestataire'}</h2><p>{provider?.category}</p></article> }
export default ProviderCard
