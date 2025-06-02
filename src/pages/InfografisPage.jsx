"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const palette = {
  primary: "#1e40af",
  secondary: "#3b82f6",
  accent: "#ef4444",
  success: "#10b981",
  warning: "#f59e0b",
  light: "#f1f5f9",
  dark: "#0f172a",
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#1e293b",
    lineHeight: "1.6",
  },
  header: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)",
    color: "white",
    textAlign: "center",
    padding: "4rem 1rem",
  },
  badge: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#1e40af",
    padding: "0.5rem 1rem",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  mainTitle: {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    fontWeight: "700",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
    color: "#bfdbfe",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.5",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 1rem",
  },
  section: {
    marginBottom: "4rem",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1rem",
  },
  sectionDescription: {
    fontSize: "1.125rem",
    color: "#475569",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.7",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  statCard: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  redAccent: {
    borderLeft: "4px solid #ef4444",
  },
  greenAccent: {
    borderLeft: "4px solid #10b981",
  },
  statHeader: {
    padding: "1.5rem 1.5rem 0",
  },
  statTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  statContent: {
    padding: "1rem 1.5rem 1.5rem",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "clamp(3rem, 8vw, 4.5rem)",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  statNumberRed: {
    color: "#dc2626",
  },
  statNumberGreen: {
    color: "#059669",
  },
  statText: {
    color: "#64748b",
    lineHeight: "1.6",
  },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  chartCard: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  chartHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #e2e8f0",
  },
  chartTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "0.5rem",
  },
  chartDescription: {
    fontSize: "0.875rem",
    color: "#64748b",
  },
  chartContent: {
    padding: "1.5rem",
  },
  chartContainer: {
    height: "16rem",
    position: "relative",
  },
  chartContainerLarge: {
    height: "20rem",
    position: "relative",
  },
  tableCard: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  tableHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #e2e8f0",
  },
  tableTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  tableDescription: {
    fontSize: "0.875rem",
    color: "#64748b",
    textAlign: "center",
  },
  tableContent: {
    padding: "1.5rem",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  dataTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderCell: {
    background: "#f1f5f9",
    padding: "0.75rem 1rem",
    textAlign: "left",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #e2e8f0",
  },
  tableHeaderCellCenter: {
    background: "#f1f5f9",
    padding: "0.75rem 1rem",
    textAlign: "center",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #e2e8f0",
  },
  tableCell: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #f1f5f9",
  },
  tableCellCenter: {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid #f1f5f9",
    textAlign: "center",
  },
  categoryHeader: {
    background: "#dbeafe",
    fontWeight: "600",
    color: "#1e40af",
    padding: "0.5rem 1rem",
  },
  altRow: {
    background: "#f8fafc",
  },
  highlightGreen: {
    fontWeight: "600",
    color: "#059669",
  },
  highlightRed: {
    fontWeight: "600",
    color: "#dc2626",
  },
  problemGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  problemCard: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  redBorder: {
    borderLeft: "4px solid #ef4444",
  },
  orangeBorder: {
    borderLeft: "4px solid #f59e0b",
  },
  blueBorder: {
    borderLeft: "4px solid #3b82f6",
  },
  problemHeader: {
    padding: "1.5rem 1.5rem 0",
  },
  problemTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  problemContent: {
    padding: "1rem 1.5rem 1.5rem",
  },
  problemText: {
    color: "#64748b",
    lineHeight: "1.6",
  },
  impactHighlight: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    borderLeft: "4px solid #ef4444",
    marginBottom: "2rem",
    overflow: "hidden",
  },
  impactHeader: {
    padding: "1.5rem 1.5rem 0",
    textAlign: "center",
  },
  impactTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  impactContent: {
    padding: "1rem 1.5rem 1.5rem",
    textAlign: "center",
  },
  impactNumber: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "700",
    color: "#b91c1c",
    marginBottom: "1rem",
  },
  impactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  impactCard: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    textAlign: "center",
  },
  impactIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  impactCardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "0.5rem",
  },
  impactCardText: {
    fontSize: "0.875rem",
    color: "#64748b",
    lineHeight: "1.6",
  },
  strategyCard: {
    background: "white",
    borderRadius: "1rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  strategyHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #e2e8f0",
  },
  strategyTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
  },
  strategyContent: {
    padding: "1.5rem",
  },
  pyramid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  pyramidLevel: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    padding: "1rem",
    borderRadius: "0.5rem",
    transition: "transform 0.3s ease",
  },
  level1: {
    background: "#1e293b",
    width: "100%",
    maxWidth: "200px",
    fontSize: "0.875rem",
  },
  level2: {
    background: "#475569",
    width: "100%",
    maxWidth: "350px",
  },
  level3: {
    background: "#64748b",
    width: "100%",
    maxWidth: "500px",
  },
  level4: {
    background: "#cbd5e1",
    color: "#1e293b",
    width: "100%",
    fontSize: "1.125rem",
  },
  strategyDescription: {
    fontSize: "0.875rem",
    color: "#64748b",
    textAlign: "center",
    lineHeight: "1.6",
  },
  footer: {
    background: "#1e293b",
    color: "white",
    textAlign: "center",
    padding: "2rem 1rem",
  },
  footerMain: {
    color: "#cbd5e1",
    marginBottom: "0.5rem",
  },
  footerSub: {
    color: "#94a3b8",
    fontSize: "0.875rem",
  },
}

