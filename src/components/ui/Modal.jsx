function Modal({ open, title, children, onClose }) { if (!open) return null; return <div className="fixed inset-0 grid place-items-center bg-black/40" role="dialog" aria-modal="true"><div className="rounded bg-white p-6"><div className="flex justify-between gap-8"><h2>{title}</h2><button onClick={onClose} aria-label="Fermer">×</button></div>{children}</div></div> }
export default Modal
