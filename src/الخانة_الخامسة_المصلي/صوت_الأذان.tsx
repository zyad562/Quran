import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, ChevronLeft, Music, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MUEZZINS = [
  {
    id: 'makkah',
    name: 'أذان مكة المكرمة',
    description: 'مؤذن الحرم المكي الشريف',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Makkah.mp3',
  },
  {
    id: 'madinah',
    name: 'أذان المدينة المنورة',
    description: 'المسجد النبوي الشريف',
    url: 'https://raw.githubusercontent.com/wsalahuddin/adhan/main/adhan-madina-001.mp3',
  },
  {
    id: 'abdul_basit',
    name: 'الشيخ عبدالباسط عبدالصمد',
    description: 'أذان خاشع بصوت كروان الشرق',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Abed%20Albase6.mp3',
  },
  {
    id: 'mohammad_rifat',
    name: 'الشيخ محمد رفعت',
    description: 'قيثارة السماء - أذان تاريخي',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Mohammad%20Ref3at.mp3',
  },
  {
    id: 'mishary',
    name: 'الشيخ مشاري العفاسي',
    description: 'أذان عذب ومشهور',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Mishary%20Alafasi.mp3',
  },
  {
    id: 'nasser_qatami',
    name: 'الشيخ ناصر القطامي',
    description: 'أذان هادئ ومؤثر',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Nasser%20Alqatami.mp3',
  },
  {
    id: 'mansour_zahrani',
    name: 'الشيخ منصور الزهراني',
    description: 'أذان مميز بصوت شجي',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Mansoor%20Az-Zahrani.mp3',
  },
  {
    id: 'minshawi',
    name: 'الشيخ محمد صديق المنشاوي',
    description: 'الصوت الباكي الخاشع',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Mohammad%20Almenshawy.mp3',
  },
  {
    id: 'hamad_deghreri',
    name: 'الشيخ حمد الدغريري',
    description: 'صوت مكي أصيل',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Hamad%20Deghreri.mp3',
  },
  {
    id: 'hamdan_almalki',
    name: 'الشيخ حمدان المالكي',
    description: 'أذان مميز',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Hamdan%20Almalki.mp3',
  },
  {
    id: 'ibrahim_alarkani',
    name: 'الشيخ إبراهيم الأركاني',
    description: 'صوت ندي وخاشع',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Ibrahim%20Al-Arkani.mp3',
  },
  {
    id: 'majed_alhamathani',
    name: 'الشيخ ماجد الهمذاني',
    description: 'أذان هادئ',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Majed%20Al-hamathani.mp3',
  },
  {
    id: 'ahmad_nuaina',
    name: 'الشيخ أحمد نعينع',
    description: 'من عمالقة التلاوة والأذان',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Ahmad%20Nuyne3.mp3',
  },
  {
    id: 'fajr_malek',
    name: 'أذان الفجر - مالك شيبة',
    description: 'أذان الفجر بصوت مؤثر',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Al-fajer%20-%20Malek%20chebae.mp3',
  },
  {
    id: 'suhaib_khatba',
    name: 'الشيخ صهيب خطبة',
    description: 'أذان مميز',
    url: 'https://raw.githubusercontent.com/abodehq/Athan-MP3/master/Sounds/Athan%20Suhaib%20Khatba.mp3',
  }
];

