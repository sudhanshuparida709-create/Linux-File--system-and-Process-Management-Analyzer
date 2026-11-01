import { Router } from "express";
import {
  getFiles,
  getFileInfo,
} from "../controllers/fileController";

const router = Router();

// GET /api/filesystem
router.get("/", getFiles);

// GET /api/filesystem/details?path=/home/user/file.txt
router.get("/details", getFileInfo);

export default router;