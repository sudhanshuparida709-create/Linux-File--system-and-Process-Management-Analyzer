
import { Router } from "express";

import {
  getProcesses,
  killProcess,
  stopProcess,
  continueProcess,
} from "../controllers/processController";

import { requireAdmin } from "../middleware/authMiddleware";

const router = Router();

// All authenticated users can view processes.
router.get("/", getProcesses);

// Only administrators can control processes.
router.delete("/:pid", requireAdmin, killProcess);
router.post("/:pid/pause", requireAdmin, stopProcess);
router.post("/:pid/resume", requireAdmin, continueProcess);

export default router;
