import { motion } from "framer-motion"
import MapImage from "../assets/map-placeholder.png"

const infoBlocks = [
  { title: "Address", content: "Warsaw, ul. Przykładowa 5" },
  { title: "Working Hours", content: "Daily, from 9:00 to 20:00" },
  { title: "Phone", content: "48 (787) 368-87-74" },
  { title: "E-mail", content: "tim.ku2004@gmail.com" },
]

const ContactsPage = () => {
  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-[#1c1c1c] via-[#222] to-[#1c1c1c] mb-6">
      <div className="relative z-10 max-w-[1700px] mx-auto pt-10 px-3">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center lg:text-left mb-8">
          <div className="text-[#F28A0F] font-medium text-sm sm:text-base md:text-lg">Quests in Warsaw</div>
          <div className="text-white font-extrabold mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight drop-shadow-lg">Contacts</div>
          <div className="border-b border-[#E5E5E5] w-24 lg:w-32 mb-6 mx-auto lg:mx-0" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            {infoBlocks.map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-3 bg-[#1c1c1c]/70 rounded-2xl border border-[#F28A0F] shadow-lg">
                <h2 className="font-semibold text-white text-lg">{block.title}</h2>
                <p className="text-gray-300">{block.content}</p>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 mt-4">
              <a href="tel:88003335599" className="px-6 py-3 bg-[#F28A0F] rounded-xl font-semibold text-black text-center hover:bg-[#d9780d] transition transform hover:scale-105">Call Us</a>
              <a href="mailto:info@escape-room.ru" className="px-6 py-3 bg-[#222]/70 rounded-xl font-semibold text-white text-center border border-[#F28A0F] hover:bg-[#F28A0F] hover:text-black transition transform hover:scale-105">Email</a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1 flex justify-center lg:justify-end">
            <div className="w-[649px] max-w-full h-[336px] rounded-2xl overflow-hidden shadow-xl border border-[#F28A0F]">
              <img src={MapImage} alt="Карта" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage


/* 

import MapImage from "../assets/map-placeholder.png"

const ContactsPage = () => {
  return (
    <div className="max-w-[1700px] mx-auto pt-10 px-3">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="text-[#F2890F] font-medium text-sm sm:text-base md:text-lg">Quests in Warsaw</div>
          <div className="text-white font-extrabold mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight">Contacts</div>
          <div className="border-b border-[#E5E5E5] mb-6" />
          <div className="flex flex-col lg:flex-row gap-8 p-4 mt-2 md:mt-16">
            <div className="flex-1 text-gray-700 space-y-2 md:space-y-8">
              <div>
                <h2 className="font-semibold text-white">Address</h2>
                <p className="text-white">Warsaw, ul. Przykładowa 5</p>
              </div>
              <div>
                <h2 className="font-semibold text-white">Working Hours</h2>
                <p className="text-white">Daily, from 9:00 to 20:00</p>
              </div>
              <div>
                <h2 className="font-semibold text-white">Phone</h2>
                <p className="text-white">8 (800) 333-55-99</p>
              </div>
              <div>
                <h2 className="font-semibold text-white">E-mail</h2>
                <p className="text-white">info@escape-room.ru</p>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-[649px] max-w-full h-[336px]">
                <img src={MapImage} alt="Карта" className="w-full h-full object-cover rounded"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage


*/
