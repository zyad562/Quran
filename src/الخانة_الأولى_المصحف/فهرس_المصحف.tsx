import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { بيانات_السور } from './بيانات_السور';
import { BookOpen, Search, History, X, Sparkles, CalendarDays, ArrowRight } from 'lucide-react';

interface Props {
  onSelectPage: (page: number) => void;
  onOpenKhatma: () => void;
  onBack: () => void;
}

export default function فهرس_المصحف({ onSelectPage, onOpenKhatma, onBack }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'مكية' | 'مدنية'>('all');
  const [lastReadPage] = useState<number | null>(() => {
    const saved = localStorage.getItem('quran_last_read');
    return saved ? parseInt(saved) : null;
  });

  const lastReadSurah = useMemo(() => {
    if (!lastReadPage) return null;
    let current = بيانات_السور[0];
    for (const surah of بيانات_السور) {
      if (surah.startPage <= lastReadPage) {
        current = surah;
      } else {
        break;
      }
    }
    return current;
  }, [lastReadPage]);

  const filteredSurahs = useMemo(() => {
    return بيانات_السور.filter(surah => {
      const matchesSearch = surah.name.includes(searchQuery) || surah.id.toString().includes(searchQuery);
      const matchesFilter = filter === 'all' || surah.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  return (
    <div className="w-full h-full overflow-y-auto bg-cream-50 hide-scrollbar pt-[60px]" dir="rtl">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gold-400/20 px-6 py-8 shadow-sm">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm border border-gold-400/20 text-olive-600 hover:text-gold-600 transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="font-amiri text-3xl font-bold text-olive-900 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-gold-500" />
                    فهرس السور
                  </h1>
                  <p className="text-olive-600/70 font-amiri mt-1 text-lg">اختر السورة التي تود قراءتها</p>
                </div>
              </div>
              
              {/* Khatma Button */}
              <button
                onClick={onOpenKhatma}
                className="flex items-center gap-2 bg-gold-50 hover:bg-gold-100 text-gold-700 px-4 py-2 rounded-2xl border border-gold-400/30 transition-all group"
              >
                <CalendarDays className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-amiri font-bold">الختمة</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-6 bg-cream-50 p-4 rounded-2xl border border-gold-400/10">
              <div className="text-center">
                <p className="text-xs text-olive-600/50 uppercase font-bold tracking-wider">السور</p>
                <p className="text-xl font-bold text-olive-900">١١٤</p>
              </div>
              <div className="w-px h-8 bg-gold-400/20"></div>
              <div className="text-center">
                <p className="text-xs text-olive-600/50 uppercase font-bold tracking-wider">الأجزاء</p>
                <p className="text-xl font-bold text-olive-900">٣٠</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-olive-400 group-focus-within:text-gold-500 transition-colors" />
              <input
                type="text"
                placeholder="ابحث عن سورة بالاسم أو الرقم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream-50/50 border border-gold-400/20 rounded-2xl py-4 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-amiri text-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gold-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-olive-400" />
                </button>
              )}
            </div>
            
            <div className="flex bg-cream-50/50 p-1 rounded-2xl border border-gold-400/20">
              {(['all', 'مكية', 'مدنية'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-xl font-amiri text-sm font-bold transition-all ${
                    filter === f 
                      ? 'bg-gold-500 text-white shadow-md' 
                      : 'text-olive-600 hover:bg-gold-400/10'
                  }`}
                >
                  {f === 'all' ? 'الكل' : f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        
        {/* Last Read Section */}
        <AnimatePresence>
          {lastReadPage && lastReadSurah && !searchQuery && filter === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative overflow-hidden bg-gradient-to-br from-olive-900 to-olive-800 rounded-3xl p-6 text-white shadow-xl shadow-olive-900/20"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gold-500/20 p-3 rounded-2xl border border-gold-500/30">
                    <History className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-gold-400/80 text-xs font-bold uppercase tracking-widest mb-1">آخر قراءة</p>
                    <h2 className="text-2xl font-amiri font-bold">سورة {lastReadSurah.name}</h2>
                    <p className="text-sm text-gold-200 mt-1">صفحة {lastReadPage}</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectPage(lastReadPage)}
                  className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-2xl font-amiri font-bold transition-all flex items-center gap-2 group shadow-lg shadow-gold-500/20"
                >
                  مواصلة القراءة
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="pattern-hex" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M5 0L10 2.5V7.5L5 10L0 7.5V2.5L5 0Z" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#pattern-hex)" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah, index) => (
            <motion.button
              key={surah.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.5) }}
              onClick={() => onSelectPage(surah.startPage)}
              className="group relative flex items-center justify-between p-5 bg-white rounded-2xl border border-gold-400/10 hover:border-gold-500 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 text-right w-full"
            >
              <div className="flex items-center gap-5">
                {/* Number Badge */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 bg-cream-50 border border-gold-400/30 rotate-45 rounded-xl group-hover:rotate-90 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-700"></div>
                  <span className="relative z-10 font-amiri text-olive-700 font-bold text-lg group-hover:text-white transition-colors">{surah.id}</span>
                </div>
                
                {/* Surah Info */}
                <div className="text-right">
                  <h3 className="font-amiri text-2xl font-bold text-olive-900 group-hover:text-gold-600 transition-colors">
                    سورة {surah.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-olive-600/60 mt-1 font-amiri">
                    <span className={`px-2 py-0.5 rounded-lg ${surah.type === 'مكية' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                      {surah.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gold-400/30"></span>
                    <span>{surah.ayahs} آية</span>
                    <span className="w-1 h-1 rounded-full bg-gold-400/30"></span>
                    <span>صفحة {surah.startPage}</span>
                  </div>
                </div>
              </div>

              {/* Decorative Icon */}
              <div className="bg-cream-50/50 p-2 rounded-xl group-hover:bg-gold-50 transition-colors">
                <BookOpen className="w-5 h-5 text-gold-400 group-hover:text-gold-500 transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-400/10">
              <Search className="w-8 h-8 text-gold-300" />
            </div>
            <p className="font-amiri text-xl text-olive-600">لم يتم العثور على نتائج للبحث "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
