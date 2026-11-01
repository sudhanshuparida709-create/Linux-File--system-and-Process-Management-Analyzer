"use client";

import { useMemo, useState } from "react";

type FileItem = {
  id: number;
  name: string;
  type: "folder" | "file";
  size: string;
  modified: string;
  owner: string;
  permissions: string;
  extension?: string;
};

const initialFiles: Record<string, FileItem[]> = {
  "/": [
    { id: 1, name: "home", type: "folder", size: "4.2 GB", modified: "Today, 09:12 AM", owner: "root", permissions: "rwxr-xr-x" },
    { id: 2, name: "etc", type: "folder", size: "128 MB", modified: "Today, 08:45 AM", owner: "root", permissions: "rwxr-xr-x" },
    { id: 3, name: "var", type: "folder", size: "2.8 GB", modified: "Yesterday", owner: "root", permissions: "rwxr-xr-x" },
    { id: 4, name: "usr", type: "folder", size: "8.6 GB", modified: "Oct 29, 2026", owner: "root", permissions: "rwxr-xr-x" },
    { id: 5, name: "tmp", type: "folder", size: "24 MB", modified: "Today, 08:30 AM", owner: "root", permissions: "rwxrwxrwt" },
    { id: 6, name: "bin", type: "folder", size: "86 MB", modified: "Oct 28, 2026", owner: "root", permissions: "rwxr-xr-x" },
    { id: 7, name: "boot", type: "folder", size: "512 MB", modified: "Oct 20, 2026", owner: "root", permissions: "rwxr-xr-x" },
    { id: 8, name: "dev", type: "folder", size: "0 B", modified: "Today, 09:18 AM", owner: "root", permissions: "rwxr-xr-x" },
    { id: 9, name: "README.md", type: "file", size: "4.2 KB", modified: "Today, 09:00 AM", owner: "admin", permissions: "rw-r--r--", extension: "md" },
    { id: 10, name: "system.log", type: "file", size: "12.8 MB", modified: "Today, 09:18 AM", owner: "root", permissions: "rw-r-----", extension: "log" },
  ],

  "/home": [
    { id: 11, name: "admin", type: "folder", size: "2.1 GB", modified: "Today, 09:12 AM", owner: "admin", permissions: "rwx------" },
    { id: 12, name: "apple", type: "folder", size: "1.8 GB", modified: "Yesterday", owner: "apple", permissions: "rwx------" },
    { id: 13, name: "shared", type: "folder", size: "312 MB", modified: "Oct 29, 2026", owner: "admin", permissions: "rwxrwxr-x" },
    { id: 14, name: "notes.txt", type: "file", size: "8 KB", modified: "Today, 08:45 AM", owner: "admin", permissions: "rw-r--r--", extension: "txt" },
  ],

  "/home/admin": [
    { id: 15, name: "Documents", type: "folder", size: "850 MB", modified: "Today, 09:12 AM", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 16, name: "Downloads", type: "folder", size: "920 MB", modified: "Today, 08:30 AM", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 17, name: "Projects", type: "folder", size: "320 MB", modified: "Yesterday", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 18, name: "Pictures", type: "folder", size: "64 MB", modified: "Oct 28, 2026", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 19, name: "config.json", type: "file", size: "2.4 KB", modified: "Today, 09:02 AM", owner: "admin", permissions: "rw-r--r--", extension: "json" },
    { id: 20, name: "backup.tar.gz", type: "file", size: "128 MB", modified: "Yesterday", owner: "admin", permissions: "rw-------", extension: "gz" },
  ],

  "/home/admin/Documents": [
    { id: 21, name: "Reports", type: "folder", size: "120 MB", modified: "Today, 08:50 AM", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 22, name: "Work", type: "folder", size: "240 MB", modified: "Yesterday", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 23, name: "project-plan.pdf", type: "file", size: "2.5 MB", modified: "Today, 08:15 AM", owner: "admin", permissions: "rw-r--r--", extension: "pdf" },
    { id: 24, name: "meeting-notes.docx", type: "file", size: "84 KB", modified: "Oct 29, 2026", owner: "admin", permissions: "rw-r--r--", extension: "docx" },
    { id: 25, name: "system-analysis.xlsx", type: "file", size: "1.2 MB", modified: "Oct 27, 2026", owner: "admin", permissions: "rw-r--r--", extension: "xlsx" },
  ],

  "/home/admin/Downloads": [
    { id: 26, name: "Installers", type: "folder", size: "340 MB", modified: "Yesterday", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 27, name: "linux.iso", type: "file", size: "2.4 GB", modified: "Today, 08:20 AM", owner: "admin", permissions: "rw-r--r--", extension: "iso" },
    { id: 28, name: "archive.zip", type: "file", size: "84 MB", modified: "Oct 28, 2026", owner: "admin", permissions: "rw-r--r--", extension: "zip" },
  ],

  "/home/admin/Projects": [
    { id: 29, name: "frontend", type: "folder", size: "150 MB", modified: "Today, 09:10 AM", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 30, name: "backend", type: "folder", size: "120 MB", modified: "Yesterday", owner: "admin", permissions: "rwxr-xr-x" },
    { id: 31, name: "README.md", type: "file", size: "6 KB", modified: "Today, 09:00 AM", owner: "admin", permissions: "rw-r--r--", extension: "md" },
  ],

  "/var": [
    { id: 32, name: "log", type: "folder", size: "1.2 GB", modified: "Today, 09:18 AM", owner: "root", permissions: "rwxr-xr-x" },
    { id: 33, name: "cache", type: "folder", size: "820 MB", modified: "Today, 08:50 AM", owner: "root", permissions: "rwxr-xr-x" },
    { id: 34, name: "tmp", type: "folder", size: "120 MB", modified: "Today, 08:40 AM", owner: "root", permissions: "rwxrwxrwt" },
    { id: 35, name: "system.log", type: "file", size: "18 MB", modified: "Today, 09:18 AM", owner: "root", permissions: "rw-r-----", extension: "log" },
  ],

  "/etc": [
    { id: 36, name: "systemd", type: "folder", size: "24 MB", modified: "Today, 08:45 AM", owner: "root", permissions: "rwxr-xr-x" },
    { id: 37, name: "ssh", type: "folder", size: "8 MB", modified: "Yesterday", owner: "root", permissions: "rwx------" },
    { id: 38, name: "hosts", type: "file", size: "1.2 KB", modified: "Oct 29, 2026", owner: "root", permissions: "rw-r--r--", extension: "file" },
    { id: 39, name: "fstab", type: "file", size: "2.1 KB", modified: "Oct 25, 2026", owner: "root", permissions: "rw-r--r--", extension: "file" },
  ],
};

