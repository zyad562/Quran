import React from 'react';
import { Sun, Shield, Building2, HeartHandshake, CalendarDays } from 'lucide-react';
import { موسوعة_الأذكار, فئة_الأذكار } from './موسوعة_الأذكار';

const iconMap: Record<string, React.ReactNode> = {
  day_night: <Sun className="w-8 h-8" />,
  worship: <Building2 className="w-8 h-8" />,
  prayer: <HeartHandshake className="w-8 h-8" />,
  protection: <Shield className="w-8 h-8" />,
  occasions: <CalendarDays className="w-8 h-8" />,
};

interface Props {
  onSelectCategory: (category: فئة_الأذكار) => void;
}

export default function واجهة_الأقسام({ onSelectCategory }: Props) {
  const allCategories = موسوعة_الأذكار.flatMap(section => section.الفئات);

  return (
    <div className="w-full h-full flex flex-col bg-cream-50 relative overflow-hidden">
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 pt-16 relative z-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-amiri font-bold text-olive-800 mb-2">أقسام الأذكار</h1>
          <p className="text-olive-600/70 text-sm">اختر القسم الذي تريد قراءته</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto pb-24">
          {allCategories.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="bg-white p-6 rounded-3xl border border-gold-400/20 hover:border-gold-400/50 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 text-center shadow-sm group active:scale-[0.98]"
            >
              <div className="text-gold-500 bg-cream-50 p-4 rounded-2xl border border-gold-400/10 shadow-inner group-hover:bg-gold-50 group-hover:scale-110 transition-all duration-300">
                {iconMap[category.id] || <Sun className="w-8 h-8" />}
              </div>
              <div>
                <h2 className="font-amiri text-lg font-bold text-olive-800 leading-tight">
                  {category.العنوان}
                </h2>
                <p className="text-xs text-olive-600/60 mt-2 font-medium">
                  {category.الأذكار.length} أذكار
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
