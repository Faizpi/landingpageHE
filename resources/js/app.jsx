import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob(['./Pages/**/*.jsx', './Pages/**/*.tsx']);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const key = Object.keys(pages).find(
            (k) => k === `./Pages/${name}.jsx` || k === `./Pages/${name}.tsx`
        );
        if (!key) throw new Error(`Page not found: ${name}`);
        return pages[key]();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
