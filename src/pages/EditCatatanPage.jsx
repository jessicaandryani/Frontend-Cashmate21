"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Tag, FileText, Save, Loader2, ArrowLeft } from "lucide-react"

const EditCatatanPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [jumlah, setJumlah] = useState("")
  const [tipe, setTipe] = useState("pemasukan")
  const [catatan, setCatatan] = useState("")
  const [kategoriId, setKategoriId] = useState("")
  const [kategoriList, setKategoriList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
    fetchKategori()
    // eslint-disable-next-line
  }, [])

  // Ubah fungsi fetchData untuk menggunakan properti yang benar sesuai dengan model Adonis:
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`http://localhost:3000/pencatatan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = res.data.data
      console.log("Data catatan:", data) // Log untuk debugging

      if (data) {
        setJumlah(data.jumlah)
        setTipe(data.tipe)
        setCatatan(data.catatan || "")

        // Perbaiki untuk menggunakan properti yang benar dari model Adonis
        if (data.kategoriId) {
          setKategoriId(String(data.kategoriId))
        } else if (data.kategori_id) {
          setKategoriId(String(data.kategori_id))
        } else if (data.kategori && data.kategori.id) {
          setKategoriId(String(data.kategori.id))
        }

        console.log(
          "Kategori ID yang diset:",
          data.kategoriId || data.kategori_id || (data.kategori && data.kategori.id),
        )
      }
    } catch (error) {
      console.error("Gagal memuat data catatan:", error)
      setError("Gagal memuat data catatan. Pastikan ID valid atau coba lagi nanti.")
    } finally {
      setLoading(false)
    }
  }

  // Ubah fungsi fetchKategori untuk menambahkan log debugging
  const fetchKategori = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:3000/kategori", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = Array.isArray(res.data) ? res.data : res.data.data
      console.log("Data kategori:", data) // Log untuk debugging
      setKategoriList(data || [])
    } catch (error) {
      console.error("Gagal memuat kategori:", error)
      setKategoriList([])
    }
  }

  // Dan ubah bagian handleSubmit untuk mengirim data dengan properti yang benar:
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `http://localhost:3000/pencatatan/${id}`,
        {
          jumlah: Number(jumlah),
          tipe,
          catatan,
          kategoriId: kategoriId, // Gunakan camelCase sesuai model
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Redirect to dashboard on success
      navigate("/dashboard")
    } catch (error) {
      console.error("Gagal mengedit catatan:", error)
      setError("Terjadi kesalahan saat mengedit catatan.")
      setSubmitting(false)
    }
  }

  const normalize = (str) => str.toLowerCase().replace(/k/g, "")

  // Ubah bagian render dropdown kategori untuk menampilkan semua kategori jika tidak ada yang cocok
  const filteredKategori = kategoriList.filter((kat) => normalize(kat.tipe) === normalize(tipe))

  // Tambahkan kategori yang dipilih jika tidak ada dalam daftar yang difilter
  const selectedKategori = kategoriId ? kategoriList.find((kat) => String(kat.id) === String(kategoriId)) : null
  const hasSelectedKategoriInFiltered = selectedKategori
    ? filteredKategori.some((kat) => String(kat.id) === String(kategoriId))
    : false

  // Gabungkan kategori yang dipilih dengan kategori yang difilter jika perlu
  const displayedKategori =
    !hasSelectedKategoriInFiltered && selectedKategori ? [selectedKategori, ...filteredKategori] : filteredKategori

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Catatan Keuangan</h1>
          <p className="text-gray-600">Perbarui informasi catatan keuangan Anda</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </button>

        {/* Main Card */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              <p className="text-gray-600 font-medium">Memuat data catatan...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Edit Transaksi</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Jumlah Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  Jumlah (Rp)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">Rp</div>
                </div>
              </div>

              {/* Tipe Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tipe Transaksi</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTipe("pemasukan")}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      tipe === "pemasukan"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <ArrowUpCircle className={`w-5 h-5 ${tipe === "pemasukan" ? "text-green-500" : "text-gray-400"}`} />
                    <span className="font-medium">Pemasukan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTipe("pengeluaran")
                      setKategoriId("")
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      tipe === "pengeluaran"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <ArrowDownCircle
                      className={`w-5 h-5 ${tipe === "pengeluaran" ? "text-red-500" : "text-gray-400"}`}
                    />
                    <span className="font-medium">Pengeluaran</span>
                  </button>
                </div>
              </div>

              {/* Kategori Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Kategori
                </label>
                <div className="relative">
                  <select
                    value={kategoriId}
                    onChange={(e) => setKategoriId(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 appearance-none"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {displayedKategori.map((kat) => (
                      <option key={kat.id} value={kat.id}>
                        {kat.nama}{" "}
                        {!hasSelectedKategoriInFiltered && String(kat.id) === String(kategoriId)
                          ? " (Kategori Sebelumnya)"
                          : ""}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Catatan Textarea */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Catatan
                </label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tambahkan catatan atau keterangan..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditCatatanPage
