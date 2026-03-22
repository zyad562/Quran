/**
 * خادم الصوت (Audio Service)
 * مسؤول عن تشغيل التلاوات، التحكم في الخلفية، وإدارة الإشعارات
 */

import { قارئ, سورة_صوتية } from './قائمة_السور_114';
import { المشغل_المختلط } from './المشغل_المختلط';
import { تخزين_السجل } from './تخزين_السجل';

class AudioService {
  private audio: HTMLAudioElement | null = null;
  private currentSurah: سورة_صوتية | null = null;
  private currentReciter: قارئ | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.setupMediaSession();
      this.setupErrorHandling();
    }
  }

  /**
   * إعداد مستمع للأخطاء لتشخيص مشاكل التشغيل
   */
  private setupErrorHandling() {
    if (!this.audio) return;
    this.audio.addEventListener('error', (e) => {
      const target = e.target as HTMLAudioElement;
      const error = target.error;
      let message = 'خطأ غير معروف في التشغيل';
      
      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED: message = 'تم إيقاف التشغيل من قبل المستخدم'; break;
          case error.MEDIA_ERR_NETWORK: message = 'خطأ في الشبكة أثناء تحميل الصوت'; break;
          case error.MEDIA_ERR_DECODE: message = 'فشل فك تشفير الملف الصوتي (تنسيق غير مدعوم)'; break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED: message = 'المصدر غير مدعوم أو الرابط تالف (404)'; break;
        }
      }
      console.error(`Audio Error [${error?.code}]: ${message}`, target.src);
    });
  }

  /**
   * إعداد لوحة التحكم في الإشعارات (Media Session API)
   */
  private setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('stop', () => this.stop());
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        if (this.audio) this.audio.currentTime -= 10;
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        if (this.audio) this.audio.currentTime += 10;
      });
    }
  }

  /**
   * تشغيل سورة معينة لقارئ معين (نظام مختلط)
   */
  async playSurah(reciter: قارئ, surah: سورة_صوتية) {
    if (!this.audio) return;

    this.currentReciter = reciter;
    this.currentSurah = surah;

    // إضافة السورة إلى سجل الاستماع الأخير
    تخزين_السجل.إضافة_للسجل(surah, reciter);

    // 1. تحديد الرابط النهائي (محلي أو عبر الإنترنت) عبر المشغل المختلط
    const { url: finalUrl, isLocal } = await المشغل_المختلط.getFinalUrl(reciter, surah);
    const surahNumber = surah.id.toString().padStart(3, '0');
    const remoteUrl = reciter.server ? `${reciter.server}${surahNumber}.mp3` : '';

    if (!finalUrl) {
      throw new Error('التلاوة غير متوفرة حالياً');
    }
    
    // 2. التحقق من الكاش إذا لم يكن محلياً
    let playbackUrl = finalUrl;
    if (!isLocal && remoteUrl) {
      try {
        const cache = await caches.open('quran-audio-v1');
        const cachedResponse = await cache.match(remoteUrl);
        
        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
          playbackUrl = URL.createObjectURL(audioBlob);
        } else {
          // جلب الملف وتخزينه في الخلفية ليعمل بدون إنترنت لاحقاً
          fetch(remoteUrl, { mode: 'cors' }).then(response => {
            if (response.ok && response.headers.get('content-type')?.includes('audio')) {
              cache.put(remoteUrl, response);
            }
          }).catch(e => console.error('فشل التخزين التلقائي', e));
        }
      } catch (err) {
        console.error('خطأ في الوصول للكاش:', err);
      }
    }

    // إعادة ضبط المشغل
    this.audio.pause();
    if (this.audio.src.startsWith('blob:')) {
      URL.revokeObjectURL(this.audio.src);
    }
    
    this.audio.src = playbackUrl;
    this.audio.load();
    
    // تحديث معلومات الإشعارات
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `سورة ${surah.name}`,
        artist: reciter.name,
        album: 'المصحف الشريف',
        artwork: [{ src: reciter.image, sizes: '512x512', type: 'image/png' }]
      });
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      await this.audio.play();
    } catch (error: any) {
      if (error.name !== 'AbortError' && !error.message?.includes('interrupted')) {
        console.error('خطأ في التشغيل:', error);
      }
      // محاولة أخيرة من الرابط الخارجي
      if (playbackUrl !== remoteUrl && remoteUrl) {
        this.audio.src = remoteUrl;
        this.audio.load();
        try {
          await this.audio.play();
        } catch (fallbackError: any) {
          if (fallbackError.name !== 'AbortError' && !fallbackError.message?.includes('interrupted')) {
            console.error('فشل التشغيل من الرابط الخارجي أيضاً:', fallbackError);
          }
        }
      }
    }
  }

  play() {
    this.audio?.play().catch((e: any) => {
      if (e.name !== 'AbortError' && !e.message?.includes('interrupted')) {
        console.error('Play error:', e);
      }
    });
  }

  pause() {
    this.audio?.pause();
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  getAudioElement() {
    return this.audio;
  }

  getCurrentSurah() {
    return this.currentSurah;
  }

  getCurrentReciter() {
    return this.currentReciter;
  }
}

export const المشغل_الذكي = new AudioService();
