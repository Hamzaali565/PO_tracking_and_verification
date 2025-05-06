import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import file_routes from "./routes/file.routes.mjs";
import { _dirname } from "./helper/fil_dir.mjs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.resolve(_dirname, "../../uploads")));

app.use(file_routes);

export { app };
