import React, { useState } from "react";

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
];

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "white",
    color: "#333",
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#3c40d0",
    marginBottom: "24px",
  },
  questionBox: {
    marginBottom: "24px",
  },
  question: {
    fontWeight: "500",
    marginBottom: "8px",
  },
  options: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  optionButton: (active) => ({
    padding: "8px 16px",
    borderRadius: "12px",
    border: "1px solid",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backgroundColor: active ? "#6b5fc6" : "#f0ecfa",
    color: active ? "white" : "#3c40d0",
    borderColor: active ? "#594bb5" : "#bba3dc",
    boxShadow: active ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
    transform: active ? "scale(1.05)" : "scale(1)",
  }),
  submitButton: {
    backgroundColor: "#3c40d0",
    color: "white",
    fontWeight: "600",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "16px",
  },
  resultBox: {
    marginTop: "32px",
    padding: "24px",
    backgroundColor: "#f2f1ff",
    borderLeft: "4px solid #3c40d0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  resultTitle: {
    fontWeight: "600",
    fontSize: "18px",
    color: "#3c40d0",
    marginBottom: "12px",
  },
  resultText: {
    whiteSpace: "pre-line",
    lineHeight: "1.6",
  },
};

const ProfilRisiko = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);

  const handleChange = (questionIndex, value) => {
    const updated = [...answers];
    updated[questionIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const isComplete = answers.every((ans) => ans !== null);
    if (!isComplete) return alert("Isi semua pertanyaan terlebih dahulu!");

    const score = answers.reduce((acc, curr) => acc + curr, 0);
    if (score <= 6) {
      setResult(
        "🐢 Konservatif\nKamu cenderung menghindari risiko. Cocok dengan investasi yang stabil dan aman seperti deposito, emas, atau reksa dana pasar uang. Fokusmu lebih ke menjaga nilai uang daripada mengejar keuntungan besar."
      );
    } else if (score <= 10) {
      setResult(
        "🦉 Moderat\nKamu siap menghadapi risiko moderat untuk mendapat hasil yang lebih baik. Cocok berinvestasi di reksa dana campuran atau obligasi jangka menengah. Pendekatanmu seimbang antara keamanan dan pertumbuhan."
      );
    } else {
      setResult(
        "🚀 Agresif\nKamu siap ambil risiko besar demi potensi keuntungan maksimal. Cocok berinvestasi di saham, crypto, atau reksa dana saham. Namun, pastikan kamu tetap punya dana darurat dan strategi cadangan."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tes Profil Risiko Investasi 💡</h1>

      {questions.map((q, index) => (
        <div key={index} style={styles.questionBox}>
          <p style={styles.question}>{q.question}</p>
          <div style={styles.options}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                style={styles.optionButton(answers[index] === opt.value)}
                onClick={() => handleChange(index, opt.value)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} style={styles.submitButton}>
        🎯 Lihat Hasil
      </button>

      {result && (
        <div style={styles.resultBox}>
          <h2 style={styles.resultTitle}>Profil Risiko Kamu:</h2>
          <p style={styles.resultText}>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilRisiko;
