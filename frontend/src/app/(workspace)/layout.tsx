"use client";
import { useAuth } from "@/features/auth/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type NavigationItem = {
  label: string;
  href: string;
  icon: string;
};

const navigationGroups: {
  title: string;
  items: NavigationItem[];
}[] = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "▦" },
      { label: "File System", href: "/filesystem", icon: "▤" },
      { label: "Processes", href: "/processes", icon: "⌘" },
    ],
  },
  {
    title: "MONITORING",
    items: [
      { label: "Resources", href: "/resources", icon: "◉" },
      { label: "Reports", href: "/reports", icon: "▥" },
      { label: "Activity", href: "/activity", icon: "◷" },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      { label: "Settings", href: "/settings", icon: "⚙" },
    ],
  },
];

const allNavigationItems = navigationGroups.flatMap(
  (group) => group.items
);

function getPageTitle(pathname: string) {
  return (
    allNavigationItems.find((item) => item.href === pathname)?.label ||
    "Dashboard"
  );
}

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

const accountName = isLoading
  ? "Loading..."
  : user?.name || "User";

const accountRole =
  user?.role === "admin" ? "System Admin" : "Standard User";

const accountType =
  user?.role === "admin" ? "Admin Account" : "User Account";

const accountInitial =
  user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const pageTitle = getPageTitle(pathname);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    return allNavigationItems.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Initialize saved appearance preference.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "linux-dashboard-settings"
      );

      if (saved) {
        const preferences = JSON.parse(saved);
        const theme = preferences.theme || "light";

        const useDark =
          theme === "dark" ||
          (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

        setDarkMode(useDark);
      }
    } catch {
      setDarkMode(false);
    }
  }, []);

  // Apply appearance.
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Close the mobile sidebar after navigation.
  useEffect(() => {
    setSidebarOpen(false);
    setSearch("");
    setSearchOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setSearchOpen(true);
  };

  return (
    <div className="workspace-shell">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`workspace-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Brand */}
        <Link href="/dashboard" className="brand-container">
          <div className="brand-logo">
            <span>⌘</span>
          </div>

          <div className="brand-text">
            <strong>LINUX</strong>
            <span>System Manager</span>
          </div>
        </Link>

        {/* Sidebar Status */}
        <div className="sidebar-system-card">
          <div className="sidebar-system-top">
            <div className="system-status-icon">
              ◈
            </div>

            <span className="system-live-badge">
              <i />
              LIVE
            </span>
          </div>

          <strong>System Healthy</strong>

          <p>All services are operational.</p>

          <div className="sidebar-system-progress">
            <span />
          </div>

          <div className="sidebar-system-footer">
            <span>System Health</span>
            <strong>96%</strong>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-navigation">
          {navigationGroups.map((group) => (
            <div
              className="navigation-group"
              key={group.title}
            >
              <span className="navigation-group-title">
                {group.title}
              </span>

              {group.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={`sidebar-nav-link ${
                      active ? "active" : ""
                    }`}
                    aria-current={
                      active ? "page" : undefined
                    }
                  >
                    <span className="sidebar-nav-icon">
                      {item.icon}
                    </span>

                    <span className="sidebar-nav-label">
                      {item.label}
                    </span>

                    {active && (
                      <span className="sidebar-active-indicator" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Storage Card */}
        <div className="sidebar-storage-card">
          <div className="sidebar-storage-heading">
            <span>▣</span>
            <strong>Storage</strong>
          </div>

          <div className="sidebar-storage-value">
            <strong>238 GB</strong>
            <span>of 512 GB</span>
          </div>

          <div className="sidebar-storage-progress">
            <span />
          </div>

          <div className="sidebar-storage-footer">
            <span>46.5% used</span>
            <span>274 GB free</span>
          </div>

          <Link
            href="/filesystem"
            className="sidebar-storage-link"
          >
            Manage Storage →
          </Link>
        </div>

        {/* Sidebar Footer */}
        {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user-avatar">
          {isLoading ? "..." : accountInitial}
          <span />
        </div>

        <div className="sidebar-user-info">
          <strong title={accountName}>{accountName}</strong>
          <span>{isLoading ? "Loading account..." : accountRole}</span>
        </div>

        <Link
          href="/settings"
          className="sidebar-user-settings"
          aria-label="Account settings"
          title="Account settings"
        >
          ⚙
        </Link>
      </div>
      </aside>

      {/* Main Workspace */}
      <div className="workspace-content">

        {/* Top Navigation */}
        <header className="workspace-topbar">

          <div className="topbar-left">
            <button
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              ☰
            </button>

            <div className="topbar-breadcrumb">
              <span>Workspace</span>
              <span className="breadcrumb-divider">/</span>
              <strong>{pageTitle}</strong>
            </div>
          </div>

          <div className="topbar-right">

            {/* Search */}
            <div className="topbar-search-container">
              <div className="topbar-search">
                <span>⌕</span>

                <input
                  type="search"
                  placeholder="Search workspace..."
                  value={search}
                  onChange={(event) =>
                    handleSearch(event.target.value)
                  }
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setSearch("");
                      setSearchOpen(false);
                    }

                    if (
                      event.key === "Enter" &&
                      searchResults.length > 0
                    ) {
                      window.location.href =
                        searchResults[0].href;
                    }
                  }}
                  aria-label="Search workspace pages"
                />

                <kbd>⌘ K</kbd>
              </div>

              {searchOpen && search.trim() && (
                <div className="search-dropdown">
                  <div className="search-dropdown-title">
                    NAVIGATION RESULTS
                  </div>

                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="search-result"
                      >
                        <span>{item.icon}</span>
                        <strong>{item.label}</strong>
                        <span>↗</span>
                      </Link>
                    ))
                  ) : (
                    <div className="search-no-result">
                      No matching pages found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme */}
            <button
              className="topbar-icon-button"
              onClick={toggleTheme}
              title={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-label="Toggle color theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            {/* Notifications */}
            <div className="notification-container">
              <button
                className="topbar-icon-button notification-button"
                onClick={() =>
                  setNotificationOpen((previous) => !previous)
                }
                title="Notifications"
                aria-label="Open notifications"
                aria-expanded={notificationOpen}
              >
                ♢
                <span className="notification-dot" />
              </button>

              {notificationOpen && (
                <div className="notification-dropdown">
                  <div className="notification-dropdown-header">
                    <strong>Notifications</strong>

                    <button
                      onClick={() => setNotificationOpen(false)}
                      aria-label="Close notifications"
                    >
                      ×
                    </button>
                  </div>

                  <div className="notification-item">
                    <span className="notification-item-icon tint-teal">
                      ✓
                    </span>

                    <div>
                      <strong>System is healthy</strong>
                      <p>All monitored resources are operational.</p>
                      <small>Just now</small>
                    </div>
                  </div>

                  <div className="notification-item">
                    <span className="notification-item-icon tint-violet">
                      ▤
                    </span>

                    <div>
                      <strong>File system scan</strong>
                      <p>Directory scan completed successfully.</p>
                      <small>12 minutes ago</small>
                    </div>
                  </div>

                  <div className="notification-item">
                    <span className="notification-item-icon tint-orange">
                      ◉
                    </span>

                    <div>
                      <strong>Resource monitoring</strong>
                      <p>CPU utilization is within normal range.</p>
                      <small>25 minutes ago</small>
                    </div>
                  </div>

                  <Link
                    href="/activity"
                    className="notification-footer-link"
                    onClick={() => setNotificationOpen(false)}
                  >
                    View All Activity →
                  </Link>
                </div>
              )}
            </div>

            {/* Profile */}
            {/* Profile */}
          <Link
            href="/settings"
            className="topbar-profile"
            title="Account settings"
          >
            <div className="topbar-profile-avatar">
              {isLoading ? "..." : accountInitial}
            </div>

            <div className="topbar-profile-info">
              <strong title={accountName}>{accountName}</strong>
              <span>{isLoading ? "Loading account..." : accountType}</span>
            </div>

            <span className="profile-chevron">⌄</span>
          </Link>

          </div>
        </header>

        {/* Page Content */}
        <main
          className="workspace-main"
          onClick={() => {
            if (searchOpen) setSearchOpen(false);
          }}
        >
          {children}
        </main>

        {/* Workspace Footer */}
        <footer className="workspace-footer">
          <div className="footer-left">
            <span className="footer-status-dot" />
            <span>System Operational</span>
          </div>

          <div className="footer-right">
            <span>Linux System Manager</span>
            <span className="footer-divider">·</span>
            <span>Version 1.0.0</span>
            <span className="footer-divider">·</span>
            <span>© 2026</span>
          </div>
        </footer>
      </div>

      {/* Workspace Global Styles */}
      <style jsx global>{`

        /* ========================================
           CLAYMORPHISM DESIGN SYSTEM
        ======================================== */

        :root {
          --bg: #e9edf3;
          --surface: #edf1f6;
          --panel: #edf1f6;
          --panel-hover: #f2f5f9;

          --text: #263345;
          --muted: #8994a6;
          --line: #dce2ea;

          --track: #dce2ea;
          --teal: #65b9aa;
          --violet: #9b87d7;
          --orange: #e5a66e;
          --blue: #7da9d9;

          --shadow-out:
            7px 7px 15px #cbd2dc,
            -7px -7px 15px #ffffff;

          --shadow-soft:
            4px 4px 9px #cfd6df,
            -4px -4px 9px #ffffff;

          --shadow-in:
            inset 4px 4px 8px #cbd2dc,
            inset -4px -4px 8px #ffffff;

          --shadow-small:
            3px 3px 7px #cfd6df,
            -3px -3px 7px #ffffff;

          --radius: 18px;
          --radius-large: 24px;
        }

        [data-theme="dark"] {
          --bg: #171d28;
          --surface: #1d2634;
          --panel: #1d2634;
          --panel-hover: #273344;

          --text: #edf2fa;
          --muted: #9baabe;
          --line: #303c4d;

          --track: #303c4d;

          --shadow-out:
            7px 7px 15px #111720,
            -7px -7px 15px #293546;

          --shadow-soft:
            4px 4px 9px #111720,
            -4px -4px 9px #293546;

          --shadow-in:
            inset 4px 4px 8px #111720,
            inset -4px -4px 8px #293546;

          --shadow-small:
            3px 3px 7px #111720,
            -3px -3px 7px #293546;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: var(--bg);
          color: var(--text);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        body {
          min-height: 100vh;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        ::selection {
          background: #65b9aa40;
          color: var(--text);
        }

        /* ========================================
           WORKSPACE SHELL
        ======================================== */

        .workspace-shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg);
        }

        .workspace-sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          z-index: 100;
          width: 265px;
          display: flex;
          flex-direction: column;
          padding: 24px 17px 16px;
          background: var(--surface);
          border-right: 1px solid var(--line);
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .workspace-content {
          width: calc(100% - 265px);
          min-width: 0;
          min-height: 100vh;
          margin-left: 265px;
          display: flex;
          flex-direction: column;
        }

        .workspace-main {
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
          padding: 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 23px;
        }

        /* ========================================
           BRAND
        ======================================== */

        .brand-container {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 5px;
          margin-bottom: 27px;
        }

        .brand-logo {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: #ffffff;
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(145deg, #78cbbb, #479d91);
          box-shadow:
            5px 5px 10px #c5d0d5,
            -4px -4px 9px #ffffff;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-text strong {
          font-size: 17px;
          letter-spacing: 2px;
          font-weight: 850;
          color: var(--text);
        }

        .brand-text span {
          color: var(--muted);
          font-size: 11px;
        }

        /* ========================================
           SIDEBAR SYSTEM CARD
        ======================================== */

        .sidebar-system-card {
          padding: 16px;
          margin-bottom: 25px;
          border-radius: 18px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .sidebar-system-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 13px;
        }

        .system-status-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          font-size: 20px;
          color: var(--teal);
          background: var(--surface);
          box-shadow: var(--shadow-small);
        }

        .system-live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 30px;
          color: #399b83;
          background: #65b9aa20;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .system-live-badge i,
        .footer-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #55b99b;
          display: inline-block;
        }

        .sidebar-system-card > strong {
          display: block;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .sidebar-system-card > p {
          font-size: 10px;
          color: var(--muted);
          margin: 0 0 13px;
        }

        .sidebar-system-progress,
        .sidebar-storage-progress {
          height: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .sidebar-system-progress span {
          display: block;
          width: 96%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #65b9aa, #81cbb5);
        }

        .sidebar-system-footer {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          margin-top: 9px;
          color: var(--muted);
        }

        .sidebar-system-footer strong {
          color: #46a58f;
        }

        /* ========================================
           SIDEBAR NAVIGATION
        ======================================== */

        .sidebar-navigation {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .navigation-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .navigation-group-title,
        .settings-nav-label {
          padding: 0 11px;
          margin-bottom: 7px;
          color: var(--muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .sidebar-nav-link {
          min-height: 44px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 12px;
          border-radius: 13px;
          position: relative;
          color: var(--muted);
          font-size: 12px;
          font-weight: 600;
          transition: background .2s, color .2s, transform .2s;
        }

        .sidebar-nav-link:hover {
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          transform: translateX(2px);
        }

        .sidebar-nav-link.active {
          color: #399c8e;
          background: var(--surface);
          box-shadow: var(--shadow-in);
          font-weight: 750;
        }

        .sidebar-nav-icon {
          width: 23px;
          height: 23px;
          display: grid;
          place-items: center;
          font-size: 18px;
        }

        .sidebar-active-indicator {
          width: 4px;
          height: 20px;
          position: absolute;
          left: 0;
          border-radius: 0 5px 5px 0;
          background: var(--teal);
        }

        /* ========================================
           SIDEBAR STORAGE
        ======================================== */

        .sidebar-storage-card {
          padding: 15px;
          margin-top: auto;
          margin-bottom: 16px;
          border-radius: 17px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .sidebar-storage-heading,
        .sidebar-storage-value,
        .sidebar-storage-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sidebar-storage-heading {
          justify-content: flex-start;
          gap: 9px;
          font-size: 12px;
        }

        .sidebar-storage-heading span {
          color: var(--teal);
          font-size: 18px;
        }

        .sidebar-storage-value {
          margin: 13px 0 9px;
          align-items: baseline;
        }

        .sidebar-storage-value strong {
          font-size: 18px;
        }

        .sidebar-storage-value span,
        .sidebar-storage-footer {
          color: var(--muted);
          font-size: 9px;
        }

        .sidebar-storage-progress span {
          width: 46.5%;
          height: 100%;
          display: block;
          border-radius: inherit;
          background: linear-gradient(90deg, #9b87d7, #b8a5e7);
        }

        .sidebar-storage-footer {
          margin-top: 8px;
        }

        .sidebar-storage-link {
          display: block;
          margin-top: 13px;
          color: #4b9d91;
          font-size: 10px;
          font-weight: 750;
        }

        /* ========================================
           USER FOOTER
        ======================================== */

        .sidebar-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 15px;
          border-top: 1px solid var(--line);
        }

        .sidebar-user-avatar,
        .topbar-profile-avatar {
          position: relative;
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 13px;
          color: #fff;
          background: linear-gradient(145deg, #9d8ed7, #7566b8);
          font-size: 14px;
          font-weight: 800;
        }

        .sidebar-user-avatar > span {
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 10px;
          height: 10px;
          border: 2px solid var(--surface);
          border-radius: 50%;
          background: #56bd9b;
        }

        .sidebar-user-info {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-user-info strong,
        .topbar-profile-info strong {
          font-size: 11px;
        }

        .sidebar-user-info span,
        .topbar-profile-info span {
          font-size: 9px;
          color: var(--muted);
        }

        .sidebar-user-settings {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-small);
        }

        /* ========================================
           TOPBAR
        ======================================== */

        .workspace-topbar {
          height: 76px;
          padding: 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--surface);
          border-bottom: 1px solid var(--line);
        }

        .topbar-left,
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .topbar-breadcrumb {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 12px;
        }

        .topbar-breadcrumb > span:first-child {
          color: var(--muted);
        }

        .breadcrumb-divider {
          color: var(--muted);
        }

        .topbar-breadcrumb strong {
          font-weight: 750;
        }

        .topbar-search-container,
        .notification-container {
          position: relative;
        }

        .topbar-search {
          width: 250px;
          height: 41px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 11px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .topbar-search > span {
          color: var(--muted);
          font-size: 21px;
        }

        .topbar-search input {
          min-width: 0;
          flex: 1;
          background: transparent;
          border: 0;
          outline: 0;
          color: var(--text);
          font-size: 10px;
        }

        .topbar-search kbd {
          padding: 4px 6px;
          border-radius: 5px;
          background: var(--surface);
          color: var(--muted);
          box-shadow: var(--shadow-small);
          font-size: 8px;
        }

        .topbar-search input::placeholder {
          color: var(--muted);
        }

        .topbar-icon-button {
          position: relative;
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 13px;
          background: var(--surface);
          color: var(--text);
          box-shadow: var(--shadow-soft);
          font-size: 19px;
          transition: transform .2s;
        }

        .topbar-icon-button:hover {
          transform: translateY(-2px);
        }

        .notification-dot {
          width: 7px;
          height: 7px;
          position: absolute;
          top: 8px;
          right: 8px;
          border: 1px solid var(--surface);
          border-radius: 50%;
          background: #e98a7c;
        }

        .topbar-profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .topbar-profile-avatar {
          width: 36px;
          height: 36px;
        }

        .topbar-profile-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-chevron {
          color: var(--muted);
          font-size: 14px;
          margin-left: 3px;
        }

        /* ========================================
           SEARCH DROPDOWN
        ======================================== */

        .search-dropdown,
        .notification-dropdown {
          position: absolute;
          top: calc(100% + 13px);
          right: 0;
          z-index: 200;
          width: 280px;
          padding: 13px;
          border: 1px solid var(--line);
          border-radius: 17px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .search-dropdown-title {
          padding: 7px;
          color: var(--muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .search-result {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px;
          border-radius: 10px;
          color: var(--text);
          font-size: 11px;
        }

        .search-result:hover {
          background: var(--panel-hover);
        }

        .search-result > span:first-child {
          color: var(--teal);
          font-size: 17px;
        }

        .search-result strong {
          flex: 1;
        }

        .search-no-result {
          padding: 17px 8px;
          color: var(--muted);
          font-size: 11px;
        }

        /* ========================================
           NOTIFICATIONS
        ======================================== */

        .notification-dropdown {
          width: 310px;
        }

        .notification-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 5px 12px;
          border-bottom: 1px solid var(--line);
        }

        .notification-dropdown-header strong {
          font-size: 13px;
        }

        .notification-dropdown-header button {
          border: 0;
          background: transparent;
          color: var(--muted);
          font-size: 21px;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 13px 5px;
          border-bottom: 1px solid var(--line);
        }

        .notification-item-icon {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
        }

        .notification-item > div {
          flex: 1;
        }

        .notification-item strong {
          font-size: 11px;
        }

        .notification-item p {
          margin: 4px 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .notification-item small {
          color: var(--muted);
          font-size: 9px;
        }

        .notification-footer-link {
          display: block;
          padding: 12px 5px 3px;
          color: #55a99a;
          text-align: center;
          font-size: 10px;
          font-weight: 750;
        }

        /* ========================================
           FOOTER
        ======================================== */

        .workspace-footer {
          min-height: 51px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 30px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 10px;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-right {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .footer-divider {
          color: var(--line);
        }

        .mobile-menu-button {
          display: none;
        }

        .sidebar-overlay {
          display: none;
        }

        /* ========================================
           COMMON PAGE ELEMENTS
        ======================================== */

        .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .eyebrow {
          margin-bottom: 9px;
          color: var(--muted);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .page-title {
          margin: 0;
          color: var(--text);
          font-size: 27px;
          letter-spacing: -.8px;
          font-weight: 800;
        }

        .page-subtitle {
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .heading-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .soft-btn,
        .primary-btn,
        .danger-btn {
          min-height: 39px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: transform .2s, opacity .2s;
        }

        .soft-btn {
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .primary-btn {
          color: #ffffff;
          background: linear-gradient(135deg, #65b9aa, #439f90);
          box-shadow: 4px 4px 9px #cbd2dc;
        }

        .danger-btn {
          color: #cf655e;
          background: #e98b831a;
          box-shadow: var(--shadow-soft);
        }

        .soft-btn:hover,
        .primary-btn:hover,
        .danger-btn:hover {
          transform: translateY(-2px);
        }

        .panel,
        .stat-card {
          min-width: 0;
          padding: 20px;
          border-radius: var(--radius);
          background: var(--panel);
          box-shadow: var(--shadow-out);
        }

        .panel-title {
          margin: 0;
          font-size: 14px;
          font-weight: 780;
        }

        .panel-note {
          margin: 6px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.6;
        }

        .section-head,
        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .section-heading {
          margin-bottom: 14px;
        }

        .updated-text {
          color: var(--muted);
          font-size: 10px;
        }

        .text-link {
          color: #4b9d91;
          font-size: 10px;
          font-weight: 750;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        /* ========================================
           STAT CARDS
        ======================================== */

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
          color: var(--text);
        }

        .stat-top,
        .stat-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .stat-label {
          color: var(--muted);
          font-size: 10px;
          font-weight: 650;
        }

        .stat-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          font-size: 19px;
        }

        .tint-teal {
          color: #429d8e;
          background: #65b9aa20;
        }

        .tint-violet {
          color: #917acb;
          background: #9b87d720;
        }

        .tint-orange {
          color: #d99a5c;
          background: #e5a66e24;
        }

        .tint-blue {
          color: #6799d0;
          background: #7da9d924;
        }

        .stat-value {
          color: var(--text);
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -.7px;
        }

        .stat-foot {
          color: var(--muted);
          font-size: 9px;
        }

        .metric-change {
          color: #439f88;
          font-size: 10px;
          font-weight: 750;
        }

        .progress-track {
          height: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .progress-fill {
          height: 100%;
          display: block;
          border-radius: inherit;
          background: linear-gradient(90deg, #65b9aa, #9dd5c3);
        }

        .progress-violet {
          background: linear-gradient(90deg, #9b87d7, #b9a8e8);
        }

        .progress-orange {
          background: linear-gradient(90deg, #e5a66e, #f0c28e);
        }

        .progress-blue {
          background: linear-gradient(90deg, #7da9d9, #a1bde1);
        }

        /* ========================================
           STATUS LABELS
        ======================================== */

        .status-indicator,
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #439c87;
          font-size: 10px;
          font-weight: 700;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          display: inline-block;
          border-radius: 50%;
          background: #52ba98;
        }

        .status-badge {
          padding: 6px 9px;
          border-radius: 20px;
          background: #65b9aa1a;
          font-size: 9px;
          white-space: nowrap;
        }

        .process-sleeping {
          color: #c58d4b;
          background: #e5a66e20;
        }

        .process-sleeping .status-dot {
          background: #e5a66e;
        }

        .process-stopped {
          color: #d46d6d;
          background: #e98b831c;
        }

        .process-stopped .status-dot {
          background: #d46d6d;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 20px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          font-size: 9px;
          font-weight: 700;
        }

        .pill-success {
          color: #429e89;
          background: #65b9aa1c;
        }

        /* ========================================
           TABLES
        ======================================== */

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          text-align: left;
          white-space: nowrap;
        }

        .data-table th {
          padding: 14px 12px;
          color: var(--muted);
          background: var(--surface);
          font-size: 9px;
          font-weight: 750;
          letter-spacing: .4px;
        }

        .data-table th:first-child {
          border-radius: 9px 0 0 9px;
        }

        .data-table th:last-child {
          border-radius: 0 9px 9px 0;
        }

        .data-table td {
          padding: 13px 12px;
          border-bottom: 1px solid var(--line);
          color: var(--muted);
          font-size: 10px;
        }

        .data-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .data-table tbody tr:hover {
          background: #65b9aa0b;
        }

        .process-name {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .process-name > div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .process-name strong {
          color: var(--text);
          font-size: 10px;
        }

        .process-name small {
          font-size: 9px;
          color: var(--muted);
        }

        .process-avatar {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: #469e91;
          background: #65b9aa22;
          font-size: 11px;
          font-weight: 800;
        }

        .permission-code {
          color: var(--muted);
          font-family: ui-monospace, monospace;
          font-size: 9px;
        }

        .table-sort-button {
          border: 0;
          padding: 0;
          color: inherit;
          background: transparent;
          font-size: inherit;
          font-weight: inherit;
        }

        /* ========================================
           INPUTS
        ======================================== */

        .input-field {
          min-height: 38px;
          min-width: 0;
          padding: 0 11px;
          border: 1px solid var(--line);
          outline: none;
          border-radius: 10px;
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-in);
          font-size: 10px;
        }

        .input-field:focus,
        .explorer-search:focus-within {
          border-color: #65b9aa;
        }

        .input-field option {
          color: var(--text);
          background: var(--surface);
        }

        .filter-bar {
          display: flex;
          gap: 8px;
        }

        /* ========================================
           CHARTS
        ======================================== */

        .chart-container,
        .report-chart,
        .resource-graph {
          min-width: 0;
          margin-top: 15px;
        }

        .chart-container svg,
        .report-chart svg,
        .resource-graph svg {
          display: block;
          overflow: visible;
        }

        .chart-legend,
        .storage-legend,
        .memory-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 19px;
          color: var(--muted);
          font-size: 10px;
        }

        .chart-legend {
          margin-top: 18px;
        }

        .chart-legend span,
        .storage-legend span,
        .memory-legend span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
        }

        .legend-cpu {
          background: #65b9aa;
        }

        .legend-memory {
          background: #9b87d7;
        }

        .legend-orange {
          background: #e5a66e;
        }

        .legend-blue {
          background: #7da9d9;
        }

        .chart-labels,
        .resource-x-axis,
        .report-x-axis {
          display: flex;
          justify-content: space-between;
          gap: 6px;
          color: var(--muted);
          font-size: 9px;
        }

        .chart-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }

        .chart-summary > div {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .chart-summary span {
          color: var(--muted);
          font-size: 9px;
        }

        .chart-summary strong {
          font-size: 15px;
        }

        /* ========================================
           DASHBOARD GRID
        ======================================== */

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .dashboard-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .resource-list,
        .report-detail-list {
          display: flex;
          flex-direction: column;
          gap: 21px;
          margin-top: 20px;
        }

        .resource-item {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .resource-header,
        .resource-name,
        .report-detail-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .resource-header strong,
        .report-detail-heading strong {
          font-size: 11px;
        }

        .resource-name {
          justify-content: flex-start;
        }

        .resource-icon {
          width: 27px;
          height: 27px;
          display: grid;
          place-items: center;
          border-radius: 9px;
        }

        .resource-name strong {
          font-size: 10px;
        }

        .resource-description,
        .report-detail-item small {
          color: var(--muted);
          font-size: 9px;
        }

        /* ========================================
           ACTIVITY
        ======================================== */

        .activity-list,
        .recent-activity-list {
          display: flex;
          flex-direction: column;
        }

        .activity-item,
        .recent-activity-item {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 17px 0;
          border-bottom: 1px solid var(--line);
        }

        .activity-item:last-child,
        .recent-activity-item:last-child {
          border-bottom: 0;
        }

        .activity-icon {
          width: 37px;
          height: 37px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          font-size: 17px;
        }

        .activity-copy {
          flex: 1;
          min-width: 0;
        }

        .activity-copy strong,
        .recent-activity-copy strong {
          font-size: 11px;
        }

        .activity-copy p,
        .recent-activity-copy p {
          margin: 6px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.6;
        }

        .activity-time,
        .recent-activity-item time {
          color: var(--muted);
          font-size: 9px;
          white-space: nowrap;
        }

        .recent-activity-copy {
          flex: 1;
          min-width: 0;
        }

        .activity-footer-link {
          display: block;
          padding-top: 14px;
          text-align: center;
          color: #4b9d91;
          font-size: 10px;
          font-weight: 750;
        }

        /* ========================================
           WELCOME BANNER
        ======================================== */

        .welcome-card {
          min-height: 215px;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 29px 35px;
          border-radius: 23px;
          color: white;
          background: linear-gradient(120deg, #468f87, #68b8a7 60%, #93cbbb);
          box-shadow: 7px 9px 18px #bfcfca;
        }

        .welcome-content {
          position: relative;
          z-index: 2;
          max-width: 510px;
        }

        .welcome-label {
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 2px;
          opacity: .75;
        }

        .welcome-card h2 {
          margin: 13px 0 9px;
          font-size: 24px;
        }

        .welcome-card p {
          max-width: 420px;
          color: #eefbf7;
          font-size: 11px;
          line-height: 1.7;
        }

        .welcome-button {
          display: inline-flex;
          margin-top: 13px;
          padding: 11px 15px;
          border-radius: 10px;
          color: #367e74;
          background: #ffffff;
          font-size: 10px;
          font-weight: 800;
        }

        .welcome-illustration {
          width: 270px;
          height: 170px;
          position: relative;
          display: grid;
          place-items: center;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          background: #ffffff15;
        }

        .orb-one {
          width: 170px;
          height: 170px;
          right: 5px;
        }

        .orb-two {
          width: 110px;
          height: 110px;
          left: 5px;
          bottom: 0;
        }

        .terminal-illustration {
          width: 220px;
          position: relative;
          z-index: 2;
          overflow: hidden;
          border: 1px solid #ffffff65;
          border-radius: 14px;
          background: #284f5050;
          box-shadow: 7px 9px 20px #345d5a60;
          backdrop-filter: blur(10px);
        }

        .terminal-header {
          height: 28px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 10px;
          border-bottom: 1px solid #ffffff25;
        }

        .terminal-header span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff99;
        }

        .terminal-body {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 12px;
          font-family: monospace;
          font-size: 9px;
        }

        .terminal-body strong {
          color: #a4efd4;
        }

        /* ========================================
           FILESYSTEM
        ======================================== */

        .filesystem-layout {
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr) 215px;
          align-items: start;
          gap: 16px;
        }

        .directory-panel,
        .file-details-panel {
          padding: 16px;
        }

        .directory-link {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 9px;
          min-height: 39px;
          margin-top: 4px;
          padding: 0 8px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: var(--muted);
          text-align: left;
          font-size: 9px;
        }

        .directory-link:hover,
        .directory-link.active {
          color: #499b8e;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .directory-link > span:nth-child(2) {
          flex: 1;
        }

        .directory-icon {
          width: 22px;
          color: var(--teal);
          text-align: center;
          font-size: 15px;
        }

        .directory-arrow,
        .directory-menu {
          color: var(--muted);
        }

        .directory-group-label {
          margin-top: 22px;
          padding: 0 8px;
          color: var(--muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .directory-bottom {
          margin-top: 26px;
          padding: 13px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .directory-bottom-icon {
          color: var(--teal);
          font-size: 19px;
          margin-bottom: 8px;
        }

        .directory-bottom strong {
          display: block;
          font-size: 10px;
        }

        .directory-bottom p,
        .directory-bottom small {
          color: var(--muted);
          font-size: 9px;
        }

        .directory-bottom .progress-track {
          margin: 10px 0;
        }

        .explorer-panel {
          min-width: 0;
          padding: 19px;
        }

        .explorer-header {
          margin-bottom: 20px;
        }

        .view-toggle {
          display: flex;
          padding: 4px;
          gap: 3px;
          border-radius: 10px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .view-toggle button {
          width: 29px;
          height: 28px;
          border: 0;
          border-radius: 7px;
          color: var(--muted);
          background: transparent;
        }

        .view-toggle button.selected {
          color: #469c8d;
          background: var(--surface);
          box-shadow: var(--shadow-small);
        }

        .breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 7px;
          margin-bottom: 16px;
          color: var(--muted);
          font-size: 9px;
        }

        .breadcrumb button {
          padding: 3px;
          border: 0;
          color: inherit;
          background: transparent;
          font-size: inherit;
        }

        .breadcrumb button:hover,
        .breadcrumb-current {
          color: #4b9d91 !important;
          font-weight: 800;
        }

        .breadcrumb-part {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .explorer-toolbar,
        .process-toolbar {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 17px;
        }

        .explorer-search {
          min-height: 38px;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          padding: 0 10px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .explorer-search > span {
          color: var(--muted);
          font-size: 19px;
        }

        .explorer-search input {
          min-width: 0;
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text);
          font-size: 9px;
        }

        .explorer-search input::placeholder {
          color: var(--muted);
        }

        .sort-select {
          width: 125px;
        }

        .file-table th,
        .file-table td {
          padding: 12px 7px;
          font-size: 9px;
        }

        .file-name-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--text);
          font-size: 9px;
          text-align: left;
        }

        .file-icon,
        .file-grid-icon,
        .file-preview-icon {
          display: grid;
          place-items: center;
          border-radius: 9px;
        }

        .file-icon {
          width: 27px;
          height: 27px;
          font-size: 14px;
        }

        .file-folder {
          color: #bd914e;
          background: #e9b76c28;
        }

        .file-pdf {
          color: #d16c6c;
          background: #e98b8320;
        }

        .file-doc {
          color: #6d95ce;
          background: #7da9d920;
        }

        .file-text,
        .file-markdown {
          color: #4d9e91;
          background: #65b9aa22;
        }

        .file-json {
          color: #9884cf;
          background: #9b87d720;
        }

        .file-log,
        .file-archive {
          color: #d69c62;
          background: #e5a66e20;
        }

        .file-sheet {
          color: #58a28d;
          background: #65b9aa22;
        }

        .file-actions,
        .process-row-actions {
          display: flex;
          gap: 5px;
        }

        .file-actions button,
        .process-row-actions button {
          width: 26px;
          height: 25px;
          border: 0;
          border-radius: 7px;
          background: var(--surface);
          color: var(--muted);
          box-shadow: var(--shadow-small);
        }

        .selected-file-row {
          background: #65b9aa14 !important;
        }

        .explorer-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding-top: 15px;
          margin-top: 10px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 9px;
        }

        .file-details-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 16px 0;
        }

        .file-preview-icon {
          width: 65px;
          height: 65px;
          margin-bottom: 12px;
          font-size: 29px;
        }

        .file-details-content h3 {
          max-width: 100%;
          overflow-wrap: anywhere;
          font-size: 12px;
          margin: 0 0 10px;
        }

        .detail-divider {
          width: 100%;
          height: 1px;
          margin: 17px 0;
          background: var(--line);
        }

        .detail-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 8px;
          padding: 7px 0;
          text-align: left;
          font-size: 9px;
        }

        .detail-row span {
          color: var(--muted);
        }

        .detail-row strong {
          overflow-wrap: anywhere;
          text-align: right;
        }

        .detail-row code {
          font-size: 8px;
        }

        .detail-action {
          width: 100%;
          margin-top: 8px;
        }

        .details-empty {
          padding: 27px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .details-empty-icon {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          border-radius: 15px;
          color: var(--teal);
          box-shadow: var(--shadow-in);
          font-size: 23px;
        }

        .details-empty strong {
          font-size: 10px;
        }

        .details-empty p {
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        .permissions-card {
          margin-top: 18px;
          padding: 13px;
          border-radius: 12px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .permissions-heading {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
        }

        .permissions-heading span {
          color: var(--teal);
        }

        .permissions-card p {
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        .permission-examples {
          display: flex;
          justify-content: space-between;
          color: var(--muted);
          font-size: 9px;
        }

        .permission-examples strong {
          color: var(--teal);
        }

        .file-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 12px;
          margin: 15px 0;
        }

        .file-grid-item {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          padding: 15px 8px;
          border: 0;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          color: var(--text);
        }

        .file-grid-item.selected {
          box-shadow: var(--shadow-in);
        }

        .file-grid-icon {
          width: 43px;
          height: 43px;
          font-size: 21px;
        }

        .file-grid-item strong {
          max-width: 100%;
          overflow-wrap: anywhere;
          font-size: 9px;
        }

        .file-grid-item small {
          color: var(--muted);
          font-size: 8px;
        }

        /* ========================================
           PROCESS MONITORING
        ======================================== */

        .process-usage {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mini-progress {
          width: 70px;
          height: 5px;
          overflow: hidden;
          border-radius: 15px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .mini-progress > div {
          height: 100%;
          border-radius: inherit;
          background: #65b9aa;
        }

        .process-resource-value {
          margin: 17px 0 13px;
          font-size: 27px;
          font-weight: 800;
        }

        .process-details-layout {
          display: flex;
          flex-direction: column;
          gap: 21px;
        }

        .process-detail-identity {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .process-large-avatar {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          border-radius: 17px;
          background: #65b9aa23;
          color: var(--teal);
          font-size: 22px;
          font-weight: 800;
        }

        .process-detail-identity h3 {
          margin: 0 0 6px;
          font-size: 15px;
        }

        .process-detail-identity p {
          margin: 0 0 8px;
          color: var(--muted);
          font-size: 10px;
        }

        .process-detail-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
        }

        .detail-metric {
          padding: 13px;
          border-radius: 11px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .detail-metric span {
          display: block;
          color: var(--muted);
          font-size: 9px;
          margin-bottom: 7px;
        }

        .detail-metric strong {
          font-size: 12px;
        }

        .process-command {
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding: 13px;
          border-radius: 11px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .process-command > span {
          color: var(--muted);
          font-size: 8px;
          letter-spacing: 1px;
        }

        .process-command code {
          overflow-wrap: anywhere;
          font-size: 10px;
        }

        .process-detail-actions {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
        }

        .danger-text {
          color: #d16c6c;
        }

        /* ========================================
           MODALS
        ======================================== */

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #151d2a75;
          backdrop-filter: blur(5px);
        }

        .modal-card {
          width: 100%;
          max-width: 460px;
          padding: 23px;
          border-radius: 21px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .modal-close {
          width: 31px;
          height: 31px;
          border: 0;
          border-radius: 9px;
          background: var(--surface);
          color: var(--muted);
          box-shadow: var(--shadow-soft);
          font-size: 18px;
        }

        .form-label {
          display: block;
          margin: 17px 0 7px;
          font-size: 10px;
          font-weight: 750;
        }

        .modal-input {
          width: 100%;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
        }

        .modal-footnote {
          margin-top: 17px;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        /* ========================================
           REPORTS
        ======================================== */

        .report-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .report-toolbar-label {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .report-range-controls {
          display: flex;
          gap: 5px;
          padding: 4px;
          border-radius: 11px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .range-button {
          padding: 8px 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--muted);
          font-size: 9px;
          font-weight: 700;
        }

        .range-button.active {
          color: #459d8f;
          background: var(--surface);
          box-shadow: var(--shadow-small);
        }

        .report-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          border-bottom: 1px solid var(--line);
        }

        .report-tabs button {
          padding: 12px 16px;
          border: 0;
          border-bottom: 2px solid transparent;
          color: var(--muted);
          background: transparent;
          font-size: 11px;
          font-weight: 700;
        }

        .report-tabs button.active {
          color: #499f92;
          border-color: #65b9aa;
        }

        .report-y-axis,
        .resource-y-axis {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
          padding: 0 10px 22px 0;
          color: var(--muted);
          font-size: 8px;
        }

        .report-chart,
        .resource-chart-graph {
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr);
        }

        .report-chart-graph,
        .resource-graph {
          min-width: 0;
        }

        .report-x-axis,
        .resource-x-axis {
          margin-top: 8px;
        }

        .report-detail-item {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .report-detail-heading {
          font-size: 10px;
        }

        .health-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 17px 0;
          text-align: center;
        }

        .health-score-ring {
          width: 120px;
          height: 120px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: conic-gradient(#65b9aa 0deg 345deg, var(--track) 345deg 360deg);
          box-shadow: var(--shadow-soft);
        }

        .health-score-inner {
          width: 92px;
          height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--panel);
          box-shadow: var(--shadow-in);
        }

        .health-score-inner strong {
          font-size: 26px;
        }

        .health-score-inner span {
          margin-top: 8px;
          color: var(--muted);
          font-size: 9px;
        }

        .health-score h3 {
          margin: 13px 0 5px;
          font-size: 13px;
        }

        .health-score p {
          max-width: 220px;
          margin: 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        .health-check-list > div,
        .disk-capacity-details > div {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-top: 1px solid var(--line);
          font-size: 10px;
        }

        .health-check-list span,
        .disk-capacity-details span {
          color: var(--muted);
        }

        .health-check-list strong {
          color: #4ba28e;
        }

        .storage-report-main {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 25px;
          padding: 28px 0;
        }

        .storage-donut,
        .disk-circle {
          width: 155px;
          height: 155px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: conic-gradient(
            #65b9aa 0% 36.1%,
            #9b87d7 36.1% 74.8%,
            #e5a66e 74.8% 90.8%,
            #7da9d9 90.8% 100%
          );
          box-shadow: var(--shadow-soft);
        }

        .storage-donut-center,
        .disk-circle-center {
          width: 112px;
          height: 112px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background: var(--panel);
          box-shadow: var(--shadow-in);
        }

        .storage-donut-center strong,
        .disk-circle-center strong {
          font-size: 20px;
        }

        .storage-donut-center span,
        .disk-circle-center span {
          margin-top: 5px;
          color: var(--muted);
          font-size: 9px;
        }

        .storage-report-legend {
          min-width: 190px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .storage-report-legend > div {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
        }

        .storage-report-legend > div > span {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--muted);
        }

        .storage-report-legend i {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
        }

        .disk-capacity-value {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin: 23px 0;
        }

        .disk-capacity-value strong,
        .process-memory-total strong {
          font-size: 27px;
        }

        .disk-capacity-value span,
        .process-memory-total span {
          color: var(--muted);
          font-size: 10px;
        }

        .storage-bar {
          display: flex;
          width: 100%;
          height: 13px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
        }

        .storage-segment {
          height: 100%;
        }

        .storage-system {
          background: #65b9aa;
        }

        .storage-personal {
          background: #9b87d7;
        }

        .storage-cache {
          background: #e5a66e;
        }

        .storage-other {
          background: #7da9d9;
        }

        .disk-capacity-details {
          margin: 22px 0;
        }

        .process-report-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 27px 0;
        }

        .process-report-stats > div {
          display: flex;
          flex-direction: column;
          gap: 7px;
          align-items: center;
        }

        .process-report-number {
          font-size: 26px;
          font-weight: 800;
        }

        .process-report-stats strong {
          font-size: 10px;
        }

        .process-state-bar {
          margin: 20px 0;
        }

        .rank-badge {
          color: #4ca18f;
          font-weight: 800;
        }

        .report-information {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .report-info-icon {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 11px;
          background: #65b9aa21;
          color: var(--teal);
          font-size: 17px;
        }

        .report-information h3 {
          margin: 2px 0 6px;
          font-size: 11px;
        }

        .report-information p {
          margin: 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .report-footer {
          display: flex;
          justify-content: space-between;
          color: var(--muted);
          font-size: 9px;
        }

        /* ========================================
           RESOURCES
        ======================================== */

        .resource-select-card {
          width: 100%;
          border: 0;
          cursor: pointer;
        }

        .resource-card-active {
          box-shadow:
            inset 0 0 0 1.5px #65b9aa,
            var(--shadow-out);
        }

        .resource-chart-panel {
          min-width: 0;
        }

        .resource-chart-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 19px;
        }

        .resource-chart-option {
          min-height: 35px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 11px;
          border: 0;
          border-radius: 10px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          color: var(--muted);
          font-size: 9px;
        }

        .resource-chart-option.active {
          color: #459d8f;
          box-shadow: var(--shadow-in);
        }

        .resource-option-icon {
          width: 21px;
          height: 21px;
          display: grid;
          place-items: center;
          border-radius: 7px;
        }

        .resource-chart-summary {
          display: flex;
          gap: 45px;
          margin-top: 24px;
          padding: 17px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .resource-chart-summary > div {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .resource-chart-summary strong {
          font-size: 21px;
        }

        .resource-chart-graph {
          margin-top: 22px;
        }

        .chart-footer-note {
          display: flex;
          justify-content: space-between;
          padding-top: 13px;
          margin-top: 17px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 9px;
        }

        .resource-detail-highlight {
          display: flex;
          justify-content: center;
          margin: 16px 0;
        }

        .resource-gauge {
          width: 160px;
          height: 160px;
          position: relative;
        }

        .resource-gauge svg {
          width: 100%;
          height: 100%;
        }

        .resource-gauge-center {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .resource-gauge-center strong {
          font-size: 23px;
        }

        .resource-gauge-center span {
          color: var(--muted);
          font-size: 9px;
          margin-top: 4px;
        }

        .resource-spec-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .resource-spec-list > div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid var(--line);
          font-size: 10px;
        }

        .resource-spec-list span {
          color: var(--muted);
        }

        .healthy-text {
          color: #4ba18b;
        }

        .memory-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 25px 0 17px;
        }

        .memory-used,
        .memory-available {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 13px;
          border-radius: 12px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .memory-used strong,
        .memory-available strong {
          font-size: 19px;
        }

        .memory-used span,
        .memory-available span {
          color: var(--muted);
          font-size: 9px;
        }

        .memory-stacked-bar {
          height: 11px;
          display: flex;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
        }

        .memory-used-segment {
          background: #9b87d7;
        }

        .memory-available-segment {
          background: #65b9aa;
        }

        .memory-legend {
          margin: 13px 0 20px;
        }

        .disk-overview {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 14px;
          margin: 24px 0;
        }

        .disk-circle {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          background: conic-gradient(#e5a66e 0% 46.5%, var(--track) 46.5% 100%);
        }

        .disk-circle-center {
          width: 88px;
          height: 88px;
        }

        .disk-circle-center strong {
          font-size: 17px;
        }

        .disk-overview-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .disk-overview-details > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .disk-overview-details span {
          color: var(--muted);
          font-size: 9px;
        }

        .disk-overview-details strong {
          font-size: 13px;
        }

        .network-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 18px 0;
        }

        .network-metric-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px;
          border-radius: 12px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .network-arrow {
          font-size: 19px;
          color: #65b9aa;
        }

        .network-up {
          color: #9b87d7;
        }

        .network-metric-card span:not(.network-arrow) {
          color: var(--muted);
          font-size: 9px;
        }

        .network-metric-card strong {
          font-size: 14px;
        }

        .network-activity {
          margin-bottom: 20px;
        }

        .network-bars {
          height: 70px;
          display: flex;
          align-items: flex-end;
          gap: 5px;
          padding: 8px 0;
        }

        .network-bar {
          flex: 1;
          min-width: 3px;
          border-radius: 5px 5px 2px 2px;
          background: linear-gradient(180deg, #81c6b5, #65b9aa55);
        }

        .hardware-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 19px;
        }

        .hardware-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 15px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .hardware-card > span,
        .hardware-card small {
          color: var(--muted);
          font-size: 9px;
        }

        .hardware-card strong {
          font-size: 13px;
        }

        /* ========================================
           SETTINGS
        ======================================== */

        .settings-layout {
          display: grid;
          grid-template-columns: 225px minmax(0, 1fr);
          align-items: start;
          gap: 19px;
        }

        .settings-sidebar {
          position: sticky;
          top: 95px;
          padding: 17px;
        }

        .settings-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 20px;
          margin-bottom: 19px;
          border-bottom: 1px solid var(--line);
        }

        .settings-avatar {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          color: white;
          background: linear-gradient(145deg, #9b87d7, #7162ac);
          font-size: 16px;
          font-weight: 800;
        }

        .settings-profile > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .settings-profile strong {
          font-size: 10px;
        }

        .settings-profile span {
          color: var(--muted);
          font-size: 9px;
        }

        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .settings-nav-item {
          min-height: 39px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 10px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: var(--muted);
          font-size: 10px;
          text-align: left;
        }

        .settings-nav-item.active {
          color: #499f90;
          background: var(--surface);
          box-shadow: var(--shadow-in);
          font-weight: 750;
        }

        .settings-nav-icon {
          width: 22px;
          text-align: center;
          font-size: 15px;
        }

        .settings-nav-item > span:nth-child(2) {
          flex: 1;
        }

        .settings-nav-arrow {
          font-size: 15px;
        }

        .settings-sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-top: 28px;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }

        .settings-sidebar-status {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #499e89;
          font-size: 9px;
          font-weight: 750;
        }

        .settings-sidebar-footer small {
          color: var(--muted);
          font-size: 8px;
        }

        .settings-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .settings-content-header {
          padding: 6px 0;
        }

        .settings-content-header h2 {
          margin: 0;
          font-size: 19px;
        }

        .settings-content-header p {
          margin: 6px 0 0;
          color: var(--muted);
          font-size: 10px;
        }

        .settings-panel {
          padding: 23px;
        }

        .settings-panel-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .settings-panel-icon {
          width: 41px;
          height: 41px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 13px;
          font-size: 19px;
        }

        .settings-panel-heading h3 {
          margin: 0 0 5px;
          font-size: 12px;
        }

        .settings-panel-heading p {
          margin: 0;
          color: var(--muted);
          font-size: 9px;
        }

        .settings-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
          margin: 18px 0;
        }

        .settings-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 16px 0;
        }

        .settings-form-group label {
          font-size: 10px;
          font-weight: 750;
        }

        .settings-form-group .input-field {
          width: 100%;
        }

        .settings-form-group small {
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        .settings-readonly {
          display: flex;
          align-items: center;
          color: var(--muted);
        }

        .settings-divider {
          height: 1px;
          margin: 18px 0;
          background: var(--line);
        }

        .settings-subheading {
          margin: 18px 0 12px;
          font-size: 10px;
          font-weight: 800;
        }

        .setting-row {
          min-height: 67px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          padding: 11px 0;
          border-bottom: 1px solid var(--line);
        }

        .setting-row:last-child {
          border-bottom: 0;
        }

        .setting-copy {
          flex: 1;
          min-width: 0;
        }

        .setting-copy strong {
          font-size: 10px;
        }

        .setting-copy p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        .setting-switch {
          width: 40px;
          height: 23px;
          flex-shrink: 0;
          position: relative;
          border: 0;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
          transition: background .2s;
        }

        .setting-switch > span {
          width: 17px;
          height: 17px;
          position: absolute;
          left: 3px;
          top: 3px;
          border-radius: 50%;
          background: white;
          box-shadow: 1px 2px 4px #0002;
          transition: transform .2s;
        }

        .setting-switch.enabled {
          background: #65b9aa;
        }

        .setting-switch.enabled > span {
          transform: translateX(17px);
        }

        .theme-options {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 13px;
          margin-top: 16px;
        }

        .theme-option {
          padding: 8px;
          border: 1px solid var(--line);
          border-radius: 13px;
          background: var(--surface);
          color: var(--text);
          text-align: left;
        }

        .theme-option.active {
          border: 1px solid #65b9aa;
          box-shadow: var(--shadow-in);
        }

        .theme-preview {
          height: 84px;
          display: flex;
          overflow: hidden;
          gap: 5px;
          padding: 7px;
          border-radius: 8px;
        }

        .light-preview {
          background: #e8edf2;
        }

        .dark-preview {
          background: #1d2634;
        }

        .system-preview {
          background: linear-gradient(90deg, #e8edf2 50%, #1d2634 50%);
        }

        .theme-preview-sidebar {
          width: 25%;
          border-radius: 4px;
          background: #65b9aa65;
        }

        .theme-preview-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 5px;
        }

        .theme-preview-content span {
          height: 14px;
          border-radius: 3px;
          background: #65b9aa55;
        }

        .theme-option-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding: 0 3px;
          font-size: 9px;
        }

        .theme-option-footer > span {
          color: #4ba18e;
          font-weight: 800;
        }

        .appearance-description,
        .security-status-card,
        .settings-storage-summary {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .appearance-style-icon,
        .security-status-icon,
        .storage-summary-icon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          color: var(--teal);
          background: #65b9aa20;
          font-size: 17px;
        }

        .appearance-description > div:nth-child(2),
        .security-status-card > div:nth-child(2),
        .settings-storage-summary > div:nth-child(2) {
          flex: 1;
        }

        .appearance-description strong,
        .security-status-card strong,
        .settings-storage-summary strong {
          font-size: 10px;
        }

        .appearance-description p,
        .security-status-card p,
        .settings-storage-summary p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        .threshold-control {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .threshold-control input {
          flex: 1;
          accent-color: #65b9aa;
        }

        .threshold-control strong {
          min-width: 39px;
          font-size: 13px;
        }

        .security-status-icon {
          color: #459e87;
          font-size: 18px;
        }

        .settings-storage-summary {
          margin-bottom: 17px;
        }

        .settings-save-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 17px;
          border-radius: 14px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .settings-save-footer strong {
          font-size: 10px;
        }

        .settings-save-footer p {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 9px;
        }

        .settings-info-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .settings-info-icon {
          color: #65b9aa;
          font-size: 19px;
        }

        .settings-info-card strong {
          font-size: 10px;
        }

        .settings-info-card p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.6;
        }

        /* ========================================
           QUICK ACTIONS
        ======================================== */

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 17px;
        }

        .quick-action {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          transition: transform .2s;
        }

        .quick-action:hover {
          transform: translateY(-3px);
        }

        .quick-action-icon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 11px;
          font-size: 17px;
        }

        .quick-action > span:nth-child(2) {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .quick-action strong {
          overflow-wrap: anywhere;
          font-size: 9px;
        }

        .quick-action small {
          color: var(--muted);
          font-size: 8px;
        }

        .quick-arrow {
          color: var(--muted);
          font-size: 12px;
        }

        /* ========================================
           EMPTY STATES AND NOTIFICATIONS
        ======================================== */

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 15px;
          text-align: center;
        }

        .empty-state-icon {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          border-radius: 17px;
          color: var(--teal);
          box-shadow: var(--shadow-in);
          font-size: 25px;
        }

        .empty-state h3 {
          margin: 14px 0 5px;
          font-size: 13px;
        }

        .empty-state p {
          margin-bottom: 16px;
          color: var(--muted);
          font-size: 10px;
        }

        .upload-notice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 15px;
          border-radius: 11px;
          color: #459c89;
          background: #65b9aa18;
          font-size: 10px;
        }

        .upload-notice button {
          border: 0;
          color: inherit;
          background: transparent;
          font-size: 17px;
        }

        .create-folder-form {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          padding: 13px;
          margin-bottom: 15px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--surface);
        }

        .create-folder-form > div {
          flex: 1;
        }

        .create-folder-form strong {
          font-size: 10px;
        }

        .create-folder-form p {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 9px;
        }

        .create-folder-form input {
          max-width: 160px;
        }

        /* ========================================
           RESPONSIVE TABLETS
        ======================================== */

        @media (max-width: 1250px) {
          .workspace-sidebar {
            width: 235px;
          }

          .workspace-content {
            width: calc(100% - 235px);
            margin-left: 235px;
          }

          .workspace-main {
            padding: 24px;
          }

          .filesystem-layout {
            grid-template-columns: 175px minmax(0, 1fr);
          }

          .file-details-panel {
            grid-column: 1 / -1;
          }

          .hardware-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .quick-actions-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 950px) {
          .workspace-sidebar {
            width: 265px;
            transform: translateX(-105%);
            transition: transform .25s ease;
          }

          .workspace-sidebar.sidebar-open {
            transform: translateX(0);
          }

          .workspace-content {
            width: 100%;
            margin-left: 0;
          }

          .mobile-menu-button {
            width: 37px;
            height: 37px;
            display: grid;
            place-items: center;
            border: 0;
            border-radius: 10px;
            color: var(--text);
            background: var(--surface);
            box-shadow: var(--shadow-soft);
            font-size: 17px;
          }

          .sidebar-overlay {
            position: fixed;
            inset: 0;
            z-index: 90;
            display: block;
            border: 0;
            background: #11182770;
          }

          .filesystem-layout {
            grid-template-columns: 190px minmax(0, 1fr);
          }

          .workspace-main {
            padding: 22px;
          }

          .topbar-search {
            width: 210px;
          }
        }

        /* ========================================
           RESPONSIVE MOBILE
        ======================================== */

        @media (max-width: 700px) {
          .workspace-topbar {
            height: 65px;
            padding: 0 15px;
          }

          .workspace-main {
            padding: 19px 14px;
            gap: 17px;
          }

          .topbar-right {
            gap: 9px;
          }

          .topbar-search-container,
          .topbar-profile-info,
          .topbar-profile .profile-chevron {
            display: none;
          }

          .topbar-profile-avatar {
            width: 34px;
            height: 34px;
          }

          .page-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 13px;
          }

          .page-title {
            font-size: 23px;
          }

          .page-subtitle {
            font-size: 10px;
          }

          .heading-actions {
            width: 100%;
          }

          .stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 11px;
          }

          .stat-card {
            padding: 15px;
            gap: 9px;
          }

          .stat-value {
            font-size: 22px;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .filesystem-layout {
            grid-template-columns: 1fr;
          }

          .directory-panel {
            position: static;
          }

          .directory-group-label {
            margin-top: 13px;
          }

          .file-details-panel {
            grid-column: auto;
          }

          .explorer-toolbar {
            flex-wrap: wrap;
          }

          .explorer-search {
            flex-basis: 100%;
          }

          .sort-select {
            width: 100%;
          }

          .explorer-footer {
            font-size: 8px;
          }

          .process-detail-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .report-toolbar,
          .settings-save-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .settings-layout {
            grid-template-columns: 1fr;
          }

          .settings-sidebar {
            position: static;
          }

          .settings-nav {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .settings-sidebar-footer {
            margin-top: 15px;
          }

          .settings-form-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .theme-options {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hardware-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .quick-actions-grid {
            grid-template-columns: 1fr;
          }

          .welcome-card {
            padding: 24px;
          }

          .welcome-card h2 {
            font-size: 19px;
          }

          .welcome-illustration {
            display: none;
          }

          .workspace-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
            padding: 13px 15px;
          }

          .filter-bar {
            width: 100%;
            flex-wrap: wrap;
          }

          .filter-bar select {
            flex: 1;
          }

          .activity-item {
            gap: 9px;
          }

          .activity-time {
            font-size: 8px;
          }

          .resource-chart-summary {
            gap: 17px;
            padding: 12px;
          }

          .resource-chart-summary strong {
            font-size: 16px;
          }

          .disk-overview {
            justify-content: flex-start;
          }
        }

        @media (max-width: 420px) {
          .stat-grid {
            grid-template-columns: 1fr;
          }

          .settings-nav {
            grid-template-columns: 1fr;
          }

          .report-range-controls {
            width: 100%;
          }

          .range-button {
            flex: 1;
            padding: 8px 5px;
          }

          .process-toolbar {
            flex-wrap: wrap;
          }

          .process-search {
            flex-basis: 100%;
          }

          .process-toolbar select {
            width: 100%;
          }

          .chart-summary {
            grid-template-columns: 1fr;
          }

          .chart-summary > div {
            flex-direction: row;
            justify-content: space-between;
          }

          .theme-options {
            grid-template-columns: 1fr;
          }

          .storage-report-main {
            justify-content: center;
          }

          .activity-time {
            display: none;
          }

          .topbar-breadcrumb {
            gap: 6px;
            font-size: 10px;
          }
        }

        /* ========================================
           PRINT
        ======================================== */

        @media print {
          .workspace-sidebar,
          .workspace-topbar,
          .workspace-footer,
          .heading-actions,
          .report-range-controls,
          .report-tabs,
          button {
            display: none !important;
          }

          .workspace-content {
            width: 100%;
            margin: 0;
          }

          .workspace-main {
            max-width: none;
            padding: 0;
          }

          .panel,
          .stat-card {
            box-shadow: none;
            border: 1px solid #ddd;
            break-inside: avoid;
          }

          body {
            background: white;
            color: black;
          }
        }

      `}</style>
    </div>
  );
}