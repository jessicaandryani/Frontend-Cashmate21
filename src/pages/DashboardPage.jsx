"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  Edit3,
  Trash2,
  Filter,
} from "lucide-react";
import ModalConfirm from "../components/ModalConfirm";

const DashboardPage = () => {
  const [pencatatan, setPencatatan] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/pencatatan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setPencatatan(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/pencatatan/${itemToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlertMessage("✅ Catatan berhasil dihapus!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
      setAlertMessage("❌ Gagal menghapus catatan.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-catatan/${id}`);
  };

  const filteredData = selectedMonth
    ? pencatatan.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const monthYear = `${itemDate.getFullYear()}-${String(
          itemDate.getMonth() + 1
        ).padStart(2, "0")}`;
        return monthYear === selectedMonth;
      })
    : pencatatan;

  const totalPemasukan = filteredData
    .filter((item) => item.tipe === "pemasukan")
    .reduce((sum, item) => sum + item.jumlah, 0);

  const totalPengeluaran = filteredData
    .filter((item) => item.tipe === "pengeluaran")
    .reduce((sum, item) => sum + item.jumlah, 0);

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Keuangan
          </h1>
          <p className="text-gray-600">
            Kelola dan pantau keuangan Anda dengan mudah
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-800">Filter Data</h2>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">
              Pilih Bulan:
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Pemasukan */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm font-medium">
                  Total Pemasukan
                </p>
                <p className="text-2xl font-bold">
                  Rp {totalPemasukan.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="h-1 bg-white/20 rounded-full">
              <div className="h-1 bg-white rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Total Pengeluaran */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-red-100 text-sm font-medium">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold">
                  Rp {totalPengeluaran.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="h-1 bg-white/20 rounded-full">
              <div className="h-1 bg-white rounded-full w-2/3"></div>
            </div>
          </div>

          {/* Saldo Akhir */}
          <div
            className={`bg-gradient-to-br ${
              saldoAkhir >= 0
                ? "from-purple-500 to-purple-600"
                : "from-orange-500 to-orange-600"
            } rounded-2xl shadow-xl p-6 text-white`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-purple-100 text-sm font-medium">
                  Saldo Akhir
                </p>
                <p className="text-2xl font-bold">
                  Rp {saldoAkhir.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="h-1 bg-white/20 rounded-full">
              <div
                className={`h-1 bg-white rounded-full ${
                  saldoAkhir >= 0 ? "w-4/5" : "w-1/2"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Records List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Catatan Terbaru</h2>
          </div>

          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">
                Tidak ada catatan di bulan ini
              </p>
              <p className="text-gray-400">Yuk tambah catatan baru!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-l-4 ${
                      item.tipe === "pemasukan"
                        ? "bg-green-50 border-green-500"
                        : "bg-red-50 border-red-500"
                    } hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg ${
                              item.tipe === "pemasukan"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            {item.tipe === "pemasukan" ? (
                              <TrendingUp
                                className={`w-4 h-4 ${
                                  item.tipe === "pemasukan"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />
                            ) : (
                              <TrendingDown
                                className={`w-4 h-4 ${
                                  item.tipe === "pemasukan"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />
                            )}
                          </div>
                          <div>
                            <h3
                              className={`font-bold text-lg ${
                                item.tipe === "pemasukan"
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {item.tipe.toUpperCase()}
                            </h3>
                            <p
                              className={`text-2xl font-bold ${
                                item.tipe === "pemasukan"
                                  ? "text-green-800"
                                  : "text-red-800"
                              }`}
                            >
                              Rp {item.jumlah.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Catatan:</span>{" "}
                            {item.catatan || "Tidak ada catatan"}
                          </p>
                          <p>
                            <span className="font-medium">Kategori:</span>{" "}
                            {item.kategori?.nama || "Tanpa kategori"}
                          </p>
                          <p>
                            <span className="font-medium">Tanggal:</span>{" "}
                            {new Date(item.createdAt).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/tambah-catatan")}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group hover:scale-110"
        >
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Alert Notification */}
        {showAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {alertMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirmation */}
        {showModal && (
          <ModalConfirm
            title="Konfirmasi Hapus"
            message="Yakin ingin menghapus catatan ini? Tindakan ini tidak bisa dibatalkan."
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setShowModal(false);
              setItemToDelete(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
