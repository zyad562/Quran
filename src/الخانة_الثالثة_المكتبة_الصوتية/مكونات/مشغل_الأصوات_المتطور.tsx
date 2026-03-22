import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, X, ChevronUp, ChevronDown, User } from 'lucide-react';
import { المشغل_الذكي } from '../المشغل_الذكي';

interface AdvancedPlayerProps {
  تنسيق_ليلي: boolean;
}

/**
 * مكون مشغل الأصوات المتطور (Advanced Audio Player)
 * مشغل عائم يدعم التحكم الكامل، عرض التقدم، ومعلومات التلاوة الحالية
 */
export const مشغل_الأصوات_المتطور: React.FC<AdvancedPlayerProps> = ({ تنسيق_ليلي }) => {
  const [يعمل_الآن, setيعمل_الآن] = useState(false);
  const [التقدم, setالتقدم] = useState(0);
  const [المدة, setالمدة] = useState(0);
  const [موسع, setموسع] = useState(false);
  const [سورة_حالية, setسورة_حالية] = useState(المشغل_الذكي.getCurrentSurah());
  const [قارئ_حالي, setقارئ_حالي] = useState(المشغل_الذكي.getCurrentReciter());
  const [هو_محلي, setهو_محلي] = useState(false);
  const [خطأ_صورة, setخطأ_صورة] = useState(false);

  useEffect(() => {
    const audio = المشغل_الذكي.getAudioElement();
    if (!audio) return;

    const تحديث_الحالة = () => {
      setيعمل_الآن(!audio.paused);
      setالتقدم(audio.currentTime);
      setالمدة(audio.duration || 0);
      setسورة_حالية(المشغل_الذكي.getCurrentSurah());
      const reciter = المشغل_الذكي.getCurrentReciter();
      if (reciter?.id !== قارئ_حالي?.id) {
        setقارئ_حالي(reciter);
        setخطأ_صورة(false);
      }
      setهو_محلي(audio.src.startsWith(window.location.origin + '/الأصول_الصوتية/'));
    };

    audio.addEventListener('play', تحديث_الحالة);
    audio.addEventListener('pause', تحديث_الحالة);
    audio.addEventListener('timeupdate', تحديث_الحالة);
    audio.addEventListener('loadedmetadata', تحديث_الحالة);

    return () => {
      audio.removeEventListener('play', تحديث_الحالة);
      audio.removeEventListener('pause', تحديث_الحالة);
      audio.removeEventListener('timeupdate', تحديث_الحالة);
      audio.removeEventListener('loadedmetadata', تحديث_الحالة);
    };
  }, [قارئ_حالي]);

  if (!سورة_حالية || !قارئ_حالي) return null;

  const تنسيق_الوقت = (ثواني: number) => {
    const دقائق = Math.floor(ثواني / 60);
    const ثواني_باقية = Math.floor(ثواني % 60);
    return `${دقائق}:${ثواني_باقية.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`
        fixed bottom-20 left-4 right-4 z-50 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-500
        ${تنسيق_ليلي 
          ? 'bg-[#1E1E1E]/90 border-white/10 text-gray-200' 
          : 'bg-white/90 border-gold-400/20 text-olive-700'}
        ${موسع ? 'h-auto p-6' : 'h-20 px-4'}
      `}
    >
      {/* شريط التقدم العلوي (عندما يكون المشغل مصغراً) */}
      {!موسع && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-400/10 overflow-hidden rounded-t-2xl">
          <motion.div 
            className="h-full bg-gold-500"
            style={{ width: `${(التقدم / المدة) * 100}%` }}
          />
        </div>
      )}

      <div className={`flex flex-col h-full ${موسع ? 'gap-6' : 'justify-center'}`}>
        {/* معلومات التلاوة والتحكم الأساسي */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            {/* صورة القارئ */}
            <div className={`relative ${موسع ? 'w-24 h-24' : 'w-12 h-12'} rounded-xl overflow-hidden border-2 border-gold-400/20 shrink-0 bg-gold-400/5 flex items-center justify-center`}>
              {!خطأ_صورة ? (
                <img 
                  src={قارئ_حالي.image} 
                  alt={قارئ_حالي.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setخطأ_صورة(true)}
                />
              ) : (
                <User className={`${موسع ? 'w-12 h-12' : 'w-6 h-6'} text-gold-500/40`} />
              )}
            </div>

            {/* اسم السورة والقارئ */}
            <div className="flex-1 text-right overflow-hidden">
              <div className="flex items-center justify-end gap-2">
                {هو_محلي && (
                  <span className="text-[8px] bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter">بدون إنترنت</span>
                )}
                <h3 className={`font-amiri font-bold truncate ${موسع ? 'text-2xl' : 'text-lg'}`}>
                  سورة {سورة_حالية.name}
                </h3>
              </div>
              <p className={`opacity-60 truncate ${موسع ? 'text-lg' : 'text-xs'}`}>
                بصوت {قارئ_حالي.name}
              </p>
            </div>
          </div>

          {/* أزرار التحكم السريعة (عندما يكون مصغراً) */}
          {!موسع && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => يعمل_الآن ? المشغل_الذكي.pause() : المشغل_الذكي.play()}
                className="w-10 h-10 flex items-center justify-center bg-gold-500 text-white rounded-full shadow-lg"
              >
                {يعمل_الآن ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button onClick={() => setموسع(true)} className="p-2 opacity-40 hover:opacity-100">
                <ChevronUp className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* زر الإغلاق (عندما يكون موسعاً) */}
          {موسع && (
            <button onClick={() => setموسع(false)} className="p-2 opacity-40 hover:opacity-100">
              <ChevronDown className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* عناصر التحكم الإضافية (عندما يكون موسعاً) */}
        <AnimatePresence>
          {موسع && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* شريط التقدم المفصل */}
              <div className="space-y-2">
                <div className="relative h-2 bg-gold-400/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gold-500"
                    style={{ width: `${(التقدم / المدة) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs opacity-60 font-mono">
                  <span>{تنسيق_الوقت(المدة)}</span>
                  <span>{تنسيق_الوقت(التقدم)}</span>
                </div>
              </div>

              {/* أزرار التحكم الرئيسية */}
              <div className="flex items-center justify-center gap-8">
                <button className="p-2 opacity-40 hover:opacity-100 hover:text-gold-500 transition-all">
                  <SkipForward className="w-8 h-8" />
                </button>
                <button 
                  onClick={() => يعمل_الآن ? المشغل_الذكي.pause() : المشغل_الذكي.play()}
                  className="w-20 h-20 flex items-center justify-center bg-gold-500 text-white rounded-full shadow-2xl shadow-gold-500/40 hover:scale-105 transition-transform"
                >
                  {يعمل_الآن ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
                </button>
                <button className="p-2 opacity-40 hover:opacity-100 hover:text-gold-500 transition-all">
                  <SkipBack className="w-8 h-8" />
                </button>
              </div>

              {/* خيارات إضافية */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 opacity-60">
                  <Volume2 className="w-5 h-5" />
                  <div className="w-24 h-1 bg-gold-400/20 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gold-500" />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    المشغل_الذكي.stop();
                    setموسع(false);
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                  إيقاف التشغيل
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
