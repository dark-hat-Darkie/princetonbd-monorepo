'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * The single client boundary the marketing tree is allowed to grow.
 *
 * The whole `(marketing)` group is statically rendered on purpose — `withAuth()`
 * is deliberately kept out of the root layout so no marketing route reads
 * cookies. Scattering `motion.*` through the sections would turn each of them
 * into a Client Component and drag their content modules into the client
 * bundle with them.
 *
 * Instead there is one wrapper. `children` arrive as an already-rendered React
 * element from a Server Component parent, so everything inside stays on the
 * server; only this div's animation runs on the client.
 *
 * `once: true` means an element animates in the first time it is scrolled to
 * and then stays put — re-animating on every scroll past is the thing that
 * makes marketing pages feel cheap.
 *
 * REDUCED MOTION IS HANDLED IN CSS, NOT HERE — see the `[data-reveal]` rule in
 * globals.css, and read that comment before touching this file. The hook below
 * only stops the JS animation from running; it cannot be what makes the content
 * visible, because `initial` is serialised into the server HTML as an inline
 * `opacity: 0` and React hydration will not remove an attribute the server
 * sent. Every JS-only fix for this leaves reduced-motion users looking at a
 * blank page.
 */
export interface RevealProps {
  children: React.ReactNode;
  /** Stagger within a group. Seconds. */
  delay?: number;
  /** Travel distance in px. `0` fades without moving. */
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  /* Reports `null` on the server and on the first client render, then the real
     value. Because it only switches the animation *props* — never the element
     type — the first render still matches the server exactly and there is no
     hydration mismatch. */
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
