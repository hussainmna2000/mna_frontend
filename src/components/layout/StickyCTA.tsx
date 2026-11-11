import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Phone, Download, X } from 'lucide-react';

export default function StickyCTA() {
  const [closed, setClosed] = useState(false);
  const location = useLocation();

  // Hide on book visit page itself
  if (location.pathname === '/book-visit' || closed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-black/95 backdrop-blur-md border-t border-zinc-800 text-white shadow-2xl md:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-zinc-100">MNA Sales Desk</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:+918220000313"
            className="p-2.5 rounded-full bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-800"
            title="Call Sales Desk"
          >
            <Phone className="w-4 h-4 text-emerald-500" />
          </a>

          <Link
            to="/book-visit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black border border-emerald-500/20 shadow-lg shadow-emerald-950/40"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            Book Site Visit
          </Link>

          <button
            onClick={() => setClosed(true)}
            className="p-1.5 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
