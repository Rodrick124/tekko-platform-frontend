function Select({ label, children, ...props }) { return <label className="grid gap-1 text-sm">{label && <span>{label}</span>}<select className="rounded border px-3 py-2" {...props}>{children}</select></label> }
export default Select
