import React from "react"
import { BrowserRouter } from "react-router-dom"

import { AppRouter } from "./routes/AppRouter"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => (
  <BrowserRouter>
    <Header />
    <main className="bg-gradient-to-b from-[#1c1c1c] via-[#222] to-[#1c1c1c] min-h-screen">
      <div className="max-w-[1550px] mx-auto">
        <AppRouter />
      </div>
    </main>
    <Footer />
  </BrowserRouter>
)

export default App
