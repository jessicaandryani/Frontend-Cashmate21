"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  Download,
  FileText,
  Filter,
  ChevronDown,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const LaporanKeuangan = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState({ pdf: false, excel: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/pencatatan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (err) {
        console.error("Gagal mengambil data catatan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterDataByMonth = (data, selectedMonth, startDate, endDate) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const matchesMonth =
        itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      }
      return matchesMonth;
    });
  };

  const filteredData = filterDataByMonth(
    data,
    selectedMonth,
    startDate,
    endDate
  );
  const uniqueDates = [
    ...new Set(
      filteredData.map((d) => new Date(d.createdAt).toLocaleDateString())
    ),
  ];
  const kategoriSet = new Set(
    filteredData.map((d) => d.kategori?.nama || "Umum")
  );
  const kategoriArray = Array.from(kategoriSet);

  const generateDatasetByKategori = (tipe) => {
    return kategoriArray.map((kat) => {
      const dataPerKategori = uniqueDates.map((date) => {
        const total = filteredData
          .filter(
            (d) =>
              d.tipe === tipe &&
              (d.kategori?.nama || "Umum") === kat &&
              new Date(d.createdAt).toLocaleDateString() === date
          )
          .reduce((sum, cur) => sum + cur.jumlah, 0);
        return total;
      });

      return {
        label: `${tipe.charAt(0).toUpperCase() + tipe.slice(1)} - ${kat}`,
        data: dataPerKategori,
        backgroundColor: tipe === "pemasukan" ? "#10b981" : "#ef4444",
        borderColor: tipe === "pemasukan" ? "#10b981" : "#ef4444",
        fill: false,
        tension: 0.3,
      };
    });
  };

  const pieCategories = [
    ...new Set(filteredData.map((d) => d.kategori?.nama || "Umum")),
  ];
  const pieDataByKategori = pieCategories.map((kat) =>
    filteredData
      .filter((d) => (d.kategori?.nama || "Umum") === kat)
      .reduce((sum, item) => sum + item.jumlah, 0)
  );

  const pieColors = [
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
    "#84cc16",
    "#f97316",
    "#14b8a6",
    "#a855f7",
    "#3b82f6",
  ];

  const chartConfigs = {
    bar: {
      labels: uniqueDates,
      datasets: [
        ...generateDatasetByKategori("pemasukan"),
        ...generateDatasetByKategori("pengeluaran"),
      ],
    },
    line: {
      labels: uniqueDates,
      datasets: [
        ...generateDatasetByKategori("pemasukan"),
        ...generateDatasetByKategori("pengeluaran"),
      ],
    },
    pie: {
      labels: pieCategories,
      datasets: [
        {
          label: "Total per Kategori",
          data: pieDataByKategori,
          backgroundColor: pieColors.slice(0, pieCategories.length),
        },
      ],
    },
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data laporan...</p>
          </div>
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              Tidak ada data untuk ditampilkan
            </p>
            <p className="text-gray-400">
              Pilih periode yang berbeda atau tambahkan transaksi baru
            </p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case "line":
        return (
          <Line
            data={chartConfigs.line}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        );
      case "pie":
        return (
          <Pie
            data={chartConfigs.pie}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        );
      default:
        return (
          <Bar
            data={chartConfigs.bar}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        );
    }
  };

  const handleDownloadPDF = async () => {
    setExporting({ ...exporting, pdf: true });
    try {
      const chartContainer = document.getElementById("chart-section");
      const canvas = await html2canvas(chartContainer);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("laporan-keuangan.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setExporting({ ...exporting, pdf: false });
    }
  };

  const handleDownloadExcel = () => {
    setExporting({ ...exporting, excel: true });
    try {
      const rows = filteredData.map((item) => ({
        Tanggal: new Date(item.createdAt).toLocaleDateString(),
        Tipe: item.tipe,
        Jumlah: item.jumlah,
        Kategori: item.kategori?.nama || "Umum",
        Keterangan: item.catatan || "-",
      }));
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const file = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(file, "laporan-keuangan.xlsx");
    } catch (error) {
      console.error("Error generating Excel:", error);
    } finally {
      setExporting({ ...exporting, excel: false });
    }
  };

  const getChartIcon = () => {
    switch (chartType) {
      case "line":
        return <TrendingUp className="w-5 h-5" />;
      case "pie":
        return <PieChart className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  // Calculate summary statistics
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
            Laporan Keuangan
          </h1>
          <p className="text-gray-600">
            Analisis dan visualisasi data keuangan Anda
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Total Pemasukan
                </p>
                <p className="text-2xl font-bold">
                  Rp {totalPemasukan.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold">
                  Rp {totalPengeluaran.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6 rotate-180" />
              </div>
            </div>
          </div>

          <div
            className={`bg-gradient-to-br ${
              saldoAkhir >= 0
                ? "from-purple-500 to-purple-600"
                : "from-orange-500 to-orange-600"
            } rounded-2xl shadow-xl p-6 text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Saldo Akhir
                </p>
                <p className="text-2xl font-bold">
                  Rp {saldoAkhir.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Filter & Pengaturan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Month Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Pilih Bulan
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Chart Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {getChartIcon()}
                Jenis Grafik
              </label>
              <div className="relative">
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 appearance-none"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Dari Tanggal
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Sampai Tanggal
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleDownloadPDF}
            disabled={exporting.pdf}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {exporting.pdf ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Download className="w-5 h-5" />
            )}
            <span>{exporting.pdf ? "Mengunduh..." : "Unduh PDF"}</span>
          </button>

          <button
            onClick={handleDownloadExcel}
            disabled={exporting.excel}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {exporting.excel ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FileText className="w-5 h-5" />
            )}
            <span>{exporting.excel ? "Mengunduh..." : "Unduh Excel"}</span>
          </button>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            {getChartIcon()}
            <h2 className="text-xl font-bold text-gray-800">
              Visualisasi Data -{" "}
              {chartType === "bar"
                ? "Bar Chart"
                : chartType === "line"
                ? "Line Chart"
                : "Pie Chart"}
            </h2>
          </div>

          <div id="chart-section" className="h-96">
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanKeuangan;