const sidebarDirectories = [
  { name: "Home", path: "/home", icon: "⌂" },
  { name: "Documents", path: "/home/admin/Documents", icon: "▤" },
  { name: "Downloads", path: "/home/admin/Downloads", icon: "⇩" },
  { name: "Projects", path: "/home/admin/Projects", icon: "▣" },
  { name: "System", path: "/", icon: "⚙" },
  { name: "Logs", path: "/var", icon: "≋" },
  { name: "Configuration", path: "/etc", icon: "⚙" },
];

function formatPath(path: string) {
  return path.split("/").filter(Boolean);
}

function getFileIcon(file: FileItem) {
  if (file.type === "folder") return "▰";

  const icons: Record<string, string> = {
    pdf: "▧",
    docx: "▤",
    txt: "≡",
    md: "◇",
    json: "{ }",
    log: "≋",
    zip: "▧",
    gz: "▧",
    iso: "◉",
    xlsx: "▦",
  };

  return icons[file.extension || ""] || "▤";
}

function getFileColor(file: FileItem) {
  if (file.type === "folder") return "file-folder";

  const colors: Record<string, string> = {
    pdf: "file-pdf",
    docx: "file-doc",
    txt: "file-text",
    md: "file-markdown",
    json: "file-json",
    log: "file-log",
    zip: "file-archive",
    gz: "file-archive",
    iso: "file-archive",
    xlsx: "file-sheet",
  };

  return colors[file.extension || ""] || "file-text";
}