// Custom Minaret Icon
const MinaretIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L10 5H14L12 2Z" fill="currentColor"/>
    <path d="M11 5V8H13V5H11Z" fill="currentColor"/>
    <path d="M9 8V11H15V8H9Z" fill="currentColor"/>
    <path d="M10 11V22H14V11H10Z" fill="currentColor"/>
    <path d="M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function صوت_الأذان() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMuezzin, setSelectedMuezzin] = useState(MUEZZINS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selected_muezzin');
    if (saved) {
      const found = MUEZZINS.find(m => m.id === saved);
      if (found) setSelectedMuezzin(found);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const stopAudio = () => {
    setIsPlaying(false);
    setPreviewingId(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleTogglePlay = async (muezzin: typeof MUEZZINS[0], isPreview = false) => {
    if (isPlaying && (isPreview ? previewingId === muezzin.id : !previewingId)) {
      stopAudio();
    } else {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }

        setIsPlaying(true);
        if (isPreview) setPreviewingId(muezzin.id);
        else setPreviewingId(null);

        const audio = new Audio(muezzin.url);
        audioRef.current = audio;
        
        audio.onended = () => {
          setIsPlaying(false);
          setPreviewingId(null);
        };
        audio.onerror = () => {
          setIsPlaying(false);
          setPreviewingId(null);
        };

        await audio.play();
      } catch (e: any) {
        if (e.name !== 'AbortError' && !e.message?.includes('interrupted')) {
          console.error("Audio play failed:", e);
        }
        setIsPlaying(false);
        setPreviewingId(null);
      }
    }
  };

  const handleSelect = (muezzin: typeof MUEZZINS[0]) => {
    setSelectedMuezzin(muezzin);
    localStorage.setItem('selected_muezzin', muezzin.id);
    stopAudio();
    setIsOpen(false);
  };

  return (
    <div className="font-amiri">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-2 rounded-full border border-gold-400/20 bg-white/50 hover:border-gold-400/50 transition-all"
      >
        <div className="p-1.5 rounded-full bg-gold-100 text-gold-600">
          <MinaretIcon className="w-4 h-4" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-bold text-olive-900 leading-none">اختيار المؤذن</span>
          <span className="text-[9px] text-gold-600 font-bold uppercase tracking-widest mt-1">{selectedMuezzin.name}</span>
        </div>
        <ChevronLeft size={14} className="text-gold-400 mr-1" />
      </motion.button>

      {/* Modal / BottomSheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsOpen(false); stopAudio(); }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-cream-50 rounded-t-[2.5rem] z-[120] p-8 shadow-2xl border-t border-gold-400/20 max-h-[80vh] overflow-y-auto hide-scrollbar"
              dir="rtl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gold-500 rounded-2xl text-white shadow-lg shadow-gold-500/30">
                    <Volume2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-olive-900">مكتبة الأذان</h3>
                    <p className="text-xs text-gold-600 font-bold uppercase tracking-widest mt-1">اختر صوتك المفضل للتنبيهات</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); stopAudio(); }}
                  className="p-2 hover:bg-gold-100 rounded-full text-gold-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {MUEZZINS.map((muezzin) => {
                  const isSelected = selectedMuezzin.id === muezzin.id;
                  const isPreviewing = previewingId === muezzin.id && isPlaying;

                  return (
                    <motion.div
                      key={muezzin.id}
                      className={`p-5 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between ${
                        isSelected 
                          ? 'bg-gold-50 border-gold-500 shadow-lg shadow-gold-500/5' 
                          : 'bg-white border-gold-400/10 hover:border-gold-400/30'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1" onClick={() => handleSelect(muezzin)}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-gold-500 text-white' : 'bg-gold-100 text-gold-600'
                        }`}>
                          {isSelected ? <Check size={24} /> : <Music size={24} />}
                        </div>
                        <div className="flex flex-col items-start cursor-pointer">
                          <span className={`text-lg font-bold ${isSelected ? 'text-gold-700' : 'text-olive-900'}`}>
                            {muezzin.name}
                          </span>
                          <span className="text-[10px] text-olive-400 font-bold uppercase tracking-widest mt-1">
                            {muezzin.description}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleTogglePlay(muezzin, true)}
                        className={`p-3 rounded-xl transition-all ${
                          isPreviewing 
                            ? 'bg-gold-500 text-white shadow-md' 
                            : 'bg-gold-100 text-gold-600 hover:bg-gold-200'
                        }`}
                      >
                        {isPreviewing ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-gold-50 rounded-2xl border border-gold-200/50">
                <p className="text-[10px] text-gold-700 font-bold text-center leading-relaxed">
                  سيتم استخدام الصوت المختار في جميع تنبيهات الصلاة القادمة تلقائياً.
                </p>
              </div>
            </motion.div>
          </>
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
