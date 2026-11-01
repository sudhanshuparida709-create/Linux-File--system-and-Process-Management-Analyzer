import Link from "next/link";

export type NavigationItem = {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  disabled?: boolean;
};

export type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

type SidebarProps = {
  groups?: NavigationGroup[];
  pathname?: string;
  userName?: string;
  userRole?: string;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
  showStatus?: boolean;
  showStorage?: boolean;
};

export default function Sidebar({
  groups = [],
  pathname = "/dashboard",
  userName = "Administrator",
  userRole = "System Admin",
  variant = "desktop",
  onNavigate,
  showStatus = true,
  showStorage = true,
}: SidebarProps) {
  const normalizedPath =
    pathname.length > 1
      ? pathname.replace(/\/+$/, "")
      : pathname;

  const initial = userName.charAt(0).toUpperCase() || "A";

  return (
    <aside
      className={`app-sidebar ${
        variant === "mobile"
          ? "app-sidebar-mobile"
          : "app-sidebar-desktop"
      }`}
    >
      {/* Brand */}
      <Link
        href="/dashboard"
        className="app-brand"
        onClick={onNavigate}
      >
        <div className="app-brand-mark">
          <span>⌘</span>
        </div>

        <div className="app-brand-copy">
          <strong>LINUX</strong>
          <span>System Manager</span>
        </div>
      </Link>

      {/* System Health */}
      {showStatus && (
        <section className="app-sidebar-status">
          <div className="app-sidebar-status-top">
            <div className="app-sidebar-status-icon">
              ◈
            </div>

            <span className="app-live-badge">
              <i />
              LIVE
            </span>
          </div>

          <strong>System Healthy</strong>

          <p>All monitored services are operational.</p>

          <div className="app-status-progress">
            <span />
          </div>

          <div className="app-status-footer">
            <span>System Health</span>
            <strong>96%</strong>
          </div>
        </section>
      )}

      {/* Navigation */}
      <nav
        className="app-sidebar-navigation"
        aria-label="Main navigation"
      >
        {groups.map((group) => (
          <div
            className="app-nav-group"
            key={group.title}
          >
            <span className="app-nav-group-title">
              {group.title}
            </span>

            {group.items.map((item) => {
              const itemPath =
                item.href.length > 1
                  ? item.href.replace(/\/+$/, "")
                  : item.href;

              const isActive = normalizedPath === itemPath;

              return (
                <Link
                  href={item.href}
                  key={item.href}
                  onClick={onNavigate}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  aria-disabled={item.disabled || undefined}
                  tabIndex={item.disabled ? -1 : undefined}
                  className={`app-nav-link ${
                    isActive ? "active" : ""
                  } ${item.disabled ? "disabled" : ""}`}
                  style={
                    item.disabled
                      ? { pointerEvents: "none", opacity: 0.45 }
                      : undefined
                  }
                >
                  <span className="app-nav-icon">
                    {item.icon}
                  </span>

                  <span className="app-nav-label">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="app-nav-badge">
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <span className="app-nav-indicator" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Storage Overview */}
      {showStorage && (
        <section className="app-sidebar-storage">
          <div className="app-storage-heading">
            <span>▣</span>
            <strong>Storage Overview</strong>
          </div>

          <div className="app-storage-value">
            <strong>238 GB</strong>
            <span>of 512 GB</span>
          </div>

          <div
            className="app-storage-progress"
            role="progressbar"
            aria-label="Storage utilization"
            aria-valuenow={46.5}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span />
          </div>

          <div className="app-storage-footer">
            <span>46.5% used</span>
            <span>274 GB free</span>
          </div>

          <Link
            href="/filesystem"
            className="app-storage-link"
            onClick={onNavigate}
          >
            Manage Storage →
          </Link>
        </section>
      )}

      {/* User Profile */}
      <div className="app-sidebar-user">
        <div
          className="app-user-avatar"
          aria-label={`${userName} profile`}
        >
          {initial}
        </div>

        <div className="app-user-copy">
          <strong>{userName}</strong>
          <span>{userRole}</span>
        </div>

        <Link
          href="/settings"
          className="app-sidebar-settings"
          onClick={onNavigate}
          aria-label="Open settings"
          title="Settings"
        >
          ⚙
        </Link>
      </div>

    </aside>
  );
}