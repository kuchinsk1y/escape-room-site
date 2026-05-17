import { ReactNode, useState } from "react"
import { useAuth } from "../services/AuthContext"
import AuthModal from "./AuthModal"

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth()
  const [modalOpen, setModalOpen] = useState(!isAuthenticated)
  if (!isAuthenticated) return <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
  return <>{children}</>
}

export default ProtectedRoute
