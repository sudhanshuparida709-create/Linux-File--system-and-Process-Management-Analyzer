import type { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
  footerText?: string;
  showFooter?: boolean;
  maxWidth?: number | string;
};

export default function MainContent({
  children,
  footerText = "Linux File System & Process Management",
  showFooter = true,
  maxWidth = 1800,
}: MainContentProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="main-content-wrapper">

      {/* Main Page Content */}
      <main
        className="main-content-area"
        id="main-content"
        aria-label="Main workspace content"
      >
        <div
          className="main-content-inner"
          style={{
            maxWidth:
              typeof maxWidth === "number"
                ? `${maxWidth}px`
                : maxWidth,
          }}
        >
          {children}
        </div>
      </main>

      {/* Application Footer */}
      {showFooter && (
        <footer className="main-content-footer">
          <div className="main-footer-left">
            <span className="main-footer-status">
              <span />
            </span>

            <span>System Operational</span>
          </div>

          <div className="main-footer-center">
            {footerText}
          </div>

          <div className="main-footer-right">
            <span>Version 1.0.0</span>
            <span className="main-footer-divider">·</span>
            <span>© {currentYear}</span>
          </div>
        </footer>
      )}

      <style jsx global>{`

        /* ======================================
           MAIN CONTENT WRAPPER
        ====================================== */

        .main-content-wrapper {
          width: 100%;
          min-width: 0;
          min-height: calc(100vh - 76px);
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--bg);
        }

        /* ======================================
           MAIN CONTENT AREA
        ====================================== */

        .main-content-area {
          width: 100%;
          min-width: 0;
          flex: 1;
          padding: 30px;
          background: var(--bg);
        }

        .main-content-inner {
          width: 100%;
          min-width: 0;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 23px;
          animation: mainContentFadeIn .35s ease both;
        }

        @keyframes mainContentFadeIn {
          from {
            opacity: 0;
            transform: translateY(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ======================================
           PAGE CONTAINER UTILITIES
        ====================================== */

        .main-content-inner > * {
          min-width: 0;
          max-width: 100%;
        }

        .main-content-inner .panel,
        .main-content-inner .stat-card {
          min-width: 0;
        }

        /* ======================================
           FOOTER
        ====================================== */

        .main-content-footer {
          width: 100%;
          min-height: 53px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 12px 30px;
          border-top: 1px solid var(--line);
          background: var(--surface);
          color: var(--muted);
          font-size: 9px;
        }

        .main-footer-left,
        .main-footer-right,
        .main-footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .main-footer-left {
          flex-shrink: 0;
        }

        .main-footer-status > span {
          width: 7px;
          height: 7px;
          display: inline-block;
          border-radius: 50%;
          background: #55b99b;
          box-shadow: 0 0 7px #55b99b55;
        }

        .main-footer-center {
          text-align: center;
          flex: 1;
        }

        .main-footer-right {
          flex-shrink: 0;
          justify-content: flex-end;
        }

        .main-footer-divider {
          color: var(--line);
        }

        /* ======================================
           RESPONSIVE TABLET
        ====================================== */

        @media (max-width: 950px) {
          .main-content-area {
            padding: 23px;
          }

          .main-content-footer {
            padding: 12px 23px;
          }
        }

        /* ======================================
           RESPONSIVE MOBILE
        ====================================== */

        @media (max-width: 700px) {
          .main-content-wrapper {
            min-height: calc(100vh - 65px);
          }

          .main-content-area {
            padding: 19px 14px;
          }

          .main-content-inner {
            gap: 17px;
          }

          .main-content-footer {
            min-height: 55px;
            padding: 13px 15px;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 8px;
          }

          .main-footer-center {
            display: none;
          }

          .main-footer-right {
            margin-left: auto;
          }
        }

        @media (max-width: 400px) {
          .main-content-area {
            padding: 15px 11px;
          }

          .main-content-footer {
            font-size: 7px;
          }
        }

        /* ======================================
           PRINT
        ====================================== */

        @media print {
          .main-content-wrapper {
            min-height: auto;
            background: white;
          }

          .main-content-area {
            padding: 0;
            background: white;
          }

          .main-content-footer {
            display: none;
          }

          .main-content-inner {
            max-width: 100% !important;
            animation: none;
          }
        }

      `}</style>
    </div>
  );
}