import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  forceReducedMotion?: boolean;
}

/**
 * Subtle, luxury entrance animation wrapper for major website sections.
 * Automatically respects system & accessibility reduced motion preferences.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 24,
  className = '',
  forceReducedMotion = false
}) => {
  const prefersReduced = useReducedMotion();
  const shouldReduce = prefersReduced || forceReducedMotion;

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
