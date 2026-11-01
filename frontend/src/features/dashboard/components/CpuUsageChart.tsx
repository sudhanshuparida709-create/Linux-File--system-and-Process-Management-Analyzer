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
import { Activity, TrendingUp } from "lucide-react";

export interface CpuUsagePoint {
  time: string;
  usage: number;
}

interface CpuUsageChartProps {
  data?: CpuUsagePoint[];
  currentUsage?: number;
  title?: string;
  subtitle?: string;
}

const defaultData: CpuUsagePoint[] = [
  { time: "09:00", usage: 32 },
  { time: "09:05", usage: 45 },
  { time: "09:10", usage: 38 },
  { time: "09:15", usage: 56 },
  { time: "09:20", usage: 42 },
  { time: "09:25", usage: 61 },
  { time: "09:30", usage: 48 },
  { time: "09:35", usage: 68 },
  { time: "09:40", usage: 52 },
  { time: "09:45", usage: 44 },
  { time: "09:50", usage: 59 },
  { time: "09:55", usage: 42 },
];

export default function CpuUsageChart({
  data = defaultData,
  currentUsage,
  title = "CPU Usage",
  subtitle = "Processor utilization over time",
}: CpuUsageChartProps) {
  const latestUsage =
    currentUsage ?? data[data.length - 1]?.usage ?? 0;

  return (
    <section className="cpu-card">
      <div className="card-header">
        <div className="header-left">
          <div className="icon-wrapper">
            <Activity size={19} />
          </div>

          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>

        <div className="usage-info">
          <strong>{latestUsage.toFixed(1)}%</strong>
          <span>
            <TrendingUp size={13} />
            Live usage
          </span>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="cpuUsageGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6366f1"
                  stopOpacity={0.32}
                />
                <stop
                  offset="95%"
                  stopColor="#6366f1"
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
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
              tick={{ fill: "#9299aa", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 25, 50, 75, 100]}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(1)}%`,
                "CPU Usage",
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
              dataKey="usage"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#cpuUsageGradient)"
              activeDot={{
                r: 5,
                stroke: "#ffffff",
                strokeWidth: 2,
                fill: "#6366f1",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-footer">
        <span>
          <span className="legend-dot" />
          CPU utilization
        </span>
        <span>Scale: 0–100%</span>
      </div>

      <style jsx>{`
        .cpu-card {
          width: 100%;
          padding: 22px;
          border-radius: 22px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.28),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 22px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          color: #6366f1;
          border-radius: 13px;
          background: #f4f5fb;
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
          color: #6366f1;
          font-size: 25px;
          font-weight: 800;
        }

        .usage-info span {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #16a085;
          font-size: 10px;
          font-weight: 600;
        }

        .chart-container {
          width: 100%;
          height: 220px;
        }

        .chart-footer {
          display: flex;
          justify-content: space-between;
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
          background: #6366f1;
        }

        @media (max-width: 480px) {
          .cpu-card {
            padding: 16px;
          }

          .chart-container {
            height: 185px;
          }
        }
      `}</style>
    </section>
  );
}