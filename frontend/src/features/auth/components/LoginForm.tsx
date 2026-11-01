
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearError();

    try {
      await login(email, password);
    } catch {
      // The authentication context provides the visible error message.
    }
  }

  const fieldClass =
  "clay-input !h-12 !w-full !pl-12 !pr-4 !text-xs";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-[#df7777]/20 bg-[#df7777]/10 px-4 py-3 text-xs font-medium text-[#ce6969]"
        >
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-[11px] font-bold text-[var(--text-secondary)]"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
           size={17}
           className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]"
          />

          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-[11px] font-bold text-[var(--text-secondary)]"
          >
            Password
          </label>
        </div>

        <div className="relative">
          <LockKeyhole
  size={17}
  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]"
/>

          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className={`${fieldClass} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[var(--muted)] transition hover:text-[#439f90]"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="clay-button clay-button-primary mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-extrabold tracking-wide disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in to workspace
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="pt-1 text-center text-xs text-[var(--muted)]">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-extrabold text-[#439f90] transition hover:text-[#65b9aa]"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
