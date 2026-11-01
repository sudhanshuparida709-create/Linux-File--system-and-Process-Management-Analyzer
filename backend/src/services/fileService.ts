
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

export type FileType =
  | "file"
  | "directory"
  | "symlink"
  | "other";

export interface FileEntry {
  name: string;
  path: string;
  type: FileType;
  size: number;
  modified: string;
  permissions: string;
  isDirectory: boolean;
  isFile: boolean;
}

export interface FileDetails extends FileEntry {
  created: string;
  accessed: string;
  extension: string;
  ownerId: number;
  groupId: number;
}

const FILESYSTEM_ROOT = path.resolve(
  process.env.FILESYSTEM_ROOT || os.homedir()
);

function resolveSafePath(inputPath: string): string {
  if (!inputPath || inputPath === "/") {
    return FILESYSTEM_ROOT;
  }

  const resolvedPath = path.isAbsolute(inputPath)
    ? path.resolve(inputPath)
    : path.resolve(FILESYSTEM_ROOT, inputPath);

  const relativePath = path.relative(
    FILESYSTEM_ROOT,
    resolvedPath
  );

  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error("Access denied: path is outside the allowed directory.");
  }

  return resolvedPath;
}

function getFileType(
  stats: Awaited<ReturnType<typeof fs.lstat>>
): FileType {
  if (stats.isSymbolicLink()) return "symlink";
  if (stats.isDirectory()) return "directory";
  if (stats.isFile()) return "file";
  return "other";
}

function getPermissions(mode: number): string {
  return (mode & 0o777).toString(8).padStart(3, "0");
}

function createFileEntry(
  name: string,
  filePath: string,
  stats: Awaited<ReturnType<typeof fs.lstat>>
): FileEntry {
  const type = getFileType(stats);

  return {
    name,
    path: filePath,
    type,
    size: Number(stats.size),
    modified: stats.mtime.toISOString(),
    permissions: getPermissions(Number(stats.mode)),
    isDirectory: type === "directory",
    isFile: type === "file",
  };
}

export async function listDirectory(
  directoryPath: string = "/"
): Promise<FileEntry[]> {
  const safePath = resolveSafePath(directoryPath);

  const directoryStats = await fs.lstat(safePath);

  if (directoryStats.isSymbolicLink()) {
    throw new Error("Symbolic-link directories cannot be browsed.");
  }

  if (!directoryStats.isDirectory()) {
    throw new Error("The requested path is not a directory.");
  }

  const entries = await fs.readdir(safePath, {
    withFileTypes: true,
  });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(safePath, entry.name);

      try {
        const stats = await fs.lstat(fullPath);

        return createFileEntry(
          entry.name,
          fullPath,
          stats
        );
      } catch {
        return null;
      }
    })
  );

  return files
    .filter((file): file is FileEntry => file !== null)
    .sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
}

export async function getFileDetails(
  filePath: string
): Promise<FileDetails> {
  const safePath = resolveSafePath(filePath);
  const stats = await fs.lstat(safePath);

  const name = path.basename(safePath);
  const entry = createFileEntry(name, safePath, stats);

  return {
    ...entry,
    created: stats.birthtime.toISOString(),
    accessed: stats.atime.toISOString(),
    extension: stats.isFile()
      ? path.extname(name)
      : "",
    ownerId: stats.uid,
    groupId: stats.gid,
  };
}
