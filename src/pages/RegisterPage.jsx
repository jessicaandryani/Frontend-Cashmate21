"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [googleInitialized, setGoogleInitialized] = useState(false);

  // Perbaikan untuk environment variable
  const getGoogleClientId = () => {
    // Coba beberapa cara untuk mendapatkan Client ID
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_GOOGLE_CLIENT_ID
    ) {
      return process.env.REACT_APP_GOOGLE_CLIENT_ID;
    }

    // Fallback ke window object jika ada
    if (typeof window !== "undefined" && window.REACT_APP_GOOGLE_CLIENT_ID) {
      return window.REACT_APP_GOOGLE_CLIENT_ID;
    }

    // Hardcode untuk testing (ganti dengan Client ID Anda yang sebenarnya)
    return "757765765011-ls5gc5u8cl80kgdthvlaslsdpit4edl1.apps.googleusercontent.com";
  };

  const GOOGLE_CLIENT_ID = getGoogleClientId();

  useEffect(() => {
    console.log("RegisterPage mounted");
    console.log("Google Client ID:", GOOGLE_CLIENT_ID);

    // Validasi Client ID
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes("YOUR_ACTUAL")) {
      console.error("Google Client ID not configured properly");
      setErrors((prev) => ({
        ...prev,
        google:
          "Google Client ID belum dikonfigurasi. Silakan hubungi administrator.",
      }));
      return;
    }

    // Load Google Sign-In script
    const loadGoogleScript = () => {
      if (
        document.querySelector(
          'script[src="https://accounts.google.com/gsi/client"]'
        )
      ) {
        console.log("Google script already loaded");
        initializeGoogleSignIn();
        return;
      }

      console.log("Loading Google script...");
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google script loaded successfully");
        initializeGoogleSignIn();
      };
      script.onerror = (error) => {
        console.error("Error loading Google script:", error);
        setErrors((prev) => ({
          ...prev,
          google: "Gagal memuat Google Sign-In. Coba refresh halaman.",
        }));
      };
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google) {
        console.error("Google API not available");
        return;
      }

      try {
        console.log(
          "Initializing Google Sign-In for registration with client ID:",
          GOOGLE_CLIENT_ID
        );

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render the Google Sign-In button
        const buttonElement = document.getElementById("google-register-button");
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signup_with",
            shape: "rectangular",
            logo_alignment: "left",
          });
        }

        setGoogleInitialized(true);
        console.log("Google Sign-In for registration initialized successfully");
      } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        setErrors((prev) => ({
          ...prev,
          google: "Gagal menginisialisasi Google Sign-In: " + error.message,
        }));
      }
    };

    loadGoogleScript();
  }, [GOOGLE_CLIENT_ID]);

  const handleGoogleResponse = async (response) => {
    console.log("Google registration response received:", response);
    setIsGoogleLoading(true);
    setErrors({});

    try {
      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      console.log("Sending credential to backend for registration...");
      // Send credential to your backend - menggunakan endpoint yang sama
      const backendResponse = await axios.post(
        "http://localhost:3000/google-login",
        {
          credential: response.credential,
        }
      );

      console.log("Backend response:", backendResponse.data);
      const token = backendResponse.data.data.access_token;
      localStorage.setItem("token", token);

      setSuccess(
        "Registrasi dengan Google berhasil! Mengalihkan ke dashboard..."
      );
      console.log(
        "Google registration successful, redirecting to dashboard..."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Google registration error:", err);
      setErrors({
        submit:
          err.response?.data?.message ||
          "Registrasi dengan Google gagal. Silakan coba lagi!",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Nama lengkap wajib diisi";
    } else if (formData.fullname.length < 2) {
      newErrors.fullname = "Nama lengkap minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await axios.post("http://localhost:3000/register", {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullname,
      });

      setSuccess("Registrasi berhasil! Mengalihkan ke halaman login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrors({
        submit: err.response?.data?.message || "Registrasi gagal. Coba lagi!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomGoogleRegister = () => {
    if (window.google && googleInitialized) {
      console.log("Prompting Google Sign-In for registration...");
      window.google.accounts.id.prompt();
    } else {
      console.error("Google Sign-In not initialized");
      setErrors({
        submit: "Google Sign-In belum dimuat. Silakan refresh halaman.",
      });
    }
  };

  console.log("Rendering RegisterPage");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTRASI</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Brand */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">CashMate</h2>
            <p className="text-purple-100 text-sm leading-relaxed">
              Bergabunglah dan kelola keuanganmu dengan lebih mudah!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label className="text-white font-semibold text-lg">Daftar</label>
            </div>

            {/* Full Name Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-purple-200" />
                </div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Nama Lengkap"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b-2 ${
                    errors.fullname
                      ? "border-red-300"
                      : "border-white/50 focus:border-white"
                  } text-white placeholder-purple-200 py-3 pl-8 pr-4 focus:outline-none transition-colors duration-200`}
                />
              </div>
              {errors.fullname && (
                <div className="flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullname}
                </div>
              )}
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
                    errors.email
                      ? "border-red-300"
                      : "border-white/50 focus:border-white"
                  } text-white placeholder-purple-200 py-3 pl-8 pr-4 focus:outline-none transition-colors duration-200`}
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
                    errors.password
                      ? "border-red-300"
                      : "border-white/50 focus:border-white"
                  } text-white placeholder-purple-200 py-3 pl-8 pr-12 focus:outline-none transition-colors duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/90 hover:text-black hover:bg-purple-600/30 transition-all duration-200 p-1 bg-purple-600/20 rounded-full"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-purple-200" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Konfirmasi Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b-2 ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-white/50 focus:border-white"
                  } text-white placeholder-purple-200 py-3 pl-8 pr-12 focus:outline-none transition-colors duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/90 hover:text-black hover:bg-purple-600/30 transition-all duration-200 p-1 bg-purple-600/20 rounded-full"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 text-green-200 text-sm bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                {success}
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="flex items-center gap-2 text-red-200 text-sm bg-red-500/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </div>
            )}

            {/* Google Error Message */}
            {errors.google && (
              <div className="flex items-center gap-2 text-red-200 text-sm bg-red-500/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {errors.google}
              </div>
            )}

            {/* Terms */}
            <p className="text-xs text-purple-100 leading-relaxed">
              Dengan mendaftar / masuk berarti Anda mematuhi{" "}
              <a
                href="#"
                className="font-semibold underline hover:text-white transition-colors duration-200"
              >
                Syarat dan Ketentuan
              </a>{" "}
              yang berlaku.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  Mendaftar...
                </div>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          {/* Divider - Sekarang di bawah form */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gradient-to-br from-purple-500 to-purple-600 px-4 text-purple-100">
                Atau daftar dengan
              </span>
            </div>
          </div>

          {/* Google Registration - Dipindah ke bawah */}
          <div className="space-y-4 mb-6">
            {/* Official Google Sign-In Button */}
            <div
              id="google-register-button"
              className="w-full flex justify-center"
              style={{ display: isGoogleLoading ? "none" : "flex" }}
            ></div>

            {/* Custom Google Button (fallback) */}
            <button
              onClick={handleCustomGoogleRegister}
              disabled={isGoogleLoading || !googleInitialized}
              className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                display:
                  !googleInitialized || isGoogleLoading ? "flex" : "none",
              }}
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  Mendaftar dengan Google...
                </>
              ) : !googleInitialized ? (
                <>
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  Memuat Google Sign-In...
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  Daftar dengan Google
                </>
              )}
            </button>
          </div>

          {/* Login Link - Dipindah ke paling bawah */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-purple-100 hover:text-white underline transition-colors duration-200"
            >
              Sudah memiliki akun? Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
