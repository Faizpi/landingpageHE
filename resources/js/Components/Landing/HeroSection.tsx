import { motion } from 'framer-motion';
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
            className="relative flex min-h-screen items-center overflow-hidden bg-white dark:bg-[#0a0a0a] pt-24 pb-16"
        >
            {/* Subtle top gradient accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
            </div>

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
                            className="text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
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
                                className="max-w-lg text-lg leading-relaxed text-gray-500 dark:text-white/50"
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
                                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/30"
                                >
                                    {data.button_primary_text || t('hero.cta_primary')}
                                    <HeroArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </a>
                            )}
                            {data.button_secondary_text && (
                                <a
                                    href={data.button_secondary_link || '#services'}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm dark:border-white/10 dark:bg-transparent dark:text-white/80 dark:hover:border-white/20"
                                >
                                    {data.button_secondary_text || t('hero.cta_secondary')}
                                </a>
                            )}
                        </motion.div>

                        {/* Stats Row */}
                        {stats.length > 0 && (
                            <motion.div
                                variants={itemVariants}
                                className="flex gap-8 border-t border-gray-100 dark:border-white/10 pt-8"
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

                    {/* Right Column - Hero Image */}
                    <motion.div
                        variants={itemVariants}
                        className="relative flex items-center justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-4 shadow-lg shadow-black/[0.04] sm:max-w-lg dark:border-white/10 dark:bg-[#111]">
                            <img
                                src={heroImage}
                                alt="Hibiscus Efsya"
                                className="w-full rounded-2xl object-cover"
                            />

                            {/* Floating satisfaction card */}
                            <FloatingElement
                                className="absolute -bottom-6 -left-6 z-20"
                                distance={12}
                                duration={5}
                            >
                                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-lg shadow-black/[0.06] dark:border-white/10 dark:bg-[#161616]">
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
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
