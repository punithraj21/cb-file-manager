import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

import prisma from "../prisma/client";
import { getFolderPath, createFolderWithPath } from "../utils/common";
import { MulterFile } from "../utils/multer";

declare global {
  namespace Express {
    interface Request {
      file?: MulterFile;
    }
  }
}

export const createFolder = async (req: Request, res: Response) => {
  const { name, parentId } = req.body;
  const userId = req.user?.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const parentFolder = parentId
      ? await prisma.folder.findUnique({ where: { id: Number(parentId) } })
      : null;

    const folderPath = parentFolder ? path.join(parentFolder.path, name) : name;
    const pathWithoutRoot = folderPath.split(user.username)[1] || folderPath;

    const newFolder = await prisma.folder.create({
      data: {
        name,
        path: pathWithoutRoot,
        parentId: Number(parentId),
        userId,
      },
    });

    const userFolderPath = getFolderPath(user.username, pathWithoutRoot);
    createFolderWithPath(userFolderPath);
    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function moveFile(src, dest) {
  try {
    await fs.move(src, dest);
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}

export const createFile = async (req: Request, res: Response) => {
  const { folderId } = req.body;
  const { userId } = req.user;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File not provided" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const folder = await prisma.folder.findUnique({
      where: { id: Number(folderId) },
    });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const filePath = path.join(folder.path, file.filename);

    const newFile = await prisma.file.create({
      data: {
        name: file.originalname,
        path: filePath,
        folderId: Number(folderId),
        userId,
      },
    });

    let destinationPath = path.join(
      "src",
      "_storage",
      user.username,
      newFile.path
    );

    if (newFile.path.includes(user.username)) {
      destinationPath = path.join("src", "_storage", newFile.path);
    }

    await moveFile(file.path, destinationPath);
    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
