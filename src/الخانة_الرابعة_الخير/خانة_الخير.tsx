import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function خانة_الخير() {
  return (
    <div className="w-full h-full bg-cream-50 flex flex-col items-center justify-center p-8 text-center pt-[60px] hide-scrollbar" dir="rtl">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <Heart className="w-20 h-20 text-gold-500 fill-gold-500/20" strokeWidth={1.5} />
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-amiri font-bold text-olive-900 mb-4"
      >
        قريباً.. أبواب الخير في انتظاركم
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-olive-600/70 max-w-sm leading-relaxed font-amiri"
      >
        هذا القسم قيد التطوير ليقدم لكم ميزات فريدة قريباً.
      </motion.p>
    </div>
  );
}
