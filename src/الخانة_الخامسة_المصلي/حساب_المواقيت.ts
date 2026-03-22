import { Coordinates, CalculationMethod, PrayerTimes, Qibla } from 'adhan';

export interface PrayerTimeData {
  name: string;
  arabicName: string;
  time: Date;
  details: {
    rakahs: number;
    sunnah: string;
    virtue: string;
  };
}

export const CALCULATION_METHODS = [
  { id: 'MuslimWorldLeague', name: 'رابطة العالم الإسلامي' },
  { id: 'UmmAlQura', name: 'أم القرى (مكة المكرمة)' },
  { id: 'Egyptian', name: 'الهيئة المصرية العامة للمساحة' },
  { id: 'Dubai', name: 'دبي (الإمارات)' },
  { id: 'Qatar', name: 'قطر' },
  { id: 'Kuwait', name: 'الكويت' },
  { id: 'Singapore', name: 'سنغافورة' },
  { id: 'Turkey', name: 'تركيا' },
  { id: 'Tehran', name: 'طهران (إيران)' },
  { id: 'NorthAmerica', name: 'الجمعية الإسلامية لأمريكا الشمالية (ISNA)' },
];

export interface CalculationSettings {
  method: string;
  offsets: {
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

export function getPrayerTimes(
  lat: number, 
  lng: number, 
  country: string = 'Saudi Arabia', 
  date: Date = new Date(),
  settings?: CalculationSettings
): PrayerTimeData[] {
  const coordinates = new Coordinates(lat, lng);
  
  // Select calculation method
  let params: any;
  
  if (settings?.method) {
    switch (settings.method) {
      case 'UmmAlQura': params = CalculationMethod.UmmAlQura(); break;
      case 'MuslimWorldLeague': params = CalculationMethod.MuslimWorldLeague(); break;
      case 'Egyptian': params = CalculationMethod.Egyptian(); break;
      case 'Dubai': params = CalculationMethod.Dubai(); break;
      case 'Qatar': params = CalculationMethod.Qatar(); break;
      case 'Kuwait': params = CalculationMethod.Kuwait(); break;
      case 'Singapore': params = CalculationMethod.Singapore(); break;
      case 'Turkey': params = CalculationMethod.Turkey(); break;
      case 'Tehran': params = CalculationMethod.Tehran(); break;
      case 'NorthAmerica': params = CalculationMethod.NorthAmerica(); break;
      default: params = CalculationMethod.MuslimWorldLeague();
    }
  } else {
    // Default logic based on country (using English names from country-state-city)
    const c = country.toLowerCase();
    if (c.includes('saudi') || c.includes('السعودية')) {
      params = CalculationMethod.UmmAlQura();
    } else if (c.includes('egypt') || c.includes('مصر')) {
      params = CalculationMethod.Egyptian();
    } else if (c.includes('emirates') || c.includes('qatar') || c.includes('kuwait') || c.includes('oman') || c.includes('bahrain')) {
      params = CalculationMethod.Dubai();
    } else if (c.includes('jordan') || c.includes('palestine')) {
      params = CalculationMethod.UmmAlQura();
    } else if (c.includes('morocco')) {
      params = CalculationMethod.MoonsightingCommittee();
    } else if (c.includes('turkey')) {
      params = CalculationMethod.Turkey();
    } else if (c.includes('singapore')) {
      params = CalculationMethod.Singapore();
    } else if (c.includes('america') || c.includes('canada')) {
      params = CalculationMethod.NorthAmerica();
    } else {
      params = CalculationMethod.MuslimWorldLeague();
    }
  }
  
  // Apply manual offsets if provided
  if (settings?.offsets) {
    params.adjustments.fajr = settings.offsets.fajr;
    params.adjustments.sunrise = settings.offsets.sunrise;
    params.adjustments.dhuhr = settings.offsets.dhuhr;
    params.adjustments.asr = settings.offsets.asr;
    params.adjustments.maghrib = settings.offsets.maghrib;
    params.adjustments.isha = settings.offsets.isha;
  }
  
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  const prayerDetails: Record<string, { rakahs: number; sunnah: string; virtue: string }> = {
    fajr: {
      rakahs: 2,
      sunnah: 'ركعتان قبل الفريضة (سنة الفجر)',
      virtue: 'ركعتا الفجر خير من الدنيا وما فيها'
    },
    sunrise: {
      rakahs: 0,
      sunnah: 'صلاة الضحى (بعد الشروق بـ 15 دقيقة)',
      virtue: 'تعدل 360 صدقة عن مفاصل الجسم'
    },
    dhuhr: {
      rakahs: 4,
      sunnah: '4 ركعات قبلها و 2 بعدها',
      virtue: 'من حافظ على أربع قبل الظهر وأربع بعدها حرمه الله على النار'
    },
    asr: {
      rakahs: 4,
      sunnah: '4 ركعات قبلها (مستحبة)',
      virtue: 'رحم الله امرأً صلى قبل العصر أربعاً'
    },
    maghrib: {
      rakahs: 3,
      sunnah: '2 ركعة بعدها',
      virtue: 'من صلى المغرب في جماعة فكأنما قام نصف الليل'
    },
    isha: {
      rakahs: 4,
      sunnah: '2 ركعة بعدها + الشفع والوتر',
      virtue: 'من صلى العشاء في جماعة فكأنما قام نصف الليل'
    }
  };

  return [
    { name: 'fajr', arabicName: 'الفجر', time: prayerTimes.fajr, details: prayerDetails.fajr },
    { name: 'sunrise', arabicName: 'الشروق', time: prayerTimes.sunrise, details: prayerDetails.sunrise },
    { name: 'dhuhr', arabicName: 'الظهر', time: prayerTimes.dhuhr, details: prayerDetails.dhuhr },
    { name: 'asr', arabicName: 'العصر', time: prayerTimes.asr, details: prayerDetails.asr },
    { name: 'maghrib', arabicName: 'المغرب', time: prayerTimes.maghrib, details: prayerDetails.maghrib },
    { name: 'isha', arabicName: 'العشاء', time: prayerTimes.isha, details: prayerDetails.isha },
  ];
}

export function getNextPrayer(lat: number, lng: number, currentTimes: PrayerTimeData[], country: string = 'Saudi Arabia', settings?: CalculationSettings): PrayerTimeData {
  const now = new Date();
  
  for (const prayer of currentTimes) {
    if (prayer.time > now) {
      return prayer;
    }
  }
  
  // If all prayers today have passed, get tomorrow's Fajr
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = getPrayerTimes(lat, lng, country, tomorrow, settings); 
  return tomorrowTimes[0]; // Fajr tomorrow
}

export function getQiblaDirection(lat: number, lng: number): number {
  const coordinates = new Coordinates(lat, lng);
  return Qibla(coordinates);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true });
}
