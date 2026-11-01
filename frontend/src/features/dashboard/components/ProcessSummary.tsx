"use client";

import {
  ArrowUpRight,
  Cpu,
  MemoryStick,
  MoreHorizontal,
  Play,
} from "lucide-react";

export type ProcessState =
  | "running"
  | "sleeping"
  | "stopped"
  | "idle";

export interface ProcessInfo {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  memory: number;
  state: ProcessState;
}

interface ProcessSummaryProps {
  processes?: ProcessInfo[];
  maxItems?: number;
  onViewAll?: () => void;
  title?: string;
}

const defaultProcesses: ProcessInfo[] = [
  {
    pid: 1024,
    name: "systemd",
    user: "root",
    cpu: 1.2,
    memory: 85.4,
    state: "running",
  },
  {
    pid: 2048,
    name: "chrome",
    user: "user",
    cpu: 12.5,
    memory: 512.8,
    state: "running",
  },
  {
    pid: 3072,
    name: "node",
    user: "user",
    cpu: 8.3,
    memory: 256.2,
    state: "running",
  },
  {
    pid: 4096,
    name: "sshd",
    user: "root",
    cpu: 0.4,
    memory: 24.6,
    state: "sleeping",
  },
  {
    pid: 5120,
    name: "postgres",
    user: "postgres",
    cpu: 3.7,
    memory: 180.5,
    state: "running",
  },
];

export default function ProcessSummary({
  processes = defaultProcesses,
  maxItems = 5,
  onViewAll,
  title = "Running Processes",
}: ProcessSummaryProps) {
  const visibleProcesses = processes.slice(0, maxItems);

  const runningCount = processes.filter(
    (process) => process.state === "running",
  ).length;

  return (
    <section className="process-card">
      <div className="card-header">
        <div className="header-left">
          <div className="icon-wrapper">
            <Cpu size={20} />
          </div>

          <div>
            <h3>{title}</h3>
            <p>{runningCount} active processes</p>
          </div>
        </div>

        {onViewAll && (
          <button
            type="button"
            className="view-all"
            onClick={onViewAll}
          >
            View all
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>PID</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {visibleProcesses.length > 0 ? (
              visibleProcesses.map((process) => (
                <tr key={process.pid}>
                  <td>
                    <div className="process-name">
                      <div className="process-icon">
                        <Play size={12} />
                      </div>

                      <div>
                        <strong>{process.name}</strong>
                        <span>{process.user}</span>
                      </div>
                    </div>
                  </td>

                  <td className="pid-cell">{process.pid}</td>

                  <td>
                    <span className="usage-value">
                      {process.cpu.toFixed(1)}%
                    </span>
                  </td>

                  <td>
                    <span className="usage-value">
                      {process.memory.toFixed(1)} MB
                    </span>
                  </td>

                  <td>
                    <span className={`state ${process.state}`}>
                      <span className="state-dot" />
                      {process.state}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="empty-state">
                  No processes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card-footer">
        <div>
          <MemoryStick size={14} />
          Process memory information
        </div>

        <button
          type="button"
          className="more-button"
          aria-label="Process summary information"
          title="Process summary information"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <style jsx>{`
        .process-card {
          width: 100%;
          padding: 22px;
          border-radius: 22px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.28),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-header,
        .header-left {
          display: flex;
          align-items: center;
        }

        .card-header {
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 22px;
        }

        .header-left {
          gap: 12px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          color: #6366f1;
          border-radius: 13px;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.2),
            inset -3px -3px 6px rgba(255, 255, 255, 0.9);
        }

        h3 {
          margin: 0;
          color: #20283b;
          font-size: 15px;
          font-weight: 700;
        }

        .header-left p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 11px;
        }

        .view-all {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 11px;
          color: #6366f1;
          border: none;
          border-radius: 10px;
          background: #e9eaff;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .view-all:hover {
          background: #dfe1ff;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 650px;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 12px 10px;
          color: #9299aa;
          border-bottom: 1px solid #e3e7f0;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          padding: 14px 10px;
          border-bottom: 1px solid #e9ecf3;
          color: #647089;
          font-size: 11px;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .process-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .process-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 10px;
          background: #e9eaff;
        }

        .process-name > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .process-name strong {
          color: #273147;
          font-size: 12px;
          font-weight: 700;
        }

        .process-name span {
          color: #9299aa;
          font-size: 10px;
        }

        .pid-cell {
          font-variant-numeric: tabular-nums;
        }

        .usage-value {
          color: #475569;
          font-weight: 600;
          white-space: nowrap;
        }

        .state {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          text-transform: capitalize;
          white-space: nowrap;
        }

        .state-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .state.running {
          color: #0d9488;
          background: #d9f5ef;
        }

        .state.sleeping {
          color: #ca8a04;
          background: #fef3c7;
        }

        .state.stopped {
          color: #dc2626;
          background: #fee2e2;
        }

        .state.idle {
          color: #64748b;
          background: #e9edf5;
        }

        .empty-state {
          padding: 30px 10px;
          color: #9299aa;
          text-align: center;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #e4e7ef;
          color: #9299aa;
          font-size: 10px;
        }

        .card-footer > div {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .more-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          color: #647089;
          border: none;
          border-radius: 9px;
          background: #edf0f7;
          cursor: pointer;
        }

        .more-button:hover {
          background: #e1e5ef;
        }

        @media (max-width: 480px) {
          .process-card {
            padding: 16px;
          }
        }
      `}</style>
    </section>
  );
}