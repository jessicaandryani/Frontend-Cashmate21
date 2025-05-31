import React from "react";
import { Link } from "react-router-dom";

const KalkulatorPage = () => {
  // Warna dari atas ke bawah dari palet gambar kamu
  const colors = [
    "#1900a5", // Warna 1 (ungu tua)
    "#3c40d0", // Warna 2
    "#6b5fc6", // Warna 3
    "#ffffff", // Warna 4 (putih)
    "#bba3dc"  // Warna 5 (ungu muda)
  ];

  // Gaya umum kartu
  const cardStyle = (bgColor, textColor = "#fff") => ({
    backgroundColor: bgColor,
    color: textColor,
    padding: "24px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    textDecoration: "none",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  });

  const hoverStyle = {
    transform: "scale(1.03)"
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px", color: "#1900a5" }}>
        Pilih Jenis Kalkulator
      </h1>
      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {/* Card Zakat Mal */}
        <Link to="/kalkulator/zakat-mal" style={cardStyle(colors[0])} onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
          <div style={{ fontSize: "32px" }}>🕌</div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginTop: "8px" }}>Zakat Mal</h2>
          <p style={{ fontSize: "14px", marginTop: "4px", color: "#d1ccff" }}>Hitung kewajiban zakat berdasarkan harta.</p>
        </Link>

        {/* Card Profil Risiko */}
        <Link to="/kalkulator/profil-risiko" style={cardStyle(colors[1])} onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
          <div style={{ fontSize: "32px" }}>📊</div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginTop: "8px" }}>Profil Risiko</h2>
          <p style={{ fontSize: "14px", marginTop: "4px", color: "#e3e2f8" }}>Tes untuk mengetahui tipe profil investasimu.</p>
        </Link>

        {/* Card Investasi */}
        <Link to="/kalkulator/investasi" style={cardStyle(colors[2])} onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
          <div style={{ fontSize: "32px" }}>💸</div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginTop: "8px" }}>Kalkulator Investasi</h2>
          <p style={{ fontSize: "14px", marginTop: "4px", color: "#e8e5fa" }}>Simulasikan pertumbuhan dana investasimu.</p>
        </Link>
      </div>
    </div>
  );
};

export default KalkulatorPage;
