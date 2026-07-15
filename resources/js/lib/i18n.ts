import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Locale = 'id' | 'en';
type TranslationTree = string | { readonly [key: string]: TranslationTree };

const translations = {
    id: {
        nav: { about: 'Tentang', services: 'Layanan', contact: 'Kontak', home: 'Beranda' },
        hero: { cta_primary: 'Mulai bermitra', cta_secondary: 'Lihat layanan', scroll: 'Jelajahi lebih lanjut' },
        about: { label: 'Tentang kami', why_partner: 'Mengapa bermitra' },
        services: { label: 'Layanan', title: 'Solusi digital yang jelas untuk langkah bisnis berikutnya.', description: 'Pilih kategori untuk menemukan layanan yang paling sesuai dengan kebutuhan bisnis Anda.', visit: 'Kunjungi layanan', coming_soon: 'Segera hadir', empty: 'Layanan untuk kategori ini akan segera tersedia.' },
        contact: { label: 'Hubungi kami', name: 'Nama lengkap', email: 'Email', subject: 'Subjek', message: 'Pesan', send: 'Kirim pesan', sending: 'Mengirim pesan…', quick_chat: 'Chat via WhatsApp', phone: 'Telepon', address: 'Alamat', success: 'Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.', failure: 'Pesan belum dapat dikirim. Silakan coba lagi atau gunakan saluran kontak alternatif.', fallback: 'Hubungi melalui saluran alternatif' },
        footer: { services: 'Layanan', company: 'Perusahaan', about: 'Tentang kami', contact: 'Kontak' },
    },
    en: {
        nav: { about: 'About', services: 'Services', contact: 'Contact', home: 'Home' },
        hero: { cta_primary: 'Start a partnership', cta_secondary: 'Explore services', scroll: 'Explore more' },
        about: { label: 'About us', why_partner: 'Why partner' },
        services: { label: 'Services', title: 'Clear digital solutions for your next business step.', description: 'Choose a category to find services that fit your business needs.', visit: 'Visit service', coming_soon: 'Coming soon', empty: 'Services for this category will be available soon.' },
        contact: { label: 'Contact us', name: 'Full name', email: 'Email', subject: 'Subject', message: 'Message', send: 'Send message', sending: 'Sending message…', quick_chat: 'Chat via WhatsApp', phone: 'Phone', address: 'Address', success: 'Your message has been sent. We will be in touch shortly.', failure: 'Your message could not be sent. Please try again or use an alternative contact channel.', fallback: 'Use an alternative contact channel' },
        footer: { services: 'Services', company: 'Company', about: 'About us', contact: 'Contact' },
    },
} as const satisfies Record<Locale, TranslationTree>;

type TranslationContextValue = {
    readonly locale: Locale;
    readonly setLocale: (locale: Locale) => void;
    readonly t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

function readTranslation(tree: TranslationTree, key: string): string {
    const value = key.split('.').reduce<TranslationTree | undefined>((current, segment) => (
        typeof current === 'object' ? current[segment] : undefined
    ), tree);

    return typeof value === 'string' ? value : key;
}

export function TranslationProvider({ children }: { readonly children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() => (
        typeof window === 'undefined' || window.localStorage.getItem('locale') !== 'en' ? 'id' : 'en'
    ));

    useEffect(() => {
        document.documentElement.lang = locale;
        window.localStorage.setItem('locale', locale);
    }, [locale]);

    const value = useMemo<TranslationContextValue>(() => ({
        locale,
        setLocale: setLocaleState,
        t: (key) => readTranslation(translations[locale], key),
    }), [locale]);

    return createElement(TranslationContext.Provider, { value }, children);
}

export function useTranslation(): TranslationContextValue {
    const context = useContext(TranslationContext);

    if (!context) {
        throw new Error('useTranslation must be used within TranslationProvider');
    }

    return context;
}
