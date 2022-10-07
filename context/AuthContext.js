import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "../config";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register User
  const register = async (user) => {
    console.log(user);
  }

  // Login User
  const login = async ({email:identifier, password}) => {
    console.log({identifier, password});
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })

    const data = await res.json()

    console.log(data)

    if(res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Logout User
  const logout = async () => {
    console.log('logout');
  }

  // Check if user is still logged in
  const checkUserLoggedIn = async (user) => {
    console.log('check');
  }

  return (
    <AuthContext.Provider value={{user, error, register, login, logout, checkUserLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext