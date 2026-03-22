import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, ArrowLeft, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getPrayerTimes, getNextPrayer, formatTime, PrayerTimeData } from './حساب_المواقيت';
import اختيار_الدولة, { LocationData } from './اختيار_الدولة';
import صوت_الأذان from './صوت_الأذان';

interface Props {
  onNavigateToAdhkar?: () => void;
}

export default function خانة_المصلي({ onNavigateToAdhkar }: Props) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTimeData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showAdhkarButton, setShowAdhkarButton] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (location) {
      const times = getPrayerTimes(location.lat, location.lng, location.country, new Date());
      setPrayerTimes(times);
      updateNextPrayer(times);
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextPrayer) {
        updateCountdown(nextPrayer);
      }
      checkPrayerFinished();
    }, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer, prayerTimes, location]);

  const handleLocationChange = (newLocation: LocationData) => {
    setLocation(newLocation);
    setIsLoading(false);
  };

  const updateNextPrayer = (times: PrayerTimeData[]) => {
    if (!location) return;
    const next = getNextPrayer(location.lat, location.lng, times, location.country);
    setNextPrayer(next);
  };

  const updateCountdown = (prayer: PrayerTimeData) => {
    const now = new Date().getTime();
    const target = prayer.time.getTime();
    let diff = target - now;

    if (diff < 0) {
      if (location) {
        const times = getPrayerTimes(location.lat, location.lng, location.country, new Date());
        setPrayerTimes(times);
        updateNextPrayer(times);
      }
      return;
    }

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  };

  const checkPrayerFinished = () => {
    const now = new Date();
    const finished = prayerTimes.some(p => {
      const diff = now.getTime() - p.time.getTime();
      return diff > 5 * 60 * 1000 && diff < 15 * 60 * 1000;
    });
    setShowAdhkarButton(finished);
  };

  const handleOpenMaps = () => {
    if (location && location.lat && location.lng) {
      // Search for mosques near the specific coordinates
      window.open(`https://www.google.com/maps/search/مسجد/@${location.lat},${location.lng},15z`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/مساجد+قريبة+مني`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-cream-50 gap-4 pt-[60px]">
        <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
        <p className="text-olive-600 font-amiri text-lg">جاري تحميل البيانات...</p>
      </div>
    );
  }

  const mainPrayers = prayerTimes.filter(p => p.name !== 'sunrise');

  return (
    <div className="w-full h-full flex flex-col bg-cream-50 overflow-y-auto hide-scrollbar relative pt-[60px]" dir="rtl">
      
      {/* Location Selector (Minimalist Flag in Top Right) */}
      <اختيار_الدولة onLocationChange={handleLocationChange} initialLocation={location} />

      <div className="flex-1 flex flex-col items-center pb-32 px-6 space-y-8">
        
        {/* Next Prayer Hero Section */}
        {nextPrayer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md pt-4"
          >
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-olive-700 to-olive-900 p-8 shadow-2xl shadow-olive-900/40 text-white">
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-500/10 rounded-full -ml-12 -mb-12 blur-xl" />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                  <Clock size={14} className="text-gold-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-200">الصلاة القادمة</span>
                </div>
                
                <h1 className="text-5xl font-amiri font-bold tracking-tight">
                  {nextPrayer.arabicName}
                </h1>
                
                <div className="flex flex-col items-center">
                  <span className="text-6xl font-sans font-black tracking-tighter text-gold-400">
                    {formatTime(nextPrayer.time)}
                  </span>
                  <div className="flex items-center gap-2 mt-2 text-white/60">
                    <span className="text-sm font-medium">متبقي</span>
                    <span className="text-lg font-mono font-bold text-white">{timeRemaining}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    className="h-full bg-gold-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 1. Prayer Times List (Minimalist Slim Cards) */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-amiri font-bold text-olive-900">جدول اليوم</h2>
            <صوت_الأذان />
          </div>

          <div className="flex flex-col gap-4">
            {mainPrayers.map((prayer, index) => {
              const isNext = nextPrayer?.name === prayer.name;
              
              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 px-6 rounded-3xl border transition-all duration-300 ${
                    isNext 
                      ? 'bg-gold-50 border-gold-500/30 shadow-lg shadow-gold-500/5' 
                      : 'bg-white border-gold-400/10 text-olive-900 hover:border-gold-400/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-gold-500' : 'bg-gold-200'}`} />
                    <span className={`text-xl font-amiri font-bold ${isNext ? 'text-gold-700' : 'text-olive-800'}`}>
                      {prayer.arabicName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-sans tracking-tight font-bold ${isNext ? 'text-gold-600' : 'text-olive-600'}`}>
                      {formatTime(prayer.time)}
                    </span>
                    {isNext && (
                      <div className="p-1 bg-gold-500 rounded-lg text-white">
                        <Clock size={14} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Nearby Mosques Button (Centered) */}
        <div className="w-full max-w-md py-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenMaps}
            className="w-full bg-white border-2 border-gold-400/20 text-olive-900 rounded-[2rem] p-6 flex items-center justify-between shadow-xl shadow-gold-500/5 group transition-all hover:border-gold-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold-500 rounded-2xl text-white shadow-lg shadow-gold-500/30">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-amiri font-bold">البحث عن أقرب مسجد</h3>
                <p className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mt-1">فتح خرائط جوجل للموقع الحالي</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-100 transition-all">
              <ChevronLeft size={20} />
            </div>
          </motion.button>
        </div>

      </div>

      {/* Smart Integration Button */}
      <AnimatePresence>
        {showAdhkarButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 right-6 z-40"
          >
            <button
              onClick={onNavigateToAdhkar}
              className="w-full bg-gold-500 text-white p-4 rounded-2xl shadow-xl shadow-gold-500/20 flex items-center justify-between hover:bg-gold-600 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-amiri text-lg font-bold">هل انتهيت من الصلاة؟ اقرأ أذكار ما بعد الصلاة الآن</span>
              </div>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
