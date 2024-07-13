import mongoose from "mongoose";
import { generateAvatar } from "../utils/avatarGenerator.js";

const avatar = generateAvatar();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: avatar
  }
}, {timestamps: true}); // to add the "createdAt" and "updatedAt" timestamps.

const User = mongoose.model("User", userSchema); //mongodb will itself modify the "User" name when there are multiple users.

export default User;