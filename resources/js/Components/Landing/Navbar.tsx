import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { HeroBars, HeroMoon, HeroSun, HeroXMark } from './HeroIcons';
import { useTranslation } from '../../lib/i18n';

const navLinks = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.contact', href: '#contact' },
] as const;

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const { t, locale, setLocale } = useTranslation();
    const { resolvedTheme, setTheme } = useTheme();
    const dark = resolvedTheme === 'dark';

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [mobileOpen]);

    // Kapsul navigasi mendapat bayangan setelah halaman digulir, sehingga saat
    // berada di hero tampil menyatu dengan latar.
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const controls = (
        <div className="flex flex-wrap items-center gap-2">
            <div className="capsule-control" aria-label={locale === 'id' ? 'Bahasa' : 'Language'}>
                {(['id', 'en'] as const).map((language) => (
                    <button key={language} type="button" onClick={() => setLocale(language)} aria-pressed={locale === language} className="capsule-option">
                        {language.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="capsule-control" aria-label={locale === 'id' ? 'Tema' : 'Theme'}>
                <button type="button" onClick={() => setTheme('light')} aria-pressed={!dark} className="capsule-option" aria-label={locale === 'id' ? 'Tema terang' : 'Light theme'}><HeroSun className="h-4 w-4" /></button>
                <button type="button" onClick={() => setTheme('dark')} aria-pressed={dark} className="capsule-option" aria-label={locale === 'id' ? 'Tema gelap' : 'Dark theme'}><HeroMoon className="h-4 w-4" /></button>
            </div>
        </div>
    );

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
            <nav className={`nav-capsule mx-auto max-w-7xl ${scrolled ? 'nav-capsule-scrolled' : ''}`} aria-label="Primary navigation">
                <a href="#hero" onClick={() => setMobileOpen(false)} className="flex min-h-11 shrink-0 items-center gap-3 rounded-full pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <img src="/logo-mark.png" width="48" height="48" alt="" className="h-12 w-12 shrink-0 object-contain" />
                    <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-cream-50">
                        Hibiscus <span className="italic text-primary-600 dark:text-primary-300">Efsya</span>
                    </span>
                </a>
                <div className="hidden items-center gap-1 lg:flex">{navLinks.map((link) => <a key={link.href} href={link.href} className="nav-link">{t(link.key)}</a>)}</div>
                <div className="hidden items-center gap-3 lg:flex">{controls}<a href="#contact" className="button-primary !min-h-11 !px-6">{t('nav.contact')}</a></div>
                <button ref={menuButtonRef} type="button" onClick={() => setMobileOpen((open) => !open)} className="icon-button lg:hidden" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}>
                    {mobileOpen ? <HeroXMark className="h-5 w-5" /> : <HeroBars className="h-5 w-5" />}
                </button>
            </nav>
            {mobileOpen ? (
                <div id="mobile-navigation" className="mobile-nav-panel mx-auto mt-2 max-w-7xl lg:hidden">
                    <div className="flex flex-col gap-1">{navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="mobile-nav-link">{t(link.key)}</a>)}</div>
                    <div className="mt-5 flex flex-col gap-4 border-t pt-5 hairline sm:flex-row sm:items-center sm:justify-between">{controls}<a href="#contact" onClick={() => setMobileOpen(false)} className="button-primary">{t('nav.contact')}</a></div>
                </div>
            ) : null}
        </header>
    );
}
