const API_ENDPOINTS = {
  dashboard: {
    overview: "/api/system/overview",
  },

  filesystem: {
    list: "/api/filesystem",

    details: (path: string) =>
      `/api/filesystem/details?path=${encodeURIComponent(path)}`,

    create: "/api/filesystem/create",

    rename: "/api/filesystem/rename",

    copy: "/api/filesystem/copy",

    move: "/api/filesystem/move",

    delete: (path: string) =>
      `/api/filesystem?path=${encodeURIComponent(path)}`,

    upload: "/api/filesystem/upload",

    download: "/api/filesystem/download",

    permissions: "/api/filesystem/permissions",
  },

  directories: {
    tree: "/api/filesystem/tree",
  },

  storage: {
    overview: "/api/storage",
    disks: "/api/storage/disks",
    partitions: "/api/storage/partitions",
  },

  processes: {
    list: "/api/processes",

    details: (pid: number) =>
      `/api/processes/${pid}`,

    terminate: (pid: number) =>
      `/api/processes/${pid}`,

    pause: (pid: number) =>
      `/api/processes/${pid}/pause`,

    resume: (pid: number) =>
      `/api/processes/${pid}/resume`,
  },

  system: {
    overview: "/api/system/overview",
    cpu: "/api/system/cpu",
    memory: "/api/system/memory",
    disk: "/api/system/disk",
    information: "/api/system/info",
  },

  network: {
    overview: "/api/network",
    interfaces: "/api/network/interfaces",
    statistics: "/api/network/statistics",
  },

  terminal: {
    execute: "/api/terminal/execute",
    history: "/api/terminal/history",
  },
} as const;

export default API_ENDPOINTS;