"use client";

import { useMemo, useState } from "react";

type Process = {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  memory: number;
  memoryMB: number;
  status: "Running" | "Sleeping" | "Stopped";
  priority: number;
  threads: number;
  started: string;
  command: string;
};

const initialProcesses: Process[] = [
  {
    pid: 4821,
    name: "node",
    user: "admin",
    cpu: 12.4,
    memory: 7.8,
    memoryMB: 248,
    status: "Running",
    priority: 20,
    threads: 8,
    started: "09:06 AM",
    command: "node server.js",
  },
  {
    pid: 3102,
    name: "chrome",
    user: "apple",
    cpu: 8.2,
    memory: 12.5,
    memoryMB: 512,
    status: "Running",
    priority: 20,
    threads: 12,
    started: "08:42 AM",
    command: "google-chrome",
  },
  {
    pid: 1824,
    name: "postgres",
    user: "postgres",
    cpu: 4.6,
    memory: 8.4,
    memoryMB: 320,
    status: "Running",
    priority: 15,
    threads: 6,
    started: "08:15 AM",
    command: "postgres -D /var/lib/postgresql",
  },
  {
    pid: 1001,
    name: "systemd",
    user: "root",
    cpu: 1.2,
    memory: 1.2,
    memoryMB: 48,
    status: "Running",
    priority: 0,
    threads: 1,
    started: "07:00 AM",
    command: "/sbin/init",
  },
  {
    pid: 2156,
    name: "python",
    user: "admin",
    cpu: 6.8,
    memory: 5.6,
    memoryMB: 180,
    status: "Running",
    priority: 20,
    threads: 4,
    started: "08:55 AM",
    command: "python worker.py",
  },
  {
    pid: 3250,
    name: "nginx",
    user: "www-data",
    cpu: 2.4,
    memory: 3.2,
    memoryMB: 96,
    status: "Running",
    priority: 10,
    threads: 4,
    started: "08:30 AM",
    command: "nginx: worker process",
  },
  {
    pid: 4012,
    name: "redis",
    user: "redis",
    cpu: 3.1,
    memory: 4.5,
    memoryMB: 144,
    status: "Sleeping",
    priority: 15,
    threads: 2,
    started: "08:10 AM",
    command: "redis-server 127.0.0.1:6379",
  },
  {
    pid: 4510,
    name: "docker",
    user: "root",
    cpu: 5.3,
    memory: 9.2,
    memoryMB: 368,
    status: "Running",
    priority: 10,
    threads: 6,
    started: "09:00 AM",
    command: "dockerd --host=unix:///var/run/docker.sock",
  },
  {
    pid: 5012,
    name: "cron",
    user: "root",
    cpu: 0.4,
    memory: 0.8,
    memoryMB: 32,
    status: "Sleeping",
    priority: 0,
    threads: 1,
    started: "06:00 AM",
    command: "/usr/sbin/cron",
  },
  {
    pid: 5234,
    name: "bash",
    user: "admin",
    cpu: 0.6,
    memory: 1.1,
    memoryMB: 44,
    status: "Running",
    priority: 20,
    threads: 1,
    started: "09:12 AM",
    command: "/bin/bash",
  },
  {
    pid: 5301,
    name: "sshd",
    user: "root",
    cpu: 0.3,
    memory: 1.5,
    memoryMB: 60,
    status: "Sleeping",
    priority: 0,
    threads: 1,
    started: "08:00 AM",
    command: "/usr/sbin/sshd -D",
  },
  {
    pid: 5508,
    name: "system-monitor",
    user: "admin",
    cpu: 1.8,
    memory: 2.4,
    memoryMB: 96,
    status: "Running",
    priority: 20,
    threads: 3,
    started: "09:14 AM",
    command: "./system-monitor",
  },
];

type SortKey = "pid" | "name" | "cpu" | "memory";

