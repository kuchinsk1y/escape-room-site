import { Quest } from "../types/quest"
const API_URL = "http://localhost:8080"

export async function fetchQuests(): Promise<Quest[]> {
  const res = await fetch(`${API_URL}/quests`)
  if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`)
  return res.json()
}
