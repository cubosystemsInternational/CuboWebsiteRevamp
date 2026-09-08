'use client';

// Adapted from React Bits (reactbits.dev) — Components/MagicBento, reduced
// to the two effects Cubo actually wants: an ambient cursor-follow
// spotlight above the grid, and a per-card border glow that brightens as
// the cursor nears each card. Retinted to Cubo orange (the original's
// default glow color is purple, rgba(132,0,255,...)). Removed entirely:
// GSAP (both effects run on plain rAF-throttled DOM writes), the particle
// system (12 cloned/animated divs per hovered card — the likely source of
// the original section's lag), tilt, magnetism, and click ripple.
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

const SPOTLIGHT_RADIUS = 320;
const MAX_INTENSITY = 1.4; // >1 so the glow reaches full brightness a little before the cursor is right on the card edge
const MAX_SPOTLIGHT_OPACITY = 0.75;
const EASE = 0.22; // per-frame lerp factor toward the target value — smooths out rAF-tick jumps

function calcGlowValues(radius: number) {
  return { proximity: radius * 0.5, fadeDistance: radius * 0.75 };
}

function lerp(current: number, target: number, ease: number) {
  return current + (target - current) * ease;
}

export default function BentoGlow({ gridRef }: { gridRef: React.RefObject<HTMLDivElement | null> }) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const canHover = useMediaQuery('(hover: hover)');

  useEffect(() => {
    // Touch devices can synthesize a mousemove on tap, which would light
    // up a card the user only tapped once and never gets to see fade —
    // this is a cursor-tracking effect, so it's desktop/mouse-only.
    if (reduced || !canHover || !gridRef.current) return;
    const grid = gridRef.current;

    const spotlight = document.createElement('div');
    spotlight.className = 'bento-spotlight';
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    let mouseX = 0;
    let mouseY = 0;
    let insideGrid = false;
    let spotlightOpacity = 0;
    const intensities = new Map<HTMLElement, number>();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const rect = grid.getBoundingClientRect();
      insideGrid = mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
    };
    const onLeave = () => { insideGrid = false; };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    // Continuous loop rather than event-driven: cheap at 60fps for a
    // handful of cards, and it's what lets the glow ease toward its target
    // every frame instead of snapping on each mousemove tick.
    const loop = () => {
      const cards = grid.querySelectorAll<HTMLElement>('.service');
      const { proximity, fadeDistance } = calcGlowValues(SPOTLIGHT_RADIUS);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cx = cardRect.left + cardRect.width / 2;
        const cy = cardRect.top + cardRect.height / 2;
        const distance = Math.max(0, Math.hypot(mouseX - cx, mouseY - cy) - Math.max(cardRect.width, cardRect.height) / 2);
        if (insideGrid) minDistance = Math.min(minDistance, distance);

        const target = insideGrid
          ? (distance <= proximity ? MAX_INTENSITY : distance <= fadeDistance ? ((fadeDistance - distance) / (fadeDistance - proximity)) * MAX_INTENSITY : 0)
          : 0;
        const next = lerp(intensities.get(card) ?? 0, target, EASE);
        intensities.set(card, next);
        card.style.setProperty('--glow-intensity', String(next));

        if (insideGrid) {
          const relX = ((mouseX - cardRect.left) / cardRect.width) * 100;
          const relY = ((mouseY - cardRect.top) / cardRect.height) * 100;
          card.style.setProperty('--glow-x', `${relX}%`);
          card.style.setProperty('--glow-y', `${relY}%`);
        }
      });

      const targetSpotlightOpacity = insideGrid
        ? (minDistance <= proximity ? MAX_SPOTLIGHT_OPACITY : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * MAX_SPOTLIGHT_OPACITY : 0)
        : 0;
      spotlightOpacity = lerp(spotlightOpacity, targetSpotlightOpacity, EASE);
      spotlight.style.left = `${mouseX}px`;
      spotlight.style.top = `${mouseY}px`;
      spotlight.style.opacity = String(spotlightOpacity);

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      spotlight.remove();
      spotlightRef.current = null;
    };
  }, [gridRef, reduced, canHover]);

  return null;
}
