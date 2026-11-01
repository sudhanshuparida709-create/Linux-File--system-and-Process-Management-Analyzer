
import os from "node:os";
import { executeCommand } from "../utils/commandExecutor";

export interface CpuInfo {
  model: string;
  cores: number;
  usagePercent: number;
}

export interface MemoryInfo {
  total: number;
  used: number;
  free: number;
  usagePercent: number;
}

export interface StorageInfo {
  filesystem: string;
  total: number;
  used: number;
  available: number;
  usagePercent: number;
  mountPoint: string;
}

export interface NetworkInterfaceInfo {
  name: string;
  address: string;
  family: string;
  mac: string;
  internal: boolean;
  netmask: string;
}

function getCpuTimes(): {
  idle: number;
  total: number;
} {
  const cpus = os.cpus();

  let idle = 0;
  let total = 0;

  for (const cpu of cpus) {
    const times = cpu.times;

    idle += times.idle;
    total +=
      times.user +
      times.nice +
      times.sys +
      times.idle +
      times.irq;
  }

  return { idle, total };
}

async function getCpuUsage(): Promise<number> {
  const start = getCpuTimes();

  await new Promise((resolve) => setTimeout(resolve, 150));

  const end = getCpuTimes();

  const idleDifference = end.idle - start.idle;
  const totalDifference = end.total - start.total;

  if (totalDifference <= 0) {
    return 0;
  }

  const usage =
    100 * (1 - idleDifference / totalDifference);

  return Number(Math.max(0, Math.min(100, usage)).toFixed(2));
}

function getMemoryInfo(): MemoryInfo {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  return {
    total,
    used,
    free,
    usagePercent:
      total > 0
        ? Number(((used / total) * 100).toFixed(2))
        : 0,
  };
}

export async function getSystemOverview() {
  const cpus = os.cpus();
  const memory = getMemoryInfo();
  const usagePercent = await getCpuUsage();

  const cpu: CpuInfo = {
    model: cpus[0]?.model || "Unknown CPU",
    cores: cpus.length,
    usagePercent,
  };

  return {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    operatingSystem: `${os.type()} ${os.release()}`,
    uptime: os.uptime(),
    cpu,
    memory,
    loadAverage: os.loadavg(),
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  };
}

export async function getStorageInfo(): Promise<StorageInfo> {
  const platform = os.platform();

  if (platform !== "linux" && platform !== "darwin") {
    throw new Error(
      `Storage information is not supported on ${platform}.`
    );
  }

  const filesystemRoot =
    process.env.FILESYSTEM_ROOT || os.homedir();

  const { stdout } = await executeCommand(
    "df",
    ["-Pk", filesystemRoot]
  );

  const lines = stdout
    .trim()
    .split("\n")
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("Unable to read disk usage information.");
  }

  const values = lines[lines.length - 1].trim().split(/\s+/);

  if (values.length < 6) {
    throw new Error("Invalid disk usage response.");
  }

  const filesystem = values[0];
  const totalKb = Number(values[1]);
  const usedKb = Number(values[2]);
  const availableKb = Number(values[3]);
  const usageText = values[4];
  const mountPoint = values.slice(5).join(" ");

  const total = totalKb * 1024;
  const used = usedKb * 1024;
  const available = availableKb * 1024;
  const usagePercent = Number(
    usageText.replace("%", "")
  );

  if (
    !Number.isFinite(total) ||
    !Number.isFinite(used) ||
    !Number.isFinite(available) ||
    !Number.isFinite(usagePercent)
  ) {
    throw new Error("Unable to parse disk usage information.");
  }

  return {
    filesystem,
    total,
    used,
    available,
    usagePercent,
    mountPoint,
  };
}

export function getNetworkInfo(): NetworkInterfaceInfo[] {
  const interfaces = os.networkInterfaces();
  const result: NetworkInterfaceInfo[] = [];

  for (const [name, addresses] of Object.entries(interfaces)) {
    if (!addresses) {
      continue;
    }

    for (const address of addresses) {
      result.push({
        name,
        address: address.address,
        family: String(address.family),
        mac: address.mac,
        internal: address.internal,
        netmask: address.netmask,
      });
    }
  }

  return result;
}
