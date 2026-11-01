
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AuthCard({
  children,
  title,
  description,
}: AuthCardProps) {
  return (
    <section className="clay-card animate-fade-in w-full max-w-[470px] rounded-[26px] p-7 sm:p-9 xl:p-10">
      {/* Card heading */}
      <div className="mb-7 flex items-center justify-between">
        <div className="clay-badge clay-badge-success">
          <span className="h-2 w-2 rounded-full bg-[#65b9aa]" />
          SECURE ACCESS
        </div>

        <div className="clay-small flex h-11 w-11 items-center justify-center rounded-[13px] text-[#439f90]">
          <ShieldCheck size={21} strokeWidth={2} />
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[2.5px] text-[#439f90]">
          LINUX SYSTEM MANAGER
        </p>

        <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.7px] text-[var(--text)] sm:text-[30px]">
          {title}
        </h1>

        <p className="mt-3 max-w-[360px] text-[12px] leading-[1.8] text-[var(--muted)]">
          {description}
        </p>
      </div>

      {children}

      <div className="mt-7 flex items-center justify-center gap-2 border-t border-[var(--line)] pt-5">
        <ShieldCheck size={14} className="shrink-0 text-[#65b9aa]" />
        <span className="text-center text-[10px] text-[var(--muted)]">
          Protected with secure authentication
        </span>
      </div>
    </section>
  );
}
