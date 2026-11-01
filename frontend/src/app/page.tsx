"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    icon: "▤",
    title: "File System Management",
    description:
      "Browse Linux directories, explore files, organize storage, and inspect file permissions.",
    href: "/filesystem",
    tint: "feature-teal",
    number: "01",
  },
  {
    icon: "⌘",
    title: "Process Management",
    description:
      "Inspect processes, monitor execution states, and understand CPU and memory consumption.",
    href: "/processes",
    tint: "feature-violet",
    number: "02",
  },
  {
    icon: "◉",
    title: "Resource Monitoring",
    description:
      "Visualize CPU, RAM, disk, and network utilization through a unified monitoring interface.",
    href: "/resources",
    tint: "feature-orange",
    number: "03",
  },
  {
    icon: "▥",
    title: "System Reports",
    description:
      "Explore performance trends, review system statistics, and export monitoring reports.",
    href: "/reports",
    tint: "feature-blue",
    number: "04",
  },
];

const capabilities = [
  "Interactive file explorer",
  "Process monitoring interface",
  "CPU and memory analytics",
  "Storage utilization visualization",
  "Activity tracking",
  "Customizable workspace",
];

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(
      "linux-dashboard-settings"
    );

    if (!saved) return;

    try {
      const preferences = JSON.parse(saved);

      const theme = preferences.theme || "light";

      setDarkMode(
        theme === "dark" ||
          (theme === "system" &&
            window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches)
      );
    } catch {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <main className="landing-page">

      {/* Navigation */}
      <header className="landing-header">
        <Link href="/" className="landing-brand">
          <div className="landing-logo">⌘</div>

          <div>
            <strong>LINUX</strong>
            <span>System Manager</span>
          </div>
        </Link>

        <nav className="landing-navigation">
          <a href="#features">Features</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-header-actions">
          <button
            className="landing-theme-button"
            onClick={() => setDarkMode((previous) => !previous)}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀" : "☾"}
          </button>

          <Link
            href="/dashboard"
            className="landing-header-button"
          >
            Open Dashboard ↗
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-background-circle hero-circle-one" />
        <div className="hero-background-circle hero-circle-two" />

        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-dot" />
            LINUX MANAGEMENT PLATFORM
          </div>

          <h1>
            Manage your Linux system
            <span> with clarity.</span>
          </h1>

          <p className="hero-description">
            A modern workspace for file system management,
            process control, and system resource monitoring.
            Everything you need in one beautiful dashboard.
          </p>

          <div className="hero-actions">
            <Link
              href="/dashboard"
              className="hero-primary-button"
            >
              Explore Dashboard
              <span>→</span>
            </Link>

            <a
              href="#features"
              className="hero-secondary-button"
            >
              Discover Features
              <span>↓</span>
            </a>
          </div>

          <div className="hero-trust-row">
            <span>
              <i /> System Monitoring
            </span>

            <span>
              <i /> Process Management
            </span>

            <span>
              <i /> Storage Analytics
            </span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-topbar">
              <div className="preview-dots">
                <i />
                <i />
                <i />
              </div>

              <span>Linux System Manager</span>

              <span className="preview-live">
                ● LIVE
              </span>
            </div>

            <div className="preview-body">
              <div className="preview-sidebar">
                <div className="preview-sidebar-brand">
                  <span>⌘</span>
                  <strong>LINUX</strong>
                </div>

                <div className="preview-nav active">
                  ▦ Dashboard
                </div>

                <div className="preview-nav">
                  ▤ File System
                </div>

                <div className="preview-nav">
                  ⌘ Processes
                </div>

                <div className="preview-nav">
                  ◉ Resources
                </div>

                <div className="preview-nav">
                  ▥ Reports
                </div>
              </div>

              <div className="preview-main">
                <div className="preview-heading">
                  <div>
                    <strong>Dashboard Overview</strong>
                    <span>System performance at a glance</span>
                  </div>

                  <div className="preview-online">
                    <i />
                    Online
                  </div>
                </div>

                <div className="preview-stat-grid">
                  <div className="preview-stat">
                    <span>CPU Usage</span>
                    <strong>42.8%</strong>
                    <div className="preview-progress">
                      <i style={{ width: "42.8%" }} />
                    </div>
                  </div>

                  <div className="preview-stat">
                    <span>Memory</span>
                    <strong>6.4 GB</strong>
                    <div className="preview-progress purple">
                      <i style={{ width: "40%" }} />
                    </div>
                  </div>

                  <div className="preview-stat">
                    <span>Disk Usage</span>
                    <strong>238 GB</strong>
                    <div className="preview-progress orange">
                      <i style={{ width: "46.5%" }} />
                    </div>
                  </div>
                </div>

                <div className="preview-chart-card">
                  <div className="preview-chart-heading">
                    <strong>Performance Overview</strong>
                    <span>Last 24 hours</span>
                  </div>

                  <svg
                    viewBox="0 0 400 130"
                    role="img"
                    aria-label="Illustrative performance chart"
                  >
                    {[25, 55, 85, 115].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="400"
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity=".12"
                        strokeDasharray="4 5"
                      />
                    ))}

                    <polyline
                      points="0,94 35,72 70,83 105,43 140,58 175,37 210,68 245,30 280,48 315,23 350,39 400,15"
                      fill="none"
                      stroke="#65b9aa"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <polyline
                      points="0,112 35,107 70,102 105,98 140,100 175,88 210,94 245,79 280,84 315,73 350,75 400,65"
                      fill="none"
                      stroke="#9b87d7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="preview-chart-legend">
                    <span>
                      <i />
                      CPU
                    </span>

                    <span>
                      <i />
                      Memory
                    </span>
                  </div>
                </div>

                <div className="preview-bottom-cards">
                  <div>
                    <span>Active Processes</span>
                    <strong>128</strong>
                  </div>

                  <div>
                    <span>System Health</span>
                    <strong>96%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-preview-card floating-preview-one">
            <span className="floating-card-icon">◉</span>
            <div>
              <strong>System Online</strong>
              <small>All services active</small>
            </div>
          </div>

          <div className="floating-preview-card floating-preview-two">
            <span className="floating-card-icon purple-icon">▤</span>
            <div>
              <strong>Storage Healthy</strong>
              <small>274 GB available</small>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="landing-stats">
        <div className="landing-stat-item">
          <span className="landing-stat-icon tint-teal">▤</span>
          <div>
            <strong>File Management</strong>
            <small>Directory exploration</small>
          </div>
        </div>

        <div className="landing-stat-item">
          <span className="landing-stat-icon tint-violet">⌘</span>
          <div>
            <strong>Process Control</strong>
            <small>Process visibility</small>
          </div>
        </div>

        <div className="landing-stat-item">
          <span className="landing-stat-icon tint-orange">◉</span>
          <div>
            <strong>Resource Insights</strong>
            <small>Performance analytics</small>
          </div>
        </div>

        <div className="landing-stat-item">
          <span className="landing-stat-icon tint-blue">▥</span>
          <div>
            <strong>System Reports</strong>
            <small>Operational overview</small>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="landing-section"
        id="features"
      >
        <div className="landing-section-heading">
          <span className="landing-section-eyebrow">
            PLATFORM FEATURES
          </span>

          <h2>
            Everything your Linux system
            <span> needs in one place.</span>
          </h2>

          <p>
            Explore the tools designed to make system
            management more accessible and organized.
          </p>
        </div>

        <div className="landing-features-grid">
          {features.map((feature) => (
            <Link
              href={feature.href}
              className="landing-feature-card"
              key={feature.number}
            >
              <div className="feature-card-top">
                <span className={`feature-icon ${feature.tint}`}>
                  {feature.icon}
                </span>

                <span className="feature-number">
                  {feature.number}
                </span>
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-link">
                Explore Feature
                <span>↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section
        className="landing-capabilities"
        id="capabilities"
      >
        <div className="capabilities-content">
          <span className="landing-section-eyebrow">
            BUILT FOR SYSTEM VISIBILITY
          </span>

          <h2>
            A better way to
            <span> understand your system.</span>
          </h2>

          <p>
            Manage key operating system activities through
            a unified visual interface. Quickly navigate
            between storage, processes, monitoring, and
            reporting tools.
          </p>

          <div className="capabilities-list">
            {capabilities.map((item) => (
              <div key={item}>
                <span>✓</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="hero-primary-button"
          >
            Get Started
            <span>→</span>
          </Link>
        </div>

        <div className="capabilities-visual">
          <div className="capabilities-card">
            <div className="capabilities-card-header">
              <div>
                <span>SYSTEM OVERVIEW</span>
                <strong>Resource Utilization</strong>
              </div>

              <span className="capabilities-live-dot" />
            </div>

            <div className="capability-metric">
              <div>
                <span>CPU</span>
                <strong>42.8%</strong>
              </div>

              <div className="capability-bar">
                <span style={{ width: "42.8%" }} />
              </div>
            </div>

            <div className="capability-metric">
              <div>
                <span>Memory</span>
                <strong>40%</strong>
              </div>

              <div className="capability-bar purple-bar">
                <span style={{ width: "40%" }} />
              </div>
            </div>

            <div className="capability-metric">
              <div>
                <span>Storage</span>
                <strong>46.5%</strong>
              </div>

              <div className="capability-bar orange-bar">
                <span style={{ width: "46.5%" }} />
              </div>
            </div>

            <div className="capabilities-status">
              <div>
                <span>System Status</span>
                <strong>Healthy</strong>
              </div>

              <div className="capabilities-status-icon">
                ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className="landing-about"
        id="about"
      >
        <div className="about-logo">
          ⌘
        </div>

        <div>
          <span className="landing-section-eyebrow">
            ABOUT THE PROJECT
          </span>

          <h2>Linux File System & Process Management</h2>

          <p>
            An integrated interface for learning and exploring
            Linux file system organization, process execution,
            and system resource management.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="landing-cta">
        <div>
          <span>READY TO EXPLORE?</span>

          <h2>Your Linux workspace starts here.</h2>

          <p>
            Open your dashboard and explore the system management tools.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="cta-button"
        >
          Launch Dashboard →
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <Link href="/" className="landing-brand footer-brand">
          <div className="landing-logo">⌘</div>

          <div>
            <strong>LINUX</strong>
            <span>System Manager</span>
          </div>
        </Link>

        <p>
          Linux File System & Process Management
        </p>

        <span>© 2026 Linux System Manager</span>
      </footer>

      {/* Landing Page Styles */}
      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          overflow: hidden;
          color: var(--text);
          background: var(--bg);
        }

        /* Header */

        .landing-header {
          min-height: 79px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 12px 6%;
          border-bottom: 1px solid var(--line);
          background: var(--surface);
        }

        .landing-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .landing-logo {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          color: white;
          background: linear-gradient(145deg, #78cbbb, #479d91);
          box-shadow: var(--shadow-soft);
          font-size: 23px;
          font-weight: 800;
        }

        .landing-brand > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .landing-brand strong {
          font-size: 16px;
          letter-spacing: 2px;
        }

        .landing-brand span {
          color: var(--muted);
          font-size: 10px;
        }

        .landing-navigation {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .landing-navigation a {
          color: var(--muted);
          font-size: 11px;
          font-weight: 650;
          transition: color .2s;
        }

        .landing-navigation a:hover {
          color: var(--teal);
        }

        .landing-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .landing-theme-button {
          width: 37px;
          height: 37px;
          border: 0;
          border-radius: 11px;
          background: var(--surface);
          color: var(--text);
          box-shadow: var(--shadow-soft);
          font-size: 17px;
        }

        .landing-header-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 39px;
          padding: 0 15px;
          border-radius: 11px;
          color: #ffffff;
          background: linear-gradient(135deg, #65b9aa, #439f90);
          box-shadow: var(--shadow-soft);
          font-size: 10px;
          font-weight: 750;
        }

        /* Hero */

        .landing-hero {
          min-height: 590px;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          align-items: center;
          gap: 35px;
          padding: 65px 6%;
        }

        .hero-background-circle {
          position: absolute;
          z-index: 0;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-circle-one {
          width: 470px;
          height: 470px;
          top: -190px;
          right: 8%;
          background: #65b9aa0d;
        }

        .hero-circle-two {
          width: 270px;
          height: 270px;
          bottom: -120px;
          left: -130px;
          background: #9b87d710;
        }

        .hero-content,
        .hero-preview {
          position: relative;
          z-index: 1;
        }

        .hero-label {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 13px;
          border-radius: 30px;
          color: #499c8c;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .hero-label-dot,
        .capabilities-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #59b99d;
          box-shadow: 0 0 0 4px #65b9aa20;
        }

        .hero-content h1 {
          max-width: 610px;
          margin: 25px 0 17px;
          font-size: clamp(35px, 4.6vw, 59px);
          font-weight: 850;
          line-height: 1.15;
          letter-spacing: -2.6px;
        }

        .hero-content h1 span,
        .landing-section-heading h2 span,
        .capabilities-content h2 span {
          color: #55aa9a;
        }

        .hero-description {
          max-width: 500px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 27px;
        }

        .hero-primary-button,
        .hero-secondary-button {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 0 19px;
          border-radius: 13px;
          font-size: 10px;
          font-weight: 800;
          transition: transform .2s;
        }

        .hero-primary-button {
          color: #fff;
          background: linear-gradient(135deg, #65b9aa, #439f90);
          box-shadow: var(--shadow-soft);
        }

        .hero-secondary-button {
          color: var(--text);
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .hero-primary-button:hover,
        .hero-secondary-button:hover {
          transform: translateY(-3px);
        }

        .hero-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 17px;
          margin-top: 29px;
        }

        .hero-trust-row span {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--muted);
          font-size: 9px;
        }

        .hero-trust-row i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
        }

        /* Preview */

        .hero-preview {
          padding: 9px;
          border-radius: 22px;
          background: var(--surface);
          box-shadow: 12px 13px 25px #bfc8d2,
            -8px -8px 20px #ffffff;
          transform: perspective(1200px) rotateY(-5deg);
          transition: transform .3s;
        }

        .hero-preview:hover {
          transform: perspective(1200px) rotateY(0deg);
        }

        [data-theme="dark"] .hero-preview {
          box-shadow: var(--shadow-out);
        }

        .preview-window {
          overflow: hidden;
          border-radius: 15px;
          background: var(--bg);
        }

        .preview-topbar {
          height: 39px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 0 13px;
          border-bottom: 1px solid var(--line);
          background: var(--surface);
          font-size: 8px;
          color: var(--muted);
        }

        .preview-dots {
          display: flex;
          gap: 4px;
        }

        .preview-dots i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #dba27f;
        }

        .preview-dots i:nth-child(2) {
          background: #e1c16f;
        }

        .preview-dots i:nth-child(3) {
          background: #65b9aa;
        }

        .preview-live {
          color: #429e89;
          font-weight: 800;
        }

        .preview-body {
          min-height: 325px;
          display: grid;
          grid-template-columns: 105px minmax(0, 1fr);
        }

        .preview-sidebar {
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding: 12px 7px;
          border-right: 1px solid var(--line);
          background: var(--surface);
        }

        .preview-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 13px;
          font-size: 9px;
        }

        .preview-sidebar-brand span {
          color: var(--teal);
          font-size: 15px;
        }

        .preview-nav {
          padding: 8px 6px;
          border-radius: 7px;
          color: var(--muted);
          font-size: 7px;
        }

        .preview-nav.active {
          color: #449e8d;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .preview-main {
          min-width: 0;
          padding: 14px 11px;
        }

        .preview-heading,
        .preview-chart-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .preview-heading > div:first-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .preview-heading strong,
        .preview-chart-heading strong {
          font-size: 9px;
        }

        .preview-heading span:not(.preview-online) {
          color: var(--muted);
          font-size: 7px;
        }

        .preview-online {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 7px;
          border-radius: 20px;
          color: #429e89;
          background: #65b9aa20;
          font-size: 7px;
        }

        .preview-online i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--teal);
        }

        .preview-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 7px;
          margin-top: 15px;
        }

        .preview-stat {
          min-width: 0;
          padding: 10px 7px;
          border-radius: 9px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .preview-stat span {
          display: block;
          color: var(--muted);
          font-size: 7px;
        }

        .preview-stat strong {
          display: block;
          margin: 7px 0;
          font-size: 12px;
        }

        .preview-progress {
          height: 4px;
          overflow: hidden;
          border-radius: 10px;
          background: var(--track);
        }

        .preview-progress i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: var(--teal);
        }

        .preview-progress.purple i {
          background: var(--violet);
        }

        .preview-progress.orange i {
          background: var(--orange);
        }

        .preview-chart-card {
          padding: 11px;
          margin-top: 11px;
          border-radius: 10px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .preview-chart-heading {
          margin-bottom: 9px;
        }

        .preview-chart-heading span {
          color: var(--muted);
          font-size: 7px;
        }

        .preview-chart-card svg {
          width: 100%;
          display: block;
        }

        .preview-chart-legend {
          display: flex;
          gap: 11px;
          margin-top: 5px;
        }

        .preview-chart-legend span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--muted);
          font-size: 7px;
        }

        .preview-chart-legend span i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
        }

        .preview-chart-legend span:last-child i {
          background: var(--violet);
        }

        .preview-bottom-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 9px;
        }

        .preview-bottom-cards > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px;
          border-radius: 8px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .preview-bottom-cards span {
          color: var(--muted);
          font-size: 7px;
        }

        .preview-bottom-cards strong {
          font-size: 10px;
        }

        .floating-preview-card {
          position: absolute;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 13px;
          border: 1px solid var(--line);
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .floating-preview-one {
          top: 14%;
          right: -35px;
        }

        .floating-preview-two {
          bottom: 5%;
          left: -35px;
        }

        .floating-card-icon {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          color: #429e89;
          background: #65b9aa20;
        }

        .purple-icon {
          color: var(--violet);
          background: #9b87d720;
        }

        .floating-preview-card > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .floating-preview-card strong {
          font-size: 9px;
        }

        .floating-preview-card small {
          color: var(--muted);
          font-size: 8px;
        }

        /* Stats */

        .landing-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          padding: 22px 6%;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--surface);
        }

        .landing-stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .landing-stat-icon {
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          font-size: 19px;
        }

        .landing-stat-item > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .landing-stat-item strong {
          font-size: 10px;
        }

        .landing-stat-item small {
          color: var(--muted);
          font-size: 8px;
        }

        .tint-teal {
          color: #429d8e;
          background: #65b9aa20;
        }

        .tint-violet {
          color: #917acb;
          background: #9b87d720;
        }

        .tint-orange {
          color: #d99a5c;
          background: #e5a66e24;
        }

        .tint-blue {
          color: #6799d0;
          background: #7da9d924;
        }

        /* Features */

        .landing-section {
          padding: 85px 6%;
        }

        .landing-section-heading {
          max-width: 650px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .landing-section-eyebrow {
          color: #4d9f90;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 1.8px;
        }

        .landing-section-heading h2,
        .capabilities-content h2 {
          margin: 14px 0;
          font-size: clamp(26px, 3vw, 37px);
          font-weight: 850;
          letter-spacing: -1.2px;
          line-height: 1.3;
        }

        .landing-section-heading p {
          max-width: 480px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .landing-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 17px;
        }

        .landing-feature-card {
          min-height: 225px;
          display: flex;
          flex-direction: column;
          padding: 21px;
          border-radius: 19px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
          transition: transform .25s;
        }

        .landing-feature-card:hover {
          transform: translateY(-6px);
        }

        .feature-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          font-size: 22px;
        }

        .feature-teal {
          color: var(--teal-dark);
          background: #65b9aa25;
        }

        .feature-violet {
          color: var(--violet);
          background: #9b87d725;
        }

        .feature-orange {
          color: var(--orange);
          background: #e5a66e25;
        }

        .feature-blue {
          color: var(--blue);
          background: #7da9d925;
        }

        .feature-number {
          color: var(--muted);
          font-family: monospace;
          font-size: 11px;
        }

        .landing-feature-card h3 {
          margin: 19px 0 9px;
          font-size: 13px;
        }

        .landing-feature-card p {
          flex: 1;
          color: var(--muted);
          font-size: 9px;
          line-height: 1.8;
        }

        .feature-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 17px;
          color: #4b9e90;
          font-size: 9px;
          font-weight: 800;
        }

        /* Capabilities */

        .landing-capabilities {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 55px;
          padding: 80px 8%;
          background: var(--surface);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .capabilities-content h2 {
          max-width: 520px;
          margin: 14px 0;
        }

        .capabilities-content > p {
          max-width: 470px;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.9;
        }

        .capabilities-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin: 24px 0 27px;
        }

        .capabilities-list > div {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .capabilities-list span {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          border-radius: 7px;
          color: #439e8d;
          background: #65b9aa20;
          font-size: 11px;
          font-weight: 900;
        }

        .capabilities-list strong {
          font-size: 9px;
        }

        .capabilities-visual {
          display: flex;
          justify-content: center;
          padding: 25px;
        }

        .capabilities-card {
          width: 100%;
          max-width: 385px;
          padding: 25px;
          border-radius: 22px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
        }

        .capabilities-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .capabilities-card-header > div {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .capabilities-card-header > div span {
          color: var(--muted);
          font-size: 8px;
          letter-spacing: 1.3px;
        }

        .capabilities-card-header strong {
          font-size: 15px;
        }

        .capability-metric {
          margin-bottom: 24px;
        }

        .capability-metric > div:first-child {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .capability-metric > div:first-child span {
          color: var(--muted);
          font-size: 10px;
        }

        .capability-metric > div:first-child strong {
          font-size: 12px;
        }

        .capability-bar {
          height: 9px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--track);
          box-shadow: var(--shadow-in);
        }

        .capability-bar span {
          height: 100%;
          display: block;
          border-radius: inherit;
          background: linear-gradient(90deg, #65b9aa, #a3d8c7);
        }

        .purple-bar span {
          background: linear-gradient(90deg, #9b87d7, #b9a8e8);
        }

        .orange-bar span {
          background: linear-gradient(90deg, #e5a66e, #f0c28e);
        }

        .capabilities-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          margin-top: 8px;
          border-radius: 13px;
          background: var(--surface);
          box-shadow: var(--shadow-in);
        }

        .capabilities-status > div:first-child {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .capabilities-status span {
          color: var(--muted);
          font-size: 9px;
        }

        .capabilities-status strong {
          color: #499f8e;
          font-size: 12px;
        }

        .capabilities-status-icon {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          color: #479d8b;
          background: #65b9aa21;
          font-size: 18px;
        }

        /* About */

        .landing-about {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 70px 10%;
        }

        .about-logo {
          width: 75px;
          height: 75px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 22px;
          background: var(--surface);
          box-shadow: var(--shadow-out);
          color: var(--teal);
          font-size: 35px;
        }

        .landing-about h2 {
          margin: 8px 0;
          font-size: 19px;
        }

        .landing-about p {
          max-width: 620px;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.8;
        }

        /* CTA */

        .landing-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
          margin: 0 6% 65px;
          padding: 36px;
          border-radius: 22px;
          color: white;
          background: linear-gradient(115deg, #478f87, #68b8a7);
          box-shadow: var(--shadow-out);
        }

        .landing-cta > div > span {
          font-size: 8px;
          font-weight: 850;
          letter-spacing: 2px;
          opacity: .75;
        }

        .landing-cta h2 {
          margin: 9px 0;
          color: white;
          font-size: 24px;
        }

        .landing-cta p {
          color: #edfaf5;
          font-size: 10px;
        }

        .cta-button {
          min-height: 44px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border-radius: 12px;
          color: #3c897d;
          background: #ffffff;
          font-size: 10px;
          font-weight: 800;
        }

        /* Footer */

        .landing-footer {
          min-height: 85px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 17px;
          padding: 18px 6%;
          border-top: 1px solid var(--line);
          background: var(--surface);
        }

        .landing-footer p,
        .landing-footer > span {
          color: var(--muted);
          font-size: 9px;
        }

        .footer-brand .landing-logo {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          font-size: 18px;
        }

        .footer-brand strong {
          font-size: 12px;
        }

        .footer-brand span {
          font-size: 8px;
        }

        /* Responsive */

        @media (max-width: 1100px) {
          .landing-hero {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .hero-content {
            max-width: 700px;
          }

          .hero-preview {
            width: 100%;
            max-width: 650px;
            margin: 0 auto;
          }

          .landing-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .landing-capabilities {
            gap: 25px;
            padding-left: 6%;
            padding-right: 6%;
          }

          .landing-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .landing-header {
            padding: 12px 17px;
          }

          .landing-navigation {
            display: none;
          }

          .landing-header-button {
            padding: 0 10px;
            font-size: 9px;
          }

          .landing-hero {
            min-height: auto;
            padding: 65px 20px 75px;
          }

          .hero-content h1 {
            font-size: 39px;
            letter-spacing: -1.7px;
          }

          .hero-description {
            font-size: 11px;
          }

          .hero-preview {
            transform: none;
          }

          .floating-preview-one {
            right: -5px;
          }

          .floating-preview-two {
            left: -5px;
          }

          .landing-stats {
            grid-template-columns: repeat(2, 1fr);
            padding: 17px;
            gap: 10px;
          }

          .landing-stat-item {
            padding: 10px;
          }

          .landing-section {
            padding: 65px 19px;
          }

          .landing-section-heading h2 {
            font-size: 27px;
          }

          .landing-features-grid {
            gap: 12px;
          }

          .landing-feature-card {
            min-height: 205px;
            padding: 15px;
          }

          .landing-feature-card h3 {
            font-size: 11px;
          }

          .landing-feature-card p {
            font-size: 8px;
          }

          .landing-capabilities {
            grid-template-columns: 1fr;
            padding: 65px 20px;
          }

          .landing-about {
            padding: 55px 20px;
          }

          .landing-cta {
            align-items: flex-start;
            flex-direction: column;
            margin: 0 15px 45px;
            padding: 25px;
          }

          .landing-cta h2 {
            font-size: 20px;
          }

          .landing-footer {
            flex-wrap: wrap;
            padding: 20px;
          }
        }

        @media (max-width: 430px) {
          .landing-brand strong {
            font-size: 13px;
          }

          .landing-logo {
            width: 37px;
            height: 37px;
          }

          .landing-theme-button {
            width: 33px;
            height: 33px;
          }

          .hero-content h1 {
            font-size: 33px;
          }

          .hero-trust-row {
            gap: 10px;
          }

          .preview-body {
            grid-template-columns: 75px minmax(0, 1fr);
          }

          .preview-sidebar {
            padding: 10px 4px;
          }

          .preview-nav {
            font-size: 6px;
            padding: 7px 3px;
          }

          .preview-stat {
            padding: 7px 5px;
          }

          .preview-stat strong {
            font-size: 10px;
          }

          .floating-preview-card {
            padding: 8px;
          }

          .floating-preview-card strong {
            font-size: 8px;
          }

          .landing-features-grid {
            grid-template-columns: 1fr;
          }

          .landing-feature-card {
            min-height: 175px;
          }

          .capabilities-list {
            grid-template-columns: 1fr;
          }

          .about-logo {
            width: 53px;
            height: 53px;
            font-size: 24px;
          }

          .landing-about h2 {
            font-size: 14px;
          }

          .landing-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}