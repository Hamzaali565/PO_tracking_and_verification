import { uploads } from "../helper/multer.mjs";

// app.post("/api/v1/upload_file", uploads.array("files", 10), (req, res) => {
const file_handler = async (req, res) => {
  try {
    let urlMetaData = "192.168.18.15";
    const files = req.files;
    if (!files || files.length === 0)
      return res.status(400).json({ message: "No file uploaded" });

    // Public URL (adjust if hosted remotely)
    const fileUrls = files.map((file) => {
      return `http://${urlMetaData}:3001/uploads/${file.filename}`;
    });

    res.status(200).json({ message: "File uploaded successfully", fileUrls });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { file_handler };
