/**
 * قائمة السور 114 (The 114 Surahs List)
 * يحتوي هذا الملف على تعريفات البيانات للمكتبة الصوتية والربط مع المصاحف الكاملة
 */

import { shaikhImages, DEFAULT_SHAIKH_IMAGE } from './shaikh_images';

export interface قارئ {
  id: string;
  name: string;
  englishName: string;
  server: string; // رابط السيرفر الخاص بالتلاوات (Mp3Quran API)
  letter: string; // حرف التعريف في API (مثل 'minsh' للمنشاوي)
  image: string;
  availableSurahs?: number[]; // قائمة السور المتاحة (إذا لم توجد يعني المصحف كاملاً 114 سورة)
}

export interface سورة_صوتية {
  id: number;
  name: string;
  englishName: string;
  number: string; // رقم السورة بصيغة 001, 002...
}

/**
 * قائمة القراء المعتمدة (The Approved Reciters List)
 * تم ربط كل قارئ بسيرفر MP3Quran الذي يوفر المصحف كاملاً (114 سورة)
 */
export const القراء: قارئ[] = [
  {
    id: '1',
    name: 'محمد صديق المنشاوي',
    englishName: 'Mohamed Siddiq Al-Minshawi',
    server: 'https://server10.mp3quran.net/minsh/', // سيرفر المنشاوي (المصحف المجود)
    letter: 'minsh',
    image: shaikhImages['محمد صديق المنشاوي'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '2',
    name: 'محمود خليل الحصري',
    englishName: 'Mahmoud Khalil Al-Husary',
    server: 'https://server13.mp3quran.net/husr/', // سيرفر الحصري (المصحف المرتل)
    letter: 'husr',
    image: shaikhImages['محمود خليل الحصري'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '3',
    name: 'عبد الباسط عبد الصمد',
    englishName: 'Abdul Basit Abdul Samad',
    server: 'https://server7.mp3quran.net/basit/Mujawwad/', // سيرفر عبد الباسط (المجود)
    letter: 'basit',
    image: shaikhImages['عبد الباسط عبد الصمد'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '4',
    name: 'مصطفى إسماعيل',
    englishName: 'Mustafa Ismail',
    server: 'https://server8.mp3quran.net/mustafa/', // سيرفر مصطفى إسماعيل
    letter: 'mustafa',
    image: shaikhImages['مصطفى إسماعيل'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '5',
    name: 'ماهر المعيقلي',
    englishName: 'Maher Al-Muaiqly',
    server: 'https://server12.mp3quran.net/maher/', // سيرفر ماهر المعيقلي (الحرم المكي)
    letter: 'maher',
    image: shaikhImages['ماهر المعيقلي'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '6',
    name: 'ياسر الدوسري',
    englishName: 'Yasser Al-Dosari',
    server: 'https://server11.mp3quran.net/yasser/', // سيرفر ياسر الدوسري
    letter: 'yasser',
    image: shaikhImages['ياسر الدوسري'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '7',
    name: 'سعود الشريم',
    englishName: 'Saud Al-Shuraim',
    server: 'https://server7.mp3quran.net/shur/', // سيرفر سعود الشريم
    letter: 'shur',
    image: shaikhImages['سعود الشريم'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '8',
    name: 'ناصر القطامي',
    englishName: 'Nasser Al-Qatami',
    server: 'https://server6.mp3quran.net/qtm/', // سيرفر ناصر القطامي
    letter: 'qtm',
    image: shaikhImages['ناصر القطامي'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '9',
    name: 'إدريس أبكر',
    englishName: 'Idrees Abkar',
    server: 'https://server6.mp3quran.net/abkr/', // سيرفر إدريس أبكر
    letter: 'abkr',
    image: shaikhImages['إدريس أبكر'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '10',
    name: 'محمد اللحيدان',
    englishName: 'Mohammad Al-Luhidan',
    server: 'https://server8.mp3quran.net/lhdan/', // سيرفر محمد اللحيدان
    letter: 'lhdan',
    image: shaikhImages['محمد اللحيدان'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '11',
    name: 'إسلام صبحي',
    englishName: 'Islam Sobhi',
    server: 'https://server14.mp3quran.net/islam/', // سيرفر إسلام صبحي (تلاوات مختارة)
    letter: 'islam',
    image: shaikhImages['إسلام صبحي'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '12',
    name: 'مشاري العفاسي',
    englishName: 'Mishary Alafasy',
    server: 'https://server8.mp3quran.net/afs/',
    letter: 'afs',
    image: shaikhImages['مشاري العفاسي'] || DEFAULT_SHAIKH_IMAGE
  },
  {
    id: '13',
    name: 'أحمد العجمي',
    englishName: 'Ahmed Al-Ajmi',
    server: 'https://server10.mp3quran.net/ajm/',
    letter: 'ajm',
    image: shaikhImages['أحمد العجمي'] || DEFAULT_SHAIKH_IMAGE
  }
];
