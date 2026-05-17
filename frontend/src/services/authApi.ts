const API_URL = "http://localhost:8080"

export class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function handleResponse(res: Response) {
  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }
  if (!res.ok) throw new HttpError(res.status, data?.message || "Server error")
  return data
}

/* ---------------------------
   🟢 AUTH REQUESTS
---------------------------- */

export async function signUp(email: string, password: string, name?: string) {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
    credentials: "include",
  })
  return handleResponse(res)
}

export async function signIn(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
  return handleResponse(res)
}

export async function logout() {
  const res = await fetch(`${API_URL}/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  })
  return handleResponse(res)
}

/* ---------------------------
   🧍 USER INFO
---------------------------- */

export async function fetchCurrentUser() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  })
  return handleResponse(res)
}
