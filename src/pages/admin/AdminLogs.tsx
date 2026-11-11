import React, { useEffect, useState } from 'react';
import { Activity, RefreshCw, ShieldCheck, Clock, User, Globe } from 'lucide-react';
import { apiClient, ActivityLogItem } from '../../api/client';

export default function AdminLogs() {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.admin.getActivityLogs({ page, limit: 25 });
      setLogs(res.items);
      setTotal(res.total);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to fetch activity logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-emerald-400" />
            <span>Administrative Security & Audit Trail</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Immutable log of operations, role changes, property modifications, and lead handovers.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-3.5 py-2 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Trail</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Client IP</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading audit records...</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No administrative actions recorded in current session.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-semibold text-white">
                        <User className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{log.admin_name || 'System'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/60 font-mono text-[11px] text-emerald-400 font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 capitalize">
                      {log.entity_type} {log.entity_id ? `#${log.entity_id}` : ''}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">
                      {log.ip_address || '127.0.0.1'}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 max-w-xs truncate">
                      {log.details ? JSON.stringify(log.details) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span>Total audit events: {total}</span>
        </div>
      </div>
    </div>
  );
}

