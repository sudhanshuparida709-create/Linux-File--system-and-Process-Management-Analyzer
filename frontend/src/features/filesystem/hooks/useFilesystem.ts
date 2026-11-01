"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  DirectoryNode,
  FileItem,
  FilesystemStorage,
} from "../types";

interface UseFilesystemOptions {
  apiUrl?: string;
  initialPath?: string;
  refreshInterval?: number;
}

interface UseFilesystemReturn {
  files: FileItem[];
  directories: DirectoryNode[];
  storage: FilesystemStorage;
  currentPath: string;
  selectedFile: FileItem | null;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  navigateTo: (path: string) => void;
  selectFile: (file: FileItem | null) => void;
  refresh: () => Promise<void>;
}

const defaultDirectories: DirectoryNode[] = [
  {
    id: "root",
    name: "Root",
    path: "/",
    children: [
      {
        id: "home",
        name: "home",
        path: "/home",
        children: [
          {
            id: "user",
            name: "user",
            path: "/home/user",
            children: [
              {
                id: "documents",
                name: "Documents",
                path: "/home/user/Documents",
              },
              {
                id: "downloads",
                name: "Downloads",
                path: "/home/user/Downloads",
              },
              {
                id: "pictures",
                name: "Pictures",
                path: "/home/user/Pictures",
              },
              {
                id: "projects",
                name: "Projects",
                path: "/home/user/Projects",
              },
            ],
          },
        ],
      },
      {
        id: "etc",
        name: "etc",
        path: "/etc",
      },
      {
        id: "var",
        name: "var",
        path: "/var",
        children: [
          {
            id: "log",
            name: "log",
            path: "/var/log",
          },
        ],
      },
      {
        id: "usr",
        name: "usr",
        path: "/usr",
      },
    ],
  },
];

const defaultFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    size: "—",
    modified: "2026-10-30",
    owner: "user",
    permissions: "rwxr-xr-x",
    path: "/home/user",
  },
  {
    id: "2",
    name: "Downloads",
    type: "folder",
    size: "—",
    modified: "2026-10-29",
    owner: "user",
    permissions: "rwxr-xr-x",
    path: "/home/user",
  },
  {
    id: "3",
    name: "Projects",
    type: "folder",
    size: "—",
    modified: "2026-10-31",
    owner: "user",
    permissions: "rwxr-xr-x",
    path: "/home/user",
  },
  {
    id: "4",
    name: "report.pdf",
    type: "file",
    size: "2.4 MB",
    modified: "2026-10-28",
    owner: "user",
    permissions: "rw-r--r--",
    path: "/home/user",
    extension: "PDF Document",
  },
  {
    id: "5",
    name: "notes.txt",
    type: "file",
    size: "12 KB",
    modified: "2026-10-27",
    owner: "user",
    permissions: "rw-r--r--",
    path: "/home/user",
    extension: "Text File",
  },
  {
    id: "6",
    name: "profile.png",
    type: "file",
    size: "1.8 MB",
    modified: "2026-10-25",
    owner: "user",
    permissions: "rw-r--r--",
    path: "/home/user",
    extension: "PNG Image",
  },
  {
    id: "7",
    name: "package.json",
    type: "file",
    size: "4 KB",
    modified: "2026-10-24",
    owner: "user",
    permissions: "rw-r--r--",
    path: "/home/user/Projects",
    extension: "JSON File",
  },
  {
    id: "8",
    name: "README.md",
    type: "file",
    size: "8 KB",
    modified: "2026-10-23",
    owner: "user",
    permissions: "rw-r--r--",
    path: "/home/user/Projects",
    extension: "Markdown File",
  },
  {
    id: "9",
    name: "setup.zip",
    type: "file",
    size: "25 MB",
    modified: "2026-10-21",
    owner: "user",
    permissions: "rw-r--r--",
    path: "/home/user/Downloads",
    extension: "ZIP Archive",
  },
];

const defaultStorage: FilesystemStorage = {
  used: 186,
  total: 512,
  available: 326,
  unit: "GB",
  mountPoint: "/",
};

export function useFilesystem({
  apiUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/filesystem`
    : "/api/filesystem",

  initialPath = "/home/user",
  refreshInterval = 0,
}: UseFilesystemOptions = {}): UseFilesystemReturn {
  const [files, setFiles] = useState<FileItem[]>(defaultFiles);

  const [directories, setDirectories] =
    useState<DirectoryNode[]>(defaultDirectories);

  const [storage, setStorage] =
    useState<FilesystemStorage>(defaultStorage);

  const [currentPath, setCurrentPath] = useState(initialPath);

  const [selectedFile, setSelectedFile] =
    useState<FileItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(true);

  const controllerRef = useRef<AbortController | null>(null);

  // Load filesystem information from the backend.
  const refresh = useCallback(async () => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const separator = apiUrl.includes("?") ? "&" : "?";

      const response = await fetch(
        `${apiUrl}${separator}path=${encodeURIComponent(currentPath)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load filesystem data: ${response.status}`,
        );
      }

      const result = await response.json();

      if (!Array.isArray(result.files)) {
        throw new Error("Invalid filesystem API response.");
      }

      setFiles(result.files);

      if (Array.isArray(result.directories)) {
        setDirectories(result.directories);
      } else {
        setDirectories(defaultDirectories);
      }

      if (result.storage) {
        setStorage({
          ...defaultStorage,
          ...result.storage,
        });
      }

      setIsDemo(false);
      setSelectedFile(null);
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
          : "Unable to load filesystem data.",
      );

      // Use sample data if the backend is unavailable.
      setFiles(defaultFiles);
      setDirectories(defaultDirectories);
      setStorage(defaultStorage);
      setIsDemo(true);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [apiUrl, currentPath]);

  // Load data whenever the selected directory changes.
  useEffect(() => {
    void refresh();

    return () => {
      controllerRef.current?.abort();
    };
  }, [refresh]);

  // Optional automatic refresh.
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

  // Navigate to another directory.
  const navigateTo = useCallback((path: string) => {
    setCurrentPath(path);
    setSelectedFile(null);
  }, []);

  // Select a file or folder.
  const selectFile = useCallback((file: FileItem | null) => {
    setSelectedFile(file);
  }, []);

  return {
    files,
    directories,
    storage,
    currentPath,
    selectedFile,
    loading,
    error,
    isDemo,
    navigateTo,
    selectFile,
    refresh,
  };
}

export default useFilesystem;