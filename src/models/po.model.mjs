import { Schema, model } from "mongoose";

const po_schema = new Schema(
  {
    po_number: { type: String, required: true, lowercase: true, trim: true },
    createdUser: { type: String, required: true },
    updatedUser: { type: String },
    meta_data: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const po_model = model("po_schema", po_schema);

export { po_model };
