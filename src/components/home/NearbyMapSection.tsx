import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import { 
  GraduationCap, 
  Hospital, 
  MapPin, 
  Navigation,
  ExternalLink
} from 'lucide-react';

interface NearbyMapProps {
  darkMode?: boolean;
}

export default function NearbyMapSection({ darkMode = false }: NearbyMapProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'School' | 'Hospital'>('All');

  const categories = [
    { name: 'All', icon: MapPin },
    { name: 'School', icon: GraduationCap },
    { name: 'Hospital', icon: Hospital },
  ] as const;

  const landmarks = [
    { name: 'NSS College & Higher Secondary School, Ottapalam', category: 'School', distance: '5 Mins', coords: '10.7744, 76.3768' },
    { name: 'Ottapalam Government Taluk Hospital', category: 'Hospital', distance: '8 Mins', coords: '10.7780, 76.3812' },
    { name: 'Padiyur Central High School', category: 'School', distance: '4 Mins', coords: '10.7650, 76.3650' },
    { name: 'Padiyur Community Health Centre & Clinic', category: 'Hospital', distance: '3 Mins', coords: '10.7680, 76.3680' },
    { name: 'Little Flower Convent School', category: 'School', distance: '7 Mins', coords: '10.7710, 76.3720' },
    { name: 'Valluvanad Specialty Hospital', category: 'Hospital', distance: '10 Mins', coords: '10.7820, 76.3890' },
  ];

  const filteredLandmarks = activeCategory === 'All' 
    ? landmarks 
    : landmarks.filter(l => l.category === activeCategory);

  return (
    <section className={`py-24 ${darkMode ? 'bg-[#09090b] text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Strategic Location Advantages"
          title="Connected to Everything That Matters"
          subtitle="Our residential projects and land plots in Padiyur Ottapalayam are conveniently situated near reputed schools, colleges, and healthcare facilities."
          darkMode={darkMode}
        />

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                    : darkMode
                    ? 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Grid: Map + Landmarks list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Map Visual */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-zinc-800 bg-black relative min-h-[380px] flex flex-col justify-between p-6 shadow-2xl bg-[radial-gradient(#27272a_1.5px,transparent_1.5px)] [background-size:24px_24px] group">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" /> Padiyur Ottapalayam
              </span>
              <a
                href="https://maps.app.goo.gl/A7zFiF7UsCLkUazy7?g_st=ic"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <span>Open in Google Maps</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map Center Pins Graphic */}
            <a
              href="https://maps.app.goo.gl/A7zFiF7UsCLkUazy7?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="my-auto flex flex-col items-center justify-center text-center py-10 z-10 group/pin cursor-pointer transition-transform hover:scale-105"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-emerald-600/30 animate-ping absolute inset-0" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-700 to-black text-white flex items-center justify-center shadow-2xl relative z-10 border border-emerald-500/40 group-hover/pin:ring-4 group-hover/pin:ring-emerald-500/30 transition-all">
                  <MapPin className="w-8 h-8" />
                </div>
              </div>

              <h4 className="text-xl font-serif font-bold text-white mt-4 group-hover/pin:text-emerald-400 transition-colors flex items-center gap-1.5 justify-center">
                MNA Real Estate & Construction
                <ExternalLink className="w-4 h-4 opacity-70" />
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mt-1">
                Ganapathipalayam / Padiyur (Ottapalayam), Tirupur • Click to view in Google Maps
              </p>
            </a>

            {/* Bottom Status */}
            <div className="flex items-center justify-between z-10 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
              <span>Showing {filteredLandmarks.length} nearby key destinations</span>
              <a
                href="https://maps.app.goo.gl/A7zFiF7UsCLkUazy7?g_st=ic"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-mono font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <span>Navigate on Google Maps</span>
              </a>
            </div>

          </div>

          {/* Landmarks List */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {filteredLandmarks.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 shadow-sm ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-white hover:border-emerald-500/40' : 'bg-white border-zinc-200 text-zinc-900 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold">{item.name}</h5>
                    <span className="text-[10px] font-mono uppercase text-zinc-400">{item.category}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
