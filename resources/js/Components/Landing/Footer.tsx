import type { FooterContent } from '@/types';
import logoImg from '../../images/logo-icon.png';
import { useTranslation } from '../../lib/i18n';

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.855L.057 23.882l6.19-1.624A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.899 0-3.667-.511-5.19-1.4l-.372-.22-3.876 1.016 1.034-3.775-.24-.388A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

interface FooterProps {
    data: FooterContent;
}

export default function Footer({ data }: FooterProps) {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white dark:border-white/[0.06] dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <img src={logoImg} alt="Hibiscus Efsya" className="h-8 w-8 rounded-full object-cover" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {data.company_name}
                            </span>
                        </div>
                        {data.tagline && (
                            <p className="mt-2 text-sm font-medium text-primary">
                                {data.tagline}
                            </p>
                        )}
                        {data.description && (
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-white/40">
                                {data.description}
                            </p>
                        )}

                        {/* Social Links */}
                        <div className="mt-6 flex gap-3">
                            {data.social_links?.whatsapp && (
                                <a
                                    href={data.social_links.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:text-green-400"
                                    aria-label="WhatsApp"
                                >
                                    <WhatsAppIcon className="h-4 w-4" />
                                </a>
                            )}
                            {data.social_links?.instagram && (
                                <a
                                    href={data.social_links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:text-pink-400"
                                    aria-label="Instagram"
                                >
                                    <InstagramIcon className="h-4 w-4" />
                                </a>
                            )}
                            {data.social_links?.facebook && (
                                <a
                                    href={data.social_links.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:text-blue-400"
                                    aria-label="Facebook"
                                >
                                    <FacebookIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {data.links && data.links.length > 0 ? (
                        <div className="grid grid-cols-2 gap-8 sm:col-span-1 sm:grid-cols-3 lg:col-span-3">
                            {/* Navigasi */}
                            <div>
                                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white/80">
                                    {t('nav.about')}
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: 'Beranda', url: '#hero' },
                                        { label: t('nav.about'), url: '#about' },
                                        { label: t('nav.services'), url: '#services' },
                                        { label: t('nav.contact'), url: '#contact' },
                                    ].map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document
                                                        .querySelector(link.url)
                                                        ?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Layanan */}
                            <div>
                                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white/80">
                                    {t('footer.services')}
                                </h4>
                                <ul className="space-y-3">
                                    {data.links.slice(0, 4).map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Perusahaan */}
                            <div>
                                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white/80">
                                    {t('footer.company')}
                                </h4>
                                <ul className="space-y-3">
                                    {data.links.slice(4, 8).map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                    {data.links.length <= 4 && (
                                        <>
                                            <li>
                                                <a
                                                    href="#about"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document
                                                            .querySelector('#about')
                                                            ?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                                >
                                                    {t('footer.about')}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#contact"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        document
                                                            .querySelector('#contact')
                                                            ?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                                >
                                                    {t('footer.contact')}
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-3">
                            <div>
                                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white/80">
                                    Navigasi
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: 'Beranda', url: '#hero' },
                                        { label: t('nav.about'), url: '#about' },
                                        { label: t('nav.services'), url: '#services' },
                                        { label: t('nav.contact'), url: '#contact' },
                                    ].map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document
                                                        .querySelector(link.url)
                                                        ?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white/80">
                                    {t('footer.company')}
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#about"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document
                                                    .querySelector('#about')
                                                    ?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                        >
                                            {t('footer.about')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#contact"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document
                                                    .querySelector('#contact')
                                                    ?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                                        >
                                            {t('footer.contact')}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-200 dark:border-white/[0.06]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-400 dark:text-white/30">
                        {data.copyright_text ||
                            `© ${currentYear} ${data.company_name}. All rights reserved.`}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-white/20">
                        Part of M.B.K Indonesia
                    </p>
                </div>
            </div>
        </footer>
    );
}
