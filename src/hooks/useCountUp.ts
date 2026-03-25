import { useEffect, useRef, useState } from "react";

/**
 * Ease-out: fast at start, slower at end
 * Using quint ease-out: 1 - (1 - t)^5
 */
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
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

  useEffect(() => {
    if (runOnce && hasAnimatedRef.current) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (runOnce && hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;

        const startTime = performance.now();
        const startValue = 0;

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutQuint(progress);
          const current = startValue + (target - startValue) * eased;
          setValue(current);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setValue(target);
          }
        }

        requestAnimationFrame(tick);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, runOnce, rootMargin, threshold]);

  return {
    ref,
    value,
    hasAnimated: hasAnimatedRef.current,
  };
}
