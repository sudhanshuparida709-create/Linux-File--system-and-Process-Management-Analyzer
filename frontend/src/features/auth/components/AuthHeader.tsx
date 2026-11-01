
import Link from "next/link";
import { Command } from "lucide-react";

export default function AuthHeader() {
  return (
    <header className="flex w-full items-center justify-between">
      <Link href="/login" className="flex items-center gap-3">
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[17px] bg-gradient-to-br from-[#79cbbb] to-[#439f90] text-white shadow-[5px_6px_12px_#cbd2dc,-4px_-4px_10px_#ffffff]">
          <Command size={26} strokeWidth={2.5} />
        </div>

        <div>
          <h2 className="text-[17px] font-extrabold tracking-[2.5px] text-[var(--text)]">
            LINUX
          </h2>
          <p className="mt-0.5 text-[11px] tracking-wide text-[var(--muted)]">
            System Manager
          </p>
        </div>
      </Link>

      <div className="hidden items-center gap-2 rounded-full px-4 py-2 sm:flex">
        <span className="h-2 w-2 rounded-full bg-[#65b9aa]" />
        <span className="text-[10px] font-bold tracking-[1.5px] text-[var(--muted)]">
          SYSTEM ACCESS PORTAL
        </span>
      </div>
    </header>
  );
}
