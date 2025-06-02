"use client"

import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null = loading
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // Validasi token dengan backend
        const response = await fetch("http://localhost:3000/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Token tidak valid, hapus dari localStorage
          localStorage.removeItem("token")
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("token")
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memverifikasi autentikasi...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Render protected component
  return children
}

export default ProtectedRoute
