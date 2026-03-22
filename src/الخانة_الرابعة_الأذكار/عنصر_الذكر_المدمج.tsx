import React, { useState, useEffect } from 'react';
import { Info, Check } from 'lucide-react';
import { الذكر } from './موسوعة_الأذكار';
import { منطق_العداد_الذكي } from './منطق_العداد_الذكي';

interface Props {
  dhikr: الذكر;
  onShowInfo: (d: الذكر) => void;
}

export default function عنصر_الذكر_المدمج({ dhikr, onShowInfo }: Props) {
  const [count, setCount] = useState(dhikr.التكرار);
  const isDone = count === 0;

  // Reset if dhikr changes
  useEffect(() => { 
    setCount(dhikr.التكرار); 
  }, [dhikr]);

  const handleTap = () => {
    if (isDone) return;
    if (count > 1) {
      منطق_العداد_الذكي.تشغيل_صوت_تكة();
      setCount(prev => prev - 1);
    } else {
      منطق_العداد_الذكي.اهتزاز_الانتهاء();
      setCount(0);
    }
  };

  return (
    <div 
      onClick={handleTap}
      className={`relative p-4 border-b border-black/5 transition-colors cursor-pointer select-none flex gap-3 ${
        isDone ? 'bg-cream-50/50 opacity-60' : 'bg-white hover:bg-cream-50/30'
      }`}
    >
      {/* Info Icon (Tiny, Top Left) */}
      {(dhikr.الفضل || dhikr.المصدر || dhikr.الشرح) && (
        <button 
          onClick={(e) => { e.stopPropagation(); onShowInfo(dhikr); }}
          className="absolute top-2 left-2 p-1.5 text-olive-300 hover:text-gold-600 transition-colors z-10"
          title="شرح وفضل الذكر"
        >
          <Info className="w-4 h-4" />
        </button>
      )}

      {/* Text Content */}
      <div className="flex-1 pt-1">
        <p className="font-amiri text-[17px] md:text-[18px] leading-relaxed text-olive-800 whitespace-pre-line">
          {dhikr.نص}
        </p>
      </div>

      {/* Slim Counter */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-1">
        <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors shadow-sm ${
          isDone 
            ? 'border-olive-300 bg-olive-50 text-olive-500' 
            : 'border-gold-400/50 bg-gold-400/10 text-gold-700'
        }`}>
          {isDone ? (
            <Check className="w-4 h-4" />
          ) : (
            <span className="font-sans font-bold text-sm">{count}</span>
          )}
        </div>
      </div>
    </div>
  );
}
