import React, { useState } from "react";

const ZakatMal = () => {
  const [uangTunai, setUangTunai] = useState("");
  const [emasPerak, setEmasPerak] = useState("");
  const [asetInvestasi, setAsetInvestasi] = useState("");
  const [asetLainnya, setAsetLainnya] = useState("");
  const [hutangJatuhTempo, setHutangJatuhTempo] = useState("");
  const [zakat, setZakat] = useState(null);
  const nisab = 85000000; // Contoh nisab, sesuaikan dengan harga emas terkini

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalHarta =
      parseFloat(uangTunai || 0) +
      parseFloat(emasPerak || 0) +
      parseFloat(asetInvestasi || 0) +
      parseFloat(asetLainnya || 0);
    const totalHutang = parseFloat(hutangJatuhTempo || 0);
    const netto = totalHarta - totalHutang;

    if (netto >= nisab) {
      setZakat(netto * 0.025);
    } else {
      setZakat(0);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#3c40d0" }}>
        Kalkulator Zakat Mal 🕌
      </h1>
      <p style={{ marginBottom: "16px", color: "#555" }}>
        Hitung kewajiban zakat berdasarkan harta yang kamu miliki selama 1 tahun.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Uang Tunai, Tabungan, Deposito (Rp):</label>
          <input
            type="number"
            value={uangTunai}
            onChange={(e) => setUangTunai(e.target.value)}
            placeholder="Contoh: 10000000"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Emas, Perak, Logam Mulia (Rp):</label>
          <input
            type="number"
            value={emasPerak}
            onChange={(e) => setEmasPerak(e.target.value)}
            placeholder="Contoh: 5000000"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Aset Investasi (Saham, Reksadana, dll) (Rp):</label>
          <input
            type="number"
            value={asetInvestasi}
            onChange={(e) => setAsetInvestasi(e.target.value)}
            placeholder="Contoh: 15000000"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Aset Lainnya (Rp):</label>
          <input
            type="number"
            value={asetLainnya}
            onChange={(e) => setAsetLainnya(e.target.value)}
            placeholder="Contoh: 2000000"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Hutang Jatuh Tempo (Rp):</label>
          <input
            type="number"
            value={hutangJatuhTempo}
            onChange={(e) => setHutangJatuhTempo(e.target.value)}
            placeholder="Contoh: 5000000"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "4px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#3c40d0",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Hitung Zakat
        </button>
      </form>

      {zakat !== null && (
        <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#f2f1ff", borderLeft: "5px solid #3c40d0", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "8px", color: "#3c40d0" }}>Hasil Perhitungan:</h3>
          {zakat > 0 ? (
            <p>💰 Zakat yang harus dibayarkan: <strong>Rp {zakat.toLocaleString()}</strong></p>
          ) : (
            <p>✅ Harta kamu belum mencapai nisab, belum wajib zakat.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ZakatMal;
