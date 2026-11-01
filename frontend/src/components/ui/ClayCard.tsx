import type { ReactNode, HTMLAttributes } from "react";

type ClayCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  headerAction?: ReactNode;
  footer?: ReactNode;
  variant?: "default" | "flat" | "inset" | "elevated";
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
};

export default function ClayCard({
  children,
  title,
  subtitle,
  icon,
  headerAction,
  footer,
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
  ...props
}: ClayCardProps) {
  return (
    <section
      className={[
        "clay-card",
        `clay-card-${variant}`,
        `clay-card-padding-${padding}`,
        hoverable ? "clay-card-hoverable" : "",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {(title || subtitle || icon || headerAction) && (
        <header className="clay-card-header">
          <div className="clay-card-heading">
            {icon && (
              <div className="clay-card-icon">
                {icon}
              </div>
            )}

            <div className="clay-card-heading-copy">
              {title && <h3>{title}</h3>}
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>

          {headerAction && (
            <div className="clay-card-action">
              {headerAction}
            </div>
          )}
        </header>
      )}

      <div className="clay-card-content">
        {children}
      </div>

      {footer && (
        <footer className="clay-card-footer">
          {footer}
        </footer>
      )}

      <style jsx>{`
        .clay-card {
          width: 100%;
          min-width: 0;
          border: 1px solid var(--line, #dce2e9);
          border-radius: 20px;
          background: var(--surface, #edf1f5);
          transition: box-shadow .2s ease, transform .2s ease;
        }

        .clay-card-default {
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, .35),
            -7px -7px 16px rgba(255, 255, 255, .85);
        }

        .clay-card-elevated {
          box-shadow:
            10px 10px 22px rgba(163, 177, 198, .42),
            -10px -10px 22px rgba(255, 255, 255, .9);
        }

        .clay-card-flat {
          box-shadow: none;
        }

        .clay-card-inset {
          box-shadow: var(--shadow-in);
        }

        .clay-card-padding-sm {
          padding: 14px;
        }

        .clay-card-padding-md {
          padding: 20px;
        }

        .clay-card-padding-lg {
          padding: 25px;
        }

        .clay-card-hoverable:hover {
          transform: translateY(-3px);
          box-shadow:
            10px 10px 22px rgba(163, 177, 198, .4),
            -10px -10px 22px rgba(255, 255, 255, .9);
        }

        .clay-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 19px;
        }

        .clay-card-heading {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .clay-card-icon {
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: var(--teal-dark, #438f84);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          font-size: 18px;
        }

        .clay-card-heading-copy {
          min-width: 0;
        }

        .clay-card-heading-copy h3 {
          margin: 0;
          color: var(--text);
          font-size: 13px;
          font-weight: 800;
        }

        .clay-card-heading-copy p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .clay-card-action {
          flex-shrink: 0;
        }

        .clay-card-content {
          width: 100%;
          min-width: 0;
        }

        .clay-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }

        @media (max-width: 600px) {
          .clay-card-padding-md {
            padding: 16px;
          }

          .clay-card-padding-lg {
            padding: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .clay-card {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}