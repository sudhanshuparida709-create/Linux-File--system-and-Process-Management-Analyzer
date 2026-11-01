"use client";

import { useMemo } from "react";
import type { MouseEvent } from "react";

import {
  Cpu,
  MemoryStick,
  Pause,
  Play,
  RefreshCw,
  Terminal,
  XCircle,
} from "lucide-react";

/* =====================================
   Process Types
===================================== */

export type ProcessState =
  | "running"
  | "sleeping"
  | "stopped"
  | "zombie"
  | "idle";

export interface ProcessInfo {
  pid: number;
  name: string;
  user: string;
  state: ProcessState;
  cpu: number;
  memory: number;

  priority?: number;
  nice?: number;
  threads?: number;
  started?: string;
  parentPid?: number;
  command?: string;
}

export type ProcessSortField =
  | "pid"
  | "name"
  | "cpu"
  | "memory";

export interface ProcessFilterValue {
  query: string;
  state: ProcessState | "all";
  sortBy: ProcessSortField;
  sortOrder: "asc" | "desc";
}

export const DEFAULT_PROCESS_FILTERS: ProcessFilterValue = {
  query: "",
  state: "all",
  sortBy: "pid",
  sortOrder: "desc",
};

/* =====================================
   Component Props
===================================== */

interface ProcessTableProps {
  processes: ProcessInfo[];
  selectedProcessId?: number;
  filters?: ProcessFilterValue;

  onSelect?: (process: ProcessInfo) => void;
  onTerminate?: (process: ProcessInfo) => void;
  onPause?: (process: ProcessInfo) => void;
  onResume?: (process: ProcessInfo) => void;
  onRefresh?: () => void;

  title?: string;
  emptyMessage?: string;
}

/* =====================================
   Helper Functions
===================================== */

function formatMemory(value: number): string {
  if (value >= 1024) {
    return `${(value / 1024).toFixed(2)} GB`;
  }

  return `${value.toFixed(1)} MB`;
}

function getStateLabel(state: ProcessState): string {
  const labels: Record<ProcessState, string> = {
    running: "Running",
    sleeping: "Sleeping",
    stopped: "Stopped",
    zombie: "Zombie",
    idle: "Idle",
  };

  return labels[state];
}

/* =====================================
   Process Table Component
===================================== */

