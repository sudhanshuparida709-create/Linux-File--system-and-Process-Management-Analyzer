"use client";

import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Server,
} from "lucide-react";

import MetricCard from "./MetricCard";
import CpuUsageChart, {
  type CpuUsagePoint,
} from "./CpuUsageChart";
import MemoryUsageChart, {
  type MemoryUsagePoint,
} from "./MemoryUsageChart";
import DiskUsageCard from "./DiskUsageCard";
import ProcessSummary, {
  type ProcessInfo,
} from "./ProcessSummary";

interface SystemOverviewProps {
  systemName?: string;
  uptime?: string;
  lastUpdated?: string;

  cpuUsage?: number;

  memoryUsed?: number;
  memoryTotal?: number;

  diskUsed?: number;
  diskTotal?: number;

  activeProcesses?: number;

  cpuData?: CpuUsagePoint[];
  memoryData?: MemoryUsagePoint[];

  processes?: ProcessInfo[];

  onViewAllProcesses?: () => void;
}

export default function SystemOverview({
  systemName = "Linux System",
  uptime = "12 days, 4 hours",
  lastUpdated = "Just now",

  cpuUsage = 42.5,

  memoryUsed = 5.8,
  memoryTotal = 16,

  diskUsed = 186,
  diskTotal = 512,

  activeProcesses = 128,

  cpuData,
  memoryData,

  processes,
  onViewAllProcesses,
}: SystemOverviewProps) {
  const memoryPercentage =
    memoryTotal > 0 ? (memoryUsed / memoryTotal) * 100 : 0;

  const diskPercentage =
    diskTotal > 0 ? (diskUsed / diskTotal) * 100 : 0;

  const processCount =
    processes !== undefined
      ? processes.filter((process) => process.state === "running").length
      : activeProcesses;

  return (
    <main className="system-overview">
      {/* Page Heading */}
      <div className="page-header">
        <div className="heading-content">
          <div className="heading-icon">
            <Server size={23} />
          </div>

          <div>
            <h2>System Overview</h2>
            <p>Monitor your Linux system performance and resources.</p>
          </div>
        </div>

        <div className="system-status">
          <span className="online-dot" />
          System Online
        </div>
      </div>

      {/* System Information */}
      <div className="system-info">
        <div className="info-item">
          <span>System</span>
          <strong>{systemName}</strong>
        </div>

        <div className="info-divider" />

        <div className="info-item">
          <span>Uptime</span>
          <strong>{uptime}</strong>
        </div>

        <div className="info-divider" />

        <div className="info-item">
          <span>Last Updated</span>
          <strong>{lastUpdated}</strong>
        </div>
      </div>

      {/* Metric Cards */}
      <section className="metrics-grid" aria-label="System metrics">
        <MetricCard
          title="CPU Usage"
          value={cpuUsage.toFixed(1)}
          unit="%"
          icon={Cpu}
          tone="blue"
          trend={{
            value: 2.4,
            label: "Compared to previous reading",
            direction: "down",
            tone: "good",
          }}
          description="Current processor utilization"
        />

        <MetricCard
          title="Memory Usage"
          value={memoryUsed.toFixed(1)}
          unit={`GB / ${memoryTotal} GB`}
          icon={MemoryStick}
          tone="purple"
          trend={{
            value: 1.8,
            label: "Compared to previous reading",
            direction: "up",
            tone: "bad",
          }}
          description={`${memoryPercentage.toFixed(1)}% of total RAM`}
        />

        <MetricCard
          title="Disk Usage"
          value={diskUsed.toFixed(1)}
          unit={`GB / ${diskTotal} GB`}
          icon={HardDrive}
          tone="green"
          trend={{
            value: 0.6,
            label: "Compared to previous reading",
            direction: "up",
            tone: "neutral",
          }}
          description={`${diskPercentage.toFixed(1)}% of total storage`}
        />

        <MetricCard
          title="Active Processes"
          value={processCount}
          icon={Activity}
          tone="orange"
          trend={{
            value: 3.2,
            label: "Compared to previous reading",
            direction: "up",
            tone: "neutral",
          }}
          description="Currently running processes"
        />
      </section>

      {/* Performance Charts */}
      <section className="charts-grid" aria-label="Performance charts">
        <CpuUsageChart
          data={cpuData}
          currentUsage={cpuUsage}
        />

        <MemoryUsageChart
          data={memoryData}
          used={memoryUsed}
          total={memoryTotal}
        />
      </section>

      {/* Storage and Process Information */}
      <section className="details-grid">
        <div className="storage-section">
          <div className="section-heading">
            <div>
              <h3>Storage Overview</h3>
              <p>Disk space and available capacity</p>
            </div>
          </div>

          <DiskUsageCard
            used={diskUsed}
            total={diskTotal}
            unit="GB"
            diskName="Main Disk"
            mountPoint="/"
          />
        </div>

        <div className="process-section">
          <ProcessSummary
            processes={processes}
            maxItems={5}
            onViewAll={onViewAllProcesses}
          />
        </div>
      </section>

      <style jsx>{`
        .system-overview {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          min-width: 0;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .heading-content {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .heading-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          color: #6366f1;
          border-radius: 15px;
          background: #f4f5fb;
          box-shadow:
            5px 5px 10px rgba(163, 177, 198, 0.25),
            -5px -5px 10px rgba(255, 255, 255, 0.9);
        }

        .heading-content h2 {
          margin: 0;
          color: #20283b;
          font-size: 22px;
          font-weight: 800;
        }

        .heading-content p {
          margin: 6px 0 0;
          color: #9299aa;
          font-size: 12px;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          color: #0d9488;
          border-radius: 20px;
          background: #d9f5ef;
          font-size: 11px;
          font-weight: 700;
        }

        .online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
        }

        .system-info {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          padding: 17px 20px;
          border-radius: 18px;
          background: #f4f5fb;
          box-shadow:
            5px 5px 12px rgba(163, 177, 198, 0.2),
            -5px -5px 12px rgba(255, 255, 255, 0.9);
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .info-item span {
          color: #9299aa;
          font-size: 10px;
        }

        .info-item strong {
          color: #273147;
          font-size: 12px;
          font-weight: 700;
        }

        .info-divider {
          width: 1px;
          height: 30px;
          background: #e0e4ed;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.5fr);
          align-items: start;
          gap: 20px;
        }

        .storage-section,
        .process-section {
          min-width: 0;
        }

        .section-heading {
          margin-bottom: 14px;
        }

        .section-heading h3 {
          margin: 0;
          color: #273147;
          font-size: 15px;
          font-weight: 700;
        }

        .section-heading p {
          margin: 5px 0 0;
          color: #9299aa;
          font-size: 11px;
        }

        @media (max-width: 1100px) {
          .metrics-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }

          .system-overview {
            gap: 18px;
          }

          .heading-content h2 {
            font-size: 19px;
          }

          .system-info {
            gap: 15px;
          }

          .info-divider {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .metrics-grid {
            gap: 12px;
          }

          .page-header {
            align-items: flex-start;
          }

          .system-status {
            margin-left: 62px;
          }
        }
      `}</style>
    </main>
  );
}