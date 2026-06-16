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
        <section id="about" className="relative overflow-hidden py-24 lg:py-32">
            {/* Background */}
            <div className="absolute inset-0 bg-radial-bottom" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Label */}
                {data.section_label && (
                    <ScrollReveal direction="up">
                        <div className="mb-12 text-center">
                            <span className="badge-pill">{data.section_label || t('about.label')}</span>
                        </div>
                    </ScrollReveal>
                )}

                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left Column - Heading + Features */}
                    <div>
                        <ScrollReveal direction="left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
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
                                <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600 dark:text-white/60">
                                    {data.description}
                                </p>
                            </ScrollReveal>
                        )}

                        {/* 2x2 Feature Grid */}
                        {data.features && data.features.length > 0 && (
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {data.features.map((feature, i) => (
                                        <ScrollReveal key={i} direction="up" delay={0.1 + i * 0.1}>
                                            <div className="glass-card group cursor-default p-5 transition-all duration-300 hover:scale-[1.02] hover:border-white/15">
                                                <div className="mb-3 text-3xl">{feature.icon}</div>
                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                                    {feature.title}
                                                </h3>
                                                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-white/50">
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
                                    <div className="glass-card-red relative z-10 flex h-48 w-48 flex-col items-center justify-center p-6 text-center">
                                        {aboutImage ? (
                                            <img
                                                src={aboutImage}
                                                alt="Hibiscus Efsya"
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white dark:bg-white/10 p-2">
                                                <img src={logoImg} alt="Hibiscus Efsya" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        )}
                                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-2">Hibiscus Efsya</p>
                                        <p className="text-xs text-gray-500 dark:text-white/50">{t('about.why_partner')}</p>
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
                                            className="glass-card p-4 text-center"
                                        >
                                            <div className="text-xl font-bold text-primary sm:text-2xl">
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500 dark:text-white/50 sm:text-sm">
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
