import React from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function الختمة({ onBack }: Props) {
  return (
    <div className="w-full h-full bg-cream-50 flex flex-col items-center justify-center p-8 text-center relative pt-[60px] hide-scrollbar">
      <button 
        onClick={onBack}
        className="absolute top-8 right-6 p-3 bg-white rounded-full shadow-sm border border-gold-400/20 text-olive-600 hover:text-gold-600 transition-colors z-10"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-gold-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-gold-500/20 mb-8"
      >
        <CalendarDays className="w-12 h-12 text-white" />
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-amiri font-bold text-olive-900 mb-4"
      >
        متابعة الختمة
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-olive-600/70 max-w-xs leading-relaxed font-amiri"
      >
        تتبع القراءة، الأجزاء، والصفحات. هذه الخاصية قيد التطوير حالياً وسوف تتوفر في التحديث القادم بإذن الله لمساعدتكم على ختم القرآن الكريم.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center gap-2 text-gold-600 font-bold"
      >
        <Sparkles className="w-5 h-5" />
        <span>ترقبوا التحديث القادم</span>
      </motion.div>
    </div>
  );
}
