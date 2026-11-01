import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

type MetricTone = "blue" | "purple" | "green" | "orange" | "red";

interface MetricTrend {
  value: number;
  label?: string;
  direction?: "up" | "down" | "neutral";
  tone?: "good" | "bad" | "neutral";
}

interface MetricCardProps {
  title: string;
  value: ReactNode;
  unit?: string;
  icon?: LucideIcon;
  tone?: MetricTone;
  trend?: MetricTrend;
  description?: string;
  footer?: ReactNode;
  loading?: boolean;
}

export default function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  tone = "blue",
  trend,
  description,
  footer,
  loading = false,
}: MetricCardProps) {
  const direction = trend?.direction ?? "neutral";

  const TrendIcon =
    direction === "up"
      ? ArrowUpRight
      : direction === "down"
        ? ArrowDownRight
        : Minus;

  return (
    <article className={`metric-card ${tone}`}>
      <div className="card-top">
        <div className="title-group">
          <div className="icon-wrapper">
            {Icon && <Icon size={20} strokeWidth={2} />}
          </div>

          <span className="metric-title">{title}</span>
        </div>

        {trend && (
          <span className={`trend ${trend.tone ?? "neutral"}`}>
            <TrendIcon size={14} />
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {loading ? (
        <div className="skeleton">
          <span />
          <span />
        </div>
      ) : (
        <>
          <div className="metric-value">
            <strong>{value}</strong>
            {unit && <span>{unit}</span>}
          </div>

          {description && (
            <p className="description">{description}</p>
          )}
        </>
      )}

      {(trend?.label || footer) && !loading && (
        <div className="card-footer">
          <span>{trend?.label}</span>
          {footer}
        </div>
      )}

      <style jsx>{`
        .metric-card {
          min-width: 0;
          padding: 20px;
          border-radius: 20px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.25),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .metric-card:hover {
          transform: translateY(-3px);
          box-shadow:
            9px 9px 19px rgba(163, 177, 198, 0.3),
            -9px -9px 19px rgba(255, 255, 255, 0.95);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 13px;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.2),
            inset -3px -3px 6px rgba(255, 255, 255, 0.9);
        }

        .metric-title {
          overflow: hidden;
          color: #647089;
          font-size: 12px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .blue .icon-wrapper {
          color: #6366f1;
        }

        .purple .icon-wrapper {
          color: #8b5cf6;
        }

        .green .icon-wrapper {
          color: #0d9488;
        }

        .orange .icon-wrapper {
          color: #ea580c;
        }

        .red .icon-wrapper {
          color: #dc2626;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 5px 7px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .trend.good {
          color: #0d9488;
          background: #d9f5ef;
        }

        .trend.bad {
          color: #dc2626;
          background: #fee2e2;
        }

        .trend.neutral {
          color: #64748b;
          background: #e9edf5;
        }

        .metric-value {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: 20px;
        }

        .metric-value strong {
          overflow: hidden;
          color: #20283b;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -1px;
          text-overflow: ellipsis;
        }

        .metric-value > span {
          color: #9299aa;
          font-size: 13px;
          font-weight: 600;
        }

        .description {
          margin: 6px 0 0;
          color: #9299aa;
          font-size: 11px;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #e4e7ef;
          color: #9299aa;
          font-size: 10px;
        }

        .skeleton {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .skeleton span {
          height: 25px;
          border-radius: 7px;
          background: linear-gradient(
            90deg,
            #e5e8f0 25%,
            #f0f2f7 50%,
            #e5e8f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .skeleton span:first-child {
          width: 65%;
        }

        .skeleton span:last-child {
          width: 40%;
          height: 10px;
        }

        @keyframes shimmer {
          to {
            background-position: -200% 0;
          }
        }

        @media (max-width: 480px) {
          .metric-card {
            padding: 15px;
          }

          .metric-value strong {
            font-size: 25px;
          }
        }
      `}</style>
    </article>
  );
}