import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/layout/Breadcrumb';
import ProjectCard from '../components/project/ProjectCard';
import SectionHeader from '../components/common/SectionHeader';
import { MOCK_PROJECTS } from '../data/mockData';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  LayoutGrid, 
  List, 
  MapPin, 
  DollarSign, 
  Home, 
  BedDouble, 
  CheckCircle2 
} from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

export default function Projects({ darkMode = true }: ProjectsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state initialized from query parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [budgetFilter, setBudgetFilter] = useState(searchParams.get('budget') || '');
  const [bedroomsFilter, setBedroomsFilter] = useState(searchParams.get('bedrooms') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query) || p.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc) return false;
      }

      // City filter
      if (cityFilter && p.city !== cityFilter) return false;

      // Type filter
      if (typeFilter && p.type !== typeFilter) return false;

      // Status filter
      if (statusFilter && p.status !== statusFilter) return false;

      // Bedrooms filter
      if (bedroomsFilter && !p.bedrooms.toLowerCase().includes(bedroomsFilter.toLowerCase().trim())) return false;

      // Budget filter (Indian Rupees)
      if (budgetFilter) {
        if (budgetFilter === 'below-20lacs' && (p.priceNumeric === 0 || p.priceNumeric > 2000000)) return false;
        if (budgetFilter === 'below-30lacs' && (p.priceNumeric === 0 || p.priceNumeric > 3000000)) return false;
        if (budgetFilter === 'above-30lacs' && (p.priceNumeric > 0 && p.priceNumeric < 3000000)) return false;
      }

      return true;
    });
  }, [searchQuery, cityFilter, typeFilter, budgetFilter, bedroomsFilter, statusFilter]);

  const handleReset = () => {
    setSearchQuery('');
    setCityFilter('');
    setTypeFilter('');
    setBudgetFilter('');
    setBedroomsFilter('');
    setStatusFilter('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Developments & Projects' }]} darkMode={true} />

        <SectionHeader
          badge="Full Master Portfolio"
          title="Explore Our Luxury Residential Developments"
          subtitle="Discover private mansions, coastal estates, and sky penthouses currently available for reservation and private preview."
          darkMode={true}
        />

        {/* Main Search & Layout Header Controls */}
        <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold border outline-none bg-zinc-950 border-zinc-800 text-white focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-zinc-400 font-mono">
              Showing <strong className="text-emerald-400">{filteredProjects.length}</strong> developments
            </span>

            {/* View Mode Toggle */}
            <div className="p-1 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar + Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-3 p-6 rounded-3xl border border-zinc-800 bg-zinc-900 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b pb-4 border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-400" /> Filter Projects
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2">Location / City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border outline-none bg-zinc-950 border-zinc-800 text-white"
              >
                <option value="">All Locations</option>
                <option value="PADIYUR OTTAPALAYAM">PADIYUR OTTAPALAYAM</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2">Budget Range (₹)</label>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border outline-none bg-zinc-950 border-zinc-800 text-white"
              >
                <option value="">Any Budget</option>
                <option value="below-20lacs">Below 20 Lakhs</option>
                <option value="below-30lacs">Below 30 Lakhs</option>
                <option value="above-30lacs">Above 30 Lakhs</option>
              </select>
            </div>

            {/* Number of Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2">No. of Bedrooms</label>
              <select
                value={bedroomsFilter}
                onChange={(e) => setBedroomsFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border outline-none bg-zinc-950 border-zinc-800 text-white"
              >
                <option value="">All Bedrooms</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="2+ BHK">2+ BHK</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2">Property Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border outline-none bg-zinc-950 border-zinc-800 text-white"
              >
                <option value="">All Types</option>
                <option value="1 BHK Individual House">1 BHK Individual House</option>
                <option value="2 BHK Individual House">2 BHK Individual House</option>
                <option value="Customized Type">Customized Type</option>
                <option value="Land">Land</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2">Project Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border outline-none bg-zinc-950 border-zinc-800 text-white"
              >
                <option value="">All Statuses</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

          </div>

          {/* Right Main Projects Area */}
          <div className="lg:col-span-9">
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-zinc-800 bg-zinc-900">
                <p className="text-lg font-bold text-emerald-400">No properties matched your specific criteria.</p>
                <p className="text-xs text-zinc-400 mt-2">Try adjusting your filters or search terms.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                  : 'space-y-6'
              }>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} darkMode={true} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
