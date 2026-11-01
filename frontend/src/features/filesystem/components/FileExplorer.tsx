"use client";

import { useMemo, useState } from "react";
import {
  RefreshCw,
  Search,
  LayoutGrid,
  List,
  Upload,
  Plus,
  ChevronRight,
  Folder,
  SlidersHorizontal,
} from "lucide-react";

import DirectoryTree, {
  type DirectoryNode,
} from "./DirectoryTree";

import FileTable, {
  type FileItem,
} from "./FileTable";

import FileDetails from "./FileDetails";

import StorageChart from "./StorageChart";

interface FileExplorerProps {
  files?: FileItem[];
  directories?: DirectoryNode[];
  onRefresh?: () => void;
  onUpload?: () => void;
  onCreateFolder?: () => void;
  onFileSelect?: (file: FileItem) => void;
}

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

export default function FileExplorer({
  files = defaultFiles,
  directories,
  onRefresh,
  onUpload,
  onCreateFolder,
  onFileSelect,
}: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState("/home/user");
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const visibleFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesPath = file.path === currentPath;

      const matchesSearch = file.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesPath && matchesSearch;
    });
  }, [files, currentPath, search]);

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDirectorySelect = (directory: DirectoryNode) => {
    setCurrentPath(directory.path);
    setSelectedFile(null);
    setSearch("");
  };

  const pathSegments = currentPath.split("/").filter(Boolean);

  const handleNavigate = (index: number) => {
    const nextPath =
      index === -1
        ? "/"
        : `/${pathSegments.slice(0, index + 1).join("/")}`;

    setCurrentPath(nextPath);
    setSelectedFile(null);
  };

  return (
    <main className="file-explorer">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2>File Explorer</h2>
          <p>Browse and manage your Linux file system.</p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="action-button secondary"
            onClick={onRefresh}
            aria-label="Refresh files"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>

          <button
            type="button"
            className="action-button secondary"
            onClick={onUpload}
          >
            <Upload size={15} />
            Upload
          </button>

          <button
            type="button"
            className="action-button primary"
            onClick={onCreateFolder}
          >
            <Plus size={15} />
            New Folder
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="breadcrumb-bar">
        <button
          type="button"
          className="breadcrumb-item"
          onClick={() => handleNavigate(-1)}
        >
          <Folder size={14} />
          Root
        </button>

        {pathSegments.map((segment, index) => (
          <div className="breadcrumb-part" key={`${segment}-${index}`}>
            <ChevronRight size={14} />

            <button
              type="button"
              className={
                index === pathSegments.length - 1
                  ? "breadcrumb-item active"
                  : "breadcrumb-item"
              }
              onClick={() => handleNavigate(index)}
            >
              {segment}
            </button>
          </div>
        ))}
      </div>

      {/* Explorer Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <Search size={17} />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files and folders..."
            aria-label="Search files and folders"
          />

          <SlidersHorizontal size={16} />
        </div>

        <div className="view-options">
          <button
            type="button"
            className={viewMode === "table" ? "active" : ""}
            onClick={() => setViewMode("table")}
            aria-label="Table view"
            title="Table view"
          >
            <List size={17} />
          </button>

          <button
            type="button"
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            title="Grid view"
          >
            <LayoutGrid size={17} />
          </button>
        </div>
      </div>

      {/* Main Explorer Layout */}
      <div className="explorer-layout">
        <aside className="directory-sidebar">
          <DirectoryTree
            {...(directories ? { data: directories } : {})}
            selectedPath={currentPath}
            onSelect={handleDirectorySelect}
          />
        </aside>

        <section className="files-section">
          <div className="files-heading">
            <div>
              <h3>Files and Folders</h3>
              <p>{visibleFiles.length} items found</p>
            </div>
          </div>

          <FileTable
            files={visibleFiles}
            onSelect={handleFileSelect}
            selectedFileId={selectedFile?.id}
            viewMode={viewMode}
          />
        </section>

        <aside className="details-sidebar">
          <FileDetails file={selectedFile} />

          <StorageChart
            used={186}
            total={512}
            unit="GB"
            title="Storage Usage"
          />
        </aside>
      </div>

      <style jsx>{`
        .file-explorer {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          min-width: 0;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-header h2 {
          margin: 0;
          color: #20283b;
          font-size: 22px;
          font-weight: 800;
        }

        .page-header p {
          margin: 6px 0 0;
          color: #9299aa;
          font-size: 12px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 38px;
          padding: 0 13px;
          border: none;
          border-radius: 11px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .action-button.secondary {
          color: #647089;
          background: #f4f5fb;
          box-shadow:
            4px 4px 8px rgba(163, 177, 198, 0.22),
            -4px -4px 8px rgba(255, 255, 255, 0.9);
        }

        .action-button.primary {
          color: #ffffff;
          background: #6366f1;
          box-shadow: 3px 3px 8px rgba(99, 102, 241, 0.25);
        }

        .action-button:hover {
          transform: translateY(-2px);
        }

        .breadcrumb-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          min-height: 48px;
          padding: 8px 14px;
          border-radius: 13px;
          background: #f4f5fb;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.15),
            inset -3px -3px 6px rgba(255, 255, 255, 0.8);
        }

        .breadcrumb-part {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b0b7c5;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px;
          border: none;
          background: transparent;
          color: #647089;
          cursor: pointer;
          font-size: 11px;
        }

        .breadcrumb-item.active {
          color: #6366f1;
          font-weight: 700;
        }

        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 420px;
          min-height: 42px;
          padding: 0 13px;
          color: #9299aa;
          border-radius: 12px;
          background: #f4f5fb;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.18),
            inset -3px -3px 6px rgba(255, 255, 255, 0.85);
        }

        .search-box input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #273147;
          font-family: inherit;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #a0a7b6;
        }

        .view-options {
          display: flex;
          gap: 5px;
          padding: 4px;
          border-radius: 11px;
          background: #f4f5fb;
          box-shadow:
            inset 2px 2px 5px rgba(163, 177, 198, 0.16),
            inset -2px -2px 5px rgba(255, 255, 255, 0.9);
        }

        .view-options button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 30px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #9299aa;
          cursor: pointer;
        }

        .view-options button.active {
          color: #6366f1;
          background: #e5e7ff;
        }

        .explorer-layout {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr) 260px;
          align-items: start;
          gap: 18px;
        }

        .directory-sidebar,
        .files-section,
        .details-sidebar {
          min-width: 0;
        }

        .files-section {
          padding: 20px;
          border-radius: 20px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.25),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .files-heading {
          margin-bottom: 18px;
        }

        .files-heading h3 {
          margin: 0;
          color: #20283b;
          font-size: 15px;
          font-weight: 700;
        }

        .files-heading p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 11px;
        }

        .details-sidebar {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        @media (max-width: 1200px) {
          .explorer-layout {
            grid-template-columns: 200px minmax(0, 1fr);
          }

          .details-sidebar {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .explorer-layout {
            grid-template-columns: minmax(0, 1fr);
          }

          .directory-sidebar {
            order: 1;
          }

          .files-section {
            order: 2;
          }

          .details-sidebar {
            order: 3;
            grid-template-columns: 1fr;
          }

          .header-actions {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .page-header h2 {
            font-size: 19px;
          }

          .action-button {
            padding: 0 10px;
          }

          .files-section {
            padding: 15px;
          }
        }
      `}</style>
    </main>
  );
}