import { useTranslation } from '../../lib/i18n';
import { HeroGlobe } from './HeroIcons';

export function LanguageSwitcher() {
    const { locale, setLocale } = useTranslation();

    return (
        <button
            onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-white/80 backdrop-blur-sm transition-all hover:bg-gray-200 dark:hover:bg-white/15 active:scale-95"
            title={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
        >
            <HeroGlobe className="h-3.5 w-3.5 text-gray-500 dark:text-white/60" />
            <span>{locale === 'id' ? 'Indonesia' : 'English'}</span>
        </button>
    );
}
