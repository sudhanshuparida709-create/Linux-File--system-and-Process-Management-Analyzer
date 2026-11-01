import type { CSSProperties } from "react";

type LoadingProps = {
  label?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "skeleton";
  className?: string;
};

export default function Loading({
  label = "Loading...",
  fullScreen = false,
  size = "md",
  variant = "spinner",
  className = "",
}: LoadingProps) {
  const dimensions: Record<string, number> = {
    sm: 22,
    md: 38,
    lg: 54,
  };

  const style = {
    "--loader-size": `${dimensions[size]}px`,
  } as CSSProperties;

  return (
    <div
      className={[
        "clay-loading",
        fullScreen ? "clay-loading-fullscreen" : "",
        className,
      ].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      style={style}
    >
      {variant === "spinner" && (
        <div className="clay-loading-spinner" />
      )}

      {variant === "dots" && (
        <div className="clay-loading-dots">
          <span />
          <span />
          <span />
        </div>
      )}

      {variant === "skeleton" && (
        <div className="clay-loading-skeleton">
          <span />
          <span />
          <span />
        </div>
      )}

      {label && variant !== "skeleton" && (
        <span className="clay-loading-label">{label}</span>
      )}

      <style jsx>{`
        .clay-loading {
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 13px;
          color: var(--muted);
        }

        .clay-loading-fullscreen {
          position: fixed;
          inset: 0;
          z-index: 999;
          min-height: 100vh;
          background: var(--bg, #edf1f5);
        }

        .clay-loading-spinner {
          width: var(--loader-size);
          height: var(--loader-size);
          border: 4px solid var(--line, #dce2e9);
          border-top-color: var(--teal, #65b9aa);
          border-right-color: var(--teal, #65b9aa);
          border-radius: 50%;
          box-shadow: var(--shadow-soft);
          animation: clay-loading-spin .8s linear infinite;
        }

        .clay-loading-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .3px;
        }

        .clay-loading-dots {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .clay-loading-dots span {
          width: calc(var(--loader-size) / 4);
          height: calc(var(--loader-size) / 4);
          border-radius: 50%;
          background: var(--teal, #65b9aa);
          animation: clay-loading-bounce .7s ease-in-out infinite alternate;
        }

        .clay-loading-dots span:nth-child(2) {
          animation-delay: .15s;
        }

        .clay-loading-dots span:nth-child(3) {
          animation-delay: .3s;
        }

        .clay-loading-skeleton {
          width: min(320px, 90%);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .clay-loading-skeleton span {
          height: 12px;
          border-radius: 8px;
          background: linear-gradient(
            90deg,
            var(--line, #dce2e9),
            var(--surface, #edf1f5),
            var(--line, #dce2e9)
          );
          background-size: 200% 100%;
          animation: clay-loading-shimmer 1.4s infinite;
        }

        .clay-loading-skeleton span:nth-child(2) {
          width: 80%;
        }

        .clay-loading-skeleton span:nth-child(3) {
          width: 55%;
        }

        @keyframes clay-loading-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes clay-loading-bounce {
          to { transform: translateY(-7px); opacity: .5; }
        }

        @keyframes clay-loading-shimmer {
          to { background-position: -200% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .clay-loading-spinner,
          .clay-loading-dots span,
          .clay-loading-skeleton span {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}