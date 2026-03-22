import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Globe, Check, ChevronLeft, LocateFixed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Country, City, ICity } from 'country-state-city';
import Flag from 'react-world-flags';
import countriesAr from 'i18n-iso-countries/langs/ar.json';
import countriesLib from 'i18n-iso-countries';
import { GoogleGenAI } from "@google/genai";

countriesLib.registerLocale(countriesAr);

// Initialize Gemini for translation
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// قاموس ترجمة المدن العربية الشائعة لتجنب الترجمة الفورية
const COMMON_CITIES_AR: Record<string, string> = {
  // السعودية
  'Riyadh': 'الرياض', 'Jeddah': 'جدة', 'Mecca': 'مكة المكرمة', 'Medina': 'المدينة المنورة',
  'Dammam': 'الدمام', 'Khobar': 'الخبر', 'Taif': 'الطائف', 'Tabuk': 'تبوك',
  'Buraydah': 'بريدة', 'Khamis Mushait': 'خميس مشيط', 'Abha': 'أبها', 'Al Jubail': 'الجبيل',
  'Najran': 'نجران', 'Hail': 'حائل', 'Jizan': 'جازان', 'Yanbu': 'ينبع', 'Al Qatif': 'القطيف',
  // مصر
  'Cairo': 'القاهرة', 'Alexandria': 'الإسكندرية', 'Giza': 'الجيزة', 'Shubra El-Kheima': 'شبرا الخيمة',
  'Port Said': 'بورسعيد', 'Suez': 'السويس', 'Luxor': 'الأقصر', 'Mansoura': 'المنصورة',
  'El-Mahalla El-Kubra': 'المحلة الكبرى', 'Tanta': 'طنطا', 'Asyut': 'أسيوط', 'Ismailia': 'الإسماعيلية',
  'Faiyum': 'الفيوم', 'Zagazig': 'الزقازيق', 'Aswan': 'أسوان', 'Damietta': 'دمياط', 'Damanhur': 'دمنهور',
  'Minya': 'المنيا', 'Beni Suef': 'بني سويف', 'Qena': 'قنا', 'Sohag': 'سوهاج', 'Hurghada': 'الغردقة',
  // الإمارات
  'Dubai': 'دبي', 'Abu Dhabi': 'أبو ظبي', 'Sharjah': 'الشارقة', 'Al Ain': 'العين',
  'Ajman': 'عجمان', 'Ras Al Khaimah': 'رأس الخيمة', 'Fujairah': 'الفجيرة', 'Umm Al Quwain': 'أم القيوين',
  // قطر
  'Doha': 'الدوحة', 'Al Rayyan': 'الريان', 'Al Wakrah': 'الوكرة', 'Al Khor': 'الخور',
  // الكويت
  'Kuwait City': 'مدينة الكويت', 'Al Ahmadi': 'الأحمدي', 'Hawalli': 'حولي', 'Salmiya': 'السالمية',
  'Al Farwaniyah': 'الفروانية', 'Fahaheel': 'الفحيحيل',
  // عمان
  'Muscat': 'مسقط', 'Salalah': 'صلالة', 'Sohar': 'صحار', 'Nizwa': 'نزوى', 'Sur': 'صور',
  // البحرين
  'Manama': 'المنامة', 'Riffa': 'الرفاع', 'Muharraq': 'المحرق', 'Hamad Town': 'مدينة حمد', 'Isa Town': 'مدينة عيسى',
  // الأردن
  'Amman': 'عمان', 'Zarqa': 'الزرقاء', 'Irbid': 'إربد', 'Russeifa': 'الرصيفة', 'Aqaba': 'العقبة',
  'Madaba': 'مادبا', 'As-Salt': 'السلط', 'Ramtha': 'الرمثا', 'Mafraq': 'المفرق',
  // لبنان
  'Beirut': 'بيروت', 'Tripoli': 'طرابلس', 'Sidon': 'صيدا', 'Tyre': 'صور', 'Nabatieh': 'النبطية',
  'Zahlé': 'زحلة', 'Jounieh': 'جونية', 'Baalbek': 'بعلبك',
  // سوريا
  'Damascus': 'دمشق', 'Aleppo': 'حلب', 'Homs': 'حمص', 'Latakia': 'اللاذقية', 'Hama': 'حماة',
  'Deir ez-Zor': 'دير الزور', 'Raqqa': 'الرقة', 'Idlib': 'إدلب', 'Daraa': 'درعا', 'Tartus': 'طرطوس',
  // العراق
  'Baghdad': 'بغداد', 'Basra': 'البصرة', 'Mosul': 'الموصل', 'Erbil': 'أربيل', 'Najaf': 'النجف',
  'Karbala': 'كربلاء', 'Kirkuk': 'كركوك', 'Sulaymaniyah': 'السليمانية', 'Nasiriyah': 'الناصرية', 'Amara': 'العمارة',
  // تونس
  'Tunis': 'تونس', 'Sfax': 'صفاقس', 'Sousse': 'سوسة', 'Kairouan': 'القيروان', 'Bizerte': 'بنزرت',
  'Gabès': 'قابس', 'Ariana': 'أريانة', 'Gafsa': 'قفصة', 'Monastir': 'المنستير',
  // الجزائر
  'Algiers': 'الجزائر', 'Oran': 'وهران', 'Constantine': 'قسنطينة', 'Annaba': 'عنابة', 'Blida': 'البليدة',
  'Batna': 'باتنة', 'Djelfa': 'الجلفة', 'Sétif': 'سطيف', 'Sidi Bel Abbès': 'سيدي بلعباس', 'Biskra': 'بسكرة',
  // المغرب
  'Casablanca': 'الدار البيضاء', 'Rabat': 'الرباط', 'Fes': 'فاس', 'Tangier': 'طنجة', 'Marrakesh': 'مراكش',
  'Salé': 'سلا', 'Meknes': 'مكناس', 'Oujda': 'وجدة', 'Kenitra': 'القنيطرة', 'Agadir': 'أكادير', 'Tetouan': 'تطوان',
  // ليبيا
  'Benghazi': 'بنغازي', 'Misrata': 'مصراتة', 'Bayda': 'البيضاء', 'Zawiya': 'الزاوية',
  // السودان
  'Khartoum': 'الخرطوم', 'Omdurman': 'أم درمان', 'Nyala': 'نيالا', 'Port Sudan': 'بورتسودان', 'Kassala': 'كسلا',
  // اليمن
  'Sanaa': 'صنعاء', 'Aden': 'عدن', 'Taiz': 'تعز', 'Al Hudaydah': 'الحديدة', 'Mukalla': 'المكلا',
  // فلسطين
  'Jerusalem': 'القدس', 'Gaza': 'غزة', 'Hebron': 'الخليل', 'Nablus': 'نابلس', 'Ramallah': 'رام الله',
  'Bethlehem': 'بيت لحم', 'Jenin': 'جنين', 'Tulkarm': 'طولكرم', 'Jericho': 'أريحا',
  // موريتانيا
  'Nouakchott': 'نواكشوط', 'Nouadhibou': 'نواذيبو',
  // الصومال
  'Mogadishu': 'مقديشو', 'Hargeisa': 'هرجيسا',
  // جيبوتي
  'Djibouti': 'جيبوتي',
  // جزر القمر
  'Moroni': 'موروني'
};

