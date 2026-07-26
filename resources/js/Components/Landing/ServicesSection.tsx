import { useRef, useState, type KeyboardEvent } from 'react';
import type { ServiceCategory } from '@/types';
import { HeroArrowTopRight, HeroClock } from './HeroIcons';
import { ServiceIcon } from './ServiceIcons';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '../../lib/i18n';

interface ServicesSectionProps { readonly categories: readonly ServiceCategory[]; }

type Service = ServiceCategory['services'][number];

type ServiceTileProps = {
    readonly service: Service;
    readonly categoryIcon: string | null;
};

function ServiceTile({ service, categoryIcon }: ServiceTileProps) {
    const { t, pick } = useTranslation();
    const name = pick(service.name, service.name_en);
    const description = pick(service.description, service.description_en);

    return (
        <article className="service-card h-full">
            {/* Bingkai rasio tetap 16:9 dengan `object-contain` memastikan foto
                lanskap tampil utuh — tidak ada sisi yang terpotong. */}
            <div className="service-media">
                {service.image ? (
                    <img
                        src={`/storage/${service.image}`}
                        width="1600"
                        height="900"
                        loading="lazy"
                        decoding="async"
                        alt={name}
                        className="service-media-image"
                    />
                ) : (
                    <div className="service-media-empty">
                        <ServiceIcon name={categoryIcon} className="h-12 w-12" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="min-w-0 break-words text-lg font-semibold leading-7 text-ink-900 dark:text-cream-50">{name}</h3>
                    {service.is_coming_soon ? (
                        <span className="status-badge">
                            <HeroClock className="h-3.5 w-3.5" />
                            {t('services.coming_soon')}
                        </span>
                    ) : null}
                </div>

                {description ? (
                    <p className="mt-3 break-words text-sm leading-[1.7] text-ink-600 dark:text-cream-100/60">{description}</p>
                ) : null}

                {!service.is_coming_soon && service.link ? (
                    <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
                    >
                        {t('services.visit')}
                        <HeroArrowTopRight className="h-4 w-4" />
                    </a>
                ) : null}
            </div>
        </article>
    );
}

export default function ServicesSection({ categories }: ServicesSectionProps) {
    const { t, pick } = useTranslation();
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(categories[0]?.id ?? null);
    const tabRefs = useRef(new Map<number, HTMLButtonElement>());
    const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];

    const header = (
        <ScrollReveal>
            <div className="max-w-2xl">
                <p className="eyebrow">{t('services.label')}</p>
                <h2 className="section-title mt-7">{t('services.title')}</h2>
                <p className="section-copy mt-6">{t('services.description')}</p>
            </div>
        </ScrollReveal>
    );

    if (!activeCategory) {
        return (
            <section id="services" className="section-anchor section-shell surface-page">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {header}
                    <p className="section-copy mt-10">{t('services.empty')}</p>
                </div>
            </section>
        );
    }

    const selectCategory = (categoryId: number) => {
        setActiveCategoryId(categoryId);
        tabRefs.current.get(categoryId)?.focus();
    };

    const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, categoryId: number) => {
        const currentIndex = categories.findIndex((category) => category.id === categoryId);
        let nextIndex: number | null = null;

        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % categories.length;
        if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + categories.length) % categories.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = categories.length - 1;
        if (nextIndex === null) return;

        event.preventDefault();
        const nextCategory = categories[nextIndex];
        if (nextCategory) selectCategory(nextCategory.id);
    };

    return (
        <section id="services" className="section-anchor section-shell surface-page">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {header}

                <ScrollReveal delay={0.08}>
                    <div role="tablist" aria-label={t('services.label')} className="service-tabs mt-10">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                ref={(element) => {
                                    if (element) tabRefs.current.set(category.id, element);
                                    else tabRefs.current.delete(category.id);
                                }}
                                type="button"
                                role="tab"
                                id={`service-category-${category.id}`}
                                tabIndex={activeCategory.id === category.id ? 0 : -1}
                                aria-selected={activeCategory.id === category.id}
                                aria-controls={`service-panel-${category.id}`}
                                onClick={() => setActiveCategoryId(category.id)}
                                onKeyDown={(event) => handleTabKeyDown(event, category.id)}
                                className="service-tab"
                            >
                                <ServiceIcon name={category.icon} className="h-4 w-4" />
                                {pick(category.title, category.title_en)}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                <div
                    id={`service-panel-${activeCategory.id}`}
                    role="tabpanel"
                    aria-labelledby={`service-category-${activeCategory.id}`}
                    tabIndex={0}
                    className="mt-10 focus-visible:outline-none"
                >
                    {activeCategory.services.length > 0 ? (
                        // Grid seragam menjaga setiap kartu berukuran sama besar,
                        // sehingga barisan foto tampak rapi dan sejajar.
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {activeCategory.services.map((service, index) => (
                                <ScrollReveal key={service.id} delay={0.05 * (index % 3)}>
                                    <ServiceTile service={service} categoryIcon={activeCategory.icon} />
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : (
                        <p className="section-copy">{t('services.empty')}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
