"use client";

import { useMemo, useState } from "react";

type Range = "7d" | "30d" | "90d";

const reportData: Record<
  Range,
  {
    labels: string[];
    cpu: number[];
    memory: number[];
    disk: number[];
  }
> = {
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    cpu: [32, 45, 38, 61, 48, 54, 42.8],
    memory: [35, 38, 36, 42, 39, 44, 40],
    disk: [42, 43, 43.5, 44, 45, 46, 46.5],
  },
  "30d": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    cpu: [38, 52, 46, 42.8],
    memory: [32, 37, 43, 40],
    disk: [39, 42, 44, 46.5],
  },
  "90d": {
    labels: ["Aug", "Sep", "Oct"],
    cpu: [35, 48, 42.8],
    memory: [30, 37, 40],
    disk: [34, 40, 46.5],
  },
};

const resourceBreakdown = [
  { name: "System Files", size: "86 GB", percent: 36.1, color: "#65b9aa" },
  { name: "Personal Files", size: "92 GB", percent: 38.7, color: "#9b87d7" },
  { name: "Cache", size: "38 GB", percent: 16, color: "#e5a66e" },
  { name: "Other", size: "22 GB", percent: 9.2, color: "#7da9d9" },
];

const topProcesses = [
  { name: "chrome", pid: 3102, cpu: 18.4, memory: 512 },
  { name: "node", pid: 4821, cpu: 15.2, memory: 248 },
  { name: "postgres", pid: 1824, cpu: 9.6, memory: 320 },
  { name: "docker", pid: 4510, cpu: 8.3, memory: 368 },
  { name: "python", pid: 2156, cpu: 6.8, memory: 180 },
];

const reportStats = [
  {
    title: "Average CPU Usage",
    value: "42.8%",
    change: "5.2% lower",
    icon: "◉",
    tint: "tint-teal",
    positive: true,
  },
  {
    title: "Average Memory",
    value: "6.4 GB",
    change: "40% utilized",
    icon: "▤",
    tint: "tint-violet",
    positive: true,
  },
  {
    title: "Storage Consumed",
    value: "238 GB",
    change: "46.5% utilized",
    icon: "▣",
    tint: "tint-orange",
    positive: true,
  },
  {
    title: "Process Count",
    value: "128",
    change: "8 more processes",
    icon: "⌘",
    tint: "tint-blue",
    positive: true,
  },
];

