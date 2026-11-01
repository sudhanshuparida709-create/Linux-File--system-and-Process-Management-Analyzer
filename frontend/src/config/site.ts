export const siteConfig = {
  name: "Linux File System",
  shortName: "LinuxFS",

  description:
    "A modern dashboard for Linux file system exploration, process management, and system monitoring.",

  url: "http://localhost:3000",

  version: "1.0.0",

  author: "Linux File System Team",

  application: {
    title: "Linux File System & Process Management",
    subtitle: "Manage files, monitor processes, and explore your Linux system.",

    logo: "/logo.svg",
    favicon: "/favicon.ico",

    copyright: "Linux File System & Process Management",
  },

  theme: {
    defaultMode: "light",
    enableDarkMode: true,

    style: "claymorphism",

    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      background: "#f4f5fb",
      surface: "#ffffff",
      text: "#1e293b",
      muted: "#64748b",
    },
  },

  layout: {
    sidebarWidth: 260,
    collapsedSidebarWidth: 76,
    headerHeight: 72,

    defaultSidebarOpen: true,
  },

  features: {
    fileManagement: true,
    processManagement: true,
    directoryTree: true,
    storageMonitoring: true,
    systemMonitoring: true,
    terminal: true,
    networkMonitoring: true,
  },
} as const;

export const SITE_NAME = siteConfig.name;
export const SITE_DESCRIPTION = siteConfig.description;
export const SITE_URL = siteConfig.url;

export default siteConfig;