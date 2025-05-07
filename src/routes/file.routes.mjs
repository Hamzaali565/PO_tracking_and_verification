import { Router } from "express";
import { uploads } from "../helper/multer.mjs";
import { file_handler, update_handler } from "../controller/file.controller.mjs";

const router = Router();

router
  .route("/api/v1/upload_file")
  .post(uploads.array("files", 10), file_handler);

router.route('/api/v1/upload_file').put(uploads.array("files", 10), update_handler)

export default router;