function createLinePoints(values: number[]) {
  const width = 500;
  const height = 180;
  const padding = 12;

  return values
    .map((value, index) => {
      const x =
        padding +
        (index * (width - padding * 2)) /
          Math.max(values.length - 1, 1);

      const y = height - padding - (value / 100) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");
}

function createAreaPoints(values: number[]) {
  const linePoints = createLinePoints(values);
  const width = 500;
  const padding = 12;

  return `${padding},168 ${linePoints} ${width - padding},168`;
}

function downloadCSV() {
  const rows = [
    ["Linux System Performance Report"],
    ["Metric", "Value"],
    ["CPU Usage", "42.8%"],
    ["Memory Usage", "6.4 GB"],
    ["Disk Usage", "238 GB"],
    ["Total Processes", "128"],
    [],
    ["Process", "PID", "CPU Usage", "Memory (MB)"],
    ...topProcesses.map((process) => [
      process.name,
      process.pid,
      `${process.cpu}%`,
      process.memory,
    ]),
    [],
    ["Storage Category", "Size", "Percentage"],
    ...resourceBreakdown.map((item) => [
      item.name,
      item.size,
      `${item.percent}%`,
    ]),
  ];

  const csv = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "linux-system-report.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const [range, setRange] = useState<Range>("7d");
  const [activeReport, setActiveReport] = useState("performance");
  const [showDetails, setShowDetails] = useState(true);

  const chartData = reportData[range];

  const totalStorage = 238;

  const processMemory = useMemo(
    () =>
      topProcesses.reduce(
        (total, process) => total + process.memory,
        0
      ),
    []
  );

  const linePoints = {
    cpu: createLinePoints(chartData.cpu),
    memory: createLinePoints(chartData.memory),
    disk: createLinePoints(chartData.disk),
  };

  const areaPoints = {
    cpu: createAreaPoints(chartData.cpu),
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / Analytics</div>

          <h1 className="page-title">System Reports</h1>

          <p className="page-subtitle">
            Analyze system performance, resource utilization, and
            operational statistics.
          </p>
        </div>

        <div className="heading-actions">
          <button className="soft-btn" onClick={downloadCSV}>
            ⇩ Export CSV
          </button>

          <button
            className="primary-btn"
            onClick={() => window.print()}
          >
            Print Report
          </button>
        </div>
      </section>

      {/* Report Date and Filters */}
      <section className="panel report-toolbar">
        <div>
          <span className="report-toolbar-label">
            REPORT PERIOD
          </span>

          <p className="panel-note">
            Select a time range to explore system performance.
          </p>
        </div>

        <div className="report-range-controls">
          {(
            [
              ["7d", "7 Days"],
              ["30d", "30 Days"],
              ["90d", "90 Days"],
            ] as [Range, string][]
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
      </section>

      {/* Summary Metrics */}
      <section className="stat-grid">
        {reportStats.map((stat) => (
          <article className="stat-card" key={stat.title}>
            <div className="stat-top">
              <span className="stat-label">{stat.title}</span>

              <span className={`stat-icon ${stat.tint}`}>
                {stat.icon}
              </span>
            </div>

            <div className="stat-value">{stat.value}</div>

            <div className="stat-bottom">
              <span className="metric-change">
                {stat.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Report Navigation */}
      <section className="report-tabs">
        <button
          className={activeReport === "performance" ? "active" : ""}
          onClick={() => setActiveReport("performance")}
        >
          ◉ Performance
        </button>

        <button
          className={activeReport === "storage" ? "active" : ""}
          onClick={() => setActiveReport("storage")}
        >
          ▣ Storage
        </button>

        <button
          className={activeReport === "processes" ? "active" : ""}
          onClick={() => setActiveReport("processes")}
        >
          ⌘ Processes
        </button>
      </section>

      {/* Performance Report */}
      {activeReport === "performance" && (
        <>
          <section className="panel report-chart-panel">
            <div className="section-head">
              <div>
                <h2 className="panel-title">
                  System Performance Trends
                </h2>

                <p className="panel-note">
                  CPU, memory, and disk utilization over time
                </p>
              </div>

              <span className="pill pill-success">
                ● Normal
              </span>
            </div>

            <div className="chart-legend">
              <span>
                <i className="legend-dot legend-cpu" />
                CPU
              </span>

              <span>
                <i className="legend-dot legend-memory" />
                Memory
              </span>

              <span>
                <i className="legend-dot legend-orange" />
                Disk
              </span>
            </div>

            <div className="report-chart">
              <div className="report-y-axis">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              <div className="report-chart-graph">
                <svg
                  viewBox="0 0 500 180"
                  width="100%"
                  role="img"
                  aria-label="System resource utilization trend chart"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="reportCpuGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#65b9aa"
                        stopOpacity=".24"
                      />

                      <stop
                        offset="100%"
                        stopColor="#65b9aa"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {[12, 51, 90, 129, 168].map((y) => (
                    <line
                      key={y}
                      x1="12"
                      y1={y}
                      x2="488"
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity=".13"
                      strokeDasharray="5 5"
                    />
                  ))}

                  <polygon
                    points={areaPoints.cpu}
                    fill="url(#reportCpuGradient)"
                  />

                  <polyline
                    points={linePoints.cpu}
                    fill="none"
                    stroke="#65b9aa"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={linePoints.memory}
                    fill="none"
                    stroke="#9b87d7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={linePoints.disk}
                    fill="none"
                    stroke="#e5a66e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {chartData.cpu.map((value, index) => {
                    const x =
                      12 +
                      (index * 476) /
                        Math.max(chartData.cpu.length - 1, 1);

                    const y =
                      168 - (value / 100) * 156;

                    return (
                      <circle
                        key={`cpu-${index}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#65b9aa"
                        stroke="var(--panel)"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>

                <div className="report-x-axis">
                  {chartData.labels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Performance Details */}
          <section className="dashboard-grid">
            <article className="panel">
              <div className="section-head">
                <div>
                  <h2 className="panel-title">
                    Performance Summary
                  </h2>

                  <p className="panel-note">
                    Current resource statistics
                  </p>
                </div>
              </div>

              <div className="report-detail-list">
                <div className="report-detail-item">
                  <div className="report-detail-heading">
                    <span>CPU Utilization</span>
                    <strong>42.8%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: "42.8%" }}
                    />
                  </div>

                  <small>Normal operating range</small>
                </div>

                <div className="report-detail-item">
                  <div className="report-detail-heading">
                    <span>Memory Utilization</span>
                    <strong>40%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill progress-violet"
                      style={{ width: "40%" }}
                    />
                  </div>

                  <small>6.4 GB of 16 GB allocated</small>
                </div>

                <div className="report-detail-item">
                  <div className="report-detail-heading">
                    <span>Disk Utilization</span>
                    <strong>46.5%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill progress-orange"
                      style={{ width: "46.5%" }}
                    />
                  </div>

                  <small>238 GB of 512 GB occupied</small>
                </div>
              </div>
            </article>

            <article className="panel">
              <div className="section-head">
                <div>
                  <h2 className="panel-title">
                    System Health
                  </h2>

                  <p className="panel-note">
                    Overall monitoring status
                  </p>
                </div>

                <span className="pill pill-success">
                  Healthy
                </span>
              </div>

              <div className="health-score">
                <div className="health-score-ring">
                  <div className="health-score-inner">
                    <strong>96</strong>
                    <span>/100</span>
                  </div>
                </div>

                <h3>Excellent Performance</h3>

                <p>
                  All monitored resources are operating within
                  their normal ranges.
                </p>
              </div>

              <div className="health-check-list">
                <div>
                  <span>CPU Health</span>
                  <strong>✓ Normal</strong>
                </div>

                <div>
                  <span>Memory Health</span>
                  <strong>✓ Normal</strong>
                </div>

                <div>
                  <span>Disk Health</span>
                  <strong>✓ Normal</strong>
                </div>

                <div>
                  <span>Process Health</span>
                  <strong>✓ Normal</strong>
                </div>
              </div>
            </article>
          </section>
        </>
      )}

      {/* Storage Report */}
      {activeReport === "storage" && (
        <>
          <section className="dashboard-grid">
            <article className="panel">
              <div className="section-head">
                <div>
                  <h2 className="panel-title">
                    Storage Distribution
                  </h2>

                  <p className="panel-note">
                    Breakdown of occupied disk space
                  </p>
                </div>
              </div>

              <div className="storage-report-main">
                <div className="storage-donut">
                  <div className="storage-donut-center">
                    <strong>{totalStorage} GB</strong>
                    <span>Used Space</span>
                  </div>
                </div>

                <div className="storage-report-legend">
                  {resourceBreakdown.map((item) => (
                    <div key={item.name}>
                      <span>
                        <i
                          style={{
                            background: item.color,
                          }}
                        />

                        {item.name}
                      </span>

                      <strong>{item.size}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="panel">
              <div className="section-head">
                <div>
                  <h2 className="panel-title">
                    Disk Capacity
                  </h2>

                  <p className="panel-note">
                    Total storage capacity
                  </p>
                </div>
              </div>

              <div className="disk-capacity-value">
                <strong>512 GB</strong>
                <span>Total Capacity</span>
              </div>

              <div className="storage-bar">
                <div
                  className="storage-segment storage-system"
                  style={{ width: "16.8%" }}
                />

                <div
                  className="storage-segment storage-personal"
                  style={{ width: "18%" }}
                />

                <div
                  className="storage-segment storage-cache"
                  style={{ width: "7.4%" }}
                />

                <div
                  className="storage-segment storage-other"
                  style={{ width: "4.3%" }}
                />
              </div>

              <div className="disk-capacity-details">
                <div>
                  <span>Used Space</span>
                  <strong>238 GB</strong>
                </div>

                <div>
                  <span>Available Space</span>
                  <strong>274 GB</strong>
                </div>

                <div>
                  <span>Utilization</span>
                  <strong>46.5%</strong>
                </div>
              </div>

              <span className="pill pill-success">
                ● Sufficient Storage
              </span>
            </article>
          </section>

          <section className="panel">
            <div className="section-head">
              <div>
                <h2 className="panel-title">
                  Storage Categories
                </h2>

                <p className="panel-note">
                  Detailed storage consumption
                </p>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Used Space</th>
                    <th>Percentage</th>
                    <th>Distribution</th>
                  </tr>
                </thead>

                <tbody>
                  {resourceBreakdown.map((item) => (
                    <tr key={item.name}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>

                      <td>{item.size}</td>

                      <td>{item.percent}%</td>

                      <td>
                        <div className="process-usage">
                          <div className="mini-progress">
                            <div
                              style={{
                                width: `${item.percent}%`,
                                background: item.color,
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
        </>
      )}

      {/* Process Report */}
      {activeReport === "processes" && (
        <>
          <section className="dashboard-grid">
            <article className="panel">
              <div className="section-head">
                <div>
                  <h2 className="panel-title">
                    Process Statistics
                  </h2>

                  <p className="panel-note">
                    Process distribution by state
                  </p>
                </div>
              </div>

              <div className="process-report-stats">
                <div>
                  <span className="process-report-number tint-teal">
                    128
                  </span>

                  <strong>Total</strong>
                </div>

                <div>
                  <span className="process-report-number tint-violet">
                    86
                  </span>

                  <strong>Running</strong>
                </div>

                <div>
                  <span className="process-report-number tint-orange">
                    42
                  </span>

                  <strong>Sleeping</strong>
                </div>
              </div>

              <div className="storage-bar process-state-bar">
                <div
                  className="storage-segment storage-system"
                  style={{ width: "67.2%" }}
                />

                <div
                  className="storage-segment storage-personal"
                  style={{ width: "32.8%" }}
                />
              </div>

              <div className="storage-legend">
                <span>
                  <i className="legend-dot legend-cpu" />
                  Running
                </span>

                <span>
                  <i className="legend-dot legend-memory" />
                  Sleeping
                </span>
              </div>
            </article>

            <article className="panel">
              <div className="section-head">
                <div>
                  <h2 className="panel-title">
                    Process Memory
                  </h2>

                  <p className="panel-note">
                    Memory used by top processes
                  </p>
                </div>
              </div>

              <div className="process-memory-total">
                <strong>
                  {(processMemory / 1024).toFixed(2)} GB
                </strong>

                <span>Combined memory of listed processes</span>
              </div>

              <div className="report-detail-list">
                {topProcesses.slice(0, 4).map((process) => (
                  <div
                    className="report-detail-item"
                    key={process.pid}
                  >
                    <div className="report-detail-heading">
                      <span>{process.name}</span>
                      <strong>{process.memory} MB</strong>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill progress-violet"
                        style={{
                          width: `${(process.memory / 600) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="panel">
            <div className="section-head">
              <div>
                <h2 className="panel-title">
                  Top Resource Consumers
                </h2>

                <p className="panel-note">
                  Processes ranked by CPU utilization
                </p>
              </div>

              <span className="pill">Top 5</span>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Process</th>
                    <th>PID</th>
                    <th>CPU Usage</th>
                    <th>Memory</th>
                  </tr>
                </thead>

                <tbody>
                  {topProcesses.map((process, index) => (
                    <tr key={process.pid}>
                      <td>
                        <span className="rank-badge">
                          #{index + 1}
                        </span>
                      </td>

                      <td>
                        <div className="process-name">
                          <span className="process-avatar">
                            {process.name.charAt(0).toUpperCase()}
                          </span>

                          <strong>{process.name}</strong>
                        </div>
                      </td>

                      <td>{process.pid}</td>

                      <td>{process.cpu}%</td>

                      <td>{process.memory} MB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Report Information */}
      <section className="panel report-information">
        <div className="report-info-icon">ⓘ</div>

        <div>
          <h3>About System Reports</h3>

          <p>
            These reports display sample Linux system monitoring
            statistics for demonstration purposes. Connect the
            monitoring backend to replace sample values with actual
            operating system metrics.
          </p>
        </div>
      </section>

      {/* Report Footer */}
      <section className="report-footer">
        <span>
          Linux File System & Process Management
        </span>

        <span>
          Report period: {range === "7d"
            ? "Last 7 days"
            : range === "30d"
              ? "Last 30 days"
              : "Last 90 days"}
        </span>
      </section>
    </>
  );
}