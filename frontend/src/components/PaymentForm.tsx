import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import toast from "react-hot-toast"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

const CheckoutForm = ({ orderId, onClose }: { orderId: number; onClose: () => void }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return toast.error("Stripe is not initialized")

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/payments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })
      if (!res.ok) throw new Error("Error creating payment")

      const { clientSecret } = await res.json()
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error("Card element not found")

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      })

      if (error) toast.error(error.message || "Payment error")
      else if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful! ✅")
        setTimeout(() => onClose(), 1200)
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Payment error")
    } finally {
      setLoading(false)
    }
  }

  const elementStyle = {
    style: {
      base: { color: "#fff", fontSize: "16px", fontFamily: "Inter, sans-serif", "::placeholder": { color: "#aaa" }, padding: "12px 14px" },
      invalid: { color: "#ff4d4f" },
    },
  }

  return (
    <div className="bg-[#1c1c1c] rounded-md p-4 border border-gray-700 w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-4 text-center">💳 Secure Payment</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border border-gray-700 rounded-md bg-[#2a2a2a]">
          <label className="text-sm text-gray-400 mb-2 block">Card Details</label>
          <CardElement options={{...elementStyle, hidePostalCode: false,}}/>
        </div>

        <button type="submit" disabled={!stripe || loading} className={`w-full py-3 rounded-full font-bold transition ${loading ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-600"}`}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      <p className="mt-3 text-xs text-gray-500 text-center">
        Use Stripe test card — 4242 4242 4242 4242, any CVC, any future date.
      </p>
    </div>
  )
}

export default function PaymentForm({orderId, onClose}: {orderId: number; onClose: () => void;}) {
  if (!stripePromise) return (<div className="p-4 bg-gray-700 text-white rounded-md text-center">Stripe not initialized</div>)
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={orderId} onClose={onClose} />
    </Elements>
  )
}
