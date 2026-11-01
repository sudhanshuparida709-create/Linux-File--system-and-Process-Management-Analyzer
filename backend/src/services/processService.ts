
import os from "node:os";
import { executeCommand } from "../utils/commandExecutor";

export type ProcessStatus =
  | "running"
  | "sleeping"
  | "stopped"
  | "zombie"
  | "idle"
  | "unknown";

export interface ProcessInfo {
  pid: number;
  ppid: number;
  name: string;
  cpu: number;
  memory: number;
  state: ProcessStatus;
  status: ProcessStatus;
  user: string;
}

function parseProcessStatus(stat: string): ProcessStatus {
  const state = stat.trim().charAt(0).toUpperCase();

  switch (state) {
    case "R":
      return "running";
    case "S":
    case "I":
      return "sleeping";
    case "T":
    case "D":
      return "stopped";
    case "Z":
      return "zombie";
    default:
      return "unknown";
  }
}

export async function listProcesses(): Promise<ProcessInfo[]> {
  const platform = os.platform();

  if (platform !== "linux" && platform !== "darwin") {
    throw new Error(
      `Process listing is not supported on ${platform}.`
    );
  }

  const args =
    platform === "darwin"
      ? ["-axo", "pid=,ppid=,%cpu=,%mem=,stat=,comm="]
      : ["-eo", "pid=,ppid=,%cpu=,%mem=,stat=,comm="];

  const { stdout } = await executeCommand("ps", args);

  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line): ProcessInfo | null => {
      const parts = line.split(/\s+/);

      if (parts.length < 6) {
        return null;
      }

      const [pidText, ppidText, cpuText, memoryText, stat] =
        parts;

      const pid = Number(pidText);
      const ppid = Number(ppidText);
      const cpu = Number(cpuText);
      const memory = Number(memoryText);
      const name = parts.slice(5).join(" ");

      if (
        !Number.isSafeInteger(pid) ||
        !Number.isFinite(cpu) ||
        !Number.isFinite(memory)
      ) {
        return null;
      }

      const state = parseProcessStatus(stat);

      return {
        pid,
        ppid,
        name,
        cpu,
        memory,
        state,
        status: state,
        user: "",
      };
    })
    .filter(
      (process): process is ProcessInfo => process !== null
    )
    .sort((a, b) => b.cpu - a.cpu);
}

async function validateProcessAccess(pid: number): Promise<void> {
  if (!Number.isSafeInteger(pid) || pid <= 1) {
    throw new Error("Invalid or protected process ID.");
  }

  if (pid === process.pid) {
    throw new Error("The backend cannot control its own process.");
  }

  if (typeof process.getuid !== "function") {
    throw new Error(
      "Process ownership validation is unavailable on this platform."
    );
  }

  const { stdout } = await executeCommand(
    "ps",
    ["-o", "uid=", "-p", String(pid)]
  );

  const ownerId = Number(stdout.trim());

  if (!Number.isInteger(ownerId)) {
    throw new Error("Process not found.");
  }

  if (ownerId !== process.getuid()) {
    throw new Error(
      "Permission denied: you can only control processes owned by your user."
    );
  }
}

export async function terminateProcess(pid: number): Promise<void> {
  await validateProcessAccess(pid);

  try {
    process.kill(pid, "SIGTERM");
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to terminate process."
    );
  }
}

export async function pauseProcess(pid: number): Promise<void> {
  await validateProcessAccess(pid);

  try {
    process.kill(pid, "SIGSTOP");
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to pause process."
    );
  }
}

export async function resumeProcess(pid: number): Promise<void> {
  await validateProcessAccess(pid);

  try {
    process.kill(pid, "SIGCONT");
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to resume process."
    );
  }
}
