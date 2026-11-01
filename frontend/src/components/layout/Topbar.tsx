"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { NavigationItem } from "./Sidebar";

type TopbarProps = {
  title?: string;
  navigation?: NavigationItem[];
  onMenuClick?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  userName?: string;
};

const notifications = [
  {
    id: 1,
    icon: "✓",
    tint: "teal",
    title: "System is healthy",
    description: "All monitored resources are operational.",
    time: "Just now",
  },
  {
    id: 2,
    icon: "▤",
    tint: "violet",
    title: "File system scan completed",
    description: "Directory scan finished successfully.",
    time: "12 minutes ago",
  },
  {
    id: 3,
    icon: "◉",
    tint: "orange",
    title: "Resource monitoring",
    description: "CPU utilization is within normal range.",
    time: "25 minutes ago",
  },
];

export default function Topbar({
  title = "Dashboard",
  navigation = [],
  onMenuClick,
  isDark = false,
  onToggleTheme,
  userName = "Administrator",
}: TopbarProps) {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return navigation.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.href.toLowerCase().includes(query)
    );
  }, [search, navigation]);

  const initial = userName.charAt(0).toUpperCase() || "A";

  const closeDropdowns = () => {
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Escape") {
      setSearch("");
      setSearchOpen(false);
    }

    if (
      event.key === "Enter" &&
      searchResults.length > 0
    ) {
      window.location.href = searchResults[0].href;
    }

    if (event.key === "ArrowDown" && searchResults.length > 0) {
      event.preventDefault();
      document
        .getElementById("topbar-first-search-result")
        ?.focus();
    }
  };

  return (
    <>
      <header className="app-topbar">

        {/* Left Section */}
        <div className="app-topbar-left">

          {/* Mobile Menu */}
          <button
            type="button"
            className="app-topbar-menu"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Breadcrumb */}
          <div className="app-topbar-breadcrumb">
            <span className="app-topbar-breadcrumb-home">
              Workspace
            </span>

            <span className="app-topbar-breadcrumb-separator">
              /
            </span>

            <strong>{title}</strong>
          </div>
        </div>

        {/* Right Section */}
        <div className="app-topbar-right">

          {/* Search */}
          <div className="app-topbar-search-wrapper">
            <div className="app-topbar-search">
              <span className="app-search-icon">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                  closeDropdowns();
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search workspace..."
                aria-label="Search workspace"
                aria-expanded={searchOpen && !!search.trim()}
                aria-controls="topbar-search-results"
              />

              <kbd>⌘ K</kbd>

              {search && (
                <button
                  type="button"
                  className="app-search-clear"
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Results */}
            {searchOpen && search.trim() && (
              <>
                <button
                  className="app-dropdown-dismiss"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search results"
                />

                <div
                  className="app-search-dropdown"
                  id="topbar-search-results"
                >
                  <div className="app-dropdown-heading">
                    <span>SEARCH RESULTS</span>
                    <small>
                      {searchResults.length} found
                    </small>
                  </div>

                  {searchResults.length > 0 ? (
                    searchResults.map((item, index) => (
                      <Link
                        href={item.href}
                        key={item.href}
                        id={
                          index === 0
                            ? "topbar-first-search-result"
                            : undefined
                        }
                        className="app-search-result"
                        onClick={() => {
                          setSearch("");
                          setSearchOpen(false);
                        }}
                      >
                        <span className="app-search-result-icon">
                          {item.icon}
                        </span>

                        <div>
                          <strong>{item.label}</strong>
                          <small>{item.href}</small>
                        </div>

                        <span className="app-result-arrow">
                          ↗
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="app-search-empty">
                      <span>⌕</span>
                      <strong>No results found</strong>
                      <p>
                        Try searching for another workspace page.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            className="app-topbar-icon-button"
            onClick={onToggleTheme}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <span className="app-theme-icon">
              {isDark ? "☀" : "☾"}
            </span>
          </button>

          {/* Notifications */}
          <div className="app-topbar-dropdown-wrapper">
            <button
              type="button"
              className={`app-topbar-icon-button ${
                notificationOpen ? "active" : ""
              }`}
              onClick={() => {
                setNotificationOpen((previous) => !previous);
                setProfileOpen(false);
                setSearchOpen(false);
              }}
              aria-label="Open notifications"
              aria-expanded={notificationOpen}
              title="Notifications"
            >
              <span>♢</span>

              {!notificationsRead && (
                <i className="app-notification-dot" />
              )}
            </button>

            {notificationOpen && (
              <div className="app-notification-dropdown">

                <div className="app-notification-header">
                  <div>
                    <h3>Notifications</h3>
                    <p>Your latest system updates</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsRead(true)
                    }
                    className="app-mark-read"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="app-notification-list">
                  {notifications.map((notification) => (
                    <div
                      className="app-notification-item"
                      key={notification.id}
                    >
                      <div
                        className={`app-notification-icon ${notification.tint}`}
                      >
                        {notification.icon}
                      </div>

                      <div className="app-notification-copy">
                        <strong>{notification.title}</strong>

                        <p>{notification.description}</p>

                        <small>{notification.time}</small>
                      </div>

                      {!notificationsRead && (
                        <span className="app-notification-unread" />
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  href="/activity"
                  className="app-notification-footer"
                  onClick={() => {
                    setNotificationOpen(false);
                    setNotificationsRead(true);
                  }}
                >
                  View All Activity →
                </Link>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="app-topbar-dropdown-wrapper">

            <button
              type="button"
              className="app-topbar-profile"
              onClick={() => {
                setProfileOpen((previous) => !previous);
                setNotificationOpen(false);
                setSearchOpen(false);
              }}
              aria-label="Open user menu"
              aria-expanded={profileOpen}
            >
              <span className="app-profile-avatar">
                {initial}
                <i />
              </span>

              <span className="app-profile-information">
                <strong>{userName}</strong>
                <small>Administrator</small>
              </span>

              <span className="app-profile-chevron">
                ⌄
              </span>
            </button>

            {profileOpen && (
              <div className="app-profile-dropdown">

                <div className="app-profile-dropdown-header">
                  <div className="app-profile-large-avatar">
                    {initial}
                  </div>

                  <div>
                    <strong>{userName}</strong>
                    <small>System Administrator</small>
                  </div>
                </div>

                <div className="app-profile-divider" />

                <Link
                  href="/settings"
                  className="app-profile-menu-item"
                  onClick={() => setProfileOpen(false)}
                >
                  <span>⚙</span>
                  Account Settings
                  <span>›</span>
                </Link>

                <Link
                  href="/activity"
                  className="app-profile-menu-item"
                  onClick={() => setProfileOpen(false)}
                >
                  <span>◷</span>
                  Activity History
                  <span>›</span>
                </Link>

                <div className="app-profile-divider" />

                <div className="app-profile-version">
                  Linux System Manager · v1.0.0
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Dropdown Outside Click Handling */}
      {(searchOpen || notificationOpen || profileOpen) && (
        <button
          type="button"
          className="app-topbar-global-dismiss"
          aria-label="Close open menus"
          onClick={() => {
            setSearchOpen(false);
            setNotificationOpen(false);
            setProfileOpen(false);
          }}
        />
      )}

      <style jsx>{`

        /* ======================================
           TOPBAR
        ====================================== */

        .app-topbar {
          height: 76px;
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 0 30px;
          background: var(--surface);
          border-bottom: 1px solid var(--line);
        }

        .app-topbar-left,
        .app-topbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .app-topbar-right {
          flex-shrink: 0;
        }

        /* ======================================
           MOBILE MENU
        ====================================== */

        .app-topbar-menu {
          width: 37px;
          height: 37px;
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border: 0;
          border-radius: 11px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .app-topbar-menu span {
          width: 16px;
          height: 2px;
          border-radius: 5px;
          background: var(--text);
        }

        /* ======================================
           BREADCRUMBS
        ====================================== */

        .app-topbar-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          font-size: 12px;
        }

        .app-topbar-breadcrumb-home {
          color: var(--muted);
        }

        .app-topbar-breadcrumb-separator {
          color: var(--line);
        }

        .app-topbar-breadcrumb strong {
          color: var(--text);
          font-weight: 750;
        }

        /* ======================================
           SEARCH
        ====================================== */

        .app-topbar-search-wrapper {
          position: relative;
          z-index: 2;
        }

        .app-topbar-search {
          width: 250px;
          height: 41px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 11px;
          border: 1px solid transparent;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
          transition: border-color .2s ease;
        }

        .app-topbar-search:focus-within {
          border-color: var(--teal);
        }

        .app-search-icon {
          color: var(--muted);
          font-size: 21px;
          line-height: 1;
        }

        .app-topbar-search input {
          width: 100%;
          min-width: 0;
          flex: 1;
          padding: 0;
          border: 0;
          outline: 0;
          color: var(--text);
          background: transparent;
          font-size: 10px;
        }

        .app-topbar-search input::placeholder {
          color: var(--muted);
        }

        .app-topbar-search kbd {
          flex-shrink: 0;
          padding: 4px 6px;
          border-radius: 5px;
          background: var(--surface);
          box-shadow: var(--shadow-small);
          color: var(--muted);
          font-size: 8px;
        }

        .app-search-clear {
          width: 19px;
          height: 19px;
          border: 0;
          border-radius: 5px;
          color: var(--muted);
          background: transparent;
          font-size: 16px;
        }

        /* ======================================
           ICON BUTTONS
        ====================================== */

        .app-topbar-icon-button {
          width: 39px;
          height: 39px;
          position: relative;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 0;
          border-radius: 12px;
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          font-size: 19px;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .app-topbar-icon-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-out);
        }

        .app-topbar-icon-button.active {
          color: var(--teal);
          box-shadow: var(--shadow-in);
        }

        .app-theme-icon {
          line-height: 1;
        }

        .app-notification-dot {
          width: 7px;
          height: 7px;
          position: absolute;
          top: 8px;
          right: 8px;
          border: 1px solid var(--surface);
          border-radius: 50%;
          background: #e98b83;
        }

        /* ======================================
           DROPDOWN WRAPPERS
        ====================================== */

        .app-topbar-dropdown-wrapper {
          position: relative;
          z-index: 3;
        }

        .app-dropdown-dismiss {
          position: fixed;
          inset: 0;
          z-index: 1;
          width: 100vw;
          height: 100vh;
          border: 0;
          background: transparent;
        }

        .app-topbar-global-dismiss {
          position: fixed;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          border: 0;
          background: transparent;
          cursor: default;
        }

        /* ======================================
           SEARCH DROPDOWN
        ====================================== */

        .app-search-dropdown {
          width: 290px;
          max-height: 350px;
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          z-index: 5;
          padding: 12px;
          overflow-y: auto;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .app-dropdown-heading {
          display: flex;
          justify-content: space-between;
          padding: 7px;
          margin-bottom: 7px;
          color: var(--muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .app-dropdown-heading small {
          font-size: 9px;
          letter-spacing: 0;
        }

        .app-search-result {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 10px;
          transition: background .2s ease;
        }

        .app-search-result:hover {
          background: var(--panel-hover);
        }

        .app-search-result-icon {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #65b9aa20;
          color: var(--teal);
          font-size: 16px;
        }

        .app-search-result > div {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .app-search-result strong {
          color: var(--text);
          font-size: 10px;
        }

        .app-search-result small {
          color: var(--muted);
          font-size: 8px;
        }

        .app-result-arrow {
          color: var(--muted);
          font-size: 12px;
        }

        .app-search-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 25px 10px;
          text-align: center;
        }

        .app-search-empty > span {
          color: var(--teal);
          font-size: 25px;
        }

        .app-search-empty strong {
          margin-top: 8px;
          font-size: 11px;
        }

        .app-search-empty p {
          margin-top: 5px;
          color: var(--muted);
          font-size: 9px;
        }

        /* ======================================
           NOTIFICATIONS DROPDOWN
        ====================================== */

        .app-notification-dropdown {
          width: 320px;
          max-width: calc(100vw - 25px);
          position: absolute;
          top: calc(100% + 13px);
          right: -45px;
          z-index: 5;
          padding: 15px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .app-notification-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 9px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }

        .app-notification-header h3 {
          margin: 0;
          font-size: 13px;
        }

        .app-notification-header p {
          margin-top: 4px;
          color: var(--muted);
          font-size: 9px;
        }

        .app-mark-read {
          padding: 6px;
          border: 0;
          background: transparent;
          color: var(--teal);
          font-size: 9px;
          font-weight: 750;
          white-space: nowrap;
        }

        .app-notification-list {
          display: flex;
          flex-direction: column;
        }

        .app-notification-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px 3px;
          border-bottom: 1px solid var(--line);
        }

        .app-notification-icon {
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          font-size: 16px;
        }

        .app-notification-icon.teal {
          color: #429d8e;
          background: #65b9aa20;
        }

        .app-notification-icon.violet {
          color: #917acb;
          background: #9b87d720;
        }

        .app-notification-icon.orange {
          color: #d99a5c;
          background: #e5a66e24;
        }

        .app-notification-copy {
          flex: 1;
          min-width: 0;
        }

        .app-notification-copy strong {
          display: block;
          color: var(--text);
          font-size: 10px;
        }

        .app-notification-copy p {
          margin: 5px 0;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.5;
        }

        .app-notification-copy small {
          color: var(--muted);
          font-size: 8px;
        }

        .app-notification-unread {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          margin-top: 5px;
          border-radius: 50%;
          background: var(--teal);
        }

        .app-notification-footer {
          display: block;
          padding: 12px 0 2px;
          color: var(--teal);
          font-size: 10px;
          font-weight: 750;
          text-align: center;
        }

        /* ======================================
           USER PROFILE
        ====================================== */

        .app-topbar-profile {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
        }

        .app-profile-avatar {
          width: 37px;
          height: 37px;
          position: relative;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 12px;
          color: white;
          background: linear-gradient(145deg, #9d8ed7, #7566b8);
          font-size: 13px;
          font-weight: 800;
        }

        .app-profile-avatar i {
          width: 9px;
          height: 9px;
          position: absolute;
          right: -2px;
          bottom: -2px;
          border: 2px solid var(--surface);
          border-radius: 50%;
          background: #55b99b;
        }

        .app-profile-information {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .app-profile-information strong {
          color: var(--text);
          font-size: 10px;
        }

        .app-profile-information small {
          color: var(--muted);
          font-size: 8px;
        }

        .app-profile-chevron {
          margin-left: 2px;
          color: var(--muted);
          font-size: 14px;
        }

        /* ======================================
           PROFILE DROPDOWN
        ====================================== */

        .app-profile-dropdown {
          width: 245px;
          position: absolute;
          top: calc(100% + 13px);
          right: 0;
          z-index: 5;
          padding: 13px;
          border: 1px solid var(--line);
          border-radius: 17px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .app-profile-dropdown-header {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 6px 4px 13px;
        }

        .app-profile-large-avatar {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          color: white;
          background: linear-gradient(145deg, #9d8ed7, #7566b8);
          font-size: 15px;
          font-weight: 800;
        }

        .app-profile-dropdown-header > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .app-profile-dropdown-header strong {
          color: var(--text);
          font-size: 11px;
        }

        .app-profile-dropdown-header small {
          color: var(--muted);
          font-size: 9px;
        }

        .app-profile-divider {
          height: 1px;
          margin: 5px 0;
          background: var(--line);
        }

        .app-profile-menu-item {
          min-height: 37px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 8px;
          border-radius: 9px;
          color: var(--text);
          font-size: 10px;
          transition: background .2s;
        }

        .app-profile-menu-item:hover {
          background: var(--panel-hover);
        }

        .app-profile-menu-item > span:first-child {
          color: var(--teal);
          font-size: 15px;
        }

        .app-profile-menu-item > span:last-child {
          margin-left: auto;
          color: var(--muted);
          font-size: 14px;
        }

        .app-profile-version {
          padding: 11px 5px 3px;
          color: var(--muted);
          font-size: 8px;
          text-align: center;
        }

        /* ======================================
           RESPONSIVE TABLET
        ====================================== */

        @media (max-width: 1100px) {
          .app-topbar-search {
            width: 205px;
          }

          .app-topbar {
            padding: 0 21px;
          }

          .app-topbar-left,
          .app-topbar-right {
            gap: 11px;
          }
        }

        /* ======================================
           RESPONSIVE MOBILE
        ====================================== */

        @media (max-width: 900px) {
          .app-topbar-menu {
            display: flex;
          }
        }

        @media (max-width: 650px) {
          .app-topbar {
            height: 65px;
            padding: 0 14px;
          }

          .app-topbar-search-wrapper {
            display: none;
          }

          .app-profile-information,
          .app-profile-chevron {
            display: none;
          }

          .app-topbar-left,
          .app-topbar-right {
            gap: 9px;
          }

          .app-topbar-breadcrumb {
            gap: 6px;
            font-size: 10px;
          }

          .app-topbar-icon-button {
            width: 35px;
            height: 35px;
          }

          .app-profile-avatar {
            width: 34px;
            height: 34px;
          }

          .app-notification-dropdown {
            right: -48px;
          }
        }

        @media (max-width: 380px) {
          .app-topbar-breadcrumb-home {
            display: none;
          }

          .app-topbar-breadcrumb-separator {
            display: none;
          }

          .app-topbar {
            padding: 0 10px;
          }
        }

        /* ======================================
           ACCESSIBILITY
        ====================================== */

        @media (prefers-reduced-motion: reduce) {
          .app-topbar-icon-button,
          .app-search-result,
          .app-mark-read,
          .app-mobile-panel {
            transition: none;
          }
        }

      `}</style>
    </>
  );
}