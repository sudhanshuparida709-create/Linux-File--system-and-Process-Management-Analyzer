"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MemoryStick, Activity } from "lucide-react";

export interface MemoryUsagePoint {
  time: string;
  used: number;
  available: number;
}

interface MemoryUsageChartProps {
  data?: MemoryUsagePoint[];
  used?: number;
  total?: number;
  title?: string;
  subtitle?: string;
  unit?: string;
}

const defaultRatios = [
  0.32, 0.38, 0.42, 0.36, 0.48, 0.53,
  0.46, 0.58, 0.52, 0.43, 0.4, 0.36,
];

const defaultTimes = [
  "09:00",
  "09:05",
  "09:10",
  "09:15",
  "09:20",
  "09:25",
  "09:30",
  "09:35",
  "09:40",
  "09:45",
  "09:50",
  "09:55",
];

export default function MemoryUsageChart({
  data,
  used = 5.8,
  total = 16,
  title = "Memory Usage",
  subtitle = "RAM utilization over time",
  unit = "GB",
}: MemoryUsageChartProps) {
  const safeTotal = Math.max(total, 0);
  const safeUsed = Math.min(Math.max(used, 0), safeTotal);
  const available = Math.max(safeTotal - safeUsed, 0);

  const percentage =
    safeTotal > 0 ? (safeUsed / safeTotal) * 100 : 0;

  const chartData =
    data ??
    defaultRatios.map((ratio, index) => ({
      time: defaultTimes[index],
      used: safeTotal * ratio,
      available: safeTotal * (1 - ratio),
    }));

  const formatValue = (value: number) => `${value.toFixed(1)} ${unit}`;

  return (
    <section className="memory-card">
      <div className="card-header">
        <div className="header-left">
          <div className="icon-wrapper">
            <MemoryStick size={19} />
          </div>

          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>

        <div className="usage-info">
          <strong>{percentage.toFixed(1)}%</strong>
          <span>
            <Activity size={13} />
            Memory usage
          </span>
        </div>
      </div>

      <div className="memory-summary">
        <div>
          <span className="summary-dot used-dot" />
          <span>Used</span>
          <strong>{formatValue(safeUsed)}</strong>
        </div>

        <div>
          <span className="summary-dot available-dot" />
          <span>Available</span>
          <strong>{formatValue(available)}</strong>
        </div>

        <div>
          <span className="summary-dot total-dot" />
          <span>Total</span>
          <strong>{formatValue(safeTotal)}</strong>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            stackOffset="none"
            margin={{ top: 12, right: 12, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="memoryUsedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e8eaf2"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#9299aa", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={25}
            />

            <YAxis
              domain={[0, safeTotal || 1]}
              tickFormatter={(value: number) => `${value}`}
              tick={{ fill: "#9299aa", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                formatValue(Number(value)),
                "Memory Used",
              ]}
              contentStyle={{
                border: "none",
                borderRadius: "12px",
                background: "#ffffff",
                boxShadow: "0 8px 25px rgba(31, 41, 55, 0.12)",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="used"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#memoryUsedGradient)"
              activeDot={{
                r: 5,
                stroke: "#ffffff",
                strokeWidth: 2,
                fill: "#8b5cf6",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-footer">
        <span>
          <span className="legend-dot" />
          RAM consumption
        </span>
        <span>Capacity: {formatValue(safeTotal)}</span>
      </div>

      <style jsx>{`
        .memory-card {
          width: 100%;
          padding: 22px;
          border-radius: 22px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.28),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-header,
        .header-left {
          display: flex;
          align-items: center;
        }

        .card-header {
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 18px;
        }

        .header-left {
          gap: 12px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          color: #8b5cf6;
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

        .header-left p {
          margin: 5px 0 0;
          color: #8b93a6;
          font-size: 11px;
        }

        .usage-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .usage-info strong {
          color: #8b5cf6;
          font-size: 25px;
          font-weight: 800;
        }

        .usage-info span {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #8b93a6;
          font-size: 10px;
        }

        .memory-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 14px;
        }

        .memory-summary > div {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #9299aa;
          font-size: 10px;
        }

        .memory-summary strong {
          color: #273147;
          font-size: 11px;
          font-weight: 700;
        }

        .summary-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .used-dot {
          background: #8b5cf6;
        }

        .available-dot {
          background: #c4b5fd;
        }

        .total-dot {
          background: #94a3b8;
        }

        .chart-container {
          width: 100%;
          height: 185px;
        }

        .chart-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 10px;
          color: #9299aa;
          font-size: 10px;
        }

        .chart-footer > span:first-child {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8b5cf6;
        }

        @media (max-width: 480px) {
          .memory-card {
            padding: 16px;
          }

          .memory-summary {
            gap: 10px;
          }

          .chart-container {
            height: 165px;
          }
        }
      `}</style>
    </section>
  );
}