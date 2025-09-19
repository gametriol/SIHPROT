import { useEffect, useMemo, useState } from 'react';
import { baseTranslations, TranslationMap } from './base';
import { translateText } from './translateClient';

export type Locale = 'en' | 'hi' | 'pa' | 'bho' | string;

const STORAGE_KEY = 'medi-mantra_translations_';
const LOCALE_KEY = 'medi-mantra_lang';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return (localStorage.getItem(LOCALE_KEY) as Locale) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try { localStorage.setItem(LOCALE_KEY, locale); } catch {};
  }, [locale]);

  return { locale, setLocale } as const;
}

export function useTranslation() {
  const { locale } = useLocale();
  const [map, setMap] = useState<TranslationMap>(() => baseTranslations as TranslationMap);

  useEffect(() => {
    if (!locale || locale === 'en') {
      setMap(baseTranslations as TranslationMap);
      return;
    }

    const storageKey = STORAGE_KEY + locale;
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try { setMap(JSON.parse(cached)); return; } catch {}
    }

    // fetch translations for each key in baseTranslations
    (async () => {
      const entries = Object.entries(baseTranslations) as [string, string][];
      const result: Record<string, string> = {};
      for (const [key, text] of entries) {
        try {
          const translated = await translateText(text, locale);
          result[key] = translated;
        } catch {
          result[key] = text;
        }
      }
      localStorage.setItem(storageKey, JSON.stringify(result));
      setMap(result as TranslationMap);
    })();
  }, [locale]);

  const t = useMemo(() => (key: string) => (map as any)[key] || key, [map]);

  return { t, locale } as const;
}
