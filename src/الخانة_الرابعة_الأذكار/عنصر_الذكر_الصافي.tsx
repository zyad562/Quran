import React, { useState, useEffect } from 'react';
import { Info, Check } from 'lucide-react';
import { الذكر } from './موسوعة_الأذكار';
import { منطق_الشرح_والتسبيح } from './منطق_الشرح_والتسبيح';

interface Props {
  dhikr: الذكر;
  onShowInfo: (d: الذكر) => void;
}

export default function عنصر_الذكر_الصافي({ dhikr, onShowInfo }: Props) {
  const [count, setCount] = useState(dhikr.التكرار);
  const isDone = count === 0;

  useEffect(() => {
    setCount(dhikr.التكرار);
  }, [dhikr]);

  const handleTap = () => {
    if (isDone) return;
    if (count > 1) {
      منطق_الشرح_والتسبيح.تشغيل_صوت_تكة();
      setCount(prev => prev - 1);
    } else {
      منطق_الشرح_والتسبيح.اهتزاز_الانتهاء();
      setCount(0);
    }
  };

  return (
    <div className={`relative p-5 md:p-6 rounded-2xl border transition-all ${
      isDone 
        ? 'bg-white/50 border-black/5 opacity-70' 
        : 'bg-cream-50/40 border-gold-400/30 shadow-sm'
    }`}>
      
      {/* Info Button (Top Left in RTL) */}
      {(dhikr.الفضل || dhikr.المصدر || dhikr.الشرح) && (
        <button 
          onClick={() => onShowInfo(dhikr)} 
          className="absolute top-4 left-4 p-1.5 rounded-full text-gold-500 hover:bg-gold-400/10 transition-colors"
          title="الشرح والفضل"
        >
          <Info className="w-5 h-5" />
        </button>
      )}

      {/* Dhikr Text */}
      <p className="font-amiri text-xl md:text-2xl leading-loose md:leading-loose text-olive-800 whitespace-pre-line text-right mt-2 mb-6">
        {dhikr.نص}
      </p>
      
      {/* Counter Button */}
      <div className="flex items-center justify-end">
        <button 
          onClick={handleTap} 
          disabled={isDone} 
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all transform active:scale-95 ${
            isDone 
              ? 'border-emerald-300 bg-emerald-50 text-emerald-500' 
              : 'border-gold-400 text-gold-600 hover:bg-gold-50 shadow-sm'
          }`}
        >
          {isDone ? (
            <Check className="w-6 h-6" />
          ) : (
            <span className="font-sans font-bold text-lg">{count}</span>
          )}
        </button>
      </div>
    </div>
  );
}
