import { Router } from "express";

import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authController";

import {
  requireAuth,
} from "../middleware/authMiddleware";

const router = Router();

// Public endpoints.
router.post("/register", register);
router.post("/login", login);

// Protected endpoints.
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, getCurrentUser);

export default router;