import formatCurrency from '../../../utils/formatCurrency.js'
function PaymentSummary({ amount = 100 }) { return <aside className="rounded border p-4">Total : {formatCurrency(amount)}</aside> }
export default PaymentSummary
