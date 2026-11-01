/* =====================================
   Number Formatting
===================================== */

export function formatNumber(
  value: number,
  decimals?: number,
  locale = "en-IN",
): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 2,
  }).format(value);
}

/* =====================================
   Byte Formatting
===================================== */

export function formatBytes(
  bytes: number,
  decimals = 2,
): string {
  if (!Number.isFinite(bytes)) {
    return "0 Bytes";
  }

  if (bytes === 0) {
    return "0 Bytes";
  }

  const sign = bytes < 0 ? "-" : "";
  const absoluteBytes = Math.abs(bytes);

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
  ];

  const unitIndex = Math.min(
    Math.floor(Math.log(absoluteBytes) / Math.log(1024)),
    units.length - 1,
  );

  const value =
    absoluteBytes / Math.pow(1024, unitIndex);

  return `${sign}${value.toFixed(
    Math.max(0, decimals),
  )} ${units[unitIndex]}`;
}

/* =====================================
   Storage Formatting
===================================== */

export function formatStorage(
  value: number,
  unit = "GB",
  decimals = 1,
): string {
  if (!Number.isFinite(value)) {
    return `0 ${unit}`;
  }

  return `${formatNumber(value, decimals)} ${unit}`;
}

/* =====================================
   Percentage Formatting
===================================== */

export function formatPercent(
  value: number,
  decimals = 1,
): string {
  if (!Number.isFinite(value)) {
    return "0%";
  }

  return `${value.toFixed(Math.max(0, decimals))}%`;
}

/* =====================================
   Memory Formatting
   Input is in MB
===================================== */

export function formatMemory(
  megabytes: number,
  decimals = 2,
): string {
  if (!Number.isFinite(megabytes)) {
    return "0 MB";
  }

  if (Math.abs(megabytes) >= 1024) {
    const gigabytes = megabytes / 1024;

    return `${gigabytes.toFixed(decimals)} GB`;
  }

  return `${megabytes.toFixed(decimals)} MB`;
}

/* =====================================
   Date Helper
===================================== */

function toValidDate(
  value: string | number | Date,
): Date | null {
  const date =
    value instanceof Date
      ? value
      : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

/* =====================================
   Date Formatting
===================================== */

export function formatDate(
  value: string | number | Date,
  locale = "en-IN",
): string {
  const date = toValidDate(value);

  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/* =====================================
   Date and Time Formatting
===================================== */

export function formatDateTime(
  value: string | number | Date,
  locale = "en-IN",
): string {
  const date = toValidDate(value);

  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/* =====================================
   Time Formatting
===================================== */

export function formatTime(
  value: string | number | Date,
  locale = "en-IN",
): string {
  const date = toValidDate(value);

  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

/* =====================================
   Relative Time Formatting
===================================== */

export function formatRelativeTime(
  value: string | number | Date,
  now = Date.now(),
  locale = "en",
): string {
  const date = toValidDate(value);

  if (!date) {
    return "—";
  }

  const difference = date.getTime() - now;
  const seconds = Math.round(difference / 1000);

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const units: {
    seconds: number;
    unit: Intl.RelativeTimeFormatUnit;
  }[] = [
    { seconds: 60, unit: "second" },
    { seconds: 60, unit: "minute" },
    { seconds: 24, unit: "hour" },
    { seconds: 7, unit: "day" },
    { seconds: 4.345, unit: "week" },
    { seconds: 12, unit: "month" },
    { seconds: Infinity, unit: "year" },
  ];

  let remaining = seconds;

  for (let index = 0; index < units.length; index++) {
    const current = units[index];

    if (Math.abs(remaining) < current.seconds) {
      return formatter.format(
        Math.round(remaining),
        current.unit,
      );
    }

    if (index < units.length - 1) {
      remaining /= current.seconds;
    }
  }

  return formatter.format(
    Math.round(remaining),
    "year",
  );
}

/* =====================================
   Uptime Formatting
   Input is in seconds
===================================== */

export function formatUptime(
  totalSeconds: number,
): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "0 seconds";
  }

  const seconds = Math.floor(totalSeconds);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(" ");
}

/* =====================================
   Duration Formatting
   Input is in milliseconds
===================================== */

export function formatDuration(
  milliseconds: number,
): string {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return "0 ms";
  }

  if (milliseconds < 1000) {
    return `${Math.round(milliseconds)} ms`;
  }

  if (milliseconds < 60000) {
    return `${(milliseconds / 1000).toFixed(1)} sec`;
  }

  return formatUptime(Math.floor(milliseconds / 1000));
}

/* =====================================
   Text Formatting
===================================== */

export function capitalize(value: string): string {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatProcessState(
  state: string,
): string {
  return state
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}