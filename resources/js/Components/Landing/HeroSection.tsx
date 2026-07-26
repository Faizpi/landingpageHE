import type { HeroContent } from '@/types';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent } from 'react';
import { HeroArrowRight, HeroMousePointer } from './HeroIcons';
import { useTranslation } from '../../lib/i18n';

interface HeroSectionProps { readonly data: HeroContent; }

export default function HeroSection({ data }: HeroSectionProps) {
    const { t, pick } = useTranslation();

    // Setiap teks diambil lewat `pick` agar mengikuti bahasa aktif, dengan
    // teks Bahasa Indonesia sebagai cadangan bila versi Inggris kosong.
    const badge = pick(data.badge_text, data.badge_text_en);
    const title = pick(data.title, data.title_en);
    const titleHighlight = pick(data.title_highlight, data.title_highlight_en);
    const description = pick(data.description, data.description_en);
    const primaryLabel = pick(data.button_primary_text, data.button_primary_text_en) || t('hero.cta_primary');
    const primaryLink = data.button_primary_link || '#contact';
    const secondaryLabel = pick(data.button_secondary_text, data.button_secondary_text_en);

    const stats = [
        { value: data.stat_1_value, label: pick(data.stat_1_label, data.stat_1_label_en) },
        { value: data.stat_2_value, label: pick(data.stat_2_label, data.stat_2_label_en) },
        { value: data.stat_3_value, label: pick(data.stat_3_label, data.stat_3_label_en) },
    ].filter((stat): stat is { readonly value: string; readonly label: string } => Boolean(stat.value && stat.label));

    // Emblem dimiringkan halus mengikuti kursor; dinonaktifkan bila pengguna
    // memilih mengurangi animasi di pengaturan sistemnya.
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

    const fadeUp = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
        visible: { opacity: 1, y: 0 },
    };

    const easing = [0.22, 1, 0.36, 1] as const;

    return (
        <section id="hero" className="section-anchor hero-surface">
            <div className="hero-glow" aria-hidden="true" />

            <div className="mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-14 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.09 }}
                    className="max-w-2xl"
                >
                    {badge ? (
                        <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: easing }} className="eyebrow">
                            {badge}
                        </motion.p>
                    ) : null}

                    <motion.h1
                        variants={fadeUp}
                        transition={{ duration: 0.7, ease: easing }}
                        className={`hero-title ${badge ? 'mt-8' : ''}`}
                    >
                        {title}
                        {titleHighlight ? (
                            <>
                                {' '}
                                <span className="title-accent">{titleHighlight}</span>
                            </>
                        ) : null}
                    </motion.h1>

                    {description ? (
                        <motion.p
                            variants={fadeUp}
                            transition={{ duration: 0.7, ease: easing }}
                            className="mt-7 max-w-xl text-lg leading-[1.75] text-ink-600 dark:text-cream-100/65"
                        >
                            {description}
                        </motion.p>
                    ) : null}

                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.7, ease: easing }}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <a href={primaryLink} className="button-primary">
                            {primaryLabel}
                            <HeroArrowRight className="button-arrow h-4 w-4" />
                        </a>
                        {secondaryLabel && data.button_secondary_link ? (
                            <a href={data.button_secondary_link} className="button-secondary">{secondaryLabel}</a>
                        ) : null}
                    </motion.div>

                    {stats.length > 0 ? (
                        <motion.dl
                            variants={fadeUp}
                            transition={{ duration: 0.7, ease: easing }}
                            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-8 hairline sm:flex sm:flex-wrap sm:items-start sm:gap-x-0"
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={`${stat.value}-${stat.label}`}
                                    className={`min-w-0 sm:pr-10 ${index > 0 ? 'hairline sm:border-l sm:pl-10' : ''}`}
                                >
                                    <dd className="stat-value">{stat.value}</dd>
                                    <dt className="stat-label">{stat.label}</dt>
                                </div>
                            ))}
                        </motion.dl>
                    ) : null}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: easing }}
                    className="hero-badge-stage"
                >
                    <motion.div
                        className="hero-badge"
                        onPointerMove={handleBadgePointerMove}
                        onPointerLeave={resetBadge}
                        style={prefersReducedMotion ? undefined : { rotateX: tiltX, rotateY: tiltY }}
                    >
                        <img
                            src="/hibiscusefsya.png"
                            width="1563"
                            height="1563"
                            fetchPriority="high"
                            decoding="async"
                            alt="Hibiscus Efsya — Part of M.B.K Indonesia"
                            className="hero-badge-image"
                        />
                    </motion.div>
                </motion.div>
            </div>

            <a href="#about" className="hero-scroll-link">
                <span>{t('hero.scroll')}</span>
                <HeroMousePointer className="h-4 w-4" />
            </a>
        </section>
    );
}
