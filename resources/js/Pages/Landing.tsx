import { Head } from '@inertiajs/react';
import type { LandingPageProps } from '@/types';
import { ThemeProvider } from '@/Components/Landing/ThemeProvider';
import { TranslationProvider } from '@/lib/i18n';
import Navbar from '@/Components/Landing/Navbar';
import HeroSection from '@/Components/Landing/HeroSection';
import AboutSection from '@/Components/Landing/AboutSection';
import ServicesSection from '@/Components/Landing/ServicesSection';
import ContactSection from '@/Components/Landing/ContactSection';
import Footer from '@/Components/Landing/Footer';

export default function Landing({ hero, about, categories, contact, footer }: LandingPageProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TranslationProvider>
                <Head title="Hibiscus Efsya Indonesia | Bangun Bisnis Impian Anda Bersama" />
                <Navbar />
                <main className="min-h-screen surface-page transition-colors duration-300">
                    <HeroSection data={hero} />
                    <AboutSection data={about} />
                    <ServicesSection categories={categories} />
                    <ContactSection data={contact} />
                </main>
                <Footer data={footer} />
            </TranslationProvider>
        </ThemeProvider>
    );
}
