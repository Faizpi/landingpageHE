import type { ComponentType } from 'react';
import type { FooterContent, SocialLinks } from '@/types';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { useTranslation } from '../../lib/i18n';

interface FooterProps { readonly data: FooterContent; }

type SocialLink = {
    readonly label: string;
    readonly url: string;
    readonly Icon: ComponentType<{ readonly className?: string }>;
};

const fallbackLinks = [
    { key: 'nav.home', url: '#hero' },
    { key: 'nav.about', url: '#about' },
    { key: 'nav.services', url: '#services' },
    { key: 'nav.contact', url: '#contact' },
] as const;

const SOCIAL_ICONS: Record<string, ComponentType<{ readonly className?: string }>> = {
    whatsapp: WhatsAppIcon,
    instagram: InstagramIcon,
    facebook: FacebookIcon,
};

const SOCIAL_LABELS: Record<string, string> = {
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
};

/**
 * Menormalkan `social_links` menjadi satu bentuk yang seragam.
 *
 * Data lama tersimpan dalam dua bentuk berbeda tergantung kapan record dibuat:
 * sebagai objek berkunci (`{whatsapp: "..."}`) atau sebagai daftar
 * (`[{platform: "WhatsApp", url: "..."}]`). Keduanya didukung agar ikon tetap
 * tampil tanpa perlu migrasi data.
 */
function normalizeSocialLinks(source: FooterContent['social_links']): readonly SocialLink[] {
    if (!source) return [];

    const entries: { platform: string; url: unknown }[] = Array.isArray(source)
        ? (source as { platform?: string; url?: unknown }[]).map((item) => ({
            platform: String(item.platform ?? ''),
            url: item.url,
        }))
        : Object.entries(source as SocialLinks).map(([platform, url]) => ({ platform, url }));

    return entries.reduce<SocialLink[]>((accumulator, entry) => {
        const key = entry.platform.trim().toLowerCase();
        const Icon = SOCIAL_ICONS[key];

        if (Icon && typeof entry.url === 'string' && entry.url.trim() !== '') {
            accumulator.push({ label: SOCIAL_LABELS[key] ?? entry.platform, url: entry.url, Icon });
        }

        return accumulator;
    }, []);
}

export default function Footer({ data }: FooterProps) {
    const { t, pick } = useTranslation();

    const tagline = pick(data.tagline, data.tagline_en);
    const description = pick(data.description, data.description_en);
    const copyright = pick(data.copyright_text, data.copyright_text_en);

    const links = data.links ?? [];
    const navigationLinks = links.length > 0
        ? links
        : fallbackLinks.map((link) => ({ label: t(link.key), url: link.url }));

    const socialLinks = normalizeSocialLinks(data.social_links);

    return (
        <footer className="border-t surface-page hairline">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
                    <div className="max-w-md">
                        <div className="flex items-center gap-3">
                            <img src="/logo-mark.png" width="56" height="56" alt="" className="h-14 w-14 shrink-0 object-contain" />
                            <p className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-cream-50">
                                {data.company_name}
                            </p>
                        </div>

                        {tagline ? <p className="footer-heading mt-6">{tagline}</p> : null}

                        {description ? (
                            <p className="mt-4 text-sm leading-[1.75] text-ink-600 dark:text-cream-100/60">{description}</p>
                        ) : null}

                        {socialLinks.length > 0 ? (
                            <ul className="mt-7 flex flex-wrap gap-3" aria-label={t('footer_nav.social')}>
                                {socialLinks.map((link) => (
                                    <li key={link.url}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.label}
                                            className="icon-button hover:border-primary-500 hover:text-primary-700 dark:hover:border-primary-300 dark:hover:text-primary-300"
                                        >
                                            <link.Icon className="h-4 w-4" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    <nav aria-label={t('footer_nav.title')} className="lg:justify-self-end">
                        <p className="footer-heading">{t('footer_nav.title')}</p>
                        <ul className="mt-5 grid gap-x-12 gap-y-3 sm:grid-cols-2">
                            {navigationLinks.map((link) => (
                                <li key={`${link.label}-${link.url}`}>
                                    <a href={link.url} className="footer-link">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="border-t hairline">
                <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-ink-500 sm:px-6 lg:px-8 dark:text-cream-100/45">
                    {copyright || `© ${new Date().getFullYear()} ${data.company_name}.`}
                </div>
            </div>
        </footer>
    );
}
