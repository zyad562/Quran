/**
 * المشغل المختلط (Hybrid Player)
 * يجمع بين تشغيل الملفات المحلية (Offline) والتشغيل عبر الإنترنت (Streaming)
 * 
 * ملاحظة للمطور: 
 * ضع ملفات الـ MP3 في المجلد التالي: /public/الأصول_الصوتية/
 * بأسماء مثل: /الأصول_الصوتية/minsh/001.mp3
 */

import { قارئ, سورة_صوتية } from './قائمة_السور_114';
import { هل_السورة_محلية } from './قائمة_السور_المحلية';

class HybridPlayer {
  /**
   * بناء مسار الملف المحلي للسورة
   */
  static getLocalPath(reciter: قارئ, surahId: number): string {
    const surahNumber = surahId.toString().padStart(3, '0');
    
    // لبعض القراء مثل إسلام صبحي، قد نستخدم أسماء ملفات وصفية
    if (reciter.letter === 'islam') {
      const surahNames: { [key: number]: string } = {
        1: 'fatiha',
        18: 'kahf',
        36: 'yasin',
        67: 'mulk',
      };
      const name = surahNames[surahId] || surahNumber;
      return `/الأصول_الصوتية/${reciter.letter}/${name}.mp3`;
    }

    // النمط الافتراضي لبقية القراء
    return `/الأصول_الصوتية/${reciter.letter}/${surahNumber}.mp3`;
  }

  /**
   * التحقق من توفر الملف محلياً (عبر محاولة جلب الرأس فقط)
   */
  static async checkLocalAvailability(path: string): Promise<boolean> {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      if (!response.ok) return false;
      
      const contentType = response.headers.get('content-type');
      // نتحقق أن الملف ليس صفحة HTML (التي يرجعها السيرفر أحياناً عند عدم وجود الملف في تطبيقات SPA)
      return !!contentType && (contentType.includes('audio') || contentType.includes('mpeg'));
    } catch {
      return false;
    }
  }

  /**
   * تحديد الرابط النهائي للتشغيل (محلي أو عبر الإنترنت)
   */
  static async getFinalUrl(reciter: قارئ, surah: سورة_صوتية): Promise<{ url: string, isLocal: boolean }> {
    const surahNumber = surah.id.toString().padStart(3, '0');
    const remoteUrl = reciter.server ? `${reciter.server}${surahNumber}.mp3` : '';
    
    // إذا كانت السورة في قائمة السور المحلية، نحاول جلبها من المجلد المحلي
    if (هل_السورة_محلية(surah.id)) {
      let localPath = this.getLocalPath(reciter, surah.id);
      
      // التأكد من أن المسار المحلي مطلق لضمان التشغيل في الإطارات (Iframes)
      if (localPath.startsWith('/')) {
        localPath = window.location.origin + localPath;
      }

      const isLocalAvailable = await this.checkLocalAvailability(localPath);
      if (isLocalAvailable) {
        return { url: localPath, isLocal: true };
      }
    }

    // إذا لم تكن محلية أو فشل الجلب المحلي، نستخدم الرابط الخارجي
    return { url: remoteUrl, isLocal: false };
  }
}

export const المشغل_المختلط = HybridPlayer;
