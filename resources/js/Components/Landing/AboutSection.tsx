import type { AboutContent } from '@/types';
import ScrollReveal from './ScrollReveal';
import FloatingElement from './FloatingElement';
import logoImg from '../../images/logo-icon.png';
import { useTranslation } from '../../lib/i18n';

interface AboutSectionProps {
    data: AboutContent;
}

export default function AboutSection({ data }: AboutSectionProps) {
    const { t } = useTranslation();
    const aboutImage = data.image ? `/storage/${data.image}` : null;

    return (
        <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-[#0a0a0a]">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Label */}
                {data.section_label && (
                    <ScrollReveal direction="up">
                        <div className="mb-12 text-center">
                            <span className="badge-pill">{data.section_label || t('about.label')}</span>
                        </div>
                    </ScrollReveal>
                )}

                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Left Column - Heading + Features */}
                    <div>
                        <ScrollReveal direction="left">
                            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                                {data.title}
                                {data.title_highlight && (
                                    <span className="gradient-text block sm:inline">
                                        {' '}{data.title_highlight}
                                    </span>
                                )}
                            </h2>
                        </ScrollReveal>

                        {data.description && (
                            <ScrollReveal direction="left" delay={0.1}>
                                <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500 dark:text-white/50">
                                    {data.description}
                                </p>
                            </ScrollReveal>
                        )}

                        {/* 2x2 Feature Grid */}
                        {data.features && data.features.length > 0 && (
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {data.features.map((feature, i) => (
                                        <ScrollReveal key={i} direction="up" delay={0.1 + i * 0.1}>
                                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-md hover:shadow-black/[0.04] dark:border-white/10 dark:bg-[#111] dark:hover:border-white/15 dark:hover:shadow-black/40">
                                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-2xl dark:bg-primary/10">
                                                    {feature.icon}
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                                    {feature.title}
                                                </h3>
                                                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-white/40">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Image/Logo Card + Stats */}
                    <div className="space-y-8">
                        <ScrollReveal direction="right">
                            <div className="relative mx-auto flex max-w-sm items-center justify-center">
                                {/* Orbital rings */}
                                <div className="orbital-ring h-72 w-72 animate-spin-slow" />
                                <div
                                    className="orbital-ring h-96 w-96 animate-spin-slow"
                                    style={{ animationDirection: 'reverse', animationDuration: '30s' }}
                                />

                                {/* Central logo card */}
                                <FloatingElement distance={15} duration={7}>
                                    <div className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-lg shadow-black/[0.05] dark:bg-[#111]">
                                        {aboutImage ? (
                                            <img
                                                src={aboutImage}
                                                alt="Hibiscus Efsya"
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white p-2 dark:bg-white/5">
                                                <img src={logoImg} alt="Hibiscus Efsya" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        )}
                                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-2">Hibiscus Efsya</p>
                                        <p className="text-xs text-gray-400 dark:text-white/40">{t('about.why_partner')}</p>
                                    </div>
                                </FloatingElement>
                            </div>
                        </ScrollReveal>

                        {/* Stats Grid */}
                        {data.stats && data.stats.length > 0 && (
                            <ScrollReveal direction="up" delay={0.2}>
                                <div className="grid grid-cols-2 gap-4">
                                    {data.stats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="rounded-2xl border border-gray-100 bg-white p-5 text-center transition-all duration-300 hover:border-gray-200 hover:shadow-sm dark:border-white/10 dark:bg-[#111] dark:hover:border-white/15"
                                        >
                                            <div className="text-2xl font-bold text-primary sm:text-3xl">
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-400 dark:text-white/40 sm:text-sm">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
