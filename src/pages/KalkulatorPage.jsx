"use client"
import { Link } from "react-router-dom"

const KalkulatorPage = () => {
  const calculators = [
    {
      title: "Zakat Mal",
      description: "Hitung kewajiban zakat berdasarkan harta yang dimiliki",
      icon: "🕌",
      href: "/kalkulator/zakat-mal",
      gradient: "linear-gradient(135deg, #1900a5, #3c40d0)",
    },
    {
      title: "Profil Risiko",
      description: "Tes untuk mengetahui tipe profil investasi yang sesuai",
      icon: "📊",
      href: "/kalkulator/profil-risiko",
      gradient: "linear-gradient(135deg, #3c40d0, #6b5fc6)",
    },
    {
      title: "Kalkulator Investasi",
      description: "Simulasikan pertumbuhan dana investasi dalam jangka waktu tertentu",
      icon: "💸",
      href: "/kalkulator/investasi",
      gradient: "linear-gradient(135deg, #6b5fc6, #bba3dc)",
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              borderRadius: "50%",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "32px", color: "white" }}>🧮</span>
          </div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1900a5",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Pilih Jenis Kalkulator
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Gunakan berbagai kalkulator untuk membantu perencanaan keuangan dan investasi Anda
          </p>
        </div>

        {/* Calculator Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {calculators.map((calc, index) => (
            <Link
              key={index}
              to={calc.href}
              style={{
                textDecoration: "none",
                display: "block",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <div
                style={{
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "16px",
                  background: calc.gradient,
                  padding: "32px",
                  color: "white",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Background Pattern */}
                <div
                  style={{
                    position: "absolute",
                    inset: "0",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-16px",
                    right: "-16px",
                    width: "96px",
                    height: "96px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                  }}
                />

                {/* Content */}
                <div
                  style={{ position: "relative", zIndex: "10", flex: "1", display: "flex", flexDirection: "column" }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "56px",
                      height: "56px",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      marginBottom: "24px",
                      fontSize: "28px",
                    }}
                  >
                    {calc.icon}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {calc.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      marginBottom: "24px",
                      margin: "0 0 24px 0",
                      flex: "1",
                    }}
                  >
                    {calc.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginTop: "auto",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Mulai Hitung</span>
                    <svg
                      style={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "8px",
                        transition: "transform 0.3s ease",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div style={{ marginTop: "64px", textAlign: "center" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1900a5",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              Mengapa Menggunakan Kalkulator Kami?
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginTop: "32px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#1900a5",
                    marginBottom: "8px",
                    margin: "0 0 8px 0",
                  }}
                >
                  Akurat & Terpercaya
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  Perhitungan berdasarkan standar dan rumus yang telah terverifikasi
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ⚡
                </div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#1900a5",
                    marginBottom: "8px",
                    margin: "0 0 8px 0",
                  }}
                >
                  Cepat & Mudah
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  Interface yang intuitif dan hasil perhitungan yang instan
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  🔒
                </div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#1900a5",
                    marginBottom: "8px",
                    margin: "0 0 8px 0",
                  }}
                >
                  Aman & Privasi
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  Data Anda aman dan tidak disimpan di server kami
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KalkulatorPage
