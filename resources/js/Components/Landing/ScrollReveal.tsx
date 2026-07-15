import type { ReactNode } from 'react';

interface ScrollRevealProps { readonly children: ReactNode; readonly className?: string; }

export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
    return <div className={className}>{children}</div>;
}
