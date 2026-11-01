/* =====================================
   Process State
===================================== */

export type ProcessState =
  | "running"
  | "sleeping"
  | "stopped"
  | "zombie"
  | "idle";

/* =====================================
   Process Information
===================================== */

export interface ProcessInfo {
  pid: number;
  name: string;
  user: string;
  state: ProcessState;

  /** CPU usage percentage */
  cpu: number;

  /** Memory usage in MB */
  memory: number;

  priority?: number;
  nice?: number;
  threads?: number;
  started?: string;
  parentPid?: number;
  command?: string;
}

/* =====================================
   Process Filtering and Sorting
===================================== */

export type ProcessSortField =
  | "pid"
  | "name"
  | "cpu"
  | "memory";

export interface ProcessFilterValue {
  query: string;
  state: ProcessState | "all";
  sortBy: ProcessSortField;
  sortOrder: "asc" | "desc";
}

export const DEFAULT_PROCESS_FILTERS: ProcessFilterValue = {
  query: "",
  state: "all",
  sortBy: "pid",
  sortOrder: "desc",
};

/* =====================================
   Process Statistics
===================================== */

export interface ProcessStats {
  total: number;
  running: number;
  sleeping: number;
  stopped: number;
  zombie: number;
  idle: number;
  averageCpu: number;
  totalMemory: number;
}

/* =====================================
   Process API Types
===================================== */

export interface ProcessesApiResponse {
  processes: ProcessInfo[];
  total?: number;
}

export type ProcessActionType =
  | "terminate"
  | "pause"
  | "resume";

export interface ProcessActionResponse {
  success: boolean;
  message?: string;
}

/* =====================================
   Hook Configuration
===================================== */

export interface UseProcessesOptions {
  apiUrl?: string;
  refreshInterval?: number;
  initialFilters?: Partial<ProcessFilterValue>;
}

/* =====================================
   Hook Return Type
===================================== */

export interface UseProcessesReturn {
  processes: ProcessInfo[];
  filteredProcesses: ProcessInfo[];
  selectedProcess: ProcessInfo | null;

  filters: ProcessFilterValue;
  stats: ProcessStats;

  loading: boolean;
  error: string | null;
  isDemo: boolean;

  selectProcess: (process: ProcessInfo | null) => void;
  setFilters: (filters: ProcessFilterValue) => void;
  updateFilters: (filters: Partial<ProcessFilterValue>) => void;

  refresh: () => Promise<void>;

  terminateProcess: (pid: number) => Promise<void>;
  pauseProcess: (pid: number) => Promise<void>;
  resumeProcess: (pid: number) => Promise<void>;
}