"use client"

// Utility functions untuk Google Authentication

export const GoogleAuthUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token")
    return !!token
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem("token")
  },

  // Remove token (logout)
  removeToken: () => {
    localStorage.removeItem("token")
  },

  // Get user info from backend
  getUserInfo: async () => {
    try {
      const token = GoogleAuthUtils.getToken()

      if (!token) {
        throw new Error("No token found")
      }

      const response = await fetch("http://localhost:3000/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user info")
      }

      const data = await response.json()
      return data.data.user
    } catch (error) {
      console.error("Error fetching user info:", error)
      throw error
    }
  },

  // Logout user
  logout: async () => {
    try {
      const token = GoogleAuthUtils.getToken()

      if (token) {
        await fetch("http://localhost:3000/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      GoogleAuthUtils.removeToken()
    }
  },

  // Validate token with backend
  validateToken: async () => {
    try {
      const user = await GoogleAuthUtils.getUserInfo()
      return !!user
    } catch (error) {
      GoogleAuthUtils.removeToken()
      return false
    }
  },
}

export default GoogleAuthUtils
