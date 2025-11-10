import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { username, email, password_hash } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ username, email, password_hash });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const login = async (req, res) => {
  const { email, password_hash } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password_hash))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
