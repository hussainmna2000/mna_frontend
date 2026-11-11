import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
  title?: string;
}

export default function LightboxModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
  title
}: LightboxModalProps) {
  if (!isOpen || !images.length) return null;

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
        <span className="text-sm font-semibold tracking-wide text-slate-300">
          {title ? title : `Image ${currentIndex + 1} of ${images.length}`}
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={title || `Gallery preview ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />

        {/* Prev & Next Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white transition-colors shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white transition-colors shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto max-w-full p-2 bg-slate-900/80 rounded-2xl border border-slate-800">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
