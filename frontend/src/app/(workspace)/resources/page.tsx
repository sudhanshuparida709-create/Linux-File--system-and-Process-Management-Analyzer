"use client";

import { useMemo, useState } from "react";

type ResourceRange = "1h" | "24h" | "7d";

const resourceHistory: Record<
  ResourceRange,
  {
    labels: string[];
    cpu: number[];
    memory: number[];
    disk: number[];
    network: number[];
  }
> = {
  "1h": {
    labels: ["09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00"],
    cpu: [28, 35, 42, 38, 56, 47, 42.8],
    memory: [35, 36, 38, 40, 39, 41, 40],
    disk: [45, 45.2, 45.4, 45.8, 46, 46.2, 46.5],
    network: [15, 25, 32, 22, 45, 38, 28],
  },
  "24h": {
    labels: ["12 AM", "04 AM", "08 AM", "12 PM", "04 PM", "08 PM", "Now"],
    cpu: [22, 35, 48, 62, 44, 51, 42.8],
    memory: [30, 32, 38, 43, 41, 42, 40],
    disk: [43, 43.5, 44, 44.8, 45.3, 45.8, 46.5],
    network: [18, 24, 48, 35, 52, 40, 28],
  },
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    cpu: [32, 45, 38, 61, 48, 54, 42.8],
    memory: [35, 38, 36, 42, 39, 44, 40],
    disk: [42, 43, 43.5, 44, 45, 46, 46.5],
    network: [24, 31, 28, 45, 38, 35, 28],
  },
};

const hardwareInfo = [
  { label: "Processor", value: "Intel Core i7", detail: "8 Cores · 16 Threads" },
  { label: "Installed Memory", value: "16 GB DDR4", detail: "3200 MHz" },
  { label: "Primary Storage", value: "512 GB SSD", detail: "NVMe Storage" },
  { label: "Architecture", value: "x86_64", detail: "64-bit Operating System" },
];

const topApplications = [
  { name: "Google Chrome", process: "chrome", cpu: 18.4, memory: 512, color: "tint-teal" },
  { name: "Node.js Server", process: "node", cpu: 15.2, memory: 248, color: "tint-violet" },
  { name: "PostgreSQL", process: "postgres", cpu: 9.6, memory: 320, color: "tint-orange" },
  { name: "Docker Engine", process: "docker", cpu: 8.3, memory: 368, color: "tint-blue" },
];

