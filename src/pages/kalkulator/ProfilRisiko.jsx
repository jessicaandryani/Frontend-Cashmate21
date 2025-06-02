"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const questions = [
  {
    question: "1. Berapa usia kamu?",
    options: [
      { text: "🧓 > 60 tahun", value: 1 },
      { text: "👴 40–60 tahun", value: 2 },
      { text: "🧒 < 40 tahun", value: 3 },
    ],
  },
  {
    question: "2. Pengalaman kamu dalam investasi?",
    options: [
      { text: "❌ Tidak ada", value: 1 },
      { text: "🔰 Sedikit", value: 2 },
      { text: "📈 Banyak", value: 3 },
    ],
  },
  {
    question: "3. Seberapa siap kamu menerima kerugian jangka pendek?",
    options: [
      { text: "😰 Tidak siap", value: 1 },
      { text: "😐 Netral", value: 2 },
      { text: "😎 Siap", value: 3 },
    ],
  },
  {
    question: "4. Tujuan investasi kamu?",
    options: [
      { text: "💰 Aman dan stabil", value: 1 },
      { text: "📊 Pertumbuhan moderat", value: 2 },
      { text: "🚀 Agresif", value: 3 },
    ],
  },
  {
    question: "5. Berapa lama kamu ingin berinvestasi?",
    options: [
      { text: "🕐 < 1 tahun", value: 1 },
      { text: "🕓 1–5 tahun", value: 2 },
      { text: "⏳ > 5 tahun", value: 3 },
    ],
  },
]

