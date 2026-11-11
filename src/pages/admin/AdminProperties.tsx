import React, { useEffect, useState } from 'react';
import {
  Home,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  RefreshCw,
  Building2,
  MapPin,
  X,
  CheckCircle2,
} from 'lucide-react';
import { apiClient, PropertyItem } from '../../api/client';

export default function AdminProperties() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyItem | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [type, setType] = useState('custom');
  const [status, setStatus] = useState('under_construction');
  const [location, setLocation] = useState('Padiyur Ottapalayam, Tirupur');
  const [priceStarting, setPriceStarting] = useState('₹75 Lakhs');
  const [bedrooms, setBedrooms] = useState('3 & 4 BHK');
  const [carpetArea, setCarpetArea] = useState('2,200 sq.ft');
  const [possessionDate, setPossessionDate] = useState('December 2026');
  const [completionPercentage, setCompletionPercentage] = useState(50);
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await apiClient.properties.list({ page_size: 50 });
      setProperties(res.items);
      setTotal(res.total);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to fetch properties.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleOpenCreate = () => {
    setEditingProperty(null);
    setTitle('');
    setSlug('');
    setTagline('');
    setType('custom');
    setStatus('under_construction');
    setLocation('Padiyur Ottapalayam, Tirupur');
    setPriceStarting('₹75 Lakhs');
    setBedrooms('3 & 4 BHK');
    setCarpetArea('2,200 sq.ft');
    setPossessionDate('December 2026');
    setCompletionPercentage(50);
    setHeroImage('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (p: PropertyItem) => {
    setEditingProperty(p);
    setTitle(p.title);
    setSlug(p.slug);
    setTagline(p.tagline || '');
    setType(p.type);
    setStatus(p.status);
    setLocation(p.location);
    setPriceStarting(p.price_starting);
    setBedrooms(p.bedrooms);
    setCarpetArea(p.carpet_area);
    setPossessionDate(p.possession_date);
    setCompletionPercentage(p.completion_percentage);
    setHeroImage(p.hero_image);
    setDescription(p.description);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Partial<PropertyItem> = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        tagline,
        type,
        status,
        location,
        city: 'Padiyur Ottapalayam',
        price_starting: priceStarting,
        bedrooms,
        carpet_area: carpetArea,
        possession_date: possessionDate,
        completion_percentage: Number(completionPercentage),
        hero_image: heroImage,
        description,
        highlights: ['Vastu Compliant', 'Clear Title Deeds', '24/7 Security'],
        amenities: ['Clubhouse', 'Gated Perimeter', 'Internal Blacktop Roads'],
        gallery_images: [],
      };

      if (editingProperty) {
        const updated = await apiClient.admin.updateProperty(editingProperty.id, payload);
        setProperties((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const created = await apiClient.admin.createProperty(payload);
        setProperties((prev) => [created, ...prev]);
        setTotal((prev) => prev + 1);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to save property listing.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this property listing?')) return;
    try {
      await apiClient.admin.deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete property.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
            <Home className="w-6 h-6 text-emerald-400" />
            <span>Property & Construction Projects Catalog</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage villas, individual houses, residential plots, and ongoing developments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProperties}
            className="px-3.5 py-2 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Listing</span>
          </button>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-zinc-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
            <span>Loading properties...</span>
          </div>
        ) : properties.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-zinc-500">
            No properties found in database.
          </div>
        ) : (
          properties.map((p) => (
            <div
              key={p.id}
              className="bg-[#0e121b] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={p.hero_image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                      {p.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-[10px] font-medium text-white shadow">
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-xs font-bold text-white font-mono">
                    {p.price_starting}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{p.location}</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/60 font-mono">
                    <span>{p.bedrooms}</span>
                    <span>{p.carpet_area}</span>
                    <span className="text-emerald-400 font-semibold">{p.completion_percentage}% Done</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-zinc-900/40 border-t border-zinc-800 flex items-center justify-between">
                <a
                  href={`/projects/${p.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    title="Edit Property"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e121b] border border-zinc-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-base font-serif font-bold text-white">
                {editingProperty ? 'Edit Property Listing' : 'Create New Property Listing'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Property Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. MNA Grandeur Residences"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. mna-grandeur-residences"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Tagline / Subheading</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Ultra-Luxury Gated Community of 4BHK Bespoke Villas"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Category Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="custom">Custom Villa / House</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="2bhk">2 BHK</option>
                    <option value="land">Residential Land / Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Development Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="under_construction">Under Construction</option>
                    <option value="ready_to_move">Ready to Move</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={priceStarting}
                    onChange={(e) => setPriceStarting(e.target.value)}
                    placeholder="₹85 Lakhs"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Bedrooms / Units</label>
                  <input
                    type="text"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="3 & 4 BHK"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Carpet Area</label>
                  <input
                    type="text"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    placeholder="2,450 sq.ft"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Completion % (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={completionPercentage}
                    onChange={(e) => setCompletionPercentage(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Location Details</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Padiyur Ottapalayam, Tirupur, 641605"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Hero Image URL</label>
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Detailed Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Architectural overview, specifications, fittings..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProperty ? 'Update Listing' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

