import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCatatanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jumlah, setJumlah] = useState('');
  const [tipe, setTipe] = useState('pemasukan');
  const [catatan, setCatatan] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchKategori();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/pencatatan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.data;
      if (data) {
        setJumlah(data.jumlah);
        setTipe(data.tipe);
        setCatatan(data.catatan);
        setKategoriId(data.kategori_id);
      }
    } catch (error) {
      console.error('Gagal memuat data catatan:', error);
      alert('Gagal memuat data catatan. Pastikan ID valid atau coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const fetchKategori = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/kategori', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setKategoriList(data || []);
    } catch (error) {
      console.error('Gagal memuat kategori:', error);
      setKategoriList([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/pencatatan/${id}`,
        {
          jumlah: Number(jumlah),
          tipe,
          catatan,
          kategori_id: kategoriId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Catatan berhasil diperbarui.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Gagal mengedit catatan:', error);
      alert('Terjadi kesalahan saat mengedit catatan.');
    }
  };

  const normalize = (str) => str.toLowerCase().replace(/k/g, '');

  const filteredKategori = kategoriList.filter(
    (kat) => normalize(kat.tipe) === normalize(tipe)
  );

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>✏️ Edit Catatan</h2>

      {loading ? (
        <p>🔄 Memuat data catatan...</p>
      ) : (
        <div style={cardStyle}>
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Jumlah</label>
              <input
                type="number"
                min="0"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Tipe</label>
              <select
                value={tipe}
                onChange={(e) => {
                  setTipe(e.target.value);
                  setKategoriId('');
                }}
                style={inputStyle}
                required
              >
                <option value="pemasukan">Pemasukan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Catatan</label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Kategori</label>
              <select
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
                style={inputStyle}
                required
              >
                <option value="">-- Pilih Kategori --</option>
                {filteredKategori.map((kat) => (
                  <option key={kat.id} value={kat.id}>
                    {kat.nama}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button type="submit" style={submitButtonStyle}>
                💾 Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// 🎨 Styling
const cardStyle = {
  background: '#fff',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const formGroupStyle = {
  marginBottom: '16px',
};

const labelStyle = {
  marginBottom: '8px',
  display: 'block',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '14px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default EditCatatanPage;
