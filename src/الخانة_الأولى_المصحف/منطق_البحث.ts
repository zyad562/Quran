import { useState, useEffect } from 'react';
import { SURAHS } from './types';
import { خادم_البيانات } from './خادم_البيانات_القرآنية';

/**
 * دالة لتنقية النص العربي من التشكيل وتوحيد الحروف
 */
function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u0652]/g, "") // إزالة التشكيل
    .replace(/[أإآ]/g, "ا")           // توحيد الألف
    .replace(/ة/g, "ه")               // توحيد التاء المربوطة
    .replace(/ى/g, "ي");              // توحيد الألف المقصورة
}

export function useQuranSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [جاري_البحث, setجاري_البحث] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      const query = searchQuery.trim();
      if (!query) {
        setSearchResults([]);
        return;
      }

      setجاري_البحث(true);
      const normalizedQuery = normalizeArabic(query).toLowerCase();

      // 1. البحث في السور (محلي)
      const matchedSurahs = SURAHS.filter(s => {
        const normalizedName = normalizeArabic(s.name);
        return (
          normalizedName.includes(normalizedQuery) || 
          s.englishName.toLowerCase().includes(normalizedQuery) ||
          s.id.toString() === normalizedQuery
        );
      });

      const surahResults = matchedSurahs.map(s => ({
        id: `surah-${s.id}`,
        title: `سورة ${s.name}`,
        subtitle: s.englishName,
        page: s.pages[0]
      }));

      // 2. البحث في الآيات (API)
      const ayahMatches = await خادم_البيانات.بحث_نصي(query);
      const ayahResults = ayahMatches.slice(0, 20).map((m: any) => ({
        id: `ayah-${m.number}`,
        title: m.text,
        subtitle: `سورة ${m.surah.name} - آية ${m.numberInSurah}`,
        page: m.page
      }));

      setSearchResults([...surahResults, ...ayahResults]);
      setجاري_البحث(false);
    };

    const timeoutId = setTimeout(performSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    جاري_البحث
  };
}
