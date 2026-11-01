import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Folder,
  FolderTree,
  HardDrive,
  FileText,
  Cpu,
  Activity,
  Monitor,
  Settings,
  Terminal,
  Network,
  Database,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export const navigation: NavigationGroup[] = [
  {
    title: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "System overview and statistics",
      },
    ],
  },
  {
    title: "File Management",
    items: [
      {
        id: "file-system",
        label: "File Explorer",
        href: "/file-system",
        icon: Folder,
        description: "Browse and manage files",
      },
      {
        id: "directories",
        label: "Directory Tree",
        href: "/directories",
        icon: FolderTree,
        description: "Explore directory structures",
      },
      {
        id: "storage",
        label: "Storage",
        href: "/storage",
        icon: HardDrive,
        description: "Manage disks and partitions",
      },
      {
        id: "file-operations",
        label: "File Operations",
        href: "/file-operations",
        icon: FileText,
        description: "View file operation history",
      },
    ],
  },
  {
    title: "Process Management",
    items: [
      {
        id: "processes",
        label: "Processes",
        href: "/processes",
        icon: Cpu,
        description: "View and manage running processes",
      },
      {
        id: "process-monitor",
        label: "Process Monitor",
        href: "/process-monitor",
        icon: Activity,
        description: "Monitor CPU and memory usage",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        id: "system-monitor",
        label: "System Monitor",
        href: "/system-monitor",
        icon: Monitor,
        description: "Monitor overall system performance",
      },
      {
        id: "terminal",
        label: "Terminal",
        href: "/terminal",
        icon: Terminal,
        description: "Access terminal commands",
      },
      {
        id: "network",
        label: "Network",
        href: "/network",
        icon: Network,
        description: "View network information",
      },
      {
        id: "database",
        label: "System Information",
        href: "/system-info",
        icon: Database,
        description: "View system details",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Configure application preferences",
      },
    ],
  },
];

export const mainNavigation = navigation;

export default navigation;