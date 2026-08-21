import { i18n, type Locale } from './config/i18n.config';

export function getPreferredLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return i18n.defaultLocale;

  const languages = acceptLanguageHeader.split(',').map((lang) => {
    const [tag] = lang.trim().split(';');
    return tag.toLowerCase().slice(0, 2);
  });

  for (const lang of languages) {
    if (i18n.locales.includes(lang as Locale)) {
      return lang as Locale;
    }
  }

  return i18n.defaultLocale;
}

export function isPathMissingLocale(pathname: string): boolean {
  return i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
}
