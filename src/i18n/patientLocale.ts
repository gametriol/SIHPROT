import { useEffect, useState } from 'react';
import type { PatientLocale } from './patientTranslations';

const KEY = 'patient_lang';

export function usePatientLocale() {
  const [locale, setLocale] = useState<PatientLocale>(() => {
    try { return (localStorage.getItem(KEY) as PatientLocale) || 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, locale); } catch {}
  }, [locale]);

  return { locale, setLocale } as const;
}
