import { motion, AnimatePresence } from 'framer-motion';
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

    if (!categories || categories.length === 0) {
        return null;
    }

    const activeCategory = categories[activeTab];

    return (
        <section id="services" className="relative overflow-hidden bg-gray-50/50 py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <ScrollReveal direction="up">
                    <div className="mb-16 text-center">
                        <span className="badge-pill">{t('services.label')}</span>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Solusi Digital{' '}
                            <span className="gradient-text">Terlengkap</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/50">
                            Kami menyediakan berbagai layanan digital untuk memenuhi kebutuhan bisnis Anda
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Tabs */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="mb-12 flex flex-wrap justify-center gap-2">
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(index)}
                                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                    activeTab === index
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-white/20 dark:hover:text-white'
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
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {activeCategory.services.map((service, i) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                <div className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                                    {/* Service Image */}
                                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                        {service.image ? (
                                            <img
                                                src={`/storage/${service.image}`}
                                                alt={service.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-transparent">
                                                <span className="text-4xl">
                                                    {activeCategory.icon || '🚀'}
                                                </span>
                                            </div>
                                        )}

                                        {/* Coming Soon Badge */}
                                        {service.is_coming_soon && (
                                            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                                                <HeroClock className="h-3 w-3" />
                                                {t('services.coming_soon')}
                                            </div>
                                        )}
                                    </div>

                                    {/* Service Info */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {service.name}
                                        </h3>
                                        {service.description && (
                                            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/50">
                                                {service.description}
                                            </p>
                                        )}

                                        {/* Action */}
                                        <div className="mt-4">
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
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-300"
                                                >
                                                    {t('services.visit')}
                                                    <HeroArrowTopRight className="h-3.5 w-3.5" />
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
