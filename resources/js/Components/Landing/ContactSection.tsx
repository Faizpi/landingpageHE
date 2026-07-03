import { useForm } from '@inertiajs/react';
import { HeroEnvelope, HeroPhone, HeroMapPin, HeroChatBubble, HeroPaperAirplane } from './HeroIcons';
import type { ContactContent } from '@/types';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '../../lib/i18n';

interface ContactSectionProps {
    data: ContactContent;
}

export default function ContactSection({ data }: ContactSectionProps) {
    const { t } = useTranslation();
    const { data: formData, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const contactItems = [
        {
            icon: HeroEnvelope,
            label: 'Email',
            value: data.contact_info.email,
            href: `mailto:${data.contact_info.email}`,
        },
        {
            icon: HeroPhone,
            label: t('contact.phone') || 'Telepon',
            value: data.contact_info.phone,
            href: `tel:${data.contact_info.phone}`,
        },
        {
            icon: HeroMapPin,
            label: t('contact.address') || 'Alamat',
            value: data.contact_info.address,
            href: null,
        },
    ];

    return (
        <section id="contact" className="luxury-section luxury-overlap-top relative isolate overflow-hidden py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-10 h-[28rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,26,26,0.08),rgba(251,191,36,0.08)_34%,transparent_70%)] blur-3xl" />
                <div className="absolute inset-x-8 top-0 hidden h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <ScrollReveal direction="up">
                    <div className="mb-16 text-center">
                        {data.section_label && (
                            <span className="badge-pill luxury-badge">{data.section_label || t('contact.label')}</span>
                        )}
                        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            {data.title}
                            {data.title_highlight && (
                                <span className="gradient-text block sm:inline">
                                    {' '}{data.title_highlight}
                                </span>
                            )}
                        </h2>
                        {data.description && (
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/55">
                                {data.description}
                            </p>
                        )}
                    </div>
                </ScrollReveal>

                <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
                    {/* Left - Contact Form */}
                    <ScrollReveal direction="left">
                        <div className="luxury-depth-card relative rounded-[1.75rem] border border-white/75 bg-white/90 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-8 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/40">
                            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/[0.08] blur-2xl" />
                            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                {t('contact.send')}
                            </h3>
                            <form onSubmit={handleSubmit} className="relative space-y-5">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70"
                                    >
                                        {t('contact.name')}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 bg-white/[0.85] px-4 py-3 text-gray-900 placeholder-gray-400 shadow-inner shadow-black/[0.015] transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30"
                                        placeholder={t('contact.name')}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70"
                                    >
                                        {t('contact.email')}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 bg-white/[0.85] px-4 py-3 text-gray-900 placeholder-gray-400 shadow-inner shadow-black/[0.015] transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30"
                                        placeholder="email@contoh.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70"
                                    >
                                        {t('contact.subject')}
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 bg-white/[0.85] px-4 py-3 text-gray-900 placeholder-gray-400 shadow-inner shadow-black/[0.015] transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30"
                                        placeholder={t('contact.subject')}
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70"
                                    >
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-white/[0.85] px-4 py-3 text-gray-900 placeholder-gray-400 shadow-inner shadow-black/[0.015] transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30"
                                        placeholder={t('contact.message')}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(229,26,26,0.24)] transition-all hover:-translate-y-0.5 hover:bg-primary-300 hover:shadow-[0_22px_54px_rgba(229,26,26,0.30)] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            {t('contact.sending')}
                                        </span>
                                    ) : (
                                        <>
                                            <HeroPaperAirplane className="h-4 w-4" />
                                            {t('contact.send')}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </ScrollReveal>

                    {/* Right - Contact Info */}
                    <ScrollReveal direction="right">
                        <div className="space-y-6 lg:pt-10">
                            {/* Contact Cards */}
                            {contactItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="group flex items-start gap-4 rounded-[1.45rem] border border-white/75 bg-white/[0.85] p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_70px_rgba(15,23,42,0.11)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/30"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 shadow-inner transition-transform duration-300 group-hover:scale-105">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-white/50">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-base font-medium text-gray-900 transition-colors hover:text-primary dark:text-white"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-base font-medium text-gray-900 dark:text-white">
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* WhatsApp CTA */}
                            <a
                                href={data.social_links?.whatsapp || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-3 rounded-[1.45rem] border border-green-500/20 bg-gradient-to-br from-white/[0.95] to-green-50/[0.8] p-5 shadow-[0_20px_65px_rgba(34,197,94,0.13)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/35 hover:shadow-[0_28px_80px_rgba(34,197,94,0.18)] dark:border-green-400/20 dark:from-white/[0.06] dark:to-green-500/[0.08]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 transition-transform duration-300 group-hover:scale-105">
                                    <HeroChatBubble className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        {t('contact.quick_chat')}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-white/50">
                                        Respon cepat &amp; langsung
                                    </p>
                                </div>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
