import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./services/AuthContext"
import { Toaster } from "react-hot-toast"
import { AppRouter } from "./routes/AppRouter"
import Header from "./components/Header"
import Footer from "./components/Footer"


const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <AuthProvider>
        <div>
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1c1c1c] via-[#222] to-[#1c1c1c]" />
          <Toaster 
            position="top-right"
            toastOptions={{
              style: { background: "#1c1c1c", color: "#fff", border: "1px solid #333" },
              success: { iconTheme: { primary: "#F28A0F", secondary: "#1c1c1c" } },
              error: { iconTheme: { primary: "#e53935", secondary: "#1c1c1c" } },
            }}
          />
          <Header />
          <main className="relative min-h-screen">
            <div className="max-w-[1550px] mx-auto">
              <AppRouter />
            </div>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    ),
  },
])

const App = () => <RouterProvider router={router} future={{ v7_startTransition: true }} />

export default App


/* 

import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./services/AuthContext"
import { Toaster } from "react-hot-toast"

import { AppRouter } from "./routes/AppRouter"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
          style: {background: "#1c1c1c", color: "#fff", border: "1px solid #333",},
          success: { iconTheme: { primary: "#F28A0F", secondary: "#1c1c1c" } },
          error: { iconTheme: { primary: "#e53935", secondary: "#1c1c1c" } },
        }}
      />
      <Header />
      <main className="bg-gradient-to-b from-[#1c1c1c] via-[#222] to-[#1c1c1c] min-h-screen">
        <div className="max-w-[1550px] mx-auto">
          <AppRouter />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
)

export default App


*/