import { useTheme } from 'next-themes';
import { HeroSun, HeroMoon, HeroComputer } from './HeroIcons';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="flex items-center gap-0.5 rounded-full bg-gray-100 dark:bg-white/10 p-0.5 border border-gray-200 dark:border-white/10">
            <div className="h-7 w-7" />
            <div className="h-7 w-7" />
            <div className="h-7 w-7" />
        </div>;
    }

    const items = [
        { icon: HeroSun, value: 'light', label: 'Light' },
        { icon: HeroMoon, value: 'dark', label: 'Dark' },
        { icon: HeroComputer, value: 'system', label: 'System' },
    ];

    return (
        <div className="flex items-center gap-0.5 rounded-full bg-gray-100 dark:bg-white/10 p-0.5 border border-gray-200 dark:border-white/10">
            {items.map(({ icon: Icon, value, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
                        theme === value
                            ? 'bg-white dark:bg-white/20 shadow-sm text-primary'
                            : 'text-gray-500 dark:text-white/50 hover:text-gray-800 dark:hover:text-white/80'
                    }`}
                    title={label}
                    aria-label={label}
                >
                    <Icon className="h-4 w-4" />
                </button>
            ))}
        </div>
    );
}
