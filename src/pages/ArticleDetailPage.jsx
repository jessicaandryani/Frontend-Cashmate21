// File: src/pages/ArticleDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Untuk mendapatkan ID dari URL
import axios from 'axios'; // Untuk memanggil API

function ArticleDetailPage() {
  // Mengambil ID artikel dari parameter URL
  const { id } = useParams();
  // State untuk menyimpan detail artikel
  const [article, setArticle] = useState(null);
  // State untuk menangani status loading
  const [loading, setLoading] = useState(true);
  // State untuk menangani error
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiKey = import.meta.env.VITE_INTERNAL_API_KEY;
        const response = await axios.get(`http://localhost:3000/api/articles/${id}`, {
          headers: {
            'Authorization': apiKey,
          },
        });
        setArticle(response.data.data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Gagal memuat detail artikel.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Tampilan loading
  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100"><p className="text-xl text-gray-700">Memuat artikel...</p></div>;
  }

  // Tampilan error
  if (error) {
    return <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 p-4 rounded-lg shadow-md"><p className="text-xl">{error}</p></div>;
  }

  // Tampilan detail artikel jika data berhasil dimuat
  if (article) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{article.title}</h1>
          <p className="text-gray-700 leading-relaxed">{article.content}</p>
          {/* Anda bisa menambahkan tombol "Kembali" atau elemen UI lainnya di sini */}
        </div>
      </div>
    );
  }

  // Jika state article masih null (mungkin karena ID tidak valid)
  return <div className="flex justify-center items-center h-screen bg-gray-100"><p className="text-xl text-gray-700">Artikel tidak ditemukan.</p></div>;
}

export default ArticleDetailPage;