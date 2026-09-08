function FormError({id, children}) {
  if (!children) return null
  return <p id={id} role="alert" className="mt-1 text-xs font-semibold text-rose-600">{children}</p>
}
export default FormError
