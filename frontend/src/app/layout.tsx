
import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Linux System Manager",
    template: "%s | Linux System Manager",
  },
  description:
    "A modern claymorphism dashboard for Linux file system management, process monitoring, and system resource analytics.",
  applicationName: "Linux System Manager",
  keywords: [
    "Linux",
    "Operating System",
    "File System",
    "Process Management",
    "System Monitoring",
    "Resource Management",
    "Dashboard",
    "Claymorphism",
  ],
  authors: [
    {
      name: "Linux System Manager",
    },
  ],
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e9edf3",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div id="app-root">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
