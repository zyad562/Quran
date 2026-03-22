import React from 'react';
import { motion } from 'motion/react';
import { X, Book, Layers, Bookmark as BookmarkIcon, Trash2 } from 'lucide-react';
import { SURAHS, JUZS, QuranTheme, Bookmark } from '../types';

interface QuranIndexProps {
  theme: QuranTheme;
  bookmarks: Bookmark[];
  onSelectPage: (page: number) => void;
  onRemoveBookmark: (id: string) => void;
  onClose: () => void;
}

export default function QuranIndex({ theme, bookmarks, onSelectPage, onRemoveBookmark, onClose }: QuranIndexProps) {
  const [activeTab, setActiveTab] = React.useState<'surah' | 'juz' | 'bookmarks'>('surah');
  const isDark = theme === 'dark';

  const tabs = [
    { id: 'surah', label: 'السور', icon: Book },
    { id: 'juz', label: 'الأجزاء', icon: Layers },
    { id: 'bookmarks', label: 'العلامات', icon: BookmarkIcon },
  ];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`fixed inset-y-0 right-0 w-full max-w-sm z-[60] shadow-2xl flex flex-col ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'}`}
      dir="rtl"
    >
      {/* رأس القائمة */}
      <div className="p-6 border-b border-gold-400/10 flex items-center justify-between">
        <h2 className={`text-2xl font-amiri font-bold ${isDark ? 'text-gold-400' : 'text-olive-700'}`}>الفهرس</h2>
        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* التبويبات */}
      <div className="flex p-2 gap-1 bg-black/5 mx-4 mt-4 rounded-2xl">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                isActive 
                  ? (isDark ? 'bg-gold-500 text-black' : 'bg-olive-600 text-white shadow-md') 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* محتوى القائمة */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === 'surah' && SURAHS.map(surah => (
          <button
            key={surah.id}
            onClick={() => onSelectPage(surah.pages[0])}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors group ${
              isDark ? 'hover:bg-white/5' : 'hover:bg-olive-600/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold ${
                isDark ? 'bg-white/5 text-gold-400' : 'bg-olive-600/5 text-olive-600'
              }`}>
                {surah.id}
              </span>
              <div className="text-right">
                <div className={`font-amiri text-xl ${isDark ? 'text-gray-200' : 'text-olive-700'}`}>{surah.name}</div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • {surah.ayahsCount} آية</div>
              </div>
            </div>
            <div className="text-xs opacity-40">ص {surah.pages[0]}</div>
          </button>
        ))}

        {activeTab === 'juz' && JUZS.map(juz => (
          <button
            key={juz.id}
            onClick={() => onSelectPage(juz.startPage)}
            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-colors ${
              isDark ? 'hover:bg-white/5' : 'hover:bg-olive-600/5'
            }`}
          >
            <div className={`font-amiri text-xl ${isDark ? 'text-gray-200' : 'text-olive-700'}`}>{juz.name}</div>
            <div className="text-xs opacity-40">ص {juz.startPage}</div>
          </button>
        ))}

        {activeTab === 'bookmarks' && (
          bookmarks.length > 0 ? (
            bookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border ${
                  isDark ? 'border-white/5 bg-white/5' : 'border-gold-400/10 bg-gold-400/5'
                }`}
              >
                <button 
                  onClick={() => onSelectPage(bookmark.page)}
                  className="flex-1 text-right"
                >
                  <div className={`font-amiri text-lg ${isDark ? 'text-gray-200' : 'text-olive-700'}`}>سورة {bookmark.surahName}</div>
                  <div className="text-xs opacity-40">صفحة {bookmark.page} • {new Date(bookmark.timestamp).toLocaleDateString('ar-EG')}</div>
                </button>
                <button 
                  onClick={() => onRemoveBookmark(bookmark.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 py-20">
              <BookmarkIcon className="w-12 h-12 mb-4" />
              <p className="font-amiri text-lg">لا توجد علامات مرجعية</p>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}
