import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';
import { MOCK_TEAM, COMPANY_STATS } from '../data/mockData';
import { ShieldCheck, Heart, Sparkles, Building2, Target, Eye } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode = true }: AboutProps) {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'About MNA Realestate & Construction' }]} darkMode={true} />

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16 p-8 sm:p-16 border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="MNA Architectural Studio"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-25 brightness-50"
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-600 text-white shadow-md">
              <Building2 className="w-4 h-4 text-white" /> 20+ Years of Experience
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight">
              20+ Years of Building Quality Homes
            </h1>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              Founded on the principles of structural perfection, uncompromising honesty, and dedicated client service, MNA Realestate and Construction is recognized as a trusted partner for individual homes and residential land plots in Padiyur Ottapalayam.
            </p>
          </div>
        </div>

        {/* Company Story & Chairman's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Our Heritage & Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Crafting Residences That Outlast Generations
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              With over 20+ years of experience in construction and property development, MNA Realestate has been dedicated to making quality property ownership possible for families across Padiyur Ottapalayam and surrounding areas.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              Every MNA Realestate home is built with top-grade materials, meticulous architectural planning, and clear legal title documentation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-2xl font-serif font-bold text-emerald-400">48+</p>
                <p className="text-xs text-zinc-400 mt-0.5">Completed Developments</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white">
                <p className="text-2xl font-serif font-bold text-emerald-400">100%</p>
                <p className="text-xs text-zinc-400 mt-0.5">On-Time Completion Rate</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/founder.jpg"
                  onError={(e) => {
                    // Fallback to high quality placeholder if local image is not yet in public folder
                    (e.target as HTMLImageElement).src = MOCK_TEAM[0].image;
                  }}
                  alt={MOCK_TEAM[0].name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-emerald-500 shadow-md shrink-0"
                />
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">{MOCK_TEAM[0].name}</h3>
                  <p className="text-xs text-emerald-400 font-mono">{MOCK_TEAM[0].role}</p>
                </div>
              </div>

              <blockquote className="text-sm italic text-zinc-300 font-serif leading-relaxed mb-4">
                “I believe owning a home should never remain just a dream. At MNA Realestate &amp; Construction, our vision is to make quality homes and properties affordable, trustworthy, and accessible to every family. Through strong engineering, carefully selected materials, honest pricing, timely delivery, and dedicated customer support, we strive to build more than just houses—we build safe, lasting homes where families can create memories and a better future.”
              </blockquote>

              <div className="text-right pt-2 border-t border-zinc-800">
                <p className="text-sm font-serif font-bold text-white tracking-wider">MOHAMMED FAROOK</p>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">Founder &amp; Visionary, MNA Realestate &amp; Construction</p>
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 text-white">Our Vision</h3>
              <p className="text-base font-serif italic text-emerald-400 font-semibold mb-3">
                “A home for every family.”
              </p>
              <p className="text-sm leading-relaxed text-zinc-300">
                We envision a future where every person has the opportunity to own a safe, comfortable, and quality home. Our goal is to make homeownership more accessible through affordable properties, quality construction, and reliable financial assistance, helping families turn the dream of owning a home into a lasting reality.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-white">Our Mission</h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                Our mission is to make quality homeownership affordable and accessible to every family. We are committed to delivering well-engineered homes and residential plots using quality materials, transparent pricing, timely delivery, and dependable loan assistance—while building lasting trust with every customer.
              </p>
            </div>
          </div>

        </div>

        {/* Guided by Master Visionaries */}
        <div className="mb-20">
          <SectionHeader
            badge="Leadership & Advisory"
            title="Guided by Master Visionaries"
            subtitle="Leadership and strategic advisory dedicated to quality construction, transparency, and accessible homeownership for every family."
            darkMode={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mohammed Farook - Founder */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 sm:p-10 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
              <div>
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-6 border-2 border-emerald-500/40 shadow-lg">
                  <img
                    src="/founder.jpg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = MOCK_TEAM[0].image;
                    }}
                    alt="MOHAMMED FAROOK"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold text-center tracking-wider text-white">
                  MOHAMMED FAROOK
                </h3>
                <p className="text-xs text-emerald-400 font-mono font-semibold text-center tracking-wide mt-1 mb-6">
                  Founder &amp; Visionary, MNA Realestate &amp; Construction
                </p>
                <div className="w-12 h-0.5 bg-emerald-500/40 mx-auto mb-6" />
                <p className="text-sm leading-relaxed text-zinc-300">
                  Pioneering affordable, trustworthy, and high-quality homeownership for families across Padiyur Ottapalayam with over 20+ years of construction excellence. Committed to delivering safe, durable homes where families can build lasting memories.
                </p>
              </div>
            </div>

            {/* Kalimullah - Chief Advisor */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 sm:p-10 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
              <div>
                <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mb-6 shadow-inner text-emerald-400">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-center tracking-wider text-white">
                  KALIMULLAH
                </h3>
                <p className="text-xs text-emerald-400 font-mono font-semibold text-center tracking-wide mt-1 mb-6">
                  Chief Advisor, MNA Realestate &amp; Construction
                </p>
                <div className="w-12 h-0.5 bg-emerald-500/40 mx-auto mb-6" />
                <p className="text-sm leading-relaxed text-zinc-300">
                  With extensive insight and strategic guidance, <strong className="text-white font-semibold">KALIMULLAH</strong> plays a key role in shaping the vision and direction of MNA Realestate &amp; Construction. His experience, thoughtful leadership, and commitment to quality help us make better decisions, maintain high standards, and stay focused on our goal of making quality homeownership accessible to every family.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
