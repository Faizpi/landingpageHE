import {
    motion,
    AnimatePresence,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';
import { useState } from 'react';
import { HeroArrowTopRight, HeroClock } from './HeroIcons';
import type { ServiceCategory } from '@/types';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '../../lib/i18n';

interface ServicesSectionProps {
    categories: ServiceCategory[];
}

export default function ServicesSection({ categories }: ServicesSectionProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 56,
        stiffness: 300,
        mass: 0.48,
    });
    const headingY = useTransform(scrollY, [900, 1900], reduceMotion ? [0, 0] : [26, -28]);
    const deckRotate = useTransform(smoothVelocity, [-1500, 0, 1500], reduceMotion ? [0, 0, 0] : [-1.4, 0, 1.4]);

    if (!categories || categories.length === 0) {
        return null;
    }

    const activeCategory = categories[activeTab];

    return (
        <section id="services" className="luxury-section luxury-overlap-top relative isolate overflow-hidden bg-gray-50/60 py-24 dark:bg-[#0c0c0c] lg:py-32">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="luxury-noise opacity-50" />
                <div className="absolute left-[-12rem] top-28 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(229,26,26,0.09),transparent_65%)] blur-3xl" />
                <div className="absolute bottom-[-16rem] right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12),transparent_68%)] blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <ScrollReveal direction="up">
                    <motion.div className="mb-16 text-center" style={{ y: headingY }}>
                        <span className="badge-pill luxury-badge">{t('services.label')}</span>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Solusi Digital{' '}
                            <span className="gradient-text">Terlengkap</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/55">
                            Kami menyediakan berbagai layanan digital untuk memenuhi kebutuhan bisnis Anda
                        </p>
                    </motion.div>
                </ScrollReveal>

                {/* Category Tabs */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="mb-12 flex flex-wrap justify-center gap-2">
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(index)}
                                className={`relative flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                    activeTab === index
                                        ? 'bg-primary text-white shadow-[0_16px_45px_rgba(229,26,26,0.24)]'
                                        : 'border border-gray-200/80 bg-white/85 text-gray-600 shadow-sm backdrop-blur-xl hover:border-primary/20 hover:text-gray-900 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:border-white/20 dark:hover:text-white'
                                }`}
                            >
                                {category.icon && <span>{category.icon}</span>}
                                {category.title}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Services Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:[perspective:1400px]"
                        style={{ rotate: deckRotate }}
                    >
                        {activeCategory.services.map((service, i) => {
                            const isFeatured = i % 3 === 1;
                            const depthClass = !reduceMotion
                                ? `${isFeatured ? 'lg:-translate-y-5' : ''} ${i % 3 === 0 ? 'lg:-rotate-[0.8deg]' : i % 3 === 2 ? 'lg:rotate-[0.8deg]' : ''}`
                                : '';

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className={`relative ${depthClass}`}
                                >
                                    <div className="group luxury-service-card relative h-full overflow-hidden rounded-[1.7rem] border border-white/75 bg-white/88 shadow-[0_22px_70px_rgba(15,23,42,0.09)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_34px_90px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/35 dark:hover:border-white/20">
                                        <div className="pointer-events-none absolute inset-x-5 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                                        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                                        {/* Service Image */}
                                        <div className="relative aspect-video overflow-hidden rounded-t-[1.7rem]">
                                            {service.image ? (
                                                <img
                                                    src={`/storage/${service.image}`}
                                                    alt={service.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/8 via-amber-100/30 to-transparent dark:from-primary/12 dark:via-amber-200/10">
                                                    <span className="text-4xl">
                                                        {activeCategory.icon || '🚀'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-white/5 opacity-70 transition-opacity duration-500 group-hover:opacity-45" />

                                            {/* Coming Soon Badge */}
                                            {service.is_coming_soon && (
                                                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-100/95 px-3 py-1 text-xs font-medium text-amber-700 shadow-sm backdrop-blur-md dark:bg-amber-500/20 dark:text-amber-300">
                                                    <HeroClock className="h-3 w-3" />
                                                    {t('services.coming_soon')}
                                                </div>
                                            )}
                                        </div>

                                        {/* Service Info */}
                                        <div className="relative p-5">
                                            <div className="mb-4 inline-flex rounded-full border border-primary/10 bg-primary/[0.06] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
                                                Signature service
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {service.name}
                                            </h3>
                                            {service.description && (
                                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/50">
                                                    {service.description}
                                                </p>
                                            )}

                                            {/* Action */}
                                            <div className="mt-5">
                                                {service.is_coming_soon ? (
                                                    <span className="inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400/80">
                                                        <HeroClock className="h-4 w-4" />
                                                        {t('services.coming_soon')}
                                                    </span>
                                                ) : service.link ? (
                                                    <a
                                                        href={service.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-300"
                                                    >
                                                        {t('services.visit')}
                                                        <HeroArrowTopRight className="h-3.5 w-3.5" />
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
