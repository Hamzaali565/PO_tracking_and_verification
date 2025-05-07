import { uploads } from "../helper/multer.mjs";
import { po_model } from "../models/po.model.mjs";

let urlMetaData = "192.168.18.15";
const file_handler = async (req, res) => {
  try {
    const files = req.files;
    const { po_number } = req.body;
    if (!po_number) {
      return res
        .status(404)
        .json({ message: "All parameters are required !!!" });
    }
    if (!files || files.length === 0)
      return res.status(400).json({ message: "No file uploaded" });

    // Public URL (adjust if hosted remotely)
    const fileUrls = files.map((file) => {
      return `http://${urlMetaData}:3001/uploads/${file.filename}`;
    });

    const response = new po_model({
      po_number,
      meta_data: fileUrls,
    });

    await response.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", data: response });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const update_handler = async (req, res) => {
  try {
    const files = req.files;
    if (!files) {
      return res.status(404).json({ message: "No data to be update" });
    }
    const { _id } = req.body;
    if (!_id) {
      return res.status(404).json({ message: "All parameters are required" });
    }
    const file_url = files.map((file) => {
      return `http://${urlMetaData}:3001/uploads/${file.filename}`;
    })

    const response = await po_model.findByIdAndUpdate(
      { _id },
      { $push: { meta_data: { $each: file_url } } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Data updated successfully", data: response });
  } catch (error) {
    console.log("error -->", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { file_handler, update_handler };
