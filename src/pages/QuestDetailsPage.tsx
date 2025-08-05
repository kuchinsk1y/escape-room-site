import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { quests } from "../data/quest"
import BookingModal from "../components/BookingModal"

const QuestDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const quest = quests.find(q => q.id === id)
  const [modal, setModal] = useState(false)

  if (!quest) return <div className="p-4">Квест не знайдено</div>

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img src={quest.image} alt={quest.title} className="w-full h-64 object-cover rounded mb-4"/>
      <h1 className="text-2xl font-bold mb-2">{quest.title}</h1>
      <p className="mb-2">Тематика: {quest.theme}</p>
      <p className="mb-2">Гравців: {quest.peopleMinMax[0]}-{quest.peopleMinMax[1]}</p>
      <p className="mb-2">Складність: {quest.difficulty}</p>
      <p className="mb-2">Час: {quest.duration}</p>
      <p className="mb-4">{quest.description}</p>
      <button onClick={() => setModal(true)} aria-haspopup="dialog" className="px-4 py-2 bg-yellow-400 rounded">Забронювати</button>
      {modal && <BookingModal onClose={() => setModal(false)} />}
    </div>
  )
}

export default QuestDetailsPage
