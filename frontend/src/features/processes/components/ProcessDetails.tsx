"use client";

import {
  Activity,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Pause,
  Play,
  Shield,
  Terminal,
  User,
  XCircle,
} from "lucide-react";

import type { ProcessInfo } from "./ProcessTable";

interface ProcessDetailsProps {
  process: ProcessInfo | null;
  onTerminate?: (process: ProcessInfo) => void;
  onPause?: (process: ProcessInfo) => void;
  onResume?: (process: ProcessInfo) => void;
  title?: string;
}

export default function ProcessDetails({
  process,
  onTerminate,
  onPause,
  onResume,
  title = "Process Details",
}: ProcessDetailsProps) {
  if (!process) {
    return (
      <section className="details-card">
        <h3>{title}</h3>

        <div className="empty-state">
          <div className="empty-icon">
            <Activity size={28} />
          </div>

          <strong>No process selected</strong>
          <p>Select a process to view its details.</p>
        </div>

        <style jsx>{`
          .details-card {
            width: 100%;
            min-height: 300px;
            padding: 20px;
            border-radius: 20px;
            background: #f4f5fb;
            box-shadow:
              7px 7px 16px rgba(163, 177, 198, 0.25),
              -7px -7px 16px rgba(255, 255, 255, 0.9);
          }

          h3 {
            margin: 0;
            color: #20283b;
            font-size: 15px;
            font-weight: 700;
          }

          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 9px;
            min-height: 230px;
            text-align: center;
          }

          .empty-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            color: #9299aa;
            border-radius: 18px;
            background: #e9ecf5;
          }

          .empty-state strong {
            color: #475569;
            font-size: 13px;
          }

          .empty-state p {
            margin: 0;
            color: #9299aa;
            font-size: 11px;
          }
        `}</style>
      </section>
    );
  }

  const isRunning = process.state === "running";
  const canResume =
    process.state === "stopped" || process.state === "sleeping";

  const details = [
    {
      label: "Process ID",
      value: String(process.pid),
      icon: Activity,
    },
    {
      label: "User",
      value: process.user,
      icon: User,
    },
    {
      label: "CPU Usage",
      value: `${process.cpu.toFixed(2)}%`,
      icon: Cpu,
    },
    {
      label: "Memory Usage",
      value: `${process.memory.toFixed(2)} MB`,
      icon: MemoryStick,
    },
    {
      label: "Priority",
      value: process.priority ?? "Not available",
      icon: Shield,
    },
    {
      label: "Threads",
      value: process.threads ?? "Not available",
      icon: HardDrive,
    },
    {
      label: "Started",
      value: process.started ?? "Not available",
      icon: Clock,
    },
    {
      label: "Parent PID",
      value: process.parentPid ?? "Not available",
      icon: Activity,
    },
  ];

  return (
    <section className="details-card">
      <div className="card-heading">
        <div>
          <h3>{title}</h3>
          <p>Detailed process information</p>
        </div>

        <span className={`status ${process.state}`}>
          <span className="status-dot" />
          {process.state}
        </span>
      </div>

      <div className="process-preview">
        <div className="process-icon">
          <Terminal size={25} />
        </div>

        <div className="process-name">
          <strong title={process.name}>{process.name}</strong>
          <span>PID: {process.pid}</span>
        </div>
      </div>

      <div className="details-list">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div className="detail-row" key={item.label}>
              <div className="detail-label">
                <Icon size={14} />
                <span>{item.label}</span>
              </div>

              <strong>{item.value}</strong>
            </div>
          );
        })}
      </div>

      {process.command && (
        <div className="command-section">
          <span>Command</span>
          <code>{process.command}</code>
        </div>
      )}

      <div className="action-section">
        {isRunning && (
          <button
            type="button"
            className="action-button pause"
            onClick={() => onPause?.(process)}
            disabled={!onPause}
          >
            <Pause size={15} />
            Pause
          </button>
        )}

        {canResume && (
          <button
            type="button"
            className="action-button resume"
            onClick={() => onResume?.(process)}
            disabled={!onResume}
          >
            <Play size={15} />
            Resume
          </button>
        )}

        {process.state !== "stopped" &&
          process.state !== "zombie" && (
            <button
              type="button"
              className="action-button terminate"
              onClick={() => onTerminate?.(process)}
              disabled={!onTerminate}
            >
              <XCircle size={15} />
              Terminate
            </button>
          )}
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

        .card-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        h3 {
          margin: 0;
          color: #20283b;
          font-size: 15px;
          font-weight: 700;
        }

        .card-heading p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 10px;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .status.running {
          color: #0d9488;
          background: #d9f5ef;
        }

        .status.sleeping {
          color: #ca8a04;
          background: #fef3c7;
        }

        .status.stopped,
        .status.zombie {
          color: #dc2626;
          background: #fee2e2;
        }

        .status.idle {
          color: #64748b;
          background: #e9edf5;
        }

        .process-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
          padding: 14px;
          border-radius: 14px;
          background: #edf0f7;
        }

        .process-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 13px;
          background: #e3e5ff;
        }

        .process-name {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .process-name strong {
          overflow: hidden;
          color: #273147;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .process-name span {
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
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .detail-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #9299aa;
          font-size: 11px;
        }

        .detail-row strong {
          overflow-wrap: anywhere;
          color: #475569;
          font-size: 11px;
          font-weight: 600;
          text-align: right;
        }

        .command-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 20px;
          padding: 12px;
          border-radius: 12px;
          background: #e9ecf5;
        }

        .command-section span {
          color: #9299aa;
          font-size: 10px;
        }

        .command-section code {
          overflow-wrap: anywhere;
          color: #475569;
          font-size: 10px;
        }

        .action-section {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid #e3e7ef;
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 35px;
          padding: 0 11px;
          border: none;
          border-radius: 9px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .action-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .action-button:not(:disabled):hover {
          opacity: 0.8;
        }

        .pause {
          color: #b45309;
          background: #fef3c7;
        }

        .resume {
          color: #0d9488;
          background: #d9f5ef;
        }

        .terminate {
          color: #dc2626;
          background: #fee2e2;
        }
      `}</style>
    </section>
  );
}