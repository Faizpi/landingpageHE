import { Head } from '@inertiajs/react';
import type { LandingPageProps } from '@/types';
import { ThemeProvider } from '@/Components/Landing/ThemeProvider';
import ScrollProgress from '@/Components/Landing/ScrollProgress';
import Navbar from '@/Components/Landing/Navbar';
import HeroSection from '@/Components/Landing/HeroSection';
import AboutSection from '@/Components/Landing/AboutSection';
import ServicesSection from '@/Components/Landing/ServicesSection';
import ContactSection from '@/Components/Landing/ContactSection';
import Footer from '@/Components/Landing/Footer';

export default function Landing({
    hero,
    about,
    categories,
    contact,
    footer,
}: LandingPageProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <Head title="Hibiscus Efsya | Part of M.B.K Indonesia - Solusi Digital Terpercaya" />

            <ScrollProgress />
            <Navbar />

            <main className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
                <HeroSection data={hero} />
                <AboutSection data={about} />
                <ServicesSection categories={categories} />
                <ContactSection data={contact} />
            </main>

            <Footer data={footer} />
        </ThemeProvider>
    );
}
