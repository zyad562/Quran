import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Heart } from 'lucide-react';
import { قائمة_القراء_الأساسية } from './مكونات/قائمة_القراء_الأساسية';
import { الفهرس_الكامل } from './مكونات/الفهرس_الكامل';
import { مشغل_الأصوات_المتطور } from './مكونات/مشغل_الأصوات_المتطور';
import { المفضلة } from './مكونات/المفضلة';
import { قارئ } from './قائمة_السور_114';

interface AudioLibraryProps {
  تنسيق_ليلي: boolean;
}

/**
 * المكون الرئيسي: المكتبة الصوتية (Audio Library)
 * يجمع بين قائمة القراء، الفهرس الكامل، والمشغل المتطور، والمفضلة
 */
export default function المكتبة_الصوتية({ تنسيق_ليلي }: AudioLibraryProps) {
  const [القارئ_المختار, setالقارئ_المختار] = useState<قارئ | null>(null);
  const [التبويب_النشط, setالتبويب_النشط] = useState<'قراء' | 'مفضلة'>('قراء');

  return (
    <div className={`h-full flex flex-col overflow-hidden ${تنسيق_ليلي ? 'bg-[#121212]' : 'bg-cream-50'} pt-[60px]`} dir="rtl">
      {/* التبويبات الفرعية */}
      <div className="px-6 py-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        {[
          { id: 'قراء', name: 'كبار القراء', icon: Headphones },
          { id: 'مفضلة', name: 'المفضلة', icon: Heart }
        ].map((تبويب) => (
          <button
            key={تبويب.id}
            onClick={() => {
              setالتبويب_النشط(تبويب.id as any);
              setالقارئ_المختار(null);
            }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
              ${التبويب_النشط === تبويب.id 
                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' 
                : `${تنسيق_ليلي ? 'bg-white/5 text-gray-400' : 'bg-gold-400/5 text-olive-600'} hover:bg-gold-400/10`}
            `}
          >
            <تبويب.icon className="w-4 h-4" />
            <span className="text-sm font-bold">{تبويب.name}</span>
          </button>
        ))}
      </div>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {القارئ_المختار ? (
            <motion.div
              key="surah-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <الفهرس_الكامل 
                قارئ={القارئ_المختار} 
                على_الرجوع={() => setالقارئ_المختار(null)} 
                تنسيق_ليلي={تنسيق_ليلي}
              />
            </motion.div>
          ) : (
            <motion.div
              key={التبويب_النشط}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto pb-24 hide-scrollbar"
            >
              {التبويب_النشط === 'قراء' && (
                <قائمة_القراء_الأساسية 
                  onSelectReciter={setالقارئ_المختار} 
                  تنسيق_ليلي={تنسيق_ليلي}
                />
              )}
              {التبويب_النشط === 'مفضلة' && (
                <المفضلة تنسيق_ليلي={تنسيق_ليلي} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* المشغل العائم */}
      <مشغل_الأصوات_المتطور تنسيق_ليلي={تنسيق_ليلي} />
    </div>
  );
}
