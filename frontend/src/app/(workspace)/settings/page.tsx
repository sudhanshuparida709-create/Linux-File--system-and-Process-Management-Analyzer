"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";

type SettingToggleProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: SettingToggleProps) {
  return (
    <div className="setting-row">
      <div className="setting-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        className={`setting-switch ${checked ? "enabled" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}

const navigation = [
  { id: "general", label: "General", icon: "⚙" },
  { id: "appearance", label: "Appearance", icon: "◐" },
  { id: "notifications", label: "Notifications", icon: "♢" },
  { id: "monitoring", label: "System Monitoring", icon: "◉" },
  { id: "security", label: "Security", icon: "♧" },
  { id: "storage", label: "Storage", icon: "▣" },
];


export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  const [settings, setSettings] = useState({
    autoRefresh: true,
    desktopNotifications: true,
    emailNotifications: false,
    processAlerts: true,
    storageAlerts: true,
    cpuAlerts: true,
    memoryAlerts: true,
    showActivity: true,
    showSystemMetrics: true,
    confirmDelete: true,
    autoBackup: false,
    twoFactor: false,
    sessionTimeout: true,
    compactMode: false,
  });
  const { user, isLoading } = useAuth();

const displayName = isLoading ? "Loading..." : user?.name || "User";
const displayEmail = isLoading ? "Loading..." : user?.email || "No email available";
const displayRole = user?.role === "admin" ? "System Administrator" : "Standard User";
const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  const [refreshInterval, setRefreshInterval] = useState("5");
  const [alertThreshold, setAlertThreshold] = useState("80");
  const [storagePath, setStoragePath] = useState("/home/admin");
  const [saved, setSaved] = useState(false);

  const updateSetting = (
    key: keyof typeof settings,
    value: boolean
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    const preferences = {
      settings,
      theme,
      language,
      refreshInterval,
      alertThreshold,
      storagePath,
    };

    localStorage.setItem(
      "linux-dashboard-settings",
      JSON.stringify(preferences)
    );

    setSaved(true);
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all preferences to their default values?"
    );

    if (!confirmed) return;

    setSettings({
      autoRefresh: true,
      desktopNotifications: true,
      emailNotifications: false,
      processAlerts: true,
      storageAlerts: true,
      cpuAlerts: true,
      memoryAlerts: true,
      showActivity: true,
      showSystemMetrics: true,
      confirmDelete: true,
      autoBackup: false,
      twoFactor: false,
      sessionTimeout: true,
      compactMode: false,
    });

    setTheme("light");
    setLanguage("English");
    setRefreshInterval("5");
    setAlertThreshold("80");
    setStoragePath("/home/admin");

    localStorage.removeItem("linux-dashboard-settings");

    setSaved(false);
  };

  const sectionTitle =
    navigation.find((item) => item.id === activeSection)?.label ||
    "General";

  return (
    <>
      {/* Header */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">Workspace / Preferences</div>

          <h1 className="page-title">Settings</h1>

          <p className="page-subtitle">
            Customize your workspace, monitoring preferences,
            notifications, and system configurations.
          </p>
        </div>

        <div className="heading-actions">
          <button
            className="soft-btn"
            onClick={resetSettings}
          >
            ↻ Reset Defaults
          </button>

          <button
            className="primary-btn"
            onClick={saveSettings}
          >
            ✓ Save Changes
          </button>
        </div>
      </section>

      {/* Save Notification */}
      {saved && (
        <div className="upload-notice">
          ✓ Your settings have been saved successfully.

          <button
            onClick={() => setSaved(false)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Settings Layout */}
      <section className="settings-layout">

        {/* Settings Sidebar */}
        <aside className="panel settings-sidebar">
          <div className="settings-profile">
            <div className="settings-avatar" aria-label={`${displayName} avatar`}>
              {isLoading ? "…" : userInitial}
            </div>

            <div>
              <strong title={displayName}>{displayName}</strong>
              <span title={displayRole}>{isLoading ? "Loading account..." : displayRole}</span>
            </div>
          </div>

          <div className="settings-nav-label">
            PREFERENCES
          </div>

          <nav className="settings-nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`settings-nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveSection(item.id);
                  setSaved(false);
                }}
              >
                <span className="settings-nav-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>

                {activeSection === item.id && (
                  <span className="settings-nav-arrow">›</span>
                )}
              </button>
            ))}
          </nav>

          <div className="settings-sidebar-footer">
            <div className="settings-sidebar-status">
              <span className="status-dot" />
              System Online
            </div>

            <small>Linux Manager v1.0.0</small>
          </div>
        </aside>

        {/* Main Settings Content */}
        <main className="settings-main">

          <div className="settings-content-header">
            <div>
              <div className="eyebrow">
                Preferences / {sectionTitle}
              </div>

              <h2>{sectionTitle} Settings</h2>

              <p>
                Manage your {sectionTitle.toLowerCase()} preferences
                and configuration options.
              </p>
            </div>
          </div>

          {/* GENERAL */}
          {activeSection === "general" && (
            <>
              <section className="panel settings-panel">
                <div className="settings-panel-heading">
                  <div className="settings-panel-icon tint-teal">
                    ⚙
                  </div>

                  <div>
                    <h3>General Preferences</h3>

                    <p>
                      Configure your personal workspace details.
                    </p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label htmlFor="username">
                      Display Name
                    </label>

                    <input
                      id="username"
                      className="input-field settings-readonly"
                      value={displayName}
                      readOnly
                      aria-readonly="true"
                    />
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      className="input-field settings-readonly"
                      value={displayEmail}
                      readOnly
                      aria-readonly="true"
                    />
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="language">
                      Display Language
                    </label>

                    <select
                      id="language"
                      className="input-field"
                      value={language}
                      onChange={(event) => {
                        setLanguage(event.target.value);
                        setSaved(false);
                      }}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="refresh">
                      Dashboard Refresh Interval
                    </label>

                    <select
                      id="refresh"
                      className="input-field"
                      value={refreshInterval}
                      onChange={(event) => {
                        setRefreshInterval(event.target.value);
                        setSaved(false);
                      }}
                    >
                      <option value="1">1 Second</option>
                      <option value="5">5 Seconds</option>
                      <option value="10">10 Seconds</option>
                      <option value="30">30 Seconds</option>
                      <option value="60">1 Minute</option>
                    </select>
                  </div>
                </div>

                <div className="settings-divider" />

                <SettingToggle
                  title="Automatic Dashboard Refresh"
                  description="Automatically refresh dashboard information at the selected interval."
                  checked={settings.autoRefresh}
                  onChange={(value) =>
                    updateSetting("autoRefresh", value)
                  }
                />

                <SettingToggle
                  title="Display System Metrics"
                  description="Show CPU, memory, disk, and network statistics."
                  checked={settings.showSystemMetrics}
                  onChange={(value) =>
                    updateSetting("showSystemMetrics", value)
                  }
                />

                <SettingToggle
                  title="Show Activity History"
                  description="Display recent system operations and event history."
                  checked={settings.showActivity}
                  onChange={(value) =>
                    updateSetting("showActivity", value)
                  }
                />

                <SettingToggle
                  title="Compact Layout"
                  description="Use a more compact layout throughout the dashboard."
                  checked={settings.compactMode}
                  onChange={(value) =>
                    updateSetting("compactMode", value)
                  }
                />
              </section>

              <section className="panel settings-info-card">
                <div className="settings-info-icon">ⓘ</div>

                <div>
                  <strong>Workspace Preferences</strong>

                  <p>
                    These options customize the application interface
                    and dashboard behavior.
                  </p>
                </div>
              </section>
            </>
          )}

          {/* APPEARANCE */}
          {activeSection === "appearance" && (
            <section className="panel settings-panel">
              <div className="settings-panel-heading">
                <div className="settings-panel-icon tint-violet">
                  ◐
                </div>

                <div>
                  <h3>Appearance Preferences</h3>

                  <p>
                    Personalize your dashboard appearance and visual style.
                  </p>
                </div>
              </div>

              <div className="settings-subheading">
                Interface Theme
              </div>

              <div className="theme-options">
                <button
                  className={`theme-option ${
                    theme === "light" ? "active" : ""
                  }`}
                  onClick={() => {
                    setTheme("light");
                    setSaved(false);
                  }}
                >
                  <div className="theme-preview light-preview">
                    <div className="theme-preview-sidebar" />

                    <div className="theme-preview-content">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="theme-option-footer">
                    <strong>Light Mode</strong>

                    {theme === "light" && <span>✓</span>}
                  </div>
                </button>

                <button
                  className={`theme-option ${
                    theme === "dark" ? "active" : ""
                  }`}
                  onClick={() => {
                    setTheme("dark");
                    setSaved(false);
                  }}
                >
                  <div className="theme-preview dark-preview">
                    <div className="theme-preview-sidebar" />

                    <div className="theme-preview-content">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="theme-option-footer">
                    <strong>Dark Mode</strong>

                    {theme === "dark" && <span>✓</span>}
                  </div>
                </button>

                <button
                  className={`theme-option ${
                    theme === "system" ? "active" : ""
                  }`}
                  onClick={() => {
                    setTheme("system");
                    setSaved(false);
                  }}
                >
                  <div className="theme-preview system-preview">
                    <div className="theme-preview-sidebar" />

                    <div className="theme-preview-content">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="theme-option-footer">
                    <strong>System Default</strong>

                    {theme === "system" && <span>✓</span>}
                  </div>
                </button>
              </div>

              <div className="settings-divider" />

              <div className="settings-subheading">
                Design Style
              </div>

              <div className="appearance-description">
                <div className="appearance-style-icon">
                  ◈
                </div>

                <div>
                  <strong>Claymorphism Interface</strong>

                  <p>
                    Soft rounded surfaces, layered shadows,
                    subtle gradients, and smooth visual depth.
                  </p>
                </div>

                <span className="pill pill-success">
                  Active
                </span>
              </div>

              <div className="settings-divider" />

              <SettingToggle
                title="Compact Layout"
                description="Reduce spacing between cards and interface elements."
                checked={settings.compactMode}
                onChange={(value) =>
                  updateSetting("compactMode", value)
                }
              />
            </section>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <section className="panel settings-panel">
              <div className="settings-panel-heading">
                <div className="settings-panel-icon tint-orange">
                  ♢
                </div>

                <div>
                  <h3>Notification Preferences</h3>

                  <p>
                    Control which system events generate notifications.
                  </p>
                </div>
              </div>

              <div className="settings-subheading">
                Notification Channels
              </div>

              <SettingToggle
                title="Desktop Notifications"
                description="Enable visual notifications for important system events."
                checked={settings.desktopNotifications}
                onChange={(value) =>
                  updateSetting("desktopNotifications", value)
                }
              />

              <SettingToggle
                title="Email Notifications"
                description="Enable email notification preferences for system alerts."
                checked={settings.emailNotifications}
                onChange={(value) =>
                  updateSetting("emailNotifications", value)
                }
              />

              <div className="settings-divider" />

              <div className="settings-subheading">
                Notification Types
              </div>

              <SettingToggle
                title="Process Alerts"
                description="Receive notifications when important process events occur."
                checked={settings.processAlerts}
                onChange={(value) =>
                  updateSetting("processAlerts", value)
                }
              />

              <SettingToggle
                title="CPU Usage Alerts"
                description="Get notified when CPU usage exceeds the configured threshold."
                checked={settings.cpuAlerts}
                onChange={(value) =>
                  updateSetting("cpuAlerts", value)
                }
              />

              <SettingToggle
                title="Memory Alerts"
                description="Receive alerts when memory utilization becomes high."
                checked={settings.memoryAlerts}
                onChange={(value) =>
                  updateSetting("memoryAlerts", value)
                }
              />

              <SettingToggle
                title="Storage Alerts"
                description="Receive notifications when disk space becomes low."
                checked={settings.storageAlerts}
                onChange={(value) =>
                  updateSetting("storageAlerts", value)
                }
              />
            </section>
          )}

          {/* MONITORING */}
          {activeSection === "monitoring" && (
            <section className="panel settings-panel">
              <div className="settings-panel-heading">
                <div className="settings-panel-icon tint-teal">
                  ◉
                </div>

                <div>
                  <h3>System Monitoring</h3>

                  <p>
                    Configure resource monitoring and alert thresholds.
                  </p>
                </div>
              </div>

              <div className="settings-form-group">
                <label htmlFor="threshold">
                  Resource Alert Threshold
                </label>

                <div className="threshold-control">
                  <input
                    id="threshold"
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={alertThreshold}
                    onChange={(event) => {
                      setAlertThreshold(event.target.value);
                      setSaved(false);
                    }}
                  />

                  <strong>{alertThreshold}%</strong>
                </div>

                <small>
                  Generate an alert when resource utilization exceeds
                  this percentage.
                </small>
              </div>

              <div className="settings-divider" />

              <div className="settings-form-group">
                <label htmlFor="refresh-interval">
                  Monitoring Interval
                </label>

                <select
                  id="refresh-interval"
                  className="input-field"
                  value={refreshInterval}
                  onChange={(event) => {
                    setRefreshInterval(event.target.value);
                    setSaved(false);
                  }}
                >
                  <option value="1">Every 1 second</option>
                  <option value="5">Every 5 seconds</option>
                  <option value="10">Every 10 seconds</option>
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every 1 minute</option>
                </select>
              </div>

              <div className="settings-divider" />

              <div className="settings-subheading">
                Monitoring Options
              </div>

              <SettingToggle
                title="Automatic Updates"
                description="Automatically refresh system monitoring information."
                checked={settings.autoRefresh}
                onChange={(value) =>
                  updateSetting("autoRefresh", value)
                }
              />

              <SettingToggle
                title="CPU Monitoring"
                description="Monitor processor utilization and system load."
                checked={settings.showSystemMetrics}
                onChange={(value) =>
                  updateSetting("showSystemMetrics", value)
                }
              />

              <SettingToggle
                title="Alert on CPU Usage"
                description="Enable CPU utilization threshold notifications."
                checked={settings.cpuAlerts}
                onChange={(value) =>
                  updateSetting("cpuAlerts", value)
                }
              />

              <SettingToggle
                title="Alert on Memory Usage"
                description="Monitor high memory consumption."
                checked={settings.memoryAlerts}
                onChange={(value) =>
                  updateSetting("memoryAlerts", value)
                }
              />
            </section>
          )}

          {/* SECURITY */}
          {activeSection === "security" && (
            <section className="panel settings-panel">
              <div className="settings-panel-heading">
                <div className="settings-panel-icon tint-violet">
                  ♧
                </div>

                <div>
                  <h3>Security Preferences</h3>

                  <p>
                    Manage interface security and access preferences.
                  </p>
                </div>
              </div>

              <div className="security-status-card">
                <div className="security-status-icon">
                  ✓
                </div>

                <div>
                  <strong>Security Overview</strong>

                  <p>
                    Configure additional security controls for
                    your application workspace.
                  </p>
                </div>

                <span className="pill pill-success">
                  Configured
                </span>
              </div>

              <div className="settings-divider" />

              <div className="settings-subheading">
                Access Protection
              </div>

              <SettingToggle
                title="Two-Factor Authentication"
                description="Enable an additional verification step during authentication."
                checked={settings.twoFactor}
                onChange={(value) =>
                  updateSetting("twoFactor", value)
                }
              />

              <SettingToggle
                title="Automatic Session Timeout"
                description="Enable automatic session expiry after inactivity."
                checked={settings.sessionTimeout}
                onChange={(value) =>
                  updateSetting("sessionTimeout", value)
                }
              />

              <SettingToggle
                title="Confirm Destructive Actions"
                description="Ask for confirmation before deleting files or stopping processes."
                checked={settings.confirmDelete}
                onChange={(value) =>
                  updateSetting("confirmDelete", value)
                }
              />

              <div className="settings-divider" />

              <div className="settings-subheading">
                Account Information
              </div>

              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>Account Name</label>

                  <div className="input-field settings-readonly" aria-readonly="true">
                    {displayName}
                  </div>
                </div>

                <div className="settings-form-group">
                  <label>Account Email</label>

                  <div className="input-field settings-readonly" aria-readonly="true">
                    {displayEmail}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* STORAGE */}
          {activeSection === "storage" && (
            <section className="panel settings-panel">
              <div className="settings-panel-heading">
                <div className="settings-panel-icon tint-orange">
                  ▣
                </div>

                <div>
                  <h3>Storage Preferences</h3>

                  <p>
                    Manage default locations and storage-related options.
                  </p>
                </div>
              </div>

              <div className="settings-storage-summary">
                <div className="storage-summary-icon tint-orange">
                  ▣
                </div>

                <div>
                  <strong>512 GB Total Storage</strong>

                  <p>238 GB used · 274 GB available</p>
                </div>

                <span className="pill pill-success">
                  Healthy
                </span>
              </div>

              <div className="storage-bar">
                <div
                  className="storage-segment storage-system"
                  style={{ width: "16.8%" }}
                />

                <div
                  className="storage-segment storage-personal"
                  style={{ width: "18%" }}
                />

                <div
                  className="storage-segment storage-cache"
                  style={{ width: "7.4%" }}
                />

                <div
                  className="storage-segment storage-other"
                  style={{ width: "4.3%" }}
                />
              </div>

              <div className="settings-divider" />

              <div className="settings-form-group">
                <label htmlFor="storage-path">
                  Default Storage Directory
                </label>

                <input
                  id="storage-path"
                  className="input-field"
                  value={storagePath}
                  onChange={(event) => {
                    setStoragePath(event.target.value);
                    setSaved(false);
                  }}
                />

                <small>
                  Specify the default directory used by the application.
                </small>
              </div>

              <div className="settings-divider" />

              <div className="settings-subheading">
                Storage Management
              </div>

              <SettingToggle
                title="Automatic Backup"
                description="Enable automatic backup preferences for application data."
                checked={settings.autoBackup}
                onChange={(value) =>
                  updateSetting("autoBackup", value)
                }
              />

              <SettingToggle
                title="Confirm File Deletion"
                description="Ask for confirmation before deleting files."
                checked={settings.confirmDelete}
                onChange={(value) =>
                  updateSetting("confirmDelete", value)
                }
              />

              <SettingToggle
                title="Disk Space Alerts"
                description="Enable notifications when disk space is running low."
                checked={settings.storageAlerts}
                onChange={(value) =>
                  updateSetting("storageAlerts", value)
                }
              />
            </section>
          )}

          {/* Save Footer */}
          <div className="settings-save-footer">
            <div>
              <strong>Unsaved changes?</strong>

              <p>
                Save your preferences to retain your configuration.
              </p>
            </div>

            <div className="heading-actions">
              <button
                className="soft-btn"
                onClick={resetSettings}
              >
                Reset
              </button>

              <button
                className="primary-btn"
                onClick={saveSettings}
              >
                Save Preferences ✓
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}