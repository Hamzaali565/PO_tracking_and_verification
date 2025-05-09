import { Router } from "express";
import { uploads } from "../helper/multer.mjs";
import {
  all_po_data,
  file_handler,
  get_po_data,
  update_handler,
} from "../controller/file.controller.mjs";
import { user_validation_middleware } from "../middleware/auth.middleware.mjs";

const router = Router();

router
  .route("/api/v1/upload_file")
  .post(user_validation_middleware, uploads.array("files", 10), file_handler);

router
  .route("/api/v1/upload_file")
  .put(user_validation_middleware, uploads.array("files", 10), update_handler);

router.route("/api/v1/po_data").get(user_validation_middleware, get_po_data);
router
  .route("/api/v1/po_data_all")
  .get(user_validation_middleware, all_po_data);

export default router;
