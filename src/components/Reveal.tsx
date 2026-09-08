'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './useReducedMotion';

type VariantName = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'image';
export type MotionTag = 'div' | 'section' | 'form' | 'footer' | 'article' | 'ul' | 'li';

// Section reveal: opacity 0→1, y 30–40→0. Card reveal uses a smaller y (20–30).
// Image reveal: opacity 0→1, scale 0.96→1. Kept as named variants so every
// component pulls from the same small set instead of inventing new curves.
const variants: Record<VariantName, Variants> = {
  up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: .94 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  image: { hidden: { opacity: 0, scale: .96 }, show: { opacity: 1, scale: 1 } },
};

const reducedVariants: Variants = { hidden: { opacity: 0 }, show: { opacity: 1 } };

// Fixed, module-level set of motion components — never created during
// render, so each keeps a stable identity across re-renders.
const motionTags = {
  div: motion.div,
  section: motion.section,
  form: motion.form,
  footer: motion.footer,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
} satisfies Record<MotionTag, unknown>;

type RevealProps = {
  children: ReactNode;
  as?: MotionTag;
  variant?: VariantName;
  delay?: number;
  duration?: number;
  className?: string;
  [prop: string]: unknown;
};

export default function Reveal({ children, as = 'div', variant = 'up', delay = 0, duration = .7, className, ...rest }: RevealProps) {
  const Tag = motionTags[as];
  const reduced = usePrefersReducedMotion();
  return (
    <Tag
      className={className}
      variants={reduced ? reducedVariants : variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: .2 }}
      transition={{ duration: reduced ? .3 : duration, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  as?: MotionTag;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  [prop: string]: unknown;
};

export function Stagger({ children, as = 'div', stagger = 0.08, delayChildren = 0, className, ...rest }: StaggerProps) {
  const Tag = motionTags[as];
  const reduced = usePrefersReducedMotion();
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: .2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: reduced ? 0 : delayChildren } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  as?: MotionTag;
  variant?: VariantName;
  className?: string;
  [prop: string]: unknown;
};

// Card reveal: opacity 0→1, y 20–30→0 (smaller travel than a full section).
export function StaggerItem({ children, as = 'div', variant = 'up', className, ...rest }: StaggerItemProps) {
  const Tag = motionTags[as];
  const reduced = usePrefersReducedMotion();
  const cardVariants: Variants = variant === 'up'
    ? { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
    : variants[variant];
  return (
    <Tag className={className} variants={reduced ? reducedVariants : cardVariants} transition={{ duration: reduced ? .3 : .55, ease: [0.16, 1, 0.3, 1] }} {...rest}>
      {children}
    </Tag>
  );
}
