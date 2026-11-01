import type { ReactNode } from "react";

export type ClayBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "neutral"
  | "purple";

type ClayBadgeProps = {
  children: ReactNode;
  variant?: ClayBadgeVariant;
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  icon?: ReactNode;
  rounded?: boolean;
  className?: string;
};

export default function ClayBadge({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  icon,
  rounded = true,
  className = "",
}: ClayBadgeProps) {
  return (
    <span
      className={[
        "clay-badge",
        `clay-badge-${variant}`,
        `clay-badge-${size}`,
        rounded ? "clay-badge-rounded" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      {dot && <span className="clay-badge-dot" />}
      {icon && <span className="clay-badge-icon">{icon}</span>}
      <span className="clay-badge-content">{children}</span>

      <style jsx>{`
        .clay-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: fit-content;
          max-width: 100%;
          font-weight: 750;
          white-space: nowrap;
          border: 1px solid transparent;
          transition: transform .2s ease;
        }

        .clay-badge-rounded {
          border-radius: 999px;
        }

        .clay-badge-sm {
          padding: 4px 9px;
          font-size: 9px;
        }

        .clay-badge-md {
          padding: 6px 11px;
          font-size: 10px;
        }

        .clay-badge-lg {
          padding: 8px 14px;
          font-size: 11px;
        }

        .clay-badge-success {
          color: #318d72;
          background: #65b9aa20;
          border-color: #65b9aa35;
        }

        .clay-badge-warning {
          color: #b17b37;
          background: #e9b76a22;
          border-color: #e9b76a40;
        }

        .clay-badge-danger {
          color: #c66c6c;
          background: #e58e8e20;
          border-color: #e58e8e40;
        }

        .clay-badge-info {
          color: #6489bd;
          background: #84a9db22;
          border-color: #84a9db40;
        }

        .clay-badge-primary {
          color: var(--teal-dark, #438f84);
          background: #65b9aa22;
          border-color: #65b9aa40;
        }

        .clay-badge-neutral {
          color: var(--muted, #8c939f);
          background: var(--panel-hover, #e9edf2);
          border-color: var(--line, #dce1e8);
        }

        .clay-badge-purple {
          color: #8b78c0;
          background: #a28bdb20;
          border-color: #a28bdb40;
        }

        .clay-badge-dot {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: currentColor;
        }

        .clay-badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1em;
        }

        .clay-badge-content {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (prefers-reduced-motion: no-preference) {
          .clay-badge:hover {
            transform: translateY(-1px);
          }
        }
      `}</style>
    </span>
  );
}