const InfografisPage = () => {
  const syariahChartRef = useRef(null)
  const wilayahChartRef = useRef(null)
  const kategoriLiterasiChartRef = useRef(null)

  useEffect(() => {
    let syariahChartInstance = null
    let wilayahChartInstance = null
    let kategoriLiterasiChartInstance = null

    // Chart 1: Syariah vs Konvensional
    if (syariahChartRef.current) {
      const syariahCtx = syariahChartRef.current.getContext("2d")
      if (syariahCtx) {
        syariahChartInstance = new Chart(syariahCtx, {
          type: "bar",
          data: {
            labels: ["Literasi Konvensional", "Literasi Syariah"],
            datasets: [
              {
                label: "Indeks Literasi (%)",
                data: [66.45, 43.42],
                backgroundColor: [palette.primary, palette.accent],
                borderColor: [palette.primary, palette.accent],
                borderWidth: 2,
                borderRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            scales: {
              x: {
                beginAtZero: true,
                max: 100,
                grid: { color: "#e2e8f0" },
                ticks: { font: { size: 12 } },
              },
              y: {
                grid: { display: false },
                ticks: { font: { size: 12 } },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "white",
                bodyColor: "white",
                borderColor: palette.primary,
                borderWidth: 1,
              },
            },
          },
        })
      }
    }

    // Chart 2: Urban vs Rural
    if (wilayahChartRef.current) {
      const wilayahCtx = wilayahChartRef.current.getContext("2d")
      if (wilayahCtx) {
        wilayahChartInstance = new Chart(wilayahCtx, {
          type: "bar",
          data: {
            labels: ["Perkotaan", "Perdesaan"],
            datasets: [
              {
                label: "Indeks Literasi (%)",
                data: [71.0, 59.87],
                backgroundColor: [palette.success, palette.warning],
                borderColor: [palette.success, palette.warning],
                borderWidth: 2,
                borderRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: { color: "#e2e8f0" },
                ticks: { font: { size: 12 } },
              },
              x: {
                grid: { display: false },
                ticks: { font: { size: 12 } },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "white",
                bodyColor: "white",
                borderColor: palette.primary,
                borderWidth: 1,
              },
            },
          },
        })
      }
    }

    // Chart 3: Kategori Literasi
    if (kategoriLiterasiChartRef.current) {
      const kategoriLiterasiCtx = kategoriLiterasiChartRef.current.getContext("2d")
      if (kategoriLiterasiCtx) {
        kategoriLiterasiChartInstance = new Chart(kategoriLiterasiCtx, {
          type: "doughnut",
          data: {
            labels: ["Well Literate", "Sufficient Literate", "Less Literate", "Not Literate"],
            datasets: [
              {
                label: "Distribusi Pemahaman",
                data: [15, 35, 40, 10],
                backgroundColor: [palette.success, palette.secondary, palette.warning, palette.accent],
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 15,
                  padding: 15,
                  font: { size: 11 },
                  usePointStyle: true,
                },
              },
              tooltip: {
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "white",
                bodyColor: "white",
                borderColor: palette.primary,
                borderWidth: 1,
              },
            },
            cutout: "65%",
          },
        })
      }
    }

    return () => {
      if (syariahChartInstance) syariahChartInstance.destroy()
      if (wilayahChartInstance) wilayahChartInstance.destroy()
      if (kategoriLiterasiChartInstance) kategoriLiterasiChartInstance.destroy()
    }
  }, [])

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <div style={styles.badge}>SNLIK 2025</div>
          <h1 style={styles.mainTitle}>Kesenjangan Literasi Keuangan</h1>
          <p style={styles.subtitle}>
            Membedah Angka, Mengungkap Tantangan, dan Meretas Jalan Menuju Kesejahteraan Finansial Indonesia
          </p>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* Gambaran Umum */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Potret Finansial Indonesia 2025</h2>
            <p style={styles.sectionDescription}>
              Survei Nasional Literasi dan Inklusi Keuangan (SNLIK) 2025 menunjukkan gambaran yang kontras. Sementara
              akses masyarakat terhadap produk keuangan (inklusi) melonjak, pemahaman (literasi) mereka untuk
              menggunakannya secara bijak masih tertinggal.
            </p>
          </div>

          <div style={styles.statsGrid}>
            <div style={{ ...styles.statCard, ...styles.redAccent }}>
              <div style={styles.statHeader}>
                <h3 style={styles.statTitle}>📉 Indeks Literasi Keuangan</h3>
              </div>
              <div style={styles.statContent}>
                <div style={{ ...styles.statNumber, ...styles.statNumberRed }}>66,46%</div>
                <p style={styles.statText}>
                  Hanya 2 dari 3 orang Indonesia yang memiliki pengetahuan dan keterampilan finansial yang memadai untuk
                  membuat keputusan keuangan yang tepat.
                </p>
              </div>
            </div>

            <div style={{ ...styles.statCard, ...styles.greenAccent }}>
              <div style={styles.statHeader}>
                <h3 style={styles.statTitle}>📈 Indeks Inklusi Keuangan</h3>
              </div>
              <div style={styles.statContent}>
                <div style={{ ...styles.statNumber, ...styles.statNumberGreen }}>80,51%</div>
                <p style={styles.statText}>
                  Sebanyak 4 dari 5 orang Indonesia sudah memiliki akses ke produk dan layanan dari lembaga keuangan
                  formal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kesenjangan */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Menggali Kesenjangan Lebih Dalam</h2>
            <p style={styles.sectionDescription}>
              Angka nasional menyembunyikan disparitas yang signifikan antar sektor, wilayah, dan tingkat pemahaman
              masyarakat.
            </p>
          </div>

          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Literasi: Konvensional vs. Syariah</h3>
                <p style={styles.chartDescription}>
                  Terdapat jurang pemahaman yang lebar antara keuangan konvensional dan syariah
                </p>
              </div>
              <div style={styles.chartContent}>
                <div style={styles.chartContainer}>
                  <canvas ref={syariahChartRef}></canvas>
                </div>
              </div>
            </div>

            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Literasi: Perkotaan vs. Perdesaan</h3>
                <p style={styles.chartDescription}>
                  Akses pendidikan dan layanan keuangan yang lebih baik di perkotaan menciptakan kesenjangan
                </p>
              </div>
              <div style={styles.chartContent}>
                <div style={styles.chartContainer}>
                  <canvas ref={wilayahChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.chartCard, ...styles.fullWidth }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Tingkatan Pemahaman Finansial</h3>
              <p style={styles.chartDescription}>
                Literasi bukan sekadar tahu atau tidak tahu. OJK mengkategorikannya ke dalam empat tingkatan
              </p>
            </div>
            <div style={styles.chartContent}>
              <div style={styles.chartContainerLarge}>
                <canvas ref={kategoriLiterasiChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Demografi */}
        <section style={styles.section}>
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>👥 Literasi Berdasarkan Demografi</h3>
              <p style={styles.tableDescription}>
                Faktor usia, gender, dan terutama pendidikan, memainkan peran krusial dalam menentukan tingkat literasi
              </p>
            </div>
            <div style={styles.tableContent}>
              <div style={styles.tableWrapper}>
                <table style={styles.dataTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeaderCell}>Kategori</th>
                      <th style={styles.tableHeaderCellCenter}>Indeks Literasi (%)</th>
                      <th style={styles.tableHeaderCellCenter}>Indeks Inklusi (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} style={styles.categoryHeader}>
                        Usia
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>18–25 tahun</td>
                      <td style={styles.tableCellCenter}>73.22</td>
                      <td style={styles.tableCellCenter}>89.96</td>
                    </tr>
                    <tr style={styles.altRow}>
                      <td style={styles.tableCell}>26–35 tahun</td>
                      <td style={{ ...styles.tableCellCenter, ...styles.highlightGreen }}>74.04</td>
                      <td style={styles.tableCellCenter}>86.10</td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>36–50 tahun</td>
                      <td style={styles.tableCellCenter}>72.05</td>
                      <td style={styles.tableCellCenter}>85.81</td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={styles.categoryHeader}>
                        Gender
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>Pria</td>
                      <td style={styles.tableCellCenter}>67.32</td>
                      <td style={styles.tableCellCenter}>80.73</td>
                    </tr>
                    <tr style={styles.altRow}>
                      <td style={styles.tableCell}>Perempuan</td>
                      <td style={styles.tableCellCenter}>65.58</td>
                      <td style={styles.tableCellCenter}>80.28</td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={styles.categoryHeader}>
                        Pendidikan
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>Lulusan Perguruan Tinggi</td>
                      <td style={{ ...styles.tableCellCenter, ...styles.highlightGreen }}>90.63</td>
                      <td style={{ ...styles.tableCellCenter, ...styles.highlightGreen }}>99.10</td>
                    </tr>
                    <tr style={styles.altRow}>
                      <td style={styles.tableCell}>Tanpa Pendidikan Formal</td>
                      <td style={{ ...styles.tableCellCenter, ...styles.highlightRed }}>43.20</td>
                      <td style={{ ...styles.tableCellCenter, ...styles.highlightRed }}>56.95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Akar Masalah */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Akar Masalah Rendahnya Literasi</h2>
            <p style={styles.sectionDescription}>
              Ini adalah masalah multifaset yang berakar pada sistem pendidikan, budaya, hingga kesenjangan struktural.
            </p>
          </div>

          <div style={styles.problemGrid}>
            <div style={{ ...styles.problemCard, ...styles.redBorder }}>
              <div style={styles.problemHeader}>
                <h4 style={styles.problemTitle}>🎓 Pendidikan Keuangan Minim</h4>
              </div>
              <div style={styles.problemContent}>
                <p style={styles.problemText}>
                  Kurikulum sekolah belum memadai dalam mengajarkan manajemen keuangan praktis seperti penganggaran,
                  menabung, dan investasi.
                </p>
              </div>
            </div>

            <div style={{ ...styles.problemCard, ...styles.orangeBorder }}>
              <div style={styles.problemHeader}>
                <h4 style={styles.problemTitle}>📉 Budaya Konsumtif</h4>
              </div>
              <div style={styles.problemContent}>
                <p style={styles.problemText}>
                  Prioritas pengeluaran lebih pada gaya hidup daripada menabung, diperparah oleh kemudahan transaksi
                  digital yang mendorong belanja impulsif.
                </p>
              </div>
            </div>

            <div style={{ ...styles.problemCard, ...styles.blueBorder }}>
              <div style={styles.problemHeader}>
                <h4 style={styles.problemTitle}>📍 Kesenjangan Akses</h4>
              </div>
              <div style={styles.problemContent}>
                <p style={styles.problemText}>
                  Terbatasnya akses pendidikan berkualitas, infrastruktur, dan internet di daerah terpencil menghambat
                  penyebaran informasi keuangan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dampak */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Efek Domino Literasi Rendah</h2>
            <p style={styles.sectionDescription}>
              Dampaknya terasa dari tingkat individu hingga kesehatan perekonomian nasional
            </p>
          </div>

          <div style={styles.impactHighlight}>
            <div style={styles.impactHeader}>
              <h3 style={styles.impactTitle}>⚠️ Kerentanan Terhadap Penipuan</h3>
            </div>
            <div style={styles.impactContent}>
              <div style={styles.impactNumber}>Rp 88,8 T</div>
              <p>Total Kerugian Masyarakat Akibat Investasi Bodong (2008-2018)</p>
            </div>
          </div>

          <div style={styles.impactGrid}>
            <div style={styles.impactCard}>
              <div style={styles.impactIcon}>💳</div>
              <h4 style={styles.impactCardTitle}>Terlilit Utang</h4>
              <p style={styles.impactCardText}>
                Kesulitan mengelola kredit dan terjebak dalam pinjaman berbunga tinggi.
              </p>
            </div>

            <div style={styles.impactCard}>
              <div style={styles.impactIcon}>📉</div>
              <h4 style={styles.impactCardTitle}>Rasio Menabung Rendah</h4>
              <p style={styles.impactCardText}>Kesulitan merencanakan masa depan dan membangun dana darurat.</p>
            </div>

            <div style={styles.impactCard}>
              <div style={styles.impactIcon}>🌍</div>
              <h4 style={styles.impactCardTitle}>Ketergantungan Asing</h4>
              <p style={styles.impactCardText}>
                Tabungan domestik rendah meningkatkan ketergantungan pada modal asing.
              </p>
            </div>
          </div>
        </section>

        {/* Rekomendasi */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Jalan Menuju Masyarakat Cakap Finansial</h2>
            <p style={styles.sectionDescription}>
              Untuk memutus siklus ini, diperlukan strategi yang terkoordinasi dan berkelanjutan dari berbagai pihak.
            </p>
          </div>

          <div style={styles.strategyCard}>
            <div style={styles.strategyHeader}>
              <h3 style={styles.strategyTitle}>Piramida Strategi Peningkatan</h3>
            </div>
            <div style={styles.strategyContent}>
              <div style={styles.pyramid}>
                <div style={{ ...styles.pyramidLevel, ...styles.level1 }}>
                  <p>Evaluasi Berbasis Data</p>
                </div>
                <div style={{ ...styles.pyramidLevel, ...styles.level2 }}>
                  <p>Kampanye & Kolaborasi Multi-Pihak</p>
                </div>
                <div style={{ ...styles.pyramidLevel, ...styles.level3 }}>
                  <p>Peningkatan Akses & Pemanfaatan Teknologi Aman</p>
                </div>
                <div style={{ ...styles.pyramidLevel, ...styles.level4 }}>
                  <p>Penguatan Pendidikan Keuangan Formal & Informal Sejak Dini</p>
                </div>
              </div>
              <p style={styles.strategyDescription}>
                Strategi yang efektif harus dibangun di atas fondasi pendidikan yang kuat, diperluas melalui akses
                teknologi yang aman, diperkuat oleh kolaborasi, dan terus disempurnakan melalui evaluasi berbasis data.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerMain}>
          Infografis berdasarkan Analisis Komprehensif Literasi Keuangan Masyarakat Indonesia.
        </p>
        <p style={styles.footerSub}>
          Data utama dari Survei Nasional Literasi dan Inklusi Keuangan (SNLIK) 2025 oleh OJK & BPS.
        </p>
      </footer>
    </div>
  )
}

export default InfografisPage
