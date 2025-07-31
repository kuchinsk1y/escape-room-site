import React from "react"
import { Link } from "react-router-dom"
import { Quest } from "../data/quest"

type QuestCardProps = {
  quest: Quest
}

const QuestCard = ({ quest }: QuestCardProps) => {
  const { id, image, title, peopleMinMax, difficulty } = quest

  return (
    <Link to={`/detailed-quest/${id}`} aria-label={`Открыть страницу квеста ${title}`} className="block border rounded-lg overflow-hidden shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-500 transition">
      <img src={image} alt={`Изображение квеста ${title}`} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">
          {peopleMinMax?.[0]}–{peopleMinMax?.[1]} гравців
        </p>
        <p className="text-sm text-gray-600">Складність: {difficulty}</p>
      </div>
    </Link>
  )
}

export default QuestCard
