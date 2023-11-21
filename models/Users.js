import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
    message: `Email Format is Incorrect! 🧖`,
  },
  password: { type: String, required: true, minlength: 8 },
  confirmPassword: {
    type: String,
    select: false,
    default: undefined,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: `Passwords don't match!`,
    },
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
