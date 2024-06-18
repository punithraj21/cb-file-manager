import { Router } from "express";

import { createFolder, createFile } from "../controllers/fileManagerController";

const router = Router();

router.post("/folders", createFolder);
router.post("/files", createFile);

export default router;
