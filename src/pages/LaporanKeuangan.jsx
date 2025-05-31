import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const LaporanKeuangan = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/pencatatan', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (err) {
        console.error('Gagal mengambil data catatan:', err);
      }
    };
    fetchData();
  }, []);

  const filterDataByMonth = (data, selectedMonth, startDate, endDate) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    return data.filter(item => {
      const itemDate = new Date(item.createdAt);
      const matchesMonth = itemDate.getFullYear() === year && (itemDate.getMonth() + 1) === month;
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      }
      return matchesMonth;
    });
  };

  const filteredData = filterDataByMonth(data, selectedMonth, startDate, endDate);
  const uniqueDates = [...new Set(filteredData.map(d => new Date(d.createdAt).toLocaleDateString()))];
  const kategoriSet = new Set(filteredData.map(d => d.kategori?.nama || 'Umum'));
  const kategoriArray = Array.from(kategoriSet);

  const generateDatasetByKategori = (tipe) => {
    return kategoriArray.map(kat => {
      const dataPerKategori = uniqueDates.map(date => {
        const total = filteredData
          .filter(d => d.tipe === tipe && (d.kategori?.nama || 'Umum') === kat && new Date(d.createdAt).toLocaleDateString() === date)
          .reduce((sum, cur) => sum + cur.jumlah, 0);
        return total;
      });

      return {
        label: `${tipe.charAt(0).toUpperCase() + tipe.slice(1)} - ${kat}`,
        data: dataPerKategori,
        backgroundColor: tipe === 'pemasukan' ? '#4bc0c0' : '#ff6384',
        borderColor: tipe === 'pemasukan' ? '#4bc0c0' : '#ff6384',
        fill: false,
        tension: 0.3,
      };
    });
  };

  const pieCategories = [...new Set(filteredData.map(d => d.kategori?.nama || 'Umum'))];
  const pieDataByKategori = pieCategories.map(kat =>
    filteredData
      .filter(d => (d.kategori?.nama || 'Umum') === kat)
      .reduce((sum, item) => sum + item.jumlah, 0)
  );

  const pieColors = [
    '#4bc0c0', '#ff6384', '#36a2eb', '#ffce56',
    '#9966ff', '#00a896', '#ff6f61', '#f67280',
    '#6c5ce7', '#fdcb6e', '#e17055', '#00b894',
  ];

  const chartConfigs = {
    bar: {
      labels: uniqueDates,
      datasets: [
        ...generateDatasetByKategori('pemasukan'),
        ...generateDatasetByKategori('pengeluaran'),
      ],
    },
    line: {
      labels: uniqueDates,
      datasets: [
        ...generateDatasetByKategori('pemasukan'),
        ...generateDatasetByKategori('pengeluaran'),
      ],
    },
    pie: {
      labels: pieCategories,
      datasets: [
        {
          label: 'Total per Kategori',
          data: pieDataByKategori,
          backgroundColor: pieColors.slice(0, pieCategories.length),
        },
      ],
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line': return <Line data={chartConfigs.line} />;
      case 'pie': return <Pie data={chartConfigs.pie} />;
      default: return <Bar data={chartConfigs.bar} />;
    }
  };

  const handleDownloadPDF = async () => {
    const chartContainer = document.getElementById('chart-section');
    const canvas = await html2canvas(chartContainer);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save('laporan-keuangan.pdf');
  };

  const handleDownloadExcel = () => {
    const rows = filteredData.map(item => ({
      Tanggal: new Date(item.createdAt).toLocaleDateString(),
      Tipe: item.tipe,
      Jumlah: item.jumlah,
      Kategori: item.kategori?.nama || 'Umum',
      Keterangan: item.catatan || '-',
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'laporan-keuangan.xlsx');
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <div style={{ padding: '30px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '25px', color: '#2d3436' }}>📊 Laporan Keuangan</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <label>
            📅 Pilih Bulan:
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={inputStyle} />
          </label>
          <label>
            📊 Jenis Grafik:
            <select value={chartType} onChange={(e) => setChartType(e.target.value)} style={inputStyle}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>
          </label>
          <label>
            📆 Dari Tanggal:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
          </label>
          <label>
            📆 Sampai Tanggal:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', flexWrap: 'wrap' }}>
          <button onClick={handleDownloadPDF} style={buttonStyle('#38b6b2')}>⬇️ Unduh PDF</button>
          <button onClick={handleDownloadExcel} style={buttonStyle('#6c5ce7')}>📄 Unduh Excel</button>
        </div>
        <div id="chart-section" style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  marginLeft: '10px',
  padding: '8px 12px',
  fontSize: '14px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  marginTop: '4px'
};

const buttonStyle = (bgColor) => ({
  padding: '10px 20px',
  backgroundColor: bgColor,
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
});

export default LaporanKeuangan;
