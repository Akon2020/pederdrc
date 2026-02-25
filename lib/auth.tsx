"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const mockUsers: { email: string; password: string; user: User }[] = [
  {
    email: "admin@pederdrc.org",
    password: "admin123",
    user: {
      id: "1",
      name: "Mirco Rubambura",
      email: "admin@pederdrc.org",
      role: "superadmin",
      createdAt: "2020-01-15",
    },
  },
  {
    email: "akonkwa.ushindi@pederdrc.org",
    password: "admin123",
    user: {
      id: "2",
      name: "Isaac Akonkwa",
      email: "akonkwa.ushindi@pederdrc.org",
      role: "admin",
      createdAt: "2021-06-20",
    },
  },
  {
    email: "isaac.akonkwa@pederdrc.org",
    password: "redacteur123",
    user: {
      id: "3",
      name: "Clarisse Bahati",
      email: "isaac.akonkwa@pederdrc.org",
      role: "redacteur",
      createdAt: "2022-03-10",
    },
  },
]

function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null
  try {
    const stored = sessionStorage.getItem("peder_auth_user")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function setUserToStorage(user: User | null) {
  if (typeof window === "undefined") return
  try {
    if (user) {
      sessionStorage.setItem("peder_auth_user", JSON.stringify(user))
    } else {
      sessionStorage.removeItem("peder_auth_user")
    }
  } catch {
    // ignore storage errors
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = getUserFromStorage()
    if (stored) {
      setUser(stored)
    }
    setHydrated(true)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      setUser(found.user)
      setUserToStorage(found.user)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setUserToStorage(null)
  }, [])

  if (!hydrated) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
