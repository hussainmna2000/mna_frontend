import { useState } from 'react';
import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';
import LightboxModal from '../components/common/LightboxModal';
import { MOCK_GALLERY } from '../data/mockData';
import { 
  Maximize2, 
  ShieldCheck, 
  Video, 
  Trees, 
  Droplets, 
  Zap, 
  Route, 
  CheckCircle2 
} from 'lucide-react';

interface GalleryProps {
  darkMode: boolean;
}

export default function Gallery({ darkMode }: GalleryProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Exterior Architecture' | 'Interior Design' | 'Amenities' | 'Drone Views' | 'Construction Updates'>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    'All',
    'Exterior Architecture',
    'Interior Design',
    'Amenities',
    'Drone Views',
    'Construction Updates',
  ] as const;

  const filteredItems = activeTab === 'All'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((item) => item.category === activeTab);

  const imageUrls = filteredItems.map((item) => item.url);

  const amenitiesList = [
    {
      title: 'Gated Community',
      description: 'Secure and well-planned surroundings for peaceful living.',
      icon: ShieldCheck,
      badge: 'Security & Privacy'
    },
    {
      title: '24/7 CCTV Security',
      description: 'Strategically placed CCTV cameras for enhanced safety and monitoring.',
      icon: Video,
      badge: 'Active Surveillance'
    },
    {
      title: 'Children’s Park',
      description: 'Dedicated recreational spaces where children can play and enjoy outdoor activities.',
      icon: Trees,
      badge: 'Recreation'
    },
    {
      title: 'Panchayat Water Facility',
      description: 'Reliable access to essential water facilities for everyday needs.',
      icon: Droplets,
      badge: 'Essential Utility'
    },
    {
      title: 'EB Electricity Facility',
      description: 'Proper electricity infrastructure for convenient and uninterrupted living.',
      icon: Zap,
      badge: 'Power Infrastructure'
    },
    {
      title: 'Tar Road Facility',
      description: 'Well-developed road connectivity providing smooth and convenient access to the community.',
      icon: Route,
      badge: 'Smooth Access'
    },
  ];

  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Architecture & Design Gallery' }]} darkMode={darkMode} />

        <SectionHeader
          badge="Visual Showcase"
          title="Architectural & Project Gallery"
          subtitle="Explore our portfolio of individual houses, bespoke floorplans, verified land plots, and well-planned community infrastructure in Padiyur Ottapalayam."
          darkMode={darkMode}
        />

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === cat
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : darkMode
                  ? 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setLightboxOpen(true);
              }}
              className="group rounded-2xl overflow-hidden relative h-72 cursor-pointer shadow-lg bg-black border border-zinc-800"
            >
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Hover Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold truncate mt-0.5">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Section */}
        <div className="pt-8 border-t border-zinc-800/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              Community Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
              Amenities
            </h2>
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-emerald-400 mb-4">
              Everything You Need for Comfortable Living
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              We thoughtfully develop our communities with essential infrastructure, safety, and family-friendly amenities to provide a comfortable and secure living environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenitiesList.map((amenity, idx) => {
              const IconComp = amenity.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    darkMode
                      ? 'bg-zinc-900/90 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 shadow-xl'
                      : 'bg-white border-zinc-200 hover:border-emerald-500/50 shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                        {amenity.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-white mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{amenity.title}</span>
                    </h4>

                    <p className="text-sm leading-relaxed text-zinc-300">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={imageUrls}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        title={filteredItems[currentIndex]?.title}
      />
    </div>
  );
}
