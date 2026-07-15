import type { AboutContent } from '@/types';
import logoImg from '../../images/logo-icon.png';

interface AboutSectionProps { readonly data: AboutContent; }

export default function AboutSection({ data }: AboutSectionProps) {
    const hasCmsImage = Boolean(data.image);
    const image = data.image ? `/storage/${data.image}` : logoImg;

    return (
        <section id="about" className="section-anchor section-shell bg-white dark:bg-neutral-950">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
                <figure className={`about-image-frame ${hasCmsImage ? 'about-image-frame-cms' : 'about-logo-composition'}`}>
                    {hasCmsImage ? null : <span className="about-image-rule" aria-hidden="true" />}
                    <img src={image} width="640" height="640" loading="lazy" decoding="async" alt={hasCmsImage ? data.title : 'Hibiscus Efsya'} className={hasCmsImage ? 'about-image-cms' : 'about-fallback-logo'} />
                </figure>
                <div>
                    {data.section_label ? <p className="eyebrow">{data.section_label}</p> : null}
                    <h2 className="section-title mt-4">{data.title}{data.title_highlight ? <span className="text-primary"> {' '}{data.title_highlight}</span> : null}</h2>
                    {data.description ? <p className="section-copy mt-6">{data.description}</p> : null}
                    {data.features.length > 0 ? <div className="mt-9 divide-y divide-gray-200 border-y border-gray-200 dark:divide-white/10 dark:border-white/10">{data.features.map((feature) => <article key={`${feature.title}-${feature.description}`} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]"><h3 className="font-semibold text-gray-950 dark:text-white">{feature.title}</h3><p className="text-sm leading-6 text-gray-600 dark:text-white/65">{feature.description}</p></article>)}</div> : null}
                    {data.stats.length > 0 ? <dl className="mt-8 flex flex-wrap gap-8">{data.stats.map((stat) => <div key={`${stat.value}-${stat.label}`}><dd className="text-2xl font-bold text-primary">{stat.value}</dd><dt className="mt-1 text-sm text-gray-600 dark:text-white/60">{stat.label}</dt></div>)}</dl> : null}
                </div>
            </div>
        </section>
    );
}
