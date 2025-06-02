"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import axios from "axios"

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Google Client ID - ganti dengan Client ID Anda
  const GOOGLE_CLIENT_ID = "757765765011-ls5gc5u8cl80kgdthvlaslsdpit4edl1.apps.googleusercontent.com"

  useEffect(() => {
    // Load Google Sign-In script
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleSignIn()
        return
      }

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogleSignIn
      document.head.appendChild(script)
    }

    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        })

        // Render the Google Sign-In button
        const buttonElement = document.getElementById("google-signin-button")
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
          })
        }
      }
    }

    loadGoogleScript()

    // Cleanup function
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  const handleGoogleResponse = async (response) => {
    setIsGoogleLoading(true)
    setErrors({})

    try {
      console.log("Google response received:", response)

      if (!response.credential) {
        throw new Error("No credential received from Google")
      }

      // Send credential to your backend
      const backendResponse = await axios.post("http://localhost:3000/google-login", {
        credential: response.credential,
      })

      const token = backendResponse.data.data.access_token
      localStorage.setItem("token", token)

      console.log("Google login successful:", backendResponse.data)

      // Redirect to dashboard
      navigate("/dashboard")
    } catch (err) {
      console.error("Google login error:", err)
      setErrors({
        submit: err.response?.data?.message || "Login dengan Google gagal. Silakan coba lagi!",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password,
      })

      const token = response.data.data.access_token
      localStorage.setItem("token", token)

      // Arahkan ke dashboard
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      setErrors({
        submit: err.response?.data?.message || "Login gagal. Periksa email dan password kamu!",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt()
    } else {
      setErrors({
        submit: "Google Sign-In belum dimuat. Silakan refresh halaman.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Brand */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">CashMate</h2>
            <p className="text-purple-100 text-sm leading-relaxed">Login untuk bergabung bersama kami</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label className="text-white font-semibold text-lg">Masuk</label>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-purple-200" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Alamat Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b-2 ${
                    errors.email ? "border-red-300" : "border-white/50 focus:border-white"
                  } text-white placeholder-purple-200 py-3 pl-8 pr-4 focus:outline-none transition-colors duration-200`}
                  required
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-purple-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b-2 ${
                    errors.password ? "border-red-300" : "border-white/50 focus:border-white"
                  } text-white placeholder-purple-200 py-3 pl-8 pr-12 focus:outline-none transition-colors duration-200`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/90 hover:text-white-200 hover:bg-purple-600/30 transition-all duration-200 p-1 bg-purple-600/20 rounded-full"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-purple-100 hover:text-white underline transition-colors duration-200">
                Lupa Password?
              </a>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="flex items-center gap-2 text-red-200 text-sm bg-red-500/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  Masuk...
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gradient-to-br from-purple-500 to-purple-600 px-4 text-purple-100">
                Atau masuk melalui
              </span>
            </div>
          </div>

          {/* Google Login */}
          <div className="space-y-4">
            {/* Official Google Sign-In Button */}
            <div
              id="google-signin-button"
              className="w-full flex justify-center"
              style={{ display: isGoogleLoading ? "none" : "flex" }}
            ></div>

            {/* Custom Google Button (fallback) */}
            <button
              onClick={handleCustomGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ display: isGoogleLoading ? "flex" : "none" }}
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  Masuk dengan Google...
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  Masuk dengan Google
                </>
              )}
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-purple-100 mt-6">
            Belum Punya Akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-white underline hover:text-purple-100 transition-colors duration-200"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
