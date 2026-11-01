import { Router } from "express";
import { getNetwork } from "../controllers/systemController";

const router = Router();

// GET /api/network
router.get("/", getNetwork);

export default router;