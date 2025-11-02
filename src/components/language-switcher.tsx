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
      className="hidden md:flex fixed top-6 right-6 z-50 items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:border-gray-300 hover:bg-white transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none cursor-pointer"
      aria-label={`Changer de langue vers ${currentLocale === 'en' ? 'Français' : 'English'}`}
    >
      <Languages className="w-4 h-4" aria-hidden="true" />
      <span className="text-sm font-medium uppercase">{currentLocale}</span>
    </button>
  );
}
