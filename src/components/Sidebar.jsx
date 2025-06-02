"use client";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  BarChart3,
  Calculator,
  LogOut,
  User,
} from "lucide-react";
import axios from "axios";
import ModalConfirm from "./ModalConfirm";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  // Get current path to determine active page
  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3000/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error.response?.data || error.message);
      // Even if logout fails on server, still remove token and redirect
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const menuItems = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      key: "dashboard",
    },
    {
      path: "/literasi",
      icon: BookOpen,
      label: "Literasi",
      key: "literasi",
    },
    {
      path: "/kalkulator",
      icon: Calculator,
      label: "Kalkulator",
      key: "kalkulator",
    },
    {
      path: "/laporan",
      icon: BarChart3,
      label: "Laporan",
      key: "laporan",
    },
  ];

  return (
    <>
      <div className="w-64 bg-gradient-to-b from-purple-600 to-purple-700 text-white min-h-screen flex flex-col shadow-xl relative">
        {/* Header */}
        <div className="p-6 border-b border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-1">CashMate</h2>
          <p className="text-purple-200 text-sm">Kelola Keuangan Anda</p>
        </div>

        {/* Scrollable Navigation Area */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ height: "calc(100vh - 220px)" }}
        >
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <li key={item.key}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                            : "text-purple-100 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Fixed Bottom Actions - Always visible */}
        <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-purple-500/30 bg-gradient-to-b from-purple-600 to-purple-700 mt-auto">
          {/* Profile Link */}
          <Link
            to="/profile"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-2
              ${
                currentPath === "/profile"
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                  : "text-purple-100 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profil</span>
            {currentPath === "/profile" && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
            <span className="text-red-500 font-medium">Keluar</span>
          </button>
        </div>
      </div>

      {/* Modal Confirmation */}
      {showModal && (
        <ModalConfirm
          title="Konfirmasi Logout"
          message="Apakah kamu yakin ingin keluar dari akun ini?"
          onConfirm={handleLogout}
          onCancel={handleCancel}
          confirmLabel="🚪 Keluar"
          titleColor="#ef4444"
          messageColor="#666"
          cancelLabel="❌ Batal"
        />
      )}
    </>
  );
};

export default Sidebar;
