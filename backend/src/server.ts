
import "dotenv/config";

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import fileRoutes from "./routes/fileRoutes";
import processRoutes from "./routes/processRoutes";
import systemRoutes from "./routes/systemRoutes";
import networkRoutes from "./routes/networkRoutes";

import { requireAuth } from "./middleware/authMiddleware";

const app = express();

const PORT = Number(process.env.PORT) || 5001;

// Allowed frontend origins
const allowedOrigins = (
  process.env.FRONTEND_ORIGIN || "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Security middleware
app.disable("x-powered-by");
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local CLI requests without an Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS: Origin not allowed."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Parse HTTP-only authentication cookies
app.use(cookieParser());

// Public health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Linux File System Backend is running.",
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Public authentication routes
app.use("/api/auth", authRoutes);

// Protected application routes
app.use("/api/filesystem", requireAuth, fileRoutes);
app.use("/api/processes", requireAuth, processRoutes);
app.use("/api/system", requireAuth, systemRoutes);
app.use("/api/network", requireAuth, networkRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use(
  (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("API error:", error.message);

    const isCorsError = error.message.startsWith("CORS:");

    res.status(isCorsError ? 403 : 500).json({
      success: false,
      message: isCorsError
        ? "Origin not allowed."
        : "Internal server error.",
    });
  }
);

// Start server
const server = app.listen(PORT, () => {
  console.log("------------------------------------------");
  console.log(" Linux File System Backend");
  console.log("------------------------------------------");
  console.log(` Server: http://localhost:${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
  console.log(` Auth: http://localhost:${PORT}/api/auth`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("------------------------------------------");
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`\n${signal} received. Shutting down server...`);

  server.close(() => {
    console.log("Server closed successfully.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default app;
