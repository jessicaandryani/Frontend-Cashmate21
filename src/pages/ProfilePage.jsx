"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { User, Camera, Lock, Save, Eye, EyeOff, AlertCircle, CheckCircle, Trash2 } from "lucide-react"

const ProfilePage = () => {
  const [user, setUser] = useState({ fullName: "", email: "", avatar: null })
  const [newName, setNewName] = useState("")
  const [newAvatar, setNewAvatar] = useState(null)
  const [previewAvatar, setPreviewAvatar] = useState("")
  const [avatarLoading, setAvatarLoading] = useState(true)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")

  const fetchProfile = async () => {
    try {
      setAvatarLoading(true)
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("Profile data received:", res.data) // Debug log

      const profileData = res.data.data || res.data // Handle both response structures
      setUser(profileData)
      setNewName(profileData.fullName)

      // Set avatar preview with better error handling
      if (profileData.avatar) {
        const avatarUrl = `http://localhost:3000${profileData.avatar}`
        console.log("Avatar URL:", avatarUrl)
        setPreviewAvatar(avatarUrl)
      } else {
        // Explicitly set placeholder when no avatar exists
        setPreviewAvatar("/placeholder.svg?height=120&width=120")
      }
      setAvatarLoading(false)
    } catch (error) {
      console.error("Gagal mengambil data profil:", error)
      setErrors({ fetch: "Gagal mengambil data profil" })
      setAvatarLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ avatar: "Ukuran file maksimal 2MB" })
        return
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
      if (!allowedTypes.includes(file.type)) {
        setErrors({ avatar: "Format file harus JPG, JPEG, atau PNG" })
        return
      }

      setNewAvatar(file)
      setPreviewAvatar(URL.createObjectURL(file))
      setErrors({ ...errors, avatar: "" })
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    const formData = new FormData()
    formData.append("fullName", newName)
    if (newAvatar) formData.append("avatar", newAvatar)

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("http://localhost:3000/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Update response:", response.data) // Debug log

      setSuccess("Profil berhasil diperbarui!")

      // Update user state with response data
      const updatedUser = response.data.user || response.data.data
      setUser(updatedUser)

      // Update preview avatar
      if (updatedUser.avatar) {
        setPreviewAvatar(`http://localhost:3000${updatedUser.avatar}`)
      }

      // Reset avatar state after successful update
      setNewAvatar(null)

      // Reset file input
      const fileInput = document.getElementById("avatar-upload")
      if (fileInput) fileInput.value = ""

      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error updating profile:", error.response || error)
      setErrors({
        profile: error?.response?.data?.message || "Gagal memperbarui profil",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAvatar = async () => {
    if (!user.avatar) return

    if (!confirm("Apakah Anda yakin ingin menghapus avatar?")) return

    setLoading(true)
    setErrors({})

    try {
      const token = localStorage.getItem("token")
      const response = await axios.delete("http://localhost:3000/profile/avatar", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSuccess("Avatar berhasil dihapus!")

      // Update user state
      const updatedUser = response.data.user || { ...user, avatar: null }
      setUser(updatedUser)
      setPreviewAvatar("") // Set to empty string instead of placeholder URL

      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setErrors({
        profile: error?.response?.data?.message || "Gagal menghapus avatar",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setPasswordLoading(true)
    setErrors({})

    const { currentPassword, newPassword, confirmPassword } = passwordData

    // Client-side validation
    if (newPassword.length < 6) {
      setErrors({ password: "Password baru minimal 6 karakter" })
      setPasswordLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setErrors({ password: "Konfirmasi password tidak cocok" })
      setPasswordLoading(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:3000/profile/change-password",
        { oldPassword: currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setSuccess("Password berhasil diubah!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setErrors({
        password: error?.response?.data?.message || "Gagal mengubah password",
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Saya</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Error Message for Fetch */}
        {errors.fetch && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            {errors.fetch}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {avatarLoading ? (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-purple-100">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-purple-100 overflow-hidden">
                  {previewAvatar && previewAvatar !== "" ? (
                    <img
                      src={previewAvatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Image load error, showing default avatar")
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center"
                    style={{ display: previewAvatar && previewAvatar !== "" ? "none" : "flex" }}
                  >
                    <User className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-2 shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>

            {user.avatar && (
              <button
                onClick={handleDeleteAvatar}
                className="mt-2 text-red-500 text-sm flex items-center gap-1 mx-auto hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Hapus avatar
              </button>
            )}
          </div>

          {/* Update Profile Form */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-500" />
              Ubah Profil
            </h3>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ganti Avatar</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 cursor-pointer transition-colors duration-200"
                  >
                    <Camera className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {newAvatar ? newAvatar.name : "Pilih gambar (JPG, PNG, max 2MB)"}
                    </span>
                  </label>
                </div>
                {errors.avatar && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.avatar}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errors.profile && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errors.profile}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-500" />
            Ganti Password
          </h3>

          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errors.password && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {passwordLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mengubah...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Ganti Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
