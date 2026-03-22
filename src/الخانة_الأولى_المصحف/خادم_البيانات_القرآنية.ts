/**
 * خادم البيانات القرآنية
 * مسؤول عن جلب نصوص الآيات والمعلومات المتعلقة بها من API خارجي
 * مع دعم التخزين المؤقت (Caching) لضمان السرعة
 */

export interface آية_نصية {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface بيانات_الصفحة {
  page: number;
  ayahs: آية_نصية[];
  surahs: {
    [key: string]: {
      name: string;
      englishName: string;
      revelationType: string;
    }
  };
}

class QuranDataService {
  private cache: Map<number, بيانات_الصفحة> = new Map();

  /**
   * جلب آيات صفحة معينة مع دعم إعادة المحاولة والبدائل
   */
  async جلب_صفحة(رقم_الصفحة: number, محاولات = 2): Promise<بيانات_الصفحة> {
    if (this.cache.has(رقم_الصفحة)) {
      return this.cache.get(رقم_الصفحة)!;
    }

    const روابط_بديلة = [
      `https://api.alquran.cloud/v1/page/${رقم_الصفحة}/quran-uthmani`,
      `https://api.alquran.cloud/v1/page/${رقم_الصفحة}/quran-simple` // بديل في حال فشل العثماني
    ];

    for (let i = 0; i < محاولات; i++) {
      for (const رابط of روابط_بديلة) {
        try {
          const response = await fetch(رابط, { 
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            mode: 'cors'
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();

          if (data.code === 200) {
            const result: بيانات_الصفحة = {
              page: رقم_الصفحة,
              ayahs: data.data.ayahs,
              surahs: data.data.surahs
            };
            this.cache.set(رقم_الصفحة, result);
            return result;
          }
        } catch (error) {
          console.warn(`فشلت المحاولة ${i + 1} للرابط ${رابط}:`, error);
          // ننتظر قليلاً قبل إعادة المحاولة
          await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        }
      }
    }

    throw new Error('فشل جلب البيانات من كافة المصادر المتاحة. يرجى التحقق من اتصالك بالإنترنت.');
  }

  /**
   * البحث السريع في نص القرآن
   * ملاحظة: للبحث اللحظي الكامل يفضل تحميل ملف JSON محلي، 
   * هنا نستخدم الـ API للبحث الشامل
   */
  async بحث_نصي(كلمة: string): Promise<any[]> {
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${كلمة}/all/quran-uthmani`);
      const data = await response.json();
      return data.code === 200 ? data.data.matches : [];
    } catch (error) {
      console.error('خطأ في البحث:', error);
      return [];
    }
  }
}

export const خادم_البيانات = new QuranDataService();
