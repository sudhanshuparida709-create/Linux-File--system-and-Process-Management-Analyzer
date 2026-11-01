
import type { ReactNode } from "react";
import AuthHeader from "@/features/auth/components/AuthHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] px-5 py-6 sm:px-8 lg:px-12 lg:py-7">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#65b9aa]/[0.09] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-[#9b87d7]/[0.08] blur-[110px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-56px)] w-full max-w-[1320px] flex-col">
        {/* Brand header */}
        <AuthHeader />

        {/* Main authentication area */}
        <section className="mx-auto grid w-full max-w-[1190px] flex-1 items-center gap-8 py-9 min-[900px]:grid-cols-[1.08fr_0.92fr] min-[900px]:gap-12 min-[900px]:py-10 xl:gap-[72px]">

          {/* Left feature panel */}
          <div className="relative hidden min-h-[570px] flex-col justify-between overflow-hidden rounded-[30px] bg-gradient-to-br from-[#439f90] via-[#65b9aa] to-[#91cbbb] p-10 text-white shadow-[10px_12px_28px_#cbd2dc,-7px_-7px_22px_#ffffff] md:flex lg:p-12 xl:min-h-[610px] xl:p-14">

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 top-12 h-80 w-80 rounded-full border border-white/15 bg-white/[0.06]" />
            <div className="pointer-events-none absolute -right-5 top-28 h-60 w-60 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/15 bg-white/[0.05]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#d5fff0]" />
                <span className="text-[9px] font-extrabold tracking-[2px] text-white">
                  LINUX SYSTEM ENVIRONMENT
                </span>
              </div>

              <h1 className="mt-10 max-w-[490px] text-[38px] font-extrabold leading-[1.18] tracking-[-1.5px] text-white xl:text-[46px]">
                Control your
                <br />
                system with
                <br />
                <span className="text-[#d9fff2]">confidence.</span>
              </h1>

              <p className="mt-6 max-w-[410px] text-[13px] leading-7 text-white/85">
                One intelligent workspace to explore your file system,
                monitor resources, and manage running processes in real time.
              </p>

              {/* Feature highlights */}
              <div className="mt-9 grid max-w-[420px] grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[20px] font-extrabold text-white">01</p>
                  <p className="mt-1 text-[10px] font-semibold text-white/80">
                    File Management
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[20px] font-extrabold text-white">02</p>
                  <p className="mt-1 text-[10px] font-semibold text-white/80">
                    Process Control
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal panel */}
            <div className="relative z-10 mt-10 rounded-[20px] border border-white/30 bg-[#367f75]/45 p-5 shadow-[0_15px_35px_rgba(30,75,68,0.18)] backdrop-blur-lg">
              <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="h-2 w-2 rounded-full bg-white/55" />
                <span className="h-2 w-2 rounded-full bg-white/35" />

                <span className="ml-auto text-[9px] font-bold tracking-[2px] text-white/60">
                  SYSTEM TERMINAL
                </span>
              </div>

              <div className="space-y-2 font-mono text-[11px] leading-relaxed">
                <p className="text-white/85">
                  <span className="text-[#c8ffe9]">$</span> systemctl status
                </p>
                <p className="text-[#d8fff0]">
                  ● System services operational
                </p>
                <p className="text-white/85">
                  <span className="text-[#c8ffe9]">$</span> uptime
                </p>
                <p className="text-white/75">
                  09:21:48 up 12 days, 4 users
                </p>
                <p className="text-white/85">
                  <span className="text-[#c8ffe9]">$</span> _
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-7 flex items-center justify-between border-t border-white/25 pt-5">
              <span className="text-[10px] font-medium tracking-wide text-white/75">
                SECURE SYSTEM ACCESS
              </span>
              <span className="text-[10px] font-bold tracking-wide text-white/75">
                LINUX SYSTEM MANAGER
              </span>
            </div>
          </div>

          {/* Right authentication form */}
          <div className="flex w-full items-center justify-center">
            {children}
          </div>
        </section>

        <footer className="relative py-3 text-center text-[10px] tracking-wide text-[var(--muted)]">
          © {new Date().getFullYear()} Linux System Manager
          <span className="mx-2 text-[#65b9aa]">•</span>
          Secure Workspace
        </footer>
      </div>
    </main>
  );
}
