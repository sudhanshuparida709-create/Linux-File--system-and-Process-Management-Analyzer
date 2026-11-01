import { Request, Response } from "express";
import {
  listDirectory,
  getFileDetails,
} from "../services/fileService";

export const getFiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const directoryPath = req.query.path;

    if (
      directoryPath !== undefined &&
      typeof directoryPath !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid directory path.",
      });
      return;
    }

    const files = await listDirectory(
      typeof directoryPath === "string" ? directoryPath : "/"
    );

    res.status(200).json({
      success: true,
      data: files,
    });
  } catch (error) {
    console.error("Get files error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve files.",
    });
  }
};

export const getFileInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filePath = req.query.path;

    if (typeof filePath !== "string" || !filePath.trim()) {
      res.status(400).json({
        success: false,
        message: "A valid file path is required.",
      });
      return;
    }

    const details = await getFileDetails(filePath);

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    console.error("Get file details error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve file details.",
    });
  }
};