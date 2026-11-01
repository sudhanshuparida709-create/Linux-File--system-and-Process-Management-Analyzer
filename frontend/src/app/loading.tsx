"use client";
export default function Loading() {
  return (
    <main className="loading-page">
      <div className="loading-background loading-orb-one" />
      <div className="loading-background loading-orb-two" />

      <section className="loading-card">
        {/* Logo */}
        <div className="loading-logo">
          <span>⌘</span>
        </div>

        {/* Brand */}
        <div className="loading-brand">
          <h1>LINUX</h1>
          <p>SYSTEM MANAGER</p>
        </div>

        {/* Spinner */}
        <div className="loading-visual">
          <div className="loading-spinner loading-spinner-large" />

          <div className="loading-inner-icon">
            ◈
          </div>
        </div>

        {/* Loading Information */}
        <div className="loading-content">
          <h2>Preparing your workspace</h2>

          <p>
            Initializing system modules and preparing
            your dashboard experience.
          </p>
        </div>

        {/* Skeleton Preview */}
        <div className="loading-skeleton">
          <div className="skeleton-header">
            <span />
            <span />
          </div>

          <div className="skeleton-metrics">
            <div />
            <div />
            <div />
          </div>

          <div className="skeleton-chart">
            <div className="skeleton-chart-line" />
            <div className="skeleton-chart-line short" />
          </div>
        </div>

        <div className="loading-status">
          <span className="loading-status-dot" />
          Loading application resources...
        </div>

        <div className="loading-footer">
          <span>LINUX SYSTEM MANAGER</span>
          <span>Version 1.0.0</span>
        </div>
      </section>

      <style jsx>{`
        .loading-page {
          min-height: 100vh;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: 25px;
          background: var(--bg);
        }

        .loading-background {
          position: absolute;
          width: 330px;
          height: 330px;
          border-radius: 50%;
          filter: blur(3px);
          background: #65b9aa18;
        }

        .loading-orb-one {
          top: -150px;
          left: -100px;
        }

        .loading-orb-two {
          right: -120px;
          bottom: -140px;
          background: #9b87d718;
        }

        .loading-card {
          width: 100%;
          max-width: 410px;
          position: relative;
          z-index: 2;
          padding: 30px;
          border-radius: 25px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
          text-align: center;
          animation: appear 0.5s ease both;
        }

        .loading-logo {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          margin: 0 auto 13px;
          border-radius: 17px;
          color: #ffffff;
          background: linear-gradient(145deg, #78cbbb, #479d91);
          box-shadow: var(--shadow-soft);
          font-size: 27px;
          font-weight: 800;
        }

        .loading-brand h1 {
          font-size: 18px;
          letter-spacing: 3px;
          font-weight: 850;
        }

        .loading-brand p {
          margin-top: 3px;
          color: var(--muted);
          font-size: 9px;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .loading-visual {
          width: 82px;
          height: 82px;
          position: relative;
          display: grid;
          place-items: center;
          margin: 27px auto 19px;
        }

        .loading-inner-icon {
          position: absolute;
          color: var(--teal);
          font-size: 25px;
        }

        .loading-spinner {
          border-color: var(--track);
          border-top-color: var(--teal);
        }

        .loading-content h2 {
          margin-bottom: 8px;
          font-size: 17px;
        }

        .loading-content p {
          max-width: 285px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .loading-skeleton {
          margin-top: 25px;
          padding: 14px;
          border-radius: 14px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .skeleton-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .skeleton-header span {
          width: 65px;
          height: 8px;
          border-radius: 10px;
          background: var(--track);
          animation: pulse 1.5s infinite;
        }

        .skeleton-header span:last-child {
          width: 35px;
        }

        .skeleton-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
        }

        .skeleton-metrics div {
          height: 39px;
          border-radius: 9px;
          background: var(--track);
          animation: pulse 1.5s infinite;
        }

        .skeleton-chart {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .skeleton-chart-line {
          height: 7px;
          width: 100%;
          border-radius: 10px;
          background: var(--track);
          animation: pulse 1.5s infinite;
        }

        .skeleton-chart-line.short {
          width: 65%;
        }

        .loading-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 21px;
          color: var(--muted);
          font-size: 9px;
        }

        .loading-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--teal);
          animation: blink 1s infinite;
        }

        .loading-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding-top: 17px;
          margin-top: 21px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 8px;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .loading-card {
            padding: 23px 17px;
          }

          .loading-brand h1 {
            font-size: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-card,
          .loading-spinner,
          .loading-status-dot,
          .skeleton-header span,
          .skeleton-metrics div,
          .skeleton-chart-line {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}