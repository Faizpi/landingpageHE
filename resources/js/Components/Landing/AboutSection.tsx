import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';
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
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 52,
        stiffness: 320,
        mass: 0.45,
    });
    const stageY = useTransform(scrollY, [220, 1150], reduceMotion ? [0, 0] : [32, -34]);
    const stageRotate = useTransform(smoothVelocity, [-1400, 0, 1400], reduceMotion ? [0, 0, 0] : [2.5, 0, -2.5]);
    const cardDrift = useTransform(scrollY, [260, 1200], reduceMotion ? [0, 0] : [20, -26]);
    const cardCounterDrift = useTransform(scrollY, [260, 1200], reduceMotion ? [0, 0] : [-14, 18]);
    const aboutImage = data.image ? `/storage/${data.image}` : null;

    return (
        <section id="about" className="luxury-section luxury-overlap-top relative isolate overflow-hidden bg-[#fffdf8] py-24 lg:py-32 dark:bg-[#0a0a0a]">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[22rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,26,26,0.07),transparent_68%)] blur-3xl" />
                <div className="absolute right-[-16rem] bottom-8 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.13),transparent_66%)] blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Label */}
                {data.section_label && (
                    <ScrollReveal direction="up">
                        <div className="mb-12 text-center">
                            <span className="badge-pill luxury-badge">{data.section_label || t('about.label')}</span>
                        </div>
                    </ScrollReveal>
                )}

                <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
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
                                <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500 dark:text-white/55">
                                    {data.description}
                                </p>
                            </ScrollReveal>
                        )}

                        {/* 2x2 Feature Grid */}
                        {data.features && data.features.length > 0 && (
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:[&>*:nth-child(even)]:translate-y-6">
                                {data.features.map((feature, i) => (
                                    <ScrollReveal key={i} direction="up" delay={0.1 + i * 0.1}>
                                        <div className="group luxury-mini-card relative h-full rounded-[1.4rem] border border-white/70 bg-white/80 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/30 dark:hover:border-white/20">
                                            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-2xl shadow-inner dark:bg-primary/10">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                                {feature.title}
                                            </h3>
                                            <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-white/45">
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
                            <motion.div
                                className="relative mx-auto flex max-w-md items-center justify-center py-10 [perspective:1200px]"
                                style={{ y: stageY, rotate: stageRotate }}
                            >
                                {/* Orbital rings */}
                                <div className="orbital-ring h-72 w-72 animate-spin-slow" />
                                <div
                                    className="orbital-ring h-96 w-96 animate-spin-slow"
                                    style={{ animationDirection: 'reverse', animationDuration: '30s' }}
                                />
                                <div className="pointer-events-none absolute h-52 w-52 rounded-full bg-primary/[0.06] blur-2xl" />


                                {/* Central logo card */}
                                <FloatingElement distance={15} duration={7}>
                                    <div className="luxury-depth-card relative z-10 flex h-56 w-56 flex-col items-center justify-center rounded-[2rem] border border-white/80 bg-white/[0.85] p-6 text-center shadow-[0_35px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111]/85 dark:shadow-black/50">
                                        <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-primary/10" />
                                        {aboutImage ? (
                                            <img
                                                src={aboutImage}
                                                alt="Hibiscus Efsya"
                                                className="h-24 w-24 rounded-full object-cover shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                                            />
                                        ) : (
                                            <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-white p-2 shadow-inner dark:bg-white/5">
                                                <img src={logoImg} alt="Hibiscus Efsya" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        )}
                                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-3">Hibiscus Efsya</p>
                                        <p className="text-xs text-gray-400 dark:text-white/40">{t('about.why_partner')}</p>
                                    </div>
                                </FloatingElement>
                            </motion.div>
                        </ScrollReveal>

                        {/* Stats Grid */}
                        {data.stats && data.stats.length > 0 && (
                            <ScrollReveal direction="up" delay={0.2}>
                                <div className="grid grid-cols-2 gap-4 lg:-mt-4">
                                    {data.stats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="rounded-[1.35rem] border border-[#ead8c0]/70 bg-[#fffdf8]/75 p-5 text-center shadow-[0_18px_55px_rgba(120,72,38,0.09)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_70px_rgba(120,72,38,0.13)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/30 dark:hover:border-white/15"
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
