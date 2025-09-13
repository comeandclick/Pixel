"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  isPremium?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: { [email: string]: { password: string; name: string; id: string } } = {
  "demo@pixel.com": { password: "Demo123!", name: "Demo User", id: "demo-1" },
  "test@example.com": { password: "Test123!", name: "Test User", id: "test-1" },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const normalizedEmail = email.toLowerCase().trim()
      const mockUser = mockUsers[normalizedEmail]

      if (!mockUser) {
        setIsLoading(false)
        return { success: false, error: "Aucun compte trouvé avec cet email. Voulez-vous créer un compte ?" }
      }

      if (mockUser.password !== password) {
        setIsLoading(false)
        return { success: false, error: "Mot de passe incorrect" }
      }

      const authenticatedUser: User = {
        id: mockUser.id,
        email: normalizedEmail,
        name: mockUser.name,
        isPremium: normalizedEmail === "demo@pixel.com", // Demo user gets premium
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Erreur de connexion. Veuillez réessayer." }
    }
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const normalizedEmail = email.toLowerCase().trim()

      if (mockUsers[normalizedEmail]) {
        setIsLoading(false)
        return { success: false, error: "Un compte existe déjà avec cet email" }
      }

      // Create new user
      const newUserId = `user-${Date.now()}`
      const newUser: User = {
        id: newUserId,
        email: normalizedEmail,
        name: name.trim(),
        isPremium: false,
      }

      // Add to mock database
      mockUsers[normalizedEmail] = {
        password,
        name: name.trim(),
        id: newUserId,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: "Erreur lors de la création du compte. Veuillez réessayer." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
