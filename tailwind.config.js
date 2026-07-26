import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
    ],

    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', ...defaultTheme.fontFamily.sans],
                display: ['"Playfair Display"', 'Georgia', 'serif'],
                body: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Merah brand — disampel langsung dari bunga hibiscus pada logo
                // (#c8000f). Dipakai untuk judul sorotan, tautan, dan aksen aktif;
                // kontras dijaga lewat nilai terang-gelap dalam satu keluarga merah.
                primary: {
                    50: '#fdf1f1',
                    100: '#fbe1e2',
                    200: '#f8c1c4',
                    300: '#f2939a',
                    400: '#e75765',
                    500: '#d5202f',
                    600: '#c8000f',
                    700: '#a3000d',
                    800: '#7c010c',
                    900: '#540309',
                    DEFAULT: '#c8000f',
                },
                // Merah aksen — skala pendek dari merah logo, dipakai untuk eyebrow & label kecil.
                gold: {
                    100: '#fbe1e2',
                    200: '#f8c1c4',
                    300: '#f2939a',
                    400: '#e75765',
                    500: '#d5202f',
                    600: '#c8000f',
                    DEFAULT: '#d5202f',
                },
                // Latar putih gading dengan rona mawar halus untuk mode terang.
                cream: {
                    50: '#fdfbfa',
                    100: '#faf6f4',
                    200: '#f5ecea',
                    300: '#ebdcd8',
                    DEFAULT: '#faf6f4',
                },
                // Netral hangat untuk teks — lebih lembut daripada abu-abu murni.
                ink: {
                    900: '#1a1312',
                    800: '#2d2220',
                    700: '#483836',
                    600: '#6e5c59',
                    500: '#8d7b77',
                    DEFAULT: '#1a1312',
                },
                // Permukaan mode gelap bernuansa hangat agar selaras dengan emblem.
                night: {
                    950: '#0e0b0a',
                    900: '#141010',
                    800: '#1c1716',
                    700: '#262020',
                },
                accent: {
                    rose: '#ff6b8a',
                    pink: '#ff8fa3',
                },
                card: 'rgba(255,255,255,0.04)',
                dark: {
                    900: '#0a0a0a',
                    800: '#111111',
                    700: '#1a1a1a',
                    600: '#222222',
                    500: '#2a2a2a',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
                'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.6s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'float-rotate': 'floatRotate 8s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'shimmer': 'shimmer 2.5s ease-in-out infinite',
                'scroll-indicator': 'scrollIndicator 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                floatRotate: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-15px) rotate(5deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(229, 26, 26, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(229, 26, 26, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                scrollIndicator: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '50%': { opacity: '0.5', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },

    plugins: [forms],
};
