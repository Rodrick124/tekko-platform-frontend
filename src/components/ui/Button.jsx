function Button({ children, type = 'button', ...props }) { return <button type={type} className="rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50" {...props}>{children}</button> }
export default Button
