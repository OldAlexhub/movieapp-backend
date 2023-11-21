import UserModel from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: `User doesn't exist, Please register and account!` });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: `Invalid credentials!` });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    const username = user.userName;
    const role = user.role;
    const userId = user._id;
    res
      .cookie("token", token, {
        expiresIn: process.env.JWT_EXPIRESIN,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
      })
      .cookie("username", username, {
        expiresIn: process.env.JWT_EXPIRESIN,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
      })
      .cookie("userId", userId, {
        expiresIn: process.env.JWT_EXPIRESIN,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
      })
      .header("Authorization", `Bearer ${token}`)
      .status(200)
      .json({
        message: `Login successfull`,
        token,
        username: username,
        role: role,
        userId: userId,
      });
    next();
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error 💁!` });
  }
};
export default Login;
