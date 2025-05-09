import { auth_model } from "../models/auth.model.mjs";

const options = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const create_user = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (![username, password].every(Boolean)) {
      return res.status(404).json({ message: "All parameters are required" });
    }
    let response = await auth_model.findOne({ username });
    if (response) {
      return res.status(401).json({ message: "User already exist" });
    }
    response = new auth_model({
      username,
      password,
    });
    await response.save();

    res.status(201).json({ message: "User created successfully!!!" });
  } catch (error) {
    console.log("Error --->", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login_user = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (![username, password].every(Boolean)) {
      return res
        .status(400)
        .json({ message: "All parameters are required !!!" });
    }
    const response = await auth_model.findOne({ username });

    if (!response) {
      // bad request
      return res.status(404).json({ message: "User not exist !!!" });
    }
    let pass_tok = await response.match_pass(password);

    if (!pass_tok) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    pass_tok = await response.generate_token();

    res.status(201).cookie("token", pass_tok, options).json({
      username,
      pass_tok,
    });
  } catch (error) {
    console.log("error --->", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout_user = async (req, res) => {
  try {
    res
      .status(201)
      .clearCookie("token", options)
      .json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { create_user, login_user, logout_user };
