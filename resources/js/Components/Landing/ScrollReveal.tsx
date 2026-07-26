import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
    readonly children: ReactNode;
    readonly className?: string;
    /** Jeda mulai animasi dalam detik, untuk memberi efek berurutan pada grid. */
    readonly delay?: number;
}

/**
 * Memunculkan konten dengan gerakan naik halus saat masuk ke area pandang.
 *
 * Animasi dijalankan sekali saja (`once: true`) agar tidak mengulang ketika
 * pengguna menggulir naik-turun, dan dinonaktifkan sepenuhnya bila pengguna
 * mengaktifkan pengurangan gerak di sistem operasinya.
 */
export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
