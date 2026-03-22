import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Bookmark, BookmarkCheck, List, Search } from 'lucide-react';
import { بيانات_السور } from './بيانات_السور';

interface Props {
  initialPage: number;
  onOpenIndex: () => void;
  onOpenSearch: () => void;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function مصحف_مفتوح({ initialPage, onOpenIndex, onOpenSearch }: Props) {
  const [page, setPage] = useState(initialPage);
  const [direction, setDirection] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const currentSurah = useMemo(() => {
    let current = بيانات_السور[0];
    for (const surah of بيانات_السور) {
      if (surah.startPage <= page) {
        current = surah;
      } else {
        break;
      }
    }
    return current;
  }, [page]);

  // Load bookmark status
  useEffect(() => {
    const savedPage = localStorage.getItem('quran_bookmark');
    if (savedPage && parseInt(savedPage) === page) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
    // Save last read page
    localStorage.setItem('quran_last_read', page.toString());
  }, [page]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem('quran_bookmark');
      setIsBookmarked(false);
    } else {
      localStorage.setItem('quran_bookmark', page.toString());
      setIsBookmarked(true);
    }
  };

  const goToBookmark = () => {
    const savedPage = localStorage.getItem('quran_bookmark');
    if (savedPage) {
      setDirection(0);
      setPage(parseInt(savedPage));
    } else {
      alert('لا توجد صفحة محفوظة حالياً');
    }
  };

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 1 && newPage <= 604) {
      setDirection(newDirection);
      setPage(newPage);
    }
  };

  const handleDragEnd = (_e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    // In RTL, swiping right (positive offset/velocity) goes to the NEXT page.
    // Swiping left (negative offset/velocity) goes to the PREVIOUS page.
    if (swipe > swipeConfidenceThreshold) {
      paginate(1); // Next page
    } else if (swipe < -swipeConfidenceThreshold) {
      paginate(-1); // Previous page
    }
  };

  const paddedPage = page.toString().padStart(3, '0');
  const imageUrl = `https://android.quran.com/data/width_1024/page${paddedPage}.png`;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? -1000 : 1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? -1000 : 1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="flex flex-col h-full bg-cream-50 pt-[60px] overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gold-400/20 shadow-sm z-20">
        {/* Right side (RTL start) - Navigation */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenIndex}
            className="p-2 rounded-full hover:bg-cream-50 text-olive-700 transition-colors"
            title="الفهرس"
          >
            <List className="w-5 h-5" />
          </button>
          <button 
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-cream-50 text-olive-700 transition-colors"
            title="البحث في الآيات"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center - Info */}
        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <h2 className="font-amiri text-xl font-bold text-olive-700">سورة {currentSurah.name}</h2>
          <p className="text-sm text-olive-600/70 font-amiri font-bold">صفحة {page}</p>
        </div>

        {/* Left side (RTL end) - Bookmarks */}
        <div className="flex items-center gap-2">
          <button 
            onClick={goToBookmark}
            className="p-2 rounded-full hover:bg-cream-50 text-olive-700 transition-colors"
            title="الانتقال للعلامة المحفوظة"
          >
            <BookmarkCheck className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-gold-500 bg-gold-400/10' : 'text-olive-700 hover:bg-cream-50'}`}
            title={isBookmarked ? "إزالة العلامة" : "حفظ الصفحة"}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Reading Area */}
      <div className="flex-1 relative flex items-center justify-center bg-cream-50 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center md:p-8 touch-pan-y"
          >
            <div className="relative h-full w-full max-w-3xl flex items-center justify-center bg-white md:rounded-xl md:shadow-2xl overflow-hidden md:border border-gold-400/20">
              {/* Overlay to prevent image dragging default behavior */}
              <div className="absolute inset-0 z-10" />
              <img 
                src={imageUrl} 
                alt={`صفحة ${page} من القرآن الكريم`}
                className="w-full h-full object-contain pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Hints (Desktop) */}
        <button 
          onClick={() => paginate(-1)}
          disabled={page === 1}
          className="absolute left-4 z-20 p-4 rounded-full bg-white/80 shadow-md text-olive-700 hover:bg-white disabled:opacity-50 hidden md:block"
        >
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        <button 
          onClick={() => paginate(1)}
          disabled={page === 604}
          className="absolute right-4 z-20 p-4 rounded-full bg-white/80 shadow-md text-olive-700 hover:bg-white disabled:opacity-50 hidden md:block"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
