"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { ThemeMode } from "../types/common";

interface AppThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isInitialized: boolean;
}

interface AppProvidersProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = "linuxfs-theme";

const AppThemeContext = createContext<
  AppThemeContextType | undefined
>(undefined);

export function useAppTheme(): AppThemeContextType {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error(
      "useAppTheme must be used inside AppProviders.",
    );
  }

  return context;
}

export default function AppProviders({
  children,
}: AppProvidersProps) {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  const [systemTheme, setSystemTheme] = useState<
    "light" | "dark"
  >("light");

  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme preference.
  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(
        THEME_STORAGE_KEY,
      );

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system"
      ) {
        setThemeState(savedTheme);
      }

      const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      setSystemTheme(mediaQuery.matches ? "dark" : "light");

      const handleSystemThemeChange = (
        event: MediaQueryListEvent,
      ) => {
        setSystemTheme(event.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener(
        "change",
        handleSystemThemeChange,
      );

      setIsInitialized(true);

      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleSystemThemeChange,
        );
      };
    } catch (error) {
      console.error("Unable to initialize theme:", error);
      setIsInitialized(true);
    }
  }, []);

  const resolvedTheme =
    theme === "system" ? systemTheme : theme;

  // Apply theme to the document.
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;

    root.dataset.theme = resolvedTheme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, isInitialized]);

  // Save the selected theme.
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);

    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        newTheme,
      );
    } catch (error) {
      console.error("Unable to save theme preference:", error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      isInitialized,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      isInitialized,
    ],
  );

  return (
    <AppThemeContext.Provider value={contextValue}>
      {children}
    </AppThemeContext.Provider>
  );
}