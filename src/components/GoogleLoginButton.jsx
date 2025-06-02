"use client"

import { useState, useEffect } from "react"

const GoogleLoginButton = ({ onSuccess, onError, clientId }) => {
  const [isLoaded, setIsLoaded] = useState(false)

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
      if (window.google && clientId) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        })
        setIsLoaded(true)
      }
    }

    const handleCredentialResponse = (response) => {
      if (response.credential) {
        onSuccess(response)
      } else {
        onError(new Error("No credential received"))
      }
    }

    loadGoogleScript()
  }, [clientId, onSuccess, onError])

  const handleClick = () => {
    if (window.google && isLoaded) {
      window.google.accounts.id.prompt()
    } else {
      onError(new Error("Google Sign-In not loaded"))
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isLoaded}
      className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        G
      </div>
      {isLoaded ? "Masuk dengan Google" : "Loading Google..."}
    </button>
  )
}

export default GoogleLoginButton
