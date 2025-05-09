import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { _dirname } from "./helper/fil_dir.mjs";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import auth_routes from "./routes/auth.routes.mjs";
import file_routes from "./routes/file.routes.mjs";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.resolve(_dirname, "../../uploads")));

app.use(file_routes);
app.use(auth_routes);

export { app };
