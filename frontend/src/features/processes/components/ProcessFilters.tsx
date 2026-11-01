"use client";

import { Search, RefreshCw, SlidersHorizontal, X } from "lucide-react";

import type {
  ProcessFilterValue,
  ProcessState,
} from "./ProcessTable";

interface ProcessFiltersProps {
  value: ProcessFilterValue;
  onChange: (value: ProcessFilterValue) => void;
  onRefresh?: () => void;
  title?: string;
}

export default function ProcessFilters({
  value,
  onChange,
  onRefresh,
  title = "Filter Processes",
}: ProcessFiltersProps) {
  const updateFilter = (
    updates: Partial<ProcessFilterValue>,
  ) => {
    onChange({
      ...value,
      ...updates,
    });
  };

  const clearFilters = () => {
    onChange({
      query: "",
      state: "all",
      sortBy: "pid",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    value.query.trim() !== "" || value.state !== "all";

  return (
    <section className="filters-card">
      <div className="card-heading">
        <div className="heading-left">
          <div className="heading-icon">
            <SlidersHorizontal size={18} />
          </div>

          <div>
            <h3>{title}</h3>
            <p>Search, filter, and organize processes</p>
          </div>
        </div>

        {onRefresh && (
          <button
            type="button"
            className="refresh-button"
            onClick={onRefresh}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        )}
      </div>

      <div className="filter-controls">
        <label className="search-box">
          <Search size={16} />

          <input
            type="search"
            value={value.query}
            onChange={(event) =>
              updateFilter({ query: event.target.value })
            }
            placeholder="Search by name, PID, or user..."
            aria-label="Search processes"
          />

          {value.query && (
            <button
              type="button"
              className="clear-search"
              aria-label="Clear search"
              onClick={() => updateFilter({ query: "" })}
            >
              <X size={14} />
            </button>
          )}
        </label>

        <label className="select-group">
          <span>Status</span>

          <select
            value={value.state}
            onChange={(event) =>
              updateFilter({
                state: event.target.value as
                  | ProcessState
                  | "all",
              })
            }
            aria-label="Filter by process status"
          >
            <option value="all">All Processes</option>
            <option value="running">Running</option>
            <option value="sleeping">Sleeping</option>
            <option value="stopped">Stopped</option>
            <option value="zombie">Zombie</option>
            <option value="idle">Idle</option>
          </select>
        </label>

        <label className="select-group">
          <span>Sort By</span>

          <select
            value={value.sortBy}
            onChange={(event) =>
              updateFilter({
                sortBy: event.target.value as
                  ProcessFilterValue["sortBy"],
              })
            }
            aria-label="Sort processes by"
          >
            <option value="pid">Process ID</option>
            <option value="name">Process Name</option>
            <option value="cpu">CPU Usage</option>
            <option value="memory">Memory Usage</option>
          </select>
        </label>

        <label className="select-group">
          <span>Order</span>

          <select
            value={value.sortOrder}
            onChange={(event) =>
              updateFilter({
                sortOrder: event.target.value as
                  ProcessFilterValue["sortOrder"],
              })
            }
            aria-label="Sort order"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {hasActiveFilters && (
        <div className="filter-footer">
          <span>Filters applied</span>

          <button type="button" onClick={clearFilters}>
            <X size={13} />
            Clear filters
          </button>
        </div>
      )}

      <style jsx>{`
        .filters-card {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          background: #f4f5fb;
          box-shadow:
            7px 7px 16px rgba(163, 177, 198, 0.25),
            -7px -7px 16px rgba(255, 255, 255, 0.9);
        }

        .card-heading,
        .heading-left {
          display: flex;
          align-items: center;
        }

        .card-heading {
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .heading-left {
          gap: 11px;
        }

        .heading-icon {
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

        h3 {
          margin: 0;
          color: #20283b;
          font-size: 14px;
          font-weight: 700;
        }

        .heading-left p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 10px;
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 0 11px;
          color: #6366f1;
          border: none;
          border-radius: 9px;
          background: #e9eaff;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        .refresh-button:hover {
          background: #dfe1ff;
        }

        .filter-controls {
          display: grid;
          grid-template-columns: minmax(200px, 2fr) repeat(3, minmax(120px, 1fr));
          gap: 12px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 9px;
          min-height: 42px;
          padding: 0 12px;
          color: #9299aa;
          border-radius: 11px;
          background: #edf0f7;
          box-shadow:
            inset 3px 3px 6px rgba(163, 177, 198, 0.16),
            inset -3px -3px 6px rgba(255, 255, 255, 0.85);
        }

        .search-box input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          color: #273147;
          background: transparent;
          font-family: inherit;
          font-size: 11px;
        }

        .search-box input::placeholder {
          color: #a0a7b6;
        }

        .clear-search {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: #9299aa;
          border: none;
          border-radius: 6px;
          background: transparent;
          cursor: pointer;
        }

        .select-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .select-group span {
          color: #9299aa;
          font-size: 10px;
          font-weight: 600;
        }

        .select-group select {
          width: 100%;
          min-height: 42px;
          padding: 0 10px;
          color: #475569;
          border: 1px solid #e5e8f0;
          border-radius: 10px;
          outline: none;
          background: #f4f5fb;
          font-family: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .select-group select:focus {
          border-color: #a5a8ff;
        }

        .filter-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid #e3e7ef;
        }

        .filter-footer span {
          color: #9299aa;
          font-size: 10px;
        }

        .filter-footer button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px;
          color: #6366f1;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        @media (max-width: 850px) {
          .filter-controls {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .search-box {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .filters-card {
            padding: 15px;
          }

          .filter-controls {
            grid-template-columns: 1fr;
          }

          .search-box {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}