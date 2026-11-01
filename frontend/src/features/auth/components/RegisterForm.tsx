
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const { register, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    clearError();
    setValidationError("");

    if (password.length < 8 || password.length > 72) {
      setValidationError("Password must contain 8 to 72 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      await register(name, email, password);
    } catch {
      // The authentication context provides the visible error message.
    }
  }

  const fieldClass =
  "clay-input !h-[46px] !w-full !pl-12 !pr-4 !text-xs";

  return (
    <form onSubmit={handleSubmit} className="space-y-[15px]">
      {(validationError || error) && (
        <div
          role="alert"
          className="rounded-xl border border-[#df7777]/20 bg-[#df7777]/10 px-4 py-3 text-xs font-medium text-[#ce6969]"
        >
          {validationError || error}
        </div>
      )}

      <div>
        <label
          htmlFor="register-name"
          className="mb-2 block text-[11px] font-bold text-[var(--text-secondary)]"
        >
          Full name
        </label>

        <div className="relative">
          <User
  size={16}
  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]"
/>

          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="mb-2 block text-[11px] font-bold text-[var(--text-secondary)]"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
  size={16}
  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]"
/>

          <input
            id="register-email"
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
        <label
          htmlFor="register-password"
          className="mb-2 block text-[11px] font-bold text-[var(--text-secondary)]"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
  size={16}
  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--muted)]"
/>

          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
            className={`${fieldClass} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-[var(--muted)] transition hover:text-[#439f90]"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="register-confirm-password"
          className="mb-2 block text-[11px] font-bold text-[var(--text-secondary)]"
        >
          Confirm password
        </label>

        <div className="relative">
          <LockKeyhole
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <input
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="clay-button clay-button-primary mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-extrabold tracking-wide"
      >
        {isLoading ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="pt-1 text-center text-xs text-[var(--muted)]">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-extrabold text-[#439f90] transition hover:text-[#65b9aa]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
