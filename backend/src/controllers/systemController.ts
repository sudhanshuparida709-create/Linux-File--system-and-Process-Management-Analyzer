import { Request, Response } from "express";
import {
  getSystemOverview,
  getStorageInfo,
  getNetworkInfo,
} from "../services/systemService";

export const getOverview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const overview = await getSystemOverview();

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("System overview error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve system overview.",
    });
  }
};

export const getStorage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const storage = await getStorageInfo();

    res.status(200).json({
      success: true,
      data: storage,
    });
  } catch (error) {
    console.error("Storage information error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve storage information.",
    });
  }
};

export const getNetwork = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const network = await getNetworkInfo();

    res.status(200).json({
      success: true,
      data: network,
    });
  } catch (error) {
    console.error("Network information error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve network information.",
    });
  }
};