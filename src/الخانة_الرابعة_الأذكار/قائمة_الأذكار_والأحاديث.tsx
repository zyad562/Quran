import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, Sparkles, Activity } from 'lucide-react';
import قائمة_الأذكار_المدمجة from './قائمة_الأذكار_المدمجة';
import قائمة_الأحاديث from './قائمة_الأحاديث';
import السبحة_الحرة from './السبحة_الحرة';

type ViewState = 'menu' | 'adhkar' | 'hadith' | 'rosary';

export default function قائمة_الأذكار_والأحاديث() {
  const [view, setView] = useState<ViewState>('menu');

  return (
    <div className="w-full h-full bg-cream-50 relative overflow-hidden pt-[60px]">
      <AnimatePresence mode="wait">
        {view === 'menu' ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full overflow-y-auto p-4 space-y-6 hide-scrollbar"
          >
            <div className="text-center mb-6 mt-4">
              <h1 className="text-3xl font-amiri font-bold text-olive-800 mb-2">الذكر والحديث</h1>
              <p className="text-olive-600/70 text-sm">ألا بذكر الله تطمئن القلوب</p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {/* قائمة الأذكار المدمجة */}
              <button
                onClick={() => setView('adhkar')}
                className="w-full bg-white p-6 rounded-3xl border border-gold-400/20 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group active:scale-[0.98]"
              >
                <div className="w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/20 shrink-0">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h2 className="text-xl font-amiri font-bold text-olive-800">الأذكار</h2>
                  <p className="text-xs text-olive-600/60 font-medium mt-1">أذكار الصباح والمساء واليومية</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
              </button>

              {/* قائمة الأحاديث */}
              <button
                onClick={() => setView('hadith')}
                className="w-full bg-white p-6 rounded-3xl border border-olive-600/10 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group active:scale-[0.98]"
              >
                <div className="w-14 h-14 bg-olive-600 rounded-2xl flex items-center justify-center shadow-lg shadow-olive-600/20 shrink-0">
                  <Quote className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h2 className="text-xl font-amiri font-bold text-olive-800">الأحاديث النبوية</h2>
                  <p className="text-xs text-olive-600/60 font-medium mt-1">مختارات من الأحاديث الشريفة</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-olive-600/30 group-hover:text-olive-600 transition-colors" />
              </button>

              {/* المسبحة الإلكترونية */}
              <button
                onClick={() => setView('rosary')}
                className="w-full bg-white p-6 rounded-3xl border border-blue-600/10 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group active:scale-[0.98]"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h2 className="text-xl font-amiri font-bold text-olive-800">المسبحة الإلكترونية</h2>
                  <p className="text-xs text-olive-600/60 font-medium mt-1">سبحة حرة للذكر المطلق</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-blue-600/30 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
          </motion.div>
        ) : view === 'adhkar' ? (
          <motion.div
            key="adhkar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full relative"
          >
            <button
              onClick={() => setView('menu')}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-olive-600 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6 rotate-180" />
            </button>
            <قائمة_الأذكار_المدمجة />
          </motion.div>
        ) : view === 'hadith' ? (
          <motion.div
            key="hadith"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full relative"
          >
            <button
              onClick={() => setView('menu')}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-olive-600 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6 rotate-180" />
            </button>
            <قائمة_الأحاديث على_الرجوع={() => setView('menu')} />
          </motion.div>
        ) : (
          <motion.div
            key="rosary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full relative z-50 bg-white"
          >
            <السبحة_الحرة onClose={() => setView('menu')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
