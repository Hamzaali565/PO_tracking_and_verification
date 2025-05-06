import multer from "multer";
import path from "path";
import fs from "fs";
import { _dirname } from "./fil_dir.mjs";

const uploadPath = path.resolve(_dirname, "../../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const unq_name = `${Date.now()}-${file?.originalname}`;
    cb(null, unq_name);
  },
});

export const uploads = multer({ storage });
