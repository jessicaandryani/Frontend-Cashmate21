import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IlustrasiTambah from '../assets/damn.png';

const TambahCatatanPage = () => {
  const [jumlah, setJumlah] = useState('');
  const [tipe, setTipe] = useState('pemasukan');
  const [catatan, setCatatan] = useState('');
  const [kategoriList, setKategoriList] = useState([]);
  const [selectedKategoriId, setSelectedKategoriId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKategori = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token tidak ditemukan. Silakan login ulang.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/kategori', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('🔍 Respon API kategori:', res.data);
        setKategoriList(res.data.data || []);
      } catch (error) {
        console.error('❌ Error ambil kategori:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKategori();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token tidak ditemukan. Silakan login ulang.');
      return;
    }

    if (!jumlah || Number(jumlah) <= 0 || !selectedKategoriId) {
      return alert('Mohon isi jumlah yang valid dan pilih kategori.');
    }

    try {
      await axios.post(
        'http://localhost:3000/pencatatan',
        {
          jumlah: Number(jumlah),
          tipe,
          kategori: selectedKategoriId,
          catatan,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Catatan berhasil ditambahkan!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Gagal menambahkan catatan:', error);
      alert('Gagal menambahkan catatan!');
    }
  };

  // Fungsi untuk menormalkan string tipe supaya typo "Pemasukkan" tetap cocok
  const normalize = (str) => str.toLowerCase().replace(/k/g, '');

  const filteredKategori = kategoriList.filter(
    (k) => normalize(k.tipe) === normalize(tipe)
  );

  return (
    <div style={{ padding: '30px 40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      {/* Form Tambah Catatan */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2 style={{ marginBottom: '20px' }}>➕ Tambah Catatan Baru</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <div style={formGroup}>
            <label>Jumlah (Rp)</label>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              required
              min="1"
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label>Tipe</label>
            <select
              value={tipe}
              onChange={(e) => {
                setTipe(e.target.value);
                setSelectedKategoriId('');
              }}
              style={inputStyle}
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>

          <div style={formGroup}>
            <label>Kategori</label>
            <select
              value={selectedKategoriId}
              onChange={(e) => setSelectedKategoriId(e.target.value)}
              required
              style={inputStyle}
            >
              {loading ? (
                <option value="">Memuat kategori...</option>
              ) : (
                <>
                  <option value="">-- Pilih Kategori --</option>
                  {filteredKategori.map((kategori) => (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.nama}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div style={formGroup}>
            <label>Catatan (opsional)</label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              style={{ ...inputStyle, height: '80px' }}
            />
          </div>

          <button type="submit" style={submitButton}>
            Simpan Catatan
          </button>
        </form>
      </div>

      {/* Gambar Ilustrasi */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '300px',
        }}
      >
        <img
          src={IlustrasiTambah}
          alt="Ilustrasi Tambah Catatan"
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>
    </div>
  );
};

// 🔧 Styling
const formGroup = {
  marginBottom: '16px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '6px',
  fontSize: '15px',
};

const submitButton = {
  background: '#7a73d1',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
};

export default TambahCatatanPage;