const ProfilRisikoCalculator = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [result, setResult] = useState(null)

  const handleChange = (value) => {
    const updated = [...answers]
    updated[currentQuestion] = value
    setAnswers(updated)

    // Auto-advance to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSubmit = () => {
    const isComplete = answers.every((ans) => ans !== null)
    if (!isComplete) return alert("Isi semua pertanyaan terlebih dahulu!")

    const score = answers.reduce((acc, curr) => acc + curr, 0)
    let profileData = {}

    if (score <= 6) {
      profileData = {
        type: "Konservatif",
        icon: "🐢",
        description:
          "Kamu cenderung menghindari risiko. Cocok dengan investasi yang stabil dan aman seperti deposito, emas, atau reksa dana pasar uang. Fokusmu lebih ke menjaga nilai uang daripada mengejar keuntungan besar.",
        recommendations: ["Deposito", "Emas", "Reksa Dana Pasar Uang", "Obligasi Pemerintah"],
        allocation: { saham: 20, obligasi: 50, deposito: 30 },
        color: "linear-gradient(135deg, #10b981, #059669)",
        tips: [
          "Prioritaskan keamanan modal",
          "Pilih investasi dengan risiko rendah",
          "Diversifikasi di instrumen yang stabil",
          "Hindari investasi spekulatif",
        ],
      }
    } else if (score <= 10) {
      profileData = {
        type: "Moderat",
        icon: "🦉",
        description:
          "Kamu siap menghadapi risiko moderat untuk mendapat hasil yang lebih baik. Cocok berinvestasi di reksa dana campuran atau obligasi jangka menengah. Pendekatanmu seimbang antara keamanan dan pertumbuhan.",
        recommendations: ["Reksa Dana Campuran", "Obligasi Korporasi", "Saham Blue Chip", "ETF"],
        allocation: { saham: 50, obligasi: 35, deposito: 15 },
        color: "linear-gradient(135deg, #f59e0b, #d97706)",
        tips: [
          "Seimbangkan risiko dan return",
          "Diversifikasi portofolio",
          "Review berkala setiap 6 bulan",
          "Pertimbangkan reksa dana campuran",
        ],
      }
    } else {
      profileData = {
        type: "Agresif",
        icon: "🚀",
        description:
          "Kamu siap ambil risiko besar demi potensi keuntungan maksimal. Cocok berinvestasi di saham, crypto, atau reksa dana saham. Namun, pastikan kamu tetap punya dana darurat dan strategi cadangan.",
        recommendations: ["Saham Growth", "Reksa Dana Saham", "Cryptocurrency", "P2P Lending"],
        allocation: { saham: 70, obligasi: 20, deposito: 10 },
        color: "linear-gradient(135deg, #dc2626, #b91c1c)",
        tips: [
          "Siap menghadapi volatilitas tinggi",
          "Fokus pada pertumbuhan jangka panjang",
          "Tetap miliki dana darurat",
          "Pelajari analisis fundamental",
        ],
      }
    }

    setResult({ ...profileData, score })
  }

  const getProgressPercentage = () => {
    const answeredQuestions = answers.filter((ans) => ans !== null).length
    return (answeredQuestions / questions.length) * 100
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
              background: "linear-gradient(135deg, #3c40d0, #6b5fc6)",
              borderRadius: "16px",
              padding: "24px",
              color: "white",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0" }}>Tes Profil Risiko Investasi</h1>
            <p style={{ margin: "0", opacity: "0.9" }}>
              Jawab 5 pertanyaan untuk mengetahui profil risiko investasi yang sesuai dengan kepribadian kamu
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            background: "#e2e8f0",
            borderRadius: "12px",
            height: "8px",
            marginBottom: "32px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #3c40d0, #6b5fc6)",
              height: "100%",
              width: `${getProgressPercentage()}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Questions */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1900a5", margin: 0 }}>
                Pertanyaan {currentQuestion + 1} dari {questions.length}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                <span>
                  {answers.filter((a) => a !== null).length}/{questions.length} dijawab
                </span>
              </div>
            </div>

            {/* Current Question */}
            <div>
              <p
                style={{
                  fontWeight: "600",
                  marginBottom: "20px",
                  color: "#374151",
                  fontSize: "18px",
                }}
              >
                {questions[currentQuestion].question}
              </p>
              <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
                {questions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      border: "2px solid",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      backgroundColor: answers[currentQuestion] === opt.value ? "#6b5fc6" : "#f8fafc",
                      color: answers[currentQuestion] === opt.value ? "white" : "#3c40d0",
                      borderColor: answers[currentQuestion] === opt.value ? "#594bb5" : "#e2e8f0",
                      textAlign: "left",
                      fontWeight: answers[currentQuestion] === opt.value ? "600" : "500",
                    }}
                    onClick={() => handleChange(opt.value)}
                    onMouseEnter={(e) => {
                      if (answers[currentQuestion] !== opt.value) {
                        e.target.style.backgroundColor = "#f1f5f9"
                        e.target.style.borderColor = "#6b5fc6"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (answers[currentQuestion] !== opt.value) {
                        e.target.style.backgroundColor = "#f8fafc"
                        e.target.style.borderColor = "#e2e8f0"
                      }
                    }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    background: "white",
                    color: currentQuestion === 0 ? "#94a3b8" : "#3c40d0",
                    fontWeight: "600",
                    cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                    flex: "1",
                    fontSize: "14px",
                  }}
                >
                  ← Sebelumnya
                </button>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "8px",
                      border: "none",
                      background: "linear-gradient(135deg, #3c40d0, #6b5fc6)",
                      color: "white",
                      fontWeight: "600",
                      cursor: "pointer",
                      flex: "1",
                      fontSize: "14px",
                    }}
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!answers.every((ans) => ans !== null)}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "8px",
                      border: "none",
                      background: answers.every((ans) => ans !== null)
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : "#e2e8f0",
                      color: answers.every((ans) => ans !== null) ? "white" : "#94a3b8",
                      fontWeight: "600",
                      cursor: answers.every((ans) => ans !== null) ? "pointer" : "not-allowed",
                      flex: "1",
                      fontSize: "14px",
                    }}
                  >
                    Lihat Hasil
                  </button>
                )}
              </div>
            </div>

            {/* Question Indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    background:
                      currentQuestion === index
                        ? "#3c40d0"
                        : answers[index] !== null
                          ? "rgba(60, 64, 208, 0.4)"
                          : "#e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  aria-label={`Go to question ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Result */}
          <div>
            {result ? (
              <div>
                <div
                  style={{
                    background: result.color,
                    borderRadius: "16px",
                    padding: "32px",
                    color: "white",
                    textAlign: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ fontSize: "64px", marginBottom: "16px" }}>{result.icon}</div>
                  <h3 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 16px 0" }}>
                    Profil Risiko: {result.type}
                  </h3>
                  <p style={{ fontSize: "16px", margin: "0", opacity: "0.9", lineHeight: "1.6" }}>
                    {result.description}
                  </p>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      padding: "12px",
                      marginTop: "16px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>Skor Anda: {result.score}/15</span>
                  </div>
                </div>

                {/* Allocation */}
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
                    💼 Rekomendasi Alokasi
                  </h4>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {Object.entries(result.allocation).map(([asset, percentage]) => (
                      <div key={asset} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{ minWidth: "80px", fontSize: "14px", fontWeight: "500", textTransform: "capitalize" }}
                        >
                          {asset === "saham" ? "📈 Saham" : asset === "obligasi" ? "📊 Obligasi" : "🏦 Deposito"}
                        </div>
                        <div
                          style={{
                            flex: "1",
                            background: "#f3f4f6",
                            borderRadius: "6px",
                            height: "20px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              background: result.color,
                              height: "100%",
                              width: `${percentage}%`,
                              borderRadius: "6px",
                              transition: "width 1s ease",
                            }}
                          />
                        </div>
                        <div style={{ minWidth: "40px", fontSize: "14px", fontWeight: "bold" }}>{percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
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
                    💡 Rekomendasi Investasi
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                    {result.recommendations.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          textAlign: "center",
                          border: "1px solid #e2e8f0",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#1900a5" }}>
                    🎯 Tips untuk Profil {result.type}
                  </h4>
                  <ul style={{ margin: "0", paddingLeft: "20px", color: "#4b5563", lineHeight: "1.6" }}>
                    {result.tips.map((tip, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
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
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤔</div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px", color: "#1900a5" }}>
                  Hasil Profil Risiko
                </h3>
                <p style={{ fontSize: "16px", color: "#64748b", margin: "0" }}>
                  Jawab semua pertanyaan di sebelah kiri untuk mengetahui profil risiko investasi kamu
                </p>
                <div style={{ marginTop: "16px", fontSize: "14px", color: "#94a3b8" }}>
                  Progress: {answers.filter((ans) => ans !== null).length}/{questions.length} pertanyaan
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilRisikoCalculator
