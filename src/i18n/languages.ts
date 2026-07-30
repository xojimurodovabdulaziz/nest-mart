export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  supported: boolean;
}

// `supported: true` bo'lganlar uchun /i18n/translations.ts ichida to'liq lug'at bor.
// Qolganlari ro'yxatda ko'rinadi (qidirish mumkin), lekin tanlanganda "Tez orada" deb ko'rsatiladi.
export const WORLD_LANGUAGES: LanguageOption[] = [
  { code: "uz", name: "Uzbek", nativeName: "O'zbekcha", flag: "🇺🇿", supported: true },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", supported: true },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", supported: true },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", supported: false },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", supported: false },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", supported: false },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", supported: false },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", supported: false },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", supported: false },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", supported: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", supported: false },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", supported: false },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", supported: false },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", supported: false },
  { code: "kk", name: "Kazakh", nativeName: "Қазақша", flag: "🇰🇿", supported: false },
  { code: "ky", name: "Kyrgyz", nativeName: "Кыргызча", flag: "🇰🇬", supported: false },
  { code: "tg", name: "Tajik", nativeName: "Тоҷикӣ", flag: "🇹🇯", supported: false },
  { code: "tk", name: "Turkmen", nativeName: "Türkmençe", flag: "🇹🇲", supported: false },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿", supported: false },
  { code: "ka", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪", supported: false },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն", flag: "🇦🇲", supported: false },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", supported: false },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", supported: false },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", supported: false },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", supported: false },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴", supported: false },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮", supported: false },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰", supported: false },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷", supported: false },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿", supported: false },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴", supported: false },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺", supported: false },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", supported: false },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", supported: false },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", supported: false },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", supported: false },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", supported: false },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", supported: false },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", supported: false },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", supported: false },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", supported: false },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹", supported: false },
  { code: "mn", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳", supported: false },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬", supported: false },
  { code: "sr", name: "Serbian", nativeName: "Српски", flag: "🇷🇸", supported: false },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷", supported: false },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰", supported: false },
];
