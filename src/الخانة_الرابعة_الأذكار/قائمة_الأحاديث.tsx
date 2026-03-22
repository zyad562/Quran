import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Quote, Info, ChevronLeft, BookOpen, Star, User } from 'lucide-react';
import { HADITH_DATA } from './بيانات_الأحاديث';
import { Hadith } from './أنواع_الأحاديث';

interface HadithListProps {
  على_الرجوع: () => void;
  تنسيق_ليلي?: boolean;
}

/**
 * مكون قائمة الأحاديث (Hadith List Component)
 * يعرض الأحاديث النبوية في بطاقات فخمة مع شرح لكل حديث
 */
export const قائمة_الأحاديث: React.FC<HadithListProps> = ({ على_الرجوع }) => {
  const [بحث, setبحث] = useState('');
  const [الحديث_المختار, setالحديث_المختار] = useState<Hadith | null>(null);

  const الأحاديث_المصفاة = useMemo(() => {
    return HADITH_DATA.filter(h => 
      h.text.includes(بحث) || 
      h.narrator.includes(بحث) || 
      h.category.includes(بحث)
    );
  }, [بحث]);

  return (
    <div className="h-full flex flex-col bg-cream-50 overflow-hidden" dir="rtl">
      {/* محرك البحث */}
      <div className="p-4 flex items-center gap-3">
        <button 
          onClick={على_الرجوع}
          className="p-2 hover:bg-olive-600/5 rounded-full transition-colors text-olive-600 shrink-0"
        >
          <ChevronLeft className="w-6 h-6 rotate-180" />
        </button>
        <div className="relative group flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-olive-400 w-5 h-5 group-focus-within:text-olive-600 transition-colors" />
          <input
            type="text"
            placeholder="ابحث عن حديث أو موضوع..."
            value={بحث}
            onChange={(e) => setبحث(e.target.value)}
            className="w-full bg-white border border-gold-400/20 rounded-2xl py-3 pr-12 pl-4 text-olive-700 focus:outline-none focus:ring-2 focus:ring-olive-600/10 focus:border-olive-600 transition-all font-amiri text-lg"
          />
        </div>
      </div>

      {/* قائمة الأحاديث */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4 hide-scrollbar">
        <AnimatePresence mode="popLayout">
          {الأحاديث_المصفاة.map((حديث, index) => (
            <motion.div
              key={حديث.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              {/* بطاقة الحديث الفخمة */}
              <div className="bg-white p-6 rounded-[2rem] border border-gold-400/10 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                {/* زخرفة خلفية بسيطة */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gold-400/5 rounded-full blur-xl group-hover:bg-gold-400/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gold-400/10 rounded-lg flex items-center justify-center text-gold-600">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-400/10">
                      {حديث.category}
                    </span>
                  </div>
                  
                  {/* زر شرح الحديث */}
                  <button 
                    onClick={() => setالحديث_المختار(حديث)}
                    className="p-2 bg-olive-600/5 text-olive-600 rounded-xl hover:bg-olive-600/10 transition-all"
                    title="شرح الحديث"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative">
                  <Quote className="absolute -right-2 -top-2 w-8 h-8 text-gold-400/10 rotate-180" />
                  <p className="font-quran text-xl leading-loose text-olive-900 text-center px-2 py-4">
                    {حديث.text}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gold-400/5 flex items-center justify-between text-[11px] text-olive-600/60 font-medium">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>عن {حديث.narrator}</span>
                  </div>
                  <span className="italic">{حديث.source}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {الأحاديث_المصفاة.length === 0 && (
          <div className="text-center py-12 opacity-40">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-olive-300" />
            <p className="font-amiri text-lg">لم يتم العثور على أحاديث تطابق بحثك</p>
          </div>
        )}
      </div>

      {/* نافذة شرح الحديث */}
      <AnimatePresence>
        {الحديث_المختار && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setالحديث_المختار(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-cream-50 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => setالحديث_المختار(null)}
                    className="p-2 hover:bg-olive-600/5 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-olive-600 rotate-180" />
                  </button>
                  <h3 className="text-xl font-amiri font-bold text-olive-700">شرح الحديث</h3>
                  <div className="w-10" />
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gold-400/20 shadow-inner">
                    <p className="font-quran text-lg leading-relaxed text-olive-900 text-center">
                      "{الحديث_المختار.text}"
                    </p>
                  </div>

                  <div className="bg-olive-600/5 p-6 rounded-3xl border border-olive-600/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-olive-600/10 rounded-xl flex items-center justify-center text-olive-600">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-olive-600/60 font-bold uppercase tracking-wider">الراوي والمصدر</p>
                        <p className="text-sm font-bold text-olive-800">عن {الحديث_المختار.narrator} - {الحديث_المختار.source}</p>
                      </div>
                    </div>
                    
                    {الحديث_المختار.explanation && (
                      <div className="mt-4 pt-4 border-t border-olive-600/10">
                        <h4 className="text-sm font-bold text-olive-700 mb-2">تفسير مبسط:</h4>
                        <p className="text-sm text-olive-600 leading-relaxed text-justify">
                          {الحديث_المختار.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setالحديث_المختار(null)}
                  className="w-full mt-8 bg-olive-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-olive-600/20 hover:bg-olive-700 transition-all active:scale-95"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default قائمة_الأحاديث;
