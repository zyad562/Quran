import React, { useState } from 'react';
import { Settings, Moon, Bell, Shield, Info, ChevronLeft, Languages, Smartphone, Heart, Share2, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function صفحة_الإعدادات() {
  const [language, setLanguage] = useState('ar');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    alert(newLang === 'ar' ? 'تم تحويل اللغة إلى العربية' : 'Language switched to English');
  };

  return (
    <div className="w-full h-full bg-cream-50 overflow-y-auto pb-32 pt-[60px] hide-scrollbar" dir="rtl">
      {/* Header */}
      <div className="bg-white px-6 py-8 border-b border-gold-400/10 shadow-sm mb-6">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="p-3 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl text-white shadow-lg shadow-gold-500/20">
            <Settings size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-amiri font-bold text-olive-900">الإعدادات</h1>
            <p className="text-sm text-olive-600/70 mt-1">تخصيص تجربتك الإيمانية</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 max-w-md mx-auto">
        
        {/* التفضيلات العامة */}
        <section>
          <h2 className="text-sm font-bold text-olive-600/60 uppercase tracking-wider mb-3 px-2">التفضيلات العامة</h2>
          <div className="bg-white rounded-3xl border border-gold-400/10 shadow-sm overflow-hidden">
            
            {/* اللغة */}
            <button 
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors border-b border-gold-400/5 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Languages size={20} />
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-olive-900">لغة التطبيق</p>
                  <p className="text-xs text-olive-600/60 mt-0.5">{language === 'ar' ? 'العربية' : 'English'}</p>
                </div>
              </div>
              <ChevronLeft size={20} className="text-olive-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* المظهر */}
            <div className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors border-b border-gold-400/5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Moon size={20} />
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-olive-900">الوضع الليلي</p>
                  <p className="text-xs text-olive-600/60 mt-0.5">تغيير مظهر التطبيق</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${darkMode ? 'bg-indigo-500' : 'bg-gray-200'}`}
              >
                <motion.div 
                  animate={{ x: darkMode ? -24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>

            {/* الإشعارات */}
            <div className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Bell size={20} />
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-olive-900">تنبيهات الأذان</p>
                  <p className="text-xs text-olive-600/60 mt-0.5">إدارة إشعارات الصلاة</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${notifications ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <motion.div 
                  animate={{ x: notifications ? -24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>

          </div>
        </section>

        {/* الدعم والمشاركة */}
        <section>
          <h2 className="text-sm font-bold text-olive-600/60 uppercase tracking-wider mb-3 px-2">الدعم والمشاركة</h2>
          <div className="bg-white rounded-3xl border border-gold-400/10 shadow-sm overflow-hidden">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors border-b border-gold-400/5 group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                  <Heart size={20} />
                </div>
                <p className="text-base font-bold text-olive-900">ادعم التطبيق</p>
              </div>
              <ChevronLeft size={20} className="text-olive-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors border-b border-gold-400/5 group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <Star size={20} />
                </div>
                <p className="text-base font-bold text-olive-900">قيّم التطبيق</p>
              </div>
              <ChevronLeft size={20} className="text-olive-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                  <Share2 size={20} />
                </div>
                <p className="text-base font-bold text-olive-900">شارك مع من تحب</p>
              </div>
              <ChevronLeft size={20} className="text-olive-400 group-hover:-translate-x-1 transition-transform" />
            </button>

          </div>
        </section>

        {/* حول التطبيق */}
        <section>
          <h2 className="text-sm font-bold text-olive-600/60 uppercase tracking-wider mb-3 px-2">حول</h2>
          <div className="bg-white rounded-3xl border border-gold-400/10 shadow-sm overflow-hidden">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors border-b border-gold-400/5 group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gray-50 text-gray-600 rounded-xl">
                  <Shield size={20} />
                </div>
                <p className="text-base font-bold text-olive-900">سياسة الخصوصية</p>
              </div>
              <ChevronLeft size={20} className="text-olive-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-cream-50/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gray-50 text-gray-600 rounded-xl">
                  <Info size={20} />
                </div>
                <p className="text-base font-bold text-olive-900">عن التطبيق</p>
              </div>
              <ChevronLeft size={20} className="text-olive-400 group-hover:-translate-x-1 transition-transform" />
            </button>

          </div>
        </section>

        {/* Footer Info */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-50 rounded-full mb-3">
            <Smartphone className="w-6 h-6 text-gold-500" />
          </div>
          <p className="text-sm font-bold text-olive-800">تطبيق المسلم</p>
          <p className="text-xs text-olive-400 mt-1">الإصدار 1.0.0</p>
          <p className="text-xs text-gold-600 font-medium mt-2">صُنع بكل حب لخدمة المسلمين</p>
        </div>

      </div>
    </div>
  );
}
