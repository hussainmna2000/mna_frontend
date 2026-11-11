import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  darkMode?: boolean;
}

export default function Breadcrumb({ items, darkMode = false }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium my-4 py-2 px-1 overflow-x-auto no-scrollbar">
      <Link
        to="/"
        className={`flex items-center gap-1 hover:underline transition-colors ${
          darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Home className="w-3.5 h-3.5 text-emerald-500" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 shrink-0">
          <ChevronRight className={`w-3 h-3 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
          {item.path ? (
            <Link
              to={item.path}
              className={`hover:underline transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
