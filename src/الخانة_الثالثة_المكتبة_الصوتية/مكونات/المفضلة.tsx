import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { تخزين_المفضلة, سورة_مفضلة } from '../تخزين_المفضلة';
import { المشغل_الذكي } from '../المشغل_الذكي';
import { shaikhImages, DEFAULT_SHAIKH_IMAGE } from '../shaikh_images';
import { Play, Heart } from 'lucide-react';

interface FavoritesProps {
  تنسيق_ليلي: boolean;
}

export const المفضلة: React.FC<FavoritesProps> = ({ تنسيق_ليلي }) => {
  const [المفضلات, setالمفضلات] = useState<سورة_مفضلة[]>([]);

  const تحديث_المفضلة = () => {
    setالمفضلات(تخزين_المفضلة.جلب_الكل());
  };

  useEffect(() => {
    تحديث_المفضلة();
    window.addEventListener('تحديث_المفضلة_الصوتية', تحديث_المفضلة);
    return () => window.removeEventListener('تحديث_المفضلة_الصوتية', تحديث_المفضلة);
  }, []);

  if (المفضلات.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4 p-10 text-center">
        <Heart className="w-16 h-16" />
        <p className="font-amiri text-xl">قائمة المفضلة فارغة</p>
        <p className="text-sm">أضف بعض السور للمفضلة لتظهر هنا</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto hide-scrollbar pb-32">
      {المفضلات.map((item, index) => {
        const رابط_الصورة = shaikhImages[item.قارئ.name] || DEFAULT_SHAIKH_IMAGE;
        return (
          <motion.div
            key={`${item.قارئ.id}_${item.سورة.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              flex items-center p-4 gap-4 rounded-2xl border transition-all
              ${تنسيق_ليلي 
                ? 'bg-[#1E1E1E] border-white/5' 
                : 'bg-white border-gold-400/10 shadow-sm'}
            `}
          >
            {/* صورة القارئ (CircleAvatar) */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400/30 shrink-0">
              <img 
                src={رابط_الصورة} 
                alt={item.قارئ.name} 
                className="w-full h-full object-cover"
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

            {/* معلومات السورة */}
            <div className="flex-1 text-right">
              <h3 className={`font-amiri text-lg font-bold ${تنسيق_ليلي ? 'text-gray-200' : 'text-olive-800'}`}>
                سورة {item.سورة.name}
              </h3>
              <p className="text-xs opacity-50">
                الشيخ {item.قارئ.name}
              </p>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => تخزين_المفضلة.تبديل_المفضلة(item.سورة, item.قارئ)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
              <button 
                onClick={() => المشغل_الذكي.playSurah(item.قارئ, item.سورة)}
                className="p-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
