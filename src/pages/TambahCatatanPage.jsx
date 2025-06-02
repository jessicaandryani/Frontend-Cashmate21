"use client";
import placeholderImage from "../assets/damn.png";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  Tag,
  FileText,
  Save,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TambahCatatanPage = () => {
  const [jumlah, setJumlah] = useState("");
  const [tipe, setTipe] = useState("pemasukan");
  const [catatan, setCatatan] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [selectedKategoriId, setSelectedKategoriId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategori = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login ulang.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/kategori", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("🔍 Respon API kategori:", res.data);
        setKategoriList(res.data.data || []);
      } catch (error) {
        console.error("❌ Error ambil kategori:", error);
        setError("Gagal memuat kategori. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchKategori();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token tidak ditemukan. Silakan login ulang.");
      setSubmitting(false);
      return;
    }

    if (!jumlah || Number(jumlah) <= 0) {
      setError("Mohon isi jumlah dengan nilai yang valid.");
      setSubmitting(false);
      return;
    }

    if (!selectedKategoriId) {
      setError("Mohon pilih kategori.");
      setSubmitting(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/pencatatan",
        {
          jumlah: Number(jumlah),
          tipe,
          kategori: selectedKategoriId,
          catatan,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (error) {
      console.error("Gagal menambahkan catatan:", error);
      setError("Gagal menambahkan catatan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  // Fungsi untuk menormalkan string tipe supaya typo "Pemasukkan" tetap cocok
  const normalize = (str) => str.toLowerCase().replace(/k/g, "");

  const filteredKategori = kategoriList.filter(
    (k) => normalize(k.tipe) === normalize(tipe)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tambah Catatan Keuangan
          </h1>
          <p className="text-gray-600">
            Catat pemasukan dan pengeluaran Anda dengan mudah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Tambah Transaksi Baru
              </h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
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
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 pl-10"
                    placeholder="0"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    Rp
                  </div>
                </div>
              </div>

              {/* Tipe Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tipe Transaksi
                </label>
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
                    <ArrowUpCircle
                      className={`w-5 h-5 ${
                        tipe === "pemasukan"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">Pemasukan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTipe("pengeluaran");
                      setSelectedKategoriId("");
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                      tipe === "pengeluaran"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <ArrowDownCircle
                      className={`w-5 h-5 ${
                        tipe === "pengeluaran"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
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
                    value={selectedKategoriId}
                    onChange={(e) => setSelectedKategoriId(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 appearance-none"
                    disabled={loading}
                  >
                    {loading ? (
                      <option value="">Memuat kategori...</option>
                    ) : (
                      <>
                        <option value="">-- Pilih Kategori --</option>
                        {filteredKategori.map((kategori) => (
                          <option key={kategori.id} value={kategori.id}>
                            {kategori.nama}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Catatan Textarea */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Catatan (opsional)
                </label>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 min-h-[120px] resize-none"
                  placeholder="Tambahkan catatan atau keterangan..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Simpan Catatan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Illustration Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Tips Pencatatan Keuangan
              </h3>
              <p className="text-gray-600">
                Catat transaksi secara rutin untuk hasil yang optimal
              </p>
            </div>

            <div className="w-full max-w-md">
              <img
                src={placeholderImage}
                alt="Ilustrasi Tambah Catatan"
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="mt-8 space-y-4 w-full max-w-md">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowUpCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Catat Pemasukan
                  </h4>
                  <p className="text-sm text-gray-600">
                    Catat semua sumber pemasukan Anda, termasuk gaji, bonus,
                    atau pendapatan sampingan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowDownCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Catat Pengeluaran
                  </h4>
                  <p className="text-sm text-gray-600">
                    Catat semua pengeluaran, bahkan yang kecil, untuk memahami
                    pola belanja Anda.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Gunakan Kategori
                  </h4>
                  <p className="text-sm text-gray-600">
                    Kategorikan transaksi dengan tepat untuk analisis keuangan
                    yang lebih baik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahCatatanPage;
