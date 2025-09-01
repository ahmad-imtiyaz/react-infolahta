import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaUsers,
  FaPlus,
  FaDatabase,
  FaFileExport,
} from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: FaHome,
      roles: ["Admin", "Operator Slog", "Operator Sren", "Pengguna"],
    },
    { path: "/users", label: "Kelola User", icon: FaUsers, roles: ["Admin"] },
    {
      path: "/add-asset",
      label: "Tambah Aset",
      icon: FaPlus,
      roles: ["Admin", "Operator Slog"],
    },
    {
      path: "/add-yardip",
      label: "Tambah Yardip",
      icon: FaPlus,
      roles: ["Admin", "Operator Sren"],
    },
    {
      path: "/assets",
      label: "Data Aset",
      icon: FaDatabase,
      roles: ["Admin", "Operator Slog", "Operator Sren", "Pengguna"],
    },
    {
      path: "/yardip",
      label: "Data Yardip",
      icon: FaDatabase,
      roles: ["Admin", "Operator Slog", "Operator Sren", "Pengguna"],
    },
    {
      path: "/reports",
      label: "Laporan",
      icon: FaFileExport,
      roles: ["Admin", "Operator Slog", "Operator Sren", "Pengguna"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16">
      <nav className="mt-8">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-6 py-3 hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-blue-600 border-r-4 border-blue-400" : ""
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
