import type { FooterContent } from '@/types';
import logoImg from '../../images/logo-icon.png';
import { useTranslation } from '../../lib/i18n';

interface FooterProps { readonly data: FooterContent; }

type SocialLink = {
    readonly label: string;
    readonly url: string;
};

const fallbackLinks = [
    { key: 'nav.home', url: '#hero' },
    { key: 'nav.about', url: '#about' },
    { key: 'nav.services', url: '#services' },
    { key: 'nav.contact', url: '#contact' },
] as const;

export default function Footer({ data }: FooterProps) {
    const { t } = useTranslation();
    const links = data.links ?? [];
    const navigationLinks = links.length > 0 ? links : fallbackLinks.map((link) => ({ label: t(link.key), url: link.url }));
    const socialLinks: readonly SocialLink[] = [
        data.social_links?.whatsapp ? { label: 'WhatsApp', url: data.social_links.whatsapp } : null,
        data.social_links?.instagram ? { label: 'Instagram', url: data.social_links.instagram } : null,
        data.social_links?.facebook ? { label: 'Facebook', url: data.social_links.facebook } : null,
    ].filter((link): link is SocialLink => link !== null);

    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-[#101010]">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                <div><div className="flex items-center gap-3"><img src={logoImg} width="36" height="36" alt="" className="h-9 w-9 rounded-full object-cover" /><p className="font-bold text-gray-950 dark:text-white">{data.company_name}</p></div>{data.tagline ? <p className="mt-4 font-medium text-primary">{data.tagline}</p> : null}{data.description ? <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-white/65">{data.description}</p> : null}{socialLinks.length > 0 ? <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Social links">{socialLinks.map((link) => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-700 hover:text-primary dark:text-white/75">{link.label}</a></li>)}</ul> : null}</div>
                <nav aria-label="Footer navigation"><ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{navigationLinks.map((link) => <li key={`${link.label}-${link.url}`}><a href={link.url} className="text-sm text-gray-600 hover:text-primary dark:text-white/65">{link.label}</a></li>)}</ul></nav>
            </div>
            <div className="border-t border-gray-200 dark:border-white/10"><div className="mx-auto max-w-7xl px-4 py-5 text-sm text-gray-500 sm:px-6 lg:px-8 dark:text-white/50">{data.copyright_text || `© ${new Date().getFullYear()} ${data.company_name}.`}</div></div>
        </footer>
    );
}
