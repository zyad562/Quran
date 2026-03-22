import React from 'react';
import { motion } from 'motion/react';
import { القراء, قارئ } from '../قائمة_السور_114';
import { shaikhImages, DEFAULT_SHAIKH_IMAGE } from '../shaikh_images';
import { ChevronLeft, Smartphone, Globe } from 'lucide-react';

interface ReciterListProps {
  onSelectReciter: (reciter: قارئ) => void;
  تنسيق_ليلي: boolean;
}

/**
 * مكون قائمة القراء الأساسية (Core Reciter List)
 * يعرض أشهر القراء بتصميم عصري وجذاب مع صور مخصصة لكل شيخ
 */
export const قائمة_القراء_الأساسية: React.FC<ReciterListProps> = ({ onSelectReciter, تنسيق_ليلي }) => {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto hide-scrollbar">
      {القراء.map((قارئ, index) => {
        // الحصول على رابط الصورة من الملف المخصص
        const رابط_الصورة = shaikhImages[قارئ.name] || DEFAULT_SHAIKH_IMAGE;

        return (
          <motion.div
            key={قارئ.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectReciter(قارئ)}
            className={`
              relative group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300
              ${تنسيق_ليلي 
                ? 'bg-[#1E1E1E] border-white/5 hover:border-gold-400/30' 
                : 'bg-white border-gold-400/10 hover:border-gold-400/40 shadow-sm hover:shadow-md'}
            `}
          >
            <div className="flex items-center p-4 gap-4">
              {/* صورة القارئ (CircleAvatar style) - على اليمين */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400/30 bg-gold-400/5 shrink-0 shadow-sm flex items-center justify-center">
                <img 
                  src={رابط_الصورة} 
                  alt={قارئ.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const icon = document.createElement('div');
                      icon.className = 'w-full h-full flex items-center justify-center text-gold-500';
                      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              </div>

              {/* معلومات القارئ - في المنتصف */}
              <div className="flex-1 text-right">
                <h3 className={`font-amiri text-xl font-bold tracking-wide mb-1 ${تنسيق_ليلي ? 'text-gray-100' : 'text-olive-800'}`}>
                  {قارئ.name}
                </h3>
                <div className="flex items-center justify-end gap-3">
                  <p className="text-[10px] opacity-50 uppercase tracking-[0.1em] font-medium">
                    {قارئ.englishName}
                  </p>
                  {/* أيقونة حالة السور */}
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${تنسيق_ليلي ? 'bg-white/10 text-gold-400' : 'bg-gold-400/15 text-gold-700'}`}>
                    {قارئ.server ? <Globe className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                    <span>{قارئ.server ? 'متصل' : 'محلي'}</span>
                  </div>
                </div>
              </div>

              {/* أيقونة التفاعل */}
              <div className={`p-2 rounded-full ${تنسيق_ليلي ? 'bg-white/5' : 'bg-gold-400/5'} text-gold-500/50 group-hover:text-gold-500 transition-colors`}>
                <ChevronLeft className="w-5 h-5" />
              </div>
            </div>

            {/* تأثير بصري جانبي */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gold-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
          </motion.div>
        );
      })}
    </div>
  );
};
