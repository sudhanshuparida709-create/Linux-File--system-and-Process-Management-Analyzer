"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="state-page error-page">
      <div className="state-background-orb state-orb-one" />
      <div className="state-background-orb state-orb-two" />

      <section className="state-card error-card">
        {/* Error Illustration */}
        <div className="state-illustration error-illustration">
          <div className="state-icon-circle error-icon-circle">
            <span>!</span>
          </div>

          <div className="state-floating-icon floating-icon-one">
            ⚙
          </div>

          <div className="state-floating-icon floating-icon-two">
            ⌘
          </div>

          <div className="state-floating-icon floating-icon-three">
            ×
          </div>
        </div>

        {/* Error Content */}
        <div className="state-content">
          <span className="state-eyebrow error-eyebrow">
            APPLICATION ERROR
          </span>

          <h1>Something went wrong</h1>

          <p className="state-description">
            An unexpected error occurred while processing your
            request. Don't worry, your system is still safe.
            You can try again or return to your dashboard.
          </p>

          {/* Error Information */}
          {error.digest && (
            <div className="error-reference">
              <span>Error Reference</span>
              <code>{error.digest}</code>
            </div>
          )}

          {/* Actions */}
          <div className="state-actions">
            <button
              type="button"
              className="state-primary-button"
              onClick={reset}
            >
              <span>↻</span>
              Try Again
            </button>

            <Link
              href="/dashboard"
              className="state-secondary-button"
            >
              <span>⌂</span>
              Back to Dashboard
            </Link>
          </div>

          {/* Support */}
          <div className="state-help">
            <span className="state-help-icon">ⓘ</span>

            <p>
              Still experiencing problems? Try refreshing the
              page or navigating back to your workspace.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="state-footer">
          <div className="state-footer-brand">
            <span className="state-brand-icon">⌘</span>
            <strong>LINUX SYSTEM MANAGER</strong>
          </div>

          <span>Application Error Handler</span>
        </div>
      </section>
    </main>
  );
}