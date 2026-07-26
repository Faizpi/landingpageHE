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
                // Perunggu brand — diambil langsung dari emblem logo. Dipakai untuk
                // judul sorotan, tautan, dan aksen aktif (arah Bronze Monochrome:
                // tanpa merah; merah hanya tersisa untuk pesan error fungsional).
                primary: {
                    50: '#faf6ec',
                    100: '#f4ecdd',
                    200: '#e6d5b8',
                    300: '#d2b98c',
                    400: '#bd9d64',
                    500: '#a37f45',
                    600: '#8a6935',
                    700: '#6f5329',
                    800: '#553f1f',
                    900: '#3a2b15',
                    DEFAULT: '#8a6935',
                },
                // Emas tembaga — diambil dari emblem logo, dipakai untuk eyebrow & label kecil.
                gold: {
                    100: '#f4ecdd',
                    200: '#e6d5b8',
                    300: '#d2b98c',
                    400: '#bd9d64',
                    500: '#a37f45',
                    600: '#8a6935',
                    DEFAULT: '#a37f45',
                },
                // Latar krem hangat untuk mode terang.
                cream: {
                    50: '#fdfbf7',
                    100: '#faf7f0',
                    200: '#f4efe4',
                    300: '#e9e1d2',
                    DEFAULT: '#faf7f0',
                },
                // Netral hangat untuk teks — lebih lembut daripada abu-abu murni.
                ink: {
                    900: '#171412',
                    800: '#2a2521',
                    700: '#453d36',
                    600: '#6b615a',
                    500: '#8a7f76',
                    DEFAULT: '#171412',
                },
                // Permukaan mode gelap bernuansa hangat agar selaras dengan emblem.
                night: {
                    950: '#0d0c0b',
                    900: '#131110',
                    800: '#1b1917',
                    700: '#252220',
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
