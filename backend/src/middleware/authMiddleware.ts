import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  verifyAuthToken,
  type AuthenticatedUser,
} from "../services/authService";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

function getCookieName(): string {
  return process.env.COOKIE_NAME || "linux_fs_token";
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.cookies?.[getCookieName()];

  if (!token || typeof token !== "string") {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
    return;
  }

  try {
    req.user = verifyAuthToken(token);
    next();
  } catch {
    res.clearCookie(getCookieName(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(401).json({
      success: false,
      message: "Your session is invalid or has expired.",
    });
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Administrator permission required.",
    });
    return;
  }

  next();
}