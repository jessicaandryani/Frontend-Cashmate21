"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const ZakatMalCalculator = () => {
  const [uangTunai, setUangTunai] = useState("")
  const [emasPerak, setEmasPerak] = useState("")
  const [asetInvestasi, setAsetInvestasi] = useState("")
  const [asetLainnya, setAsetLainnya] = useState("")
  const [hutangJatuhTempo, setHutangJatuhTempo] = useState("")
  const [zakat, setZakat] = useState(null)
  const nisab = 85000000 // Contoh nisab, sesuaikan dengan harga emas terkini

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalHarta =
      Number.parseFloat(uangTunai || 0) +
      Number.parseFloat(emasPerak || 0) +
      Number.parseFloat(asetInvestasi || 0) +
      Number.parseFloat(asetLainnya || 0)
    const totalHutang = Number.parseFloat(hutangJatuhTempo || 0)
    const netto = totalHarta - totalHutang

    if (netto >= nisab) {
      setZakat({
        totalHarta,
        totalHutang,
        netto,
        zakatAmount: netto * 0.025,
        wajibZakat: true,
      })
    } else {
      setZakat({
        totalHarta,
        totalHutang,
        netto,
        zakatAmount: 0,
        wajibZakat: false,
      })
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
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
              background: "linear-gradient(135deg, #1900a5, #3c40d0)",
              borderRadius: "16px",
              padding: "24px",
              color: "white",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🕌</div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0" }}>Kalkulator Zakat Mal</h1>
            <p style={{ margin: "0", opacity: "0.9" }}>
              Hitung kewajiban zakat berdasarkan harta yang Anda miliki selama 1 tahun
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
              Masukkan Data Harta Anda
            </h2>

            <form onSubmit={handleSubmit}>
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
                    💰 Uang Tunai, Tabungan, Deposito (Rp)
                  </label>
                  <input
                    type="number"
                    value={uangTunai}
                    onChange={(e) => setUangTunai(e.target.value)}
                    placeholder="Contoh: 10000000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1900a5")}
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
                    🥇 Emas, Perak, Logam Mulia (Rp)
                  </label>
                  <input
                    type="number"
                    value={emasPerak}
                    onChange={(e) => setEmasPerak(e.target.value)}
                    placeholder="Contoh: 5000000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1900a5")}
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
                    📈 Aset Investasi (Saham, Reksadana, dll) (Rp)
                  </label>
                  <input
                    type="number"
                    value={asetInvestasi}
                    onChange={(e) => setAsetInvestasi(e.target.value)}
                    placeholder="Contoh: 15000000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1900a5")}
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
                    🏠 Aset Lainnya (Rp)
                  </label>
                  <input
                    type="number"
                    value={asetLainnya}
                    onChange={(e) => setAsetLainnya(e.target.value)}
                    placeholder="Contoh: 2000000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1900a5")}
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
                    💳 Hutang Jatuh Tempo (Rp)
                  </label>
                  <input
                    type="number"
                    value={hutangJatuhTempo}
                    onChange={(e) => setHutangJatuhTempo(e.target.value)}
                    placeholder="Contoh: 5000000"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1900a5")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #1900a5, #3c40d0)",
                  color: "white",
                  border: "none",
                  padding: "16px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "24px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
              >
                Hitung Zakat
              </button>
            </form>
          </div>

          {/* Result */}
          <div>
            {zakat ? (
              <div
                style={{
                  background: zakat.wajibZakat
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #f59e0b, #d97706)",
                  borderRadius: "16px",
                  padding: "32px",
                  color: "white",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", margin: "0 0 24px 0" }}>
                  {zakat.wajibZakat ? "✅ Wajib Zakat" : "ℹ️ Belum Wajib Zakat"}
                </h3>

                <div style={{ display: "grid", gap: "16px", marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                    }}
                  >
                    <span>Total Harta:</span>
                    <span style={{ fontWeight: "bold" }}>{formatCurrency(zakat.totalHarta)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                    }}
                  >
                    <span>Total Hutang:</span>
                    <span style={{ fontWeight: "bold" }}>{formatCurrency(zakat.totalHutang)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                    }}
                  >
                    <span>Harta Netto:</span>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>{formatCurrency(zakat.netto)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                    }}
                  >
                    <span>Nisab:</span>
                    <span style={{ fontWeight: "bold" }}>{formatCurrency(nisab)}</span>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "14px", opacity: "0.9", marginBottom: "8px" }}>
                    {zakat.wajibZakat ? "Zakat yang Harus Dibayar:" : "Kekurangan dari Nisab:"}
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                    {zakat.wajibZakat ? formatCurrency(zakat.zakatAmount) : formatCurrency(nisab - zakat.netto)}
                  </div>
                </div>

                {zakat.wajibZakat && (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      padding: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <p style={{ fontSize: "14px", margin: "0", opacity: "0.9" }}>
                      💡 Segera tunaikan kewajiban zakat Anda untuk membersihkan harta dan membantu sesama yang
                      membutuhkan.
                    </p>
                  </div>
                )}
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
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧮</div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px", color: "#1900a5" }}>
                  Hasil Perhitungan
                </h3>
                <p style={{ fontSize: "16px", color: "#64748b", margin: "0" }}>
                  Masukkan data harta Anda dan klik "Hitung Zakat" untuk melihat hasil perhitungan
                </p>
              </div>
            )}

            {/* Info Nisab */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "16px",
                padding: "24px",
                border: "1px solid rgba(25, 0, 165, 0.1)",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1900a5",
                  marginBottom: "12px",
                  margin: "0 0 12px 0",
                }}
              >
                ℹ️ Informasi Nisab Zakat Mal
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: "0 0 12px 0",
                }}
              >
                Nisab zakat mal setara dengan 85 gram emas ({formatCurrency(nisab)}). Jika harta netto Anda mencapai
                atau melebihi nisab dan telah dimiliki selama 1 tahun (haul), maka wajib mengeluarkan zakat sebesar 2.5%
                dari harta netto.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: "1.6",
                  margin: "0",
                }}
              >
                <strong>Rumus:</strong> Harta Netto = Total Harta - Hutang Jatuh Tempo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZakatMalCalculator
