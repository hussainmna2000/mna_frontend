import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  Building2,
  LayoutDashboard,
  MessageSquareText,
  CalendarCheck2,
  Home,
  Users,
  ShieldCheck,
  Sliders,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { apiClient } from '../../api/client';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = apiClient.getCurrentUser();

  const handleLogout = () => {
    apiClient.auth.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Leads & Inquiries', path: '/admin/inquiries', icon: MessageSquareText },
    { label: 'Site Visits', path: '/admin/bookings', icon: CalendarCheck2 },
    { label: 'Properties Catalog', path: '/admin/properties', icon: Home },
    { label: 'Clients & Users', path: '/admin/users', icon: Users },
    { label: 'Security & Audit Logs', path: '/admin/logs', icon: Activity },
    { label: 'System Settings', path: '/admin/settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans">
      {/* Top Administrative Bar */}
      <header className="h-16 border-b border-zinc-800/80 bg-[#0a0d14]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-white tracking-tight">
                MNA <span className="text-emerald-400 font-sans font-light">ADMIN</span>
              </span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
                Console
              </span>
            </div>
          </Link>
        </div>

        {/* Right Admin Profile & Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-white">{user?.full_name || 'Admin Officer'}</p>
              <p className="text-[10px] text-emerald-400 capitalize">{user?.role || 'Administrator'}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-xs font-bold uppercase">
              {user?.full_name ? user.full_name[0] : 'A'}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 top-16 z-30 w-64 bg-[#0a0d14] border-r border-zinc-800/80 p-4 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Help & Version */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/70 text-[11px] space-y-1 text-zinc-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MNA Secure Core</span>
            </div>
            <p className="text-[10px] text-zinc-500">Padiyur Ottapalayam Headquarters</p>
            <p className="text-[9px] text-zinc-600 font-mono">v1.0.0-production</p>
          </div>
        </aside>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#07090e]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

