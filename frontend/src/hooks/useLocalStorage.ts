"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { SetStateAction } from "react";

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: SetStateAction<T>) => void;
  removeValue: () => void;
  isInitialized: boolean;
}

/**
 * Stores and retrieves values from browser localStorage.
 *
 * Features:
 * - JSON serialization and parsing
 * - SSR-safe initialization
 * - Functional state updates
 * - Cross-tab synchronization
 * - Safe handling of unavailable localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> {
  const [value, setStoredValue] = useState<T>(initialValue);

  const [isInitialized, setIsInitialized] = useState(false);

  const valueRef = useRef<T>(initialValue);

  // Keep the initial value reference updated.
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  // Read the stored value after the component mounts.
  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue) as T;

        valueRef.current = parsedValue;
        setStoredValue(parsedValue);
      } else {
        valueRef.current = initialValueRef.current;
        setStoredValue(initialValueRef.current);
      }
    } catch (error) {
      console.error("Unable to read localStorage:", error);

      valueRef.current = initialValueRef.current;
      setStoredValue(initialValueRef.current);
    } finally {
      setIsInitialized(true);
    }
  }, [key]);

  // Update React state and localStorage.
  const setValue = useCallback(
    (newValue: SetStateAction<T>) => {
      const nextValue =
        typeof newValue === "function"
          ? (newValue as (previousValue: T) => T)(
              valueRef.current,
            )
          : newValue;

      valueRef.current = nextValue;
      setStoredValue(nextValue);

      try {
        window.localStorage.setItem(
          key,
          JSON.stringify(nextValue),
        );
      } catch (error) {
        console.error("Unable to save to localStorage:", error);
      }
    },
    [key],
  );

  // Remove the stored value and restore the initial value.
  const removeValue = useCallback(() => {
    valueRef.current = initialValueRef.current;
    setStoredValue(initialValueRef.current);

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Unable to remove localStorage value:", error);
    }
  }, [key]);

  // Synchronize changes made in other browser tabs.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) {
        return;
      }

      if (event.key === null || event.newValue === null) {
        const nextValue = initialValueRef.current;

        valueRef.current = nextValue;
        setStoredValue(nextValue);
        return;
      }

      try {
        const parsedValue = JSON.parse(event.newValue) as T;

        valueRef.current = parsedValue;
        setStoredValue(parsedValue);
      } catch (error) {
        console.error(
          "Unable to synchronize localStorage:",
          error,
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return {
    value,
    setValue,
    removeValue,
    isInitialized,
  };
}

export default useLocalStorage;