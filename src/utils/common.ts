import fs from "fs";
import path from "path";

export const storageBasePath = path.resolve(process.cwd(), "src", "_storage");

export const getUserFolderPath = (u: string) =>
  path.resolve(storageBasePath, u);

export const createFolderWithPath = (basePath: string, childrenPath = "") => {
  const dirPath = path.resolve(storageBasePath, basePath);

  const isDirectoryExist = fs.existsSync(dirPath);

  if (!isDirectoryExist) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  return true;
};

export const getFolderPath = (username: string, folderPath: string): string => {
  return path.join(getUserFolderPath(username), folderPath);
};
