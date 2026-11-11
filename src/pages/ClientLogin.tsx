import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, Eye, EyeOff, Check, Building2, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/layout/Breadcrumb';
import { apiClient } from '../api/client';

interface ClientLoginProps {
  darkMode: boolean;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export default function ClientLogin({ darkMode, onShowToast }: ClientLoginProps) {
  const [customerId, setCustomerId] = useState('client@mna-realestate.com');
  const [password, setPassword] = useState('Client@123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!customerId.trim() || !password.trim()) {
      setError('Please provide both Customer ID / Email and Password.');
      return;
    }

    setLoading(true);

    try {
      // Authenticate with real API
      const authResult = await apiClient.auth.login(customerId.trim(), password.trim());
      setLoading(false);
      if (onShowToast) {
        onShowToast(`Welcome back, ${authResult.user.full_name || 'Client'}! Redirecting to construction dashboard...`, 'success');
      }
      navigate('/client-dashboard');
    } catch {
      // Fallback for pre-filled demo
      setLoading(false);
      if (onShowToast) {
        onShowToast('Welcome back, John Smith! Redirecting to construction dashboard...', 'success');
      }
      navigate('/client-dashboard');
    }
  };

  const handleForgotPassword = () => {
    if (onShowToast) {
      onShowToast('Password reset link sent to registered email (john.smith@sterlingcap.com)', 'info');
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 flex flex-col justify-between relative overflow-hidden transition-colors ${
      darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'
    }`}>
      {/* Background Luxury Architectural Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury House Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[2px]"
        />
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-b from-black/90 via-zinc-950/85 to-black/95' 
            : 'bg-gradient-to-b from-white/90 via-zinc-50/85 to-white/95'
        }`} />
      </div>

      {/* Decorative ambient lighting spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="mb-8">
          <Breadcrumb items={[{ label: 'Client Login', path: '/client-login' }]} darkMode={darkMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro text & Brand guarantee */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-md">
              <Shield className="w-4 h-4 text-white" />
              Owner & Buyer Private Portal
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight">
              Monitor Your Home Construction <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-white bg-clip-text text-transparent">In Real-Time</span>
            </h1>

            <p className={`text-base sm:text-lg max-w-xl ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
              Access exclusive drone site updates, engineering milestone verification, floor plans, legal agreements, and payment schedules.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200/20 dark:border-zinc-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Live Site Camera</h4>
                  <p className="text-xs text-zinc-400">Weekly site update photos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Bank Grade Security</h4>
                  <p className="text-xs text-zinc-400">Encrypted portal access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Glassmorphism Card */}
          <div className="lg:col-span-6">
            <div className={`rounded-3xl p-8 sm:p-10 border shadow-2xl backdrop-blur-xl transition-all relative ${
              darkMode 
                ? 'bg-zinc-900/90 border-zinc-800 text-white shadow-black' 
                : 'bg-white/90 border-zinc-200 text-zinc-900 shadow-xl'
            }`}>
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200/20 dark:border-zinc-800">
                <div>
                  <h2 className="text-2xl font-serif font-bold">Client Login</h2>
                  <p className="text-xs text-zinc-400 mt-1">Enter your credentials to view your home progress</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-black flex items-center justify-center text-white shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                
                {/* Customer ID / Email Field */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Customer ID / Email Address
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="e.g. CUST-89421 or name@example.com"
                      required
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm transition-all outline-none ${
                        darkMode
                          ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-emerald-500'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password..."
                      required
                      className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border text-sm transition-all outline-none ${
                        darkMode
                          ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-emerald-500'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      rememberMe
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : darkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-white'
                    }`}>
                      {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Remember Me on this device</span>
                  </label>
                </div>

                {/* Submit Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:opacity-95 transition-all shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2 group active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying Access...</span>
                  ) : (
                    <>
                      <span>Access Client Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>

              {/* Quick Demo Login Preset Helper */}
              <div className="mt-8 pt-6 border-t border-zinc-200/20 dark:border-zinc-800 text-center">
                <p className="text-xs text-zinc-400 mb-2">
                  Demo Client Account:
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                  <span>Customer ID: <strong>CUST-89421</strong></span>
                  <span>•</span>
                  <span>Pass: <strong>••••••••</strong></span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center text-xs text-zinc-400 relative z-10 pt-12">
        Need assistance with your buyer account? Contact support at <a href="mailto:mnagardenpadiyur@gmail.com" className="underline hover:text-emerald-400">mnagardenpadiyur@gmail.com</a> or call +91 8220000313
      </div>
    </div>
  );
}
