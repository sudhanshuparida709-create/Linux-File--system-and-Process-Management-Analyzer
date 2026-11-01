import type { ReactNode } from "react";

/* ==============================
   CPU Usage Types
================================ */

export interface CpuUsagePoint {
  time: string;
  usage: number;
}

/* ==============================
   Memory Usage Types
================================ */

export interface MemoryUsagePoint {
  time: string;
  used: number;
  available: number;
}

/* ==============================
   Process Management Types
================================ */

export type ProcessState =
  | "running"
  | "sleeping"
  | "stopped"
  | "idle";

export interface ProcessInfo {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  memory: number;
  state: ProcessState;
}

/* ==============================
   Dashboard Metric Types
================================ */

export type MetricTone =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "red";

export interface MetricTrend {
  value: number;
  label?: string;
  direction?: "up" | "down" | "neutral";
  tone?: "good" | "bad" | "neutral";
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  tone?: MetricTone;
  trend?: MetricTrend;
}

/* ==============================
   Disk Usage Types
================================ */

export interface DiskUsage {
  used: number;
  total: number;
  available?: number;
  unit: string;
  diskName?: string;
  mountPoint?: string;
}

/* ==============================
   System Information Types
================================ */

export interface SystemInfo {
  systemName: string;
  hostname?: string;
  operatingSystem?: string;
  kernelVersion?: string;
  architecture?: string;
  uptime: string;
  lastUpdated: string;
}

/* ==============================
   Dashboard Data Types
================================ */

export interface DashboardData {
  systemName: string;
  uptime: string;
  lastUpdated: string;

  cpuUsage: number;

  memoryUsed: number;
  memoryTotal: number;

  diskUsed: number;
  diskTotal: number;

  activeProcesses: number;

  cpuData: CpuUsagePoint[];
  memoryData: MemoryUsagePoint[];

  processes: ProcessInfo[];
}

/* ==============================
   Dashboard Hook Types
================================ */

export interface UseDashboardOptions {
  apiUrl?: string;
  refreshInterval?: number;
}

export interface UseDashboardReturn {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  refresh: () => Promise<void>;
}

/* ==============================
   Component Props Types
================================ */

export interface MetricCardProps {
  title: string;
  value: ReactNode;
  unit?: string;
  icon?: React.ElementType;
  tone?: MetricTone;
  trend?: MetricTrend;
  description?: string;
  footer?: ReactNode;
  loading?: boolean;
}

export interface CpuUsageChartProps {
  data?: CpuUsagePoint[];
  currentUsage?: number;
  title?: string;
  subtitle?: string;
}

export interface MemoryUsageChartProps {
  data?: MemoryUsagePoint[];
  used?: number;
  total?: number;
  title?: string;
  subtitle?: string;
  unit?: string;
}

export interface DiskUsageCardProps {
  used?: number;
  total?: number;
  unit?: string;
  diskName?: string;
  mountPoint?: string;
  subtitle?: string;
}

export interface ProcessSummaryProps {
  processes?: ProcessInfo[];
  maxItems?: number;
  onViewAll?: () => void;
  title?: string;
}

export interface SystemOverviewProps {
  systemName?: string;
  uptime?: string;
  lastUpdated?: string;

  cpuUsage?: number;

  memoryUsed?: number;
  memoryTotal?: number;

  diskUsed?: number;
  diskTotal?: number;

  activeProcesses?: number;

  cpuData?: CpuUsagePoint[];
  memoryData?: MemoryUsagePoint[];

  processes?: ProcessInfo[];

  onViewAllProcesses?: () => void;
}