
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface CommandOptions {
  cwd?: string;
  timeout?: number;
  maxBuffer?: number;
  encoding?: BufferEncoding;
}

export interface CommandResult {
  stdout: string;
  stderr: string;
}

/**
 * Executes a program directly without invoking a shell.
 * Pass the executable and each argument separately.
 */
export async function executeCommand(
  command: string,
  args: string[] = [],
  options: CommandOptions = {}
): Promise<CommandResult> {
  if (!command.trim()) {
    throw new Error("A command is required.");
  }

  try {
    const result = await execFileAsync(command, args, {
      cwd: options.cwd,
      timeout: options.timeout ?? 10_000,
      maxBuffer: options.maxBuffer ?? 2 * 1024 * 1024,
      encoding: options.encoding ?? "utf8",
      windowsHide: true,
    });

    return {
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    const commandError = error as Error & {
      code?: string | number;
      stderr?: string;
    };

    if (commandError.code === "ENOENT") {
      throw new Error(`Command not found: ${command}`);
    }

    if (commandError.code === "ETIMEDOUT") {
      throw new Error(`Command timed out: ${command}`);
    }

    throw new Error(
      commandError.stderr?.trim() ||
        commandError.message ||
        `Failed to execute ${command}`
    );
  }
}