export default function FileSystemPage() {
  const [currentPath, setCurrentPath] = useState("/");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [sortBy, setSortBy] = useState("name");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState(initialFiles);
  const [uploadName, setUploadName] = useState("");

  const currentFiles = useMemo(() => {
    const directory = files[currentPath] || [];

    return directory
      .filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "size") {
          return (
            Number.parseFloat(a.size) - Number.parseFloat(b.size)
          );
        }
        if (sortBy === "type") return a.type.localeCompare(b.type);
        return 0;
      });
  }, [files, currentPath, search, sortBy]);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setSelectedFile(null);
    setSearch("");
  };

  const openFile = (file: FileItem) => {
    if (file.type === "folder") {
      const nextPath =
        currentPath === "/"
          ? `/${file.name}`
          : `${currentPath}/${file.name}`;

      navigateTo(nextPath);
    } else {
      setSelectedFile(file);
    }
  };

  const createFolder = () => {
    const name = folderName.trim();

    if (!name) return;

    if (name.includes("/") || name === "." || name === "..") {
      alert("Please enter a valid folder name.");
      return;
    }

    const directory = files[currentPath] || [];

    if (directory.some((item) => item.name === name)) {
      alert("A file or folder with this name already exists.");
      return;
    }

    const newFolder: FileItem = {
      id: Date.now(),
      name,
      type: "folder",
      size: "0 B",
      modified: "Just now",
      owner: "admin",
      permissions: "rwxr-xr-x",
    };

    setFiles((previous) => ({
      ...previous,
      [currentPath]: [...(previous[currentPath] || []), newFolder],
    }));

    setFolderName("");
    setShowCreateFolder(false);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const parts = file.name.split(".");
    const extension = parts.length > 1 ? parts.pop() : "";

    const newFile: FileItem = {
      id: Date.now(),
      name: file.name,
      type: "file",
      size:
        file.size >= 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
          : `${(file.size / 1024).toFixed(1)} KB`,
      modified: "Just now",
      owner: "admin",
      permissions: "rw-r--r--",
      extension: extension?.toLowerCase(),
    };

    setFiles((previous) => ({
      ...previous,
      [currentPath]: [...(previous[currentPath] || []), newFile],
    }));

    setUploadName(file.name);
    event.target.value = "";
  };

  const deleteFile = (file: FileItem) => {
    const confirmed = window.confirm(
      `Delete "${file.name}" from this view?`
    );

    if (!confirmed) return;

    setFiles((previous) => ({
      ...previous,
      [currentPath]: (previous[currentPath] || []).filter(
        (item) => item.id !== file.id
      ),
    }));

    setSelectedFile(null);
  };

  const breadcrumbs = formatPath(currentPath);

  return (
    <>
      {/* Header */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / Storage</div>

          <h1 className="page-title">File System</h1>

          <p className="page-subtitle">
            Explore directories, manage files, and inspect storage information.
          </p>
        </div>

        <div className="heading-actions">
          <label className="soft-btn upload-btn">
            ⇧ Upload File
            <input
              type="file"
              hidden
              onChange={handleUpload}
            />
          </label>

          <button
            className="primary-btn"
            onClick={() => setShowCreateFolder(true)}
          >
            + New Folder
          </button>
        </div>
      </section>

      {/* Storage Cards */}
      <section className="stat-grid">
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Total Storage</span>
            <span className="stat-icon tint-teal">▣</span>
          </div>
          <div className="stat-value">512 GB</div>
          <div className="stat-foot">Available disk capacity</div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Used Space</span>
            <span className="stat-icon tint-violet">▤</span>
          </div>
          <div className="stat-value">238 GB</div>
          <div className="stat-foot">46.5% of total storage</div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Free Space</span>
            <span className="stat-icon tint-orange">⇩</span>
          </div>
          <div className="stat-value">274 GB</div>
          <div className="stat-foot">53.5% available</div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Total Items</span>
            <span className="stat-icon tint-blue">▦</span>
          </div>
          <div className="stat-value">
            {Object.values(files).reduce(
              (total, items) => total + items.length,
              0
            )}
          </div>
          <div className="stat-foot">Across displayed directories</div>
        </article>
      </section>

      {/* Storage Usage */}
      <section className="panel storage-summary">
        <div className="section-head">
          <div>
            <h2 className="panel-title">Storage Overview</h2>
            <p className="panel-note">
              Current disk space distribution
            </p>
          </div>

          <span className="pill pill-success">
            ● Healthy
          </span>
        </div>

        <div className="storage-bar">
          <div className="storage-segment storage-system" />
          <div className="storage-segment storage-personal" />
          <div className="storage-segment storage-cache" />
          <div className="storage-segment storage-other" />
        </div>

        <div className="storage-legend">
          <span>
            <i className="legend-dot legend-cpu" />
            System <strong>86 GB</strong>
          </span>

          <span>
            <i className="legend-dot legend-memory" />
            Personal <strong>92 GB</strong>
          </span>

          <span>
            <i className="legend-dot legend-orange" />
            Cache <strong>38 GB</strong>
          </span>

          <span>
            <i className="legend-dot legend-blue" />
            Other <strong>22 GB</strong>
          </span>
        </div>
      </section>

      {/* File Explorer */}
      <section className="filesystem-layout">
        {/* Directory Sidebar */}
        <aside className="panel directory-panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Directories</h2>
              <p className="panel-note">Browse locations</p>
            </div>

            <span className="directory-menu">•••</span>
          </div>

          <button
            className={`directory-link ${
              currentPath === "/" ? "active" : ""
            }`}
            onClick={() => navigateTo("/")}
          >
            <span className="directory-icon">⌂</span>
            <span>Root Directory</span>
            <span className="directory-arrow">›</span>
          </button>

          <div className="directory-group-label">
            QUICK ACCESS
          </div>

          {sidebarDirectories.map((directory) => (
            <button
              key={directory.path}
              className={`directory-link ${
                currentPath === directory.path ? "active" : ""
              }`}
              onClick={() => navigateTo(directory.path)}
            >
              <span className="directory-icon">
                {directory.icon}
              </span>

              <span>{directory.name}</span>

              <span className="directory-arrow">›</span>
            </button>
          ))}

          <div className="directory-bottom">
            <div className="directory-bottom-icon">▣</div>

            <strong>Disk Health</strong>

            <p>Storage is operating normally.</p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: "46.5%" }}
              />
            </div>

            <small>46.5% used</small>
          </div>
        </aside>

        {/* Main Explorer */}
        <main className="panel explorer-panel">
          {/* Explorer Toolbar */}
          <div className="section-head explorer-header">
            <div>
              <h2 className="panel-title">File Explorer</h2>
              <p className="panel-note">
                Browse and manage your directories
              </p>
            </div>

            <div className="view-toggle">
              <button
                className={viewMode === "list" ? "selected" : ""}
                onClick={() => setViewMode("list")}
                aria-label="List view"
                title="List view"
              >
                ☰
              </button>

              <button
                className={viewMode === "grid" ? "selected" : ""}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                title="Grid view"
              >
                ▦
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <button onClick={() => navigateTo("/")}>
              ⌂ Root
            </button>

            {breadcrumbs.map((part, index) => {
              const path =
                "/" + breadcrumbs.slice(0, index + 1).join("/");

              return (
                <span
                  className="breadcrumb-part"
                  key={path}
                >
                  <span className="breadcrumb-separator">/</span>

                  <button
                    onClick={() => navigateTo(path)}
                    className={
                      index === breadcrumbs.length - 1
                        ? "breadcrumb-current"
                        : ""
                    }
                  >
                    {part}
                  </button>
                </span>
              );
            })}
          </div>

          {/* Search Toolbar */}
          <div className="explorer-toolbar">
            <div className="explorer-search">
              <span>⌕</span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search files and folders..."
                aria-label="Search files"
              />
            </div>

            <select
              className="input-field sort-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort files"
            >
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>

          {/* New Folder Form */}
          {showCreateFolder && (
            <div className="create-folder-form">
              <div>
                <strong>Create New Folder</strong>
                <p>Enter a name for your new directory.</p>
              </div>

              <input
                className="input-field"
                value={folderName}
                onChange={(event) =>
                  setFolderName(event.target.value)
                }
                placeholder="Folder name"
                autoFocus
                onKeyDown={(event) => {
                  if (event.key === "Enter") createFolder();
                  if (event.key === "Escape") setShowCreateFolder(false);
                }}
              />

              <button
                className="primary-btn"
                onClick={createFolder}
              >
                Create
              </button>

              <button
                className="soft-btn"
                onClick={() => {
                  setShowCreateFolder(false);
                  setFolderName("");
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {uploadName && (
            <div className="upload-notice">
              ✓ {uploadName} added to the current view.
              <button onClick={() => setUploadName("")}>×</button>
            </div>
          )}

          {/* File List */}
          {viewMode === "list" ? (
            <div className="table-wrapper explorer-table-wrapper">
              <table className="data-table file-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Modified</th>
                    <th>Owner</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentFiles.map((file) => (
                    <tr
                      key={file.id}
                      className={
                        selectedFile?.id === file.id
                          ? "selected-file-row"
                          : ""
                      }
                      onClick={() => setSelectedFile(file)}
                    >
                      <td>
                        <button
                          className="file-name-button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openFile(file);
                          }}
                        >
                          <span
                            className={`file-icon ${getFileColor(file)}`}
                          >
                            {getFileIcon(file)}
                          </span>

                          <strong>{file.name}</strong>
                        </button>
                      </td>

                      <td>{file.size}</td>

                      <td>{file.modified}</td>

                      <td>{file.owner}</td>

                      <td>
                        <code className="permission-code">
                          {file.permissions}
                        </code>
                      </td>

                      <td>
                        <div className="file-actions">
                          <button
                            title="Open"
                            aria-label={`Open ${file.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              openFile(file);
                            }}
                          >
                            ↗
                          </button>

                          <button
                            title="Delete from current view"
                            aria-label={`Delete ${file.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteFile(file);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="file-grid">
              {currentFiles.map((file) => (
                <button
                  className={`file-grid-item ${
                    selectedFile?.id === file.id
                      ? "selected"
                      : ""
                  }`}
                  key={file.id}
                  onClick={() => {
                    if (file.type === "folder") {
                      openFile(file);
                    } else {
                      setSelectedFile(file);
                    }
                  }}
                  onDoubleClick={() => openFile(file)}
                >
                  <span
                    className={`file-grid-icon ${getFileColor(file)}`}
                  >
                    {getFileIcon(file)}
                  </span>

                  <strong>{file.name}</strong>

                  <small>{file.size}</small>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {currentFiles.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">▤</div>

              <h3>No files found</h3>

              <p>
                Try another search term or explore a different directory.
              </p>

              <button
                className="soft-btn"
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Explorer Footer */}
          <div className="explorer-footer">
            <span>
              {currentFiles.length} items
            </span>

            <span>
              Location: {currentPath}
            </span>
          </div>
        </main>

        {/* Details Sidebar */}
        <aside className="panel file-details-panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">File Details</h2>
              <p className="panel-note">Selected item information</p>
            </div>
          </div>

          {selectedFile ? (
            <div className="file-details-content">
              <div
                className={`file-preview-icon ${getFileColor(
                  selectedFile
                )}`}
              >
                {getFileIcon(selectedFile)}
              </div>

              <h3>{selectedFile.name}</h3>

              <span className="pill">
                {selectedFile.type.toUpperCase()}
              </span>

              <div className="detail-divider" />

              <div className="detail-row">
                <span>File Size</span>
                <strong>{selectedFile.size}</strong>
              </div>

              <div className="detail-row">
                <span>Owner</span>
                <strong>{selectedFile.owner}</strong>
              </div>

              <div className="detail-row">
                <span>Modified</span>
                <strong>{selectedFile.modified}</strong>
              </div>

              <div className="detail-row">
                <span>Permissions</span>
                <code>{selectedFile.permissions}</code>
              </div>

              <div className="detail-divider" />

              {selectedFile.type === "folder" && (
                <button
                  className="primary-btn detail-action"
                  onClick={() => openFile(selectedFile)}
                >
                  Open Directory →
                </button>
              )}

              <button
                className="soft-btn detail-action"
                onClick={() => setSelectedFile(null)}
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="details-empty">
              <div className="details-empty-icon">▤</div>

              <strong>No Item Selected</strong>

              <p>
                Select a file or folder to view its details and
                permissions.
              </p>
            </div>
          )}

          <div className="permissions-card">
            <div className="permissions-heading">
              <span>⌑</span>
              <strong>File Permissions</strong>
            </div>

            <p>
              Linux uses read, write, and execute permissions to
              control access to files and directories.
            </p>

            <div className="permission-examples">
              <span>Read <strong>r</strong></span>
              <span>Write <strong>w</strong></span>
              <span>Execute <strong>x</strong></span>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}