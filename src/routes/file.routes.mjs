import { Router } from "express";
import { uploads } from "../helper/multer.mjs";
import { file_handler } from "../controller/file.controller.mjs";

const router = Router();

router
  .route("/api/v1/upload_file")
  .post(uploads.array("files", 10), file_handler);

export default router;
