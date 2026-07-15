import { useForm, usePage } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import type { ContactContent } from '@/types';
import { HeroChatBubble, HeroEnvelope, HeroMapPin, HeroPaperAirplane, HeroPhone } from './HeroIcons';
import { useTranslation } from '../../lib/i18n';

interface ContactSectionProps { readonly data: ContactContent; }
type FlashProps = { readonly flash?: { readonly success?: string } };

export default function ContactSection({ data }: ContactSectionProps) {
    const { t } = useTranslation();
    const page = usePage<FlashProps>();
    const [submitted, setSubmitted] = useState(false);
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const { data: formData, setData, post, processing, errors, reset } = useForm({ name: '', email: '', subject: '', message: '' });
    const successMessage = page.props.flash?.success || (submitted ? t('contact.success') : null);
    const contactItems = [
        data.contact_info.email ? { key: 'email', icon: HeroEnvelope, label: t('contact.email'), value: data.contact_info.email, href: `mailto:${data.contact_info.email}` } : null,
        data.contact_info.phone ? { key: 'phone', icon: HeroPhone, label: t('contact.phone'), value: data.contact_info.phone, href: `tel:${data.contact_info.phone}` } : null,
        data.contact_info.address ? { key: 'address', icon: HeroMapPin, label: t('contact.address'), value: data.contact_info.address, href: null } : null,
    ].filter((item) => item !== null);
    const fallback = data.social_links.whatsapp || (data.contact_info.email ? `mailto:${data.contact_info.email}` : data.contact_info.phone ? `tel:${data.contact_info.phone}` : null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(false);
        setSubmissionFailed(false);
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => { setSubmitted(true); reset(); },
            onError: (formErrors) => { if (Object.keys(formErrors).length === 0) setSubmissionFailed(true); },
            onCancel: () => setSubmissionFailed(true),
        });
    };

    const fieldClass = 'form-field';

    return (
        <section id="contact" className="section-anchor section-shell bg-white dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">{data.section_label ? <p className="eyebrow">{data.section_label}</p> : null}<h2 className="section-title mt-4">{data.title}{data.title_highlight ? <span className="text-primary"> {' '}{data.title_highlight}</span> : null}</h2>{data.description ? <p className="section-copy mt-5">{data.description}</p> : null}</div>
                <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <form onSubmit={handleSubmit} className="contact-form" aria-busy={processing} noValidate>
                        {successMessage ? <p role="status" className="success-message">{successMessage}</p> : null}
                        {submissionFailed ? <div role="alert" className="failure-message"><p>{t('contact.failure')}</p>{fallback ? <a href={fallback} target={data.social_links.whatsapp ? '_blank' : undefined} rel={data.social_links.whatsapp ? 'noopener noreferrer' : undefined} className="mt-3 inline-flex font-semibold underline underline-offset-4">{t('contact.fallback')}</a> : null}</div> : null}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="form-label" htmlFor="contact-name">{t('contact.name')}<span aria-hidden="true"> *</span><input id="contact-name" name="name" required autoComplete="name" value={formData.name} onChange={(event) => setData('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} className={fieldClass} />{errors.name ? <span id="contact-name-error" className="form-error">{errors.name}</span> : null}</label>
                            <label className="form-label" htmlFor="contact-email">{t('contact.email')}<span aria-hidden="true"> *</span><input id="contact-email" name="email" type="email" required autoComplete="email" value={formData.email} onChange={(event) => setData('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} className={fieldClass} />{errors.email ? <span id="contact-email-error" className="form-error">{errors.email}</span> : null}</label>
                        </div>
                        <label className="form-label" htmlFor="contact-subject">{t('contact.subject')}<span aria-hidden="true"> *</span><input id="contact-subject" name="subject" required autoComplete="off" value={formData.subject} onChange={(event) => setData('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} className={fieldClass} />{errors.subject ? <span id="contact-subject-error" className="form-error">{errors.subject}</span> : null}</label>
                        <label className="form-label" htmlFor="contact-message">{t('contact.message')}<span aria-hidden="true"> *</span><textarea id="contact-message" name="message" required rows={6} value={formData.message} onChange={(event) => setData('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className={fieldClass} />{errors.message ? <span id="contact-message-error" className="form-error">{errors.message}</span> : null}</label>
                        <button type="submit" disabled={processing} className="button-primary w-full sm:w-auto"><HeroPaperAirplane className="h-4 w-4" />{processing ? t('contact.sending') : t('contact.send')}</button>
                    </form>
                    <aside className="space-y-3" aria-label={t('contact.label')}>
                        {contactItems.map((item) => <div key={item.key} className="contact-item"><item.icon className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm text-gray-500 dark:text-white/55">{item.label}</p>{item.href ? <a href={item.href} className="font-semibold text-gray-950 hover:text-primary dark:text-white">{item.value}</a> : <p className="font-semibold text-gray-950 dark:text-white">{item.value}</p>}</div></div>)}
                        {fallback ? <a href={fallback} target={data.social_links.whatsapp ? '_blank' : undefined} rel={data.social_links.whatsapp ? 'noopener noreferrer' : undefined} className="button-secondary mt-5"><HeroChatBubble className="h-5 w-5" />{data.social_links.whatsapp ? t('contact.quick_chat') : t('contact.fallback')}</a> : null}
                    </aside>
                </div>
            </div>
        </section>
    );
}
