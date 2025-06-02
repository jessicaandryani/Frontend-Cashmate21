"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const InvestasiCalculator = () => {
  const [danaAwal, setDanaAwal] = useState("")
  const [investasiBulanan, setInvestasiBulanan] = useState("")
  const [imbalHasil, setImbalHasil] = useState("")
  const [jangkaWaktu, setJangkaWaktu] = useState("")
  const [hasil, setHasil] = useState(null)
  const [chartData, setChartData] = useState(null)

  const handleChange = (e, setter) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "")
    setter(onlyNumbers)
  }

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka)
  }

  const hitungInvestasi = () => {
    const P = Number(danaAwal) || 0
    const PMT = Number(investasiBulanan) || 0
    const r = Number(imbalHasil) / 100 / 12 || 0
    const n = Number(jangkaWaktu) * 12 || 0

    if (n === 0) return

    // Hitung Future Value total
    let FV = 0
    if (r > 0) {
      FV = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    } else {
      FV = P + PMT * n
    }

    const totalInvestasi = P + PMT * n
    const totalKeuntungan = FV - totalInvestasi

    setHasil({
      nilaiAkhir: FV,
      totalInvestasi,
      totalKeuntungan,
      returnPercentage: (totalKeuntungan / totalInvestasi) * 100,
      danaAwal: P,
      investasiBulanan: PMT,
      imbalHasil: Number(imbalHasil),
      jangkaWaktu: Number(jangkaWaktu),
    })

    // Data untuk grafik pertumbuhan investasi
    const dataTahunan = []
    for (let tahun = 1; tahun <= Number(jangkaWaktu); tahun++) {
      const bulanKe = tahun * 12
      let saldoTahunIni = 0

      if (r > 0) {
        saldoTahunIni = P * Math.pow(1 + r, bulanKe) + PMT * ((Math.pow(1 + r, bulanKe) - 1) / r) * (1 + r)
      } else {
        saldoTahunIni = P + PMT * bulanKe
      }

      const investasiTahunIni = P + PMT * bulanKe
      const keuntunganTahunIni = saldoTahunIni - investasiTahunIni

      dataTahunan.push({
        tahun,
        totalInvestasi: investasiTahunIni,
        nilaiAkhir: saldoTahunIni,
        keuntungan: keuntunganTahunIni,
      })
    }

    setChartData(dataTahunan)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <Link
            to="/kalkulator"
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#1900a5",
              textDecoration: "none",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            ← Kembali ke Menu Kalkulator
          </Link>
          <div
            style={{
              background: "linear-gradient(135deg, #6b5fc6, #bba3dc)",
              borderRadius: "16px",
              padding: "24px",
              color: "white",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💸</div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0" }}>Kalkulator Investasi</h1>
            <p style={{ margin: "0", opacity: "0.9" }}>
              Hitung estimasi nilai investasi berdasarkan compound interest dan durasi waktu
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Form */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px", color: "#1900a5" }}>
              Parameter Investasi
            </h2>

            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  💰 Dana Awal (Rp)
                </label>
                <input
                  type="text"
                  value={danaAwal}
                  onChange={(e) => handleChange(e, setDanaAwal)}
                  placeholder="10000000"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b5fc6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  📅 Investasi Bulanan (Rp)
                </label>
                <input
                  type="text"
                  value={investasiBulanan}
                  onChange={(e) => handleChange(e, setInvestasiBulanan)}
                  placeholder="1000000"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b5fc6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  📈 Tingkat Imbal Hasil (% per tahun)
                </label>
                <input
                  type="number"
                  value={imbalHasil}
                  onChange={(e) => setImbalHasil(e.target.value)}
                  placeholder="12"
                  step="0.1"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b5fc6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  📆 Jangka Waktu (tahun)
                </label>
                <input
                  type="number"
                  value={jangkaWaktu}
                  onChange={(e) => setJangkaWaktu(e.target.value)}
                  placeholder="10"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b5fc6")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            <button
              onClick={hitungInvestasi}
              disabled={!danaAwal && !investasiBulanan}
              style={{
                width: "100%",
                background: danaAwal || investasiBulanan ? "linear-gradient(135deg, #6b5fc6, #bba3dc)" : "#e2e8f0",
                color: danaAwal || investasiBulanan ? "white" : "#94a3b8",
                border: "none",
                padding: "16px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: danaAwal || investasiBulanan ? "pointer" : "not-allowed",
                marginTop: "24px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (danaAwal || investasiBulanan) {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 10px 20px rgba(107, 95, 198, 0.3)"
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Hitung Proyeksi Investasi
            </button>
          </div>

          {/* Result */}
          <div>
            {hasil ? (
              <div>
                <div
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    borderRadius: "16px",
                    padding: "32px",
                    color: "white",
                    marginBottom: "24px",
                  }}
                >
                  <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", margin: "0 0 24px 0" }}>
                    📈 Hasil Proyeksi Investasi
                  </h3>

                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ fontSize: "14px", opacity: "0.8", marginBottom: "8px" }}>
                      Total Nilai Investasi Setelah {hasil.jangkaWaktu} Tahun
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>
                      {formatRupiah(hasil.nilaiAkhir)}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "12px", opacity: "0.8", marginBottom: "4px" }}>Total Investasi</div>
                      <div style={{ fontSize: "18px", fontWeight: "600" }}>{formatRupiah(hasil.totalInvestasi)}</div>
                    </div>
                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "12px", opacity: "0.8", marginBottom: "4px" }}>Total Keuntungan</div>
                      <div style={{ fontSize: "18px", fontWeight: "600" }}>{formatRupiah(hasil.totalKeuntungan)}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "14px", opacity: "0.9" }}>
                      💡 Return Total: <strong>{hasil.returnPercentage.toFixed(1)}%</strong> dari modal yang disetorkan
                    </div>
                  </div>
                </div>

                {/* Chart Simulation */}
                {chartData && (
                  <div
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      marginBottom: "24px",
                    }}
                  >
                    <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#1900a5" }}>
                      📊 Proyeksi Pertumbuhan Per Tahun
                    </h4>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "60px 1fr 1fr 1fr",
                          gap: "12px",
                          padding: "12px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        <div>Tahun</div>
                        <div>Total Investasi</div>
                        <div>Nilai Akhir</div>
                        <div>Keuntungan</div>
                      </div>
                      {chartData.map((data, index) => (
                        <div
                          key={index}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "60px 1fr 1fr 1fr",
                            gap: "12px",
                            padding: "12px",
                            borderBottom: "1px solid #f3f4f6",
                            fontSize: "13px",
                          }}
                        >
                          <div style={{ fontWeight: "bold", color: "#6b5fc6" }}>{data.tahun}</div>
                          <div>{formatRupiah(data.totalInvestasi)}</div>
                          <div style={{ fontWeight: "bold" }}>{formatRupiah(data.nilaiAkhir)}</div>
                          <div style={{ color: "#10b981", fontWeight: "bold" }}>+{formatRupiah(data.keuntungan)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visual Chart */}
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#1900a5" }}>
                    📈 Visualisasi Pertumbuhan
                  </h4>
                  <div style={{ position: "relative", height: "200px", background: "#f8fafc", borderRadius: "8px" }}>
                    <svg width="100%" height="100%" style={{ position: "absolute" }}>
                      {chartData && chartData.length > 1 && (
                        <>
                          {/* Grid lines */}
                          {[0, 25, 50, 75, 100].map((y) => (
                            <line
                              key={y}
                              x1="40"
                              y1={`${20 + (y * 160) / 100}%`}
                              x2="95%"
                              y2={`${20 + (y * 160) / 100}%`}
                              stroke="#e2e8f0"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Chart line */}
                          <polyline
                            fill="none"
                            stroke="#6b5fc6"
                            strokeWidth="3"
                            points={chartData
                              .map((data, index) => {
                                const x = 40 + (index * (95 - 40)) / (chartData.length - 1)
                                const maxValue = Math.max(...chartData.map((d) => d.nilaiAkhir))
                                const y = 180 - (data.nilaiAkhir / maxValue) * 160
                                return `${x}%,${y}`
                              })
                              .join(" ")}
                          />

                          {/* Data points */}
                          {chartData.map((data, index) => {
                            const x = 40 + (index * (95 - 40)) / (chartData.length - 1)
                            const maxValue = Math.max(...chartData.map((d) => d.nilaiAkhir))
                            const y = 180 - (data.nilaiAkhir / maxValue) * 160
                            return (
                              <circle
                                key={index}
                                cx={`${x}%`}
                                cy={y}
                                r="4"
                                fill="#6b5fc6"
                                stroke="white"
                                strokeWidth="2"
                              />
                            )
                          })}

                          {/* Y-axis labels */}
                          <text x="10" y="25" fontSize="12" fill="#64748b">
                            Max
                          </text>
                          <text x="10" y="105" fontSize="12" fill="#64748b">
                            Mid
                          </text>
                          <text x="10" y="185" fontSize="12" fill="#64748b">
                            Min
                          </text>
                        </>
                      )}
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "16px",
                  padding: "32px",
                  textAlign: "center",
                  border: "2px dashed #e2e8f0",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px", color: "#1900a5" }}>
                  Hasil Proyeksi Investasi
                </h3>
                <p style={{ fontSize: "16px", color: "#64748b", margin: "0" }}>
                  Masukkan parameter investasi untuk melihat proyeksi pertumbuhan dana Anda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestasiCalculator
