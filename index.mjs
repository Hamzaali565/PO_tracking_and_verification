// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import cors from "cors";

import { app } from "./src/app.mjs";

// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: ["http://192.168.18.15:3000", "http://192.168.18.33:3002"],
//   })
// );

// let urlMetaData = "192.168.18.15";

app.listen(3001, () => {
  console.log("server listen at port 3001");
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const unq_name = `${Date.now()}-${file?.originalname}`;
//     cb(null, unq_name);
//   },
// });

// const uploads = multer({ storage });

// app.use("/uploads", express.static("uploads"));

// app.post("/api/v1/upload_file", uploads.array("files", 10), (req, res) => {
//   try {
//     const files = req.files;
//     if (!files || files.length === 0)
//       return res.status(400).json({ message: "No file uploaded" });

//     // Public URL (adjust if hosted remotely)
//     const fileUrls = files.map((file) => {
//       return `http://${urlMetaData}:3001/uploads/${file.filename}`;
//     });

//     res.status(200).json({ message: "File uploaded successfully", fileUrls });
//   } catch (error) {
//     console.log("Error", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
