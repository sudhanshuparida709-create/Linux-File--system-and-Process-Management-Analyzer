import type { Request, Response } from "express";

import {
  generateAuthToken,
  loginUser,
  registerUser,
} from "../services/authService";

const COOKIE_NAME = process.env.COOKIE_NAME || "linux_fs_token";

const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: COOKIE_MAX_AGE,
};

function setAuthCookie(
  res: Response,
  token: string
): void {
  res.cookie(COOKIE_NAME, token, cookieOptions);
}

function clearAuthCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email, password } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
      return;
    }

    const user = await registerUser(name, email, password);
    const token = generateAuthToken(user);

    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: { user },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Registration failed.";

    const status = message.includes("already exists") ? 409 : 400;

    res.status(status).json({
      success: false,
      message,
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const user = await loginUser(email, password);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    const token = generateAuthToken(user);

    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: { user },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Unable to log in. Please try again.",
    });
  }
}

export function logout(
  _req: Request,
  res: Response
): void {
  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
}

export function getCurrentUser(
  req: Request,
  res: Response
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
}