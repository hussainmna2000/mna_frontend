import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-zinc-900/90 text-emerald-400 border border-zinc-800 backdrop-blur-md shadow-2xl hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all hover:scale-110 active:scale-95 group"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
