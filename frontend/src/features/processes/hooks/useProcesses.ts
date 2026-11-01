"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ProcessInfo,
  ProcessState,
  ProcessFilterValue,
  ProcessStats,
  UseProcessesOptions,
  UseProcessesReturn,
  ProcessesApiResponse,
} from "../types";

import { DEFAULT_PROCESS_FILTERS } from "../types";

/* =====================================
   Demo Process Data
===================================== */

const demoProcesses: ProcessInfo[] = [
  {
    pid: 1,
    name: "systemd",
    user: "root",
    state: "running",
    cpu: 1.2,
    memory: 85.4,
    priority: 20,
    nice: 0,
    threads: 1,
    started: "09:00:00",
    parentPid: 0,
    command: "/usr/lib/systemd/systemd",
  },
  {
    pid: 1024,
    name: "chrome",
    user: "user",
    state: "running",
    cpu: 12.5,
    memory: 512.8,
    priority: 20,
    nice: 0,
    threads: 12,
    started: "09:05:00",
    parentPid: 1,
    command: "/usr/bin/google-chrome",
  },
  {
    pid: 2048,
    name: "node",
    user: "user",
    state: "running",
    cpu: 8.3,
    memory: 256.2,
    priority: 20,
    nice: 0,
    threads: 4,
    started: "09:10:00",
    parentPid: 1024,
    command: "node server.js",
  },
  {
    pid: 3072,
    name: "sshd",
    user: "root",
    state: "sleeping",
    cpu: 0.4,
    memory: 24.6,
    priority: 20,
    nice: 0,
    threads: 1,
    started: "08:30:00",
    parentPid: 1,
    command: "/usr/sbin/sshd",
  },
  {
    pid: 4096,
    name: "postgres",
    user: "postgres",
    state: "running",
    cpu: 3.7,
    memory: 180.5,
    priority: 20,
    nice: 0,
    threads: 6,
    started: "08:45:00",
    parentPid: 1,
    command: "/usr/lib/postgresql/bin/postgres",
  },
  {
    pid: 5120,
    name: "cron",
    user: "root",
    state: "sleeping",
    cpu: 0.2,
    memory: 18.3,
    priority: 20,
    nice: 0,
    threads: 1,
    started: "08:00:00",
    parentPid: 1,
    command: "/usr/sbin/cron",
  },
  {
    pid: 6144,
    name: "backup-worker",
    user: "user",
    state: "stopped",
    cpu: 0,
    memory: 45.2,
    priority: 15,
    nice: 5,
    threads: 2,
    started: "07:30:00",
    parentPid: 1,
    command: "./backup-worker",
  },
];

/* =====================================
   Helper Functions
===================================== */

function calculateStats(
  processes: ProcessInfo[],
): ProcessStats {
  const total = processes.length;

  const running = processes.filter(
    (process) => process.state === "running",
  ).length;

  const sleeping = processes.filter(
    (process) => process.state === "sleeping",
  ).length;

  const stopped = processes.filter(
    (process) => process.state === "stopped",
  ).length;

  const zombie = processes.filter(
    (process) => process.state === "zombie",
  ).length;

  const idle = processes.filter(
    (process) => process.state === "idle",
  ).length;

  const totalCpu = processes.reduce(
    (sum, process) => sum + process.cpu,
    0,
  );

  const totalMemory = processes.reduce(
    (sum, process) => sum + process.memory,
    0,
  );

  return {
    total,
    running,
    sleeping,
    stopped,
    zombie,
    idle,
    averageCpu: total > 0 ? totalCpu / total : 0,
    totalMemory,
  };
}

function filterAndSortProcesses(
  processes: ProcessInfo[],
  filters: ProcessFilterValue,
): ProcessInfo[] {
  const query = filters.query.trim().toLowerCase();

  const filtered = processes.filter((process) => {
    const matchesSearch =
      query.length === 0 ||
      process.name.toLowerCase().includes(query) ||
      process.user.toLowerCase().includes(query) ||
      String(process.pid).includes(query) ||
      (process.command ?? "").toLowerCase().includes(query);

    const matchesState =
      filters.state === "all" ||
      process.state === filters.state;

    return matchesSearch && matchesState;
  });

  const direction =
    filters.sortOrder === "asc" ? 1 : -1;

  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "name":
        return direction * a.name.localeCompare(b.name);

      case "cpu":
        return direction * (a.cpu - b.cpu);

      case "memory":
        return direction * (a.memory - b.memory);

      case "pid":
      default:
        return direction * (a.pid - b.pid);
    }
  });
}

/* =====================================
   Main Processes Hook
===================================== */

