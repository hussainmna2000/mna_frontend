import React, { useEffect, useState } from 'react';
import {
  Users,
  Search,
  Shield,
  ShieldAlert,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  UserCheck,
  UserX,
  Building2,
} from 'lucide-react';
import { apiClient, User } from '../../api/client';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.admin.getUsers({
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        search: search.trim() || undefined,
        page,
        limit: 15,
      });
      setUsers(res.items);
      setTotal(res.total);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleToggleStatus = async (user: User) => {
    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    if (!window.confirm(`Set status of ${user.full_name} to "${nextStatus}"?`)) return;
    try {
      const updated = await apiClient.admin.updateUserStatus(user.id, nextStatus);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to change user status.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user account?')) return;
    try {
      await apiClient.admin.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete user.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-400" />
            <span>Client & Administrative Accounts</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage client portal credentials, construction tracking access, and staff roles.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="px-3.5 py-2 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Role Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { label: 'All Users', val: '' },
            { label: 'Clients', val: 'client' },
            { label: 'Administrators', val: 'superadmin' },
          ].map((pill) => (
            <button
              key={pill.val}
              onClick={() => {
                setRoleFilter(pill.val);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                roleFilter === pill.val
                  ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
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
            placeholder="Search name, email, Customer ID..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Customer ID</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4">Registered On</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />
                    <span>Loading accounts...</span>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No accounts matching the selected filters.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{u.full_name}</div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <a href={`mailto:${u.email}`} className="hover:underline">{u.email}</a>
                        </span>
                        {u.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-zinc-500" />
                            <span>{u.phone}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 font-mono text-zinc-300">
                        {u.customer_id || '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                          u.role === 'superadmin' || u.role === 'admin'
                            ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                          u.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 text-[11px] font-mono">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(u)}
                          title={u.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            u.status === 'active'
                              ? 'text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10'
                              : 'text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10'
                          }`}
                        >
                          {u.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          title="Delete User"
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
          <span>Showing {users.length} of {total} total registered accounts</span>
        </div>
      </div>
    </div>
  );
}

