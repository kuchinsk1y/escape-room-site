import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center px-4 pt-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl text-center">
        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-[8rem] font-extrabold text-[#F28A0F] mb-6 select-none">
          404
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white text-xl sm:text-2xl font-semibold mb-4">
          Page Not Found
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-400 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link to="/" className="inline-block bg-[#F28A0F] hover:bg-[#d6760c] text-black font-bold px-6 py-3 rounded-full transition">Back to Home</Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
