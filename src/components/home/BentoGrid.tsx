import SectionHeader from '../common/SectionHeader';
import TiltCard from '../common/TiltCard';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Building2, 
  Layers, 
  Headphones, 
  CheckCircle2 
} from 'lucide-react';

interface BentoGridProps {
  darkMode?: boolean;
}

export default function BentoGrid({ darkMode = false }: BentoGridProps) {
  return (
    <section className={`py-24 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Uncompromising Excellence"
          title="Why Families Choose MNA Realestate & Construction"
          subtitle="Engineering architectural precision, financial security, and premium craftsmanship across every residential development."
          darkMode={darkMode}
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Bento Item 1: Large Feature - Premium Construction (Spans 2 cols, 2 rows) */}
          <div className="md:col-span-2 lg:col-span-2">
            <TiltCard className="h-full">
              <div className={`p-8 rounded-3xl h-full border flex flex-col justify-between relative overflow-hidden group shadow-xl ${
                darkMode ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-zinc-800' : 'bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white border-zinc-800'
              }`}>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl group-hover:bg-emerald-600/20 transition-all pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80"
                  alt="Construction Engineering"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity"
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-800 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-6">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Structural Precision
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    Strong Foundations & Durable Engineering
                  </h3>
                  <div className="text-zinc-300 text-sm mt-3 leading-relaxed space-y-2">
                    <p>
                      Every home is engineered with precision, ensuring strong foundations, structural stability, and lasting durability.
                    </p>
                    <p>
                      We use carefully selected, high-quality materials to deliver safe, reliable, and long-lasting construction.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs font-medium text-zinc-300">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Strong Foundations & Stability</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-Quality Materials</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 2: Architectural Excellence */}
          <div className="md:col-span-1 lg:col-span-2">
            <TiltCard className="h-full">
              <div className={`p-8 rounded-3xl h-full border flex flex-col justify-between shadow-lg ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-serif font-bold">Architectural Excellence</h4>
                  <div className={`text-sm mt-2 leading-relaxed space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <p>
                      Our talented and experienced architects thoughtfully design every space to combine modern aesthetics, functionality, and comfort.
                    </p>
                    <p>
                      From concept to completion, every detail is carefully planned to create beautiful homes that truly feel yours.
                    </p>
                  </div>
                </div>
                <div className="pt-4 text-xs font-mono text-emerald-400 font-semibold">
                  Modern Aesthetics & Comfort
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 3: Legal Approval */}
          <div className="md:col-span-1 lg:col-span-1">
            <TiltCard className="h-full">
              <div className={`p-6 rounded-3xl h-full border flex flex-col justify-between shadow-lg ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif font-bold">100% Legal & Title Approval</h4>
                  <p className={`text-xs mt-2 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Clear title deeds, zero encumbrances, and verified legal documentation prior to handover.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 4: Premium Material Quality */}
          <div className="md:col-span-1 lg:col-span-1">
            <TiltCard className="h-full">
              <div className={`p-6 rounded-3xl h-full border flex flex-col justify-between shadow-lg ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif font-bold">Premium Material Quality</h4>
                  <div className={`text-xs mt-2 leading-relaxed space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <p>
                      We use carefully selected, high-quality construction materials from trusted sources to ensure strength, safety, and durability.
                    </p>
                    <p>
                      Every material is chosen to deliver lasting performance, superior finish, and long-term value for your home.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 5: On-Time Delivery */}
          <div className="md:col-span-1 lg:col-span-1">
            <TiltCard className="h-full">
              <div className={`p-6 rounded-3xl h-full border flex flex-col justify-between shadow-lg ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif font-bold">On-Time Delivery</h4>
                  <div className={`text-xs mt-2 leading-relaxed space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <p>
                      We follow a well-planned construction process to keep every project on schedule and minimize unnecessary delays.
                    </p>
                    <p>
                      Our dedicated team ensures timely completion and handover, so you can move into your dream home with confidence.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Bento Item 6: Dedicated Customer Support */}
          <div className="md:col-span-1 lg:col-span-1">
            <TiltCard className="h-full">
              <div className={`p-6 rounded-3xl h-full border flex flex-col justify-between shadow-lg ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif font-bold">Dedicated Customer Support</h4>
                  <div className={`text-xs mt-2 leading-relaxed space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <p>
                      Our dedicated team is always ready to assist you with clear communication and reliable support throughout your property journey.
                    </p>
                    <p>
                      From choosing your property to final handover, we’re here to guide you every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
