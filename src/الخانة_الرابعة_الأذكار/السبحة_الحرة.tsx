import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, RotateCcw } from 'lucide-react';
import { منطق_العداد_الذكي } from './منطق_العداد_الذكي';

interface Props {
  onClose: () => void;
}

export default function السبحة_الحرة({ onClose }: Props) {
  const [count, setCount] = useState(0);
  const [beadY, setBeadY] = useState(0);

  const handleTap = () => {
    منطق_العداد_الذكي.تشغيل_صوت_تكة();
    setCount(prev => prev + 1);
    
    // Animate bead
    setBeadY(20);
    setTimeout(() => setBeadY(0), 150);
    
    if ((count + 1) % 33 === 0) {
      منطق_العداد_الذكي.اهتزاز_الانتهاء();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex flex-col bg-cream-50"
    >
      <div className="flex items-center justify-between p-6 bg-white border-b border-gold-400/10 shadow-sm">
        <button onClick={onClose} className="p-3 bg-cream-50 rounded-full shadow-sm text-olive-700 hover:bg-gold-400/10 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h2 className="font-amiri text-2xl font-bold text-olive-700">السبحة الإلكترونية</h2>
        <button onClick={() => setCount(0)} className="p-3 bg-cream-50 rounded-full shadow-sm text-olive-700 hover:bg-gold-400/10 transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden" onClick={handleTap}>
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="w-[150vw] h-[150vw] rounded-full bg-gold-400 blur-3xl"></div>
        </div>

        {/* Big Counter */}
        <div className="relative w-72 h-72 rounded-full border-[12px] border-gold-400/20 flex items-center justify-center mb-16 shadow-2xl shadow-gold-400/10 bg-white z-10">
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle 
              cx="50%" cy="50%" r="calc(50% - 6px)" 
              fill="transparent" stroke="#D4AF37" strokeWidth="12" 
              strokeDasharray="1000"
              strokeDashoffset={1000 - ((count % 33) / 33) * 1000}
              className="transition-all duration-300 ease-out"
              style={{ strokeDasharray: '414.6', strokeDashoffset: `${414.6 - ((count % 33) / 33) * 414.6}` }} // 2 * pi * r (approx r=66)
            />
          </svg>
          <div className="text-center">
            <span className="text-8xl font-bold text-olive-700 font-sans">{count}</span>
            <div className="text-gold-500 font-amiri mt-2 text-xl">دورة: {Math.floor(count / 33)}</div>
          </div>
        </div>

        {/* Interactive Bead */}
        <div className="relative w-24 h-48 flex justify-center z-10">
          <div className="absolute top-0 bottom-0 w-1.5 bg-gold-400/30 rounded-full"></div>
          <motion.div 
            animate={{ y: beadY }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="w-20 h-24 bg-gradient-to-b from-gold-400 to-gold-500 rounded-[40px] shadow-xl shadow-gold-500/40 border-4 border-white/30 absolute top-4 flex items-center justify-center"
          >
            {/* Bead decoration */}
            <div className="w-full h-px bg-white/30 absolute top-1/4"></div>
            <div className="w-full h-px bg-white/30 absolute top-2/4"></div>
            <div className="w-full h-px bg-white/30 absolute top-3/4"></div>
          </motion.div>
        </div>
        
        <p className="absolute bottom-12 text-olive-600/50 font-sans text-lg animate-pulse z-10">
          اضغط في أي مكان للتسبيح
        </p>
      </div>
    </motion.div>
  );
}
