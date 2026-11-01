"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { HardDrive, Database } from "lucide-react";

interface StorageChartProps {
  used?: number;
  total?: number;
  unit?: string;
  title?: string;
}

export default function StorageChart({
  used = 186,
  total = 512,
  unit = "GB",
  title = "Storage Usage",
}: StorageChartProps) {
  const safeTotal = Math.max(total, 0);
  const safeUsed = Math.min(Math.max(used, 0), safeTotal);
  const available = Math.max(safeTotal - safeUsed, 0);

  const percentage =
    safeTotal > 0 ? (safeUsed / safeTotal) * 100 : 0;

  const chartData = [
    { name: "Used", value: safeUsed, color: "#6366f1" },
    { name: "Available", value: available, color: "#dfe3f0" },
  ];

  return (
    <section className="storage-card">
      <div className="card-header">
        <div className="icon-wrapper">
          <HardDrive size={18} />
        </div>

        <div>
          <h3>{title}</h3>
          <p>Disk capacity overview</p>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="88%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              stroke="none"
              cornerRadius={5}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(1)} ${unit}`,
                "Storage",
              ]}
              contentStyle={{
                border: "none",
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow: "0 8px 20px rgba(31, 41, 55, 0.12)",
                fontSize: "11px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="chart-center">
          <strong>{percentage.toFixed(1)}%</strong>
          <span>Used</span>
        </div>
      </div>

      <div className="storage-values">
        <div className="storage-row">
          <div className="row-label">
            <span className="dot used" />
            <span>Used Space</span>
          </div>

          <strong>
            {safeUsed.toFixed(1)} {unit}
          </strong>
        </div>

        <div className="storage-row">
          <div className="row-label">
            <span className="dot available" />
            <span>Available</span>
          </div>

          <strong>
            {available.toFixed(1)} {unit}
          </strong>
        </div>

        <div className="storage-row total-row">
          <div className="row-label">
            <Database size={13} />
            <span>Total Capacity</span>
          </div>

          <strong>
            {safeTotal.toFixed(1)} {unit}
          </strong>
        </div>
      </div>

      <style jsx>{`
        .storage-card {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.25),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: #6366f1;
          border-radius: 12px;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.2),
            inset -3px -3px 6px rgba(255, 255, 255, 0.9);
        }

        .card-header h3 {
          margin: 0;
          color: #20283b;
          font-size: 14px;
          font-weight: 700;
        }

        .card-header p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 10px;
        }

        .chart-wrapper {
          position: relative;
          width: 100%;
          height: 175px;
          margin: 10px 0;
        }

        .chart-center {
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .chart-center strong {
          color: #273147;
          font-size: 23px;
          font-weight: 800;
        }

        .chart-center span {
          color: #9299aa;
          font-size: 10px;
        }

        .storage-values {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-top: 12px;
        }

        .storage-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .row-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9299aa;
          font-size: 11px;
        }

        .storage-row strong {
          color: #273147;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot.used {
          background: #6366f1;
        }

        .dot.available {
          background: #cbd5e1;
        }

        .total-row {
          padding-top: 12px;
          border-top: 1px solid #e3e7ef;
        }

        .total-row .row-label {
          color: #647089;
        }
      `}</style>
    </section>
  );
}