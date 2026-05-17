import React, { useState, useEffect } from "react"
import IconClose from "../assets/close.png"
import toast from "react-hot-toast"
import PaymentForm from "./PaymentForm"

type Props = {
  onClose: () => void
  questId: number
  minPlayers: number
  maxPlayers: number
}

export default function BookingModal({ onClose, questId, minPlayers, maxPlayers }: Props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [participants, setParticipants] = useState("")
  const [agree, setAgree] = useState(false)
  const [show, setShow] = useState(false)
  const [participantsError, setParticipantsError] = useState("")
  const [step, setStep] = useState<"form" | "payment">("form")
  const [orderId, setOrderId] = useState<number | null>(null)

  useEffect(() => setShow(true), [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  const validateParticipants = (value: number) => {
    if (value < minPlayers || value > maxPlayers) {
      setParticipantsError(`Введите количество участников от ${minPlayers} до ${maxPlayers}`)
      return false
    }
    setParticipantsError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const participantsNumber = Number(participants)

    if (!agree) return toast.error("You must agree to the terms!")
    if (!name.trim()) return toast.error("Please enter your name")
    if (!phone.trim()) return toast.error("Please enter a phone number")
    const phoneRegex = /^[\d\s()+-]+$/
    if (!phoneRegex.test(phone)) return toast.error("Please enter a valid phone number")
    if (!validateParticipants(participantsNumber)) return

    try {
      const res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          questId,
          name,
          phone,
          participants: participantsNumber,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to create order")

      toast.success("Booking successful!")
      setOrderId(data.id)
      setStep("payment")
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Something went wrong")
    }
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-2 bg-[#3D3333]/90 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
      <div className={`relative bg-[#1c1c1c] text-white p-4 mt-[-100px] rounded-md max-w-[480px] h-auto shadow-lg transform transition-transform duration-300 ${show ? "scale-100" : "scale-95"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{step === "form" ? "Submit a request" : "Choose payment method"}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
            <img src={IconClose} alt="close" className="w-3 h-3" />
          </button>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="">
              <label htmlFor="input-name" className="block mb-3 text-sm">Your Name</label>
              <input id="input-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-yellow-500" required />
            </div>

            <div className="">
              <label htmlFor="input-phone" className="block mb-3 text-sm">Contact Phone</label>
              <input id="input-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 888 888 888" className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-yellow-500" required />
            </div>

            <div className="">
              <label htmlFor="input-participants" className="block mb-1 text-sm">Number of Participants</label>
              <input id="input-participants" type="number" min={minPlayers} max={maxPlayers} value={participants}
                onChange={e => {
                  setParticipants(e.target.value)
                  const num = Number(e.target.value)
                  if (!isNaN(num)) validateParticipants(num)
                }}
                placeholder={`From ${minPlayers} to ${maxPlayers}`} className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-yellow-500"
              />
              {participantsError && <p className="mt-1 text-xs text-red-500">{participantsError}</p>}
            </div>

            <div className="flex items-start gap-2 mt-4">
              <input id="input-agree" type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-1" required />
              <label htmlFor="input-agree" className="text-xs text-gray-300 underline cursor-pointer">I agree to the terms of personal data processing and the user agreement</label>
            </div>

            <div className="flex justify-center mt-4">
              <button type="submit" className="w-full sm:w-[219px] bg-yellow-500 text-black py-2 rounded-full font-bold hover:bg-yellow-600 transition">SUBMIT</button>
            </div>
          </form>
        )}

        {step === "payment" && orderId && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  toast.success("You can pay on the spot! ✅")
                  handleClose()
                }} className="bg-gray-700 py-2 rounded-full hover:bg-gray-600 transition"
              >Pay on the spot
              </button>
              <PaymentForm orderId={orderId} onClose={handleClose} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
