/* =====================================
   Application Constants
===================================== */

export const APP_NAME = "Linux File System";

export const APP_DESCRIPTION =
  "Linux File System and Process Management Dashboard";

export const APP_VERSION = "1.0.0";

/* =====================================
   Navigation Constants
===================================== */

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  FILE_SYSTEM: "/file-system",
  DIRECTORIES: "/directories",
  STORAGE: "/storage",
  FILE_OPERATIONS: "/file-operations",
  PROCESSES: "/processes",
  PROCESS_MONITOR: "/process-monitor",
  SYSTEM_MONITOR: "/system-monitor",
  TERMINAL: "/terminal",
  NETWORK: "/network",
  SYSTEM_INFO: "/system-info",
  SETTINGS: "/settings",
} as const;

/* =====================================
   Process Constants
===================================== */

export const PROCESS_STATES = {
  RUNNING: "running",
  SLEEPING: "sleeping",
  STOPPED: "stopped",
  ZOMBIE: "zombie",
  IDLE: "idle",
} as const;

export const PROCESS_ACTIONS = {
  TERMINATE: "terminate",
  PAUSE: "pause",
  RESUME: "resume",
} as const;

export const DEFAULT_PROCESS_PRIORITY = 20;

export const MIN_PROCESS_NICE = -20;

export const MAX_PROCESS_NICE = 19;

/* =====================================
   Filesystem Constants
===================================== */

export const FILE_TYPES = {
  FILE: "file",
  FOLDER: "folder",
} as const;

export const DEFAULT_FILESYSTEM_PATH = "/home/user";

export const DEFAULT_FILE_PERMISSIONS = "rw-r--r--";

export const STORAGE_UNITS = [
  "B",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB",
] as const;

/* =====================================
   System Monitoring Constants
===================================== */

export const CPU_WARNING_THRESHOLD = 70;

export const CPU_CRITICAL_THRESHOLD = 90;

export const MEMORY_WARNING_THRESHOLD = 75;

export const MEMORY_CRITICAL_THRESHOLD = 90;

export const DISK_WARNING_THRESHOLD = 80;

export const DISK_CRITICAL_THRESHOLD = 90;

/* =====================================
   Refresh Intervals (milliseconds)
===================================== */

export const REFRESH_INTERVALS = {
  FAST: 1000,
  NORMAL: 5000,
  SLOW: 10000,
  VERY_SLOW: 30000,
} as const;

/* =====================================
   Responsive Breakpoints
===================================== */

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
  WIDE: 1536,
} as const;

/* =====================================
   Pagination Constants
===================================== */

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/* =====================================
   Local Storage Keys
===================================== */

export const STORAGE_KEYS = {
  THEME: "linuxfs-theme",
  SIDEBAR_OPEN: "linuxfs-sidebar-open",
  USER_PREFERENCES: "linuxfs-user-preferences",
  DASHBOARD_LAYOUT: "linuxfs-dashboard-layout",
  TABLE_PAGE_SIZE: "linuxfs-table-page-size",
} as const;

/* =====================================
   Theme Constants
===================================== */

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

/* =====================================
   UI Constants
===================================== */

export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 260,
  SIDEBAR_COLLAPSED_WIDTH: 76,
  HEADER_HEIGHT: 72,
  MODAL_Z_INDEX: 1000,
  TOOLTIP_Z_INDEX: 1100,
} as const;

/* =====================================
   API Constants
===================================== */

export const API_CONFIG = {
  DEFAULT_TIMEOUT: 15000,
  DEFAULT_HEADERS: {
    Accept: "application/json",
  },
} as const;