import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';
import { MOCK_TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Building2, Play } from 'lucide-react';

interface TestimonialsPageProps {
  darkMode: boolean;
}

export default function Testimonials({ darkMode = true }: TestimonialsPageProps) {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Client Testimonials' }]} darkMode={true} />

        <SectionHeader
          badge="Verified Owner Reviews"
          title="Stories From Our Happy Homeowners"
          subtitle="Discover how MNA Realestate and Construction delivered architectural perfection, financial trust, and transparent onboarding for our homeowners."
          darkMode={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900 flex flex-col justify-between shadow-xl relative overflow-hidden text-white"
            >
              <Quote className="absolute top-4 right-4 w-16 h-16 text-amber-500/10 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className={`text-sm italic font-serif leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{t.review}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/10 mt-6 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                  <p className="text-[11px] text-amber-500 font-mono mt-0.5">{t.projectPurchased}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
