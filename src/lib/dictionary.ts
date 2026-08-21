import type { Locale } from '../config/i18n.config';
import { i18n } from '../config/i18n.config';

import arDict from '../../dictionaries/ar.json';
import enDict from '../../dictionaries/en.json';
import esDict from '../../dictionaries/es.json';
import frDict from '../../dictionaries/fr.json';

const dictionaries = {
  ar: arDict,
  en: enDict,
  es: esDict,
  fr: frDict,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries[i18n.defaultLocale];
};

export type Dictionary = typeof arDict;
