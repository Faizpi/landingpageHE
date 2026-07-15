import type { HeroContent } from '@/types';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent } from 'react';
import { HeroArrowRight, HeroMousePointer } from './HeroIcons';
import { useTranslation } from '../../lib/i18n';

interface HeroSectionProps { readonly data: HeroContent; }

export default function HeroSection({ data }: HeroSectionProps) {
    const { t } = useTranslation();
    const stats = [
        { value: data.stat_1_value, label: data.stat_1_label },
        { value: data.stat_2_value, label: data.stat_2_label },
        { value: data.stat_3_value, label: data.stat_3_label },
    ].filter((stat): stat is { readonly value: string; readonly label: string } => Boolean(stat.value && stat.label));
    const primaryLabel = data.button_primary_text || t('hero.cta_primary');
    const primaryLink = data.button_primary_link || '#contact';
    const prefersReducedMotion = useReducedMotion();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 24, mass: 0.7 });
    const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-11, 11]), { stiffness: 180, damping: 24, mass: 0.7 });

    const handleBadgePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    };

    const resetBadge = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <section id="hero" className="section-anchor hero-surface">
            <div className="mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                <div className="space-y-7">
                    {data.badge_text ? <p className="eyebrow">{data.badge_text}</p> : null}
                    <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">
                        {data.title}{data.title_highlight ? <span className="block text-primary sm:inline"> {' '}{data.title_highlight}</span> : null}
                    </h1>
                    {data.description ? <p className="max-w-2xl text-pretty text-lg leading-8 text-gray-600 dark:text-white/70">{data.description}</p> : null}
                    <div className="flex flex-wrap items-center gap-4">
                        <a href={primaryLink} className="button-primary">{primaryLabel}<HeroArrowRight className="h-4 w-4" /></a>
                        {data.button_secondary_text && data.button_secondary_link ? <a href={data.button_secondary_link} className="button-secondary">{data.button_secondary_text}</a> : null}
                    </div>
                    {stats.length > 0 ? <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-gray-200 pt-6 dark:border-white/10">{stats.map((stat) => <div key={`${stat.value}-${stat.label}`}><dt className="text-sm text-gray-500 dark:text-white/55">{stat.label}</dt><dd className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">{stat.value}</dd></div>)}</dl> : null}
                </div>
                <div className="hero-badge-stage">
                    <motion.div
                        className="hero-badge"
                        onPointerMove={handleBadgePointerMove}
                        onPointerLeave={resetBadge}
                        style={prefersReducedMotion ? undefined : { rotateX: tiltX, rotateY: tiltY }}
                    >
                        <img src="/hibiscusefsya.png" width="720" height="720" fetchPriority="high" decoding="async" alt="Hibiscus Efsya" className="hero-badge-image" />
                    </motion.div>
                </div>
            </div>
            <a href="#about" className="hero-scroll-link"><span>{t('hero.scroll')}</span><HeroMousePointer className="h-5 w-5" /></a>
        </section>
    );
}
