import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const directionOffsets: Record<Direction, { x: number; y: number; scale: number }> = {
    up: { x: 0, y: 40, scale: 1 },
    down: { x: 0, y: -40, scale: 1 },
    left: { x: 40, y: 0, scale: 1 },
    right: { x: -40, y: 0, scale: 1 },
    scale: { x: 0, y: 0, scale: 0.9 },
};

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-80px' });

    const offset = directionOffsets[direction];

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y,
                scale: offset.scale,
            }}
            animate={
                isInView
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : { opacity: 0, x: offset.x, y: offset.y, scale: offset.scale }
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
