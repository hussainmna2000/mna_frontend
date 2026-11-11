import { COMPANY_STATS } from '../../data/mockData';
import { Building2, Heart, Shield, Users } from 'lucide-react';

interface StatsSectionProps {
  darkMode?: boolean;
}

export default function StatsSection({ darkMode = false }: StatsSectionProps) {
  const icons = [Building2, Shield, Heart, Users];

  return (
    <section className={`py-16 border-y ${
      darkMode ? 'bg-black border-zinc-800 text-white' : 'bg-black text-white border-zinc-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          {COMPANY_STATS.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="pt-6 lg:pt-0 lg:px-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-400 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
