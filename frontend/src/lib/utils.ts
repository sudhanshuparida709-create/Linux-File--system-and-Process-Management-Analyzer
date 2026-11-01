/* =====================================
   Class Name Utility
===================================== */

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/**
 * Combines conditional CSS class names.
 *
 * Example:
 * cn("button", isActive && "active")
 * cn("card", { "card-selected": selected })
 */
export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  const processValue = (value: ClassValue): void => {
    if (!value) {
      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(processValue);
      return;
    }

    if (typeof value === "object") {
      Object.entries(value).forEach(([key, enabled]) => {
        if (enabled) {
          classes.push(key);
        }
      });
    }
  };

  values.forEach(processValue);

  return classes.join(" ");
}

/* =====================================
   Number Utilities
===================================== */

/**
 * Restricts a number between minimum and maximum.
 */
export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  return Math.min(Math.max(value, lower), upper);
}

/**
 * Calculates a percentage.
 */
export function calculatePercentage(
  value: number,
  total: number,
): number {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(total) ||
    total <= 0
  ) {
    return 0;
  }

  return (value / total) * 100;
}

/**
 * Generates a random integer between min and max.
 */
export function randomInteger(
  min: number,
  max: number,
): number {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(
    Math.random() * (upper - lower + 1),
  ) + lower;
}

/* =====================================
   Text Utilities
===================================== */

/**
 * Truncates text to a maximum length.
 */
export function truncateText(
  text: string,
  maxLength = 30,
  suffix = "...",
): string {
  if (text.length <= maxLength) {
    return text;
  }

  if (maxLength <= suffix.length) {
    return suffix.slice(0, maxLength);
  }

  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Converts a string into title case.
 */
export function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

/**
 * Returns initials from a name.
 */
export function getInitials(
  name: string,
  maxLength = 2,
): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, Math.max(0, maxLength));
}

/**
 * Checks whether a string is empty.
 */
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

/* =====================================
   Linux Path Utilities
===================================== */

/**
 * Checks whether a path is an absolute Linux path.
 */
export function isAbsolutePath(path: string): boolean {
  return path.startsWith("/");
}

/**
 * Joins Linux-style path segments.
 */
export function joinPaths(...segments: string[]): string {
  if (segments.length === 0) {
    return "";
  }

  const absolute = segments[0].startsWith("/");

  const parts = segments
    .join("/")
    .split("/")
    .filter(Boolean);

  const normalized: string[] = [];

  for (const part of parts) {
    if (part === ".") {
      continue;
    }

    if (part === "..") {
      if (
        normalized.length > 0 &&
        normalized[normalized.length - 1] !== ".."
      ) {
        normalized.pop();
      } else if (!absolute) {
        normalized.push("..");
      }

      continue;
    }

    normalized.push(part);
  }

  const result = normalized.join("/");

  return absolute ? `/${result}` : result || ".";
}

/**
 * Gets a filename from a Linux path.
 */
export function getFileName(path: string): string {
  const normalized = path.replace(/\/+$/, "");

  if (!normalized) {
    return "/";
  }

  return normalized.split("/").pop() ?? "/";
}

/**
 * Gets a file extension.
 */
export function getFileExtension(path: string): string {
  const fileName = getFileName(path);
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex <= 0 || dotIndex === fileName.length - 1) {
    return "";
  }

  return fileName.slice(dotIndex + 1).toLowerCase();
}

/**
 * Gets the parent directory of a Linux path.
 */
export function getDirectoryName(path: string): string {
  const normalized = path.replace(/\/+$/, "");

  if (!normalized || normalized === "/") {
    return "/";
  }

  const lastSlash = normalized.lastIndexOf("/");

  if (lastSlash <= 0) {
    return "/";
  }

  return normalized.slice(0, lastSlash);
}

/* =====================================
   Async Utilities
===================================== */

/**
 * Delays execution for the specified milliseconds.
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.max(0, milliseconds));
  });
}

/* =====================================
   JSON Utilities
===================================== */

/**
 * Safely parses JSON without throwing an error.
 */
export function safeJsonParse<T>(
  value: string,
  fallback: T,
): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/* =====================================
   Browser Utilities
===================================== */

/**
 * Checks whether the code is running in a browser.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Copies text to the clipboard.
 * Returns false if clipboard access is unavailable.
 */
export async function copyToClipboard(
  text: string,
): Promise<boolean> {
  if (
    !isBrowser() ||
    !navigator.clipboard ||
    !navigator.clipboard.writeText
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates a unique ID for frontend elements.
 */
export function generateId(prefix = "item"): string {
  const randomPart =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}-${randomPart}`;
}