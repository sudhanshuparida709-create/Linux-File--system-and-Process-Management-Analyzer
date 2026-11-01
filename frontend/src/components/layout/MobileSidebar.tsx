"use client";

import { useEffect } from "react";
import Sidebar, {
  type NavigationGroup,
} from "./Sidebar";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  groups?: NavigationGroup[];
  pathname?: string;
  userName?: string;
  userRole?: string;
};

export default function MobileSidebar({
  isOpen,
  onClose,
  groups = [],
  pathname = "/dashboard",
  userName = "Administrator",
  userRole = "System Admin",
}: MobileSidebarProps) {

  // Close sidebar using Escape key.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`app-mobile-layer ${
        isOpen ? "open" : ""
      }`}
      aria-hidden={!isOpen}
    >
      {/* Background Overlay */}
      <button
        type="button"
        className="app-mobile-overlay"
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close sidebar navigation"
      />

      {/* Mobile Navigation Panel */}
      <aside
        className="app-mobile-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        inert={!isOpen}
      >
        {/* Close Button */}
        <button
          type="button"
          className="app-mobile-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          ×
        </button>

        {/* Reuse Desktop Sidebar */}
        <Sidebar
          groups={groups}
          pathname={pathname}
          userName={userName}
          userRole={userRole}
          variant="mobile"
          onNavigate={onClose}
        />
      </aside>

      <style jsx>{`
        /* ======================================
           MOBILE SIDEBAR LAYER
        ====================================== */

        .app-mobile-layer {
          position: fixed;
          inset: 0;
          z-index: 300;
          visibility: hidden;
          pointer-events: none;
          transition: visibility .25s ease;
        }

        .app-mobile-layer.open {
          visibility: visible;
          pointer-events: auto;
        }

        /* ======================================
           BACKGROUND OVERLAY
        ====================================== */

        .app-mobile-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          background: rgba(15, 24, 39, .65);
          opacity: 0;
          backdrop-filter: blur(3px);
          transition: opacity .25s ease;
        }

        .app-mobile-layer.open .app-mobile-overlay {
          opacity: 1;
        }

        /* ======================================
           SIDEBAR PANEL
        ====================================== */

        .app-mobile-panel {
          width: min(285px, 86vw);
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--surface);
          box-shadow: 10px 0 35px rgba(20, 30, 45, .18);
          transform: translateX(-105%);
          transition: transform .28s cubic-bezier(
            .2,
            .8,
            .2,
            1
          );
          overscroll-behavior: contain;
        }

        .app-mobile-layer.open .app-mobile-panel {
          transform: translateX(0);
        }

        /* ======================================
           CLOSE BUTTON
        ====================================== */

        .app-mobile-close {
          width: 33px;
          height: 33px;
          position: absolute;
          top: 17px;
          right: 13px;
          z-index: 5;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 10px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          font-size: 21px;
          line-height: 1;
          transition: color .2s, transform .2s;
        }

        .app-mobile-close:hover {
          color: var(--danger);
          transform: rotate(90deg);
        }

        /* ======================================
           ACCESSIBILITY
        ====================================== */

        .app-mobile-overlay:focus-visible,
        .app-mobile-close:focus-visible {
          outline: 2px solid var(--teal);
          outline-offset: -3px;
        }

        @media (min-width: 901px) {
          .app-mobile-layer {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .app-mobile-layer,
          .app-mobile-overlay,
          .app-mobile-panel,
          .app-mobile-close {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}