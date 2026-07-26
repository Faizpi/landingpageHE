import type { AboutContent } from '@/types';
import { useTranslation } from '../../lib/i18n';
import ScrollReveal from './ScrollReveal';

interface AboutSectionProps { readonly data: AboutContent; }

export default function AboutSection({ data }: AboutSectionProps) {
    const { pick } = useTranslation();

    const sectionLabel = pick(data.section_label, data.section_label_en);
    const title = pick(data.title, data.title_en);
    const titleHighlight = pick(data.title_highlight, data.title_highlight_en);
    const description = pick(data.description, data.description_en);
    const image = data.image ? `/storage/${data.image}` : null;

    return (
        <section id="about" className="section-anchor section-shell surface-raised">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Judul di kiri, paragraf pengantar di kanan — mengikuti tata
                    letak editorial pada referensi desain. */}
                <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                    <ScrollReveal>
                        <div>
                            {sectionLabel ? <p className="eyebrow">{sectionLabel}</p> : null}
                            <h2 className={`section-title break-words ${sectionLabel ? 'mt-7' : ''}`}>
                                {title}
                                {titleHighlight ? (
                                    <>
                                        {' '}
                                        <span className="title-accent">{titleHighlight}</span>
                                    </>
                                ) : null}
                            </h2>
                        </div>
                    </ScrollReveal>

                    {description ? (
                        <ScrollReveal delay={0.1}>
                            <p className="section-copy max-w-none whitespace-pre-line break-words lg:pt-4">{description}</p>
                        </ScrollReveal>
                    ) : null}
                </div>

                {image ? (
                    <ScrollReveal delay={0.12}>
                        <figure className="about-portrait mt-14">
                            <img
                                src={image}
                                width="1600"
                                height="900"
                                loading="lazy"
                                decoding="async"
                                alt={title}
                                className="aspect-[21/9] w-full object-cover"
                            />
                        </figure>
                    </ScrollReveal>
                ) : null}

                {data.stats.length > 0 ? (
                    <ScrollReveal delay={0.14}>
                        {/* Mobile: grid 2 kolom tanpa garis pemisah (aman saat item
                            turun baris). Layar lebar: berjajar dengan garis vertikal. */}
                        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t pt-10 hairline md:flex md:flex-wrap md:items-start md:gap-x-0">
                            {data.stats.map((stat, index) => (
                                <div
                                    key={`${stat.value}-${stat.label}`}
                                    className={`min-w-0 max-w-full md:pr-14 ${index > 0 ? 'hairline md:border-l md:pl-14' : ''}`}
                                >
                                    <dd className="stat-value break-words text-primary-700 dark:text-primary-300">{stat.value}</dd>
                                    <dt className="stat-label break-words">{stat.label}</dt>
                                </div>
                            ))}
                        </dl>
                    </ScrollReveal>
                ) : null}

                {data.features.length > 0 ? (
                    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {data.features.map((feature, index) => (
                            <ScrollReveal key={`${feature.title}-${index}`} delay={0.06 * index}>
                                <article className="feature-card h-full">
                                    {/* Nomor urut bergaya serif menggantikan emoji pada desain lama. */}
                                    <p className="feature-index" aria-hidden="true">
                                        {String(index + 1).padStart(2, '0')}
                                    </p>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-copy">{feature.description}</p>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
