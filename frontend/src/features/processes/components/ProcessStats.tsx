import {
  Activity,
  Cpu,
  MemoryStick,
  Play,
  Pause,
  Square,
} from "lucide-react";

import type { ProcessInfo } from "./ProcessTable";

interface ProcessStatsProps {
  processes: ProcessInfo[];
  cpuUsage?: number;
  memoryUsage?: number;
  totalProcesses?: number;
  title?: string;
}

function formatMemory(value: number): string {
  if (value >= 1024) {
    return `${(value / 1024).toFixed(2)} GB`;
  }

  return `${value.toFixed(1)} MB`;
}

export default function ProcessStats({
  processes,
  cpuUsage,
  memoryUsage,
  totalProcesses,
  title = "Process Statistics",
}: ProcessStatsProps) {
  const running = processes.filter(
    (process) => process.state === "running",
  ).length;

  const sleeping = processes.filter(
    (process) => process.state === "sleeping",
  ).length;

  const stopped = processes.filter(
    (process) => process.state === "stopped",
  ).length;

  const zombie = processes.filter(
    (process) => process.state === "zombie",
  ).length;

  const total = totalProcesses ?? processes.length;

  const averageCpu =
    processes.length > 0
      ? processes.reduce((sum, process) => sum + process.cpu, 0) /
        processes.length
      : 0;

  const totalMemory =
    processes.reduce((sum, process) => sum + process.memory, 0);

  const metrics = [
    {
      label: "Total Processes",
      value: total.toLocaleString(),
      description: "Processes detected",
      icon: Activity,
      tone: "blue",
    },
    {
      label: "Running",
      value: running.toLocaleString(),
      description: "Currently executing",
      icon: Play,
      tone: "green",
    },
    {
      label: "Sleeping",
      value: sleeping.toLocaleString(),
      description: "Waiting for an event",
      icon: Pause,
      tone: "orange",
    },
    {
      label: "Stopped / Zombie",
      value: (stopped + zombie).toLocaleString(),
      description: `${stopped} stopped, ${zombie} zombie`,
      icon: Square,
      tone: "red",
    },
  ];

  return (
    <section className="stats-section">
      <div className="section-heading">
        <div>
          <h3>{title}</h3>
          <p>Overview of process activity and resource usage</p>
        </div>
      </div>

      <div className="stats-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              className={`stat-card ${metric.tone}`}
              key={metric.label}
            >
              <div className="stat-top">
                <div className="stat-icon">
                  <Icon size={19} />
                </div>

                <span className="stat-label">{metric.label}</span>
              </div>

              <strong className="stat-value">{metric.value}</strong>

              <span className="stat-description">
                {metric.description}
              </span>
            </article>
          );
        })}
      </div>

      <div className="resource-grid">
        <div className="resource-card">
          <div className="resource-icon cpu">
            <Cpu size={19} />
          </div>

          <div className="resource-content">
            <span>CPU Usage</span>
            <strong>
              {(
                cpuUsage !== undefined ? cpuUsage : averageCpu
              ).toFixed(2)}
              %
            </strong>
            <small>
              {cpuUsage !== undefined
                ? "System CPU utilization"
                : "Average CPU usage per process"}
            </small>
          </div>
        </div>

        <div className="resource-card">
          <div className="resource-icon memory">
            <MemoryStick size={19} />
          </div>

          <div className="resource-content">
            <span>Memory Consumption</span>
            <strong>
              {formatMemory(memoryUsage ?? totalMemory)}
            </strong>
            <small>
              {memoryUsage !== undefined
                ? "System memory usage"
                : "Combined memory of listed processes"}
            </small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .section-heading h3 {
          margin: 0;
          color: #20283b;
          font-size: 15px;
          font-weight: 700;
        }

        .section-heading p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 11px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .stat-card {
          min-width: 0;
          padding: 18px;
          border-radius: 18px;
          background: #f4f5fb;
          box-shadow:
            6px 6px 14px rgba(163, 177, 198, 0.24),
            -6px -6px 14px rgba(255, 255, 255, 0.9);
        }

        .stat-top {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .stat-icon,
        .resource-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.18),
            inset -3px -3px 6px rgba(255, 255, 255, 0.9);
        }

        .blue .stat-icon {
          color: #6366f1;
        }

        .green .stat-icon {
          color: #0d9488;
        }

        .orange .stat-icon {
          color: #d97706;
        }

        .red .stat-icon {
          color: #dc2626;
        }

        .stat-label {
          overflow: hidden;
          color: #647089;
          font-size: 11px;
          font-weight: 600;
          text-overflow: ellipsis;
        }

        .stat-value {
          display: block;
          margin-top: 18px;
          color: #20283b;
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .stat-description {
          display: block;
          overflow: hidden;
          margin-top: 5px;
          color: #9299aa;
          font-size: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .resource-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .resource-card {
          display: flex;
          align-items: center;
          gap: 13px;
          min-width: 0;
          padding: 17px;
          border-radius: 17px;
          background: #f4f5fb;
          box-shadow:
            6px 6px 14px rgba(163, 177, 198, 0.22),
            -6px -6px 14px rgba(255, 255, 255, 0.9);
        }

        .resource-icon.cpu {
          color: #6366f1;
        }

        .resource-icon.memory {
          color: #8b5cf6;
        }

        .resource-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .resource-content > span {
          color: #9299aa;
          font-size: 10px;
        }

        .resource-content strong {
          overflow-wrap: anywhere;
          color: #273147;
          font-size: 19px;
          font-weight: 800;
        }

        .resource-content small {
          color: #9299aa;
          font-size: 9px;
        }

        @media (max-width: 950px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .stats-grid,
          .resource-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 15px;
          }
        }
      `}</style>
    </section>
  );
}