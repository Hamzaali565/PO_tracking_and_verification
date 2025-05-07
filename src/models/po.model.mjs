import { Schema, model } from "mongoose";

const po_schema = new Schema({
    po_number: { type: String, required: true },
    meta_data: { type: Array, required: true }
})

const po_model = model("po_schema", po_schema)

export { po_model }