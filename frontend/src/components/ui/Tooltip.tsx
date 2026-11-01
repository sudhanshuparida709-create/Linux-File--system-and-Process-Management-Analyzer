"use client";

import {
  useState,
  type ReactNode,
} from "react";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
};

export default function Tooltip({
  children,
  content,
  position = "top",
  delay = 150,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const showTooltip = () => {
    if (disabled) return;

    const timeout = setTimeout(() => {
      setVisible(true);
    }, Math.max(0, delay));

    setTimer(timeout);
  };

  const hideTooltip = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setVisible(false);
  };

  return (
    <span
      className="clay-tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {!disabled && visible && (
        <span
          className={`clay-tooltip clay-tooltip-${position}`}
          role="tooltip"
        >
          <span className="clay-tooltip-content">
            {content}
          </span>

          <span className="clay-tooltip-arrow" />
        </span>
      )}

      <style jsx>{`
        .clay-tooltip-container {
          position: relative;
          display: inline-flex;
          width: fit-content;
          max-width: 100%;
        }

        .clay-tooltip {
          position: absolute;
          z-index: 500;
          width: max-content;
          max-width: 240px;
          pointer-events: none;
          animation: clay-tooltip-appear .15s ease;
        }

        .clay-tooltip-content {
          display: block;
          padding: 8px 11px;
          border: 1px solid var(--line, #dce2e9);
          border-radius: 9px;
          color: var(--text, #344052);
          background: var(--surface, #edf1f5);
          box-shadow:
            4px 4px 10px rgba(163, 177, 198, .35),
            -3px -3px 9px rgba(255, 255, 255, .8);
          font-size: 9px;
          font-weight: 650;
          line-height: 1.5;
          text-align: center;
        }

        .clay-tooltip-arrow {
          width: 8px;
          height: 8px;
          position: absolute;
          background: var(--surface, #edf1f5);
          border: 1px solid var(--line, #dce2e9);
          transform: rotate(45deg);
        }

        .clay-tooltip-top {
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
        }

        .clay-tooltip-top .clay-tooltip-arrow {
          bottom: -5px;
          left: calc(50% - 4px);
          border-top: 0;
          border-left: 0;
        }

        .clay-tooltip-bottom {
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
        }

        .clay-tooltip-bottom .clay-tooltip-arrow {
          top: -5px;
          left: calc(50% - 4px);
          border-right: 0;
          border-bottom: 0;
        }

        .clay-tooltip-left {
          top: 50%;
          right: calc(100% + 10px);
          transform: translateY(-50%);
        }

        .clay-tooltip-left .clay-tooltip-arrow {
          top: calc(50% - 4px);
          right: -5px;
          border-left: 0;
          border-bottom: 0;
        }

        .clay-tooltip-right {
          top: 50%;
          left: calc(100% + 10px);
          transform: translateY(-50%);
        }

        .clay-tooltip-right .clay-tooltip-arrow {
          top: calc(50% - 4px);
          left: -5px;
          border-right: 0;
          border-top: 0;
        }

        @keyframes clay-tooltip-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .clay-tooltip {
            animation: none;
          }
        }
      `}</style>
    </span>
  );
}