import {
  File,
  Folder,
  FileText,
  Image,
  FileCode,
  FileArchive,
  CalendarDays,
  HardDrive,
  User,
  Shield,
  FolderOpen,
} from "lucide-react";

import type { FileItem } from "./FileTable";

interface FileDetailsProps {
  file: FileItem | null;
  title?: string;
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
      return Image;

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

export default function FileDetails({
  file,
  title = "File Details",
}: FileDetailsProps) {
  if (!file) {
    return (
      <section className="details-card">
        <div className="card-heading">
          <h3>{title}</h3>
        </div>

        <div className="empty-details">
          <div className="empty-icon">
            <FolderOpen size={28} />
          </div>
          <strong>No item selected</strong>
          <p>Select a file or folder to see its details.</p>
        </div>

        <style jsx>{`
          .details-card {
            width: 100%;
            min-height: 250px;
            padding: 20px;
            border-radius: 20px;
            background: #f4f5fb;
            box-shadow:
              7px 7px 16px rgba(163, 177, 198, 0.25),
              -7px -7px 16px rgba(255, 255, 255, 0.9);
          }

          .card-heading h3 {
            margin: 0;
            color: #20283b;
            font-size: 15px;
          }

          .empty-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 9px;
            min-height: 190px;
            text-align: center;
          }

          .empty-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 58px;
            height: 58px;
            color: #9299aa;
            border-radius: 18px;
            background: #e9ecf5;
          }

          .empty-details strong {
            color: #475569;
            font-size: 13px;
          }

          .empty-details p {
            margin: 0;
            color: #9299aa;
            font-size: 11px;
          }
        `}</style>
      </section>
    );
  }

  const Icon = getFileIcon(file);

  const details = [
    {
      label: "Type",
      value: file.type === "folder" ? "Folder" : file.extension || "File",
      icon: FileText,
    },
    {
      label: "Size",
      value: file.type === "folder" ? "—" : file.size,
      icon: HardDrive,
    },
    {
      label: "Modified",
      value: file.modified,
      icon: CalendarDays,
    },
    {
      label: "Owner",
      value: file.owner,
      icon: User,
    },
    {
      label: "Permissions",
      value: file.permissions,
      icon: Shield,
    },
    {
      label: "Location",
      value: file.path,
      icon: Folder,
    },
  ];

  return (
    <section className="details-card">
      <div className="card-heading">
        <h3>{title}</h3>
      </div>

      <div className="file-preview">
        <div
          className={`preview-icon ${file.type === "folder" ? "folder" : ""}`}
        >
          <Icon size={34} />
        </div>

        <div className="file-name">
          <strong title={file.name}>{file.name}</strong>
          <span>{file.type === "folder" ? "Directory" : "File"}</span>
        </div>
      </div>

      <div className="details-list">
        {details.map((item) => {
          const DetailIcon = item.icon;

          return (
            <div className="detail-row" key={item.label}>
              <div className="detail-label">
                <DetailIcon size={14} />
                <span>{item.label}</span>
              </div>

              <strong title={item.value}>{item.value}</strong>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .details-card {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.25),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-heading h3 {
          margin: 0;
          color: #20283b;
          font-size: 15px;
          font-weight: 700;
        }

        .file-preview {
          display: flex;
          align-items: center;
          gap: 13px;
          margin: 22px 0;
          padding: 15px;
          border-radius: 15px;
          background: #edf0f7;
        }

        .preview-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 15px;
          background: #e3e5ff;
        }

        .preview-icon.folder {
          color: #d99a32;
          background: #fff1d5;
        }

        .file-name {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .file-name strong {
          overflow: hidden;
          color: #273147;
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-name span {
          color: #9299aa;
          font-size: 10px;
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .detail-label {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          color: #9299aa;
          font-size: 11px;
        }

        .detail-row strong {
          overflow: hidden;
          max-width: 58%;
          color: #475569;
          font-size: 11px;
          font-weight: 600;
          text-align: right;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}