function Input({ label, ...props }) { return <label className="grid gap-1 text-sm">{label && <span>{label}</span>}<input className="rounded border px-3 py-2" {...props} /></label> }
export default Input
