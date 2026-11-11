import React, { useEffect, useState } from 'react';
import {
  MessageSquareText,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  RefreshCw,
  Mail,
  Phone,
  Edit3,
  X,
  AlertCircle,
} from 'lucide-react';
import { apiClient, InquiryItem } from '../../api/client';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit / Notes Modal
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [newStatus, setNewStatus] = useState<'new' | 'contacted' | 'closed'>('new');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.admin.getInquiries({
        status: statusFilter || undefined,
        search: search.trim() || undefined,
        page,
        limit: 15,
      });
      setInquiries(res.items);
      setTotal(res.total);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch inquiries.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  };

  const handleOpenEdit = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setNewStatus(inq.status);
    setAdminNotes(inq.admin_notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedInquiry) return;
    setSaving(true);
    try {
      const updated = await apiClient.admin.updateInquiryStatus(selectedInquiry.id, newStatus, adminNotes);
      setInquiries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelectedInquiry(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update inquiry status.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      await apiClient.admin.deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete inquiry.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
            <MessageSquareText className="w-6 h-6 text-emerald-400" />
            <span>Lead Inquiries & Inbound Messages</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review customer interest, schedule callbacks, and log customer communications.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
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
            { label: 'All Inquiries', val: '' },
            { label: 'New Leads', val: 'new' },
            { label: 'Contacted', val: 'contacted' },
            { label: 'Closed / Archived', val: 'closed' },
          ].map((pill) => (
            <button
              key={pill.val}
              onClick={() => {
                setStatusFilter(pill.val);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === pill.val
                  ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
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
            placeholder="Search name, email, keyword..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </form>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3 px-4">Visitor</th>
                <th className="py-3 px-4">Project Interest</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading lead records...</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No inquiries matching the selected filters.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{inq.name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                        </span>
                        {inq.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-zinc-500" />
                            <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 font-medium">
                        {inq.interest}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-zinc-300 line-clamp-2">{inq.message}</p>
                      {inq.admin_notes && (
                        <p className="text-[10px] text-emerald-400/90 mt-1 italic">
                          Note: {inq.admin_notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                          inq.status === 'new'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : inq.status === 'contacted'
                            ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 text-[11px] font-mono">
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(inq)}
                          title="Update Status & Notes"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          title="Delete Lead"
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

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span>Showing {inquiries.length} of {total} total inquiries</span>
        </div>
      </div>

      {/* Edit Status & Notes Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e121b] border border-zinc-800 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-white">Update Lead Status</h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-1">
              <p className="text-zinc-400">Visitor: <span className="text-white font-medium">{selectedInquiry.name}</span></p>
              <p className="text-zinc-400">Email: <span className="text-white font-medium">{selectedInquiry.email}</span></p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-zinc-300">Lead Status</label>
              <div className="grid grid-cols-3 gap-2">
                {(['new', 'contacted', 'closed'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setNewStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      newStatus === st
                        ? 'bg-emerald-500 text-black'
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
                Internal Administrative Notes
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                placeholder="Log phone discussion, WhatsApp conversation, requested documents..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

