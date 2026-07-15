import { useRef, useState, type KeyboardEvent } from 'react';
import type { ServiceCategory } from '@/types';
import { HeroArrowTopRight, HeroClock } from './HeroIcons';
import { useTranslation } from '../../lib/i18n';

interface ServicesSectionProps { readonly categories: readonly ServiceCategory[]; }

type Service = ServiceCategory['services'][number];
type ServiceTileProps = {
    readonly service: Service;
    readonly categoryIcon: string | null;
    readonly emphasis: 'primary' | 'secondary' | 'continuation';
    readonly spansRows?: boolean;
};

function ServiceTile({ service, categoryIcon, emphasis, spansRows = false }: ServiceTileProps) {
    const { t } = useTranslation();
    const isPrimary = emphasis === 'primary';

    return (
        <article className={`service-card flex min-w-0 flex-col ${spansRows ? 'md:row-span-2' : ''}`}>
            {service.image ? <img src={`/storage/${service.image}`} width="640" height="360" loading="lazy" decoding="async" alt={service.name} className={`w-full object-cover ${isPrimary ? 'aspect-[4/3] md:flex-1' : 'aspect-video'}`} /> : <div className={`service-image-empty ${isPrimary ? 'aspect-[4/3] md:flex-1' : ''}`} aria-hidden="true">{categoryIcon}</div>}
            <div className={isPrimary ? 'p-6 sm:p-8' : 'p-6'}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className={`${isPrimary ? 'text-2xl sm:text-3xl' : 'text-xl'} min-w-0 font-semibold text-gray-950 dark:text-white`}>{service.name}</h3>
                    {service.is_coming_soon ? <span className="status-badge"><HeroClock className="h-4 w-4" />{t('services.coming_soon')}</span> : null}
                </div>
                {service.description ? <p className={`${isPrimary ? 'mt-4 text-base leading-7' : 'mt-3 text-sm leading-6'} text-gray-600 dark:text-white/65`}>{service.description}</p> : null}
                {!service.is_coming_soon && service.link ? <a href={service.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-primary-300">{t('services.visit')}<HeroArrowTopRight className="h-4 w-4" /></a> : null}
            </div>
        </article>
    );
}

export default function ServicesSection({ categories }: ServicesSectionProps) {
    const { t } = useTranslation();
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(categories[0]?.id ?? null);
    const tabRefs = useRef(new Map<number, HTMLButtonElement>());
    const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];

    if (!activeCategory) {
        return (
            <section id="services" className="section-anchor section-shell bg-gray-50 dark:bg-[#101010]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl"><p className="eyebrow">{t('services.label')}</p><h2 className="section-title mt-4">{t('services.title')}</h2><p className="section-copy mt-5">{t('services.description')}</p></div>
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
        <section id="services" className="section-anchor section-shell bg-gray-50 dark:bg-[#101010]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl"><p className="eyebrow">{t('services.label')}</p><h2 className="section-title mt-4">{t('services.title')}</h2><p className="section-copy mt-5">{t('services.description')}</p></div>
                <div role="tablist" aria-label={t('services.label')} className="service-tabs mt-8">
                    {categories.map((category) => <button key={category.id} ref={(element) => { if (element) tabRefs.current.set(category.id, element); else tabRefs.current.delete(category.id); }} type="button" role="tab" id={`service-category-${category.id}`} tabIndex={activeCategory.id === category.id ? 0 : -1} aria-selected={activeCategory.id === category.id} aria-controls={`service-panel-${category.id}`} onClick={() => setActiveCategoryId(category.id)} onKeyDown={(event) => handleTabKeyDown(event, category.id)} className="service-tab">{category.icon ? <span aria-hidden="true">{category.icon}</span> : null}{category.title}</button>)}
                </div>
                <div id={`service-panel-${activeCategory.id}`} role="tabpanel" aria-labelledby={`service-category-${activeCategory.id}`} tabIndex={0} className="mt-10">
                    {activeCategory.services.length > 0 ? (
                        <div className="space-y-6">
                            <div className={`grid items-stretch gap-6 md:grid-cols-2 ${activeCategory.services.length > 2 ? 'md:grid-rows-2' : ''}`}>
                                {activeCategory.services.slice(0, 3).map((service, index) => (
                                    <ServiceTile key={service.id} service={service} categoryIcon={activeCategory.icon} emphasis={index === 0 ? 'primary' : 'secondary'} spansRows={activeCategory.services.length > 2 && index === 0} />
                                ))}
                            </div>
                            {activeCategory.services.length > 3 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {activeCategory.services.slice(3).map((service) => <ServiceTile key={service.id} service={service} categoryIcon={activeCategory.icon} emphasis="continuation" />)}
                                </div>
                            ) : null}
                        </div>
                    ) : <p className="section-copy">{t('services.empty')}</p>}
                </div>
            </div>
        </section>
    );
}
