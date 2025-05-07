import { Router } from "express";
import {
  create_user,
  login_user,
  logout_user,
} from "../controller/auth.controller.mjs";
import { user_validation_middleware } from "../middleware/auth.middleware.mjs";

const router = Router();

router.route("/api/v1/sign_up_user").post(create_user);

router.route("/api/v1/log_in_user").post(login_user);

router
  .route("/api/v1/log_out_user")
  .post(user_validation_middleware, logout_user);

export default router;
