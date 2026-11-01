"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Sidebar, {
  type NavigationGroup,
} from "./Sidebar";

import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";
import MainContent from "./MainContent";

export const defaultNavigation: NavigationGroup[] = [
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

type AppShellProps = {
  children: ReactNode;
  title?: string;
  navigation?: NavigationGroup[];
  userName?: string;
  userRole?: string;
  footerText?: string;
};

export default function AppShell({
  children,
  title,
  navigation = defaultNavigation,
  userName = "Administrator",
  userRole = "System Admin",
  footerText = "Linux File System & Process Management",
}: AppShellProps) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigationItems = useMemo(
    () => navigation.flatMap((group) => group.items),
    [navigation]
  );

  const pageTitle =
    title ||
    navigationItems.find((item) => item.href === pathname)?.label ||
    "Dashboard";

  // Load the saved appearance preference.
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(
        "linux-dashboard-settings"
      );

      const storedTheme = localStorage.getItem(
        "linux-dashboard-theme"
      );

      let theme = storedTheme || "light";

      if (!storedTheme && storedSettings) {
        const settings = JSON.parse(storedSettings);
        theme = settings.theme || "light";
      }

      if (theme === "system") {
        theme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
      }

      setDarkMode(theme === "dark");
    } catch {
      setDarkMode(false);
    }
  }, []);

  // Apply the active theme.
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem(
      "linux-dashboard-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Close mobile navigation when the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scrolling while mobile navigation is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const handleThemeToggle = () => {
    setDarkMode((previous) => !previous);
  };

  const handleCloseMobile = () => {
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">

      {/* Desktop Sidebar */}
      <Sidebar
        groups={navigation}
        pathname={pathname}
        userName={userName}
        userRole={userRole}
        variant="desktop"
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={handleCloseMobile}
        groups={navigation}
        pathname={pathname}
        userName={userName}
        userRole={userRole}
      />

      {/* Main Application Area */}
      <div className="app-shell-main">

        {/* Top Navigation */}
        <Topbar
          title={pageTitle}
          navigation={navigationItems}
          onMenuClick={() => setMobileOpen(true)}
          isDark={darkMode}
          onToggleTheme={handleThemeToggle}
          userName={userName}
        />

        {/* Page Content */}
        <MainContent footerText={footerText}>
          {children}
        </MainContent>

      </div>

      {/* Global App Shell Styles */}
      <style jsx global>{`

        /* ======================================
           APP SHELL
        ====================================== */

        .app-shell {
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: var(--bg);
          color: var(--text);
        }

        .app-shell-main {
          width: calc(100% - 265px);
          min-width: 0;
          min-height: 100vh;
          margin-left: 265px;
          display: flex;
          flex-direction: column;
        }

        /* ======================================
           DESKTOP SIDEBAR
        ====================================== */

        .app-sidebar {
          width: 265px;
          height: 100vh;
          position: fixed;
          inset: 0 auto 0 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 23px 17px 15px;
          overflow-y: auto;
          background: var(--surface);
          border-right: 1px solid var(--line);
          scrollbar-width: thin;
        }

        .app-sidebar-mobile {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 100%;
          border: 0;
        }

        /* ======================================
           BRAND
        ====================================== */

        .app-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 5px;
          margin-bottom: 26px;
        }

        .app-brand-mark {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: white;
          background: linear-gradient(145deg, #78cbbb, #479d91);
          box-shadow: 5px 5px 10px #c5d0d5,
            -4px -4px 9px #ffffff;
          font-size: 23px;
          font-weight: 800;
        }

        .app-brand-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .app-brand-copy strong {
          font-size: 16px;
          letter-spacing: 2px;
          font-weight: 850;
        }

        .app-brand-copy span {
          color: var(--muted);
          font-size: 10px;
        }

        /* ======================================
           SIDEBAR STATUS
        ====================================== */

        .app-sidebar-status {
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 17px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .app-sidebar-status-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .app-sidebar-status-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          color: var(--teal);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          font-size: 19px;
        }

        .app-live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 20px;
          color: #399b83;
          background: #65b9aa20;
          font-size: 9px;
          font-weight: 800;
        }

        .app-live-badge i {
          width: 7px;
          height: 7px;
          display: inline-block;
          border-radius: 50%;
          background: #55b99b;
        }

        .app-sidebar-status > strong {
          display: block;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .app-sidebar-status > p {
          color: var(--muted);
          font-size: 9px;
        }

        .app-status-progress {
          height: 7px;
          overflow: hidden;
          margin-top: 13px;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .app-status-progress span {
          display: block;
          width: 96%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #65b9aa, #81cbb5);
        }

        .app-status-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: var(--muted);
          font-size: 9px;
        }

        .app-status-footer strong {
          color: var(--success);
        }

        /* ======================================
           NAVIGATION
        ====================================== */

        .app-sidebar-navigation {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .app-nav-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .app-nav-group-title {
          padding: 0 11px;
          margin-bottom: 7px;
          color: var(--muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .app-nav-link {
          min-height: 43px;
          display: flex;
          position: relative;
          align-items: center;
          gap: 11px;
          padding: 0 12px;
          border-radius: 12px;
          color: var(--muted);
          font-size: 11px;
          font-weight: 600;
          transition: all .2s ease;
        }

        .app-nav-link:hover {
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          transform: translateX(2px);
        }

        .app-nav-link.active {
          color: #399c8e;
          background: var(--surface);
          box-shadow: var(--shadow-in);
          font-weight: 750;
        }

        .app-nav-icon {
          width: 23px;
          height: 23px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          font-size: 17px;
        }

        .app-nav-label {
          flex: 1;
        }

        .app-nav-indicator {
          width: 4px;
          height: 19px;
          position: absolute;
          left: 0;
          border-radius: 0 5px 5px 0;
          background: var(--teal);
        }

        .app-nav-badge {
          padding: 3px 7px;
          border-radius: 20px;
          color: #479e90;
          background: #65b9aa20;
          font-size: 8px;
          font-weight: 800;
        }

        /* ======================================
           STORAGE CARD
        ====================================== */

        .app-sidebar-storage {
          padding: 14px;
          margin-top: auto;
          margin-bottom: 15px;
          border-radius: 16px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .app-storage-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 750;
        }

        .app-storage-heading span {
          color: var(--teal);
          font-size: 18px;
        }

        .app-storage-value {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin: 13px 0 9px;
        }

        .app-storage-value strong {
          font-size: 17px;
        }

        .app-storage-value span,
        .app-storage-footer {
          color: var(--muted);
          font-size: 9px;
        }

        .app-storage-progress {
          height: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .app-storage-progress span {
          width: 46.5%;
          height: 100%;
          display: block;
          background: linear-gradient(90deg, #9b87d7, #b8a5e7);
        }

        .app-storage-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
        }

        .app-storage-link {
          display: block;
          margin-top: 12px;
          color: #4b9d91;
          font-size: 9px;
          font-weight: 750;
        }

        /* ======================================
           SIDEBAR USER
        ====================================== */

        .app-sidebar-user {
          display: flex;
          align-items: center;
          gap: 9px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        .app-user-avatar {
          width: 37px;
          height: 37px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: white;
          background: linear-gradient(145deg, #9d8ed7, #7566b8);
          font-size: 13px;
          font-weight: 800;
        }

        .app-user-copy {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .app-user-copy strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10px;
        }

        .app-user-copy span {
          color: var(--muted);
          font-size: 9px;
        }

        .app-sidebar-settings {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          font-size: 15px;
        }

        /* ======================================
           MOBILE SIDEBAR
        ====================================== */

        .app-mobile-layer {
          position: fixed;
          inset: 0;
          z-index: 300;
          visibility: hidden;
          pointer-events: none;
        }

        .app-mobile-layer.open {
          visibility: visible;
          pointer-events: auto;
        }

        .app-mobile-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          border: 0;
          background: #10182775;
          opacity: 0;
          transition: opacity .25s ease;
        }

        .app-mobile-layer.open .app-mobile-overlay {
          opacity: 1;
        }

        .app-mobile-panel {
          width: 280px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          overflow-y: auto;
          background: var(--surface);
          transform: translateX(-105%);
          transition: transform .25s ease;
          box-shadow: 10px 0 30px #10182725;
        }

        .app-mobile-layer.open .app-mobile-panel {
          transform: translateX(0);
        }

        .app-mobile-close {
          position: absolute;
          top: 16px;
          right: 13px;
          z-index: 5;
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 10px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          font-size: 19px;
        }

        /* ======================================
           TABLET / MOBILE RESPONSIVENESS
        ====================================== */

        @media (max-width: 1100px) {
          .app-sidebar {
            width: 235px;
          }

          .app-shell-main {
            width: calc(100% - 235px);
            margin-left: 235px;
          }
        }

        @media (max-width: 900px) {
          .app-sidebar.app-sidebar-desktop {
            display: none;
          }

          .app-shell-main {
            width: 100%;
            margin-left: 0;
          }
        }

        @media (max-width: 600px) {
          .app-sidebar {
            padding: 20px 15px 14px;
          }
        }

      `}</style>
    </div>
  );
}