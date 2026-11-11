import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { MapPin, BedDouble, Maximize, Calendar, ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  darkMode?: boolean;
}

export default function ProjectCard({ project, darkMode = true }: ProjectCardProps) {
  return (
    <div className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl flex flex-col ${
      darkMode 
        ? 'bg-zinc-900 border-zinc-800 text-white hover:border-emerald-500/50' 
        : 'bg-white border-zinc-200 text-zinc-900 hover:border-emerald-500/50'
    }`}>
      
      {/* Top Image Container */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
        <img
          src={project.heroImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
            project.status === 'Ready to Move'
              ? 'bg-emerald-600 text-white'
              : project.status === 'Under Construction'
              ? 'bg-zinc-900 text-white border border-zinc-700'
              : 'bg-zinc-800 text-white'
          }`}>
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/80 text-zinc-200 backdrop-blur-md border border-white/10">
            {project.type}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white gap-2">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">
              {project.priceStarting.startsWith('Get Quote') ? 'Pricing' : 'Starting Price'}
            </p>
            <p className={`${
              project.priceStarting.startsWith('Get Quote')
                ? 'text-base sm:text-lg font-bold'
                : 'text-xl sm:text-2xl font-extrabold'
            } font-serif text-emerald-400`}>
              {project.priceStarting}
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-300 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 shrink-0">
            RERA Certified
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{project.location}, {project.city}</span>
          </div>

          <h3 className={`text-xl font-serif font-bold group-hover:text-emerald-500 transition-colors ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}>
            {project.title}
          </h3>

          <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {project.tagline}
          </p>
        </div>

        {/* Specs Pill Grid */}
        <div className={`grid grid-cols-3 gap-2 py-3 border-y text-xs font-medium ${
          darkMode ? 'border-zinc-800 text-zinc-300' : 'border-zinc-100 text-zinc-700'
        }`}>
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{project.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{project.carpetArea.split(' ')[0]} Sq.Ft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{project.possessionDate}</span>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pt-1 flex items-center justify-between">
          <span className="text-xs text-zinc-400 font-mono">
            {project.architect.split(' ')[0]} Architecture
          </span>

          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
