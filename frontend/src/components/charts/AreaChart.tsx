import { useId } from "react";

export type AreaChartPoint = {
  label: string;
  value: number;
};

type AreaChartProps = {
  data: AreaChartPoint[];
  title?: string;
  subtitle?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showDots?: boolean;
  valueSuffix?: string;
};

export default function AreaChart({
  data,
  title = "Area Chart",
  subtitle,
  color = "#65b9aa",
  height = 240,
  showGrid = true,
  showDots = true,
  valueSuffix = "",
}: AreaChartProps) {
  const gradientId = useId().replace(/:/g, "");

  const width = 640;
  const chartHeight = 220;

  const padding = {
    top: 15,
    right: 15,
    bottom: 35,
    left: 42,
  };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const values = data.map((item) => Math.max(0, item.value));
  const maximum = Math.max(...values, 1);
  const yMaximum = Math.ceil(maximum / 10) * 10 || 10;

  const getX = (index: number) =>
    padding.left +
    (index / Math.max(data.length - 1, 1)) * plotWidth;

  const getY = (value: number) =>
    padding.top + plotHeight - (value / yMaximum) * plotHeight;

  const points = data.map((item, index) => ({
    x: getX(index),
    y: getY(Math.max(0, item.value)),
    ...item,
  }));

  const linePath =
    points.length > 0
      ? points
          .map(
            (point, index) =>
              `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
          )
          .join(" ")
      : "";

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${
          padding.top + plotHeight
        } L ${points[0].x} ${padding.top + plotHeight} Z`
      : "";

  return (
    <section className="chart-component area-chart">
      {title && (
        <div className="chart-component-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>

          {data.length > 0 && (
            <div className="chart-current-value">
              <span>Latest</span>
              <strong>
                {data[data.length - 1].value}
                {valueSuffix}
              </strong>
            </div>
          )}
        </div>
      )}

      {data.length === 0 ? (
        <div className="chart-empty">
          No data available
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <svg
            viewBox={`0 0 ${width} ${chartHeight}`}
            width="100%"
            height={height}
            preserveAspectRatio="none"
            role="img"
            aria-label={title}
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={color}
                  stopOpacity=".30"
                />

                <stop
                  offset="100%"
                  stopColor={color}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {showGrid &&
              Array.from({ length: 5 }).map((_, index) => {
                const y =
                  padding.top + (plotHeight / 4) * index;

                const value = Math.round(
                  yMaximum - (yMaximum / 4) * index
                );

                return (
                  <g key={index}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity=".12"
                      strokeDasharray="4 5"
                    />

                    <text
                      x={padding.left - 9}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="10"
                      fill="currentColor"
                      opacity=".55"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}

            {/* Area */}
            <path
              d={areaPath}
              fill={`url(#${gradientId})`}
            />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {showDots &&
              points.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="7"
                    fill={color}
                    opacity=".13"
                  />

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3.5"
                    fill={color}
                    stroke="var(--panel)"
                    strokeWidth="2"
                  />
                </g>
              ))}

            {/* X Axis Labels */}
            {points.map((point, index) => (
              <text
                key={index}
                x={point.x}
                y={chartHeight - 8}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity=".6"
              >
                {point.label}
              </text>
            ))}
          </svg>
        </div>
      )}

      <style jsx>{`
        .chart-component {
          width: 100%;
          min-width: 0;
          padding: 18px;
          border-radius: 18px;
          background: var(--panel);
          box-shadow: var(--shadow-out);
        }

        .chart-component-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .chart-component-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 750;
          color: var(--text);
        }

        .chart-component-header p {
          margin: 5px 0 0;
          font-size: 10px;
          color: var(--muted);
        }

        .chart-current-value {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: right;
        }

        .chart-current-value span {
          color: var(--muted);
          font-size: 9px;
        }

        .chart-current-value strong {
          color: var(--text);
          font-size: 19px;
        }

        .chart-empty {
          min-height: 180px;
          display: grid;
          place-items: center;
          color: var(--muted);
          font-size: 12px;
        }

        @media (max-width: 480px) {
          .chart-component {
            padding: 13px;
          }
        }
      `}</style>
    </section>
  );
}