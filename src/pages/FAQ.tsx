import { useState } from 'react';
import Breadcrumb from '../components/layout/Breadcrumb';
import SectionHeader from '../components/common/SectionHeader';
import { MOCK_FAQS } from '../data/mockData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

interface FAQProps {
  darkMode: boolean;
}

export default function FAQ({ darkMode }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Booking & Payments',
    'Construction & Timelines',
    'Loans & Finance',
    'Handover & Legal',
    'Customization',
  ];

  const filteredFaqs = MOCK_FAQS.filter((f) => {
    if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!f.question.toLowerCase().includes(q) && !f.answer.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-black text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} darkMode={darkMode} />

        <SectionHeader
          badge="Buyer Guidance"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about reserving, financing, legal RERA titles, and customizing your MNA residence."
          darkMode={darkMode}
        />

        {/* Search & Category Header */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., RERA, home loans, customization)..."
              className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-semibold border outline-none ${
                darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 text-emerald-400 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 text-xs sm:text-sm leading-relaxed border-t pt-4 ${
                    darkMode ? 'border-zinc-800 text-zinc-300' : 'border-zinc-100 text-zinc-600'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
