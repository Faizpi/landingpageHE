import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { HeroBars, HeroXMark, HeroSun, HeroMoon, HeroComputer, HeroCog } from './HeroIcons';
import { useTranslation } from '../../lib/i18n';
import { useTheme } from 'next-themes';
import logoImg from '../../images/logo-icon.png';

const navLinks = [
    { label: 'Tentang', labelEn: 'About', href: '#about' },
    { label: 'Layanan', labelEn: 'Services', href: '#services' },
    { label: 'Kontak', labelEn: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { t, locale, setLocale } = useTranslation();
    const { theme, setTheme } = useTheme();
    const settingsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
                setSettingsOpen(false);
            }
        };
        if (settingsOpen) document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [settingsOpen]);

    const scrollToSection = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    const themeItems = [
        { value: 'light', icon: HeroSun, label: 'Terang', labelEn: 'Light' },
        { value: 'dark', icon: HeroMoon, label: 'Gelap', labelEn: 'Dark' },
        { value: 'system', icon: HeroComputer, label: 'Sistem', labelEn: 'System' },
    ];

    const nav = (href: string, label: string, labelEn: string, isMobile = false, delay = 0) => (
        <motion.a
            key={href}
            href={href}
            initial={isMobile ? { opacity: 0, y: 20 } : undefined}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            exit={isMobile ? { opacity: 0, y: -20 } : undefined}
            transition={isMobile ? { delay, duration: 0.3 } : undefined}
            onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
            className={isMobile
                ? 'text-xl font-medium text-gray-800 dark:text-white/80 transition-colors hover:text-primary'
                : 'rounded-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-white/70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
            }
        >
            {locale === 'id' ? label : labelEn}
        </motion.a>
    );

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-4 right-0 left-0 z-50 mx-auto w-[95%] max-w-5xl rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? 'nav-glass-scrolled' : 'nav-glass'}`}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="flex items-center gap-2.5 shrink-0">
                        <img src={logoImg} alt="Hibiscus Efsya" className="h-9 w-9 rounded-full object-cover" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:inline">
                            Hibiscus <span className="text-primary">Efsya</span>
                        </span>
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((l) => nav(l.href, l.label, l.labelEn))}
                    </div>

                    {/* Desktop Right: Settings Dropdown + CTA */}
                    <div className="hidden items-center gap-3 md:flex">
                        {/* Settings Dropdown */}
                        {mounted && (
                            <div ref={settingsRef} className="relative">
                                <button
                                    onClick={() => setSettingsOpen(!settingsOpen)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 transition-all hover:bg-gray-200 dark:hover:bg-white/15 hover:rotate-90"
                                    title="Pengaturan"
                                >
                                    <HeroCog className="h-5 w-5" />
                                </button>

                                <AnimatePresence>
                                    {settingsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-64 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#1a1a1a]/95 shadow-2xl shadow-black/10 dark:shadow-black/40 backdrop-blur-xl p-4"
                                        >
                                            {/* Theme */}
                                            <p className="px-1 pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">TEMA / THEME</p>
                                            <div className="flex gap-2 mb-6">
                                                {themeItems.map(({ value, icon: Icon, label, labelEn }) => (
                                                    <button
                                                        key={value}
                                                        onClick={() => setTheme(value)}
                                                        className={`flex flex-col flex-1 items-center justify-center gap-2 rounded-2xl py-3 px-2 transition-all ${
                                                            theme === value
                                                                ? 'bg-primary text-white shadow-md shadow-primary/30 ring-1 ring-primary/50'
                                                                : 'bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5'
                                                        }`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                        <span className="text-[10px] font-medium leading-none">{locale === 'id' ? label : labelEn}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Language */}
                                            <p className="px-1 pb-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">BAHASA / LANGUAGE</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(['id', 'en'] as const).map((lang) => (
                                                    <button
                                                        key={lang}
                                                        onClick={() => setLocale(lang)}
                                                        className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-3 px-2 transition-all ${
                                                            locale === lang
                                                                ? 'bg-primary text-white shadow-md shadow-primary/30 ring-1 ring-primary/50'
                                                                : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5'
                                                        }`}
                                                    >
                                                        <span className="text-[13px] font-bold leading-none">{lang === 'id' ? 'ID' : 'EN'}</span>
                                                        <span className="text-[10px] font-medium opacity-80">{lang === 'id' ? 'Indonesia' : 'English'}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }} className="btn-primary-glow !px-5 !py-2 !text-sm">
                            Hubungi Kami
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? (
                                <HeroXMark className="h-5 w-5 text-gray-700 dark:text-white" />
                            ) : (
                                <HeroBars className="h-5 w-5 text-gray-700 dark:text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex h-full flex-col items-center justify-center gap-6 px-8">
                            {navLinks.map((l, i) => nav(l.href, l.label, l.labelEn, true, i * 0.08))}

                            {/* Mobile: Theme + Language */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className="flex w-full max-w-xs flex-col gap-6 mt-8 p-6 rounded-3xl bg-gray-50/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10"
                            >
                                {/* Theme */}
                                <div className="space-y-3">
                                    <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tema</p>
                                    <div className="flex justify-center gap-2">
                                        {themeItems.map(({ value, icon: Icon, label, labelEn }) => (
                                            <button
                                                key={value}
                                                onClick={() => setTheme(value)}
                                                className={`flex flex-col flex-1 items-center justify-center gap-2 rounded-2xl py-3 px-2 transition-all ${
                                                    theme === value
                                                        ? 'bg-primary text-white shadow-md ring-1 ring-primary/50'
                                                        : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5'
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="text-[10px] font-medium">{locale === 'id' ? label : labelEn}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Language */}
                                <div className="space-y-3">
                                    <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Bahasa</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['id', 'en'] as const).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setLocale(lang)}
                                                className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-3 transition-all ${
                                                    locale === lang
                                                        ? 'bg-primary text-white shadow-md ring-1 ring-primary/50'
                                                        : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5'
                                                }`}
                                            >
                                                <span className="text-[13px] font-bold leading-none">{lang === 'id' ? 'ID' : 'EN'}</span>
                                                <span className="text-[10px] font-medium opacity-80">{lang === 'id' ? 'Indonesia' : 'English'}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Mobile CTA */}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                                className="btn-primary-glow mt-2 w-full max-w-xs"
                            >
                                Hubungi Kami
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}