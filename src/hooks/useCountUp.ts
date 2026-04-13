import { useEffect, useRef, useState } from "react";

/**
 * Strong ease-out curve for UI counters:
 * starts quickly for responsiveness, then settles smoothly.
 */
function easeOutExpo(t: number): number {
  if (t === 1) return 1;
  return 1 - Math.pow(2, -10 * t);
}

interface UseCountUpOptions {
  duration?: number; // ms
  runOnce?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
): { ref: React.RefObject<HTMLElement | null>; value: number; hasAnimated: boolean } {
  const {
    duration = 1500,
    runOnce = true,
    rootMargin = "0px",
    threshold = 0.1,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const hasAnimatedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const valueRef = useRef(0);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (runOnce && hasAnimatedRef.current) return;

    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      hasAnimatedRef.current = true;
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (runOnce && hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;

        const startTime = performance.now();
        const startValue = valueRef.current;

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutExpo(progress);
          const current = startValue + (target - startValue) * eased;
          setValue(current);

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setValue(target);
            rafRef.current = null;
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [target, duration, runOnce, rootMargin, threshold]);

  return {
    ref,
    value,
    hasAnimated: hasAnimatedRef.current,
  };
}
