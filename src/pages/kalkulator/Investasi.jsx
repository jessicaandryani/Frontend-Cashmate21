import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const KalkulatorInvestasi = () => {
  const [danaAwal, setDanaAwal] = useState("");
  const [investasiBulanan, setInvestasiBulanan] = useState("");
  const [imbalHasil, setImbalHasil] = useState("");
  const [jangkaWaktu, setJangkaWaktu] = useState("");
  const [hasil, setHasil] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleChange = (e, setter) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setter(onlyNumbers);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(angka);
  };

  const hitungInvestasi = () => {
    const P = Number(danaAwal);
    const PMT = Number(investasiBulanan);
    const r = Number(imbalHasil) / 100 / 12;
    const n = Number(jangkaWaktu) * 12;

    // Hitung Future Value total
    const FV =
      P * Math.pow(1 + r, n) +
      PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    setHasil(FV);

    // Data untuk grafik pertumbuhan investasi
    let saldo = P;
    const dataBulan = [];
    for (let i = 1; i <= n; i++) {
      saldo += PMT;
      saldo *= 1 + r;
      dataBulan.push({
        bulan: i,
        saldo: saldo,
      });
    }

    const labels = dataBulan.map((item) => `Bulan ${item.bulan}`);
    const dataValues = dataBulan.map((item) => item.saldo.toFixed(2));

    setChartData({
      labels,
      datasets: [
        {
          label: "Total Nilai Investasi",
          data: dataValues,
          borderColor: "#3c40d0",
          backgroundColor: "rgba(60, 64, 208, 0.2)",
          tension: 0.3,
        },
      ],
    });
  };

  return (
    <div style={{ padding: "32px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1900a5" }}>
        Kalkulator Investasi 💸
      </h1>
      <p style={{ marginBottom: "24px", color: "#555" }}>
        Hitung estimasi nilai investasi kamu berdasarkan bunga dan durasi waktu.
      </p>

      {/* Form */}
      <label>✅ Dana Awal (Rp)</label>
      <input
        type="text"
        value={danaAwal}
        onChange={(e) => handleChange(e, setDanaAwal)}
        style={inputStyle}
      />

      <label>📅 Investasi Bulanan (Rp)</label>
      <input
        type="text"
        value={investasiBulanan}
        onChange={(e) => handleChange(e, setInvestasiBulanan)}
        style={inputStyle}
      />

      <label>📈 Tingkat Imbal Hasil (%)</label>
      <input
        type="number"
        value={imbalHasil}
        onChange={(e) => setImbalHasil(e.target.value)}
        style={inputStyle}
      />

      <label>📆 Jangka Waktu (tahun)</label>
      <input
        type="number"
        value={jangkaWaktu}
        onChange={(e) => setJangkaWaktu(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={hitungInvestasi}
        style={{
          marginTop: "24px",
          padding: "10px 20px",
          backgroundColor: "#3c40d0",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Hitung
      </button>

      {hasil && (
        <div style={{ marginTop: "24px", fontSize: "18px", color: "#333" }}>
          <strong>Total Estimasi Hasil Investasi:</strong> {formatRupiah(hasil)}
        </div>
      )}

      {/* Grafik */}
      {chartData && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "16px" }}>
            📈 Grafik Pertumbuhan Investasi
          </h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 16px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default KalkulatorInvestasi;
