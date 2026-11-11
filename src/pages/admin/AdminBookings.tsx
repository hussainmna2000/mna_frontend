import React, { useEffect, useState } from 'react';
import {
  CalendarCheck2,
  Search,
  Filter,
  Trash2,
  Clock,
  RefreshCw,
  Mail,
  Phone,
  Edit3,
  X,
  AlertCircle,
  Building,
} from 'lucide-react';
import { apiClient, BookingItem } from '../../api/client';

export default function AdminBookings() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Status Modal
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [newStatus, setNewStatus] = useState<'pending' | 'confirmed' | 'completed' | 'cancelled'>('pending');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await apiClient.admin.getBookings({
        status: statusFilter || undefined,
        search: search.trim() || undefined,
        page,
        limit: 15,
      });
      setBookings(res.items);
      setTotal(res.total);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchBookings();
  };

  const handleOpenEdit = (b: BookingItem) => {
    setSelectedBooking(b);
    setNewStatus(b.status);
    setAdminNotes(b.admin_notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedBooking) return;
    setSaving(true);
    try {
      const updated = await apiClient.admin.updateBookingStatus(selectedBooking.id, newStatus, adminNotes);
      setBookings((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelectedBooking(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update booking status.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this site visit booking?')) return;
    try {
      await apiClient.admin.deleteBooking(id);
      setBookings((prev) => prev.filter((item) => item.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete booking.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
            <CalendarCheck2 className="w-6 h-6 text-purple-400" />
            <span>Site Visit Reservations & Walkthroughs</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage scheduled model house tours, client inspections, and site visits in Padiyur Ottapalayam.
          </p>
        </div>

        <button
          onClick={fetchBookings}
          className="px-3.5 py-2 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { label: 'All Bookings', val: '' },
            { label: 'Pending', val: 'pending' },
            { label: 'Confirmed', val: 'confirmed' },
            { label: 'Completed', val: 'completed' },
            { label: 'Cancelled', val: 'cancelled' },
          ].map((pill) => (
            <button
              key={pill.val}
              onClick={() => {
                setStatusFilter(pill.val);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === pill.val
                  ? 'bg-purple-500 text-white font-semibold shadow-md shadow-purple-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search visitor, email, phone..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </form>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3 px-4">Visitor</th>
                <th className="py-3 px-4">Visit Schedule</th>
                <th className="py-3 px-4">Visitor Notes</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Booked On</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-400" />
                    <span>Loading reservations...</span>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No reservations matching the selected filter.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{b.visitor_name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <a href={`mailto:${b.visitor_email}`} className="hover:underline">{b.visitor_email}</a>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-zinc-500" />
                          <a href={`tel:${b.visitor_phone}`} className="hover:underline">{b.visitor_phone}</a>
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-semibold text-white">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>{b.visit_date}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{b.visit_time}</p>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-zinc-300 line-clamp-2">{b.notes || 'No visitor notes.'}</p>
                      {b.admin_notes && (
                        <p className="text-[10px] text-purple-400 mt-1 italic">
                          Staff Note: {b.admin_notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
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
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 text-[11px] font-mono">
                      {b.created_at ? new Date(b.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          title="Change Status & Staff Notes"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          title="Delete Reservation"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span>Showing {bookings.length} of {total} total bookings</span>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e121b] border border-zinc-800 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-white">Update Reservation Status</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-1">
              <p className="text-zinc-400">Visitor: <span className="text-white font-medium">{selectedBooking.visitor_name}</span></p>
              <p className="text-zinc-400">Date & Time: <span className="text-white font-medium">{selectedBooking.visit_date} @ {selectedBooking.visit_time}</span></p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-zinc-300">Appointment Status</label>
              <div className="grid grid-cols-2 gap-2">
                {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setNewStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      newStatus === st
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Staff Assignment / Follow-up Notes
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                placeholder="Assign executive walkthrough engineer, gate pass notes..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

