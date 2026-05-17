import { Routes, Route } from "react-router-dom"
import CatalogPage from "../pages/CatalogPage"
import QuestDetailsPage from "../pages/QuestDetailsPage"
import ContactsPage from "../pages/ContactsPage"
import NotFoundPage from "../pages/NotFoundPage"
import SignInPage from "../pages/SignInPage"
import SignUpPage from "../pages/SignUpPage"
import ProfilePage from "../pages/ProfilePage"
import NovicePage from "../pages/NovicePage"

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<CatalogPage />} />
    <Route path="/novice" element={<NovicePage />} />
    <Route path="/detailed-quest/:id" element={<QuestDetailsPage />} />
    <Route path="/contacts" element={<ContactsPage />} />
    <Route path="/sign-in" element={<SignInPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
