"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./home.module.css";

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const MotionContext = createContext({
  paused: true,
  reduced: true,
  toggle: () => {},
});
export function useHomeMotion() {
  return useContext(MotionContext);
}

export function HomeMotion({ children }: { children: React.ReactNode }) {
  // SSR starts static, without a hydration mismatch or unreadable content.
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const paused = reduced || manuallyPaused;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || paused) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    root
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [paused]);

  return (
    <MotionContext.Provider
      value={{
        paused,
        reduced,
        toggle: () => setManuallyPaused((value) => !value),
      }}
    >
      <div
        className={styles.home}
        data-motion={paused ? "paused" : "active"}
        ref={rootRef}
      >
        {children}
      </div>
    </MotionContext.Provider>
  );
}
