import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { فئة_الأذكار, الذكر } from './موسوعة_الأذكار';
import عنصر_الذكر_الصافي from './عنصر_الذكر_الصافي';
import نافذة_الفضل from './نافذة_الفضل';

interface Props {
  category: فئة_الأذكار;
  onBack: () => void;
}

export default function صفحة_تفاصيل_الذكر({ category, onBack }: Props) {
  const [selectedInfo, setSelectedInfo] = useState<الذكر | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white text-olive-800">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gold-400/20 shadow-sm z-10">
        <button 
          onClick={onBack} 
          className="p-2 text-gold-600 hover:bg-gold-400/10 rounded-full transition-colors flex items-center gap-1"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <h2 className="font-amiri text-2xl font-bold text-olive-800 text-center flex-1">
          {category.العنوان}
        </h2>
        
        <div className="w-10"></div>
      </div>

      {/* Main Content Area (List of Adhkar) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 bg-white">
        <div className="max-w-2xl mx-auto space-y-4 pb-24">
          {category.الأذكار.map(dhikr => (
            <div key={dhikr.id}>
              <عنصر_الذكر_الصافي 
                dhikr={dhikr} 
                onShowInfo={setSelectedInfo} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Modal (BottomSheet) */}
      <نافذة_الفضل 
        dhikr={selectedInfo} 
        isOpen={!!selectedInfo} 
        onClose={() => setSelectedInfo(null)} 
        isDarkMode={false} 
      />
    </div>
  );
}
