import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";

const createUser = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) {
      return res.status(401).json({ message: `User Already Exists!` });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ message: `Passwords don't match!` });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: `User created successfully`, newUser });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error 😥!` });
  }
};
export default createUser;
