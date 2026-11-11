import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { apiClient } from '../../api/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your admin email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await apiClient.auth.login(email.trim(), password.trim());
      if (data.user.role !== 'admin' && data.user.role !== 'superadmin') {
        apiClient.auth.logout();
        setError('Access denied: this account does not possess administrator credentials.');
        setLoading(false);
        return;
      }
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please verify your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@mna-realestate.com');
    setPassword('Admin@123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            MNA Real Estate & Construction
          </h1>
          <p className="text-xs text-zinc-400">
            Administrative Governance & Operations Command Center
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0e121b] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Authentication</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="text-[11px] flex items-center gap-1 text-zinc-400 hover:text-emerald-400 bg-zinc-800/60 hover:bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors border border-zinc-700/50"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Auto-fill Demo</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mna-realestate.com"
                  required
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-800/60 text-center">
            <Link
              to="/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

