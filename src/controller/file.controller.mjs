import { uploads } from "../helper/multer.mjs";
import { po_model } from "../models/po.model.mjs";

let urlMetaData = "192.168.18.13";
const file_handler = async (req, res) => {
  try {
    const files = req.files;
    const { po_number } = req.body;

    if (!po_number) {
      return res
        .status(404)
        .json({ message: "All parameters are required !!!" });
    }
    const duplicate_check = await po_model.findOne({ po_number });
    if (duplicate_check) {
      return res.status(400).json({ message: "PO already exist !!!" });
    }
    if (!files || files.length === 0)
      return res.status(400).json({ message: "No file uploaded" });

    // Public URL (adjust if hosted remotely)
    const fileUrls = files.map((file) => {
      return `http://${urlMetaData}:3001/uploads/${file.filename}`;
    });

    const response = new po_model({
      po_number,
      createdUser: req?.username,
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
    });

    const response = await po_model.findByIdAndUpdate(
      { _id },
      {
        $push: { meta_data: { $each: file_url } },
        $set: { updatedUser: req?.username },
      },
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

const get_po_data = async (req, res) => {
  try {
    const { po_number } = req.query;
    if (!po_number) {
      return res
        .status(400)
        .json({ message: "All parameters are required !!!" });
    }
    const response = await po_model.findOne({ po_number });
    if (!response) {
      return res.status(404).json({ message: "PO not found" });
    }
    res.status(201).json({ data: response });
  } catch (error) {
    console.log("error --->", error);
  }
};

const all_po_data = async (req, res) => {
  try {
    const { toDate, fromDate } = req.query;

    if (!fromDate || !toDate) {
      res.status(404).json({ message: "Both Dates Are Required !!!" });
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);
    const response = await po_model.find(
      { createdAt: { $gte: from, $lte: to } },
      "-meta_data"
    );
    if (response.length === 0) {
      return res.status(404).json({ message: "No data to be shown !!!" });
    }
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { file_handler, update_handler, get_po_data, all_po_data };
