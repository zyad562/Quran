import React, { useState } from 'react';
import { 
  BookOpenText, 
  MoonStar, 
  Radio, 
  Compass, 
  HandHeart,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- الخصائص والميزات ---
import المصحف_الشريف from './الخانة_الأولى_المصحف/المصحف_الشريف';
import المكتبة_الصوتية from './الخانة_الثالثة_المكتبة_الصوتية/المكتبة_الكاملة';
import قائمة_الأذكار_والأحاديث from './الخانة_الرابعة_الأذكار/قائمة_الأذكار_والأحاديث';
import خانة_المصلي from './الخانة_الخامسة_المصلي/خانة_المصلي';
import خانة_الخير from './الخانة_الرابعة_الخير/خانة_الخير';
import صفحة_الإعدادات from './صفحة_الإعدادات';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDark] = useState(false);

  const tabs = [
    { id: 0, label: 'المصحف', icon: BookOpenText, component: <المصحف_الشريف /> },
    { id: 1, label: 'المكتبة', icon: Radio, component: <المكتبة_الصوتية تنسيق_ليلي={isDark} /> },
    { id: 3, label: 'المصلي', icon: Compass, component: <خانة_المصلي onNavigateToAdhkar={() => setActiveTab(2)} /> },
    { id: 2, label: 'الأذكار', icon: MoonStar, component: <قائمة_الأذكار_والأحاديث /> },
    { id: 4, label: 'الخير', icon: HandHeart, component: <خانة_الخير /> },
    { id: 5, label: 'الإعدادات', icon: SlidersHorizontal, component: <صفحة_الإعدادات /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-cream-50 font-sans relative" dir="rtl">
      {/* المحتوى الرئيسي */}
      <main className="flex-1 overflow-hidden relative pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full hide-scrollbar"
          >
            {tabs.find(t => t.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* شريط التنقل السفلي العائم */}
      <div className="absolute bottom-6 left-0 right-0 px-4 z-50 pointer-events-none">
        <nav className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-olive-400/20 shadow-2xl shadow-olive-900/10 rounded-3xl p-2 pointer-events-auto">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 relative flex-1 ${
                    isActive ? 'text-gold-600' : 'text-olive-400 hover:text-olive-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gold-500/10 rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110 stroke-[2.5px]' : 'scale-100 stroke-[2px]'}`} />
                  <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 absolute bottom-0'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
