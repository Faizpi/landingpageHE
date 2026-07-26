<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" suppressHydrationWarning>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            // SEO dasar dirender di server supaya Google tetap membaca judul,
            // deskripsi, dan logo meski JavaScript belum/tidak dijalankan.
            $seoBase = rtrim(config('app.url'), '/');
            $seoTitle = 'Hibiscus Efsya Indonesia | Bangun Bisnis Impian Anda Bersama';
            $seoDescription = 'Hibiscus Efsya Indonesia menghadirkan peluang franchise terbaik dengan dukungan penuh tim profesional. Bergabunglah dengan 500+ mitra sukses di 50+ kota dan wujudkan bisnis impian Anda.';
            $seoJsonLd = [
                '@context' => 'https://schema.org',
                '@graph' => [
                    [
                        '@type' => 'Organization',
                        '@id' => $seoBase.'/#organization',
                        'name' => 'Hibiscus Efsya Indonesia',
                        'url' => $seoBase.'/',
                        'logo' => $seoBase.'/logo-mark-512.png',
                        'description' => $seoDescription,
                        'sameAs' => [
                            'https://instagram.com/hibiscusefsya',
                            'https://facebook.com/hibiscusefsya',
                            'https://bodycare.hibiscusefsya.com',
                        ],
                    ],
                    [
                        '@type' => 'WebSite',
                        '@id' => $seoBase.'/#website',
                        'name' => 'Hibiscus Efsya Indonesia',
                        'url' => $seoBase.'/',
                        'publisher' => ['@id' => $seoBase.'/#organization'],
                        'inLanguage' => 'id-ID',
                    ],
                ],
            ];
        @endphp

        <title inertia>{{ $seoTitle }}</title>
        <meta name="description" content="{{ $seoDescription }}">
        <meta name="robots" content="index, follow, max-image-preview:large">
        <link rel="canonical" href="{{ $seoBase }}/">

        <!-- Open Graph & Twitter Card -->
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Hibiscus Efsya Indonesia">
        <meta property="og:locale" content="id_ID">
        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDescription }}">
        <meta property="og:url" content="{{ $seoBase }}/">
        <meta property="og:image" content="{{ $seoBase }}/logo-mark-512.png">
        <meta property="og:image:width" content="512">
        <meta property="og:image:height" content="512">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="{{ $seoTitle }}">
        <meta name="twitter:description" content="{{ $seoDescription }}">
        <meta name="twitter:image" content="{{ $seoBase }}/logo-mark-512.png">

        <!-- Structured data: organisasi + situs (logo & nama untuk hasil pencarian Google) -->
        <script type="application/ld+json">{!! json_encode($seoJsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>

        <!-- Ikon situs: logo hibiscus (dipakai konsisten dengan navbar & footer) -->
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-mark-512.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <meta name="theme-color" content="#faf6f4" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#0e0b0a" media="(prefers-color-scheme: dark)">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
