import { Router } from "express";
import {
  getOverview,
  getStorage,
} from "../controllers/systemController";

const router = Router();

// GET /api/system/overview
router.get("/overview", getOverview);

// GET /api/system/storage
router.get("/storage", getStorage);

export default router;