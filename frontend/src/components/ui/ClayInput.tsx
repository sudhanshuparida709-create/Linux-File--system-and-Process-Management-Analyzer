"use client";

import {
  useState,
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type ClayInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: "sm" | "md" | "lg";
};

const ClayInput = forwardRef<HTMLInputElement, ClayInputProps>(
  function ClayInput(
    {
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      inputSize = "md",
      className = "",
      id,
      type = "text",
      ...props
    },
    ref
  ) {
    const [visible, setVisible] = useState(false);
    const generatedId = `clay-input-${props.name || "field"}`;
    const inputId = id || generatedId;
    const actualType =
      type === "password" && visible ? "text" : type;

    return (
      <div className="clay-input-field">
        {label && (
          <label htmlFor={inputId} className="clay-input-label">
            {label}
            {props.required && (
              <span className="clay-input-required"> *</span>
            )}
          </label>
        )}

        <div
          className={[
            "clay-input-wrapper",
            `clay-input-${inputSize}`,
            error ? "clay-input-invalid" : "",
            className,
          ].filter(Boolean).join(" ")}
        >
          {leftIcon && (
            <span className="clay-input-icon clay-input-left-icon">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className="clay-input-control"
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            {...props}
          />

          {type === "password" ? (
            <button
              type="button"
              className="clay-input-password-toggle"
              onClick={() => setVisible((previous) => !previous)}
              aria-label={
                visible ? "Hide password" : "Show password"
              }
            >
              {visible ? "Hide" : "Show"}
            </button>
          ) : rightIcon ? (
            <span className="clay-input-icon clay-input-right-icon">
              {rightIcon}
            </span>
          ) : null}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="clay-input-error">
            <span>!</span>
            {error}
          </p>
        )}

        {!error && hint && (
          <p id={`${inputId}-hint`} className="clay-input-hint">
            {hint}
          </p>
        )}

        <style jsx>{`
          .clay-input-field {
            width: 100%;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .clay-input-label {
            color: var(--text);
            font-size: 10px;
            font-weight: 750;
          }

          .clay-input-required {
            color: #d87979;
          }

          .clay-input-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid transparent;
            border-radius: 12px;
            background: var(--surface);
            box-shadow: var(--shadow-in);
            transition: border-color .2s;
          }

          .clay-input-sm {
            min-height: 35px;
            padding: 0 10px;
          }

          .clay-input-md {
            min-height: 43px;
            padding: 0 13px;
          }

          .clay-input-lg {
            min-height: 50px;
            padding: 0 15px;
          }

          .clay-input-wrapper:focus-within {
            border-color: var(--teal, #65b9aa);
          }

          .clay-input-invalid {
            border-color: #d87979;
          }

          .clay-input-control {
            width: 100%;
            min-width: 0;
            flex: 1;
            border: 0;
            outline: 0;
            background: transparent;
            color: var(--text);
            font-family: inherit;
            font-size: 11px;
          }

          .clay-input-control::placeholder {
            color: var(--muted);
          }

          .clay-input-control:disabled {
            cursor: not-allowed;
            opacity: .6;
          }

          .clay-input-icon {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--muted);
          }

          .clay-input-password-toggle {
            border: 0;
            padding: 5px;
            color: var(--teal-dark, #438f84);
            background: transparent;
            font-size: 9px;
            font-weight: 750;
            cursor: pointer;
          }

          .clay-input-error,
          .clay-input-hint {
            margin: 0;
            font-size: 9px;
            line-height: 1.5;
          }

          .clay-input-error {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #cf7070;
          }

          .clay-input-error span {
            width: 13px;
            height: 13px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: #e58e8e20;
            font-weight: 800;
          }

          .clay-input-hint {
            color: var(--muted);
          }
        `}</style>
      </div>
    );
  }
);

ClayInput.displayName = "ClayInput";

export default ClayInput;