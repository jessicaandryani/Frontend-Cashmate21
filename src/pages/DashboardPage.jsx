import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../components/ModalConfirm';

const DashboardPage = () => {
  const [pencatatan, setPencatatan] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/pencatatan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setPencatatan(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/pencatatan/${itemToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlertMessage('✅ Catatan berhasil dihapus!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus catatan:', error);
      setAlertMessage('❌ Gagal menghapus catatan.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-catatan/${id}`);
  };

  const filteredData = selectedMonth
    ? pencatatan.filter(item => {
        const itemDate = new Date(item.createdAt);
        const monthYear = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}`;
        return monthYear === selectedMonth;
      })
    : pencatatan;

  const totalPemasukan = filteredData
    .filter(item => item.tipe === 'pemasukan')
    .reduce((sum, item) => sum + item.jumlah, 0);

  const totalPengeluaran = filteredData
    .filter(item => item.tipe === 'pengeluaran')
    .reduce((sum, item) => sum + item.jumlah, 0);

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  return (
    <div style={{ padding: '30px 40px' }}>
      {/* ✅ Filter Bulan */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>📅 Filter Bulan:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: '6px 10px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* ✅ Ringkasan */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={cardStyle('#c0b0d2')}>
          <h3 style={{ marginBottom: '10px' }}>💰 Total Pemasukan</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Rp {totalPemasukan.toLocaleString()}
          </p>
        </div>
        <div style={cardStyle('#6d6ecf')}>
          <h3 style={{ marginBottom: '10px' }}>💸 Total Pengeluaran</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Rp {totalPengeluaran.toLocaleString()}
          </p>
        </div>
        <div style={cardStyle('#e9e4f0')}>
          <h3 style={{ marginBottom: '10px' }}>📊 Saldo Akhir</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Rp {saldoAkhir.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ✅ Daftar Catatan */}
      <div>
        <h2 style={{ marginBottom: '20px', fontWeight: 'bold' }}>📒 Catatan Terbaru</h2>

        {filteredData.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#777', fontSize: '16px' }}>
            Tidak ada catatan di bulan ini. Yuk tambah catatan baru!
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredData
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item, index) => (
                <li key={index} style={listItemStyle(item.tipe)}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    {item.tipe === 'pemasukan' ? '⬆️' : '⬇️'} {item.tipe.toUpperCase()} - Rp {item.jumlah.toLocaleString()}
                  </div>
                  <div style={{ color: 'white', marginTop: '4px' }}>
                    {item.catatan || 'Tidak ada catatan'}
                  </div>
                  <div style={{ color: 'white', fontSize: '14px', marginTop: '4px' }}>
                    Kategori: {item.kategori?.nama || 'Tanpa kategori'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'white', marginTop: '4px' }}>
                    {new Date(item.createdAt).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(item.id)} style={editButtonStyle}>📝 Edit</button>
                    <button onClick={() => confirmDelete(item.id)} style={deleteButtonStyle}>🗑️ Hapus</button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* 🔘 Floating Button */}
      <button
        onClick={() => navigate('/tambah-catatan')}
        style={floatingButtonStyle}
      >
        ➕
      </button>

      {/* 🔔 Alert */}
      {showAlert && (
        <div style={alertOverlayStyle}>
          <div style={alertBoxStyle}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{alertMessage}</p>
          </div>
        </div>
      )}

      {/* 🔒 Modal Konfirmasi Hapus */}
      {showModal && (
        <ModalConfirm
          title="Konfirmasi Hapus"
          message="Yakin ingin menghapus catatan ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowModal(false);
            setItemToDelete(null);
          }}
        />
      )}
    </div>
  );
};

// ✅ Styling
const colors = {
  darkBlue: '#0c0786',
  primaryBlue: '#3b3fcf',
  midPurple: '#6d6ecf',
  white: '#ffffff',
  softLavender: '#e9e4f0',
  pastelPurple: '#c0b0d2',
};

const cardStyle = (bgColor) => ({
  background: bgColor,
  color: '#000000',
  padding: '25px 30px',
  borderRadius: '12px',
  flex: 1,
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
});

const listItemStyle = (tipe) => ({
  background: tipe === 'pemasukan' ? '#c0b0d2' : '#6d6ecf',
  borderLeft: `6px solid ${tipe === 'pemasukan' ? colors.primaryBlue : '#e9e4f0'}`,
  padding: '15px 20px',
  marginBottom: '12px',
  borderRadius: '10px',
});

const editButtonStyle = {
  background: colors.white,
  border: 'none',
  color: '#333',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  background: 'black',
  border: 'none',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
};

const floatingButtonStyle = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  background: colors.primaryBlue,
  color: 'white',
  fontSize: '28px',
  padding: '14px 20px',
  borderRadius: '50%',
  border: 'none',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  cursor: 'pointer',
};

const alertOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
};

const alertBoxStyle = {
  backgroundColor: colors.white,
  padding: '20px 30px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
  fontSize: '16px',
  color: '#333',
  textAlign: 'center',
};

export default DashboardPage;
