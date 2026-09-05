function AdminStatCard({ label = 'Indicateur', value = 0 }) { return <article className="rounded border bg-white p-4"><p>{label}</p><strong>{value}</strong></article> }
export default AdminStatCard
