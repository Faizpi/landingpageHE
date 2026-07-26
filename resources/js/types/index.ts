/**
 * Bentuk data yang dikirim controller ke halaman landing.
 *
 * Setiap teks yang dapat diterjemahkan hadir berpasangan: field dasar berisi
 * Bahasa Indonesia, dan field bersufiks `_en` berisi Bahasa Inggris yang diisi
 * otomatis saat konten disimpan di panel admin. Field `_en` sengaja bertipe
 * nullable karena boleh kosong — komponen memakai `pick()` dari lib/i18n untuk
 * jatuh kembali ke teks Indonesia bila versi Inggris tidak tersedia.
 */

export interface HeroContent {
    badge_text: string | null;
    badge_text_en: string | null;
    title: string;
    title_en: string | null;
    title_highlight: string | null;
    title_highlight_en: string | null;
    subtitle: string | null;
    subtitle_en: string | null;
    description: string | null;
    description_en: string | null;
    button_primary_text: string | null;
    button_primary_text_en: string | null;
    button_primary_link: string | null;
    button_secondary_text: string | null;
    button_secondary_text_en: string | null;
    button_secondary_link: string | null;
    stat_1_value: string | null;
    stat_1_label: string | null;
    stat_1_label_en: string | null;
    stat_2_value: string | null;
    stat_2_label: string | null;
    stat_2_label_en: string | null;
    stat_3_value: string | null;
    stat_3_label: string | null;
    stat_3_label_en: string | null;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface AboutContent {
    section_label: string | null;
    section_label_en: string | null;
    title: string;
    title_en: string | null;
    title_highlight: string | null;
    title_highlight_en: string | null;
    description: string | null;
    description_en: string | null;
    features: Feature[];
    stats: Stat[];
    image: string | null;
}

export interface Service {
    id: number;
    name: string;
    name_en: string | null;
    description: string | null;
    description_en: string | null;
    image: string | null;
    link: string | null;
    is_coming_soon: boolean;
}

export interface ServiceCategory {
    id: number;
    title: string;
    title_en: string | null;
    icon: string | null;
    color: string | null;
    bg_color: string | null;
    services: Service[];
}

export interface ContactInfo {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
}

export interface SocialLinks {
    whatsapp: string;
    instagram: string;
    facebook: string;
}

export interface ContactContent {
    section_label: string | null;
    section_label_en: string | null;
    title: string;
    title_en: string | null;
    title_highlight: string | null;
    title_highlight_en: string | null;
    description: string | null;
    description_en: string | null;
    contact_info: ContactInfo;
    social_links: SocialLinks;
}

export interface FooterContent {
    company_name: string;
    tagline: string | null;
    tagline_en: string | null;
    description: string | null;
    description_en: string | null;
    copyright_text: string | null;
    copyright_text_en: string | null;
    links: { label: string; url: string }[] | null;
    social_links: SocialLinks | null;
}

export interface LandingPageProps {
    hero: HeroContent;
    about: AboutContent;
    categories: ServiceCategory[];
    contact: ContactContent;
    footer: FooterContent;
}
