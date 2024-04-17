import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose, { Schema, model } from "mongoose";
dotenv.config();
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  address: {
    type: String,
    default: "",
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

userSchema.methods.JWT = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
const userModel = model("User", userSchema);
export default userModel;
