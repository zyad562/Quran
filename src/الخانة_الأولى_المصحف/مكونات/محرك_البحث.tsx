import React from 'react';
import { motion } from 'motion/react';
import { Search, X, BookOpen, Loader2 } from 'lucide-react';
import { useQuranSearch } from '../منطق_البحث';
import { QuranTheme } from '../types';

interface QuranSearchProps {
  theme: QuranTheme;
  onSelect: (page: number) => void;
  onClose: () => void;
}

export default function QuranSearch({ theme, onSelect, onClose }: QuranSearchProps) {
  const { searchQuery, setSearchQuery, searchResults, جاري_البحث } = useQuranSearch();

  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 md:p-8 flex flex-col items-center"
    >
      <motion.div 
        initial={{ y: -20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className={`w-full max-w-xl ${isDark ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gold-400/20'}`}
      >
        <div className="p-4 border-b border-gold-400/10 flex items-center gap-3">
          {جاري_البحث ? (
            <Loader2 className="w-5 h-5 text-gold-500 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gold-500" />
          )}
          <input 
            autoFocus
            type="text"
            placeholder="ابحث عن سورة، آية، أو كلمة..."
            className={`flex-1 bg-transparent outline-none font-amiri text-xl ${isDark ? 'text-gray-200' : 'text-olive-700'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {searchResults.length > 0 ? (
            searchResults.map(result => (
              <button
                key={result.id}
                onClick={() => onSelect(result.page)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gold-400/10 transition-colors group text-right`}
              >
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                  <div className="flex-1 text-right">
                    <div className={`font-amiri text-xl truncate ${isDark ? 'text-gray-200' : 'text-olive-700'}`}>{result.title}</div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest truncate">{result.subtitle}</div>
                  </div>
                </div>
                <div className="text-xs opacity-40 shrink-0">صفحة {result.page}</div>
              </button>
            ))
          ) : searchQuery && !جاري_البحث ? (
            <div className="p-12 text-center opacity-40">لا توجد نتائج للبحث</div>
          ) : (
            <div className="p-12 text-center opacity-40 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gold-500" />
              </div>
              <p className="font-amiri text-lg">ابدأ الكتابة للبحث في المصحف الشريف</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* النقر خارج الصندوق للإغلاق */}
      <div className="flex-1 w-full" onClick={onClose} />
    </motion.div>
  );
}
