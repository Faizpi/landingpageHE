import type { AboutContent } from '@/types';

interface AboutSectionProps { readonly data: AboutContent; }

export default function AboutSection({ data }: AboutSectionProps) {
    const hasCmsImage = Boolean(data.image);
    const image = data.image ? `/storage/${data.image}` : '/hibiscusefsya.png';
    const featureGridColumns = data.features.length === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

    return (
        <section id="about" className="section-anchor section-shell bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 md:grid-cols-[minmax(14rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
                    <figure className="about-image-frame">
                        <img src={image} width="640" height="640" loading="lazy" decoding="async" alt={hasCmsImage ? data.title : 'Hibiscus Efsya'} className={hasCmsImage ? 'about-image-cms' : 'about-fallback-logo'} />
                    </figure>
                    <div className="min-w-0">
                        {data.section_label ? <p className="eyebrow">{data.section_label}</p> : null}
                        <h2 className="section-title mt-4 break-words">{data.title}{data.title_highlight ? <span className="text-primary"> {' '}{data.title_highlight}</span> : null}</h2>
                        {data.description ? <p className="section-copy mt-5 whitespace-pre-line break-words">{data.description}</p> : null}
                    </div>
                </div>

                {data.stats.length > 0 ? (
                    <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-gray-200 pt-8 dark:border-white/10">
                        {data.stats.map((stat) => (
                            <div key={`${stat.value}-${stat.label}`} className="min-w-0 max-w-full">
                                <dd className="break-words text-2xl font-bold text-primary">{stat.value}</dd>
                                <dt className="mt-1 break-words text-sm leading-6 text-gray-600 dark:text-white/60">{stat.label}</dt>
                            </div>
                        ))}
                    </dl>
                ) : null}

                {data.features.length > 0 ? (
                    <div className="mt-14 border-t border-gray-200 pt-10 sm:mt-16 dark:border-white/10">
                        <div className={`grid gap-4 sm:grid-cols-2 ${featureGridColumns}`}>
                            {data.features.map((feature) => (
                                <article key={`${feature.title}-${feature.description}`} className="min-w-0 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
                                    <h3 className="break-words text-lg font-semibold leading-7 text-gray-950 dark:text-white">{feature.title}</h3>
                                    <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-gray-600 dark:text-white/70">{feature.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
