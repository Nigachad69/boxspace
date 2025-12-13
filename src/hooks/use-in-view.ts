"use client";

import { useState, useEffect, useRef, type RefObject } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  triggerOnce?: boolean;
};

export function useInView(options?: UseInViewOptions): [RefObject<any>, boolean] {
  const { triggerOnce = false, ...observerOptions } = options || {};
  const ref = useRef<Element>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else {
        if (!triggerOnce) {
          setIsInView(false);
        }
      }
    }, observerOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, triggerOnce, ...Object.values(observerOptions)]);

  return [ref, isInView];
}
