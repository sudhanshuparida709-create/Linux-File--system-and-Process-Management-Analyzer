import Link from "next/link";
import type { ReactNode } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  subtitle,
  eyebrow = "WORKSPACE",
  breadcrumbs = [],
  actions,
  badge,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`page-header-component ${className}`}>
      <div className="page-header-main">

        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 ? (
          <nav
            className="page-header-breadcrumbs"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((item, index) => (
              <span
                className="page-header-breadcrumb-item"
                key={`${item.label}-${index}`}
              >
                {item.href && index !== breadcrumbs.length - 1 ? (
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={
                      index === breadcrumbs.length - 1
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                )}

                {index !== breadcrumbs.length - 1 && (
                  <span
                    className="page-header-separator"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          <div className="page-header-eyebrow">
            <span className="page-header-eyebrow-dot" />
            {eyebrow}
          </div>
        )}

        {/* Title and Description */}
        <div className="page-header-title-row">
          <h1 className="page-header-title">
            {title}
          </h1>

          {badge && (
            <div className="page-header-badge">
              {badge}
            </div>
          )}
        </div>

        {subtitle && (
          <p className="page-header-subtitle">
            {subtitle}
          </p>
        )}

        {/* Additional Content */}
        {children && (
          <div className="page-header-extra">
            {children}
          </div>
        )}
      </div>

      {/* Header Actions */}
      {actions && (
        <div className="page-header-actions">
          {actions}
        </div>
      )}

      <style jsx>{`
        /* ======================================
           PAGE HEADER
        ====================================== */

        .page-header-component {
          width: 100%;
          min-width: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 22px;
          padding: 3px 0;
          margin-bottom: 5px;
        }

        .page-header-main {
          min-width: 0;
          flex: 1;
        }

        /* ======================================
           EYEBROW
        ====================================== */

        .page-header-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 9px;
          color: var(--muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .page-header-eyebrow-dot {
          width: 7px;
          height: 7px;
          display: inline-block;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 7px #65b9aa55;
        }

        /* ======================================
           BREADCRUMBS
        ====================================== */

        .page-header-breadcrumbs {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 11px;
          color: var(--muted);
          font-size: 10px;
        }

        .page-header-breadcrumb-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .page-header-breadcrumb-item a {
          color: var(--muted);
          transition: color .2s;
        }

        .page-header-breadcrumb-item a:hover {
          color: var(--teal);
        }

        .page-header-breadcrumb-item [aria-current="page"] {
          color: var(--teal-dark);
          font-weight: 750;
        }

        .page-header-separator {
          color: var(--line);
          font-size: 13px;
        }

        /* ======================================
           TITLE
        ====================================== */

        .page-header-title-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .page-header-title {
          margin: 0;
          color: var(--text);
          font-size: 27px;
          line-height: 1.3;
          font-weight: 820;
          letter-spacing: -.7px;
          overflow-wrap: anywhere;
        }

        .page-header-badge {
          display: inline-flex;
          align-items: center;
        }

        /* ======================================
           SUBTITLE
        ====================================== */

        .page-header-subtitle {
          max-width: 680px;
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.7;
        }

        /* ======================================
           ADDITIONAL CONTENT
        ====================================== */

        .page-header-extra {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }

        /* ======================================
           ACTIONS
        ====================================== */

        .page-header-actions {
          flex-shrink: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* ======================================
           RESPONSIVE TABLET
        ====================================== */

        @media (max-width: 900px) {
          .page-header-component {
            align-items: flex-start;
          }

          .page-header-title {
            font-size: 24px;
          }

          .page-header-actions {
            gap: 8px;
          }
        }

        /* ======================================
           RESPONSIVE MOBILE
        ====================================== */

        @media (max-width: 650px) {
          .page-header-component {
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
          }

          .page-header-title {
            font-size: 23px;
          }

          .page-header-subtitle {
            font-size: 10px;
          }

          .page-header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .page-header-extra {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .page-header-title {
            font-size: 21px;
          }

          .page-header-actions {
            gap: 7px;
          }
        }
      `}</style>
    </header>
  );
}