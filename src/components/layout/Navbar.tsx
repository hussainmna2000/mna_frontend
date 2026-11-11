import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  PhoneCall, 
  Moon, 
  Sun,
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/mockData';

interface NavbarProps {
  darkMode?: boolean;
}

export default function Navbar({ darkMode = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown & mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProjectsDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects', hasDropdown: true },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Client Login', path: '/client-login', isHighlight: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 shadow-xl py-3 text-white'
          : 'bg-gradient-to-b from-black/90 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight font-serif text-white">
                MNA <span className="text-emerald-500 font-sans font-light">REALESTATE</span>
              </span>
              <p className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">
                & CONSTRUCTION
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path === '/projects' && location.pathname.startsWith('/projects'));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setProjectsDropdownOpen(true)}
                    onMouseLeave={() => setProjectsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => navigate('/projects')}
                      className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                        isActive
                          ? 'text-emerald-400 font-semibold bg-emerald-500/10'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${projectsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Projects Dropdown */}
                    {projectsDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 z-50">
                        <div className="rounded-2xl p-3 shadow-2xl border border-zinc-800 backdrop-blur-xl bg-zinc-900/95 text-white">
                          <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                              Featured Developments
                            </span>
                            <Link to="/projects" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                              View All <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="space-y-1">
                            {MOCK_PROJECTS.slice(0, 4).map((p) => (
                              <Link
                                key={p.id}
                                to={`/projects/${p.id}`}
                                className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-zinc-800"
                              >
                                <img
                                  src={p.heroImage}
                                  alt={p.title}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-10 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold truncate">{p.title}</h4>
                                  <p className="text-[11px] text-zinc-400 truncate flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                                    {p.city}
                                  </p>
                                </div>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0">
                                  {p.status}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.isHighlight) {
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? 'text-emerald-400 font-semibold bg-emerald-500/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Book Site Visit CTA */}
            <Link
              to="/book-visit"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-emerald-900/30 border border-emerald-500/20"
            >
              <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Book Site Visit</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/20 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 shadow-2xl transition-all bg-[#09090b] text-white">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  location.pathname === link.path
                    ? 'bg-emerald-600 text-white'
                    : 'hover:bg-zinc-800'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <Link
                to="/book-visit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-black shadow-md"
              >
                <Calendar className="w-4 h-4 text-white" />
                Book Site Visit
              </Link>

              <a
                href="tel:+918220000313"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-zinc-800 text-zinc-200"
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                +91 8220000313
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
