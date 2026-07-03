import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from 'framer-motion';
import { useRef, type PointerEvent } from 'react';
import { HeroArrowRight, HeroMousePointer } from './HeroIcons';
import type { HeroContent } from '@/types';
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

const HERO_TILT_BOUNDS = {
    rotateX: 12,
    rotateY: 16,
};

const heroTiltSpring = {
    stiffness: 260,
    damping: 28,
    mass: 0.55,
};

export default function HeroSection({ data }: HeroSectionProps) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion() ?? false;
    const heroCardRef = useRef<HTMLDivElement>(null);
    const heroImage = '/hibiscusefsya.png';
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springRotateX = useSpring(rotateX, heroTiltSpring);
    const springRotateY = useSpring(rotateY, heroTiltSpring);

    const stats = [
        { value: data.stat_1_value, label: data.stat_1_label },
        { value: data.stat_2_value, label: data.stat_2_label },
        { value: data.stat_3_value, label: data.stat_3_label },
    ].filter((s) => s.value && s.label);

    const resetHeroTilt = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const handleHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion) {
            return;
        }

        const bounds = heroCardRef.current?.getBoundingClientRect();

        if (!bounds) {
            return;
        }

        const horizontalProgress = (event.clientX - bounds.left) / bounds.width - 0.5;
        const verticalProgress = (event.clientY - bounds.top) / bounds.height - 0.5;

        rotateX.set(verticalProgress * -HERO_TILT_BOUNDS.rotateX);
        rotateY.set(horizontalProgress * HERO_TILT_BOUNDS.rotateY);
    };

    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center overflow-hidden bg-[#faf7f2] pt-24 pb-16 dark:bg-[#0a0a0a]"
        >
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
                >
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        {data.badge_text && (
                            <motion.div variants={itemVariants}>
                                <span className="badge-pill">
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
                                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-300 hover:shadow-md"
                                >
                                    {data.button_primary_text || t('hero.cta_primary')}
                                    <HeroArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </a>
                            )}
                            {data.button_secondary_text && (
                                <a
                                    href={data.button_secondary_link || '#services'}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/85 px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80 dark:hover:border-white/20"
                                >
                                    {data.button_secondary_text || t('hero.cta_secondary')}
                                </a>
                            )}
                        </motion.div>

                        {/* Stats Row */}
                        {stats.length > 0 && (
                            <motion.div
                                variants={itemVariants}
                                className="flex gap-8 border-t border-gray-100 pt-8 dark:border-white/10"
                            >
                                {stats.map((stat, i) => (
                                    <div key={i} className="text-center">
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

                    {/* Right Column - Interactive 3D Logo */}
                    <motion.div
                        variants={itemVariants}
                        className="relative flex items-center justify-center lg:justify-end"
                    >
                        <motion.div
                            animate={
                                reduceMotion
                                    ? { y: 0 }
                                    : {
                                        y: [0, -14, 0],
                                        rotateX: [0, 2.2, 0, -1.4, 0],
                                        rotateY: [0, -3, 0, 3, 0],
                                    }
                            }
                            transition={{
                                duration: 7,
                                repeat: reduceMotion ? 0 : Infinity,
                                ease: 'easeInOut',
                            }}
                            className="relative w-full max-w-sm [perspective:1200px] sm:max-w-md lg:max-w-lg"
                        >
                            <motion.div
                                ref={heroCardRef}
                                className="group relative cursor-grab touch-pan-y select-none [transform-style:preserve-3d] active:cursor-grabbing"
                                style={{
                                    rotateX: springRotateX,
                                    rotateY: springRotateY,
                                }}
                                onPointerMove={handleHeroPointerMove}
                                onPointerLeave={resetHeroTilt}
                                onPointerUp={resetHeroTilt}
                                onPointerCancel={resetHeroTilt}
                            >
                                <motion.div
                                    className="pointer-events-none absolute inset-x-10 bottom-3 h-16 rounded-full bg-black/[0.06] blur-2xl transition-opacity duration-300 group-hover:opacity-90 dark:bg-primary/20"
                                    animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
                                    transition={{ duration: 7, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                                />
                                <motion.div
                                    className="pointer-events-none absolute right-8 top-10 h-28 w-28 rounded-full bg-transparent dark:bg-amber-300/10 dark:blur-3xl"
                                    animate={reduceMotion ? { x: 0, y: 0 } : { x: [0, 10, 0], y: [0, -8, 0] }}
                                    transition={{ duration: 8, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                                />
                                <motion.img
                                    src={heroImage}
                                    alt="Hibiscus Efsya"
                                    draggable={false}
                                    className="relative z-10 mx-auto w-full object-contain drop-shadow-[0_22px_32px_rgba(15,23,42,0.12)] transition-[filter] duration-300 [transform:translateZ(28px)] group-hover:drop-shadow-[0_30px_45px_rgba(15,23,42,0.16)] dark:drop-shadow-[0_35px_70px_rgba(0,0,0,0.55)] dark:group-hover:drop-shadow-[0_42px_82px_rgba(0,0,0,0.66)]"
                                />
                                <div className="pointer-events-none absolute inset-x-12 top-8 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-white/25" />
                            </motion.div>
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
