"use client"
import { motion } from "framer-motion"

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full flex flex-col gap-6 py-6 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white"
      >
        Settings
      </motion.h1>

      <div className="flex flex-col gap-4 bg-[#111a22] p-6 rounded-xl border border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-white">Тема</span>
          <select className="bg-[#1b2a38] text-white p-2 rounded border border-gray-700">
            <option>Тёмная</option>
            <option>Светлая</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white">Уведомления</span>
          <input type="checkbox" className="w-5 h-5 accent-[#1173d4]" defaultChecked />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white">Язык</span>
          <select className="bg-[#1b2a38] text-white p-2 rounded border border-gray-700">
            <option>Русский</option>
            <option>Английский</option>
          </select>
        </div>

        <button className="mt-4 bg-[#1173d4] text-white px-4 py-2 rounded hover:bg-blue-600">Сохранить</button>
      </div>
    </div>
  )
}