export function useProcesses({
  apiUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/processes`
    : "/api/processes",

  refreshInterval = 0,
  initialFilters = {},
}: UseProcessesOptions = {}): UseProcessesReturn {
  const [processes, setProcesses] =
    useState<ProcessInfo[]>(demoProcesses);

  const [selectedProcessId, setSelectedProcessId] =
    useState<number | null>(null);

  const [filters, setFilters] =
    useState<ProcessFilterValue>({
      ...DEFAULT_PROCESS_FILTERS,
      ...initialFilters,
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(true);

  const controllerRef = useRef<AbortController | null>(null);

  /* ---------------------------------
     Refresh Process List
  --------------------------------- */

  const refresh = useCallback(async () => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
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
          `Unable to fetch processes: HTTP ${response.status}`,
        );
      }

      const result: ProcessesApiResponse =
        await response.json();

      if (!Array.isArray(result.processes)) {
        throw new Error(
          "Invalid process API response. Expected a processes array.",
        );
      }

      setProcesses(result.processes);
      setIsDemo(false);

      setSelectedProcessId((currentId) => {
        if (
          currentId !== null &&
          result.processes.some(
            (process) => process.pid === currentId,
          )
        ) {
          return currentId;
        }

        return null;
      });
    } catch (err) {
      if (
        err instanceof Error &&
        err.name === "AbortError"
      ) {
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load process information.",
      );

      setProcesses(demoProcesses);
      setSelectedProcessId(null);
      setIsDemo(true);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [apiUrl]);

  /* ---------------------------------
     Initial Load and Auto Refresh
  --------------------------------- */

  useEffect(() => {
    void refresh();

    return () => {
      controllerRef.current?.abort();
    };
  }, [refresh]);

  useEffect(() => {
    if (refreshInterval <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      void refresh();
    }, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [refresh, refreshInterval]);

  /* ---------------------------------
     Select Process
  --------------------------------- */

  const selectProcess = useCallback(
    (process: ProcessInfo | null) => {
      setSelectedProcessId(process?.pid ?? null);
    },
    [],
  );

  const selectedProcess =
    processes.find(
      (process) => process.pid === selectedProcessId,
    ) ?? null;

  /* ---------------------------------
     Update Filters
  --------------------------------- */

  const updateFilters = useCallback(
    (updates: Partial<ProcessFilterValue>) => {
      setFilters((previous) => ({
        ...previous,
        ...updates,
      }));
    },
    [],
  );

  /* ---------------------------------
     Filter and Sort Process List
  --------------------------------- */

  const filteredProcesses = useMemo(
    () => filterAndSortProcesses(processes, filters),
    [processes, filters],
  );

  /* ---------------------------------
     Calculate Statistics
  --------------------------------- */

  const stats = useMemo(
    () => calculateStats(processes),
    [processes],
  );

  /* ---------------------------------
     Process Action Handler
  --------------------------------- */

  const executeProcessAction = useCallback(
    async (
      pid: number,
      action: "terminate" | "pause" | "resume",
    ) => {
      const processToUpdate = processes.find(
        (process) => process.pid === pid,
      );

      if (!processToUpdate) {
        throw new Error(`Process with PID ${pid} was not found.`);
      }

      setError(null);

      // Demo actions only update frontend state.
      // They do not affect real operating-system processes.
      if (isDemo) {
        if (action === "terminate") {
          setProcesses((previous) =>
            previous.filter((process) => process.pid !== pid),
          );

          setSelectedProcessId((currentId) =>
            currentId === pid ? null : currentId,
          );

          return;
        }

        const nextState: ProcessState =
          action === "pause" ? "stopped" : "running";

        setProcesses((previous) =>
          previous.map((process) =>
            process.pid === pid
              ? { ...process, state: nextState }
              : process,
          ),
        );

        return;
      }

      // Real process actions are sent to the backend.
      const actionUrl =
        action === "terminate"
          ? `${apiUrl}/${pid}`
          : `${apiUrl}/${pid}/${action}`;

      try {
        const response = await fetch(actionUrl, {
          method: action === "terminate" ? "DELETE" : "POST",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Unable to ${action} process ${pid}: HTTP ${response.status}`,
          );
        }

        await refresh();
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : `Failed to ${action} process.`;

        setError(message);
        throw err;
      }
    },
    [apiUrl, isDemo, processes, refresh],
  );

  /* ---------------------------------
     Public Process Actions
  --------------------------------- */

  const terminateProcess = useCallback(
    async (pid: number) => {
      await executeProcessAction(pid, "terminate");
    },
    [executeProcessAction],
  );

  const pauseProcess = useCallback(
    async (pid: number) => {
      await executeProcessAction(pid, "pause");
    },
    [executeProcessAction],
  );

  const resumeProcess = useCallback(
    async (pid: number) => {
      await executeProcessAction(pid, "resume");
    },
    [executeProcessAction],
  );

  return {
    processes,
    filteredProcesses,
    selectedProcess,

    filters,
    setFilters,
    updateFilters,

    stats,

    loading,
    error,
    isDemo,

    selectProcess,
    refresh,

    terminateProcess,
    pauseProcess,
    resumeProcess,
  };
}

export default useProcesses;