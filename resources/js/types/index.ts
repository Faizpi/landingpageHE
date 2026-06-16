export interface HeroContent {
    badge_text: string | null;
    title: string;
    title_highlight: string | null;
    subtitle: string | null;
    description: string | null;
    button_primary_text: string | null;
    button_primary_link: string | null;
    button_secondary_text: string | null;
    button_secondary_link: string | null;
    hero_image: string | null;
    stat_1_value: string | null;
    stat_1_label: string | null;
    stat_2_value: string | null;
    stat_2_label: string | null;
    stat_3_value: string | null;
    stat_3_label: string | null;
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
    title: string;
    title_highlight: string | null;
    description: string | null;
    features: Feature[];
    stats: Stat[];
    image: string | null;
}

export interface Service {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    link: string | null;
    is_coming_soon: boolean;
}

export interface ServiceCategory {
    id: number;
    title: string;
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
    title: string;
    title_highlight: string | null;
    description: string | null;
    contact_info: ContactInfo;
    social_links: SocialLinks;
}

export interface FooterContent {
    company_name: string;
    tagline: string | null;
    description: string | null;
    copyright_text: string | null;
    links: { label: string; url: string }[];
    social_links: SocialLinks;
}

export interface LandingPageProps {
    hero: HeroContent;
    about: AboutContent;
    categories: ServiceCategory[];
    contact: ContactContent;
    footer: FooterContent;
}
