import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/918220043313?text=${encodeURIComponent(
    'Hello MNA Realestate, I would like to inquire about your residential projects in Padiyur Ottapalayam.'
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 transition-all hover:scale-110 active:scale-95"
        title="Live WhatsApp Communication"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        
        {/* Pulse Notification Ring */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        
        {/* Hover Tooltip */}
        <span className="absolute left-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Live WhatsApp Communication
        </span>
      </a>
    </div>
  );
}
