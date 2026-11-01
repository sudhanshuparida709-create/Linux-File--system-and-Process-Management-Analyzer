"use client";

import {
  File,
  Folder,
  FileText,
  FileImage,
  FileCode,
  FileArchive,
  MoreVertical,
  Download,
} from "lucide-react";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size: string;
  modified: string;
  owner: string;
  permissions: string;
  path: string;
  extension?: string;
}

interface FileTableProps {
  files: FileItem[];
  onSelect?: (file: FileItem) => void;
  selectedFileId?: string;
  viewMode?: "table" | "grid";
  onDownload?: (file: FileItem) => void;
}

function getFileIcon(file: FileItem) {
  if (file.type === "folder") {
    return Folder;
  }

  const extension = file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "webp":
      return FileImage;

    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "html":
    case "css":
    case "json":
    case "py":
      return FileCode;

    case "zip":
    case "rar":
    case "tar":
    case "gz":
      return FileArchive;

    case "txt":
    case "md":
    case "pdf":
    case "doc":
    case "docx":
      return FileText;

    default:
      return File;
  }
}

export default function FileTable({
  files,
  onSelect,
  selectedFileId,
  viewMode = "table",
  onDownload,
}: FileTableProps) {
  const handleDownload = (
    event: React.MouseEvent<HTMLButtonElement>,
    file: FileItem,
  ) => {
    event.stopPropagation();
    onDownload?.(file);
  };

  if (viewMode === "grid") {
    return (
      <section className="file-grid">
        {files.length > 0 ? (
          files.map((file) => {
            const Icon = getFileIcon(file);

            return (
              <button
                type="button"
                key={file.id}
                className={`grid-item ${
                  selectedFileId === file.id ? "selected" : ""
                }`}
                onClick={() => onSelect?.(file)}
              >
                <div
                  className={`grid-icon ${
                    file.type === "folder" ? "folder" : ""
                  }`}
                >
                  <Icon size={30} />
                </div>

                <strong title={file.name}>{file.name}</strong>
                <span>{file.type === "folder" ? "Folder" : file.size}</span>
              </button>
            );
          })
        ) : (
          <div className="empty-state">
            No files or folders found.
          </div>
        )}

        <style jsx>{`
          .file-grid {
            display: grid;
            grid-template-columns: repeat(
              auto-fill,
              minmax(115px, 1fr)
            );
            gap: 12px;
          }

          .grid-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 9px;
            min-width: 0;
            padding: 17px 10px;
            border: 1px solid transparent;
            border-radius: 15px;
            background: #edf0f7;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .grid-item:hover {
            background: #e7eaff;
          }

          .grid-item.selected {
            border-color: #a5a8ff;
            background: #e6e8ff;
          }

          .grid-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            color: #6366f1;
            border-radius: 15px;
            background: #e1e5ff;
          }

          .grid-icon.folder {
            color: #df9d33;
            background: #fff0d0;
          }

          .grid-item strong {
            overflow: hidden;
            width: 100%;
            color: #273147;
            font-size: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }

          .grid-item span {
            color: #9299aa;
            font-size: 10px;
          }

          .empty-state {
            grid-column: 1 / -1;
            padding: 35px 10px;
            color: #9299aa;
            text-align: center;
            font-size: 12px;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="table-container">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Modified</th>
              <th>Owner</th>
              <th>Permissions</th>
              <th aria-label="Actions" />
            </tr>
          </thead>

          <tbody>
            {files.length > 0 ? (
              files.map((file) => {
                const Icon = getFileIcon(file);

                return (
                  <tr
                    key={file.id}
                    className={
                      selectedFileId === file.id ? "selected-row" : ""
                    }
                    onClick={() => onSelect?.(file)}
                  >
                    <td>
                      <div className="file-name">
                        <div
                          className={`file-icon ${
                            file.type === "folder" ? "folder" : ""
                          }`}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="name-content">
                          <strong title={file.name}>
                            {file.name}
                          </strong>
                          <span>
                            {file.type === "folder"
                              ? "Folder"
                              : file.extension || "File"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="muted-cell">{file.size}</td>
                    <td className="muted-cell">{file.modified}</td>
                    <td className="muted-cell">{file.owner}</td>

                    <td>
                      <span className="permission-badge">
                        {file.permissions}
                      </span>
                    </td>

                    <td>
                      <div className="row-actions">
                        {file.type === "file" && onDownload && (
                          <button
                            type="button"
                            className="icon-button"
                            aria-label={`Download ${file.name}`}
                            title="Download"
                            onClick={(event) =>
                              handleDownload(event, file)
                            }
                          >
                            <Download size={14} />
                          </button>
                        )}

                        <button
                          type="button"
                          className="icon-button"
                          aria-label={`More options for ${file.name}`}
                          title="More options"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="empty-state">
                  No files or folders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          width: 100%;
          min-width: 0;
        }

        .table-scroll {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 620px;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 12px 10px;
          color: #9299aa;
          border-bottom: 1px solid #e2e6ef;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          white-space: nowrap;
        }

        td {
          padding: 13px 10px;
          border-bottom: 1px solid #e9ecf3;
          font-size: 11px;
        }

        tbody tr {
          cursor: pointer;
          transition: background 0.15s ease;
        }

        tbody tr:hover {
          background: #edf0fa;
        }

        tbody tr.selected-row {
          background: #e8eaff;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .file-name {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 130px;
        }

        .file-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 10px;
          background: #e6e8ff;
        }

        .file-icon.folder {
          color: #df9d33;
          background: #fff0d0;
        }

        .name-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .name-content strong {
          overflow: hidden;
          color: #273147;
          font-size: 11px;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .name-content span {
          color: #9299aa;
          font-size: 9px;
        }

        .muted-cell {
          color: #647089;
          white-space: nowrap;
        }

        .permission-badge {
          display: inline-block;
          padding: 5px 7px;
          color: #647089;
          border-radius: 7px;
          background: #e9edf5;
          font-family: monospace;
          font-size: 10px;
          white-space: nowrap;
        }

        .row-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
        }

        .icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #9299aa;
          cursor: pointer;
        }

        .icon-button:hover {
          background: #e1e5f0;
          color: #6366f1;
        }

        .empty-state {
          padding: 35px 10px;
          color: #9299aa;
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </section>
  );
}