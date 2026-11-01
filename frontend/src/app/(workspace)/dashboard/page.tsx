const metrics = [
  {
    title: "CPU Usage",
    value: "42.8%",
    change: "↓ 5.2%",
    description: "Compared to yesterday",
    icon: "◉",
    tint: "tint-teal",
    progress: 42.8,
  },
  {
    title: "Memory Usage",
    value: "6.4 GB",
    change: "↑ 2.1%",
    description: "Of 16 GB available",
    icon: "▤",
    tint: "tint-violet",
    progress: 40,
  },
  {
    title: "Disk Usage",
    value: "238 GB",
    change: "↑ 1.8%",
    description: "Of 512 GB total",
    icon: "▣",
    tint: "tint-orange",
    progress: 46.5,
  },
  {
    title: "Active Processes",
    value: "128",
    change: "↑ 8",
    description: "Processes currently running",
    icon: "⌘",
    tint: "tint-blue",
    progress: 64,
  },
];

const processes = [
  {
    name: "node",
    pid: "4821",
    user: "admin",
    cpu: "12.4%",
    memory: "248 MB",
    status: "Running",
  },
  {
    name: "chrome",
    pid: "3102",
    user: "apple",
    cpu: "8.2%",
    memory: "512 MB",
    status: "Running",
  },
  {
    name: "postgres",
    pid: "1824",
    user: "postgres",
    cpu: "4.6%",
    memory: "320 MB",
    status: "Running",
  },
  {
    name: "systemd",
    pid: "1001",
    user: "root",
    cpu: "1.2%",
    memory: "48 MB",
    status: "Running",
  },
];

const activities = [
  {
    title: "File system scan completed",
    description: "System directories scanned successfully",
    time: "09:18 AM",
    icon: "▤",
    tint: "tint-teal",
  },
  {
    title: "New process started",
    description: "Node.js process launched",
    time: "09:06 AM",
    icon: "⌘",
    tint: "tint-violet",
  },
  {
    title: "Memory optimization",
    description: "Memory usage returned to normal",
    time: "08:54 AM",
    icon: "◉",
    tint: "tint-orange",
  },
];

const cpuPoints =
  "0,108 28,92 56,97 84,65 112,78 140,50 168,68 196,42 224,59 252,36 280,48 308,23 336,44 364,28 392,38 420,17";

