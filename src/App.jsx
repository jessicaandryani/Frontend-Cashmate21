// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TambahCatatanPage from './pages/TambahCatatanPage';
import EditCatatanPage from './pages/EditCatatanPage';
import LaporanKeuangan from './pages/LaporanKeuangan';
import LiterasiPage from './pages/LiterasiPage';
import KalkulatorPage from "./pages/KalkulatorPage";
import ZakatMal from './pages/kalkulator/ZakatMal';
import ProfilRisiko from './pages/kalkulator/ProfilRisiko';
import Investasi from './pages/kalkulator/Investasi';

import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa layout */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Halaman dengan layout */}
        <Route path="/dashboard" element={<MainLayout activePage="dashboard"><DashboardPage /></MainLayout>} />
        <Route path="/profile" element={<MainLayout activePage="profile"><ProfilePage /></MainLayout>} />
        <Route path="/tambah-catatan" element={<MainLayout activePage="dashboard"><TambahCatatanPage /></MainLayout>} />
        <Route path="/edit-catatan/:id" element={<MainLayout activePage="dashboard"><EditCatatanPage /></MainLayout>} />
        <Route path="/laporan" element={<MainLayout activePage="laporan"><LaporanKeuangan /></MainLayout>} />
        <Route path="/literasi" element={<MainLayout activePage="literasi"><LiterasiPage /></MainLayout>} />
        <Route path="/kalkulator" element={<MainLayout activePage="kalkulator"><KalkulatorPage /></MainLayout>} />
        <Route path="/kalkulator/zakat-mal" element={<MainLayout activePage="kalkulator"><ZakatMal /></MainLayout>} />
        <Route path="/kalkulator/profil-risiko" element={<MainLayout activePage="kalkulator"><ProfilRisiko /></MainLayout>} />
        <Route path="/kalkulator/investasi" element={<MainLayout activePage="kalkulator"><Investasi /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
