interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  darkMode?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  darkMode = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight ${
        darkMode ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg mt-3 leading-relaxed ${
          darkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
