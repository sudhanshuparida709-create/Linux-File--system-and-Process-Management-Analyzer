import type { ReactNode } from "react";

/* =====================================
   File System Types
===================================== */

export type FileType = "file" | "folder";

export interface FileItem {
  id: string;
  name: string;
  type: FileType;

  size: string;
  modified: string;

  owner: string;
  permissions: string;

  path: string;
  extension?: string;
  mimeType?: string;
}

/* =====================================
   Directory Tree Types
===================================== */

export interface DirectoryNode {
  id: string;
  name: string;
  path: string;
  children?: DirectoryNode[];
}

/* =====================================
   Storage Types
===================================== */

export interface FilesystemStorage {
  used: number;
  total: number;
  available?: number;
  unit: string;
  diskName?: string;
  mountPoint?: string;
}

/* =====================================
   File Operation Types
===================================== */

export type FileOperationType =
  | "create"
  | "delete"
  | "rename"
  | "copy"
  | "move"
  | "upload"
  | "download";

export type FileOperationStatus =
  | "pending"
  | "completed"
  | "failed";

export interface FileOperation {
  id: string;
  type: FileOperationType;
  fileName: string;
  sourcePath?: string;
  destinationPath?: string;
  status: FileOperationStatus;
  timestamp: string;
  message?: string;
}

/* =====================================
   File Permission Types
===================================== */

export interface FilePermissions {
  ownerRead: boolean;
  ownerWrite: boolean;
  ownerExecute: boolean;

  groupRead: boolean;
  groupWrite: boolean;
  groupExecute: boolean;

  othersRead: boolean;
  othersWrite: boolean;
  othersExecute: boolean;
}

/* =====================================
   Filesystem API Types
===================================== */

export interface FilesystemApiResponse {
  files: FileItem[];
  directories?: DirectoryNode[];
  storage?: FilesystemStorage;
}

/* =====================================
   Hook Configuration
===================================== */

export interface UseFilesystemOptions {
  apiUrl?: string;
  initialPath?: string;
  refreshInterval?: number;
}

/* =====================================
   Hook Return Types
===================================== */

export interface UseFilesystemReturn {
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

/* =====================================
   Component Props
===================================== */

export interface DirectoryTreeProps {
  data?: DirectoryNode[];
  selectedPath?: string;
  onSelect?: (directory: DirectoryNode) => void;
  title?: string;
}

export interface FileDetailsProps {
  file: FileItem | null;
  title?: string;
}

export interface FileTableProps {
  files: FileItem[];
  onSelect?: (file: FileItem) => void;
  selectedFileId?: string;
  viewMode?: "table" | "grid";
  onDownload?: (file: FileItem) => void;
}

export interface StorageChartProps {
  used?: number;
  total?: number;
  unit?: string;
  title?: string;
}

export interface FileExplorerProps {
  files?: FileItem[];
  directories?: DirectoryNode[];
  onRefresh?: () => void;
  onUpload?: () => void;
  onCreateFolder?: () => void;
  onFileSelect?: (file: FileItem) => void;
}

/* =====================================
   General UI Types
===================================== */

export interface FileAction {
  id: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  onClick: (file: FileItem) => void;
}