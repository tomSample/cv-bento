'use client';

import { Languages } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';

export function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'fr' : 'en';
    router.replace('/', { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 transition-all shadow-sm"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{currentLocale}</span>
    </button>
  );
}
