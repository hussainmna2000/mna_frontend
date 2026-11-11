import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Home, BedDouble, CheckCircle2 } from 'lucide-react';

interface SearchBarProps {
  darkMode?: boolean;
}

export default function SearchBar({ darkMode = false }: SearchBarProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [type, setType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (budget) params.set('budget', budget);
    if (type) params.set('type', type);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (status) params.set('status', status);

    navigate(`/projects?${params.toString()}`);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-3xl shadow-2xl border backdrop-blur-2xl transition-all ${
      darkMode 
        ? 'bg-[#09090b]/90 border-zinc-800 text-white' 
        : 'bg-white/95 border-zinc-200 text-zinc-900'
    }`}>
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        
        {/* Filter 1: Location */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Location
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none transition-colors ${
              darkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
            }`}
          >
            <option value="">All Locations</option>
            <option value="PADIYUR OTTAPALAYAM">PADIYUR OTTAPALAYAM</option>
          </select>
        </div>

        {/* Filter 2: Budget */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
            <span className="text-emerald-500 font-bold text-xs">₹</span> Price Range
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none transition-colors ${
              darkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
            }`}
          >
            <option value="">Any Budget</option>
            <option value="below-20lacs">Below 20 Lakhs</option>
            <option value="below-30lacs">Below 30 Lakhs</option>
            <option value="above-30lacs">Above 30 Lakhs</option>
          </select>
        </div>

        {/* Filter 3: Property Type */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-emerald-500" /> Property Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none transition-colors ${
              darkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
            }`}
          >
            <option value="">All Types</option>
            <option value="1 BHK Individual House">1 BHK Individual House</option>
            <option value="2 BHK Individual House">2 BHK Individual House</option>
            <option value="Customized Type">Customized Type</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Filter 4: Bedrooms */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 text-emerald-500" /> Bedrooms
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border outline-none transition-colors ${
              darkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
            }`}
          >
            <option value="">Any Bedrooms</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="2+ BHK">2+ BHK</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-black hover:from-emerald-500 hover:to-zinc-900 border border-emerald-500/30 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-4 h-4 text-white" />
            <span>Search Estates</span>
          </button>
        </div>

      </form>
    </div>
  );
}
