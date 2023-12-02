import mongoose from "mongoose";

// Defining the user schema
const UserSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    gender: { type: String, require: true },
    avatar: { type: String, require: true },
    domain: { type: String, require: true },
    available: { type: Boolean, require: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
