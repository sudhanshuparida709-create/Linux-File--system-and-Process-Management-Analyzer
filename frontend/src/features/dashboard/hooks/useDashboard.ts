"use client";

import { useCallback, useEffect, useState } from "react";

import type { CpuUsagePoint } from "../components/CpuUsageChart";
import type { MemoryUsagePoint } from "../components/MemoryUsageChart";
import type { ProcessInfo } from "../components/ProcessSummary";

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

interface UseDashboardOptions {
  apiUrl?: string;
  refreshInterval?: number;
}

interface UseDashboardReturn {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  refresh: () => Promise<void>;
}

// Sample dashboard data used when the backend is unavailable.
const demoDashboardData: DashboardData = {
  systemName: "Ubuntu Linux",
  uptime: "12 days, 4 hours",
  lastUpdated: "Just now",

  cpuUsage: 42.5,

  memoryUsed: 5.8,
  memoryTotal: 16,

  diskUsed: 186,
  diskTotal: 512,

  activeProcesses: 128,

  cpuData: [
    { time: "09:00", usage: 32 },
    { time: "09:05", usage: 45 },
    { time: "09:10", usage: 38 },
    { time: "09:15", usage: 56 },
    { time: "09:20", usage: 42 },
    { time: "09:25", usage: 61 },
    { time: "09:30", usage: 48 },
    { time: "09:35", usage: 68 },
    { time: "09:40", usage: 52 },
    { time: "09:45", usage: 44 },
    { time: "09:50", usage: 59 },
    { time: "09:55", usage: 42.5 },
  ],

  memoryData: [
    { time: "09:00", used: 5.1, available: 10.9 },
    { time: "09:05", used: 5.8, available: 10.2 },
    { time: "09:10", used: 6.2, available: 9.8 },
    { time: "09:15", used: 5.6, available: 10.4 },
    { time: "09:20", used: 6.4, available: 9.6 },
    { time: "09:25", used: 7.1, available: 8.9 },
    { time: "09:30", used: 6.5, available: 9.5 },
    { time: "09:35", used: 7.8, available: 8.2 },
    { time: "09:40", used: 7.2, available: 8.8 },
    { time: "09:45", used: 6.4, available: 9.6 },
    { time: "09:50", used: 6.1, available: 9.9 },
    { time: "09:55", used: 5.8, available: 10.2 },
  ],

  processes: [
    {
      pid: 1024,
      name: "systemd",
      user: "root",
      cpu: 1.2,
      memory: 85.4,
      state: "running",
    },
    {
      pid: 2048,
      name: "chrome",
      user: "user",
      cpu: 12.5,
      memory: 512.8,
      state: "running",
    },
    {
      pid: 3072,
      name: "node",
      user: "user",
      cpu: 8.3,
      memory: 256.2,
      state: "running",
    },
    {
      pid: 4096,
      name: "sshd",
      user: "root",
      cpu: 0.4,
      memory: 24.6,
      state: "sleeping",
    },
    {
      pid: 5120,
      name: "postgres",
      user: "postgres",
      cpu: 3.7,
      memory: 180.5,
      state: "running",
    },
  ],
};

export function useDashboard({
  apiUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/system/overview`
    : "/api/system/overview",

  refreshInterval = 0,
}: UseDashboardOptions = {}): UseDashboardReturn {
  const [data, setData] = useState<DashboardData>(
    demoDashboardData,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(true);

  const refresh = useCallback(async (): Promise<void> => {
    const controller = new AbortController();

    try {
      setError(null);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load dashboard data: ${response.status}`,
        );
      }

      const result: Partial<DashboardData> =
        await response.json();

      // Keep existing demo values for fields not returned by the API.
      const updatedData: DashboardData = {
        ...demoDashboardData,
        ...result,
        cpuData: result.cpuData ?? demoDashboardData.cpuData,
        memoryData:
          result.memoryData ?? demoDashboardData.memoryData,
        processes:
          result.processes ?? demoDashboardData.processes,
        lastUpdated: new Date().toLocaleTimeString(),
      };

      setData(updatedData);
      setIsDemo(false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      // Keep the dashboard usable when the backend is unavailable.
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data.",
      );

      setData(demoDashboardData);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }

    
  }, [apiUrl]);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      if (!active) return;
      await refresh();
    };

    void loadDashboard();

    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (refreshInterval > 0) {
      intervalId = setInterval(() => {
        if (active) {
          void refresh();
        }
      }, refreshInterval);
    }

    return () => {
      active = false;

      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refresh, refreshInterval]);

  return {
    data,
    loading,
    error,
    isDemo,
    refresh,
  };
}

export default useDashboard;