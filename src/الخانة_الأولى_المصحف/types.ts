export interface Surah {
  id: number;
  name: string;
  englishName: string;
  pages: [number, number];
  revelationType?: string;
  ayahsCount?: number;
}

export interface Juz {
  id: number;
  name: string;
  startPage: number;
  endPage: number;
}

export type QuranTheme = 'sepia' | 'dark' | 'light';

export interface Bookmark {
  id: string;
  page: number;
  surahId: number;
  surahName: string;
  timestamp: number;
}

export const JUZS: Juz[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `الجزء ${i + 1}`,
  startPage: i * 20 + 1,
  endPage: (i + 1) * 20
}));

export const SURAHS: Surah[] = [
  { id: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', pages: [1, 1] },
  { id: 2, name: 'البقرة', englishName: 'Al-Baqarah', pages: [2, 49] },
  { id: 3, name: 'آل عمران', englishName: 'Aal-E-Imran', pages: [50, 76] },
  { id: 4, name: 'النساء', englishName: 'An-Nisa', pages: [77, 106] },
  { id: 5, name: 'المائدة', englishName: 'Al-Maidah', pages: [106, 127] },
  { id: 6, name: 'الأنعام', englishName: 'Al-Anam', pages: [128, 150] },
  { id: 7, name: 'الأعراف', englishName: 'Al-Araf', pages: [151, 176] },
  { id: 8, name: 'الأنفال', englishName: 'Al-Anfal', pages: [177, 186] },
  { id: 9, name: 'التوبة', englishName: 'At-Tawbah', pages: [187, 207] },
  { id: 10, name: 'يونس', englishName: 'Yunus', pages: [208, 221] },
  { id: 11, name: 'هود', englishName: 'Hud', pages: [221, 235] },
  { id: 12, name: 'يوسف', englishName: 'Yusuf', pages: [235, 248] },
  { id: 13, name: 'الرعد', englishName: 'Ar-Rad', pages: [249, 255] },
  { id: 14, name: 'إبراهيم', englishName: 'Ibrahim', pages: [255, 261] },
  { id: 15, name: 'الحجر', englishName: 'Al-Hijr', pages: [262, 267] },
  { id: 16, name: 'النحل', englishName: 'An-Nahl', pages: [267, 281] },
  { id: 17, name: 'الإسراء', englishName: 'Al-Isra', pages: [282, 293] },
  { id: 18, name: 'الكهف', englishName: 'Al-Kahf', pages: [293, 304] },
  { id: 19, name: 'مريم', englishName: 'Maryam', pages: [305, 312] },
  { id: 20, name: 'طه', englishName: 'Taha', pages: [312, 321] },
  { id: 21, name: 'الأنبياء', englishName: 'Al-Anbiya', pages: [322, 331] },
  { id: 22, name: 'الحج', englishName: 'Al-Hajj', pages: [332, 341] },
  { id: 23, name: 'المؤمنون', englishName: 'Al-Muminun', pages: [342, 349] },
  { id: 24, name: 'النور', englishName: 'An-Nur', pages: [350, 359] },
  { id: 25, name: 'الفرقان', englishName: 'Al-Furqan', pages: [359, 366] },
  { id: 26, name: 'الشعراء', englishName: 'Ash-Shuara', pages: [367, 376] },
  { id: 27, name: 'النمل', englishName: 'An-Naml', pages: [377, 385] },
  { id: 28, name: 'القصص', englishName: 'Al-Qasas', pages: [385, 396] },
  { id: 29, name: 'العنكبوت', englishName: 'Al-Ankabut', pages: [396, 404] },
  { id: 30, name: 'الروم', englishName: 'Ar-Rum', pages: [404, 410] },
  { id: 31, name: 'لقمان', englishName: 'Luqman', pages: [411, 414] },
  { id: 32, name: 'السجدة', englishName: 'As-Sajdah', pages: [415, 417] },
  { id: 33, name: 'الأحزاب', englishName: 'Al-Ahzab', pages: [418, 427] },
  { id: 34, name: 'سبأ', englishName: 'Saba', pages: [428, 434] },
  { id: 35, name: 'فاطر', englishName: 'Fatir', pages: [434, 440] },
  { id: 36, name: 'يس', englishName: 'Ya-Sin', pages: [440, 445] },
  { id: 37, name: 'الصافات', englishName: 'As-Saffat', pages: [446, 452] },
  { id: 38, name: 'ص', englishName: 'Sad', pages: [453, 458] },
  { id: 39, name: 'الزمر', englishName: 'Az-Zumar', pages: [458, 467] },
  { id: 40, name: 'غافر', englishName: 'Ghafir', pages: [467, 476] },
  { id: 41, name: 'فصلت', englishName: 'Fussilat', pages: [477, 482] },
  { id: 42, name: 'الشورى', englishName: 'Ash-Shura', pages: [483, 489] },
  { id: 43, name: 'الزخرف', englishName: 'Az-Zukhruf', pages: [489, 495] },
  { id: 44, name: 'الدخان', englishName: 'Ad-Dukhan', pages: [496, 498] },
  { id: 45, name: 'الجاثية', englishName: 'Al-Jathiyah', pages: [499, 502] },
  { id: 46, name: 'الأحقاف', englishName: 'Al-Ahqaf', pages: [502, 506] },
  { id: 47, name: 'محمد', englishName: 'Muhammad', pages: [507, 510] },
  { id: 48, name: 'الفتح', englishName: 'Al-Fath', pages: [511, 515] },
  { id: 49, name: 'الحجرات', englishName: 'Al-Hujurat', pages: [515, 517] },
  { id: 50, name: 'ق', englishName: 'Qaf', pages: [518, 520] },
  { id: 51, name: 'الذاريات', englishName: 'Adh-Dhariyat', pages: [520, 523] },
  { id: 52, name: 'الطور', englishName: 'At-Tur', pages: [523, 525] },
  { id: 53, name: 'النجم', englishName: 'An-Najm', pages: [526, 528] },
  { id: 54, name: 'القمر', englishName: 'Al-Qamar', pages: [528, 531] },
  { id: 55, name: 'الرحمن', englishName: 'Ar-Rahman', pages: [531, 534] },
  { id: 56, name: 'الواقعة', englishName: 'Al-Waqiah', pages: [534, 537] },
  { id: 57, name: 'الحديد', englishName: 'Al-Hadid', pages: [537, 541] },
  { id: 58, name: 'المجادلة', englishName: 'Al-Mujadila', pages: [542, 545] },
  { id: 59, name: 'الحشر', englishName: 'Al-Hashr', pages: [545, 548] },
  { id: 60, name: 'الممتحنة', englishName: 'Al-Mumtahanah', pages: [549, 551] },
  { id: 61, name: 'الصف', englishName: 'As-Saf', pages: [551, 552] },
  { id: 62, name: 'الجمعة', englishName: 'Al-Jumuah', pages: [553, 554] },
  { id: 63, name: 'المنافقون', englishName: 'Al-Munafiqun', pages: [554, 555] },
  { id: 64, name: 'التغابن', englishName: 'At-Taghabun', pages: [556, 557] },
  { id: 65, name: 'الطلاق', englishName: 'At-Talaq', pages: [558, 559] },
  { id: 66, name: 'التحريم', englishName: 'At-Tahrim', pages: [560, 561] },
  { id: 67, name: 'الملك', englishName: 'Al-Mulk', pages: [562, 564] },
  { id: 68, name: 'القلم', englishName: 'Al-Qalam', pages: [564, 566] },
  { id: 69, name: 'الحاقة', englishName: 'Al-Haqqah', pages: [566, 568] },
  { id: 70, name: 'المعارج', englishName: 'Al-Maarij', pages: [568, 570] },
  { id: 71, name: 'نوح', englishName: 'Nuh', pages: [570, 571] },
  { id: 72, name: 'الجن', englishName: 'Al-Jinn', pages: [572, 573] },
  { id: 73, name: 'المزمل', englishName: 'Al-Muzzammil', pages: [574, 575] },
  { id: 74, name: 'المدثر', englishName: 'Al-Muddaththir', pages: [575, 577] },
  { id: 75, name: 'القيامة', englishName: 'Al-Qiyamah', pages: [577, 578] },
  { id: 76, name: 'الإنسان', englishName: 'Al-Insan', pages: [578, 580] },
  { id: 77, name: 'المرسلات', englishName: 'Al-Mursalat', pages: [580, 581] },
  { id: 78, name: 'النبأ', englishName: 'An-Naba', pages: [582, 583] },
  { id: 79, name: 'النازعات', englishName: 'An-Naziat', pages: [583, 584] },
  { id: 80, name: 'عبس', englishName: 'Abasa', pages: [585, 585] },
  { id: 81, name: 'التكوير', englishName: 'At-Takwir', pages: [586, 586] },
  { id: 82, name: 'الانفطار', englishName: 'Al-Infitar', pages: [587, 587] },
  { id: 83, name: 'المطففين', englishName: 'Al-Mutaffifin', pages: [587, 589] },
  { id: 84, name: 'الانشقاق', englishName: 'Al-Inshiqaq', pages: [589, 589] },
  { id: 85, name: 'البروج', englishName: 'Al-Buruj', pages: [590, 590] },
  { id: 86, name: 'الطارق', englishName: 'At-Tariq', pages: [591, 591] },
  { id: 87, name: 'الأعلى', englishName: 'Al-Ala', pages: [591, 592] },
  { id: 88, name: 'الغاشية', englishName: 'Al-Ghashiyah', pages: [592, 592] },
  { id: 89, name: 'الفجر', englishName: 'Al-Fajr', pages: [593, 594] },
  { id: 90, name: 'البلد', englishName: 'Al-Balad', pages: [594, 594] },
  { id: 91, name: 'الشمس', englishName: 'Ash-Shams', pages: [595, 595] },
  { id: 92, name: 'الليل', englishName: 'Al-Layl', pages: [595, 596] },
  { id: 93, name: 'الضحى', englishName: 'Ad-Duhaa', pages: [596, 596] },
  { id: 94, name: 'الشرح', englishName: 'Ash-Sharh', pages: [596, 596] },
  { id: 95, name: 'التين', englishName: 'At-Tin', pages: [597, 597] },
  { id: 96, name: 'العلق', englishName: 'Al-Alaq', pages: [597, 597] },
  { id: 97, name: 'القدر', englishName: 'Al-Qadr', pages: [598, 598] },
  { id: 98, name: 'البينة', englishName: 'Al-Bayyinah', pages: [598, 599] },
  { id: 99, name: 'الزلزلة', englishName: 'Az-Zalzalah', pages: [599, 599] },
  { id: 100, name: 'العاديات', englishName: 'Al-Adiyat', pages: [599, 600] },
  { id: 101, name: 'القارعة', englishName: 'Al-Qariah', pages: [600, 600] },
  { id: 102, name: 'التكاثر', englishName: 'At-Takathur', pages: [600, 600] },
  { id: 103, name: 'العصر', englishName: 'Al-Asr', pages: [601, 601] },
  { id: 104, name: 'الهمزة', englishName: 'Al-Humazah', pages: [601, 601] },
  { id: 105, name: 'الفيل', englishName: 'Al-Fil', pages: [601, 601] },
  { id: 106, name: 'قريش', englishName: 'Quraysh', pages: [602, 602] },
  { id: 107, name: 'الماعون', englishName: 'Al-Maun', pages: [602, 602] },
  { id: 108, name: 'الكوثر', englishName: 'Al-Kawthar', pages: [602, 602] },
  { id: 109, name: 'الكافرون', englishName: 'Al-Kafirun', pages: [603, 603] },
  { id: 110, name: 'النصر', englishName: 'An-Nasr', pages: [603, 603] },
  { id: 111, name: 'المسد', englishName: 'Al-Masad', pages: [603, 603] },
  { id: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas', pages: [604, 604] },
  { id: 113, name: 'الفلق', englishName: 'Al-Falaq', pages: [604, 604] },
  { id: 114, name: 'الناس', englishName: 'An-Nas', pages: [604, 604] }
];