export default function ProcessTable({
  processes,
  selectedProcessId,
  filters = DEFAULT_PROCESS_FILTERS,

  onSelect,
  onTerminate,
  onPause,
  onResume,
  onRefresh,

  title = "Process List",
  emptyMessage = "No processes found.",
}: ProcessTableProps) {
  const filteredProcesses = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    const filtered = processes.filter((process) => {
      const matchesQuery =
        query.length === 0 ||
        process.name.toLowerCase().includes(query) ||
        process.user.toLowerCase().includes(query) ||
        String(process.pid).includes(query) ||
        (process.command ?? "").toLowerCase().includes(query);

      const matchesState =
        filters.state === "all" ||
        process.state === filters.state;

      return matchesQuery && matchesState;
    });

    const direction =
      filters.sortOrder === "asc" ? 1 : -1;

    return [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return direction * a.name.localeCompare(b.name);

        case "cpu":
          return direction * (a.cpu - b.cpu);

        case "memory":
          return direction * (a.memory - b.memory);

        case "pid":
        default:
          return direction * (a.pid - b.pid);
      }
    });
  }, [processes, filters]);

  const stopPropagation = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
  };

  return (
    <section className="process-table-card">
      <div className="card-header">
        <div className="heading-left">
          <div className="heading-icon">
            <Terminal size={19} />
          </div>

          <div>
            <h3>{title}</h3>
            <p>
              Showing {filteredProcesses.length} of {processes.length}{" "}
              processes
            </p>
          </div>
        </div>

        {onRefresh && (
          <button
            type="button"
            className="refresh-button"
            onClick={onRefresh}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        )}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>PID</th>
              <th>
                <span className="column-heading">
                  <Cpu size={12} />
                  CPU
                </span>
              </th>
              <th>
                <span className="column-heading">
                  <MemoryStick size={12} />
                  Memory
                </span>
              </th>
              <th>Priority</th>
              <th>Status</th>

              {(onPause || onResume || onTerminate) && (
                <th className="actions-heading">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredProcesses.length > 0 ? (
              filteredProcesses.map((process) => {
                const isSelected =
                  selectedProcessId === process.pid;

                return (
                  <tr
                    key={process.pid}
                    className={isSelected ? "selected-row" : ""}
                    onClick={() => onSelect?.(process)}
                    aria-selected={isSelected}
                  >
                    <td>
                      <div className="process-name">
                        <div className="process-icon">
                          <Terminal size={15} />
                        </div>

                        <div className="name-content">
                          <strong title={process.name}>
                            {process.name}
                          </strong>

                          <span>{process.user}</span>
                        </div>
                      </div>
                    </td>

                    <td className="pid-cell">
                      {process.pid}
                    </td>

                    <td>
                      <span className="usage-value">
                        {process.cpu.toFixed(2)}%
                      </span>
                    </td>

                    <td>
                      <span className="usage-value">
                        {formatMemory(process.memory)}
                      </span>
                    </td>

                    <td className="priority-cell">
                      {process.priority ?? "—"}
                    </td>

                    <td>
                      <span className={`status ${process.state}`}>
                        <span className="status-dot" />
                        {getStateLabel(process.state)}
                      </span>
                    </td>

                    {(onPause || onResume || onTerminate) && (
                      <td>
                        <div className="row-actions">
                          {process.state === "running" &&
                            onPause && (
                              <button
                                type="button"
                                className="icon-button pause"
                                title="Pause process"
                                aria-label={`Pause ${process.name}`}
                                onClick={(event) => {
                                  stopPropagation(event);
                                  onPause(process);
                                }}
                              >
                                <Pause size={14} />
                              </button>
                            )}

                          {(process.state === "sleeping" ||
                            process.state === "stopped") &&
                            onResume && (
                              <button
                                type="button"
                                className="icon-button resume"
                                title="Resume process"
                                aria-label={`Resume ${process.name}`}
                                onClick={(event) => {
                                  stopPropagation(event);
                                  onResume(process);
                                }}
                              >
                                <Play size={14} />
                              </button>
                            )}

                          {onTerminate &&
                            process.state !== "stopped" &&
                            process.state !== "zombie" && (
                              <button
                                type="button"
                                className="icon-button terminate"
                                title="Terminate process"
                                aria-label={`Terminate ${process.name}`}
                                onClick={(event) => {
                                  stopPropagation(event);
                                  onTerminate(process);
                                }}
                              >
                                <XCircle size={14} />
                              </button>
                            )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    onPause || onResume || onTerminate ? 7 : 6
                  }
                  className="empty-state"
                >
                  <div className="empty-content">
                    <Terminal size={24} />
                    <strong>{emptyMessage}</strong>
                    <span>Try changing your search or filters.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Total displayed: <strong>{filteredProcesses.length}</strong>
        </span>

        <span>Memory values in MB / GB</span>
      </div>

      <style jsx>{`
        .process-table-card {
          width: 100%;
          min-width: 0;
          padding: 20px;
          border-radius: 20px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.25),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-header,
        .heading-left {
          display: flex;
          align-items: center;
        }

        .card-header {
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .heading-left {
          gap: 11px;
        }

        .heading-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 12px;
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

        .heading-left p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 10px;
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 0 11px;
          color: #6366f1;
          border: none;
          border-radius: 9px;
          background: #e9eaff;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        .refresh-button:hover {
          background: #dfe1ff;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          min-width: 720px;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 12px 10px;
          color: #9299aa;
          border-bottom: 1px solid #e3e7ef;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        td {
          padding: 13px 10px;
          color: #647089;
          border-bottom: 1px solid #e9ecf3;
          font-size: 11px;
          white-space: nowrap;
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

        .column-heading {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .process-name {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 125px;
        }

        .process-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 9px;
          background: #e6e8ff;
        }

        .name-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .name-content strong {
          overflow: hidden;
          max-width: 130px;
          color: #273147;
          font-size: 11px;
          font-weight: 700;
          text-overflow: ellipsis;
        }

        .name-content span {
          color: #9299aa;
          font-size: 9px;
        }

        .pid-cell,
        .priority-cell {
          color: #647089;
          font-variant-numeric: tabular-nums;
        }

        .usage-value {
          color: #475569;
          font-weight: 600;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 9px;
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

        .actions-heading {
          text-align: right;
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
          width: 27px;
          height: 27px;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .icon-button.pause {
          color: #d97706;
        }

        .icon-button.resume {
          color: #0d9488;
        }

        .icon-button.terminate {
          color: #dc2626;
        }

        .icon-button:hover {
          background: #e1e5ef;
        }

        .empty-state {
          padding: 35px 10px;
          text-align: center;
        }

        .empty-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          color: #9299aa;
        }

        .empty-content strong {
          color: #475569;
          font-size: 12px;
        }

        .empty-content span {
          font-size: 10px;
        }

        .table-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 14px;
          padding-top: 13px;
          border-top: 1px solid #e3e7ef;
          color: #9299aa;
          font-size: 10px;
        }

        .table-footer strong {
          color: #6366f1;
        }

        @media (max-width: 480px) {
          .process-table-card {
            padding: 15px;
          }
        }
      `}</style>
    </section>
  );
}