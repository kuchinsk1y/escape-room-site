import React, { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import CatalogPage from "./pages/CatalogPage"
import QuestDetailsPage from "./pages/QuestDetailsPage"
import ContactsPage from "./pages/ContactsPage"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App: FC = () => (
  <BrowserRouter>
    <Header />
    <main className="bg-gradient-to-b from-[#1c1c1c] via-[#222] to-[#1c1c1c] min-h-screen">
      <div className="max-w-[1550px] mx-auto">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/detailed-quest/:id" element={<QuestDetailsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </BrowserRouter>
)

export default App
