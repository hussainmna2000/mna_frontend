import { Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../../data/mockData';
import ProjectCard from '../project/ProjectCard';
import SectionHeader from '../common/SectionHeader';
import { ArrowRight } from 'lucide-react';

interface FeaturedProjectsProps {
  darkMode?: boolean;
}

export default function FeaturedProjects({ darkMode = false }: FeaturedProjectsProps) {
  const featured = MOCK_PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className={`py-24 ${darkMode ? 'bg-[#09090b] text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Signature Portfolio"
          title="Featured Architectural Developments"
          subtitle="Explore our flagship residential mansions, oceanfront reserves, and sky penthouses crafted with uncompromising luxury."
          darkMode={darkMode}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} darkMode={darkMode} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 border border-emerald-500/20 shadow-xl shadow-emerald-950/40 hover:scale-105 transition-all"
          >
            <span>Explore All Developments ({MOCK_PROJECTS.length})</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
}
