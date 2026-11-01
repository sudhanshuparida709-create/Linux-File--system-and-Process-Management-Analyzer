"use client";

import {
  forwardRef,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";

export type ClaySelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type ClaySelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  label?: string;
  hint?: string;
  error?: string;
  options: ClaySelectOption[];
  placeholder?: string;
  selectSize?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
};

const ClaySelect = forwardRef<HTMLSelectElement, ClaySelectProps>(
  function ClaySelect(
    {
      label,
      hint,
      error,
      options,
      placeholder = "Select an option",
      selectSize = "md",
      leftIcon,
      className = "",
      id,
      ...props
    },
    ref
  ) {
    const selectId = id || `clay-select-${props.name || "field"}`;

    return (
      <div className="clay-select-field">
        {label && (
          <label htmlFor={selectId} className="clay-select-label">
            {label}
            {props.required && (
              <span className="clay-select-required"> *</span>
            )}
          </label>
        )}

        <div
          className={[
            "clay-select-wrapper",
            `clay-select-${selectSize}`,
            error ? "clay-select-invalid" : "",
            className,
          ].filter(Boolean).join(" ")}
        >
          {leftIcon && (
            <span className="clay-select-icon">{leftIcon}</span>
          )}

          <select
            ref={ref}
            id={selectId}
            className="clay-select-control"
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${selectId}-error`
                : hint
                  ? `${selectId}-hint`
                  : undefined
            }
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <span className="clay-select-arrow" aria-hidden="true">
            ⌄
          </span>
        </div>

        {error && (
          <p id={`${selectId}-error`} className="clay-select-error">
            {error}
          </p>
        )}

        {!error && hint && (
          <p id={`${selectId}-hint`} className="clay-select-hint">
            {hint}
          </p>
        )}

        <style jsx>{`
          .clay-select-field {
            width: 100%;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .clay-select-label {
            color: var(--text);
            font-size: 10px;
            font-weight: 750;
          }

          .clay-select-required {
            color: #d87979;
          }

          .clay-select-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 9px;
            border: 1px solid transparent;
            border-radius: 12px;
            background: var(--surface);
            box-shadow: var(--shadow-in);
            transition: border-color .2s;
          }

          .clay-select-sm {
            min-height: 35px;
            padding: 0 10px;
          }

          .clay-select-md {
            min-height: 43px;
            padding: 0 13px;
          }

          .clay-select-lg {
            min-height: 50px;
            padding: 0 15px;
          }

          .clay-select-wrapper:focus-within {
            border-color: var(--teal, #65b9aa);
          }

          .clay-select-invalid {
            border-color: #d87979;
          }

          .clay-select-control {
            width: 100%;
            min-width: 0;
            flex: 1;
            appearance: none;
            border: 0;
            outline: 0;
            background: transparent;
            color: var(--text);
            font-family: inherit;
            font-size: 11px;
            cursor: pointer;
          }

          .clay-select-control option {
            color: #293443;
            background: white;
          }

          .clay-select-icon {
            display: inline-flex;
            flex-shrink: 0;
            color: var(--muted);
          }

          .clay-select-arrow {
            flex-shrink: 0;
            color: var(--muted);
            pointer-events: none;
            font-size: 15px;
          }

          .clay-select-error,
          .clay-select-hint {
            margin: 0;
            font-size: 9px;
            line-height: 1.5;
          }

          .clay-select-error {
            color: #cf7070;
          }

          .clay-select-hint {
            color: var(--muted);
          }
        `}</style>
      </div>
    );
  }
);

ClaySelect.displayName = "ClaySelect";

export default ClaySelect;