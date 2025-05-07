import jwt from "jsonwebtoken";
import { auth_model } from "../models/auth.model.mjs";

const user_validation_middleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decode_data = await jwt.verify(token, process.env.SECRET);
    if (!decode_data) {
      return res.status(403).json({ message: "Session expired, login Again" });
    }
    const user_check = await auth_model.findOne({ _id: decode_data?._id });
    if (!user_check) {
      return res.status(404).json({ message: "This user is not exist" });
    }
    req.userId = user_check?._id;
    req.username = user_check?.username;
    next();
  } catch (error) {
    console.log("error -->", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { user_validation_middleware };
