const events = [
  {
    icon: "▤",
    tint: "tint-teal",
    title: "File system snapshot completed",
    detail: "A new snapshot was created for /home/admin/documents.",
    time: "09:18 AM",
    tag: "Storage",
  },
  {
    icon: "⌘",
    tint: "tint-violet",
    title: "Process started: node",
    detail: "PID 4821 started under user admin · 124 MB memory allocated.",
    time: "09:06 AM",
    tag: "Process",
  },
  {
    icon: "◉",
    tint: "tint-orange",
    title: "CPU threshold returned to normal",
    detail: "CPU utilization dropped below the configured 70% threshold.",
    time: "08:54 AM",
    tag: "Resource",
  },
  {
    icon: "↻",
    tint: "tint-teal",
    title: "Package index synchronized",
    detail: "Package metadata refreshed successfully.",
    time: "08:32 AM",
    tag: "System",
  },
  {
    icon: "⚙",
    tint: "tint-violet",
    title: "Preferences updated",
    detail: "Notification settings were changed by the administrator.",
    time: "Yesterday",
    tag: "Settings",
  },
  {
    icon: "▦",
    tint: "tint-orange",
    title: "Disk usage warning resolved",
    detail: "Available disk space is back above the 20% safety level.",
    time: "Yesterday",
    tag: "Storage",
  },
];

const stats = [
  {
    label: "Events today",
    value: "28",
    icon: "◷",
    tint: "teal",
    foot: "Across all services",
  },
  {
    label: "Warnings",
    value: "03",
    icon: "△",
    tint: "orange",
    foot: "1 requires attention",
  },
  {
    label: "Successful actions",
    value: "96%",
    icon: "✓",
    tint: "violet",
    foot: "Last 7 days",
  },
];

export default function ActivityPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / Monitoring</div>

          <h1 className="page-title">Activity Log</h1>

          <p className="page-subtitle">
            A chronological view of important system events and operations.
          </p>
        </div>

        <button className="soft-btn">
          ⇩ Export Activity
        </button>
      </section>

      {/* Statistics */}
      <section
        className="stat-grid"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <div className="stat-top">
              <span className="stat-label">{item.label}</span>

              <span className={`stat-icon tint-${item.tint}`}>
                {item.icon}
              </span>
            </div>

            <div className="stat-value">{item.value}</div>

            <div className="stat-foot">{item.foot}</div>
          </article>
        ))}
      </section>

      {/* Activity Events */}
      <section className="panel">
        <div className="section-head">
          <div>
            <h2 className="panel-title">Recent Events</h2>

            <p className="panel-note">
              Latest system activity from all monitored modules
            </p>
          </div>

          <div className="filter-bar">
            <select
              className="input-field"
              aria-label="Filter activity"
              defaultValue="all"
            >
              <option value="all">All Activity</option>
              <option value="storage">Storage</option>
              <option value="process">Process</option>
              <option value="resource">Resource</option>
              <option value="settings">Settings</option>
            </select>

            <select
              className="input-field"
              aria-label="Select period"
              defaultValue="today"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div className="activity-list">
          {events.map((event, index) => (
            <div
              className="activity-item"
              key={`${event.title}-${index}`}
            >
              <div className={`activity-icon ${event.tint}`}>
                {event.icon}
              </div>

              <div className="activity-copy">
                <strong>{event.title}</strong>

                <p>{event.detail}</p>

                <div style={{ marginTop: 8 }}>
                  <span className="pill">{event.tag}</span>
                </div>
              </div>

              <div className="activity-time">{event.time}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            marginTop: 20,
            paddingTop: 17,
            textAlign: "center",
          }}
        >
          <button className="soft-btn">
            Load Older Events ↓
          </button>
        </div>
      </section>
    </>
  );
}