"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = document.querySelector<HTMLElement>(
      ".clay-modal-dialog"
    );

    dialog?.focus();
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="clay-modal-overlay"
      onMouseDown={(event) => {
        if (
          closeOnOverlay &&
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        className={`clay-modal-dialog clay-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "clay-modal-title" : undefined}
        aria-describedby={
          description ? "clay-modal-description" : undefined
        }
        tabIndex={-1}
      >
        <header className="clay-modal-header">
          <div className="clay-modal-heading">
            {title && (
              <h2 id="clay-modal-title">{title}</h2>
            )}

            {description && (
              <p id="clay-modal-description">
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <button
              type="button"
              className="clay-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </header>

        <div className="clay-modal-content">
          {children}
        </div>

        {footer && (
          <footer className="clay-modal-footer">
            {footer}
          </footer>
        )}
      </section>

      <style jsx>{`
        .clay-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
          background: rgba(23, 33, 46, .48);
          backdrop-filter: blur(7px);
          animation: clay-modal-fade .2s ease;
        }

        .clay-modal-dialog {
          width: 100%;
          max-height: calc(100vh - 40px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 22px;
          background: var(--surface);
          box-shadow:
            14px 14px 35px rgba(0, 0, 0, .17),
            -8px -8px 25px rgba(255, 255, 255, .45);
          animation: clay-modal-enter .25s ease;
        }

        .clay-modal-sm {
          max-width: 380px;
        }

        .clay-modal-md {
          max-width: 520px;
        }

        .clay-modal-lg {
          max-width: 720px;
        }

        .clay-modal-xl {
          max-width: 950px;
        }

        .clay-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding: 22px 24px;
          border-bottom: 1px solid var(--line);
        }

        .clay-modal-heading {
          min-width: 0;
        }

        .clay-modal-heading h2 {
          margin: 0;
          color: var(--text);
          font-size: 16px;
          font-weight: 800;
        }

        .clay-modal-heading p {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.6;
        }

        .clay-modal-close {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 10px;
          color: var(--muted);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          font-size: 21px;
          cursor: pointer;
        }

        .clay-modal-close:hover {
          color: #cf7070;
          box-shadow: var(--shadow-in);
        }

        .clay-modal-content {
          min-height: 0;
          padding: 23px 24px;
          overflow-y: auto;
          color: var(--text);
        }

        .clay-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 10px;
          padding: 15px 24px;
          border-top: 1px solid var(--line);
        }

        @keyframes clay-modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes clay-modal-enter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 600px) {
          .clay-modal-overlay {
            padding: 12px;
          }

          .clay-modal-dialog {
            max-height: calc(100vh - 24px);
            border-radius: 17px;
          }

          .clay-modal-header {
            padding: 17px;
          }

          .clay-modal-content {
            padding: 18px;
          }

          .clay-modal-footer {
            padding: 13px 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .clay-modal-overlay,
          .clay-modal-dialog {
            animation: none;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}