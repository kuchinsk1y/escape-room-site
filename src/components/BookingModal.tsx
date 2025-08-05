import React, { useState } from "react"
import IconClose from "../assets/close.png"

type Props = { onClose: () => void }

export default function BookingModal({ onClose }: Props) {
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [participants, setParticipants] = useState<string>("")
  const [agree, setAgree] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agree) return alert("Вы должны согласиться с условиями!")
    const phoneRegex = /^[\d\s()+-]+$/
    if (!phoneRegex.test(phone)) return alert("Пожалуйста, введите корректный номер телефона")
    console.log({ name, phone, participants })
    alert("Заявка отправлена!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-[#3D3333]/90 flex items-center justify-center z-50 p-2">
      <div className="relative bg-[#1c1c1c] text-white p-8 rounded-sm max-w-[480px] h-[656px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Оставить заявку</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Закрыть модальное окно">
            <img src={IconClose} alt="close" className="w-3 h-3" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="input-name" className="block mb-3 text-sm">Ваше Имя</label>
            <input id="input-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-yellow-500" required />
          </div>

          <div className="mb-8">
            <label htmlFor="input-phone" className="block mb-3 text-sm">Контактный телефон</label>
            <input id="input-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-yellow-500" required />
          </div>

          <div className="mb-8">
            <label htmlFor="input-participants" className="block mb-3 text-sm">Количество участников</label>
            <input id="input-participants" type="number" min={1} value={participants} onChange={(e) => setParticipants(e.target.value)} placeholder="Количество участников" className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-yellow-500"/>
          </div>

          <div className="flex items-start gap-2 mt-10">
            <input id="input-agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" required />
            <label htmlFor="input-agree" className="text-xs text-gray-300 underline cursor-pointer">
              Я согласен с правилами обработки персональных данных и пользовательским соглашением
            </label>
          </div>

          <div className="flex justify-center mt-16">
            <button type="submit" className="w-full sm:w-[219px] bg-yellow-500 text-black py-2 rounded-full font-bold hover:bg-yellow-600 transition">ОТПРАВИТЬ ЗАЯВКУ</button>
          </div>
        </form>
      </div>
    </div>
  )
}
