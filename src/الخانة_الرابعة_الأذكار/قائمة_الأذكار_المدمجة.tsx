import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import واجهة_الأقسام from './واجهة_الأقسام';
import صفحة_تفاصيل_الذكر from './صفحة_تفاصيل_الذكر';
import { فئة_الأذكار } from './موسوعة_الأذكار';

export default function قائمة_الأذكار_المدمجة() {
  const [selectedCategory, setSelectedCategory] = useState<فئة_الأذكار | null>(null);

  return (
    <div className="w-full h-full bg-cream-50 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedCategory === null ? (
          <motion.div 
            key="categories" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }} 
            className="w-full h-full"
          >
            <واجهة_الأقسام onSelectCategory={setSelectedCategory} />
          </motion.div>
        ) : (
          <motion.div 
            key="details" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            className="w-full h-full"
          >
            <صفحة_تفاصيل_الذكر 
              category={selectedCategory} 
              onBack={() => setSelectedCategory(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