const memoryPoints =
  "0,130 28,125 56,124 84,118 112,116 140,109 168,110 196,102 224,104 252,98 280,95 308,89 336,92 364,84 392,81 420,76";

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / Overview</div>

          <h1 className="page-title">Dashboard</h1>

          <p className="page-subtitle">
            Monitor your Linux system and manage resources from one place.
          </p>
        </div>

        <div className="heading-actions">
          <span className="status-indicator">
            <span className="status-dot" />
            System Online
          </span>

          <a href="/reports" className="soft-btn">
            View Reports ↗
          </a>
        </div>
      </section>

      {/* Welcome Banner */}
      <section className="welcome-card">
        <div className="welcome-content">
          <span className="welcome-label">SYSTEM OVERVIEW</span>

          <h2>Everything is running smoothly.</h2>

          <p>
            Your Linux system is healthy. Monitor resource utilization,
            processes, and storage activity in real time.
          </p>

          <a href="/resources" className="welcome-button">
            Explore Resources →
          </a>
        </div>

        <div className="welcome-illustration" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="terminal-illustration">
            <div className="terminal-header">
              <span />
              <span />
              <span />
            </div>

            <div className="terminal-body">
              <span>$ systemctl status</span>
              <strong>● System active</strong>
              <span>$ uptime</span>
              <strong>09:21:48 up 12 days</strong>
              <span>$ _</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2 className="panel-title">System Overview</h2>

            <p className="panel-note">
              Key performance indicators
            </p>
          </div>

          <span className="updated-text">
            Updated just now
          </span>
        </div>

        <div className="stat-grid">
          {metrics.map((metric) => (
            <article className="stat-card" key={metric.title}>
              <div className="stat-top">
                <span className="stat-label">
                  {metric.title}
                </span>

                <span className={`stat-icon ${metric.tint}`}>
                  {metric.icon}
                </span>
              </div>

              <div className="stat-value">
                {metric.value}
              </div>

              <div className="stat-bottom">
                <span className="metric-change">
                  {metric.change}
                </span>

                <span className="stat-foot">
                  {metric.description}
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Performance Charts */}
      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Performance Overview</h2>

              <p className="panel-note">
                CPU and memory utilization
              </p>
            </div>

            <select
              className="input-field"
              aria-label="Chart time range"
              defaultValue="24h"
            >
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </select>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-dot legend-cpu" />
              CPU Usage
            </span>

            <span>
              <i className="legend-dot legend-memory" />
              Memory Usage
            </span>
          </div>

          <div className="chart-container">
            <svg
              viewBox="0 0 460 180"
              width="100%"
              role="img"
              aria-label="Illustrative CPU and memory utilization trends"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="cpuGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#55b8aa"
                    stopOpacity=".25"
                  />
                  <stop
                    offset="100%"
                    stopColor="#55b8aa"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {[20, 55, 90, 125, 160].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="460"
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity=".1"
                  strokeDasharray="4 5"
                />
              ))}

              <polygon
                points={`0,160 ${cpuPoints} 420,160`}
                fill="url(#cpuGradient)"
                transform="translate(0, 0)"
              />

              <polyline
                points={cpuPoints}
                fill="none"
                stroke="#55b8aa"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <polyline
                points={memoryPoints}
                fill="none"
                stroke="#9b86d7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="420"
                cy="17"
                r="4"
                fill="#55b8aa"
              />

              <circle
                cx="420"
                cy="76"
                r="4"
                fill="#9b86d7"
              />
            </svg>
          </div>

          <div className="chart-labels">
            <span>12 AM</span>
            <span>04 AM</span>
            <span>08 AM</span>
            <span>12 PM</span>
            <span>04 PM</span>
            <span>08 PM</span>
          </div>

          <div className="chart-summary">
            <div>
              <span>Current CPU</span>
              <strong>42.8%</strong>
            </div>

            <div>
              <span>Current Memory</span>
              <strong>40.0%</strong>
            </div>

            <div>
              <span>Peak CPU</span>
              <strong>76.4%</strong>
            </div>
          </div>
        </article>

        {/* Resource Breakdown */}
        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Resource Breakdown</h2>

              <p className="panel-note">
                Current system utilization
              </p>
            </div>

            <a href="/resources" className="text-link">
              Details →
            </a>
          </div>

          <div className="resource-list">
            <div className="resource-item">
              <div className="resource-header">
                <div className="resource-name">
                  <span className="resource-icon tint-teal">◉</span>
                  <strong>CPU</strong>
                </div>

                <strong>42.8%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: "42.8%" }}
                />
              </div>

              <span className="resource-description">
                4 cores · Normal load
              </span>
            </div>

            <div className="resource-item">
              <div className="resource-header">
                <div className="resource-name">
                  <span className="resource-icon tint-violet">▤</span>
                  <strong>Memory</strong>
                </div>

                <strong>40%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill progress-violet"
                  style={{ width: "40%" }}
                />
              </div>

              <span className="resource-description">
                6.4 GB / 16 GB
              </span>
            </div>

            <div className="resource-item">
              <div className="resource-header">
                <div className="resource-name">
                  <span className="resource-icon tint-orange">▣</span>
                  <strong>Storage</strong>
                </div>

                <strong>46.5%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill progress-orange"
                  style={{ width: "46.5%" }}
                />
              </div>

              <span className="resource-description">
                238 GB / 512 GB
              </span>
            </div>

            <div className="resource-item">
              <div className="resource-header">
                <div className="resource-name">
                  <span className="resource-icon tint-blue">⇅</span>
                  <strong>Network</strong>
                </div>

                <strong>28.2%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill progress-blue"
                  style={{ width: "28.2%" }}
                />
              </div>

              <span className="resource-description">
                28.2 Mbps current throughput
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* Processes and Activity */}
      <section className="dashboard-grid">
        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Top Processes</h2>

              <p className="panel-note">
                Highest resource-consuming processes
              </p>
            </div>

            <a href="/processes" className="text-link">
              View All →
            </a>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
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
                {processes.map((process) => (
                  <tr key={process.pid}>
                    <td>
                      <div className="process-name">
                        <span className="process-avatar">
                          {process.name.charAt(0).toUpperCase()}
                        </span>

                        <div>
                          <strong>{process.name}</strong>
                          <small>{process.user}</small>
                        </div>
                      </div>
                    </td>

                    <td>{process.pid}</td>

                    <td>{process.cpu}</td>

                    <td>{process.memory}</td>

                    <td>
                      <span className="status-badge">
                        <span className="status-dot" />
                        {process.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Activity Feed */}
        <article className="panel">
          <div className="section-head">
            <div>
              <h2 className="panel-title">Recent Activity</h2>

              <p className="panel-note">
                Latest system events
              </p>
            </div>

            <a href="/activity" className="text-link">
              View All →
            </a>
          </div>

          <div className="recent-activity-list">
            {activities.map((activity) => (
              <div
                className="recent-activity-item"
                key={activity.title}
              >
                <div className={`activity-icon ${activity.tint}`}>
                  {activity.icon}
                </div>

                <div className="recent-activity-copy">
                  <strong>{activity.title}</strong>

                  <p>{activity.description}</p>
                </div>

                <time>{activity.time}</time>
              </div>
            ))}
          </div>

          <a href="/activity" className="activity-footer-link">
            Explore activity history →
          </a>
        </article>
      </section>

      {/* Quick Actions */}
      <section className="panel quick-actions-panel">
        <div className="section-head">
          <div>
            <h2 className="panel-title">Quick Actions</h2>

            <p className="panel-note">
              Navigate to frequently used system tools
            </p>
          </div>
        </div>

        <div className="quick-actions-grid">
          <a href="/filesystem" className="quick-action">
            <span className="quick-action-icon tint-teal">▤</span>

            <span>
              <strong>File System</strong>
              <small>Browse directories</small>
            </span>

            <span className="quick-arrow">↗</span>
          </a>

          <a href="/processes" className="quick-action">
            <span className="quick-action-icon tint-violet">⌘</span>

            <span>
              <strong>Processes</strong>
              <small>Manage processes</small>
            </span>

            <span className="quick-arrow">↗</span>
          </a>

          <a href="/resources" className="quick-action">
            <span className="quick-action-icon tint-orange">◉</span>

            <span>
              <strong>Resources</strong>
              <small>Monitor performance</small>
            </span>

            <span className="quick-arrow">↗</span>
          </a>

          <a href="/reports" className="quick-action">
            <span className="quick-action-icon tint-blue">▥</span>

            <span>
              <strong>Reports</strong>
              <small>View system reports</small>
            </span>

            <span className="quick-arrow">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}