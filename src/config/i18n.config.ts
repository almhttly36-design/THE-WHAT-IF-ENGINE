export const i18n = {
  defaultLocale: 'ar',
  locales: ['ar', 'en', 'es', 'fr'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// Text direction mapping for layout and typography styling
export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
  es: 'ltr',
  fr: 'ltr',
};

// Human-readable labels for language selectors
export const localeLabels: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  es: 'Español',
  fr: 'Français',
};
