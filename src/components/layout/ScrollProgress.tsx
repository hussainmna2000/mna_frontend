import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      if (documentHeight - windowHeight > 0) {
        const percentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollPercentage(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-white transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
