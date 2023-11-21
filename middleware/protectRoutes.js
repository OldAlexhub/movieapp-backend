import { promisify } from "util";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer`)
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: `Please login` });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: `Invalid token!, please login again` });
    }

    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
      return res
        .status(401)
        .json({ message: `Invalid token!, please login again` });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(500).json({ message: `User unauthorized!` });
  }
};
export default protectRoute;
