/**
 * Ikon garis untuk kategori layanan.
 *
 * Kunci di sini harus sama persis dengan daftar di `app/Support/ServiceIcon.php`,
 * karena admin memilih ikon lewat panel dan nilainya disimpan sebagai teks.
 * Menggunakan komponen SVG (bukan emoji) menjaga tampilan tetap identik di
 * semua perangkat dan mewarisi warna dari elemen induk.
 */

import type { ComponentType } from 'react';

type IconProps = { readonly className?: string };

const base = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
};

function Sparkles({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 3l1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9L12 3z" />
            <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
        </svg>
    );
}

function Leaf({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M4 20c8.5 0 15-5.2 15-13v-2h-2C9.2 5 4 11.5 4 20z" />
            <path d="M4 20c2.5-4.5 6-8 10.5-10.5" />
        </svg>
    );
}

function Heart({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 20.3l-1.4-1.3C5.6 14.5 2.8 12 2.8 8.8 2.8 6.2 4.9 4 7.5 4c1.7 0 3.3.8 4.5 2.2C13.2 4.8 14.8 4 16.5 4 19.1 4 21.2 6.2 21.2 8.8c0 3.2-2.8 5.7-7.8 10.2L12 20.3z" />
        </svg>
    );
}

function ShoppingBag({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M5 8h14l-1 12H6L5 8z" />
            <path d="M9 8V6a3 3 0 016 0v2" />
        </svg>
    );
}

function Shirt({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M9 3l3 2 3-2 5 3-2 4-1.5-.8V21h-9V9.2L6 10 4 6l5-3z" />
        </svg>
    );
}

function Gem({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M6 3h12l3 6-9 12L3 9l3-6z" />
            <path d="M3 9h18M9 3l3 6 3-6M12 9v12" />
        </svg>
    );
}

function Globe({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
        </svg>
    );
}

function Plane({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M10.2 13.8L3 11.5l1-1.7 5.6.7L13 6.7c1-1 2.5-2 3.6-2.6.8-.4 1.6.4 1.2 1.2-.6 1.1-1.6 2.6-2.6 3.6l-3.8 3.4.7 5.6-1.7 1-2.2-7.1z" />
        </svg>
    );
}

function MapPin({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

function Monitor({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8M12 16v4" />
        </svg>
    );
}

function Smartphone({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
            <path d="M11 18.5h2" />
        </svg>
    );
}

function Chart({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M4 20h16" />
            <path d="M7 20v-6M12 20V7M17 20v-9" />
        </svg>
    );
}

function Briefcase({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 12h18" />
        </svg>
    );
}

function Store({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M4 9h16v11H4V9z" />
            <path d="M3 9l1.5-5h15L21 9M9 20v-6h6v6" />
        </svg>
    );
}

function Truck({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M3 6h11v10H3V6zM14 10h4l3 3v3h-7v-6z" />
            <circle cx="7" cy="18" r="1.8" />
            <circle cx="17" cy="18" r="1.8" />
        </svg>
    );
}

function Utensils({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M6 3v7a2 2 0 002 2v9M6 3v5M9.5 3v5M16 21V3c2 1 3 3.5 3 6.5S17.5 14 16 14" />
        </svg>
    );
}

function Coffee({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M4 9h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V9z" />
            <path d="M17 10h1.5a2.5 2.5 0 010 5H17M6 3v2M10 3v2M14 3v2" />
        </svg>
    );
}

function GraduationCap({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 4l10 5-10 5-10-5 10-5z" />
            <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
        </svg>
    );
}

function Shield({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 3l8 3v6c0 4.6-3.3 8.2-8 9.5-4.7-1.3-8-4.9-8-9.5V6l8-3z" />
            <path d="M9.2 12.2l2 2 3.6-3.8" />
        </svg>
    );
}

function Users({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
            <path d="M16 5.2a3.2 3.2 0 010 6M17 14.8c2.4.5 4 2.5 4 5.2" />
        </svg>
    );
}

/** Ikon cadangan bila kategori belum memilih ikon apa pun. */
function Layers({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M12 3l9 5-9 5-9-5 9-5z" />
            <path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" />
        </svg>
    );
}

const ICONS: Record<string, ComponentType<IconProps>> = {
    sparkles: Sparkles,
    leaf: Leaf,
    heart: Heart,
    'shopping-bag': ShoppingBag,
    shirt: Shirt,
    gem: Gem,
    globe: Globe,
    plane: Plane,
    'map-pin': MapPin,
    monitor: Monitor,
    smartphone: Smartphone,
    chart: Chart,
    briefcase: Briefcase,
    store: Store,
    truck: Truck,
    utensils: Utensils,
    coffee: Coffee,
    'graduation-cap': GraduationCap,
    shield: Shield,
    users: Users,
};

/**
 * Menampilkan ikon kategori berdasarkan kunci yang dipilih admin.
 *
 * Nilai lama berupa emoji (misalnya "✨") tidak akan cocok dengan kunci mana pun
 * dan otomatis memakai ikon cadangan, sehingga data lama tetap aman.
 */
export function ServiceIcon({ name, className }: { readonly name: string | null; readonly className?: string }) {
    const Icon = (name && ICONS[name]) || Layers;

    return <Icon className={className} />;
}

export function hasServiceIcon(name: string | null): boolean {
    return Boolean(name && name in ICONS);
}
