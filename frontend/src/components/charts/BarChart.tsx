export type BarChartItem = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: BarChartItem[];
  title?: string;
  subtitle?: string;
  color?: string;
  height?: number;
  horizontal?: boolean;
  showGrid?: boolean;
  showValues?: boolean;
  valueSuffix?: string;
};

export default function BarChart({
  data,
  title = "Bar Chart",
  subtitle,
  color = "#65b9aa",
  height = 240,
  horizontal = false,
  showGrid = true,
  showValues = true,
  valueSuffix = "",
}: BarChartProps) {
  const width = 640;
  const chartHeight = 240;

  const padding = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 45,
  };

  const values = data.map((item) => Math.max(0, item.value));
  const maximum = Math.max(...values, 1);
  const yMaximum = Math.ceil(maximum / 10) * 10 || 10;

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const slotWidth = plotWidth / Math.max(data.length, 1);
  const barWidth = Math.min(slotWidth * 0.55, 48);

  return (
    <section className="chart-component bar-chart">
      {title && (
        <div className="chart-component-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <span className="chart-item-count">
            {data.length} Categories
          </span>
        </div>
      )}

      {data.length === 0 ? (
        <div className="chart-empty">
          No data available
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          {horizontal ? (
            <div className="horizontal-chart">
              {data.map((item, index) => (
                <div className="horizontal-chart-row" key={index}>
                  <div className="horizontal-chart-label">
                    {item.label}
                  </div>

                  <div className="horizontal-chart-track">
                    <div
                      className="horizontal-chart-fill"
                      style={{
                        width: `${(Math.max(0, item.value) / maximum) * 100}%`,
                        background: item.color || color,
                      }}
                    />
                  </div>

                  {showValues && (
                    <strong className="horizontal-chart-value">
                      {item.value}
                      {valueSuffix}
                    </strong>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <svg
              viewBox={`0 0 ${width} ${chartHeight}`}
              width="100%"
              height={height}
              preserveAspectRatio="none"
              role="img"
              aria-label={title}
            >
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

              {/* Bars */}
              {data.map((item, index) => {
                const barHeight =
                  (Math.max(0, item.value) / yMaximum) *
                  plotHeight;

                const x =
                  padding.left +
                  slotWidth * index +
                  (slotWidth - barWidth) / 2;

                const y =
                  padding.top + plotHeight - barHeight;

                const barColor = item.color || color;

                return (
                  <g key={index}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(barHeight, 0)}
                      rx="7"
                      fill={barColor}
                      opacity=".88"
                    />

                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.min(5, barHeight)}
                      rx="3"
                      fill="#ffffff"
                      opacity=".2"
                    />

                    {showValues && (
                      <text
                        x={x + barWidth / 2}
                        y={Math.max(y - 8, 12)}
                        textAnchor="middle"
                        fontSize="10"
                        fill="currentColor"
                        fontWeight="600"
                      >
                        {item.value}
                        {valueSuffix}
                      </text>
                    )}

                    <text
                      x={x + barWidth / 2}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      fontSize="10"
                      fill="currentColor"
                      opacity=".6"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
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

        .chart-item-count {
          padding: 6px 10px;
          border-radius: 20px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-small);
          font-size: 9px;
        }

        .chart-empty {
          min-height: 180px;
          display: grid;
          place-items: center;
          color: var(--muted);
          font-size: 12px;
        }

        .horizontal-chart {
          display: flex;
          flex-direction: column;
          gap: 19px;
          padding: 10px 0;
        }

        .horizontal-chart-row {
          display: grid;
          grid-template-columns: 105px minmax(0, 1fr) 48px;
          align-items: center;
          gap: 12px;
        }

        .horizontal-chart-label {
          color: var(--text);
          font-size: 10px;
          overflow-wrap: anywhere;
        }

        .horizontal-chart-track {
          height: 10px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .horizontal-chart-fill {
          height: 100%;
          border-radius: inherit;
          transition: width .3s ease;
        }

        .horizontal-chart-value {
          color: var(--text);
          font-size: 10px;
          text-align: right;
        }

        @media (max-width: 480px) {
          .chart-component {
            padding: 13px;
          }

          .horizontal-chart-row {
            grid-template-columns: 75px minmax(0, 1fr) 42px;
            gap: 7px;
          }
        }
      `}</style>
    </section>
  );
}