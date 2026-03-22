import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { قارئ } from '../قائمة_السور_114';
import { المشغل_الذكي } from '../المشغل_الذكي';
import { تخزين_المفضلة } from '../تخزين_المفضلة';
import { Play, ArrowRight, Search, Heart } from 'lucide-react';
import { SURAHS } from '../../الخانة_الأولى_المصحف/types';

interface FullIndexProps {
  قارئ: قارئ;
  على_الرجوع: () => void;
  تنسيق_ليلي: boolean;
}

/**
 * مكون الفهرس الكامل (Full Index)
 * يعرض كافة السور الـ 114 للقارئ المختار مع دعم التخزين التلقائي والمفضلة
 */
export const الفهرس_الكامل: React.FC<FullIndexProps> = ({ قارئ, على_الرجوع, تنسيق_ليلي }) => {
  const [بحث, setبحث] = useState('');
  const [المفضلة, setالمفضلة] = useState<Set<number>>(new Set());

  // تحديث حالة المفضلة عند فتح القائمة
  useEffect(() => {
    const تحديث_البيانات = () => {
      const مفضلات = تخزين_المفضلة.جلب_الكل()
        .filter(item => item.قارئ.id === قارئ.id)
        .map(item => item.سورة.id);
      setالمفضلة(new Set(مفضلات));
    };
    تحديث_البيانات();

    const handleUpdate = () => تحديث_البيانات();
    window.addEventListener('تحديث_المفضلة_الصوتية', handleUpdate);
    return () => window.removeEventListener('تحديث_المفضلة_الصوتية', handleUpdate);
  }, [قارئ.id]);

  const تبديل_المفضلة = (سورة: any) => {
    const surahNumber = سورة.id.toString().padStart(3, '0');
    تخزين_المفضلة.تبديل_المفضلة({ id: سورة.id, name: سورة.name, englishName: سورة.englishName, number: surahNumber }, قارئ);
  };

  const تصفية_السور = SURAHS.filter(s => {
    return s.name.includes(بحث) || s.englishName.toLowerCase().includes(بحث.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* شريط العنوان والبحث */}
      <div className="p-4 flex items-center gap-4">
        <button 
          onClick={على_الرجوع}
          className={`p-2 rounded-full ${تنسيق_ليلي ? 'bg-white/5' : 'bg-gold-400/5'} text-gold-500`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h2 className={`font-amiri text-xl font-bold ${تنسيق_ليلي ? 'text-gray-200' : 'text-olive-700'}`}>
            تلاوات {قارئ.name}
          </h2>
          <p className="text-xs opacity-40 uppercase tracking-widest">
            {قارئ.englishName}
          </p>
        </div>
      </div>

      {/* حقل البحث */}
      <div className="px-4 pb-4">
        <div className={`relative flex items-center rounded-xl border ${تنسيق_ليلي ? 'bg-white/5 border-white/10' : 'bg-white border-gold-400/20'}`}>
          <Search className="absolute right-3 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="ابحث عن سورة..."
            value={بحث}
            onChange={(e) => setبحث(e.target.value)}
            className="w-full bg-transparent pr-10 pl-4 py-3 outline-none font-amiri text-lg"
          />
        </div>
      </div>

      {/* قائمة السور */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-2 hide-scrollbar">
        {تصفية_السور.map((سورة, index) => {
          const surahNumber = سورة.id.toString().padStart(3, '0');
          const في_المفضلة = المفضلة.has(سورة.id);

          return (
            <motion.div
              key={سورة.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`
                flex items-center p-3 rounded-xl border transition-all
                ${تنسيق_ليلي 
                  ? 'bg-[#1E1E1E] border-white/5 hover:border-gold-400/20' 
                  : 'bg-white border-gold-400/10 hover:border-gold-400/30'}
              `}
            >
              {/* رقم السورة */}
              <div className="w-10 h-10 flex items-center justify-center bg-gold-400/10 rounded-lg text-sm font-bold text-gold-600">
                {سورة.id}
              </div>

              {/* اسم السورة */}
              <div className="flex-1 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <h3 className={`font-amiri text-lg ${تنسيق_ليلي ? 'text-gray-200' : 'text-olive-700'}`}>
                    سورة {سورة.name}
                  </h3>
                </div>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">
                  {سورة.englishName}
                </p>
              </div>

              {/* أزرار التحكم */}
              <div className="flex items-center gap-2">
                {/* زر المفضلة */}
                <button 
                  onClick={() => تبديل_المفضلة(سورة)}
                  className={`p-2 rounded-lg transition-colors ${في_المفضلة ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <Heart className={`w-5 h-5 ${في_المفضلة ? 'fill-current' : ''}`} />
                </button>

                {/* زر التشغيل */}
                <button 
                  onClick={() => المشغل_الذكي.playSurah(قارئ, { id: سورة.id, name: سورة.name, englishName: سورة.englishName, number: surahNumber })}
                  className="p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
