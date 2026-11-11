import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  MessageSquareText,
  CalendarCheck2,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { apiClient, AdminOverview } from '../../api/client';

export default function AdminDashboard() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.admin.getOverview();
      setData(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load executive overview.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            Executive Operations Command
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time telemetry for MNA Real Estate & Construction project sites in Padiyur Ottapalayam.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchOverview}
            disabled={loading}
            className="px-3.5 py-2 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            to="/admin/properties"
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchOverview}
            className="text-xs text-rose-400 hover:underline font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Properties</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {loading ? '—' : data?.total_properties ?? 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-medium">Active</span> listings in catalog
            </p>
          </div>
        </div>

        {/* Lead Inquiries */}
        <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {loading ? '—' : data?.total_inquiries ?? 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
              <span className="text-amber-400 font-medium">{data?.new_inquiries ?? 0} new</span> requiring response
            </p>
          </div>
        </div>

        {/* Site Visits */}
        <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Site Visit Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {loading ? '—' : data?.total_bookings ?? 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
              <span className="text-purple-400 font-medium">{data?.pending_bookings ?? 0} pending</span> confirmation
            </p>
          </div>
        </div>

        {/* Users */}
        <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Registered Accounts</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">
              {loading ? '—' : data?.total_users ?? 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
              Clients & staff with portal access
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Tables: Recent Inquiries & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Recent Customer Inquiries</h2>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-xs text-zinc-500">Loading inquiries...</div>
            ) : !data?.recent_inquiries || data.recent_inquiries.length === 0 ? (
              <div className="text-center py-8 text-xs text-zinc-500">No customer inquiries recorded yet.</div>
            ) : (
              data.recent_inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{inq.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                        inq.status === 'new'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : inq.status === 'contacted'
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">{inq.message}</p>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                    <span>{inq.email}</span>
                    <span>{inq.phone || 'No phone'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Upcoming Site Visit Reservations</h2>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-xs text-zinc-500">Loading reservations...</div>
            ) : !data?.recent_bookings || data.recent_bookings.length === 0 ? (
              <div className="text-center py-8 text-xs text-zinc-500">No reservations booked yet.</div>
            ) : (
              data.recent_bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{b.visitor_name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : b.status === 'pending'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : b.status === 'completed'
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{b.visit_date} @ {b.visit_time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                    <span>{b.visitor_phone}</span>
                    <span>{b.visitor_email}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

