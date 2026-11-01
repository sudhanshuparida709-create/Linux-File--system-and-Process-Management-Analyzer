import { Request, Response } from "express";
import {
  listProcesses,
  terminateProcess,
  pauseProcess,
  resumeProcess,
} from "../services/processService";

const getValidPid = (value: string): number | null => {
  const pid = Number(value);

  if (!Number.isSafeInteger(pid) || pid <= 0) {
    return null;
  }

  return pid;
};

export const getProcesses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const processes = await listProcesses();

    res.status(200).json({
      success: true,
      count: processes.length,
      data: processes,
    });
  } catch (error) {
    console.error("Get processes error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve processes.",
    });
  }
};

export const killProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pid = getValidPid(req.params.pid);

    if (pid === null) {
      res.status(400).json({
        success: false,
        message: "Invalid process ID.",
      });
      return;
    }

    await terminateProcess(pid);

    res.status(200).json({
      success: true,
      message: `Process ${pid} terminated successfully.`,
    });
  } catch (error) {
    console.error("Terminate process error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to terminate process.",
    });
  }
};

export const stopProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pid = getValidPid(req.params.pid);

    if (pid === null) {
      res.status(400).json({
        success: false,
        message: "Invalid process ID.",
      });
      return;
    }

    await pauseProcess(pid);

    res.status(200).json({
      success: true,
      message: `Process ${pid} paused successfully.`,
    });
  } catch (error) {
    console.error("Pause process error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to pause process.",
    });
  }
};

export const continueProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pid = getValidPid(req.params.pid);

    if (pid === null) {
      res.status(400).json({
        success: false,
        message: "Invalid process ID.",
      });
      return;
    }

    await resumeProcess(pid);

    res.status(200).json({
      success: true,
      message: `Process ${pid} resumed successfully.`,
    });
  } catch (error) {
    console.error("Resume process error:", error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to resume process.",
    });
  }
};