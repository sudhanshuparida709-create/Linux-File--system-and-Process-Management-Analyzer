export type LineChartSeries = {
  name: string;
  data: number[];
  color?: string;
};

type LineChartProps = {
  labels: string[];
  series: LineChartSeries[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
  valueSuffix?: string;
};

const SERIES_COLORS = [
  "#65b9aa",
  "#9b87d7",
  "#e5a66e",
  "#7da9d9",
  "#df7777",
];

export default function LineChart({
  labels,
  series,
  title = "Line Chart",
  subtitle,
  height = 250,
  showGrid = true,
  showDots = true,
  showLegend = true,
  valueSuffix = "",
}: LineChartProps) {
  const width = 640;
  const chartHeight = 230;

  const padding = {
    top: 20,
    right: 20,
    bottom: 35,
    left: 45,
  };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const allValues = series.flatMap((item) =>
    item.data.map((value) => Math.max(0, value))
  );

  const maximum = Math.max(...allValues, 1);
  const yMaximum = Math.ceil(maximum / 10) * 10 || 10;

  const getX = (index: number) =>
    padding.left +
    (index / Math.max(labels.length - 1, 1)) * plotWidth;

  const getY = (value: number) =>
    padding.top +
    plotHeight -
    (Math.max(0, value) / yMaximum) * plotHeight;

  const getPoints = (values: number[]) =>
    values
      .slice(0, labels.length)
      .map(
        (value, index) =>
          `${getX(index)},${getY(value)}`
      )
      .join(" ");

  return (
    <section className="chart-component line-chart">
      {title && (
        <div className="chart-component-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <span className="chart-series-count">
            {series.length} Series
          </span>
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="line-chart-legend">
          {series.map((item, index) => (
            <div
              className="line-chart-legend-item"
              key={item.name}
            >
              <span
                style={{
                  background:
                    item.color ||
                    SERIES_COLORS[index % SERIES_COLORS.length],
                }}
              />

              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {labels.length === 0 || series.length === 0 ? (
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
            {/* Horizontal Grid */}
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
                      y={y + 4}
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

            {/* Series Lines */}
            {series.map((item, seriesIndex) => {
              const color =
                item.color ||
                SERIES_COLORS[
                  seriesIndex % SERIES_COLORS.length
                ];

              const values = item.data.slice(0, labels.length);
              const points = getPoints(values);

              return (
                <g key={item.name}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  {showDots &&
                    values.map((value, pointIndex) => (
                      <g key={pointIndex}>
                        <circle
                          cx={getX(pointIndex)}
                          cy={getY(value)}
                          r="7"
                          fill={color}
                          opacity=".14"
                        />

                        <circle
                          cx={getX(pointIndex)}
                          cy={getY(value)}
                          r="3.5"
                          fill={color}
                          stroke="var(--panel)"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                </g>
              );
            })}

            {/* X Axis */}
            {labels.map((label, index) => (
              <text
                key={index}
                x={getX(index)}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity=".6"
              >
                {label}
              </text>
            ))}
          </svg>
        </div>
      )}

      {/* Latest Values */}
      {series.length > 0 && (
        <div className="line-chart-summary">
          {series.map((item, index) => {
            const latestValue =
              item.data[item.data.length - 1];

            return (
              <div
                className="line-chart-summary-item"
                key={item.name}
              >
                <div className="line-chart-summary-heading">
                  <span
                    style={{
                      background:
                        item.color ||
                        SERIES_COLORS[
                          index % SERIES_COLORS.length
                        ],
                    }}
                  />

                  <small>{item.name}</small>
                </div>

                <strong>
                  {latestValue ?? 0}
                  {valueSuffix}
                </strong>
              </div>
            );
          })}
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
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
        }

        .chart-component-header h3 {
          margin: 0;
          color: var(--text);
          font-size: 14px;
          font-weight: 750;
        }

        .chart-component-header p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 10px;
        }

        .chart-series-count {
          padding: 6px 10px;
          border-radius: 20px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          font-size: 9px;
          white-space: nowrap;
        }

        .line-chart-legend {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .line-chart-legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--muted);
          font-size: 10px;
        }

        .line-chart-legend-item span:first-child,
        .line-chart-summary-heading span {
          width: 9px;
          height: 9px;
          flex-shrink: 0;
          display: inline-block;
          border-radius: 50%;
        }

        .chart-empty {
          min-height: 180px;
          display: grid;
          place-items: center;
          color: var(--muted);
          font-size: 12px;
        }

        .line-chart-summary {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(100px, 1fr)
          );
          gap: 12px;
          margin-top: 17px;
          padding-top: 15px;
          border-top: 1px solid var(--line);
        }

        .line-chart-summary-item {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .line-chart-summary-heading {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .line-chart-summary-heading small {
          color: var(--muted);
          font-size: 9px;
        }

        .line-chart-summary-item > strong {
          color: var(--text);
          font-size: 15px;
        }

        @media (max-width: 480px) {
          .chart-component {
            padding: 13px;
          }

          .line-chart-legend {
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}