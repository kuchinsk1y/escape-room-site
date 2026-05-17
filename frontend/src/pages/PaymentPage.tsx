import { useParams } from "react-router-dom"
import PaymentForm from "../components/PaymentForm"

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>()
  return (
    <div className="text-white p-8">
      <h2 className="text-2xl font-bold mb-4">Оплата заказа #{orderId}</h2>
      <PaymentForm orderId={Number(orderId)} onClose={() => {}} />
    </div>
  )
}
