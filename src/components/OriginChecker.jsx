"use client"

import { useState, useEffect } from "react"

const GoogleLoginButton = ({
  onSuccess,
  onError,
  clientId,
  disabled = false,
  buttonText = "Masuk dengan Google",
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const GOOGLE_CLIENT_ID = clientId || process.env.REACT_APP_GOOGLE_CLIENT_ID

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogle()
        return
      }

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogle
      document.head.appendChild(script)
    }

    const initializeGoogle = () => {
      if (window.google && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        })
        setIsLoaded(true)
      }
    }

    const handleCredentialResponse = async (response) => {
      setIsLoading(true)
      try {
        if (response.credential) {
          await onSuccess(response)
        } else {
          onError(new Error("No credential received"))
        }
      } catch (error) {
        onError(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadGoogleScript()
  }, [GOOGLE_CLIENT_ID, onSuccess, onError])

  const handleClick = () => {
    if (window.google && isLoaded && !disabled && !isLoading) {
      setIsLoading(true)
      window.google.accounts.id.prompt()
    } else if (!isLoaded) {
      onError(new Error("Google Sign-In not loaded"))
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isLoaded || disabled || isLoading}
      className={`w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          {buttonText.includes("Daftar") ? "Mendaftar..." : "Masuk..."}
        </>
      ) : (
        <>
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            G
          </div>
          {isLoaded ? buttonText : "Loading Google..."}
        </>
      )}
    </button>
  )
}

export default GoogleLoginButton
