import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const auth_schema = new Schema(
  {
    username: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

auth_schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 5);
});

auth_schema.methods.generate_token = function () {
  return jwt.sign(
    {
      username: this.username,
      _id: this._id,
    },
    process.env.SECRET,
    {
      expiresIn: "1d",
    }
  );
};

auth_schema.methods.match_pass = async function (client_pass) {
  return await bcrypt.compare(client_pass, this.password);
};

const auth_model = model("auth_schema", auth_schema);

export { auth_model };
