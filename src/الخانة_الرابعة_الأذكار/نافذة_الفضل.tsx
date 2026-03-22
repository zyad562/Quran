import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Award, ShieldCheck } from 'lucide-react';
import { الذكر } from './موسوعة_الأذكار';

interface Props {
  dhikr: الذكر | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function نافذة_الفضل({ dhikr, isOpen, onClose, isDarkMode }: Props) {
  if (!dhikr) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-x-0 bottom-0 z-[70] p-6 md:p-8 rounded-t-[2.5rem] shadow-2xl border-t ${
              isDarkMode 
                ? 'bg-slate-900/95 border-slate-700 text-slate-200' 
                : 'bg-cream-50/95 border-gold-400/30 text-olive-800'
            } backdrop-blur-xl max-h-[85vh] overflow-y-auto hide-scrollbar`}
          >
            {/* Drag Handle */}
            <div className="w-16 h-1.5 bg-gray-400/30 rounded-full mx-auto mb-6" />
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-amiri text-2xl font-bold flex items-center gap-3">
                <BookOpen className={`w-6 h-6 ${isDarkMode ? 'text-gold-500' : 'text-gold-600'}`} />
                شرح وفضل الذكر
              </h3>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gold-400/20'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 font-sans">
              {/* أصل الذكر */}
              {dhikr.المصدر && (
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/60'} border border-black/5`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-olive-700'}`}>
                    <BookOpen className="w-4 h-4" />
                    أصل الذكر
                  </h4>
                  <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
                    {dhikr.المصدر}
                  </p>
                </div>
              )}

              {/* شرح المعنى */}
              {dhikr.الشرح && (
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/60'} border border-black/5`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-olive-700'}`}>
                    <ShieldCheck className="w-4 h-4" />
                    شرح المعنى
                  </h4>
                  <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-stone-600'}`}>
                    {dhikr.الشرح}
                  </p>
                </div>
              )}

              {/* الفضل والثواب */}
              {dhikr.الفضل && (
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/60'} border border-black/5`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-gold-400' : 'text-gold-600'}`}>
                    <Award className="w-4 h-4" />
                    الفضل والثواب
                  </h4>
                  <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-stone-700'}`}>
                    {dhikr.الفضل}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
