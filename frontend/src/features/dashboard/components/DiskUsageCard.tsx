import { HardDrive, Database, CircleCheck } from "lucide-react";

interface DiskUsageCardProps {
  used?: number;
  total?: number;
  unit?: string;
  diskName?: string;
  mountPoint?: string;
  subtitle?: string;
}

function formatStorage(value: number, unit: string) {
  return `${value.toFixed(1)} ${unit}`;
}

export default function DiskUsageCard({
  used = 186,
  total = 512,
  unit = "GB",
  diskName = "Main Disk",
  mountPoint = "/",
  subtitle = "Storage utilization",
}: DiskUsageCardProps) {
  const safeTotal = Math.max(total, 0);
  const safeUsed = Math.max(used, 0);
  const available = Math.max(safeTotal - safeUsed, 0);

  const percentage =
    safeTotal > 0
      ? Math.min((safeUsed / safeTotal) * 100, 100)
      : 0;

  const isHighUsage = percentage >= 85;

  return (
    <section className="disk-card">
      <div className="card-header">
        <div className="heading">
          <div className="icon-wrapper">
            <HardDrive size={20} />
          </div>

          <div>
            <h3>{diskName}</h3>
            <p>{subtitle}</p>
          </div>
        </div>

        <span className={`status ${isHighUsage ? "warning" : "normal"}`}>
          {isHighUsage ? "High usage" : "Healthy"}
        </span>
      </div>

      <div className="disk-main">
        <div className="disk-icon">
          <Database size={28} />
        </div>

        <div className="percentage-info">
          <strong>{percentage.toFixed(1)}%</strong>
          <span>Used space</span>
        </div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Disk usage"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`progress-fill ${isHighUsage ? "high" : ""}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="storage-details">
        <div>
          <span className="detail-label">
            <span className="used-dot" />
            Used
          </span>
          <strong>{formatStorage(safeUsed, unit)}</strong>
        </div>

        <div>
          <span className="detail-label">
            <span className="available-dot" />
            Available
          </span>
          <strong>{formatStorage(available, unit)}</strong>
        </div>
      </div>

      <div className="disk-footer">
        <span>
          <HardDrive size={13} />
          {mountPoint}
        </span>

        <span>
          <CircleCheck size={13} />
          Total: {formatStorage(safeTotal, unit)}
        </span>
      </div>

      <style jsx>{`
        .disk-card {
          width: 100%;
          padding: 22px;
          border-radius: 22px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.28),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-header,
        .heading {
          display: flex;
          align-items: center;
        }

        .card-header {
          justify-content: space-between;
          gap: 10px;
        }

        .heading {
          gap: 12px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          color: #0d9488;
          border-radius: 13px;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.2),
            inset -3px -3px 6px rgba(255, 255, 255, 0.9);
        }

        h3 {
          margin: 0;
          color: #20283b;
          font-size: 15px;
          font-weight: 700;
        }

        .heading p {
          margin: 5px 0 0;
          color: #8b93a6;
          font-size: 11px;
        }

        .status {
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status.normal {
          color: #0d9488;
          background: #d9f5ef;
        }

        .status.warning {
          color: #c2410c;
          background: #ffedd5;
        }

        .disk-main {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 28px 0 22px;
        }

        .disk-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 65px;
          height: 65px;
          color: #0d9488;
          border-radius: 20px;
          box-shadow:
            5px 5px 10px rgba(163, 177, 198, 0.22),
            -5px -5px 10px rgba(255, 255, 255, 0.85);
        }

        .percentage-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .percentage-info strong {
          color: #20283b;
          font-size: 30px;
          font-weight: 800;
        }

        .percentage-info span {
          color: #9299aa;
          font-size: 11px;
        }

        .progress-track {
          height: 11px;
          overflow: hidden;
          border-radius: 20px;
          background: #e1e5ef;
          box-shadow: inset 2px 2px 5px rgba(163, 177, 198, 0.3);
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #14b8a6, #0d9488);
          transition: width 0.4s ease;
        }

        .progress-fill.high {
          background: linear-gradient(90deg, #fb923c, #ea580c);
        }

        .storage-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 22px;
        }

        .storage-details > div {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #9299aa;
          font-size: 11px;
        }

        .storage-details strong {
          color: #273147;
          font-size: 14px;
        }

        .used-dot,
        .available-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .used-dot {
          background: #0d9488;
        }

        .available-dot {
          background: #cbd5e1;
        }

        .disk-footer {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid #e4e7ef;
          color: #9299aa;
          font-size: 10px;
        }

        .disk-footer span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>
    </section>
  );
}