function getChartPoints(values: number[]) {
  const width = 500;
  const height = 170;
  const padding = 12;

  return values
    .map((value, index) => {
      const x =
        padding +
        (index * (width - padding * 2)) /
          Math.max(values.length - 1, 1);

      const y =
        height -
        padding -
        (value / 100) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");
}

function getAreaPoints(values: number[]) {
  return `12,158 ${getChartPoints(values)} 488,158`;
}

function ResourceChart({
  data,
  color,
  label,
}: {
  data: number[];
  color: string;
  label: string;
}) {
  const points = getChartPoints(data);
  const area = getAreaPoints(data);

  return (
    <svg
      viewBox="0 0 500 170"
      width="100%"
      role="img"
      aria-label={label}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={`gradient-${label}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity=".25"
          />
          <stop
            offset="100%"
            stopColor={color}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {[12, 48, 84, 120, 158].map((y) => (
        <line
          key={y}
          x1="12"
          y1={y}
          x2="488"
          y2={y}
          stroke="currentColor"
          strokeOpacity=".12"
          strokeDasharray="5 5"
        />
      ))}

      <polygon
        points={area}
        fill={`url(#gradient-${label})`}
      />

      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {data.map((value, index) => {
        const x =
          12 +
          (index * 476) / Math.max(data.length - 1, 1);

        const y = 158 - (value / 100) * 146;

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="3.5"
            fill={color}
            stroke="var(--panel)"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}

export default function ResourcesPage() {
  const [range, setRange] = useState<ResourceRange>("24h");
  const [selectedResource, setSelectedResource] = useState("cpu");
  const [refreshMessage, setRefreshMessage] = useState("");

  const history = resourceHistory[range];

  const resourceCards = [
    {
      id: "cpu",
      name: "CPU Usage",
      value: "42.8%",
      detail: "Normal utilization",
      icon: "◉",
      tint: "tint-teal",
      progress: 42.8,
      color: "#65b9aa",
    },
    {
      id: "memory",
      name: "Memory Usage",
      value: "6.4 GB",
      detail: "Of 16 GB available",
      icon: "▤",
      tint: "tint-violet",
      progress: 40,
      color: "#9b87d7",
    },
    {
      id: "disk",
      name: "Disk Usage",
      value: "238 GB",
      detail: "Of 512 GB total",
      icon: "▣",
      tint: "tint-orange",
      progress: 46.5,
      color: "#e5a66e",
    },
    {
      id: "network",
      name: "Network Usage",
      value: "28.2 Mbps",
      detail: "Current throughput",
      icon: "⇅",
      tint: "tint-blue",
      progress: 28.2,
      color: "#7da9d9",
    },
  ];

  const activeMetric = resourceCards.find(
    (resource) => resource.id === selectedResource
  )!;

  const activeHistory = history[
    selectedResource as keyof typeof history
  ];

  const averageUsage = useMemo(() => {
    const average = (values: number[]) =>
      values.reduce((sum, value) => sum + value, 0) /
      values.length;

    return {
      cpu: average(history.cpu).toFixed(1),
      memory: average(history.memory).toFixed(1),
      disk: average(history.disk).toFixed(1),
      network: average(history.network).toFixed(1),
    };
  }, [history]);

  const refreshResources = () => {
    setRefreshMessage("Resource dashboard refreshed.");
    window.setTimeout(() => setRefreshMessage(""), 3000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / Monitoring</div>

          <h1 className="page-title">System Resources</h1>

          <p className="page-subtitle">
            Monitor CPU, memory, storage, and network performance
            from a unified resource dashboard.
          </p>
        </div>

        <div className="heading-actions">
          <span className="status-indicator">
            <span className="status-dot" />
            Monitoring Active
          </span>

          <button
            className="soft-btn"
            onClick={refreshResources}
          >
            ↻ Refresh
          </button>
        </div>
      </section>

      {/* Refresh Notification */}
      {refreshMessage && (
        <div className="upload-notice">
          ✓ {refreshMessage}
          <button onClick={() => setRefreshMessage("")}>×</button>
        </div>
      )}

      {/* Main Resource Cards */}
      <section className="stat-grid">
        {resourceCards.map((resource) => (
          <button
            key={resource.id}
            className={`stat-card resource-select-card ${
              selectedResource === resource.id
                ? "resource-card-active"
                : ""
            }`}
            onClick={() => setSelectedResource(resource.id)}
          >
            <div className="stat-top">
              <span className="stat-label">
                {resource.name}
              </span>

              <span className={`stat-icon ${resource.tint}`}>
                {resource.icon}
              </span>
            </div>

            <div className="stat-value">
              {resource.value}
            </div>

            <div className="stat-foot">
              {resource.detail}
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${resource.progress}%`,
                  background: resource.color,
                }}
              />
            </div>
          </button>
        ))}
      </section>

      {/* Performance Chart */}
      <section className="panel resource-chart-panel">
        <div className="section-head">
          <div>
            <h2 className="panel-title">
              Resource Performance
            </h2>

            <p className="panel-note">
              Historical utilization and resource activity
            </p>
          </div>

          <div className="report-range-controls">
            {(
              [
                ["1h", "1 Hour"],
                ["24h", "24 Hours"],
                ["7d", "7 Days"],
              ] as [ResourceRange, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                className={`range-button ${
                  range === value ? "active" : ""
                }`}
                onClick={() => setRange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="resource-chart-selector">
          {resourceCards.map((resource) => (
            <button
              key={resource.id}
              className={`resource-chart-option ${
                selectedResource === resource.id ? "active" : ""
              }`}
              onClick={() => setSelectedResource(resource.id)}
            >
              <span
                className={`resource-option-icon ${resource.tint}`}
              >
                {resource.icon}
              </span>

              <span>{resource.name}</span>
            </button>
          ))}
        </div>

        <div className="resource-chart-summary">
          <div>
            <span className="stat-label">
              Current {activeMetric.name}
            </span>

            <strong>{activeMetric.value}</strong>
          </div>

          <div>
            <span className="stat-label">
              Average Utilization
            </span>

            <strong>
              {averageUsage[
                selectedResource as keyof typeof averageUsage
              ]}
              %
            </strong>
          </div>
        </div>

        <div className="resource-chart-graph">
          <div className="resource-y-axis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div className="resource-graph">
            <ResourceChart
              data={activeHistory.map((value) => Number(value)).filter(Number.isFinite)}
              color={activeMetric.color}
              label={`${activeMetric.name} trend`}
            />

            <div className="resource-x-axis">
              {history.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-footer-note">
          <span>
            ● {activeMetric.name}
          </span>

          <span>
            Displaying sample monitoring data
          </span>
        </div>
      </section>

      {/* CPU and Memory Details */}
      <section className="dashboard-grid">
        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">CPU Information</h2>

              <p className="panel-note">
                Processor utilization and specifications
              </p>
            </div>

            <span className="stat-icon tint-teal">◉</span>
          </div>

          <div className="resource-detail-highlight">
            <div className="resource-gauge">
              <svg viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  fill="none"
                  stroke="var(--track)"
                  strokeWidth="12"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  fill="none"
                  stroke="#65b9aa"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="408"
                  strokeDashoffset={408 * (1 - 0.428)}
                  transform="rotate(-90 80 80)"
                />
              </svg>

              <div className="resource-gauge-center">
                <strong>42.8%</strong>
                <span>CPU Usage</span>
              </div>
            </div>
          </div>

          <div className="resource-spec-list">
            <div>
              <span>Processor</span>
              <strong>Intel Core i7</strong>
            </div>

            <div>
              <span>CPU Cores</span>
              <strong>8 Cores</strong>
            </div>

            <div>
              <span>Logical Threads</span>
              <strong>16 Threads</strong>
            </div>

            <div>
              <span>Frequency</span>
              <strong>3.60 GHz</strong>
            </div>

            <div>
              <span>System Load</span>
              <strong>Normal</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Memory Information</h2>

              <p className="panel-note">
                RAM allocation and availability
              </p>
            </div>

            <span className="stat-icon tint-violet">▤</span>
          </div>

          <div className="memory-overview">
            <div className="memory-used">
              <strong>6.4 GB</strong>
              <span>Used Memory</span>
            </div>

            <div className="memory-available">
              <strong>9.6 GB</strong>
              <span>Available Memory</span>
            </div>
          </div>

          <div className="memory-stacked-bar">
            <div
              className="memory-used-segment"
              style={{ width: "40%" }}
            />

            <div
              className="memory-available-segment"
              style={{ width: "60%" }}
            />
          </div>

          <div className="memory-legend">
            <span>
              <i className="legend-dot legend-memory" />
              Used 40%
            </span>

            <span>
              <i className="legend-dot legend-cpu" />
              Available 60%
            </span>
          </div>

          <div className="resource-spec-list">
            <div>
              <span>Total RAM</span>
              <strong>16 GB</strong>
            </div>

            <div>
              <span>Memory Type</span>
              <strong>DDR4</strong>
            </div>

            <div>
              <span>Frequency</span>
              <strong>3200 MHz</strong>
            </div>

            <div>
              <span>Swap Usage</span>
              <strong>1.2 GB</strong>
            </div>
          </div>
        </article>
      </section>

      {/* Disk and Network */}
      <section className="dashboard-grid">
        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Disk Information</h2>

              <p className="panel-note">
                Storage capacity and utilization
              </p>
            </div>

            <span className="stat-icon tint-orange">▣</span>
          </div>

          <div className="disk-overview">
            <div className="disk-circle">
              <div className="disk-circle-center">
                <strong>46.5%</strong>
                <span>Used</span>
              </div>
            </div>

            <div className="disk-overview-details">
              <div>
                <span>Used Space</span>
                <strong>238 GB</strong>
              </div>

              <div>
                <span>Free Space</span>
                <strong>274 GB</strong>
              </div>

              <div>
                <span>Total Space</span>
                <strong>512 GB</strong>
              </div>
            </div>
          </div>

          <div className="resource-spec-list">
            <div>
              <span>Storage Device</span>
              <strong>NVMe SSD</strong>
            </div>

            <div>
              <span>File System</span>
              <strong>ext4</strong>
            </div>

            <div>
              <span>Mount Point</span>
              <strong>/</strong>
            </div>

            <div>
              <span>Disk Status</span>
              <strong className="healthy-text">
                ● Healthy
              </strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Network Information</h2>

              <p className="panel-note">
                Network throughput and interface status
              </p>
            </div>

            <span className="stat-icon tint-blue">⇅</span>
          </div>

          <div className="network-metrics">
            <div className="network-metric-card">
              <span className="network-arrow">↓</span>

              <span>Download Speed</span>

              <strong>18.6 Mbps</strong>
            </div>

            <div className="network-metric-card">
              <span className="network-arrow network-up">↑</span>

              <span>Upload Speed</span>

              <strong>9.6 Mbps</strong>
            </div>
          </div>

          <div className="network-activity">
            <div className="section-heading">
              <strong>Network Activity</strong>
              <span className="pill pill-success">Connected</span>
            </div>

            <div className="network-bars">
              {[25, 38, 32, 52, 44, 68, 55, 42, 72, 58, 48, 64, 80, 55, 42, 66].map(
                (height, index) => (
                  <div
                    key={index}
                    className="network-bar"
                    style={{ height: `${height}%` }}
                  />
                )
              )}
            </div>
          </div>

          <div className="resource-spec-list">
            <div>
              <span>Network Interface</span>
              <strong>eth0</strong>
            </div>

            <div>
              <span>IP Address</span>
              <strong>192.168.1.105</strong>
            </div>

            <div>
              <span>Connection</span>
              <strong>Ethernet</strong>
            </div>

            <div>
              <span>Interface Status</span>
              <strong className="healthy-text">
                ● Active
              </strong>
            </div>
          </div>
        </article>
      </section>

      {/* Top Applications */}
      <section className="panel">
        <div className="section-head">
          <div>
            <h2 className="panel-title">
              Resource-Intensive Applications
            </h2>

            <p className="panel-note">
              Applications using the highest system resources
            </p>
          </div>

          <a href="/processes" className="text-link">
            View Processes →
          </a>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Process Name</th>
                <th>CPU Usage</th>
                <th>Memory Usage</th>
                <th>CPU Allocation</th>
              </tr>
            </thead>

            <tbody>
              {topApplications.map((application) => (
                <tr key={application.process}>
                  <td>
                    <div className="process-name">
                      <span className={`process-avatar ${application.color}`}>
                        {application.name.charAt(0)}
                      </span>

                      <strong>{application.name}</strong>
                    </div>
                  </td>

                  <td>
                    <code className="permission-code">
                      {application.process}
                    </code>
                  </td>

                  <td>{application.cpu}%</td>

                  <td>{application.memory} MB</td>

                  <td>
                    <div className="process-usage">
                      <div className="mini-progress">
                        <div
                          style={{
                            width: `${application.cpu * 4}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hardware Details */}
      <section className="panel">
        <div className="section-head">
          <div>
            <h2 className="panel-title">Hardware Configuration</h2>

            <p className="panel-note">
              System hardware specifications
            </p>
          </div>

          <span className="stat-icon tint-violet">⚙</span>
        </div>

        <div className="hardware-grid">
          {hardwareInfo.map((item) => (
            <div className="hardware-card" key={item.label}>
              <span>{item.label}</span>

              <strong>{item.value}</strong>

              <small>{item.detail}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Monitoring Notice */}
      <section className="panel report-information">
        <div className="report-info-icon">ⓘ</div>

        <div>
          <h3>Resource Monitoring Information</h3>

          <p>
            The resource values shown on this page are demonstration
            values. Actual CPU, memory, disk, and network statistics
            should be supplied by the Linux monitoring backend.
            A production implementation can collect this information
            using Linux utilities such as /proc, /sys, df, free,
            and network interface statistics.
          </p>
        </div>
      </section>
    </>
  );
}