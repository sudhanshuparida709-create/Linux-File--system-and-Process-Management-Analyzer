export type DonutChartItem = {
  label: string;
  value: number;
  color?: string;
};

type DonutChartProps = {
  data: DonutChartItem[];
  title?: string;
  subtitle?: string;
  size?: number;
  strokeWidth?: number;
  centerValue?: string;
  centerLabel?: string;
  showLegend?: boolean;
  showPercentage?: boolean;
};

const DEFAULT_COLORS = [
  "#65b9aa",
  "#9b87d7",
  "#e5a66e",
  "#7da9d9",
  "#df7777",
  "#80b8cf",
];

export default function DonutChart({
  data,
  title = "Donut Chart",
  subtitle,
  size = 200,
  strokeWidth = 20,
  centerValue,
  centerLabel = "Total",
  showLegend = true,
  showPercentage = true,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce(
    (sum, item) => sum + Math.max(0, item.value),
    0
  );

  let accumulated = 0;

  const segments = data.map((item, index) => {
    const percentage =
      total > 0 ? Math.max(0, item.value) / total : 0;

    const segmentLength = percentage * circumference;
    const offset = accumulated;

    accumulated += segmentLength;

    return {
      ...item,
      percentage,
      segmentLength,
      offset,
      color:
        item.color ||
        DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    };
  });

  return (
    <section className="chart-component donut-chart">
      {title && (
        <div className="chart-component-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <span className="chart-total-badge">
            {data.length} Items
          </span>
        </div>
      )}

      {data.length === 0 ? (
        <div className="chart-empty">
          No data available
        </div>
      ) : (
        <div className="donut-chart-content">
          {/* Donut Visualization */}
          <div
            className="donut-chart-visual"
            style={{
              width: size,
              height: size,
            }}
          >
            <svg
              viewBox={`0 0 ${size} ${size}`}
              width="100%"
              height="100%"
              role="img"
              aria-label={title}
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="var(--track)"
                strokeWidth={strokeWidth}
              />

              {segments.map((segment, index) => (
                <circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="butt"
                  strokeDasharray={`${segment.segmentLength} ${
                    circumference - segment.segmentLength
                  }`}
                  strokeDashoffset={-segment.offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              ))}
            </svg>

            {/* Center Label */}
            <div className="donut-center">
              <strong>
                {centerValue ?? total.toLocaleString()}
              </strong>

              <span>{centerLabel}</span>
            </div>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="donut-legend">
              {segments.map((segment, index) => (
                <div
                  className="donut-legend-item"
                  key={index}
                >
                  <div className="donut-legend-name">
                    <span
                      className="donut-legend-color"
                      style={{
                        background: segment.color,
                      }}
                    />

                    <span>{segment.label}</span>
                  </div>

                  <div className="donut-legend-values">
                    <strong>
                      {segment.value.toLocaleString()}
                    </strong>

                    {showPercentage && (
                      <small>
                        {(segment.percentage * 100).toFixed(1)}%
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
          margin-bottom: 20px;
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

        .chart-total-badge {
          padding: 6px 10px;
          border-radius: 20px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          font-size: 9px;
          white-space: nowrap;
        }

        .donut-chart-content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 28px;
          padding: 12px 0;
        }

        .donut-chart-visual {
          flex-shrink: 0;
          position: relative;
          display: grid;
          place-items: center;
        }

        .donut-chart-visual svg {
          display: block;
          overflow: visible;
        }

        .donut-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .donut-center strong {
          color: var(--text);
          font-size: 25px;
          font-weight: 800;
        }

        .donut-center span {
          margin-top: 4px;
          color: var(--muted);
          font-size: 10px;
        }

        .donut-legend {
          flex: 1;
          min-width: 150px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .donut-legend-item,
        .donut-legend-name,
        .donut-legend-values {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .donut-legend-name {
          justify-content: flex-start;
          color: var(--muted);
          font-size: 10px;
        }

        .donut-legend-color {
          width: 9px;
          height: 9px;
          flex-shrink: 0;
          display: inline-block;
          border-radius: 50%;
        }

        .donut-legend-values {
          flex-shrink: 0;
        }

        .donut-legend-values strong {
          color: var(--text);
          font-size: 10px;
        }

        .donut-legend-values small {
          color: var(--muted);
          font-size: 9px;
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

          .donut-chart-content {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}