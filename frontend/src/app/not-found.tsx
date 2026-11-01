"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page not-found-page">
      <div className="state-background-orb state-orb-one" />
      <div className="state-background-orb state-orb-two" />

      <section className="state-card not-found-card">
        {/* Illustration */}
        <div className="not-found-illustration">
          <div className="not-found-number">
            4
          </div>

          <div className="not-found-folder">
            <div className="folder-tab" />
            <div className="folder-body">
              <span>?</span>
            </div>
          </div>

          <div className="not-found-number">
            4
          </div>

          <div className="not-found-floating floating-one">
            ▤
          </div>

          <div className="not-found-floating floating-two">
            ⌕
          </div>
        </div>

        {/* Content */}
        <div className="state-content">
          <span className="state-eyebrow">
            PAGE NOT FOUND
          </span>

          <h1>Oops! Nothing here.</h1>

          <p className="state-description">
            The page you're looking for doesn't exist,
            may have been moved, or the address might
            have been entered incorrectly.
          </p>

          {/* Error Code */}
          <div className="not-found-code">
            <span>HTTP STATUS</span>
            <strong>404</strong>
            <span>RESOURCE NOT FOUND</span>
          </div>

          {/* Actions */}
          <div className="state-actions">
            <Link
              href="/dashboard"
              className="state-primary-button"
            >
              <span>⌂</span>
              Go to Dashboard
            </Link>

            <button
              type="button"
              className="state-secondary-button"
              onClick={() => window.history.back()}
            >
              <span>←</span>
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="not-found-links">
            <span>EXPLORE WORKSPACE</span>

            <div>
              <Link href="/filesystem">
                File System
              </Link>

              <Link href="/processes">
                Processes
              </Link>

              <Link href="/resources">
                Resources
              </Link>

              <Link href="/reports">
                Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="state-footer">
          <div className="state-footer-brand">
            <span className="state-brand-icon">⌘</span>
            <strong>LINUX SYSTEM MANAGER</strong>
          </div>

          <span>404 · Page Not Found</span>
        </div>
      </section>

      <style jsx>{`
        .not-found-card {
          max-width: 530px;
        }

        .not-found-illustration {
          height: 165px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .not-found-number {
          color: #65b9aa;
          font-size: 82px;
          font-weight: 900;
          letter-spacing: -7px;
        }

        .not-found-folder {
          width: 90px;
          position: relative;
          transform: translateY(8px);
          filter: drop-shadow(6px 7px 8px #00000015);
        }

        .folder-tab {
          width: 38px;
          height: 13px;
          margin-left: 8px;
          border-radius: 8px 8px 0 0;
          background: #e5b576;
        }

        .folder-body {
          height: 59px;
          display: grid;
          place-items: center;
          border-radius: 7px 12px 12px 12px;
          background: linear-gradient(145deg, #f1c58e, #dca66f);
          box-shadow: inset 2px 2px 5px #ffffff65;
        }

        .folder-body span {
          color: #946738;
          font-size: 30px;
          font-weight: 800;
        }

        .not-found-floating {
          width: 33px;
          height: 33px;
          position: absolute;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          color: var(--muted);
        }

        .floating-one {
          top: 13px;
          left: 20%;
        }

        .floating-two {
          right: 18%;
          bottom: 13px;
          color: var(--violet);
          font-size: 19px;
        }

        .not-found-code {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 22px;
          padding: 13px;
          border-radius: 12px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .not-found-code span {
          color: var(--muted);
          font-size: 8px;
          font-weight: 750;
          letter-spacing: 1px;
        }

        .not-found-code strong {
          color: #65b9aa;
          font-size: 18px;
        }

        .not-found-links {
          margin-top: 25px;
          padding-top: 19px;
          border-top: 1px solid var(--line);
        }

        .not-found-links > span {
          color: var(--muted);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .not-found-links > div {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 17px;
          margin-top: 13px;
        }

        .not-found-links a {
          color: #499c8f;
          font-size: 9px;
          font-weight: 700;
        }

        .not-found-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .not-found-number {
            font-size: 60px;
          }

          .not-found-folder {
            width: 72px;
          }

          .folder-body {
            height: 48px;
          }

          .not-found-links > div {
            gap: 12px;
          }
        }
      `}</style>
    </main>
  );
}