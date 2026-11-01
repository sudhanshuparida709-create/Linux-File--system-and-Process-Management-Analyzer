"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the browser matches a CSS media query.
 *
 * Examples:
 * - "(max-width: 768px)"
 * - "(min-width: 1024px)"
 * - "(prefers-color-scheme: dark)"
 * - "(orientation: portrait)"
 */
export function useMediaQuery(
  query: string,
  defaultValue = false,
): boolean {
  const [matches, setMatches] = useState<boolean>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Update the initial value from the actual browser query.
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers.
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    // Fallback for older browsers.
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Convenience hook for common responsive breakpoints.
 */
export function useResponsive() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery(
    "(min-width: 641px) and (max-width: 1024px)",
  );
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

export default useMediaQuery;