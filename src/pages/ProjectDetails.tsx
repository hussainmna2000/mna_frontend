import { useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../data/mockData';
import Breadcrumb from '../components/layout/Breadcrumb';
import LightboxModal from '../components/common/LightboxModal';
import { apiClient } from '../api/client';
import { 
  MapPin, 
  BedDouble, 
  Maximize, 
  Calendar, 
  ShieldCheck, 
  Download, 
  Play, 
  CheckCircle2, 
  Send, 
  Building2, 
  ChevronRight,
  Layers,
  Sparkles,
  PhoneCall,
  Mail,
  User,
  HelpCircle
} from 'lucide-react';

interface ProjectDetailsProps {
  darkMode: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export default function ProjectDetails({ darkMode = true, onShowToast }: ProjectDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const project = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];

  // Gallery & Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Floor plan tab state
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(0);

  // Virtual tour modal state
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);

  // Form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  const handleInquirySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryPhone.trim()) {
      onShowToast('Please fill in all required contact fields.', 'info');
      return;
    }
    setInquirySubmitting(true);
    try {
      await apiClient.inquiries.submit({
        name: inquiryName.trim(),
        email: inquiryEmail.trim(),
        phone: inquiryPhone.trim(),
        interest: project.title,
        message: inquiryMessage.trim() || `Inquiry about ${project.title}`,
      });
      onShowToast(`Thank you ${inquiryName}! Your inquiry was sent.`, 'success');
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMessage('');
    } catch {
      onShowToast('We could not send your inquiry. Please try again or call our office.', 'info');
    } finally {
      setInquirySubmitting(false);
    }
  };

  const handleDownloadBrochure = () => {
    onShowToast(`Downloading official brochure for ${project.title}...`, 'success');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb
          items={[
            { label: 'Developments', path: '/projects' },
            { label: project.title },
          ]}
          darkMode={true}
        />

        {/* Hero Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
          
          {/* Main Large Image */}
          <div
            onClick={() => {
              setCurrentImgIndex(0);
              setLightboxOpen(true);
            }}
            className="lg:col-span-8 h-[360px] sm:h-[480px] rounded-3xl overflow-hidden relative group cursor-pointer shadow-2xl bg-black"
          >
            <img
              src={project.galleryImages[0] || project.heroImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white">
                  {project.status}
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white mt-2">
                  {project.title}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-emerald-400" /> {project.location}, {project.city}
                </p>
              </div>

              <span className="px-4 py-2 rounded-full text-xs font-bold text-white bg-black/80 border border-white/20 backdrop-blur-md hidden sm:block">
                Click to Expand Gallery ({project.galleryImages.length})
              </span>
            </div>
          </div>

          {/* Side Thumbnail Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-[360px] sm:h-[480px]">
            {project.galleryImages.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCurrentImgIndex(idx + 1);
                  setLightboxOpen(true);
                }}
                className="rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg bg-black h-full"
              >
                <img
                  src={img}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

        </div>

        {/* Action Header Strip */}
        <div className={`p-6 rounded-3xl border mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${
          darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div>
            <p className="text-xs uppercase font-mono tracking-widest text-zinc-400">
              {project.priceStarting.startsWith('Get Quote') ? 'Pricing' : 'Starting Price'}
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-extrabold text-emerald-400">{project.priceStarting}</p>
            <p className="text-xs text-zinc-400 mt-1">RERA Registration ID: <strong className="text-zinc-200 font-mono">{project.reraId}</strong></p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setVirtualTourOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>3D Virtual Tour</span>
            </button>

            <button
              onClick={handleDownloadBrochure}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Brochure (PDF)</span>
            </button>

            <Link
              to="/book-visit"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 border border-emerald-500/30 shadow-lg shadow-emerald-950/50 transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>{project.priceStarting.startsWith('Get Quote') ? 'Get Custom Quote' : 'Book Site Visit'}</span>
            </Link>
          </div>
        </div>

        {/* Content Columns: Left Details / Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Main Details */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview & Key Highlights */}
            <div className={`p-8 rounded-3xl border shadow-lg space-y-6 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <h2 className="text-2xl font-serif font-bold text-emerald-400">Architectural Concept & Overview</h2>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {project.description}
              </p>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-3">
                  Signature Architectural Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200/10 text-xs font-mono">
                <div>
                  <p className="text-zinc-400">Architect Practice</p>
                  <p className="font-bold text-zinc-200 mt-0.5">{project.architect}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Carpet Area</p>
                  <p className="font-bold text-zinc-200 mt-0.5">{project.carpetArea}</p>
                </div>
                <div>
                  <p className="text-zinc-400">Target Possession</p>
                  <p className="font-bold text-emerald-400 mt-0.5">{project.possessionDate}</p>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className={`p-8 rounded-3xl border shadow-lg space-y-6 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <h2 className="text-2xl font-serif font-bold">Resort & Private Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.amenities.map((a, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 ${
                      darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Floor Plans */}
            <div className={`p-8 rounded-3xl border shadow-lg space-y-6 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold">Bespoke Floor Plans</h2>
                  <p className="text-xs text-zinc-400 mt-1">Select layout tier to view blueprint dimensions and specs.</p>
                </div>

                <div className="flex items-center gap-2">
                  {project.floorPlans.map((fp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFloorPlan(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedFloorPlan === idx
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {fp.bhk}
                    </button>
                  ))}
                </div>
              </div>

              {project.floorPlans[selectedFloorPlan] && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4">
                  <div className="md:col-span-7 rounded-2xl overflow-hidden border border-zinc-800 bg-black h-64 sm:h-80 relative group">
                    <img
                      src={project.floorPlans[selectedFloorPlan].image}
                      alt={project.floorPlans[selectedFloorPlan].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <h3 className="text-lg font-serif font-bold text-emerald-400">
                      {project.floorPlans[selectedFloorPlan].title}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 space-y-1">
                      <p>Total Area: <strong className="text-white">{project.floorPlans[selectedFloorPlan].area}</strong></p>
                      <p>Estimated Pricing: <strong className="text-emerald-400">{project.floorPlans[selectedFloorPlan].price}</strong></p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      {project.floorPlans[selectedFloorPlan].specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleDownloadBrochure}
                      className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" /> Download High-Res Blueprint
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Construction Progress Percentage Tracker */}
            <div className={`p-8 rounded-3xl border shadow-lg space-y-6 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold">Construction Progress</h2>
                  <p className="text-xs text-zinc-400 mt-1">Live updates from site civil engineers.</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-serif font-extrabold text-emerald-400">
                    {project.completionPercentage}%
                  </span>
                  <p className="text-[10px] text-zinc-400 uppercase font-mono">Completed</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-800 rounded-full transition-all duration-1000"
                  style={{ width: `${project.completionPercentage}%` }}
                />
              </div>

              {/* Milestones list */}
              <div className="space-y-3 pt-4">
                {project.constructionMilestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-xs">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${m.percentage === 100 ? 'text-emerald-500' : 'text-zinc-500'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>{m.stage}</span>
                        <span className="text-zinc-400 font-mono">{m.date}</span>
                      </div>
                      <p className="text-zinc-400 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sticky Inquiry Form */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl ${
              darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}>
              
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Priority Access Desk
                </span>
                <h3 className="text-xl font-serif font-bold mt-2">Inquire About {project.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Connect directly with the developer sales director for pricing sheets & custom unit availability.
                </p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. David Sterling"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Private Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="e.g. david@sterling.com"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Phone Number *</label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+1 (310) 000-0000"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold border outline-none ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Custom Request / Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Preferred floor tier, customization requests..."
                    className={`w-full p-3 rounded-xl text-xs font-semibold border outline-none ${
                      darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquirySubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 border border-emerald-500/30 shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{inquirySubmitting ? 'Sending…' : 'Submit Priority Inquiry'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={project.galleryImages}
        currentIndex={currentImgIndex}
        setCurrentIndex={setCurrentImgIndex}
        title={`${project.title} - Architectural Gallery`}
      />

      {/* Virtual Tour Modal */}
      {virtualTourOpen && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full p-6 text-white relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-serif font-bold text-emerald-400">
                Virtual 3D Interactive Walkthrough - {project.title}
              </h3>
              <button
                onClick={() => setVirtualTourOpen(false)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs"
              >
                Close ✕
              </button>
            </div>

            <div className="h-96 rounded-2xl bg-black flex flex-col items-center justify-center text-center p-6 relative overflow-hidden border border-zinc-800">
              <img
                src={project.heroImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative z-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <h4 className="text-xl font-bold">Interactive VR Walkthrough Ready</h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Use your mouse or VR headset to explore room dimensions, circadian daylight simulation, and interior finishes in high definition.
                </p>
                <button
                  onClick={() => onShowToast('3D Matterport VR Simulator loaded.', 'success')}
                  className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Launch 360° VR Camera
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
