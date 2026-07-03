import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';
import { HeroArrowRight, HeroMousePointer, HeroCheckCircle } from './HeroIcons';
import type { HeroContent } from '@/types';
import FloatingElement from './FloatingElement';
import logoImg from '../../images/hibiscusefsya1.png';
import { useTranslation } from '../../lib/i18n';

interface HeroSectionProps {
    data: HeroContent;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
};

export default function HeroSection({ data }: HeroSectionProps) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 48,
        stiffness: 360,
        mass: 0.4,
    });

    const heroImageY = useTransform(scrollY, [0, 720], reduceMotion ? [0, 0] : [0, -52]);
    const heroImageScale = useTransform(scrollY, [0, 720], reduceMotion ? [1, 1] : [1, 0.96]);
    const heroRotateX = useTransform(smoothVelocity, [-1400, 0, 1400], reduceMotion ? [0, 0, 0] : [-3, 0, 3]);
    const heroRotateY = useTransform(smoothVelocity, [-1400, 0, 1400], reduceMotion ? [0, 0, 0] : [4, 0, -4]);
    const heroAccentY = useTransform(scrollY, [0, 720], reduceMotion ? [0, 0] : [0, -86]);
    const heroAccentRotate = useTransform(smoothVelocity, [-1400, 0, 1400], reduceMotion ? [0, 0, 0] : [-5, 0, 5]);

    const heroImage = data.hero_image
        ? `/storage/${data.hero_image}`
        : logoImg;

    const stats = [
        { value: data.stat_1_value, label: data.stat_1_label },
        { value: data.stat_2_value, label: data.stat_2_label },
        { value: data.stat_3_value, label: data.stat_3_label },
    ].filter((s) => s.value && s.label);

    return (
        <section
            id="hero"
            className="luxury-section relative isolate flex min-h-screen items-center overflow-hidden bg-white pt-24 pb-16 dark:bg-[#0a0a0a]"
        >
            {/* Atmospheric luxury depth */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="luxury-noise" />
                <div className="absolute -top-28 left-1/2 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,26,26,0.12),rgba(251,191,36,0.07)_34%,transparent_68%)] blur-3xl" />
                <div className="absolute right-[-12rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.13),transparent_65%)] blur-3xl" />
                <div className="absolute bottom-[-14rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(229,26,26,0.09),transparent_66%)] blur-3xl" />
                <div className="absolute inset-x-6 bottom-0 hidden h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent lg:block" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20"
                >
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        {data.badge_text && (
                            <motion.div variants={itemVariants}>
                                <span className="badge-pill luxury-badge">
                                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                                    {data.badge_text}
                                </span>
                            </motion.div>
                        )}

                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-7xl"
                        >
                            {data.title}
                            {data.title_highlight && (
                                <span className="gradient-text block sm:inline">
                                    {' '}{data.title_highlight}
                                </span>
                            )}
                        </motion.h1>

                        {/* Description */}
                        {data.description && (
                            <motion.p
                                variants={itemVariants}
                                className="max-w-xl text-lg leading-relaxed text-gray-500 dark:text-white/55"
                            >
                                {data.description}
                            </motion.p>
                        )}

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-4"
                        >
                            {data.button_primary_text && (
                                <a
                                    href={data.button_primary_link || '#contact'}
                                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(229,26,26,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(229,26,26,0.34)]"
                                >
                                    {data.button_primary_text || t('hero.cta_primary')}
                                    <HeroArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </a>
                            )}
                            {data.button_secondary_text && (
                                <a
                                    href={data.button_secondary_link || '#services'}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/80 px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80 dark:hover:border-white/20"
                                >
                                    {data.button_secondary_text || t('hero.cta_secondary')}
                                </a>
                            )}
                        </motion.div>

                        {/* Stats Row */}
                        {stats.length > 0 && (
                            <motion.div
                                variants={itemVariants}
                                className="luxury-stats flex flex-wrap gap-4 border-t border-gray-100 pt-8 dark:border-white/10 sm:gap-5"
                            >
                                {stats.map((stat, i) => (
                                    <div key={i} className="min-w-[8.25rem] rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-left shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/30">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                            {stat.value}
                                        </div>
                                        <div className="mt-1 text-sm text-gray-400 dark:text-white/40">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Hero Image */}
                    <motion.div
                        variants={itemVariants}
                        className="relative flex items-center justify-center [perspective:1400px] lg:justify-end"
                    >
                        <motion.div
                            className="luxury-velocity-layer relative w-full max-w-md sm:max-w-lg lg:max-w-xl"
                            style={{
                                y: heroImageY,
                                scale: heroImageScale,
                                rotateX: heroRotateX,
                                rotateY: heroRotateY,
                            }}
                        >
                            <motion.div
                                className="pointer-events-none absolute -right-7 -top-8 hidden h-36 w-48 rounded-[2rem] border border-amber-200/60 bg-gradient-to-br from-amber-100/70 via-white/40 to-transparent shadow-[0_28px_75px_rgba(251,191,36,0.18)] backdrop-blur-2xl lg:block"
                                style={{ y: heroAccentY, rotate: heroAccentRotate }}
                            />
                            <div className="pointer-events-none absolute -left-8 bottom-10 hidden h-44 w-36 rounded-[2rem] border border-primary/15 bg-primary/[0.06] shadow-[0_30px_80px_rgba(229,26,26,0.12)] backdrop-blur-2xl lg:block" />
                            <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-primary/12 via-amber-200/15 to-transparent blur-2xl" />

                            <div className="luxury-depth-card relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-[0_35px_100px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111]/80 dark:shadow-black/60 sm:p-4">
                                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                                <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-100 dark:bg-white/5">
                                    <img
                                        src={heroImage}
                                        alt="Hibiscus Efsya"
                                        className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10 mix-blend-multiply dark:from-black/55" />
                                    <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/35 bg-white/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-white shadow-lg backdrop-blur-md">
                                        Premium Studio
                                    </div>
                                </div>

                                {/* Floating satisfaction card */}
                                <FloatingElement
                                    className="absolute -bottom-4 -left-3 z-20 sm:-bottom-6 sm:-left-6"
                                    distance={12}
                                    duration={5}
                                >
                                    <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-[#161616]/90 dark:shadow-black/40">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
                                            <HeroCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {t('hero.trusted')}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-white/40">
                                                {t('hero.since')}
                                            </p>
                                        </div>
                                    </div>
                                </FloatingElement>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
            >
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60"
                >
                    <span className="text-xs">{t('hero.scroll')}</span>
                    <HeroMousePointer className="h-5 w-5 animate-scroll-indicator" />
                </a>
            </motion.div>
        </section>
    );
}
