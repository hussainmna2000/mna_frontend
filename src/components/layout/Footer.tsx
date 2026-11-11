import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  ArrowUpRight,
  Instagram,
  Youtube,
  Facebook,
  ExternalLink
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/mockData';

interface FooterProps {
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
  darkMode?: boolean;
}

export default function Footer({ onShowToast, darkMode = true }: FooterProps) {
  return (
    <footer className="bg-black text-zinc-300 relative pt-16 pb-12 overflow-hidden border-t border-zinc-900">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight font-serif text-white">
                  MNA <span className="text-emerald-500 font-sans font-light">REALESTATE</span>
                </span>
                <p className="text-[10px] text-zinc-400 tracking-widest uppercase font-mono">
                  & CONSTRUCTION
                </p>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed">
              MNA Realestate &amp; Construction helps families turn their property dreams into reality with affordable homes, residential plots, quality construction, and easy bank loan assistance.
            </p>

            <div className="space-y-3 text-sm text-zinc-400">
              <a 
                href="https://maps.app.goo.gl/A7zFiF7UsCLkUazy7?g_st=ic"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 group hover:text-emerald-400 transition-colors"
              >
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Ganapathipalayam / Padiyur (Ottapalayam), Tirupur, 641605</span>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="flex flex-wrap gap-x-2">
                  <a href="tel:+918220000313" className="hover:text-emerald-400 transition-colors">+91 8220000313</a>
                  <span>/</span>
                  <a href="tel:+918220043313" className="hover:text-emerald-400 transition-colors">+91 8220043313</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:mnagardenpadiyur@gmail.com" className="hover:text-emerald-400 transition-colors">mnagardenpadiyur@gmail.com</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { 
                  name: 'Instagram',
                  icon: Instagram, 
                  href: 'https://www.instagram.com/mnagardentirupur?igsi=dGNlcmpya3RqcThm&utm_source=qr' 
                },
                { 
                  name: 'YouTube',
                  icon: Youtube, 
                  href: 'https://youtube.com/@mnagarden?si=3Dc4E0v4zO8A94I9' 
                },
                { 
                  name: 'Facebook',
                  icon: Facebook, 
                  href: 'https://www.facebook.com/share/1EcqxAv7ks/?mibextid=wwXIfr' 
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'All Developments', path: '/projects' },
                { name: 'Architecture Gallery', path: '/gallery' },
                { name: 'Client Testimonials', path: '/testimonials' },
                { name: 'Client Portal Login', path: '/client-login' },
                { name: 'Administrative Console', path: '/admin/login' },
                { name: 'Contact Experience Center', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Featured Projects */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Iconic Projects
            </h4>
            <div className="space-y-3">
              {MOCK_PROJECTS.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="flex gap-3 group p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-600/50 transition-all"
                >
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-12 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </h5>
                    <p className="text-[11px] text-zinc-400 truncate">{p.city}</p>
                    <p className="text-[11px] text-emerald-500 font-medium">{p.priceStarting}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Experience Center & Map */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Experience Center Map
            </h4>
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 relative group h-44">
              {/* Styled Mock Google Map */}
              <div className="absolute inset-0 bg-zinc-950 flex flex-col justify-between p-4 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Padiyur HQ
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-2 z-10 bg-black/90 p-2.5 rounded-xl border border-zinc-800">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">MNA Experience Center</p>
                    <p className="text-[10px] text-zinc-400">Padiyur Ottapalayam, Tirupur</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/book-visit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Schedule Private Studio Tour
            </Link>
          </div>

        </div>

        {/* Bottom Bar & Legal Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} MNA Realestate and Construction LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/faq" className="hover:text-zinc-300 transition-colors">
              FAQ
            </Link>
            <span className="text-zinc-600">RERA Registration Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
