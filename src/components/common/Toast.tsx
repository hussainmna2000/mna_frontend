import { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-5 z-[100] max-w-sm w-full animate-bounce-short">
      <div className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center justify-between gap-3 text-sm font-medium ${
        type === 'success'
          ? 'bg-slate-900/95 text-white border-emerald-500/40'
          : 'bg-slate-900/95 text-white border-blue-500/40'
      }`}>
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          )}
          <span>{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
