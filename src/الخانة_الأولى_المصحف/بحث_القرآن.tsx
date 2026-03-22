import React, { useState } from 'react';
import { ArrowRight, Search, Loader2, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onSelectPage: (page: number) => void;
  onBack: () => void;
}

export default function بحث_القرآن({ onSelectPage, onBack }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/ar`);
      const data = await res.json();
      if (data.code === 200) {
        setResults(data.data.matches);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-cream-50 hide-scrollbar pt-[60px]" dir="rtl">
      <div className="bg-white border-b border-gold-400/20 px-6 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm border border-gold-400/20 text-olive-600 hover:text-gold-600 transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
          <h1 className="font-amiri text-2xl font-bold text-olive-900">البحث في الآيات</h1>
        </div>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-olive-400 hover:text-gold-500 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="اكتب كلمة أو آية للبحث..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-cream-50/50 border border-gold-400/20 rounded-2xl py-4 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-amiri text-lg"
          />
        </form>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gold-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-amiri text-lg text-olive-600">جاري البحث...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-olive-600/70 font-bold mb-4">تم العثور على {results.length} نتيجة</p>
            {results.map((match, idx) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                key={idx}
                onClick={() => onSelectPage(match.page)}
                className="w-full text-right bg-white p-5 rounded-2xl border border-gold-400/10 hover:border-gold-500 hover:shadow-md transition-all group"
              >
                <p className="font-quran text-3xl leading-loose text-olive-900 mb-4 font-bold">{match.text}</p>
                <div className="flex items-center gap-3 text-sm text-olive-600/70 font-amiri bg-cream-50/50 w-fit px-3 py-1.5 rounded-lg">
                  <BookOpen className="w-4 h-4 text-gold-500" />
                  <span>سورة {match.surah.name}</span>
                  <span className="w-1 h-1 rounded-full bg-gold-400/30"></span>
                  <span>آية {match.numberInSurah}</span>
                  <span className="w-1 h-1 rounded-full bg-gold-400/30"></span>
                  <span>صفحة {match.page}</span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-20">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-400/10">
              <Search className="w-8 h-8 text-gold-300" />
            </div>
            <p className="font-amiri text-xl text-olive-600">لم يتم العثور على نتائج للبحث "{query}"</p>
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <Search className="w-16 h-16 text-gold-300 mx-auto mb-4" />
            <p className="font-amiri text-xl text-olive-600">ابحث في كلمات القرآن الكريم</p>
          </div>
        )}
      </div>
    </div>
  );
}
