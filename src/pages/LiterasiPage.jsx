// File: src/pages/LiterasiPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const LiterasiPage = () => {
  const [showBot, setShowBot] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBot(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const apiKey = 'cashmate_react_internal_secret_123xyz';
        const response = await axios.get('http://localhost:3000/api/articles', {
          headers: {
            'Authorization': apiKey,
          },
        });
        setArticles(response.data.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Gagal memuat artikel. Pastikan server backend AdonisJS berjalan di http://localhost:3000 dan konfigurasi CORS sudah benar.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", padding: "20px" }}>
      {/* Judul dan deskripsi chatbot yang sekarang berada di atas chatbot */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#3c40d0", marginBottom: "10px" }}>
        Literasi CashMate 🤖
      </h1>
      <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>
        Ketik pertanyaan seputar aplikasi atau tips manajemen keuangan
      </p>

      {/* Chatbot ditampilkan setelah judul */}
      <div
        style={{
          width: "100%",
          height: "700px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "40px", // beri jarak ke artikel
        }}
      >
        {showBot && (
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/tt2-wJsiH5PzpEbqazatH"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="CashMate Literasi Bot"
            allow="clipboard-write"
          ></iframe>
        )}
      </div>

      {/* Artikel edukasi dipindahkan ke bawah chatbot */}
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#3c40d0", marginBottom: "15px" }}>
          Artikel Edukasi Keuangan
        </h2>
        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Memuat artikel...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : articles.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>Belum ada artikel yang tersedia.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {articles.map(article => (
              <li
                key={article.id}
                style={{
                  backgroundColor: "#e6f7ff",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9edf7'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
              >
                <Link
                  to={`/literasi/${article.id}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0056b3" }}>
                    {article.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LiterasiPage;
