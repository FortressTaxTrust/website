"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Home, User, FileText, LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const modules = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    { name: "Case Studies", icon: <FileText size={20} />, path: "/admin/casestudies" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg h-full transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Modules */}
        <nav className="mt-4">
          {modules.map((mod, idx) => (
            <Link
              key={idx}
              href={mod.path}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition-colors rounded-md mx-2 my-1 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              {mod.icon}
              {!isCollapsed && <span>{mod.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Links */}
        {/* <div className="absolute bottom-0 w-full mb-4">
          <Link
            href="/admin/adminprofile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md mx-2"
          >
            <User size={20} />
            {!isCollapsed && <span>Profile</span>}
          </Link>
          <Link
            href="/admin/logout"
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-600 rounded-md mx-2"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
