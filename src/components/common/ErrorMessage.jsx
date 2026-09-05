function ErrorMessage({ message = 'Une erreur est survenue.' }) { return <p role="alert" className="rounded bg-red-50 p-3 text-red-700">{message}</p> }
export default ErrorMessage
