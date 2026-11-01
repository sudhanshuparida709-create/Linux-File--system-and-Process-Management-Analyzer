"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  HardDrive,
} from "lucide-react";

export interface DirectoryNode {
  id: string;
  name: string;
  path: string;
  children?: DirectoryNode[];
}

interface DirectoryTreeProps {
  data?: DirectoryNode[];
  selectedPath?: string;
  onSelect?: (directory: DirectoryNode) => void;
  title?: string;
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

interface TreeItemProps {
  node: DirectoryNode;
  level: number;
  selectedPath: string;
  onSelect: (node: DirectoryNode) => void;
}

function TreeItem({
  node,
  level,
  selectedPath,
  onSelect,
}: TreeItemProps) {
  const hasChildren = Boolean(node.children?.length);

  const [expanded, setExpanded] = useState(
    level === 0 || node.path === "/home",
  );

  const selected = selectedPath === node.path;

  const handleClick = () => {
    onSelect(node);

    if (hasChildren) {
      setExpanded((previous) => !previous);
    }
  };

  return (
    <div className="tree-item">
      <button
        type="button"
        className={`tree-row ${selected ? "selected" : ""}`}
        style={{ paddingLeft: `${12 + level * 17}px` }}
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-current={selected ? "location" : undefined}
      >
        <span className="expand-icon">
          {hasChildren ? (
            expanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span className="empty-chevron" />
          )}
        </span>

        <span className="folder-icon">
          {level === 0 ? (
            <HardDrive size={16} />
          ) : expanded ? (
            <FolderOpen size={16} />
          ) : (
            <Folder size={16} />
          )}
        </span>

        <span className="folder-name">{node.name}</span>
      </button>

      {hasChildren && expanded && (
        <div className="tree-children">
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .tree-item {
          width: 100%;
        }

        .tree-row {
          display: flex;
          align-items: center;
          gap: 7px;
          width: 100%;
          min-height: 36px;
          padding-top: 7px;
          padding-right: 10px;
          padding-bottom: 7px;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: #647089;
          text-align: left;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .tree-row:hover {
          background: #e9ecf5;
          color: #6366f1;
        }

        .tree-row.selected {
          background: #e6e8ff;
          color: #5558df;
          font-weight: 700;
          box-shadow: inset 3px 0 #6366f1;
        }

        .expand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          flex-shrink: 0;
          color: #9299aa;
        }

        .empty-chevron {
          display: block;
          width: 14px;
        }

        .folder-icon {
          display: flex;
          align-items: center;
          color: #e5a33d;
        }

        .folder-name {
          overflow: hidden;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

export default function DirectoryTree({
  data = defaultDirectories,
  selectedPath = "/home/user",
  onSelect,
  title = "Directories",
}: DirectoryTreeProps) {
  const [currentPath, setCurrentPath] = useState(selectedPath);

  const handleSelect = (directory: DirectoryNode) => {
    setCurrentPath(directory.path);
    onSelect?.(directory);
  };

  return (
    <section className="directory-card">
      <div className="card-heading">
        <div>
          <h3>{title}</h3>
          <p>Browse directory structure</p>
        </div>
      </div>

      <div className="tree-container">
        {data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            selectedPath={currentPath}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="selected-directory">
        <span>Selected location</span>
        <strong title={currentPath}>{currentPath}</strong>
      </div>

      <style jsx>{`
        .directory-card {
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

        .card-heading p {
          margin: 5px 0 16px;
          color: #9299aa;
          font-size: 11px;
        }

        .tree-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-height: 420px;
          overflow-y: auto;
        }

        .selected-directory {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 18px;
          padding: 12px;
          border-radius: 12px;
          background: #e9ecf5;
        }

        .selected-directory span {
          color: #9299aa;
          font-size: 10px;
        }

        .selected-directory strong {
          overflow: hidden;
          color: #6366f1;
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tree-container::-webkit-scrollbar {
          width: 5px;
        }

        .tree-container::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background: #cbd5e1;
        }
      `}</style>
    </section>
  );
}