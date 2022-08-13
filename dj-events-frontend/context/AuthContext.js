import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter()
  useEffect(() => { checkUserLoggedIn() }, [])

  // Register user
  const register = async (user) => {
    try {
    } catch (error) {
    }
  }

  // Login user
  const login = async ({ identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setUser(null)
      return;
    }


    setUser(data.user);
    setError(null);
    router.push('/account/dashboard')
  }

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST"
    })
    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()
    if (res.ok) {
      setUser(data.user)
    }
    else setUser(null)
  }

  const value = { register, login, checkUserLoggedIn, logout, user, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext; 