import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeroProps {
  darkMode?: boolean;
}

export default function Hero({ darkMode = true }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-white">
      
      {/* Background Hero Image / Video Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="MNA Realestate and Construction Modern Individual House"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.45] scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-600/20 blur-[120px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-xl mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>MNA Real Estate &amp; Construction</span>
        </div>

        {/* Main Animated Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight leading-[1.15] text-white">
            “Making Property Ownership{' '}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-emerald-400 bg-clip-text text-transparent">
              Possible for Everyone.”
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
            Modern individual houses, bespoke family residences, and clear-title land plots engineered with superior craftsmanship in Padiyur Ottapalayam.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/book-visit"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 border border-emerald-500/30 shadow-2xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-5 h-5 text-white" />
              <span>Book Private Site Visit</span>
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-zinc-100 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md hover:text-white transition-all hover:scale-105"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5 text-emerald-500" />
            </Link>
          </div>

          {/* Key Trust Highlights */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-zinc-300 font-medium border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% RERA & Legal Title Clear</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Guaranteed On-Time Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>20+ Years of Experience</span>
            </div>
          </div>
        </div>

        {/* Floating Property Search Widget */}
        <div className="mt-12 sm:mt-16">
          <SearchBar darkMode={true} />
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 text-center pt-8">
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
          Scroll to Explore Developments
        </span>
      </div>

    </section>
  );
}
