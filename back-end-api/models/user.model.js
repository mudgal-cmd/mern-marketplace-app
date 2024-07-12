import mongoose from "mongoose";

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
    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
  }
}, {timestamps: true}); // to add the "createdAt" and "updatedAt" timestamps.

const User = mongoose.model("User", userSchema); //mongodb will itself modify the "User" name when there are multiple users.

export default User;