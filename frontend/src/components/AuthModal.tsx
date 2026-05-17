import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  open: boolean
  onClose: () => void
}

const AuthModal = ({ open, onClose }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/>
          <motion.div className="relative bg-[#1c1c1c] text-white rounded-xl shadow-lg p-6 w-full max-w-sm z-10" initial={{ scale: 0.9, opacity: 0, y: -30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: -30 }} transition={{ duration: 0.25, ease: "easeOut" }}>
            <h2 className="text-2xl font-bold mb-4">Authorization required</h2>
            <p className="mb-6 text-gray-300">To view quest details, please log in to your account.</p>
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition">Cancel</button>
              <Link to="/sign-in" className="px-4 py-2 rounded-lg bg-[#F28A0F] hover:bg-[#d6760c] transition">Log in</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
