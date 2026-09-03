import '@testing-library/jest-dom/vitest';

/**
 * jsdom implements no IntersectionObserver, and Framer Motion's `whileInView`
 * (see components/motion/reveal.tsx) constructs one on mount — so without this
 * every test that renders a section throws before it can assert anything.
 *
 * The stub reports each observed element as immediately in view. That matches
 * what the tests care about: `<Reveal>` is a presentation wrapper, and its
 * children must be queryable whether or not the animation has run.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: readonly number[] = [0];
  readonly scrollMargin: string = '0px';

  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as IntersectionObserver,
    );
  }

  /* Nothing to tear down: the stub fires once from `observe` and holds no
     state, so unobserving and disconnecting are genuinely no-ops. */
  unobserve(): void {
    return;
  }
  disconnect(): void {
    return;
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
