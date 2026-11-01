"use client";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ClayButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost"
  | "success";

type ClayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ClayButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function ClayButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = "",
  type = "button",
  ...props
}: ClayButtonProps) {
  return (
    <>
      <button
        type={type}
        disabled={disabled || loading}
        className={[
          "clay-button",
          `clay-button-${variant}`,
          `clay-button-${size}`,
          fullWidth ? "clay-button-full" : "",
          loading ? "clay-button-loading" : "",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      >
        {loading ? (
          <span className="clay-button-spinner" />
        ) : leftIcon ? (
          <span className="clay-button-icon">{leftIcon}</span>
        ) : null}

        <span>{loading ? "Please wait..." : children}</span>

        {!loading && rightIcon && (
          <span className="clay-button-icon">{rightIcon}</span>
        )}
      </button>

      <style jsx>{`
        .clay-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid transparent;
          border-radius: 12px;
          font-family: inherit;
          font-weight: 750;
          cursor: pointer;
          white-space: nowrap;
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            background .2s ease;
        }

        .clay-button-sm {
          min-height: 33px;
          padding: 7px 12px;
          font-size: 10px;
        }

        .clay-button-md {
          min-height: 40px;
          padding: 10px 17px;
          font-size: 11px;
        }

        .clay-button-lg {
          min-height: 47px;
          padding: 12px 22px;
          font-size: 12px;
        }

        .clay-button-full {
          width: 100%;
        }

        .clay-button-primary {
          color: white;
          background: linear-gradient(135deg, #69bcae, #4b9e91);
          box-shadow:
            4px 4px 9px #a8b9b3,
            -4px -4px 9px #ffffff;
        }

        .clay-button-secondary {
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .clay-button-outline {
          color: var(--teal-dark, #438f84);
          background: transparent;
          border-color: var(--teal, #65b9aa);
        }

        .clay-button-danger {
          color: white;
          background: linear-gradient(135deg, #e58e8e, #ce7070);
          box-shadow: 4px 4px 9px #d3b9b9, -4px -4px 9px #fff;
        }

        .clay-button-success {
          color: white;
          background: linear-gradient(135deg, #70bea4, #4c9c7f);
          box-shadow: var(--shadow-out);
        }

        .clay-button-ghost {
          color: var(--muted);
          background: transparent;
        }

        .clay-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .clay-button-primary:hover:not(:disabled),
        .clay-button-secondary:hover:not(:disabled),
        .clay-button-success:hover:not(:disabled),
        .clay-button-danger:hover:not(:disabled) {
          box-shadow: var(--shadow-out);
        }

        .clay-button:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: var(--shadow-in);
        }

        .clay-button:disabled {
          opacity: .55;
          cursor: not-allowed;
          transform: none;
        }

        .clay-button:focus-visible {
          outline: 3px solid #65b9aa55;
          outline-offset: 3px;
        }

        .clay-button-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .clay-button-spinner {
          width: 13px;
          height: 13px;
          border: 2px solid #ffffff65;
          border-top-color: white;
          border-radius: 50%;
          animation: clay-spin .7s linear infinite;
        }

        @keyframes clay-spin {
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .clay-button,
          .clay-button-spinner {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
}