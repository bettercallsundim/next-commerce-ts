import { Schema, model } from "mongoose";
import { Order } from "../types";

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        size: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveredAt: Date,
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

const orderModel = model<Order>("Order", orderSchema);
export default orderModel;
