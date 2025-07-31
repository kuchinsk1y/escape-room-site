import React from "react"
import { Routes, Route } from "react-router-dom"
import CatalogPage from "../pages/CatalogPage"
import QuestDetailsPage from "../pages/QuestDetailsPage"
import ContactsPage from "../pages/ContactsPage"
import NotFoundPage from "../pages/NotFoundPage"

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<CatalogPage />} />
    <Route path="/detailed-quest/:id" element={<QuestDetailsPage />} />
    <Route path="/contacts" element={<ContactsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
