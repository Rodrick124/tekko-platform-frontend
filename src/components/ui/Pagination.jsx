import { ChevronLeft, ChevronRight } from 'lucide-react'

function getPageItems(page, totalPages) {
	if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1)

	const items = [1]
	if (page > 4) items.push('start-ellipsis')

	const start = Math.max(2, page - 1)
	const end = Math.min(totalPages - 1, page + 1)
	for (let number = start; number <= end; number += 1) items.push(number)

	if (page < totalPages - 3) items.push('end-ellipsis')
	items.push(totalPages)
	return items
}

function Pagination({ page = 1, totalPages = 1, onChange = () => {} }) {
	const items = getPageItems(page, totalPages)

	return (
		<nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
			<button
				type="button"
				disabled={page <= 1}
				onClick={() => onChange(page - 1)}
				className="inline-flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
			>
				<ChevronLeft size={14} />
				Précédent
			</button>
			{items.map((item) => (
				typeof item === 'string' ? (
					<span key={item} aria-hidden="true" className="px-1 text-slate-400">…</span>
				) : (
					<button
						type="button"
						key={item}
						aria-current={item === page ? 'page' : undefined}
						onClick={() => onChange(item)}
						className={`size-9 rounded-lg text-xs font-bold ${item === page ? 'bg-blue-600 text-white' : 'border bg-white hover:bg-blue-50'}`}
					>
						{item}
					</button>
				)
			))}
			<button
				type="button"
				disabled={page >= totalPages}
				onClick={() => onChange(page + 1)}
				className="inline-flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
			>
				Suivant
				<ChevronRight size={14} />
			</button>
		</nav>
	)
}
export default Pagination