export default function ProcessesPage() {
  const [processes, setProcesses] = useState(initialProcesses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("cpu");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    "desc"
  );
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(
    initialProcesses[0]
  );
  const [showLaunchForm, setShowLaunchForm] = useState(false);
  const [newCommand, setNewCommand] = useState("");
  const [newProcessName, setNewProcessName] = useState("");
  const [notification, setNotification] = useState("");

  const activeProcesses = processes.filter(
    (process) => process.status !== "Stopped"
  );

  const runningCount = processes.filter(
    (process) => process.status === "Running"
  ).length;

  const sleepingCount = processes.filter(
    (process) => process.status === "Sleeping"
  ).length;

  const totalCpu = activeProcesses.reduce(
    (sum, process) => sum + process.cpu,
    0
  );

  const totalMemory = activeProcesses.reduce(
    (sum, process) => sum + process.memoryMB,
    0
  );

  const filteredProcesses = useMemo(() => {
    return processes
      .filter((process) => {
        const matchesSearch =
          process.name.toLowerCase().includes(search.toLowerCase()) ||
          String(process.pid).includes(search) ||
          process.user.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" ||
          process.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const first = a[sortBy];
        const second = b[sortBy];

        const comparison =
          typeof first === "string"
            ? first.localeCompare(second as string)
            : Number(first) - Number(second);

        return sortDirection === "asc"
          ? comparison
          : -comparison;
      });
  }, [processes, search, statusFilter, sortBy, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection((direction) =>
        direction === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(key);
      setSortDirection("desc");
    }
  };

  const notify = (message: string) => {
    setNotification(message);
  };

  const stopProcess = (pid: number) => {
    const target = processes.find((process) => process.pid === pid);

    if (!target || target.name === "systemd") {
      notify("This system process cannot be stopped in the demo.");
      return;
    }

    const confirmed = window.confirm(
      `Stop process ${target.name} (PID ${pid})?`
    );

    if (!confirmed) return;

    setProcesses((previous) =>
      previous.map((process) =>
        process.pid === pid
          ? { ...process, status: "Stopped" }
          : process
      )
    );

    if (selectedProcess?.pid === pid) {
      setSelectedProcess({ ...target, status: "Stopped" });
    }

    notify(`${target.name} has been stopped in the demo.`);
  };

  const terminateProcess = (pid: number) => {
    const target = processes.find((process) => process.pid === pid);

    if (!target || target.name === "systemd") {
      notify("This protected process cannot be terminated.");
      return;
    }

    const confirmed = window.confirm(
      `Terminate ${target.name} (PID ${pid})? This action cannot be undone.`
    );

    if (!confirmed) return;

    setProcesses((previous) =>
      previous.filter((process) => process.pid !== pid)
    );

    setSelectedProcess(null);
    notify(`${target.name} was removed from the demonstration process list.`);
  };

  const resumeProcess = (pid: number) => {
    setProcesses((previous) =>
      previous.map((process) =>
        process.pid === pid
          ? { ...process, status: "Running" }
          : process
      )
    );

    const target = processes.find((process) => process.pid === pid);

    if (target) {
      setSelectedProcess({ ...target, status: "Running" });
      notify(`${target.name} resumed in the demo.`);
    }
  };

  const launchProcess = () => {
    const name = newProcessName.trim();
    const command = newCommand.trim();

    if (!name || !command) {
      notify("Enter both a process name and a command.");
      return;
    }

    const newProcess: Process = {
      pid: Math.floor(6000 + Math.random() * 3000),
      name,
      user: "admin",
      cpu: 0,
      memory: 0.5,
      memoryMB: 20,
      status: "Running",
      priority: 20,
      threads: 1,
      started: "Just now",
      command,
    };

    setProcesses((previous) => [...previous, newProcess]);
    setSelectedProcess(newProcess);
    setNewProcessName("");
    setNewCommand("");
    setShowLaunchForm(false);

    notify(`${name} added to the demonstration process list.`);
  };

  const refreshProcesses = () => {
    notify("Displayed process information refreshed.");
  };

  const getStatusClass = (status: Process["status"]) => {
    if (status === "Running") return "process-running";
    if (status === "Sleeping") return "process-sleeping";
    return "process-stopped";
  };

  return (
    <>
      {/* Page Heading */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / System Management</div>

          <h1 className="page-title">Processes</h1>

          <p className="page-subtitle">
            Monitor running processes, inspect resource usage, and manage
            process activity.
          </p>
        </div>

        <div className="heading-actions">
          <button
            className="soft-btn"
            onClick={refreshProcesses}
          >
            ↻ Refresh
          </button>

          <button
            className="primary-btn"
            onClick={() => setShowLaunchForm(true)}
          >
            + Start Process
          </button>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <div className="upload-notice">
          <span>✓ {notification}</span>

          <button
            onClick={() => setNotification("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Process Statistics */}
      <section className="stat-grid">
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Total Processes</span>
            <span className="stat-icon tint-teal">⌘</span>
          </div>

          <div className="stat-value">
            {activeProcesses.length}
          </div>

          <div className="stat-foot">
            Currently active processes
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Running</span>
            <span className="stat-icon tint-violet">▶</span>
          </div>

          <div className="stat-value">{runningCount}</div>

          <div className="stat-foot">
            Actively executing processes
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Sleeping</span>
            <span className="stat-icon tint-orange">◷</span>
          </div>

          <div className="stat-value">{sleepingCount}</div>

          <div className="stat-foot">
            Waiting for system events
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-label">Terminated</span>
            <span className="stat-icon tint-blue">■</span>
          </div>

          <div className="stat-value">
            {processes.length - activeProcesses.length}
          </div>

          <div className="stat-foot">
            Removed or stopped processes
          </div>
        </article>
      </section>

      {/* Resource Summary */}
      <section className="dashboard-grid process-summary-grid">
        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">CPU Allocation</h2>
              <p className="panel-note">
                Combined CPU usage of displayed processes
              </p>
            </div>

            <span className="stat-icon tint-teal">◉</span>
          </div>

          <div className="process-resource-value">
            {totalCpu.toFixed(1)}%
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(totalCpu, 100)}%` }}
            />
          </div>

          <div className="resource-description">
            Across {activeProcesses.length} active processes
          </div>
        </article>

        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Memory Allocation</h2>
              <p className="panel-note">
                Total memory consumed by displayed processes
              </p>
            </div>

            <span className="stat-icon tint-violet">▤</span>
          </div>

          <div className="process-resource-value">
            {(totalMemory / 1024).toFixed(2)} GB
          </div>

          <div className="progress-track">
            <div
              className="progress-fill progress-violet"
              style={{
                width: `${Math.min((totalMemory / 16384) * 100, 100)}%`,
              }}
            />
          </div>

          <div className="resource-description">
            {totalMemory.toLocaleString()} MB allocated
          </div>
        </article>
      </section>

      {/* Main Processes Table */}
      <section className="panel">
        <div className="section-head process-table-heading">
          <div>
            <h2 className="panel-title">All Processes</h2>

            <p className="panel-note">
              Inspect and manage individual system processes
            </p>
          </div>

          <span className="pill">
            {filteredProcesses.length} Results
          </span>
        </div>

        {/* Search and Filters */}
        <div className="process-toolbar">
          <div className="explorer-search process-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by process name, PID, or user..."
              aria-label="Search processes"
            />
          </div>

          <select
            className="input-field"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter process status"
          >
            <option value="All">All Status</option>
            <option value="Running">Running</option>
            <option value="Sleeping">Sleeping</option>
            <option value="Stopped">Stopped</option>
          </select>
        </div>

        {/* Processes Table */}
        <div className="table-wrapper">
          <table className="data-table process-table">
            <thead>
              <tr>
                <th>
                  <button
                    className="table-sort-button"
                    onClick={() => handleSort("pid")}
                  >
                    PID {sortBy === "pid" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                  </button>
                </th>

                <th>
                  <button
                    className="table-sort-button"
                    onClick={() => handleSort("name")}
                  >
                    Process {sortBy === "name" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                  </button>
                </th>

                <th>User</th>

                <th>
                  <button
                    className="table-sort-button"
                    onClick={() => handleSort("cpu")}
                  >
                    CPU % {sortBy === "cpu" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                  </button>
                </th>

                <th>
                  <button
                    className="table-sort-button"
                    onClick={() => handleSort("memory")}
                  >
                    Memory {sortBy === "memory" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                  </button>
                </th>

                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProcesses.map((process) => (
                <tr
                  key={process.pid}
                  className={
                    selectedProcess?.pid === process.pid
                      ? "selected-file-row"
                      : ""
                  }
                  onClick={() => setSelectedProcess(process)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <code className="permission-code">
                      {process.pid}
                    </code>
                  </td>

                  <td>
                    <div className="process-name">
                      <span className="process-avatar">
                        {process.name.charAt(0).toUpperCase()}
                      </span>

                      <strong>{process.name}</strong>
                    </div>
                  </td>

                  <td>{process.user}</td>

                  <td>
                    <div className="process-usage">
                      <span>{process.cpu.toFixed(1)}%</span>

                      <div className="mini-progress">
                        <div
                          style={{
                            width: `${Math.min(process.cpu * 5, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>{process.memoryMB} MB</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(process.status)}`}
                    >
                      <span className="status-dot" />
                      {process.status}
                    </span>
                  </td>

                  <td>{process.priority}</td>

                  <td>
                    <div className="process-row-actions">
                      {process.status === "Running" && (
                        <button
                          title="Stop process"
                          aria-label={`Stop ${process.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            stopProcess(process.pid);
                          }}
                        >
                          ■
                        </button>
                      )}

                      {process.status === "Stopped" && (
                        <button
                          title="Resume process"
                          aria-label={`Resume ${process.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            resumeProcess(process.pid);
                          }}
                        >
                          ▶
                        </button>
                      )}

                      {process.status !== "Stopped" && (
                        <button
                          title="Terminate process"
                          aria-label={`Terminate ${process.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            terminateProcess(process.pid);
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProcesses.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">⌘</div>

            <h3>No processes found</h3>

            <p>
              No process matches the selected search or filter.
            </p>

            <button
              className="soft-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="explorer-footer">
          <span>
            Showing {filteredProcesses.length} of {processes.length} processes
          </span>

          <span>Process monitoring</span>
        </div>
      </section>

      {/* Process Details */}
      <section className="panel process-details-panel">
        <div className="section-head">
          <div>
            <h2 className="panel-title">Process Information</h2>

            <p className="panel-note">
              Detailed information about the selected process
            </p>
          </div>

          {selectedProcess && (
            <span className="pill">
              PID: {selectedProcess.pid}
            </span>
          )}
        </div>

        {selectedProcess ? (
          <div className="process-details-layout">
            <div className="process-detail-identity">
              <div className="process-large-avatar">
                {selectedProcess.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{selectedProcess.name}</h3>

                <p>
                  Owned by {selectedProcess.user}
                </p>

                <span
                  className={`status-badge ${getStatusClass(
                    selectedProcess.status
                  )}`}
                >
                  <span className="status-dot" />
                  {selectedProcess.status}
                </span>
              </div>
            </div>

            <div className="process-detail-grid">
              <div className="detail-metric">
                <span>CPU Usage</span>
                <strong>{selectedProcess.cpu.toFixed(1)}%</strong>
              </div>

              <div className="detail-metric">
                <span>Memory</span>
                <strong>{selectedProcess.memoryMB} MB</strong>
              </div>

              <div className="detail-metric">
                <span>Threads</span>
                <strong>{selectedProcess.threads}</strong>
              </div>

              <div className="detail-metric">
                <span>Priority</span>
                <strong>{selectedProcess.priority}</strong>
              </div>

              <div className="detail-metric">
                <span>Started</span>
                <strong>{selectedProcess.started}</strong>
              </div>
            </div>

            <div className="process-command">
              <span>COMMAND</span>
              <code>{selectedProcess.command}</code>
            </div>

            <div className="process-detail-actions">
              {selectedProcess.status === "Running" && (
                <button
                  className="soft-btn"
                  onClick={() => stopProcess(selectedProcess.pid)}
                >
                  ■ Stop Process
                </button>
              )}

              {selectedProcess.status === "Stopped" && (
                <button
                  className="primary-btn"
                  onClick={() => resumeProcess(selectedProcess.pid)}
                >
                  ▶ Resume Process
                </button>
              )}

              {selectedProcess.status !== "Stopped" &&
                selectedProcess.name !== "systemd" && (
                  <button
                    className="danger-btn"
                    onClick={() =>
                      terminateProcess(selectedProcess.pid)
                    }
                  >
                    × Terminate Process
                  </button>
                )}
            </div>
          </div>
        ) : (
          <div className="details-empty">
            <div className="details-empty-icon">⌘</div>

            <strong>No Process Selected</strong>

            <p>
              Select a process from the table to view detailed information.
            </p>
          </div>
        )}
      </section>

      {/* Launch Process Modal */}
      {showLaunchForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLaunchForm(false);
            }
          }}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="launch-process-title"
          >
            <div className="section-head">
              <div>
                <h2 id="launch-process-title" className="panel-title">
                  Start New Process
                </h2>

                <p className="panel-note">
                  Add a demonstration process to the process list.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowLaunchForm(false)}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                launchProcess();
              }}
            >
              <label className="form-label">
                Process Name
              </label>

              <input
                className="input-field modal-input"
                placeholder="e.g. python-worker"
                value={newProcessName}
                onChange={(event) =>
                  setNewProcessName(event.target.value)
                }
                required
              />

              <label className="form-label">
                Command
              </label>

              <input
                className="input-field modal-input"
                placeholder="e.g. python worker.py"
                value={newCommand}
                onChange={(event) =>
                  setNewCommand(event.target.value)
                }
                required
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="soft-btn"
                  onClick={() => setShowLaunchForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Start Process
                </button>
              </div>
            </form>

            <p className="modal-footnote">
              Demo mode: this form updates the frontend process list.
              It does not execute operating system commands.
            </p>
          </div>
        </div>
      )}

      {/* Information Panel */}
      <section className="panel process-info-panel">
        <div className="process-info-icon">ⓘ</div>

        <div>
          <h3>About Linux Process Management</h3>

          <p>
            Each Linux process is assigned a unique Process ID (PID).
            The operating system schedules processes, allocates memory,
            and manages their execution states. Use priority and resource
            information to understand system performance.
          </p>
        </div>
      </section>
    </>
  );
}