export interface LocationData {
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lng: number;
}

interface Props {
  onLocationChange: (location: LocationData) => void;
  initialLocation?: LocationData | null;
}

const ARAB_COUNTRIES_ISO = [
  'DZ', 'BH', 'KM', 'DJ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MR', 'MA', 'OM', 'PS', 'QA', 'SA', 'SO', 'SD', 'SY', 'TN', 'AE', 'YE'
];

export default function اختيار_الدولة({ onLocationChange, initialLocation }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'country' | 'city'>('country');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(initialLocation || null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [attemptedTranslations, setAttemptedTranslations] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [translatedCities, setTranslatedCities] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('arabic_cities_translations');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    if (Object.keys(translatedCities).length > 0) {
      localStorage.setItem('arabic_cities_translations', JSON.stringify(translatedCities));
    }
  }, [translatedCities]);

  const countries = useMemo(() => {
    return Country.getAllCountries()
      .filter(c => ARAB_COUNTRIES_ISO.includes(c.isoCode))
      .map(c => ({
        ...c,
        arabicName: countriesLib.getName(c.isoCode, 'ar') || c.name
      }))
      .sort((a, b) => a.arabicName.localeCompare(b.arabicName, 'ar'));
  }, []);

  const cities = useMemo(() => {
    if (!selectedCountry) return [];
    return City.getCitiesOfCountry(selectedCountry.isoCode) || [];
  }, [selectedCountry]);

  const getArabicCityName = (cityName: string): string | null => {
    return translatedCities[cityName] || COMMON_CITIES_AR[cityName] || null;
  };

  const translateCities = async (citiesToTranslate: ICity[]) => {
    if (citiesToTranslate.length === 0) return;
    setIsTranslating(true);
    
    setAttemptedTranslations(prev => {
      const next = new Set(prev);
      citiesToTranslate.forEach(c => next.add(c.name));
      return next;
    });

    try {
      const names = citiesToTranslate.map(c => c.name).join(' | ');
      const prompt = `Translate the following city names from ${selectedCountry?.name} to Arabic. Return ONLY a valid JSON object where keys are the exact English names provided and values are the Arabic translations. Do not include markdown formatting. Names: ${names}`;
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      const translations = JSON.parse(response.text || "{}");
      setTranslatedCities(prev => ({ ...prev, ...translations }));
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    if (selectedCountry && cities.length > 0) {
      const untranslated = cities.filter(c => 
        !COMMON_CITIES_AR[c.name] && 
        !translatedCities[c.name] && 
        !attemptedTranslations.has(c.name)
      );
      
      if (untranslated.length > 0 && !isTranslating) {
        const chunk = untranslated.slice(0, 60); 
        translateCities(chunk);
      }
    }
  }, [selectedCountry, cities, attemptedTranslations, isTranslating]);

  useEffect(() => {
    if (!currentLocation && !initialLocation) {
      const saudi = countries.find(c => c.isoCode === 'SA');
      if (saudi) {
        const riyadh: LocationData = { country: saudi.arabicName, countryCode: 'SA', city: 'الرياض', lat: 24.7136, lng: 46.6753 };
        setCurrentLocation(riyadh);
        onLocationChange(riyadh);
      }
    }
  }, [countries, currentLocation, initialLocation, onLocationChange]);

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter(c => c.arabicName.includes(query));
  }, [countries, searchQuery]);

  const filteredCities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    // Only include cities that have an Arabic translation
    const availableCities = cities.filter(c => getArabicCityName(c.name) !== null);
    
    if (!query) return availableCities;
    
    return availableCities.filter(c => {
      const arabicName = getArabicCityName(c.name);
      return arabicName && arabicName.includes(query);
    });
  }, [cities, searchQuery, translatedCities]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { setIsOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setSearchQuery('');
    setStep('city');
  };

  const handleCitySelect = (city: ICity) => {
    const arabicCity = getArabicCityName(city.name) || city.name;
    const newLocation: LocationData = {
      country: selectedCountry!.arabicName || selectedCountry!.name,
      countryCode: selectedCountry!.isoCode,
      city: arabicCity,
      lat: parseFloat(city.latitude || '0'),
      lng: parseFloat(city.longitude || '0')
    };
    setCurrentLocation(newLocation);
    localStorage.setItem('user_location_v2', JSON.stringify(newLocation));
    onLocationChange(newLocation);
    setIsOpen(false);
    setStep('country');
    setSelectedCountry(null);
  };

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      setIsOpen(false);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=ar`);
          const data = await res.json();
          const cityFromApi = data.city || data.locality || 'موقعي الحالي';
          const arabicCountryName = countriesLib.getName(data.countryCode, 'ar') || data.countryName || 'موقعي';
          const newLocation: LocationData = { country: arabicCountryName, countryCode: data.countryCode || 'SA', city: cityFromApi, lat, lng };
          setCurrentLocation(newLocation);
          localStorage.setItem('user_location_v2', JSON.stringify(newLocation));
          onLocationChange(newLocation);
        } catch (e) {
          const newLocation: LocationData = { country: 'موقعي', countryCode: 'SA', city: 'موقعي الحالي', lat, lng };
          setCurrentLocation(newLocation);
          localStorage.setItem('user_location_v2', JSON.stringify(newLocation));
          onLocationChange(newLocation);
        }
      });
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[100] font-amiri" ref={dropdownRef}>
      <div className="flex flex-col items-end gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-8 rounded-md border-2 border-gold-400/40 p-0.5 bg-white overflow-hidden flex items-center justify-center shadow-lg hover:border-gold-500 transition-all"
        >
          {currentLocation ? (
            <Flag code={currentLocation.countryCode} className="w-full h-full object-cover rounded-sm" />
          ) : (
            <Globe className="w-5 h-5 text-gold-500" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 z-[100] bg-white rounded-2xl shadow-2xl border border-gold-400/20 overflow-hidden flex flex-col w-64 max-h-[400px]"
          >
            <div className="p-3 border-b border-gold-400/10 bg-gold-50/30">
              {step === 'city' && (
                <button onClick={() => setStep('country')} className="flex items-center gap-1 text-gold-600 text-[10px] font-bold mb-2 hover:underline">
                  <ChevronLeft size={12} /> العودة لقائمة الدول
                </button>
              )}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400" size={14} />
                <input
                  type="text"
                  autoFocus
                  placeholder={step === 'country' ? "ابحث عن دولة..." : "ابحث عن مدينة..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gold-400/10 rounded-xl py-2 pr-9 pl-3 text-xs font-bold text-olive-900 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar hide-scrollbar">
              {step === 'country' ? (
                <>
                  <button onClick={handleAutoLocation} className="w-full flex items-center justify-between p-3 mb-2 rounded-xl bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/20 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gold-500 text-white flex items-center justify-center shadow-md"><LocateFixed size={16} /></div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-bold text-gold-700">تحديد موقعي بدقة</span>
                        <span className="text-[9px] text-gold-600/70 font-bold">لأقرب مسجد (GPS)</span>
                      </div>
                    </div>
                    <ChevronLeft size={14} className="text-gold-500" />
                  </button>
                  {filteredCountries.map((country) => (
                    <button key={country.isoCode} onClick={() => handleCountrySelect(country)} className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gold-50 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-gold-400/10"><Flag code={country.isoCode} className="w-full h-full object-cover" /></div>
                        <span className="text-xs font-bold text-olive-900 group-hover:text-gold-700">{country.arabicName}</span>
                      </div>
                      <ChevronLeft size={14} className="text-gold-300 group-hover:text-gold-500" />
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {filteredCities.map((city, idx) => (
                    <button key={`${city.name}-${idx}`} onClick={() => handleCitySelect(city)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gold-50 transition-all group">
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-bold text-olive-900 group-hover:text-gold-700">{getArabicCityName(city.name)}</span>
                      </div>
                      <Check size={14} className="text-gold-600 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                  
                  {isTranslating && (
                    <div className="p-4 text-center text-[10px] text-gold-600 animate-pulse">
                      جاري تحميل المزيد من المدن...
                    </div>
                  )}
                  
                  {filteredCities.length === 0 && !isTranslating && (
                    <div className="p-4 text-center text-xs text-gold-600">
                      لا توجد مدن متاحة
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af3733; border-radius: 10px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
